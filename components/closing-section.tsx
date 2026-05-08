"use client"

import { useEffect, useRef, useState } from "react"
import { Heart } from "lucide-react"

export function ClosingSection() {
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
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Closing Message - Letter Style */}
          <div className="relative bg-card rounded-2xl p-10 md:p-16 shadow-xl shadow-primary/10 border border-border/50">
            {/* Paper texture effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-card via-card to-secondary/20 rounded-2xl" />
            
            {/* Decorative corner */}
            <div className="absolute top-6 right-6">
              <Heart className="w-5 h-5 text-primary/30" />
            </div>

            <div className="relative space-y-8">
              <p className="text-xl md:text-2xl leading-relaxed text-foreground/90 font-light text-center">
                Whatever tomorrow brings, I am just incredibly happy that today, I get to know you.
              </p>

              <div className="flex justify-center py-4">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              </div>

              <p className="font-serif text-2xl md:text-3xl text-foreground text-center italic">
                I didn&apos;t know that caring for someone could feel this beautiful.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
