import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "oz3R Inc",
  description:
    "StreamSnipe by oz3R Inc - PUBG oyuncuları için gelişmiş ghost detection ve maç analizi aracı. Streamerlara yönelik profesyonel karşılaştırma sistemi.",
  keywords: [
    "StreamSnipe", "PUBG", "anti-ghost", "stream sniper", "ghost detection", "maç analizi", 
    "oyuncu karşılaştırma", "oz3R Inc", "PUBG stream sniper", "PUBG ghost", "PUBG cheater",
    "stream sniper detection", "PUBG match analysis", "PUBG player comparison", "PUBG tools",
    "gaming tools", "streaming tools", "PUBG streaming", "PUBG content creator", "PUBG streamer",
    "PUBG anti-cheat", "PUBG security", "PUBG monitoring", "PUBG analytics", "PUBG statistics",
    "PUBG match history", "PUBG player stats", "PUBG performance", "PUBG competitive",
    "PUBG esports", "PUBG tournament", "PUBG ranking", "PUBG leaderboard", "PUBG community",
    "PUBG discord", "PUBG reddit", "PUBG forum", "PUBG guide", "PUBG tips", "PUBG tricks",
    "PUBG gameplay", "PUBG highlights", "PUBG clips", "PUBG montage", "PUBG compilation",
    "PUBG review", "PUBG news", "PUBG updates", "PUBG patch", "PUBG season", "PUBG battle pass",
    "PUBG mobile", "PUBG PC", "PUBG console", "PUBG Xbox", "PUBG PlayStation", "PUBG Steam",
    "PUBG Epic Games", "PUBG Krafton", "PUBG Bluehole", "PUBG Tencent", "PUBG Lite",
    "PUBG New State", "PUBG Battlegrounds", "PUBG Royale", "PUBG Survival", "PUBG Battle Royale",
    "gaming", "streaming", "twitch", "youtube", "facebook gaming", "mixer", "discord",
    "esports", "competitive gaming", "pro gaming", "gaming community", "gaming tools",
    "streaming software", "streaming tools", "content creation", "gaming content",
    "match analysis", "player analysis", "performance analysis", "gaming analytics",
    "cheat detection", "anti-cheat", "game security", "gaming security", "player monitoring",
    "ghost player", "suspicious player", "reported player", "banned player", "cheater",
    "hacker", "exploiter", "game exploit", "PUBG exploit", "PUBG hack", "PUBG cheat",
    "PUBG mod", "PUBG script", "PUBG bot", "PUBG macro", "PUBG automation", "PUBG farming",
    "PUBG boosting", "PUBG carry", "PUBG smurf", "PUBG alt", "PUBG account", "PUBG profile",
    "PUBG stats", "PUBG KDA", "PUBG win rate", "PUBG damage", "PUBG kills", "PUBG deaths",
    "PUBG assists", "PUBG headshots", "PUBG accuracy", "PUBG survival", "PUBG placement",
    "PUBG ranking", "PUBG tier", "PUBG division", "PUBG league", "PUBG championship",
    "PUBG tournament", "PUBG competition", "PUBG event", "PUBG match", "PUBG game",
    "PUBG round", "PUBG session", "PUBG lobby", "PUBG squad", "PUBG team", "PUBG duo",
    "PUBG solo", "PUBG FPP", "PUBG TPP", "PUBG perspective", "PUBG mode", "PUBG map",
    "PUBG Erangel", "PUBG Miramar", "PUBG Sanhok", "PUBG Vikendi", "PUBG Karakin",
    "PUBG Taego", "PUBG Deston", "PUBG Rondo", "PUBG Haven", "PUBG Kiki", "PUBG Neon",
    "PUBG weapon", "PUBG gun", "PUBG equipment", "PUBG gear", "PUBG loadout",
    "PUBG strategy", "PUBG tactics", "PUBG tips", "PUBG tricks", "PUBG guide",
    "PUBG tutorial", "PUBG walkthrough", "PUBG gameplay", "PUBG mechanics",
    "PUBG meta", "PUBG balance", "PUBG patch", "PUBG update", "PUBG season",
    "PUBG battle pass", "PUBG rewards", "PUBG skins", "PUBG cosmetics",
    "PUBG items", "PUBG currency", "PUBG BP", "PUBG G-Coin", "PUBG UC",
    "PUBG crate", "PUBG box", "PUBG loot", "PUBG drop", "PUBG supply",
    "PUBG airdrop", "PUBG care package", "PUBG vehicle", "PUBG car",
    "PUBG bike", "PUBG boat", "PUBG plane", "PUBG helicopter", "PUBG glider"
  ],
  authors: [{ name: "oz3R Inc" }],
  creator: "oz3R Inc",
  publisher: "oz3R Inc",
  generator: "Next.js",
  applicationName: "StreamSnipe",
  openGraph: {
    title: "StreamSnipe - PUBG Stream Sniper Detection",
    description: "PUBG oyuncuları için gelişmiş ghost detection ve maç analizi aracı",
    type: "website",
    siteName: "StreamSnipe",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "StreamSnipe - PUBG Stream Sniper Detection",
    description: "PUBG oyuncuları için gelişmiş ghost detection ve maç analizi aracı",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className="dark">
      <body className="font-sans pubg-gradient min-h-screen antialiased">
        <Suspense>{children}</Suspense>
      </body>
    </html>
  )
}
