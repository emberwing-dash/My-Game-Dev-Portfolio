"use client"

import { useRef, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Trophy, Star, CheckCircle } from "lucide-react"

const certifications = [
  {
    id: 1,
    title: "Unity Junior Programmer",
    issuer: "Unity Technologies",
    description: "Validates skills and competencies to be a proficient junior programmer writing scripts in C# to create interactive experiences with the Unity Editor.",
    year: "2024",
    rarity: "epic",
    imageUrl: "/badges/junior-programmer.png",
    credentialUrl: "https://www.credly.com/badges/43f10be5-8e51-4b68-b38a-b6771cf5f3c7/linked_in_profile",
  },
  {
    id: 2,
    title: "Unity Creative Core",
    issuer: "Unity Technologies",
    description: "Validates core skills in creative production, including shaders, materials, lighting, animation, VFX, post-processing, and prototyping.",
    year: "2024",
    rarity: "epic",
    imageUrl: "/badges/creative-core.png",
    credentialUrl: "https://www.credly.com/badges/541f6c99-7a1a-4a05-bd3f-8245adad97f0/linked_in_profile",
  },
  {
    id: 3,
    title: "Unity AR Development",
    issuer: "Unity Technologies",
    description: "Validates skills and competencies to be a proficient junior developer creating Mobile AR apps compatible with iOS and Android devices.",
    year: "2024",
    rarity: "legendary",
    imageUrl: "/badges/ar-development.png",
    credentialUrl: "https://www.credly.com/badges/114c558e-b8ad-4929-9f73-6499ea139081/linked_in_profile",
  },
  {
    id: 4,
    title: "Unity VR Development",
    issuer: "Unity Technologies",
    description: "Validates skills and competencies to be a proficient junior developer creating VR experiences and working in the VR industry.",
    year: "2024",
    rarity: "legendary",
    imageUrl: "/badges/vr-development.png",
    credentialUrl: "https://www.credly.com/badges/d57dc371-2148-4ede-b4b5-9dd574d03988/linked_in_profile",
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
            <div className="w-full h-full bg-card rounded-[6px] flex items-center justify-center overflow-hidden p-1">
              {cert.imageUrl ? (
                <img 
                  src={cert.imageUrl} 
                  alt={cert.title} 
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-3xl">{rarity.icon}</span>
              )}
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
        <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            <span className="font-mono">ACHIEVEMENT UNLOCKED</span>
          </div>
          {cert.credentialUrl && (
            <a 
              href={cert.credentialUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline font-mono flex items-center gap-1 transition-colors hover:text-primary-foreground"
            >
              Verify ↗
            </a>
          )}
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
            { count: 2, label: "Epic", color: "text-purple-500" },
            { count: 0, label: "Rare", color: "text-blue-500" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.count}</div>
              <div className="text-xs font-mono text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Certification cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {certifications.map((cert, i) => (
            <CertificationCard key={cert.id} cert={cert} index={i} isVisible={isVisible} />
          ))}
        </div>

        {/* Total achievements */}
        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/30 backdrop-blur-sm border border-primary/30 rounded-full">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-mono text-foreground">
              <span className="text-primary font-bold">{certifications.length}/10</span> Achievements Unlocked
            </span>
            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-neon-cyan rounded-full"
                style={{ width: isVisible ? `${(certifications.length / 10) * 100}%` : "0%", transition: "width 1s ease-out" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
