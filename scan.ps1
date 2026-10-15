# Windows PowerShell 5.1+; inspect before running remotely.
# Never reads or uploads cookies, credentials, local storage or session tokens.
param([string]$ProjectId, [string]$DeviceLabel = $env:COMPUTERNAME)
$ErrorActionPreference = 'Stop'

if (-not $ProjectId) { $ProjectId = Read-Host 'Firebase project ID' }
if ($ProjectId -notmatch '^[a-z][a-z0-9-]{4,35}$') { throw 'Invalid Firebase project ID.' }

$keySec = Read-Host 'Panelde olusturdugunuz aktarim anahtari' -AsSecureString
$ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($keySec)
try { $apiKey = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr) }
finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr) }

$results = New-Object 'System.Collections.Generic.List[object]'
$seen = New-Object 'System.Collections.Generic.HashSet[string]'

function Add-Record([string]$browser,[string]$profile,[string]$source,[string]$domain) {
  $id = "$browser|$profile|$source|$domain"
  if ($seen.Add($id) -and $results.Count -lt 1500) {
    $results.Add([pscustomobject]@{browser=$browser;profile=$profile;source=$source;domain=$domain})
  }
}

function Walk-Bookmark($node,[string]$browser,[string]$profile) {
  if ($null -eq $node) { return }
  if ($node.type -eq 'url' -and $node.url) {
    try {
      $uri = [uri]$node.url
      if ($uri.Scheme -in @('http','https') -and $uri.Host -match '^[A-Za-z0-9.-]+$') {
        Add-Record $browser $profile 'bookmark' $uri.Host.ToLowerInvariant()
      }
    } catch {}
  }
  if ($node.children) { foreach ($child in $node.children) { Walk-Bookmark $child $browser $profile } }
}

function Get-ChromiumProfileLabel([string]$rootPath, [string]$folderName) {
  $localState = Join-Path $rootPath 'Local State'
  if (Test-Path -LiteralPath $localState) {
    try {
      $lsJson = Get-Content -LiteralPath $localState -Encoding UTF8 -Raw | ConvertFrom-Json
      $info = $lsJson.profile.info_cache.$folderName
      if ($info -and $info.name -and $info.name -ne $folderName) {
        return "$folderName ($($info.name))"
      }
    } catch {}
  }
  return $folderName
}

$browsers = @(
  @{name='Chrome';root="$env:LOCALAPPDATA\Google\Chrome\User Data";type='multi'},
  @{name='Edge';root="$env:LOCALAPPDATA\Microsoft\Edge\User Data";type='multi'},
  @{name='Brave';root="$env:LOCALAPPDATA\BraveSoftware\Brave-Browser\User Data";type='multi'},
  @{name='Vivaldi';root="$env:LOCALAPPDATA\Vivaldi\User Data";type='multi'},
  @{name='Opera';root="$env:APPDATA\Opera Software\Opera Stable";type='single'},
  @{name='Opera GX';root="$env:APPDATA\Opera Software\Opera GX Stable";type='single'},
  @{name='Firefox';root="$env:APPDATA\Mozilla\Firefox\Profiles";type='firefox'}
)

foreach ($browser in $browsers) {
  if (-not (Test-Path -LiteralPath $browser.root)) { continue }
  Write-Host "Found: $($browser.name)"
  if ($browser.type -eq 'single') { $profiles = @(Get-Item -LiteralPath $browser.root) }
  elseif ($browser.type -eq 'firefox') { $profiles = @(Get-ChildItem -LiteralPath $browser.root -Directory) }
  else { $profiles = @(Get-ChildItem -LiteralPath $browser.root -Directory | Where-Object { $_.Name -eq 'Default' -or $_.Name -like 'Profile *' }) }

  foreach ($profile in $profiles) {
    $profileLabel = if ($browser.type -eq 'multi') { Get-ChromiumProfileLabel $browser.root $profile.Name } else { $profile.Name }
    Add-Record $browser.name $profileLabel 'profile' ''

    if ($browser.type -eq 'firefox') {
      $places = Join-Path $profile.FullName 'places.sqlite'
      if (Test-Path -LiteralPath $places) {
        $tempFile = [System.IO.Path]::GetTempFileName()
        try {
          Copy-Item -LiteralPath $places -Destination $tempFile -Force
          $bytes = [System.IO.File]::ReadAllBytes($tempFile)
          $content = [System.Text.Encoding]::ASCII.GetString($bytes)
          $matches = [regex]::Matches($content, 'https?://([a-zA-Z0-9.-]+\.[a-zA-Z]{2,24})/')
          foreach ($m in $matches) {
            $dom = $m.Groups[1].Value.ToLowerInvariant()
            if ($dom -match '^[a-z0-9-]+(\.[a-z0-9-]+)+$') {
              Add-Record $browser.name $profileLabel 'bookmark' $dom
            }
          }
        } catch {}
        finally { Remove-Item -LiteralPath $tempFile -ErrorAction SilentlyContinue }
      }
      continue
    }

    $bookmarks = Join-Path $profile.FullName 'Bookmarks'
    if (-not (Test-Path -LiteralPath $bookmarks)) { continue }
    try {
      $json = Get-Content -LiteralPath $bookmarks -Encoding UTF8 -Raw | ConvertFrom-Json
      foreach ($root in $json.roots.PSObject.Properties) { Walk-Bookmark $root.Value $browser.name $profileLabel }
    } catch { Write-Warning "Bookmarks unreadable: $($browser.name) / $profileLabel" }
  }
}

$endpoint = "https://$ProjectId.web.app/api/ingest"
$payload = @{deviceLabel=$DeviceLabel;records=@($results.ToArray())} | ConvertTo-Json -Depth 5 -Compress
try {
  $response = Invoke-RestMethod -Uri $endpoint -Method POST -ContentType 'application/json; charset=utf-8' -Headers @{'X-Inventory-Key'=$apiKey} -Body ([Text.Encoding]::UTF8.GetBytes($payload))
  Write-Host "Upload OK: $($response.count) records" -ForegroundColor Green
  Write-Host "Dashboard: https://$ProjectId.web.app"
} finally { $apiKey = $null }
