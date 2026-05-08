"use client"

import { Heart, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles className="absolute top-20 left-[15%] w-4 h-4 text-primary/30 animate-pulse" />
        <Sparkles className="absolute top-32 right-[20%] w-3 h-3 text-accent/40 animate-pulse delay-300" />
        <Heart className="absolute bottom-32 left-[10%] w-5 h-5 text-primary/20 animate-pulse delay-500" />
        <Sparkles className="absolute bottom-20 right-[15%] w-4 h-4 text-primary/30 animate-pulse delay-700" />
      </div>

      <div
        className={`text-center max-w-3xl mx-auto transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <Heart className="w-6 h-6 text-primary fill-primary/30" />
          <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-light">
            A Tribute to You
          </span>
          <Heart className="w-6 h-6 text-primary fill-primary/30" />
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-8 text-foreground text-balance">
          Pricilia
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-xl mx-auto text-pretty">
          The shortest poem is a name..
        </p>

        <div className="mt-12 flex items-center justify-center">
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
        </div>
      </div>
    </section>
  )
}
