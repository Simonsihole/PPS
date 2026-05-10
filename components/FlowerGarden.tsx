"use client"

import { useEffect, useRef, useState } from "react"

interface Flower {
  id: number
  x: number
  delay: number
  scale: number
  type: 0 | 1 | 2 | 3 | 4 | 5   // 5 = tiny bud
  gold: boolean
  swayOffset: number
  heightMult: number              // extra height variation
}

const FLOWER_COUNT = 24

function generateFlowers(): Flower[] {
  const flowers: Flower[] = []
  for (let i = 0; i < FLOWER_COUNT; i++) {
    const segment = 100 / FLOWER_COUNT
    const x = segment * i + Math.random() * segment * 0.6 + segment * 0.2
    const isBud = Math.random() < 0.22   // ~22% are tiny buds
    flowers.push({
      id: i,
      x: Math.min(Math.max(x, 0.5), 99),
      delay: Math.random() * 1.8,
      scale: isBud ? 0.35 + Math.random() * 0.2 : 0.55 + Math.random() * 0.8,
      type: isBud ? 5 : (Math.floor(Math.random() * 5)) as 0 | 1 | 2 | 3 | 4,
      gold: Math.random() < 0.28,
      swayOffset: Math.random() * 2 - 1,
      heightMult: 0.75 + Math.random() * 0.55,   // 0.75 → 1.3 height variation
    })
  }
  return flowers
}

// ─── SVG Flowers ─────────────────────────────────────────────────────────────

