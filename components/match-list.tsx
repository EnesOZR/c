"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface MatchListProps {
  matches: string[]
  streamer: string
  ghost: string
  onMatchSelect?: (matchId: string) => void
  selectedMatch?: string
}

export function MatchList({ matches, streamer, ghost, onMatchSelect, selectedMatch }: MatchListProps) {
  if (!matches || matches.length === 0) {
    return (
      <Alert className="border-amber-500/50 bg-amber-500/10">
        <AlertDescription className="text-amber-200">14 Gün içinde hiç ortak maç bulunamadı.</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardContent className="pt-6">
        <div className="space-y-2">
          {matches.map((match, index) => (
            <div
              key={index}
              onClick={() => onMatchSelect?.(match)}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 hover:translate-x-1 ${
                selectedMatch === match ? "bg-blue-600 hover:bg-blue-700" : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <Badge variant="secondary" className="bg-slate-800 text-slate-300 flex-shrink-0">
                  {index + 1}
                </Badge>
                <span className="text-white font-mono text-sm break-all">
                  logGameData: {streamer}/{ghost}/steam/{match}
                </span>
              </div>
              <span className="text-slate-400 flex-shrink-0 ml-2">›</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
