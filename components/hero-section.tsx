"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Play, Mail } from "lucide-react"

export function HeroSection() {
  const [showContent, setShowContent] = useState(false)
  const [typedText, setTypedText] = useState("")
  const fullText = "Building immersive worlds in 2D, 3D, AR & VR"

  useEffect(() => {
    // Loading animation
    const timer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!showContent) return
    
    let index = 0
    const typeInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(typeInterval)
      }
    }, 50)

    return () => clearInterval(typeInterval)
  }, [showContent])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline opacity-20 pointer-events-none z-10" />
      
      {/* Content */}
      <div className={`relative z-20 max-w-4xl mx-auto px-4 text-center transition-all duration-1000 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        {/* Level indicator */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-card/30 backdrop-blur-sm border border-primary/30 rounded-full">
          <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
          <span className="text-sm font-mono text-neon-green">PLAYER ONLINE</span>
        </div>
        
        {/* Main title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
          <span className="block text-foreground">Game</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-neon-cyan to-neon-green text-glow-blue">
            Developer
          </span>
        </h1>
        
        {/* Tagline with typing effect */}
        <div className="h-8 md:h-10 mb-8">
          <p className="text-lg md:text-xl text-muted-foreground font-mono">
            {typedText}
            <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-pulse" />
          </p>
        </div>
        
        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {[
            { label: "XP", value: "12,450", max: "15,000", color: "primary" },
            { label: "Projects", value: "15+", icon: "🎮" },
            { label: "Years", value: "3+", icon: "⏱️" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2 bg-card/30 backdrop-blur-sm border border-border rounded-lg">
              {"max" in stat ? (
                <>
                  <span className="text-sm font-mono text-muted-foreground">{stat.label}</span>
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-neon-cyan rounded-full transition-all duration-1000"
                      style={{ width: showContent ? "83%" : "0%" }}
                    />
                  </div>
                  <span className="text-sm font-mono text-primary">{stat.value}</span>
                </>
              ) : (
                <>
                  <span className="text-lg">{stat.icon}</span>
                  <div>
                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            size="lg" 
            className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground font-mono"
            asChild
          >
            <a href="#projects">
              <span className="relative z-10 flex items-center gap-2">
                <Play className="w-4 h-4" />
                View Projects
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-neon-cyan to-primary bg-[length:200%_100%] animate-[shimmer_2s_infinite]" style={{ animationName: "shimmer" }} />
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="font-mono border-primary/50 hover:bg-primary/10 hover:border-primary"
            asChild
          >
            <a href="#contact">
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </a>
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span className="text-xs font-mono">SCROLL DOWN</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
      
      {/* Corner decorations */}
      <div className="absolute top-20 left-4 w-20 h-20 border-l-2 border-t-2 border-primary/30 rounded-tl-lg" />
      <div className="absolute top-20 right-4 w-20 h-20 border-r-2 border-t-2 border-primary/30 rounded-tr-lg" />
      <div className="absolute bottom-20 left-4 w-20 h-20 border-l-2 border-b-2 border-primary/30 rounded-bl-lg" />
      <div className="absolute bottom-20 right-4 w-20 h-20 border-r-2 border-b-2 border-primary/30 rounded-br-lg" />
    </section>
  )
}
