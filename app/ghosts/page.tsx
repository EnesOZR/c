"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { GhostPlayer } from "@/lib/pubg-service"

// Simple SVG icons as components
const ArrowLeftIcon = () => (
  <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
)

const XIcon = () => (
  <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export default function GhostsPage() {
  const [ghosts, setGhosts] = useState<GhostPlayer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [nameFilter, setNameFilter] = useState("")
  const [minMatches, setMinMatches] = useState("")

  const router = useRouter()
  const searchParams = useSearchParams()
  const streamer = searchParams.get("streamer") || ""

  useEffect(() => {
    if (!streamer) {
      router.push("/")
      return
    }

    fetchGhosts()
  }, [streamer, router])

  const fetchGhosts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/ghosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: streamer }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch ghosts")
      }

      const data = await response.json()
      setGhosts(data.ghosts || [])
    } catch (err) {
      console.error("Error fetching ghosts:", err)
      setError("Ghost oyuncular yüklenirken hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  const filteredGhosts = useMemo(() => {
    return ghosts.filter((ghost) => {
      const nameMatch = nameFilter === "" || ghost.name.toLowerCase().includes(nameFilter.toLowerCase())

      const minMatchesNum = Number.parseInt(minMatches) || 0
      const matchesMatch = ghost.total >= minMatchesNum

      return nameMatch && matchesMatch
    })
  }, [ghosts, nameFilter, minMatches])

  const clearFilters = () => {
    setNameFilter("")
    setMinMatches("")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <Button variant="outline" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
              <ArrowLeftIcon />
              Ana Sayfa
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">Eşleşen Tüm Oyuncular</h1>
          <div className="w-24"></div>
        </div>

        <div className="text-center mb-6">
          <p className="text-slate-300 text-align-center">
            <strong className="text-white">{streamer}</strong>
          </p>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-4">
              <Input
                placeholder="İsme göre ara (anlık)"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 flex-1 min-w-48"
              />
              <Input
                type="number"
                placeholder="Min. eşleşme sayısı"
                value={minMatches}
                onChange={(e) => setMinMatches(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 w-48"
                min="0"
              />
              <Button
                variant="outline"
                onClick={clearFilters}
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                <XIcon />
                Temizle
              </Button>
            </div>
            <p className="text-sm text-slate-400">{filteredGhosts.length} sonuç</p>
          </CardHeader>

          <CardContent>
            {error && <div className="text-red-400 text-center py-4">{error}</div>}

            {filteredGhosts.length === 0 && !error ? (
              <div className="text-center py-8 text-slate-400">
                {ghosts.length === 0 ? "Hiç ghost oyuncu bulunamadı." : "Filtreye uygun sonuç bulunamadı."}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredGhosts.map((ghost, index) => (
                  <Link
                    key={index}
                    href={`/compare?streamer=${encodeURIComponent(streamer)}&ghost=${encodeURIComponent(ghost.name)}`}
                    className="flex items-center justify-between p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all duration-200 hover:translate-x-1"
                  >
                    <span className="text-white font-medium">{ghost.name}</span>
                    <Badge variant="secondary" className="bg-slate-800 text-slate-300">
                      {ghost.total}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
