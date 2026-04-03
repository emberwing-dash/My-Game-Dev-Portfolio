"use client"

import { useRef, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Mail, Phone, Github, Linkedin, Send, MessageSquare, Zap } from "lucide-react"

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
    
    // Reset after showing success
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-card/30 backdrop-blur-sm border border-primary/30 rounded-full">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">NEW MESSAGE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Contact <span className="text-primary text-glow-blue">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to start a new quest together? Send me a message!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact form */}
          <Card className={`bg-card/50 backdrop-blur-sm border-border transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Send className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">Send Message</h3>
              </div>

              {submitted ? (
                <div className="py-12 text-center">
                  <div className="text-6xl mb-4">🎮</div>
                  <h4 className="text-xl font-bold text-primary mb-2">Message Sent!</h4>
                  <p className="text-muted-foreground">
                    {"I'll"} respond to your quest as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <FieldGroup className="space-y-6">
                    <Field>
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        className="bg-muted/50 border-border focus:border-primary"
                        required
                      />
                    </Field>

                    <Field>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="bg-muted/50 border-border focus:border-primary"
                        required
                      />
                    </Field>

                    <Field>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell me about your project or just say hi!"
                        className="bg-muted/50 border-border focus:border-primary min-h-[120px] resize-none"
                        required
                      />
                    </Field>
                  </FieldGroup>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 font-mono group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact info */}
          <div className={`space-y-6 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            {/* Quick contact */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Quick Contact</h3>
                <div className="space-y-4">
                  <a 
                    href="mailto:gamedev@example.com" 
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-mono text-foreground group-hover:text-primary transition-colors">gamedev@example.com</p>
                    </div>
                  </a>
                  <a 
                    href="tel:+1234567890" 
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-neon-cyan/20 flex items-center justify-center group-hover:bg-neon-cyan/30 transition-colors">
                      <Phone className="w-5 h-5 text-neon-cyan" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-mono text-foreground group-hover:text-neon-cyan transition-colors">+1 (234) 567-890</p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Social links */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="https://github.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all group"
                  >
                    <Github className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                    <div>
                      <p className="font-mono font-bold group-hover:text-primary transition-colors">GitHub</p>
                      <p className="text-xs text-muted-foreground">View my code</p>
                    </div>
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all group"
                  >
                    <Linkedin className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                    <div>
                      <p className="font-mono font-bold group-hover:text-primary transition-colors">LinkedIn</p>
                      <p className="text-xs text-muted-foreground">{"Let's"} connect</p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Status indicator */}
            <Card className="bg-card/50 backdrop-blur-sm border-border overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-3 h-3 bg-neon-green rounded-full" />
                      <div className="absolute inset-0 w-3 h-3 bg-neon-green rounded-full animate-ping" />
                    </div>
                    <div>
                      <p className="font-bold">Available for Work</p>
                      <p className="text-sm text-muted-foreground">Open to new opportunities</p>
                    </div>
                  </div>
                  <div className="text-3xl">🎯</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
