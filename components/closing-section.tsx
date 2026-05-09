"use client"

import { useEffect, useRef, useState } from "react"
import { Heart } from "lucide-react"

// ─── Delicate wave — deeper S-curves, feathers into the footer ───────────────
function BottomWave() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 leading-none"
      style={{ marginBottom: "-2px", pointerEvents: "none" }}
    >
      <svg
        viewBox="0 0 1440 64"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full block"
        style={{ height: "clamp(32px, 6vw, 64px)" }}
      >
        <defs>
          {/* Matches bg-secondary/30 ≈ very light pink — wave is slightly deeper */}
          <linearGradient id="wv1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#fce7f3" stopOpacity="0"/>
            <stop offset="20%"  stopColor="#fbcfe8" stopOpacity="0.45"/>
            <stop offset="50%"  stopColor="#f9a8d4" stopOpacity="0.3"/>
            <stop offset="80%"  stopColor="#fbcfe8" stopOpacity="0.45"/>
            <stop offset="100%" stopColor="#fce7f3" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="wv2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#fce7f3" stopOpacity="0"/>
            <stop offset="30%"  stopColor="#fce7f3" stopOpacity="0.3"/>
            <stop offset="50%"  stopColor="#fbcfe8" stopOpacity="0.2"/>
            <stop offset="70%"  stopColor="#fce7f3" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#fce7f3" stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* Deep back wave — starts high, plunges */}
        <path
          d="M0 40 C200 10 400 58 720 36 C1040 14 1240 54 1440 38 L1440 64 L0 64 Z"
          fill="url(#wv2)"
        />

        {/* Front wave — offset phase, shallower */}
        <path
          d="M0 48 C160 24 360 60 600 44 C840 28 1080 58 1280 42 C1360 36 1410 50 1440 48 L1440 64 L0 64 Z"
          fill="url(#wv1)"
        />

        {/* Tiny soft dots on crest — very subtle */}
        {[120, 360, 600, 840, 1080, 1320].map((cx, i) => (
          <circle
            key={i}
            cx={cx}
            cy={i % 2 === 0 ? 42 : 50}
            r="2"
            fill="white"
            opacity="0.4"
          />
        ))}
      </svg>
    </div>
  )
}

export function ClosingSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 bg-secondary/30"
      style={{ paddingBottom: "5rem" }}
    >
      <div className="max-w-3xl mx-auto">
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative bg-card rounded-2xl p-10 md:p-16 shadow-xl shadow-primary/10 border border-border/50">
            <div className="absolute inset-0 bg-gradient-to-br from-card via-card to-secondary/20 rounded-2xl" />

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
                Simply being around you is a beautiful kind of serendipity.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomWave />
    </section>
  )
}
