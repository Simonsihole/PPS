"use client"

import { useEffect, useState } from "react"

// ─── Soft kawaii bunny — gradient fills, rounder, dreamier ───────────────────
function Bunny() {
  return (
    <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bunnyBody" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#fff5f7"/>
          <stop offset="100%" stopColor="#fce7f3"/>
        </radialGradient>
        <radialGradient id="bunnyEar" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fce7f3"/>
          <stop offset="100%" stopColor="#fbcfe8"/>
        </radialGradient>
      </defs>
      {/* Ears */}
      <ellipse cx="28" cy="22" rx="8"  ry="20" fill="url(#bunnyBody)" opacity="0.95"/>
      <ellipse cx="52" cy="22" rx="8"  ry="20" fill="url(#bunnyBody)" opacity="0.95"/>
      <ellipse cx="28" cy="22" rx="4.5" ry="14" fill="url(#bunnyEar)" opacity="0.8"/>
      <ellipse cx="52" cy="22" rx="4.5" ry="14" fill="url(#bunnyEar)" opacity="0.8"/>
      {/* Head */}
      <ellipse cx="40" cy="62" rx="28" ry="26" fill="url(#bunnyBody)"/>
      {/* Cheeks */}
      <ellipse cx="22" cy="66" rx="7" ry="5" fill="#fda4af" opacity="0.35"/>
      <ellipse cx="58" cy="66" rx="7" ry="5" fill="#fda4af" opacity="0.35"/>
      {/* Eyes */}
      <circle cx="32" cy="58" r="4"   fill="#3d2c2c"/>
      <circle cx="48" cy="58" r="4"   fill="#3d2c2c"/>
      <circle cx="33" cy="56.5" r="1.5" fill="white"/>
      <circle cx="49" cy="56.5" r="1.5" fill="white"/>
      {/* Tiny sparkle in eye */}
      <circle cx="35" cy="59.5" r="0.7" fill="white" opacity="0.7"/>
      <circle cx="51" cy="59.5" r="0.7" fill="white" opacity="0.7"/>
      {/* Nose */}
      <ellipse cx="40" cy="67" rx="3.5" ry="2.5" fill="#fda4af"/>
      {/* Mouth */}
      <path d="M37 71 Q40 74.5 43 71" stroke="#d4a0a0" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
    </svg>
  )
}

// ─── Soft glowing heart ───────────────────────────────────────────────────────
function Heart({ gold = false }: { gold?: boolean }) {
  const g1 = gold ? "#fef3c7" : "#fce7f3"
  const g2 = gold ? "#fbbf24" : "#f9a8d4"
  const id = gold ? "heartGold" : "heartPink"
  return (
    <svg viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id={id} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={g1}/>
          <stop offset="100%" stopColor={g2}/>
        </radialGradient>
      </defs>
      <path
        d="M12 20 C12 20 2 13 2 7 C2 4.2 4.2 2 7 2 C8.8 2 10.3 2.9 12 5 C13.7 2.9 15.2 2 17 2 C19.8 2 22 4.2 22 7 C22 13 12 20 12 20Z"
        fill={`url(#${id})`} opacity="0.85"
      />
      {/* Tiny inner highlight */}
      <ellipse cx="9" cy="7" rx="2.5" ry="1.8" fill="white" opacity="0.3" transform="rotate(-20 9 7)"/>
    </svg>
  )
}

// ─── Soft 4-pointed star ──────────────────────────────────────────────────────
function Star({ gold = false }: { gold?: boolean }) {
  const g1 = gold ? "#fef9c3" : "#fce7f3"
  const g2 = gold ? "#f59e0b" : "#f9a8d4"
  const id = gold ? "starGold" : "starPink"
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={g1}/>
          <stop offset="100%" stopColor={g2}/>
        </radialGradient>
      </defs>
      <path
        d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z"
        fill={`url(#${id})`} opacity="0.9"
      />
      {/* Center glow dot */}
      <circle cx="12" cy="12" r="2.5" fill="white" opacity="0.5"/>
    </svg>
  )
}

