"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RefreshCw, Info } from "lucide-react"

interface MatchViewerProps {
  streamer: string
  ghost: string
  matchId: string
  onClose?: () => void
}

export function MatchViewer({ streamer, ghost, matchId, onClose }: MatchViewerProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)

    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [matchId])

  const reloadFrames = () => {
    setLoading(true)
    setError(false)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-1 px-3">
            <CardTitle className="text-sm text-white">Streamer: {streamer}</CardTitle>
          </CardHeader>
          <CardContent className="p-0 px-3 pb-3">
            {loading ? (
              <div className="h-[580px] bg-slate-700 rounded flex items-center justify-center">
                <div className="text-slate-400">Yükleniyor...</div>
              </div>
            ) : error ? (
              <div className="h-[580px] bg-slate-700 rounded flex items-center justify-center">
                <div className="text-red-400">Yükleme hatası</div>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded" style={{ height: '580px' }}>
                <iframe
                  src={`https://pubg.sh/${streamer}/steam/${matchId}`}
                  className="w-full border-0"
                  style={{ 
                    height: '640px',
                    transform: 'translateY(-60px)',
                    pointerEvents: 'auto',
                    userSelect: 'none',
                    overflow: 'hidden'
                  }}
                  title={`${streamer} match`}
                  onError={() => setError(true)}
                  scrolling="no"
                  frameBorder="0"
                  allowTransparency={true}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-1 px-3">
            <CardTitle className="text-sm text-white">Ghost: {ghost}</CardTitle>
          </CardHeader>
          <CardContent className="p-0 px-3 pb-3">
            {loading ? (
              <div className="h-[580px] bg-slate-700 rounded flex items-center justify-center">
                <div className="text-slate-400">Yükleniyor...</div>
              </div>
            ) : error ? (
              <div className="h-[580px] bg-slate-700 rounded flex items-center justify-center">
                <div className="text-red-400">Yükleme hatası</div>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded" style={{ height: '580px' }}>
                <iframe
                  src={`https://pubg.sh/${ghost}/steam/${matchId}`}
                  className="w-full border-0"
                  style={{ 
                    height: '640px',
                    transform: 'translateY(-60px)',
                    pointerEvents: 'auto',
                    userSelect: 'none',
                    overflow: 'hidden'
                  }}
                  title={`${ghost} match`}
                  onError={() => setError(true)}
                  scrolling="no"
                  frameBorder="0"
                  allowTransparency={true}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Alert className="border-amber-500/50 bg-amber-500/10 mt-2">
        <Info className="h-4 w-4 text-amber-500" />
        <AlertDescription className="text-amber-200 flex items-center justify-between">
          <span>
            2D Harita yüklenmezse tarayıcı kısıtlamaları veya ağ gecikmesi nedeniyle olabilir. Lütfen Yenile butonuna
            tıklayın. Gerekirse sayfayı tekrar yükleyin.
          </span>
          <div className="flex gap-2 ml-4">
            <Button onClick={reloadFrames} size="sm" className="bg-blue-600 hover:bg-blue-700">
              <RefreshCw className="mr-2 h-4 w-4" />
              Yenile
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}
