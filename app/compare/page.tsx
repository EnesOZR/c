"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MatchList } from "@/components/match-list"
import { MatchViewer } from "@/components/match-viewer"
import { GhostStats } from "@/components/ghost-stats"

// Simple SVG icons as components
const ArrowLeftIcon = () => (
  <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 19l-7-7m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
)

const HomeIcon = () => (
  <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
)

interface CompareData {
  streamer: string
  ghost: string
  streamerMatches: string[]
  ghostMatches: string[]
  commonMatches: string[]
  streamerMatchCount: number
  ghostMatchCount: number
  commonMatchCount: number
}

export default function ComparePage() {
  const [data, setData] = useState<CompareData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("matches")

  const router = useRouter()
  const searchParams = useSearchParams()
  const streamer = searchParams.get("streamer") || ""
  const ghost = searchParams.get("ghost") || ""

  useEffect(() => {
    if (!streamer || !ghost) {
      router.push("/")
      return
    }

    fetchComparison()
  }, [streamer, ghost, router])

  const fetchComparison = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/compare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ streamer, ghost }),
      })

      if (!response.ok) {
        throw new Error("Failed to compare matches")
      }

      const compareData = await response.json()
      setData({
        ...compareData,
        streamerMatchCount: compareData.streamerMatches?.length || 0,
        ghostMatchCount: compareData.ghostMatches?.length || 0,
        commonMatchCount: compareData.commonMatches?.length || 0,
      })
    } catch (err) {
      console.error("Error comparing matches:", err)
      setError(
        "Maç karşılaştırması geçici olarak başarısız oldu. " +
          "Oyuncu adında değişiklik olmuş olabilir veya kayıt bulunamadı. " +
          "Lütfen birkaç saniye sonra tekrar deneyin.",
      )
    } finally {
      setLoading(false)
    }
  }

  const handleMatchSelect = (matchId: string) => {
    setSelectedMatch(matchId)
    setActiveTab("detail")
  }

  const hasTeamMatches = (matches: string[]) => {
    return matches.length > 0
  }

  const shouldShowStats = data && hasTeamMatches(data.commonMatches) && activeTab === "matches"

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Yükleniyor...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <Card className="bg-slate-800/50 border-slate-700 max-w-md">
          <CardContent className="pt-6">
            <Alert className="border-red-500/50 bg-red-500/10">
              <AlertDescription className="text-red-200">{error}</AlertDescription>
            </Alert>
            <div className="mt-4 flex gap-2">
              <Link href="/">
                <Button variant="outline" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                  Ana Sayfa
                </Button>
              </Link>
              <Button onClick={fetchComparison} className="bg-blue-600 hover:bg-blue-700">
                Tekrar Dene
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href={`/ghosts?streamer=${encodeURIComponent(streamer)}`}>
            <Button variant="outline" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
              <ArrowLeftIcon />
              Ghostlara Dön
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
              <HomeIcon />
              Ana Sayfa
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">
            {data?.streamer} & {data?.ghost}
          </h1>
        </div>

        {shouldShowStats && (
          <div className="mb-6">
            <GhostStats
              streamer={data.streamer}
              ghost={data.ghost}
              streamerMatchCount={data.streamerMatchCount}
              ghostMatchCount={data.ghostMatchCount}
              commonMatchCount={data.commonMatchCount}
            />
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="matches" className="data-[state=active]:bg-slate-700">
              Ortak Maçlar ({data?.commonMatchCount || 0})
            </TabsTrigger>
            {selectedMatch && (
              <TabsTrigger value="detail" className="data-[state=active]:bg-slate-700">
                Maç Detayı
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="matches">
            {data && (
              <MatchList
                matches={data.commonMatches}
                streamer={data.streamer}
                ghost={data.ghost}
                onMatchSelect={handleMatchSelect}
                selectedMatch={selectedMatch}
              />
            )}
          </TabsContent>

          {selectedMatch && data && (
            <TabsContent value="detail">
              <MatchViewer streamer={data.streamer} ghost={data.ghost} matchId={selectedMatch} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  )
}
