/**
 * PUBG Anti-Ghost Detection Service
 * Handles API calls to PUBG Umbra and ChickenDinner APIs
 */

export interface GhostPlayer {
  name: string
  total: number
}

export interface MatchData {
  matches: string[]
}

export interface ComparisonResult {
  streamer: string
  ghost: string
  streamerMatches: string[]
  ghostMatches: string[]
  commonMatches: string[]
  streamerMatchCount: number
  ghostMatchCount: number
  commonMatchCount: number
}

// API Configuration
const UMBRA_URL = "https://www.pubgumbra.com/src/api/names.php"
const CHICKENDINNER_API = "https://chickendinner.gg/api"

const UMBRA_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  Origin: "https://www.pubgumbra.com",
  Referer: "https://www.pubgumbra.com/",
  "Content-Type": "application/x-www-form-urlencoded",
}

const CHICKENDINNER_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
}

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: Error,
  ) {
    super(message)
    this.name = "APIError"
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ValidationError"
  }
}

export function validateUsername(username: string): string {
  if (!username || typeof username !== "string") {
    throw new ValidationError("Username is required and must be a string")
  }

  const trimmed = username.trim()
  if (trimmed.length === 0) {
    throw new ValidationError("Username cannot be empty")
  }

  if (trimmed.length > 50) {
    throw new ValidationError("Username is too long (max 50 characters)")
  }

  return trimmed
}

export class PUBGAntiGhost {
  /**
   * Fetch ghost players for a given username from PUBG Umbra API
   */
  static async getGhosts(username: string): Promise<GhostPlayer[]> {
    const validatedUsername = validateUsername(username)

    try {
      const formData = new URLSearchParams()
      formData.append("username", validatedUsername)

      const response = await fetch(UMBRA_URL, {
        method: "POST",
        headers: UMBRA_HEADERS,
        body: formData,
      })

      if (!response.ok) {
        throw new APIError(`PUBG Umbra API request failed: ${response.status} ${response.statusText}`, response.status)
      }

      const ghosts = await response.json()

      if (!Array.isArray(ghosts)) {
        throw new APIError("Invalid response format from PUBG Umbra API")
      }

      const validatedGhosts = ghosts
        .filter((ghost) => ghost && typeof ghost.name === "string" && typeof ghost.total === "number")
        .map((ghost) => ({
          name: ghost.name.trim(),
          total: Math.max(0, ghost.total),
        }))
        .sort((a, b) => b.total - a.total) // Sort by total matches descending

      console.log(`Found ${validatedGhosts.length} ghost players for ${validatedUsername}`)
      return validatedGhosts
    } catch (error) {
      if (error instanceof APIError || error instanceof ValidationError) {
        throw error
      }

      console.error(`API request failed for ${validatedUsername}:`, error)
      throw new APIError(
        `Failed to fetch ghost players: ${error instanceof Error ? error.message : "Unknown error"}`,
        undefined,
        error instanceof Error ? error : undefined
      )
    }
  }

  /**
   * Fetch recent matches for a given username from ChickenDinner API
   */
  static async getMatches(username: string): Promise<string[]> {
    const validatedUsername = validateUsername(username)

    try {
      const url = `${CHICKENDINNER_API}/matches?name=${encodeURIComponent(validatedUsername)}&platform=steam`

      const response = await fetch(url, {
        headers: CHICKENDINNER_HEADERS,
      })

      if (!response.ok) {
        if (response.status === 404) {
          throw new APIError(
            `Player not found: ${validatedUsername}. The username may have changed or the player may not exist.`,
            404,
          )
        }
        throw new APIError(
          `ChickenDinner API request failed: ${response.status} ${response.statusText}`,
          response.status,
        )
      }

      const data = await response.json()
      const matches = data.matches || []

      const validatedMatches = Array.isArray(matches)
        ? matches.filter((match) => typeof match === "string" && match.trim().length > 0)
        : []

      console.log(`Found ${validatedMatches.length} matches for ${validatedUsername}`)
      return validatedMatches
    } catch (error) {
      if (error instanceof APIError || error instanceof ValidationError) {
        throw error
      }

      console.error(`Match API request failed for ${validatedUsername}:`, error)
      throw new APIError(
        `Failed to fetch matches: ${error instanceof Error ? error.message : "Unknown error"}`,
        undefined,
        error instanceof Error ? error : undefined
      )
    }
  }

  /**
   * Find common matches between streamer and ghost player
   */
  static findCommonMatches(streamerMatches: string[], ghostMatches: string[]): string[] {
    if (!Array.isArray(streamerMatches) || !Array.isArray(ghostMatches)) {
      return []
    }

    const streamerSet = new Set(streamerMatches)
    const common = ghostMatches.filter((match) => streamerSet.has(match))
    return common.sort()
  }

  /**
   * Added comprehensive comparison method
   * Perform a complete comparison between streamer and ghost player
   */
  static async comparePlayersComplete(streamer: string, ghost: string): Promise<ComparisonResult> {
    const validatedStreamer = validateUsername(streamer)
    const validatedGhost = validateUsername(ghost)

    try {
      // Fetch matches for both players in parallel
      const [streamerMatches, ghostMatches] = await Promise.all([
        this.getMatches(validatedStreamer),
        this.getMatches(validatedGhost),
      ])

      // Find common matches
      const commonMatches = this.findCommonMatches(streamerMatches, ghostMatches)

      return {
        streamer: validatedStreamer,
        ghost: validatedGhost,
        streamerMatches,
        ghostMatches,
        commonMatches,
        streamerMatchCount: streamerMatches.length,
        ghostMatchCount: ghostMatches.length,
        commonMatchCount: commonMatches.length,
      }
    } catch (error) {
      console.error(`Error comparing ${validatedStreamer} and ${validatedGhost}:`, error)
      throw error
    }
  }

  /**
   * Added utility to generate PUBG.sh URLs
   * Generate PUBG.sh URL for match visualization
   */
  static generateMatchURL(username: string, matchId: string, platform = "steam"): string {
    return `https://pubg.sh/${encodeURIComponent(username)}/${platform}/${encodeURIComponent(matchId)}`
  }

  /**
   * Added utility to validate match ID format
   * Basic validation for match ID format
   */
  static isValidMatchId(matchId: string): boolean {
    return typeof matchId === "string" && matchId.length > 10 && /^[a-zA-Z0-9\-_]+$/.test(matchId)
  }
}