// ─── Soft kawaii flower ───────────────────────────────────────────────────────
function Flower({ gold = false }: { gold?: boolean }) {
  const petal = gold ? "#fde68a" : "#fbcfe8"
  const petal2 = gold ? "#fbbf24" : "#f9a8d4"
  const id = gold ? "flowerGold" : "flowerPink"
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={petal}/>
          <stop offset="100%" stopColor={petal2}/>
        </radialGradient>
      </defs>
      {/* 6 rounded petals */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <ellipse key={i}
          cx="30" cy="30" rx="9" ry="15"
          fill={`url(#${id})`} opacity={i % 2 === 0 ? 0.85 : 0.7}
          transform={`rotate(${deg} 30 30) translate(0 -13)`}
        />
      ))}
      {/* Center */}
      <circle cx="30" cy="30" r="9" fill="#fef9c3"/>
      <circle cx="30" cy="30" r="5.5" fill={gold ? "#f59e0b" : "#fbbf24"} opacity="0.8"/>
      {/* Center dots */}
      {[0, 90, 180, 270].map((deg, i) => {
        const r = (deg * Math.PI) / 180
        return <circle key={i} cx={30 + 3 * Math.sin(r)} cy={30 - 3 * Math.cos(r)} r="1" fill="white" opacity="0.6"/>
      })}
    </svg>
  )
}

// ─── Tiny dot accent ──────────────────────────────────────────────────────────
function Dot({ gold = false }: { gold?: boolean }) {
  return (
    <div
      className="w-full h-full rounded-full"
      style={{
        background: gold
          ? "radial-gradient(circle at 35% 35%, #fef3c7, #fbbf24)"
          : "radial-gradient(circle at 35% 35%, #fce7f3, #f9a8d4)",
        opacity: 0.7,
        boxShadow: gold
          ? "0 0 6px rgba(251,191,36,0.4)"
          : "0 0 6px rgba(249,168,212,0.4)",
      }}
    />
  )
}

// ─── Decoration config — fixed positions, no Math.random ─────────────────────
// depth: 1 = far (smaller, more transparent), 3 = near (larger, more opaque)
const DESKTOP_DECORATIONS = [
  // Left column
  { id: 1,  side: "left",  x: 1.5, y: 8,  type: "bunny",  size: 42, delay: 0.0, dur: 5.0, depth: 2, gold: false },
  { id: 2,  side: "left",  x: 2.5, y: 26, type: "heart",  size: 14, delay: 0.6, dur: 3.8, depth: 1, gold: false },
  { id: 3,  side: "left",  x: 0.5, y: 40, type: "star",   size: 16, delay: 1.2, dur: 4.2, depth: 1, gold: true  },
  { id: 4,  side: "left",  x: 2.0, y: 54, type: "flower", size: 26, delay: 0.4, dur: 4.8, depth: 2, gold: false },
  { id: 5,  side: "left",  x: 0.8, y: 68, type: "heart",  size: 18, delay: 1.0, dur: 3.5, depth: 2, gold: true  },
  { id: 6,  side: "left",  x: 2.5, y: 80, type: "star",   size: 13, delay: 0.2, dur: 4.0, depth: 1, gold: false },
  { id: 7,  side: "left",  x: 1.0, y: 91, type: "bunny",  size: 34, delay: 1.5, dur: 5.2, depth: 1, gold: false },
  { id: 8,  side: "left",  x: 3.5, y: 17, type: "dot",    size: 8,  delay: 0.8, dur: 3.2, depth: 1, gold: true  },
  { id: 9,  side: "left",  x: 3.0, y: 47, type: "dot",    size: 6,  delay: 1.8, dur: 3.8, depth: 1, gold: false },

  // Right column
  { id: 10, side: "right", x: 96.5, y: 10, type: "star",   size: 18, delay: 0.3, dur: 4.1, depth: 2, gold: true  },
  { id: 11, side: "right", x: 95.5, y: 24, type: "bunny",  size: 38, delay: 0.9, dur: 5.1, depth: 2, gold: false },
  { id: 12, side: "right", x: 97.0, y: 38, type: "heart",  size: 16, delay: 0.1, dur: 3.6, depth: 1, gold: false },
  { id: 13, side: "right", x: 95.0, y: 51, type: "flower", size: 24, delay: 1.3, dur: 4.7, depth: 2, gold: true  },
  { id: 14, side: "right", x: 96.5, y: 64, type: "star",   size: 14, delay: 0.5, dur: 3.9, depth: 1, gold: false },
  { id: 15, side: "right", x: 95.5, y: 76, type: "heart",  size: 20, delay: 1.1, dur: 4.3, depth: 2, gold: true  },
  { id: 16, side: "right", x: 97.0, y: 87, type: "flower", size: 22, delay: 0.7, dur: 4.6, depth: 1, gold: false },
  { id: 17, side: "right", x: 94.5, y: 18, type: "dot",    size: 7,  delay: 1.6, dur: 3.3, depth: 1, gold: false },
  { id: 18, side: "right", x: 94.0, y: 44, type: "dot",    size: 9,  delay: 0.4, dur: 3.7, depth: 1, gold: true  },
]

