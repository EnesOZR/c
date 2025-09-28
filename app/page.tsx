"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import "../styles/pubg-background.css"
import "../styles/oz3r-animations.css"

// Simple SVG icons as components
const InfoIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const LoaderIcon = () => (
  <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
)

export default function HomePage() {
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim()) {
      setError("Lütfen geçerli bir kullanıcı adı girin.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/ghosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username.trim() }),
      })

      if (!response.ok) {
        throw new Error("API request failed")
      }

      router.push(`/ghosts?streamer=${encodeURIComponent(username.trim())}`)
    } catch (err) {
      console.error("Error:", err)
      setError(
        "Kullanıcı bulunamadı veya API geçici olarak yanıt vermedi. " +
          "Lütfen kullanıcı adını doğru yazdığınızdan emin olun (büyük/küçük harf), " +
          "birkaç saniye sonra tekrar deneyin.",
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen wallpaper-background flex items-center justify-center p-4 relative overflow-hidden page-no-select">
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      <div className="w-full max-w-md relative z-20">
        <Card 
          data-slot="card"
          className="glass-container bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl rounded-3xl border-2 overflow-hidden relative"
        >
          {/* Animated water-like background */}
          <div className="absolute inset-0 water-animation opacity-30"></div>
          
          {/* Floating particles */}
          <div className="absolute inset-0 floating-particles"></div>
          
          <CardHeader className="text-center p-8 relative z-10">
            <div className="mb-6">
              <CardTitle className="text-4xl font-bold text-white drop-shadow-2xl mb-3 tracking-wide no-select">
              StreamSnipe App v2.1.420
              </CardTitle>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto rounded-full mb-4"></div>
            </div>
            
            <div className="space-y-3">
              <CardDescription className="text-white/95 text-xl font-semibold leading-relaxed no-select">
                PUBG Stream Sniper Detection
              </CardDescription>
              
              <div className="flex items-center justify-center space-x-4 text-white/80 no-select">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span className="text-sm font-medium">Developed by</span>
                  <span className="text-sm font-semibold oz3r-gold-text oz3r-gold-glow">oz3R Inc</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-6 text-white/70 text-sm no-select">
                <span className="flex items-center space-x-1">
                  <span className="feature-dot"></span>
                  <span>Professional Gaming Solutions</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="feature-dot"></span>
                  <span>Advanced Analytics</span>
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-8 relative z-10">
            <Alert className="glass-alert border-amber-400/30 bg-amber-500/10 backdrop-blur-sm rounded-2xl border-2 no-select">
              <InfoIcon />
              <AlertDescription className="text-amber-100 text-sm leading-relaxed">
                Bu hizmet, kıyaslama amacıyla belirli sayıda maç geçmişini kullanır. Sizin ile aradığınız oyuncunun
                geçmişindeki ortak karşılaşmaları listeler ve 2D Haritada gösterir. Tüm maç geçmişine erişim gereksinimi
                için lütfen yönetici ile iletişime geçiniz. Telegram / @EnesOzer
              </AlertDescription>
            </Alert>

            {error && (
              <Alert className="glass-alert border-red-400/30 bg-red-500/10 backdrop-blur-sm rounded-2xl border-2 no-select">
                <AlertDescription className="text-red-100 text-sm">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Steam PUBG Kullanıcı Adınız (Büyük/Küçük Harf Duyarlı)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="glass-input bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:ring-amber-400/50 focus:border-amber-400/50 backdrop-blur-sm rounded-2xl h-14 text-base border-2 transition-all duration-300 hover:bg-white/15"
                  required
                  disabled={loading}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/20 to-orange-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              <Button 
                type="submit" 
                className="w-full glass-button bg-gradient-to-r from-amber-500/80 to-orange-500/80 hover:from-amber-600/90 hover:to-orange-600/90 text-white font-semibold shadow-xl rounded-2xl h-14 text-base backdrop-blur-sm border-2 border-white/20 transition-all duration-300 hover:shadow-2xl" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoaderIcon />
                    <span className="ml-2">Analyzing...</span>
                  </>
                ) : (
                  <span className="flex items-center justify-center">
                    <span className="mr-2">→</span>
                    Start Analysis
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
