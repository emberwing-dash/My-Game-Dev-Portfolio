"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, GraduationCap, Code, Sparkles, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

const skills = [
  { name: "Unity", level: 100, tier: "Advanced", color: "primary" },
  { name: "Unreal Engine", level: 30, tier: "Beginner", color: "neon-cyan" },
  { name: "Python", level: 80, tier: "Intermediate", color: "neon-green" },
  { name: "C++", level: 70, tier: "Intermediate", color: "primary" },
  { name: "Blender", level: 80, tier: "Intermediate", color: "neon-cyan" },
  { name: "AR/VR Development", level: 100, tier: "Advanced", color: "neon-green" },
]

const technologies = [
  { name: "Unity", icon: "🎮" },
  { name: "Unreal", icon: "🔥" },
  { name: "C#", icon: "💜" },
  { name: "C++", icon: "⚡" },
  { name: "Blender", icon: "🎨" },
  { name: "Mocopi", icon: "🕺" },
  { name: "Git", icon: "📦" },
  { name: "AR Core", icon: "📱" },
  { name: "VR SDK", icon: "🥽" },
  { name: "Docker", icon: "🐳" },
  { name: "SQL", icon: "🗄️" },
]

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-card/30 backdrop-blur-sm border border-primary/30 rounded-full">
            <User className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">PLAYER STATS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-primary text-glow-blue">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Level up your understanding of who I am and what I do
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Profile Card */}
          <Card className={`bg-card/50 backdrop-blur-sm border-primary/20 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <CardContent className="p-6">
              {/* Avatar */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-neon-cyan to-neon-green rounded-full animate-spin-slow" style={{ animationDuration: "8s" }} />
                <div className="absolute inset-1 bg-card rounded-full overflow-hidden">
                  <img 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rishav_profile-SQ08MoCKeRAD2LfZcqUibrzQtMed9U.png" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary rounded-full">
                  <span className="font-mono text-primary-foreground" style={{ fontSize: "9px" }}>LVL 70</span>
                </div>
              </div>

              {/* Info */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Full Stack Developer & Game Developer</h3>
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-sm">SRMIST KTR</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Full-stack developer and game developer with experience in building immersive VR applications, AI-powered systems, and interactive web applications. Skilled in backend integration, computer vision, and real-time application development using Python, Unity, and modern development tools.
                  <br /><br />
                  Passionate about exploring emerging technologies including Cyber Security, AI, VR/AR, and game development. Strong interest in creating innovative digital experiences that combine creativity with technical problem-solving.
                </p>

                {/* CGPA & Resume Button */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                  <div className="flex items-center gap-2 px-4 py-2 bg-card/60 border border-primary/20 rounded-lg font-mono text-sm">
                    <span className="text-muted-foreground">CGPA:</span>
                    <span className="text-primary font-bold text-glow-blue">9.1</span>
                  </div>
                  <Button 
                    className="group relative overflow-hidden bg-transparent border border-primary/50 hover:border-primary text-primary font-mono w-full sm:w-auto"
                    asChild
                  >
                    <a href="https://drive.google.com/file/d/1QNeGbrG0-Eeo6sZveA1AXeb2yherH_GP/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <FileText className="w-4 h-4 text-primary group-hover:text-neon-cyan transition-colors" />
                        View Resume
                      </span>
                      <span className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Achievement badges */}
              <div className="flex flex-wrap justify-center gap-2">
                {["🏆 Hackathon Winner", "🎯 AR Specialist", "🌟 VR Pioneer", "💻 Code Master"].map((badge, i) => (
                  <Badge 
                    key={i} 
                    variant="secondary" 
                    className="bg-primary/10 border border-primary/30 text-foreground"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skills Card */}
          <Card className={`bg-card/50 backdrop-blur-sm border-primary/20 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Code className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">Skill Tree</h3>
                <Sparkles className="w-4 h-4 text-neon-cyan ml-auto" />
              </div>

              {/* Skill bars */}
              <div className="space-y-4 mb-8">
                {skills.map((skill, i) => (
                  <div 
                    key={skill.name} 
                    className="flex justify-between items-center p-3 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-all duration-300"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <span className="font-mono font-semibold text-foreground text-sm">{skill.name}</span>
                    <Badge 
                      variant="secondary" 
                      className={`font-mono text-xs ${
                        skill.tier === "Advanced" ? "bg-neon-green/20 text-neon-green border-neon-green/30" :
                        skill.tier === "Intermediate" ? "bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30" :
                        "bg-primary/20 text-primary border-primary/30"
                      } border`}
                    >
                      {skill.tier}
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Technology icons */}
              <div>
                <h4 className="text-sm font-mono text-muted-foreground mb-3">EQUIPPED TECHNOLOGIES</h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <div 
                      key={tech.name}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/10 transition-all cursor-default group"
                    >
                      <span>{tech.icon}</span>
                      <span className="text-xs font-mono group-hover:text-primary transition-colors">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
