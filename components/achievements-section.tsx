"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Trophy, Github, Linkedin, Award, Youtube, FileText, Sparkles, ExternalLink } from "lucide-react"

type AchievementCategory = "hackathon" | "ideathon" | "competition"

interface Achievement {
  id: string
  title: string
  reward: string
  description: string
  category: AchievementCategory
  tags?: string[]
  githubUrl?: string
  linkedinUrl?: string
  certificateUrl?: string
  youtubeUrl?: string
  rarity: "legendary" | "epic" | "rare"
}

const achievements: Achievement[] = [
  {
    id: "h1",
    title: "Hackpick Hackathon",
    reward: "Best Team Reward",
    description: "Body Language Detection Project",
    category: "hackathon",
    tags: ["Python", "React", "Node.js", "OpenCV"],
    githubUrl: "https://github.com/emberwing-dash/BodyLanguageDetector",
    linkedinUrl: "https://www.linkedin.com/posts/rishav-goswami-279789354_hackpick2025-teamproton-ai-activity-7360503072407646208-jvB9?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFhkWj0BziEg6UipXXQrz9hgnX-YlUIRfBw",
    certificateUrl: "https://drive.google.com/file/d/1AmKJRDR9831MZlKOkr0VXh6iTyicKj21/view?usp=sharing",
    rarity: "epic",
  },
  {
    id: "h2",
    title: "Arithemania 5.0 Hackathon",
    reward: "3rd Place Reward with 6k Cash Prize",
    description: "VR Methipia is a VR learning experience where users visualize and interact with 3D coordinate geometry and space physics.",
    category: "hackathon",
    tags: ["Unity", "VR", "C#", "3D"],
    githubUrl: "https://github.com/emberwing-dash/VR-Mathipia",
    linkedinUrl: "https://www.linkedin.com/posts/rishav-goswami-279789354_arithemania-hackathon-pesuniversity-activity-7451588563143393280-aNE-?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFhkWj0BziEg6UipXXQrz9hgnX-YlUIRfBw",
    certificateUrl: "https://drive.google.com/file/d/1I13wAMEc3LfZ00uoObmOXEI92ORW7Chl/view?usp=sharing",
    rarity: "rare",
  },
  {
    id: "i1",
    title: "Samsung Prism AR/VR Ideathon",
    reward: "Winner Reward with 30k Cash Prize",
    description: "Immersive VR medieval theme game Crimson Valor.",
    category: "ideathon",
    tags: ["VR", "Game Design", "Unity"],
    githubUrl: "https://github.com/emberwing-dash/Crimson-Valor",
    linkedinUrl: "https://www.linkedin.com/posts/rishav-goswami-279789354_hackathon-arvr-metaverse-activity-7439344208299237376-fRAS?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFhkWj0BziEg6UipXXQrz9hgnX-YlUIRfBw",
    certificateUrl: "https://drive.google.com/file/d/1az65Roe8399ipug2S6e9yu6UrtV8pMtj/view?usp=sharing",
    rarity: "legendary",
  },
  {
    id: "c1",
    title: "Bioscope Short Film Contest",
    reward: "2nd Place Reward with 1.5k Cash Prize",
    description: "Theme: Anti-Ragging short film.",
    category: "competition",
    tags: ["Blender", "Mocopi Motion Tracking", "Rokoko", "Unity", "UE5"],
    githubUrl: "https://github.com/emberwing-dash/Blender-Motion-Capture",
    youtubeUrl: "https://youtu.be/8mRR4a-Cn-A?si=S6Gdp4u2ZI-sWMlZ",
    certificateUrl: "https://drive.google.com/file/d/15cEqx8WcXuzydaxf0QjhQ6OmitW1Aj3J/view?usp=sharing",
    rarity: "rare",
  },
]

const rarityConfig = {
  legendary: {
    gradient: "from-yellow-500 via-orange-500 to-red-500",
    glow: "shadow-[0_0_30px_rgba(234,179,8,0.35)]",
    badge: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    icon: "🏆",
    tierName: "LEGENDARY",
  },
  epic: {
    gradient: "from-purple-500 via-pink-500 to-purple-500",
    glow: "shadow-[0_0_25px_rgba(168,85,247,0.35)]",
    badge: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    icon: "💎",
    tierName: "EPIC REWARD",
  },
  rare: {
    gradient: "from-blue-500 via-cyan-500 to-blue-500",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.35)]",
    badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    icon: "⭐",
    tierName: "RARE UNLOCK",
  },
}

