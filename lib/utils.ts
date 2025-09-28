import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPlayerName(name: string): string {
  return name.trim().replace(/[<>]/g, "")
}

export function formatMatchCount(count: number): string {
  if (count === 0) return "Hiç"
  if (count === 1) return "1 maç"
  return `${count} maç`
}

export function getRelativeTimeString(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return "Az önce"
  if (diffInHours < 24) return `${diffInHours} saat önce`

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays} gün önce`

  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) return `${diffInWeeks} hafta önce`

  return date.toLocaleDateString("tr-TR")
}

export function truncateMatchId(matchId: string, maxLength = 20): string {
  if (matchId.length <= maxLength) return matchId
  return `${matchId.substring(0, maxLength)}...`
}
