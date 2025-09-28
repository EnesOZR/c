import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "PUBG Anti-Ghost",
    timestamp: new Date().toISOString(),
  })
}