function CherryBlossom({ uid, gold }: { uid: string; gold: boolean }) {
  const p2 = gold ? "#f59e0b" : "#f9a8d4"
  const c  = gold ? "#fff7ed" : "#fdf2f8"
  const stamen = gold ? "#d97706" : "#ec4899"
  return (
    <svg viewBox="0 0 48 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
      <defs>
        <radialGradient id={`${uid}pg`} cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor={c}/>
          <stop offset="100%" stopColor={p2}/>
        </radialGradient>
        <radialGradient id={`${uid}cg`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffbeb"/>
          <stop offset="100%" stopColor={stamen}/>
        </radialGradient>
      </defs>
      <path d="M24 52 Q22 44 24 36" stroke="#86efac" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M24 44 Q18 40 16 43 Q19 46 24 44Z" fill="#86efac" opacity="0.9"/>
      {[0,72,144,216,288].map((deg, i) => {
        const r = (deg * Math.PI) / 180
        const px = 24 + 11 * Math.sin(r)
        const py = 24 - 11 * Math.cos(r)
        return <ellipse key={i} cx={px} cy={py} rx="5.5" ry="7.5" fill={`url(#${uid}pg)`} transform={`rotate(${deg} ${px} ${py})`} opacity="0.93"/>
      })}
      <circle cx="24" cy="24" r="5" fill={`url(#${uid}cg)`}/>
      {[0,60,120,180,240,300].map((deg, i) => {
        const r = (deg * Math.PI) / 180
        return <circle key={i} cx={24 + 3.5 * Math.sin(r)} cy={24 - 3.5 * Math.cos(r)} r="0.9" fill={stamen} opacity="0.8"/>
      })}
    </svg>
  )
}

function ElegantRose({ uid, gold }: { uid: string; gold: boolean }) {
  const outer = gold ? "#f59e0b" : "#f472b6"
  const mid   = gold ? "#fbbf24" : "#fb7185"
  const inner = gold ? "#fde68a" : "#fecdd3"
  return (
    <svg viewBox="0 0 48 54" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
      <defs>
        <radialGradient id={`${uid}rg`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={inner}/>
          <stop offset="60%" stopColor={mid}/>
          <stop offset="100%" stopColor={outer}/>
        </radialGradient>
      </defs>
      <path d="M24 54 Q21 46 24 36" stroke="#86efac" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M24 46 Q16 41 15 45 Q19 49 24 46Z" fill="#86efac"/>
      <path d="M24 42 Q31 37 33 40 Q30 44 24 42Z" fill="#a3e6a3" opacity="0.8"/>
      {[0,51,102,153,204,255,306].map((deg, i) => (
        <ellipse key={i} cx="24" cy="24" rx="8" ry="12" fill={outer} opacity="0.7" transform={`rotate(${deg} 24 24) translate(0 -10)`}/>
      ))}
      {[25,97,169,241,313].map((deg, i) => (
        <ellipse key={i} cx="24" cy="24" rx="6" ry="9" fill={mid} opacity="0.85" transform={`rotate(${deg} 24 24) translate(0 -7)`}/>
      ))}
      {[0,72,144,216,288].map((deg, i) => (
        <ellipse key={i} cx="24" cy="24" rx="4" ry="6" fill={inner} opacity="0.95" transform={`rotate(${deg} 24 24) translate(0 -4.5)`}/>
      ))}
      <circle cx="24" cy="24" r="3.5" fill={inner}/>
    </svg>
  )
}

function ElegantDaisy({ uid, gold }: { uid: string; gold: boolean }) {
  const petal  = gold ? "#fef3c7" : "#fce7f3"
  const petal2 = gold ? "#fde68a" : "#fbcfe8"
  const ctr    = gold ? "#f59e0b" : "#fbbf24"
  return (
    <svg viewBox="0 0 48 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id={`${uid}dg`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={petal}/>
          <stop offset="100%" stopColor={petal2}/>
        </linearGradient>
        <radialGradient id={`${uid}dc`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffbeb"/>
          <stop offset="100%" stopColor={ctr}/>
        </radialGradient>
      </defs>
      <path d="M24 52 Q23 43 24 35" stroke="#86efac" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M24 45 Q17 40 16 44 Q20 47 24 45Z" fill="#86efac"/>
      {Array.from({length: 12}, (_, i) => i * 30).map((deg, i) => (
        <ellipse key={i} cx="24" cy="24" rx="3" ry="10" fill={`url(#${uid}dg)`} opacity="0.9" transform={`rotate(${deg} 24 24) translate(0 -10)`}/>
      ))}
      <circle cx="24" cy="24" r="6" fill={`url(#${uid}dc)`}/>
      {Array.from({length: 8}, (_, i) => i * 45).map((deg, i) => {
        const r = (deg * Math.PI) / 180
        return <circle key={i} cx={24 + 3.5 * Math.sin(r)} cy={24 - 3.5 * Math.cos(r)} r="0.8" fill={ctr} opacity="0.6"/>
      })}
    </svg>
  )
}

function Magnolia({ uid, gold }: { uid: string; gold: boolean }) {
  const outer = gold ? "#fde68a" : "#fda4af"
  const inner = gold ? "#fef9c3" : "#fce7f3"
  return (
    <svg viewBox="0 0 48 54" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
      <defs>
        <radialGradient id={`${uid}mg`} cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor={inner}/>
          <stop offset="100%" stopColor={outer}/>
        </radialGradient>
      </defs>
      <path d="M24 54 Q22 45 24 36" stroke="#86efac" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M24 47 Q16 42 15 46 Q19 50 24 47Z" fill="#86efac"/>
      <path d="M24 43 Q32 39 33 42 Q29 46 24 43Z" fill="#a3e6a3" opacity="0.7"/>
      {[0,60,120,180,240,300].map((deg, i) => (
        <ellipse key={i} cx="24" cy="24" rx="8.5" ry="13" fill={`url(#${uid}mg)`} opacity={i % 2 === 0 ? 0.88 : 0.72} transform={`rotate(${deg} 24 24) translate(0 -11)`}/>
      ))}
      {[0,60,120,180,240,300].map((deg, i) => {
        const r = (deg * Math.PI) / 180
        return <line key={i} x1="24" y1="24" x2={24 + 11 * Math.sin(r)} y2={24 - 11 * Math.cos(r)} stroke="white" strokeWidth="0.6" opacity="0.4"/>
      })}
      <circle cx="24" cy="24" r="4.5" fill="#fef9c3"/>
      <circle cx="24" cy="24" r="2.5" fill={outer}/>
    </svg>
  )
}

function Wildflower({ uid, gold }: { uid: string; gold: boolean }) {
  const p  = gold ? "#fcd34d" : "#f9a8d4"
  const p2 = gold ? "#f59e0b" : "#ec4899"
  return (
    <svg viewBox="0 0 48 54" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id={`${uid}wg`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={p}/>
          <stop offset="100%" stopColor={p2}/>
        </linearGradient>
      </defs>
      <path d="M24 54 Q20 45 23 36" stroke="#86efac" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M23 46 Q15 42 14 46 Q18 49 23 46Z" fill="#86efac"/>
      {[0,45,90,135,180,225,270,315].map((deg, i) => (
        <ellipse key={i} cx="24" cy="24" rx={5 + (i % 3) * 0.5} ry={9 + (i % 2) * 1}
          fill={`url(#${uid}wg)`} opacity={0.75 + (i % 3) * 0.07}
          transform={`rotate(${deg + i * 1.5} 24 24) translate(0 -9)`}
        />
      ))}
      <circle cx="24" cy="24" r="5" fill="#fef9c3"/>
      <circle cx="24" cy="24" r="2.8" fill={p2}/>
      {[0,90,180,270].map((deg, i) => {
        const r = (deg * Math.PI) / 180
        return <circle key={i} cx={24 + 2 * Math.sin(r)} cy={24 - 2 * Math.cos(r)} r="0.7" fill="white" opacity="0.7"/>
      })}
    </svg>
  )
}

// ─── Flower 5: Tiny Bud — unopened, sweet little teardrop ────────────────────
function TinyBud({ uid, gold }: { uid: string; gold: boolean }) {
  const col  = gold ? "#fbbf24" : "#f9a8d4"
  const col2 = gold ? "#fde68a" : "#fce7f3"
  const sep  = gold ? "#a3e6a3" : "#86efac"
  return (
    <svg viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
      <defs>
        <radialGradient id={`${uid}bg`} cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor={col2}/>
          <stop offset="100%" stopColor={col}/>
        </radialGradient>
      </defs>
      {/* Stem */}
      <path d="M12 36 Q11 28 12 20" stroke={sep} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      {/* Tiny leaf */}
      <path d="M12 28 Q8 25 7 27 Q9 30 12 28Z" fill={sep} opacity="0.85"/>
      {/* Sepals */}
      <path d="M12 20 Q9 17 10 14 Q12 16 12 20Z" fill={sep} opacity="0.9"/>
      <path d="M12 20 Q15 17 14 14 Q12 16 12 20Z" fill="#a3e6a3" opacity="0.8"/>
      {/* Bud body — teardrop */}
      <ellipse cx="12" cy="13" rx="4.5" ry="6" fill={`url(#${uid}bg)`}/>
      {/* Tiny petal peek at top */}
      <path d="M10 9 Q12 6 14 9" stroke={col} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.7"/>
    </svg>
  )
}

function FlowerSVG({ type, gold, uid }: { type: Flower["type"]; gold: boolean; uid: string }) {
  switch (type) {
    case 0: return <CherryBlossom uid={uid} gold={gold} />
    case 1: return <ElegantRose   uid={uid} gold={gold} />
    case 2: return <ElegantDaisy  uid={uid} gold={gold} />
    case 3: return <Magnolia      uid={uid} gold={gold} />
    case 4: return <Wildflower    uid={uid} gold={gold} />
    case 5: return <TinyBud       uid={uid} gold={gold} />
  }
}

// ─── Single flower ────────────────────────────────────────────────────────────
function AnimatedFlower({ flower, visible, containerH }: { flower: Flower; visible: boolean; containerH: number }) {
  const baseSize = Math.round(42 * flower.scale)
  const height   = Math.round(baseSize * flower.heightMult)
  const width    = flower.type === 5
    ? Math.round(height * 0.67)   // buds are narrower
    : Math.round(baseSize * 0.95)
  const swayDur  = 2.8 + Math.abs(flower.swayOffset) * 1.2
  const swayName = flower.swayOffset >= 0 ? "swayR" : "swayL"
  const uid = `f${flower.id}`

  return (
    <div
      className="absolute"
      style={{
        left: `${flower.x}%`,
        bottom: 0,
        width: `${width}px`,
        height: `${Math.min(height, containerH - 2)}px`,
        transformOrigin: "bottom center",
        transform: visible ? "scaleY(1)" : "scaleY(0)",
        opacity: visible ? 1 : 0,
        transition: `transform ${0.6 + flower.scale * 0.4}s cubic-bezier(0.34,1.56,0.64,1) ${flower.delay}s,
                     opacity 0.35s ease ${flower.delay}s`,
        animation: visible
          ? `${swayName} ${swayDur}s ease-in-out ${flower.delay + 0.6}s infinite alternate`
          : "none",
        filter: flower.gold
          ? "drop-shadow(0 2px 6px rgba(245,158,11,0.4)) drop-shadow(0 0 3px rgba(253,230,138,0.5))"
          : "drop-shadow(0 2px 5px rgba(244,114,182,0.3)) drop-shadow(0 0 2px rgba(251,207,232,0.4))",
        zIndex: Math.round(flower.scale * 10),
      }}
    >
      <FlowerSVG type={flower.type} gold={flower.gold} uid={uid} />
    </div>
  )
}

// ─── Sparkle twinkles ─────────────────────────────────────────────────────────
function Sparkles({ visible }: { visible: boolean }) {
  // fixed positions to avoid SSR mismatch
  const sparkles = [
    { x: 8,  y: 55, size: 5, delay: 1.2, gold: false },
    { x: 19, y: 30, size: 4, delay: 2.8, gold: true  },
    { x: 31, y: 60, size: 6, delay: 0.9, gold: false },
    { x: 44, y: 25, size: 4, delay: 3.5, gold: true  },
    { x: 57, y: 50, size: 5, delay: 1.8, gold: false },
    { x: 68, y: 35, size: 4, delay: 2.1, gold: true  },
    { x: 79, y: 65, size: 6, delay: 0.5, gold: false },
    { x: 91, y: 28, size: 4, delay: 3.0, gold: true  },
    { x: 24, y: 45, size: 3, delay: 4.2, gold: false },
    { x: 73, y: 20, size: 3, delay: 1.5, gold: true  },
  ]
  return (
    <>
      {sparkles.map((s, i) => (
        <svg key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size * 2}px`,
            height: `${s.size * 2}px`,
            opacity: visible ? 1 : 0,
            animation: visible ? `twinkle ${2.2 + i * 0.3}s ease-in-out ${s.delay}s infinite` : "none",
          }}
          viewBox="0 0 10 10" fill="none"
        >
          {/* 4-pointed star */}
          <path d="M5 0 L5.6 4.4 L10 5 L5.6 5.6 L5 10 L4.4 5.6 L0 5 L4.4 4.4 Z"
            fill={s.gold ? "#fbbf24" : "#f9a8d4"} opacity="0.85"/>
        </svg>
      ))}
    </>
  )
}

// ─── Floating petals drifting down into footer ────────────────────────────────
function FloatingPetals({ visible }: { visible: boolean }) {
  const petals = [
    { x: 12, size: 7, dur: 4.2, delay: 2.4, gold: false },
    { x: 28, size: 5, dur: 5.0, delay: 3.7, gold: true  },
    { x: 47, size: 6, dur: 3.8, delay: 4.4, gold: false },
    { x: 63, size: 5, dur: 4.9, delay: 2.8, gold: true  },
    { x: 82, size: 7, dur: 5.2, delay: 3.1, gold: false },
    { x: 36, size: 4, dur: 6.0, delay: 5.0, gold: false },
    { x: 71, size: 5, dur: 4.5, delay: 1.8, gold: true  },
  ]
  return (
    <>
      {petals.map((p, i) => (
        <div key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${p.x}%`,
            bottom: `${18 + (i % 4) * 12}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50% 0 50% 0",
            background: p.gold ? "rgba(251,191,36,0.6)" : "rgba(249,168,212,0.6)",
            opacity: visible ? 0.75 : 0,
            transition: `opacity 1s ease ${p.delay}s`,
            animation: visible
              ? `petalDrift ${p.dur}s ease-in-out ${p.delay}s infinite alternate`
              : "none",
          }}
        />
      ))}
    </>
  )
}

// ─── Grass tufts ──────────────────────────────────────────────────────────────
function GrassTufts() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: "16px" }}>
      {Array.from({ length: 36 }, (_, i) => (
        <svg key={i}
          viewBox="0 0 12 16" fill="none"
          className="absolute bottom-0"
          style={{ left: `${i * 2.8}%`, width: "14px", height: "16px" }}
        >
          <path d={`M6 16 Q${4 + (i%3)} 8 ${3+(i%4)} 0`}  stroke="#86efac" strokeWidth="1.4" strokeLinecap="round" opacity="0.75"/>
          <path d={`M6 16 Q${7-(i%2)} 9 ${8+(i%3)} 1`}    stroke="#a3e6a3" strokeWidth="1.1" strokeLinecap="round" opacity="0.55"/>
          <path d={`M6 16 Q${5+(i%2)} 10 ${6+(i%2)} 2`}   stroke="#bbf7d0" strokeWidth="0.8" strokeLinecap="round" opacity="0.4"/>
        </svg>
      ))}
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function FlowerGarden() {
  const [flowers, setFlowers] = useState<Flower[] | null>(null)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const CONTAINER_H = 120  // matches clamp max

  useEffect(() => {
    setFlowers(generateFlowers())
  }, [])

  useEffect(() => {
    if (!flowers) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [flowers])

  return (
    <>
      <style>{`
        @keyframes swayR {
          from { transform: scaleY(1) rotate(-2.5deg); }
          to   { transform: scaleY(1) rotate(3.5deg);  }
        }
        @keyframes swayL {
          from { transform: scaleY(1) rotate(2.5deg);  }
          to   { transform: scaleY(1) rotate(-3.5deg); }
        }
        @keyframes petalDrift {
          0%   { transform: translateY(0px)  translateX(0px)  rotate(0deg);   }
          33%  { transform: translateY(-9px) translateX(4px)  rotate(120deg); }
          66%  { transform: translateY(-5px) translateX(-3px) rotate(240deg); }
          100% { transform: translateY(-2px) translateX(2px)  rotate(360deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0;   transform: scale(0.4) rotate(0deg);   }
          40%       { opacity: 0.9; transform: scale(1.1) rotate(15deg);  }
          60%       { opacity: 0.7; transform: scale(0.9) rotate(-10deg); }
        }
      `}</style>

      <div
        ref={ref}
        aria-hidden="true"
        className="relative w-full pointer-events-none select-none"
        style={{
          height: "clamp(88px, 22vw, 120px)",
          overflowX: "hidden",
          overflowY: "visible",
        }}
      >
        <GrassTufts />
        <FloatingPetals visible={visible} />
        <Sparkles visible={visible} />

        {flowers?.map((f) => (
          <AnimatedFlower key={f.id} flower={f} visible={visible} containerH={CONTAINER_H} />
        ))}

        {/* Ground line */}
        <div className="absolute bottom-0 left-0 right-0" style={{
          height: "2px",
          background: "linear-gradient(90deg, transparent 0%, #fbcfe8 25%, #fce7f3 50%, #fbcfe8 75%, transparent 100%)",
          opacity: 0.9,
        }}/>
      </div>
    </>
  )
}
