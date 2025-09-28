import { type NextRequest, NextResponse } from "next/server"
import { PUBGAntiGhost } from "@/lib/pubg-service"

export async function POST(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_CLIENT_ONLY === 'true') {
    return NextResponse.json({ error: 'API disabled on static hosting' }, { status: 503 })
  }
  try {
    const { username } = await request.json()

    if (!username || typeof username !== "string") {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    const ghosts = await PUBGAntiGhost.getGhosts(username.trim())

    return NextResponse.json({ ghosts })
  } catch (error) {
    console.error("Error fetching ghosts:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch ghost players" },
      { status: 500 },
    )
  }
}
