"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Play, Github, Eye, Gamepad2, Smartphone, Box, Square } from "lucide-react"

type ProjectCategory = "vr" | "ar" | "3d" | "2d"

interface Project {
  id: string
  title: string
  description: string
  category: ProjectCategory
  tags: string[]
  playUrl?: string
  githubUrl?: string
  featured?: boolean
  imageUrl?: string
  containImage?: boolean
}

const projects: Project[] = [
  // VR Projects
  { id: "vr1", title: "Crimson Valor", description: "First-person open world adventure game in the land of sword.", category: "vr", tags: ["Unity", "VR SDK", "C#"], playUrl: "https://codebreaker0.itch.io/crimson-valor", githubUrl: "https://github.com/emberwing-dash/Crimson-Valor", featured: true, imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vr1-Q9yg7pp67GDTHTqlzVytIKPmyCsqC2.png" },
  { id: "vr2", title: "Lumora", description: "An immersive learning environment for various subjects.", category: "vr", tags: ["Unity", "VR SDK", "Education"], playUrl: "https://rishav-goswami.itch.io/lumora", githubUrl: "https://github.com/emberwing-dash/Lumora", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vr2-XxC6e1u4BDhuij170NYzIU57NdfE7d.jpg" },
  // AR Projects
  { id: "ar1", title: "Train Simulation", description: "Simulation train in AR world.", category: "ar", tags: ["Unity", "AR Core", "C#"], featured: true, imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ar1-tAEwrSoQwzSMOvkbrNjEsuGdSs4jFI.png" },
  { id: "ar2", title: "AR Play", description: "Interactive objects and characters in augmented reality.", category: "ar", tags: ["Unity", "AR Foundation", "Interactive"], imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ar2-PwfRlpGxy50I35vytTXpU2DuCXVOrz.png" },
  // 3D Projects
  { id: "3d1", title: "Dani's Milky Adventure", description: "MILK = STRONG BONES", category: "3d", tags: ["Unity", "C#", "Adventure"], playUrl: "https://phoenixriderdev.itch.io/danis-milky-adventure", githubUrl: "https://github.com/PhoenixRider8/Dani-s-Milky-Adventure", featured: true, imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3d_1-KyejWKnpG3R5doYgnQfaMqQlszwQ0p.png" },
  { id: "3d2", title: "Inferno Overdrive", description: "First person shooter game where you kill infernals.", category: "3d", tags: ["Unity", "FPS", "Action"], playUrl: "https://phoenixriderdev.itch.io/inferno-overdrive", githubUrl: "https://github.com/PhoenixRider8/Inferno-Overdrive", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3d_2-04mF39TselDRn1FEIKY0IKp3hvWYbY.png" },
  { id: "3d3", title: "Anya Play Time", description: "Enjoy play fun mini-games with Anya.", category: "3d", tags: ["Unity", "Mini-games", "Anime"], playUrl: "https://codebreaker0.itch.io/anya-play-time", githubUrl: "https://github.com/emberwing-dash/Anya-Arcade-Fun-Time", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3d_3-KanmkxNrBMcOvGbuKMy5N5GMNSYH0Y.png", containImage: true },
  { id: "3d4", title: "Grave Souls", description: "Halloween maze game.", category: "3d", tags: ["Unity", "Horror", "Halloween"], playUrl: "https://codebreaker0.itch.io/grave-souls", githubUrl: "https://github.com/emberwing-dash/GraveSouls", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3d_4-WZel9AAoPTbhJLUBznzqm9m0tRMd0d.png" },
  { id: "3d5", title: "Summit of the Black Blades", description: "3D adventure + Platformer game with Fran.", category: "3d", tags: ["Unity", "Adventure", "Platformer"], playUrl: "https://rishav-goswami.itch.io/summit-of-the-black-blades", githubUrl: "https://github.com/emberwing-dash/Summit-of-the-Black-Blades", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3d_5-831Pmy87MenxUY39nnDcFdYOwYVzba.png" },
  // 2D Projects
  { id: "2d1", title: "Wild Hare Run: A Quest for Carrots", description: "Play as a rabbit and collect carrots. Surprise twist at the end ;)", category: "2d", tags: ["Unity", "Pixel Art", "Adventure"], playUrl: "https://phoenixriderdev.itch.io/wild-hare-run-a-quest-for-carrots", githubUrl: "https://github.com/PhoenixRider8/Wild-Hare-Run-A-Quest-for-Carrots", featured: true, imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2d_1-yIwHEZjf5MbBVLwAzhVnzOyKqyzSys.png" },
  { id: "2d2", title: "Slippery Slime", description: "Avoid slipping and falling. Defeat the slimes that invaded the sewers.", category: "2d", tags: ["GDevelop", "Platformer", "Action"], playUrl: "https://phoenixriderdev.itch.io/slippery-slime", githubUrl: "https://github.com/PhoenixRider8/GDevelop-GameJam-5-Slippery-Slime-", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2d_2-AXHeB3brMUSZzuNTmG3qc0pOQW8g4e.png" },
  { id: "2d3", title: "Ascend to Skypia", description: "Ascend to skypia via your pirate ship.", category: "2d", tags: ["Unity", "One Piece", "Adventure"], playUrl: "https://phoenixriderdev.itch.io/ascend-to-skypiea", githubUrl: "https://github.com/PhoenixRider8/Speed-Jam-5-Ascend-to-Skypiea-", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2d_3-Xr3LOjNKLHihmNTMUFkb2MvlofkE63.png" },
  { id: "2d4", title: "Spin Rush", description: "Spin your way through all bosses.", category: "2d", tags: ["Unity", "Boss Rush", "Action"], playUrl: "https://phoenixriderdev.itch.io/spin-rush", githubUrl: "https://github.com/PhoenixRider8/Spin-Rush", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2d_4-hKTwAJgJVdv7TUbAhuvBI9IS2Mxj1K.jpg" },
  { id: "2d5", title: "Xeno Odd Files", description: "Find the odd files in your directory and solve the puzzle.", category: "2d", tags: ["Unity", "Puzzle", "Detective"], playUrl: "https://phoenixriderdev.itch.io/odd-files-xeno-search", githubUrl: "https://github.com/PhoenixRider8/Odd-Files-Xeno-Search", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2d_5-DAp6kWFL1kqf6IxRfnaEZGyaccGCOL.png" },
  { id: "2d6", title: "PokeLock", description: "Play soccer but with pokemon.", category: "2d", tags: ["Unity", "Pokemon", "Sports"], playUrl: "https://codebreaker0.itch.io/pokelock", githubUrl: "https://github.com/emberwing-dash/PokeLock", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2d_6-1N9l5TcffdB05kfv0Jh7yJtamh68hw.png" },
]

const categoryInfo = {
  vr: { icon: Eye, label: "VR Projects", color: "primary" },
  ar: { icon: Smartphone, label: "AR Projects", color: "neon-cyan" },
  "3d": { icon: Box, label: "3D Games", color: "neon-green" },
  "2d": { icon: Square, label: "2D Games", color: "primary" },
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card 
      className={`group relative bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 overflow-hidden`}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-neon-green/20 text-neon-green border border-neon-green/30">
            ⭐ Featured
          </Badge>
        </div>
      )}
      
      {/* Project thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-muted to-card overflow-hidden">
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`text-6xl transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}>
              {project.category === "vr" ? "🥽" : 
               project.category === "ar" ? "📱" : 
               project.category === "3d" ? "🎮" : "👾"}
            </div>
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            {project.playUrl && project.playUrl !== "#" && (
              <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90" asChild>
                <a href={project.playUrl} target="_blank" rel="noopener noreferrer">
                  <Play className="w-4 h-4 mr-1" />
                  Play
                </a>
              </Button>
            )}
            {project.githubUrl && project.githubUrl !== "#" && (
              <Button size="sm" variant="outline" className="flex-1 border-primary/50" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-1" />
                  Code
                </a>
              </Button>
            )}
          </div>
        </div>
        
        {/* Scanline effect */}
        <div className="absolute inset-0 scanline opacity-10" />
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-xs bg-muted/50 hover:bg-primary/20 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      {/* Glow effect on hover */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-neon-cyan/10" />
      </div>
    </Card>
  )
}

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<ProjectCategory>("vr")
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

  const filteredProjects = projects.filter((p) => p.category === activeTab)

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-card/30 backdrop-blur-sm border border-primary/30 rounded-full">
            <Gamepad2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">QUEST LOG</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-primary text-glow-blue">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my completed quests and ongoing adventures in game development
          </p>
        </div>

        {/* Category tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ProjectCategory)} className="w-full">
          <TabsList className={`w-full max-w-2xl mx-auto grid grid-cols-4 mb-10 bg-card/50 backdrop-blur-sm border border-border p-1 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {(Object.entries(categoryInfo) as [ProjectCategory, typeof categoryInfo.vr][]).map(([key, info]) => {
              const Icon = info.icon
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono text-xs sm:text-sm transition-all"
                >
                  <Icon className="w-4 h-4 mr-1.5 hidden sm:block" />
                  {info.label.split(" ")[0]}
                </TabsTrigger>
              )
            })}
          </TabsList>

          {(Object.keys(categoryInfo) as ProjectCategory[]).map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                  .filter((p) => p.category === category)
                  .map((project, i) => (
                    <div
                      key={project.id}
                      className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                      style={{ transitionDelay: `${300 + i * 100}ms` }}
                    >
                      <ProjectCard project={project} index={i} />
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Stats bar */}
        <div className={`mt-16 flex flex-wrap justify-center gap-8 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {[
            { value: "17+", label: "Projects Completed", icon: "🎮" },
            { value: "4", label: "Categories", icon: "📁" },
            { value: "100%", label: "Passion", icon: "❤️" },
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
