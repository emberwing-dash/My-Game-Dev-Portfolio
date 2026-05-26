"use client"

import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { CertificationsSection } from "@/components/certifications-section"
import { AchievementsSection } from "@/components/achievements-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

// Dynamic import for 3D scene to avoid SSR issues
const Scene3D = dynamic(
  () => import("@/components/scene-3d").then((mod) => mod.Scene3D),
  { ssr: false }
)

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* 3D Background Scene */}
      <div className="fixed inset-0 z-0">
        <Scene3D />
      </div>

      {/* Content overlay */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        
        {/* Sections with background overlay for readability */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/95 to-background pointer-events-none" />
          <div className="relative">
            <AboutSection />
            <ProjectsSection />
            <CertificationsSection />
            <AchievementsSection />
            <ContactSection />
            <Footer />
          </div>
        </div>
      </div>
    </main>
  )
}