const MOBILE_DECORATIONS = [
  // Left — very edge, small
  { id: 1,  side: "left",  x: -1,  y: 10, type: "bunny",  size: 26, delay: 0.0, dur: 4.8, depth: 1, gold: false },
  { id: 2,  side: "left",  x: 0,   y: 28, type: "heart",  size: 11, delay: 0.5, dur: 3.5, depth: 1, gold: false },
  { id: 3,  side: "left",  x: -1,  y: 46, type: "star",   size: 12, delay: 1.0, dur: 4.0, depth: 1, gold: true  },
  { id: 4,  side: "left",  x: 0,   y: 63, type: "flower", size: 18, delay: 0.3, dur: 4.5, depth: 1, gold: false },
  { id: 5,  side: "left",  x: -1,  y: 80, type: "heart",  size: 13, delay: 0.8, dur: 3.8, depth: 1, gold: true  },

  // Right — pull inward a bit more on mobile
  { id: 6,  side: "right", x: 83,  y: 8,  type: "star",   size: 12, delay: 0.2, dur: 3.9, depth: 1, gold: true  },
  { id: 7,  side: "right", x: 82,  y: 25, type: "bunny",  size: 24, delay: 0.7, dur: 4.9, depth: 1, gold: false },
  { id: 8,  side: "right", x: 83,  y: 43, type: "heart",  size: 11, delay: 0.4, dur: 3.6, depth: 1, gold: false },
  { id: 9,  side: "right", x: 82,  y: 60, type: "flower", size: 17, delay: 1.1, dur: 4.4, depth: 1, gold: true  },
  { id: 10, side: "right", x: 83,  y: 78, type: "star",   size: 13, delay: 0.6, dur: 4.1, depth: 1, gold: false },
]

type DecorationType = "bunny" | "heart" | "star" | "flower" | "dot"

function renderShape(type: DecorationType, gold: boolean) {
  switch (type) {
    case "bunny":  return <Bunny />
    case "heart":  return <Heart gold={gold} />
    case "star":   return <Star  gold={gold} />
    case "flower": return <Flower gold={gold} />
    case "dot":    return <Dot   gold={gold} />
  }
}

export function CuteDecorations() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted]   = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    setMounted(true)
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  if (!mounted) return null

  const items = isMobile ? MOBILE_DECORATIONS : DESKTOP_DECORATIONS

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px)   rotate(0deg);  }
          50%       { transform: translateY(-9px)  rotate(2deg);  }
        }
        @keyframes floatUpAlt {
          0%, 100% { transform: translateY(0px)   rotate(0deg);  }
          50%       { transform: translateY(-7px)  rotate(-2deg); }
        }
        @keyframes sway {
          0%, 100% { transform: translateX(0px);  }
          50%       { transform: translateX(4px);  }
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {items.map((dec) => {
          // depth layering: far = smaller opacity, near = more visible
          const baseOpacity = dec.depth === 1 ? 0.38 : dec.depth === 2 ? 0.52 : 0.62
          const animName    = dec.id % 3 === 0 ? "floatUpAlt" : dec.id % 2 === 0 ? "sway" : "floatUp"

          return (
            <div
              key={dec.id}
              className="absolute"
              style={{
                left: `${dec.x}%`,
                top:  `${dec.y}%`,
                width:  dec.size,
                height: dec.size,
                opacity: baseOpacity,
                animation: `${animName} ${dec.dur}s ease-in-out ${dec.delay}s infinite`,
                // far items get a subtle blur for depth
                filter: dec.depth === 1 ? "blur(0.4px)" : "none",
              }}
            >
              {renderShape(dec.type as DecorationType, dec.gold)}
            </div>
          )
        })}
      </div>
    </>
  )
}