function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const config = rarityConfig[achievement.rarity]

  return (
    <Card
      className={`group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 ${config.glow}`}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated border gradient on hover */}
      <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-0 transition-opacity duration-500 ${isHovered ? "opacity-10" : ""}`} />
      
      {/* Rarity bar at top */}
      <div className="absolute top-0 left-0 right-0 h-1">
        <div className={`h-full bg-gradient-to-r ${config.gradient}`} />
      </div>

      <CardContent className="p-6 relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Header metadata */}
          <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${config.gradient} p-0.5`}>
              <div className="w-full h-full bg-card rounded-[6px] flex items-center justify-center">
                <span className="text-2xl">{config.icon}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge className={`${config.badge} border font-mono text-[10px]`}>
                {config.tierName}
              </Badge>
            </div>
          </div>

          {/* Achievement Title and Reward */}
          <h3 className="font-bold text-xl mb-1 text-foreground group-hover:text-primary transition-colors">
            {achievement.title}
          </h3>
          
          <div className={`inline-flex font-mono text-xs font-semibold px-2 py-0.5 rounded border border-primary/20 bg-primary/10 text-primary mb-4`}>
            {achievement.reward}
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {achievement.description}
          </p>

          {/* Tech tags */}
          {achievement.tags && achievement.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {achievement.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-[10px] bg-muted/65 border border-border hover:bg-primary/15 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Buttons / Actions */}
        <div className="pt-4 border-t border-border/50 flex flex-wrap gap-2">
          {achievement.githubUrl && (
            <Button size="sm" variant="outline" className="flex-1 min-w-[70px] h-8 text-xs border-border hover:border-primary/50" asChild>
              <a href={achievement.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-3.5 h-3.5 mr-1" />
                Code
              </a>
            </Button>
          )}

          {achievement.linkedinUrl && (
            <Button size="sm" variant="outline" className="flex-1 min-w-[85px] h-8 text-xs border-border hover:border-primary/50" asChild>
              <a href={achievement.linkedinUrl} target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-3.5 h-3.5 mr-1 text-[#0a66c2]" />
                LinkedIn
              </a>
            </Button>
          )}

          {achievement.youtubeUrl && (
            <Button size="sm" variant="outline" className="flex-1 min-w-[80px] h-8 text-xs border-border hover:border-primary/50" asChild>
              <a href={achievement.youtubeUrl} target="_blank" rel="noopener noreferrer">
                <Youtube className="w-3.5 h-3.5 mr-1 text-red-500" />
                Watch
              </a>
            </Button>
          )}

          {achievement.certificateUrl && (
            <Button size="sm" variant="outline" className="flex-1 min-w-[95px] h-8 text-xs border-border hover:border-primary/50" asChild>
              <a href={achievement.certificateUrl} target="_blank" rel="noopener noreferrer">
                <FileText className="w-3.5 h-3.5 mr-1 text-yellow-500" />
                Certificate
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function AchievementsSection() {
  const [activeTab, setActiveTab] = useState<AchievementCategory>("hackathon")
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

  const filteredAchievements = achievements.filter((a) => a.category === activeTab)

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-card/30 backdrop-blur-sm border border-primary/30 rounded-full">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">HALL OF FAME</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-primary text-glow-blue">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Milestones unlocked and quest rewards earned through hackathons and competitive events
          </p>
        </div>

        {/* Categories Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as AchievementCategory)} className="w-full">
          <TabsList className={`w-full max-w-xl mx-auto grid grid-cols-3 mb-12 bg-card/50 backdrop-blur-sm border border-border p-1 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <TabsTrigger
              value="hackathon"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono text-xs sm:text-sm transition-all"
            >
              Hackathon
            </TabsTrigger>
            <TabsTrigger
              value="ideathon"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono text-xs sm:text-sm transition-all"
            >
              Ideathon
            </TabsTrigger>
            <TabsTrigger
              value="competition"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono text-xs sm:text-sm transition-all"
            >
              Competitions
            </TabsTrigger>
          </TabsList>

          {/* Grid display */}
          <TabsContent value={activeTab} className="focus:outline-none">
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {filteredAchievements.map((achievement, i) => (
                <div
                  key={achievement.id}
                  className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: `${300 + i * 100}ms` }}
                >
                  <AchievementCard achievement={achievement} index={i} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Stats summary */}
        <div className={`mt-16 flex flex-wrap justify-center gap-8 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {[
            { value: "4", label: "Trophy Rewards", icon: "🏆" },
            { value: "3", label: "Categories Completed", icon: "⚔️" },
            { value: "37.5k+", label: "Prize Pool Won (INR)", icon: "💰" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="flex items-center justify-center gap-2 text-3xl font-bold text-foreground">
                <span>{stat.icon}</span>
                <span>{stat.value}</span>
              </div>
              <p className="text-sm text-muted-foreground font-mono">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
