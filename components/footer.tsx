"use client"

import { useEffect, useState } from "react"
import { Heart, Sparkles } from "lucide-react"
import { FlowerGarden } from "./FlowerGarden"

function DriftingPetals({ visible }: { visible: boolean }) {
  const petals = [
    { x: 5,  y: 20, size: 10, dur: 7,   delay: 0.5,  gold: false },
    { x: 15, y: 65, size: 8,  dur: 9,   delay: 1.8,  gold: true  },
    { x: 78, y: 15, size: 9,  dur: 8,   delay: 0.8,  gold: false },
    { x: 90, y: 70, size: 7,  dur: 10,  delay: 2.5,  gold: true  },
    { x: 50, y: 10, size: 8,  dur: 8.5, delay: 3.2,  gold: false },
    { x: 35, y: 80, size: 6,  dur: 11,  delay: 1.2,  gold: false },
    { x: 65, y: 55, size: 7,  dur: 9.5, delay: 4.0,  gold: true  },
    { x: 22, y: 40, size: 6,  dur: 7.5, delay: 2.0,  gold: false },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${p.x}%`, top: `${p.y}%`,
          width: `${p.size}px`, height: `${p.size * 0.7}px`,
          borderRadius: "50% 10% 50% 10%",
          background: p.gold
            ? "radial-gradient(circle at 40% 40%, #fef3c7, #fbbf24)"
            : "radial-gradient(circle at 40% 40%, #fce7f3, #f9a8d4)",
          opacity: visible ? 0.35 : 0,
          transition: `opacity 2s ease ${p.delay}s`,
          animation: visible ? `footerPetalDrift ${p.dur}s ease-in-out ${p.delay}s infinite alternate` : "none",
          filter: p.gold
            ? "drop-shadow(0 1px 3px rgba(245,158,11,0.2))"
            : "drop-shadow(0 1px 3px rgba(244,114,182,0.2))",
        }}/>
      ))}
    </div>
  )
}

function FooterSparkles({ visible }: { visible: boolean }) {
  const items = [
    { x: 8,  y: 25, delay: 0.8 },
    { x: 92, y: 30, delay: 2.1 },
    { x: 20, y: 75, delay: 1.5 },
    { x: 80, y: 70, delay: 3.0 },
    { x: 50, y: 88, delay: 0.4 },
  ]
  return (
    <>
      {items.map((s, i) => (
        <svg key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: "10px", height: "10px",
            opacity: visible ? 1 : 0,
            animation: visible ? `twinkle ${3 + i * 0.5}s ease-in-out ${s.delay}s infinite` : "none",
          }}
          viewBox="0 0 10 10" fill="none"
        >
          <path d="M5 0 L5.6 4.4 L10 5 L5.6 5.6 L5 10 L4.4 5.6 L0 5 L4.4 4.4 Z" fill="#f9a8d4" opacity="0.7"/>
        </svg>
      ))}
    </>
  )
}

export function Footer() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <style>{`
        @keyframes footerPetalDrift {
          0%   { transform: translateY(0px)   translateX(0px)  rotate(20deg); }
          33%  { transform: translateY(-12px) translateX(6px)  rotate(50deg); }
          66%  { transform: translateY(-6px)  translateX(-4px) rotate(80deg); }
          100% { transform: translateY(-3px)  translateX(3px)  rotate(110deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0;   transform: scale(0.3) rotate(0deg);   }
          45%       { opacity: 0.9; transform: scale(1.2) rotate(20deg);  }
          65%       { opacity: 0.6; transform: scale(0.8) rotate(-10deg); }
        }
        @keyframes heartPulse {
          0%, 100% { transform: scale(1);    }
          50%       { transform: scale(1.15); }
        }
      `}</style>

      <footer className="bg-secondary/20 relative overflow-hidden">
        <FlowerGarden />

        <div className="relative py-16 px-6">
          <DriftingPetals visible={visible} />
          <FooterSparkles visible={visible} />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-primary/50" />
              <Heart
                className="w-6 h-6 text-primary fill-primary/30"
                style={{ animation: "heartPulse 2.4s ease-in-out infinite" }}
              />
              <Sparkles className="w-4 h-4 text-primary/50" />
            </div>

            <p className="font-serif text-2xl md:text-3xl text-foreground mb-4 text-balance">
              {'"Never let your smile fade."'}
            </p>

            <p className="text-sm text-muted-foreground font-light">
              For Pricilia, with all my heart
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
