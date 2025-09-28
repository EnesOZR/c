"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface GhostStatsProps {
  streamer: string
  ghost: string
  streamerMatchCount: number
  ghostMatchCount: number
  commonMatchCount: number
}

export function GhostStats({
  streamer,
  ghost,
  streamerMatchCount,
  ghostMatchCount,
  commonMatchCount,
}: GhostStatsProps) {
  const matchPercentage = streamerMatchCount > 0 ? ((commonMatchCount / streamerMatchCount) * 100).toFixed(1) : "0"

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-lg text-white">Maç İstatistikleri</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{streamerMatchCount}</div>
            <div className="text-sm text-slate-400">{streamer} Maçları</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{ghostMatchCount}</div>
            <div className="text-sm text-slate-400">{ghost} Maçları</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{commonMatchCount}</div>
            <div className="text-sm text-slate-400">Ortak Maçlar</div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <span className="text-slate-300">Eşleşme Oranı:</span>
          <Badge
            variant={Number.parseFloat(matchPercentage) > 10 ? "destructive" : "secondary"}
            className={Number.parseFloat(matchPercentage) > 10 ? "bg-red-600" : "bg-slate-600"}
          >
            %{matchPercentage}
          </Badge>
        </div>

        {Number.parseFloat(matchPercentage) > 20 && (
          <div className="text-center text-amber-400 text-sm">⚠️ Yüksek eşleşme oranı tespit edildi</div>
        )}
      </CardContent>
    </Card>
  )
}
