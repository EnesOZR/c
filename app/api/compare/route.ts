import { type NextRequest, NextResponse } from "next/server"
import { PUBGAntiGhost } from "@/lib/pubg-service"

export async function POST(request: NextRequest) {
  try {
    const { streamer, ghost } = await request.json()

    if (!streamer || !ghost) {
      return NextResponse.json({ error: "Both streamer and ghost usernames are required" }, { status: 400 })
    }

    // Fetch matches for both players
    const [streamerMatches, ghostMatches] = await Promise.all([
      PUBGAntiGhost.getMatches(streamer),
      PUBGAntiGhost.getMatches(ghost),
    ])

    // Find common matches
    const commonMatches = PUBGAntiGhost.findCommonMatches(streamerMatches, ghostMatches)

    return NextResponse.json({
      streamer,
      ghost,
      streamerMatches,
      ghostMatches,
      commonMatches,
    })
  } catch (error) {
    console.error("Error comparing matches:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to compare matches" },
      { status: 500 },
    )
  }
}
