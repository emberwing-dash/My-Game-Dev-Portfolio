"use client"

import { useRef, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Trophy, Star, CheckCircle } from "lucide-react"

const certifications = [
  {
    id: 1,
    title: "Unity Certified Developer",
    issuer: "Unity Technologies",
    description: "Professional certification for Unity game development expertise.",
    year: "2024",
    rarity: "legendary",
  },
  {
    id: 2,
    title: "Unreal Engine Expert",
    issuer: "Epic Games",
    description: "Advanced certification in Unreal Engine development and optimization.",
    year: "2023",
    rarity: "epic",
  },
  {
    id: 3,
    title: "AR/VR Development Specialist",
    issuer: "Meta",
    description: "Specialized certification for immersive experience development.",
    year: "2024",
    rarity: "legendary",
  },
  {
    id: 4,
    title: "C# Programming Mastery",
    issuer: "Microsoft",
    description: "Advanced proficiency in C# programming and .NET framework.",
    year: "2023",
    rarity: "epic",
  },
  {
    id: 5,
    title: "Game Design Fundamentals",
    issuer: "Coursera",
    description: "Comprehensive understanding of game design principles and mechanics.",
    year: "2022",
    rarity: "rare",
  },
  {
    id: 6,
    title: "3D Modeling & Animation",
    issuer: "Blender Foundation",
    description: "Proficiency in 3D modeling, rigging, and animation using Blender.",
    year: "2023",
    rarity: "epic",
  },
]

const rarityConfig = {
  legendary: {
    gradient: "from-yellow-500 via-orange-500 to-red-500",
    glow: "shadow-[0_0_30px_rgba(234,179,8,0.3)]",
    badge: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
    icon: "🏆",
  },
  epic: {
    gradient: "from-purple-500 via-pink-500 to-purple-500",
    glow: "shadow-[0_0_25px_rgba(168,85,247,0.3)]",
    badge: "bg-purple-500/20 text-purple-500 border-purple-500/30",
    icon: "⭐",
  },
  rare: {
    gradient: "from-blue-500 via-cyan-500 to-blue-500",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.3)]",
    badge: "bg-blue-500/20 text-blue-500 border-blue-500/30",
    icon: "💎",
  },
}

function CertificationCard({ cert, index, isVisible }: { cert: typeof certifications[0]; index: number; isVisible: boolean }) {
  const [isHovered, setIsHovered] = useState(false)
  const rarity = rarityConfig[cert.rarity as keyof typeof rarityConfig]

  return (
    <Card
      className={`relative overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 ${rarity.glow} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated border gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${rarity.gradient} opacity-0 transition-opacity duration-500 ${isHovered ? "opacity-10" : ""}`} />
      
      {/* Achievement unlocked effect */}
      <div className="absolute top-0 left-0 right-0 h-1">
        <div className={`h-full bg-gradient-to-r ${rarity.gradient}`} />
      </div>

      <CardContent className="p-6 relative z-10">
        {/* Icon and rarity */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${rarity.gradient} p-0.5`}>
            <div className="w-full h-full bg-card rounded-[6px] flex items-center justify-center">
              <span className="text-3xl">{rarity.icon}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={`${rarity.badge} border font-mono text-xs`}>
              {cert.rarity.toUpperCase()}
            </Badge>
            <span className="text-xs text-muted-foreground font-mono">{cert.year}</span>
          </div>
        </div>

        {/* Content */}
        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
          {cert.title}
        </h3>
        <p className="text-sm text-primary mb-3 font-mono flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          {cert.issuer}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {cert.description}
        </p>

        {/* Achievement unlock text */}
        <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-2 text-xs text-muted-foreground">
          <Award className="w-4 h-4 text-primary" />
          <span className="font-mono">ACHIEVEMENT UNLOCKED</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function CertificationsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-card/30 backdrop-blur-sm border border-primary/30 rounded-full">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">ACHIEVEMENTS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary text-glow-blue">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Badges and achievements earned throughout my game development journey
          </p>
        </div>

        {/* Achievement stats */}
        <div className={`flex justify-center gap-8 mb-12 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {[
            { count: 2, label: "Legendary", color: "text-yellow-500" },
            { count: 3, label: "Epic", color: "text-purple-500" },
            { count: 1, label: "Rare", color: "text-blue-500" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.count}</div>
              <div className="text-xs font-mono text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Certification cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <CertificationCard key={cert.id} cert={cert} index={i} isVisible={isVisible} />
          ))}
        </div>

        {/* Total achievements */}
        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/30 backdrop-blur-sm border border-primary/30 rounded-full">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-mono text-foreground">
              <span className="text-primary font-bold">{certifications.length}/50</span> Achievements Unlocked
            </span>
            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-neon-cyan rounded-full"
                style={{ width: isVisible ? "12%" : "0%", transition: "width 1s ease-out" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
