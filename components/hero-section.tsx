"use client"

import { useEffect, useState } from "react"

const NAME = "Pricilia"

// ─── Fixed floating particles (no Math.random at render = no SSR mismatch) ────
const PARTICLES = [
  { id: 0,  x: 12,  y: 18, type: "heart",    size: 18, dur: 7.2, delay: 0.0, drift: 22  },
  { id: 1,  x: 82,  y: 14, type: "star4",    size: 12, dur: 8.5, delay: 1.2, drift: -18 },
  { id: 2,  x: 6,   y: 55, type: "star4",    size: 10, dur: 6.8, delay: 0.5, drift: 15  },
  { id: 3,  x: 91,  y: 48, type: "heart",    size: 14, dur: 9.1, delay: 2.0, drift: -20 },
  { id: 4,  x: 22,  y: 80, type: "dot",      size: 8,  dur: 5.9, delay: 0.8, drift: 12  },
  { id: 5,  x: 76,  y: 75, type: "dot",      size: 6,  dur: 7.4, delay: 1.5, drift: -10 },
  { id: 6,  x: 45,  y: 8,  type: "star4",    size: 9,  dur: 8.0, delay: 3.0, drift: 8   },
  { id: 7,  x: 58,  y: 88, type: "heart",    size: 12, dur: 6.5, delay: 0.3, drift: -16 },
  { id: 8,  x: 33,  y: 30, type: "sparkle",  size: 11, dur: 9.3, delay: 2.5, drift: 20  },
  { id: 9,  x: 68,  y: 22, type: "sparkle",  size: 9,  dur: 7.7, delay: 1.8, drift: -12 },
  { id: 10, x: 15,  y: 65, type: "dot",      size: 7,  dur: 8.8, delay: 4.0, drift: 18  },
  { id: 11, x: 88,  y: 82, type: "star4",    size: 8,  dur: 6.2, delay: 0.9, drift: -8  },
]

function ParticleShape({ type, size, gold }: { type: string; size: number; gold?: boolean }) {
  const pink = gold ? "#fbbf24" : "#f9a8d4"
  const deep = gold ? "#f59e0b" : "#ec4899"

  if (type === "heart") return (
    <svg width={size} height={size} viewBox="0 0 20 18" fill="none">
      <path d="M10 16 C10 16 2 10 2 5.5 C2 3 4 1 6.5 1 C8 1 9.2 1.8 10 3 C10.8 1.8 12 1 13.5 1 C16 1 18 3 18 5.5 C18 10 10 16 10 16Z"
        fill={pink} opacity="0.7"/>
    </svg>
  )
  if (type === "star4") return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <path d="M5 0 L5.7 4.3 L10 5 L5.7 5.7 L5 10 L4.3 5.7 L0 5 L4.3 4.3 Z" fill={deep} opacity="0.65"/>
    </svg>
  )
  if (type === "sparkle") return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M6 0 L6.5 5.5 L12 6 L6.5 6.5 L6 12 L5.5 6.5 L0 6 L5.5 5.5 Z" fill={pink} opacity="0.6"/>
      <path d="M2 2 L2.3 3.7 L4 4 L2.3 4.3 L2 6 L1.7 4.3 L0 4 L1.7 3.7 Z" fill={deep} opacity="0.4"/>
    </svg>
  )
  // dot
  return <div style={{ width: size, height: size, borderRadius: "50%", background: pink, opacity: 0.5 }} />
}

function FloatingParticles({ visible }: { visible: boolean }) {
  return (
    <>
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: visible ? 1 : 0,
            transition: `opacity 1.5s ease ${p.delay + 1}s`,
            animation: visible
              ? `particleDrift ${p.dur}s ease-in-out ${p.delay}s infinite alternate`
              : "none",
            // encode drift amount via CSS custom property trick using transform
          }}
        >
          <div style={{
            animation: visible
              ? `particleSway ${p.dur * 0.7}s ease-in-out ${p.delay * 0.5}s infinite alternate`
              : "none",
          }}>
            <ParticleShape type={p.type} size={p.size} gold={p.id % 3 === 0} />
          </div>
        </div>
      ))}
    </>
  )
}

// ─── Radial glow behind the name ──────────────────────────────────────────────
function BackgroundGlow({ visible }: { visible: boolean }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: "radial-gradient(ellipse 55% 40% at 50% 48%, rgba(249,168,212,0.18) 0%, rgba(253,242,248,0.08) 60%, transparent 100%)",
        opacity: visible ? 1 : 0,
        transition: "opacity 2s ease 0.5s",
      }}
    />
  )
}

// ─── Letter-by-letter name animation ─────────────────────────────────────────
function AnimatedName({ started }: { started: boolean }) {
  // Each letter floats up + fades in, staggered
  return (
    <h1
      className="font-serif leading-tight mb-8 text-foreground select-none"
      style={{ fontSize: "clamp(3.5rem, 12vw, 7rem)" }}
      aria-label={NAME}
    >
      {NAME.split("").map((letter, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: started ? 1 : 0,
            transform: started ? "translateY(0) scale(1)" : "translateY(28px) scale(0.85)",
            transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${0.8 + i * 0.09}s,
                         transform 0.7s cubic-bezier(0.34,1.56,0.64,1) ${0.8 + i * 0.09}s`,
            // very subtle shimmer tint on alternating letters
            color: i % 4 === 1 ? "var(--foreground)" : undefined,
            textShadow: started ? "0 2px 20px rgba(244,114,182,0.15)" : "none",
          }}
        >
          {letter}
        </span>
      ))}
    </h1>
  )
}

// ─── Scroll indicator — dot sliding down a line ───────────────────────────────
function ScrollIndicator({ visible }: { visible: boolean }) {
  return (
    <div
      className="mt-12 flex flex-col items-center gap-1"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    >
      <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/50 font-light mb-1">
        scroll
      </span>
      <div className="relative flex justify-center" style={{ width: "1px", height: "48px" }}>
        {/* Track */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(244,114,182,0.3), transparent)" }}
        />
        {/* Sliding dot */}
        <div
          style={{
            position: "absolute",
            top: 0,
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "rgba(244,114,182,0.7)",
            boxShadow: "0 0 6px rgba(244,114,182,0.5)",
            animation: visible ? "scrollDot 1.8s ease-in-out infinite" : "none",
            left: "-2px",
          }}
        />
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export function HeroSection() {
  const [phase, setPhase] = useState(0)
  // phase 0 = nothing
  // phase 1 = glow + particles visible, badge faded in
  // phase 2 = name letters animating
  // phase 3 = subtitle + scroll visible

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100)
    const t2 = setTimeout(() => setPhase(2), 300)
    const t3 = setTimeout(() => setPhase(3), 300 + NAME.length * 90 + 600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <>
      <style>{`
        @keyframes particleDrift {
          from { transform: translateY(0px); }
          to   { transform: translateY(-18px); }
        }
        @keyframes particleSway {
          from { transform: translateX(-6px) rotate(-8deg); }
          to   { transform: translateX(6px)  rotate(8deg);  }
        }
        @keyframes scrollDot {
          0%   { top: 0px;  opacity: 0;   }
          15%  { opacity: 1;              }
          85%  { opacity: 1;              }
          100% { top: 42px; opacity: 0;   }
        }
        @keyframes badgePulse {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1;   }
        }
      `}</style>

      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">

        {/* Soft radial glow */}
        <BackgroundGlow visible={phase >= 1} />

        {/* Drifting particles */}
        <div className="absolute inset-0 pointer-events-none">
          <FloatingParticles visible={phase >= 1} />
        </div>

        <div className="text-center max-w-3xl mx-auto relative z-10">

          {/* Badge — fades in first */}
          <div
            className="flex items-center justify-center gap-3 mb-8"
            style={{
              opacity: phase >= 1 ? 1 : 0,
              transform: phase >= 1 ? "translateY(0)" : "translateY(-8px)",
              transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
              animation: phase >= 1 ? "badgePulse 3s ease-in-out 1.5s infinite" : "none",
            }}
          >
            {/* Tiny heart SVG — crisper than lucide at small sizes */}
            <svg width="18" height="16" viewBox="0 0 20 18" fill="none">
              <path d="M10 16 C10 16 2 10 2 5.5 C2 3 4 1 6.5 1 C8 1 9.2 1.8 10 3 C10.8 1.8 12 1 13.5 1 C16 1 18 3 18 5.5 C18 10 10 16 10 16Z"
                fill="#f9a8d4" opacity="0.7"/>
            </svg>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-light">
              A quiet space for
            </span>
            <svg width="18" height="16" viewBox="0 0 20 18" fill="none">
              <path d="M10 16 C10 16 2 10 2 5.5 C2 3 4 1 6.5 1 C8 1 9.2 1.8 10 3 C10.8 1.8 12 1 13.5 1 C16 1 18 3 18 5.5 C18 10 10 16 10 16Z"
                fill="#f9a8d4" opacity="0.7"/>
            </svg>
          </div>

          {/* Name — letter by letter */}
          <AnimatedName started={phase >= 2} />

          {/* Subtitle — fades in after name finishes */}
          <p
            className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-xl mx-auto text-pretty"
            style={{
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 1s ease, transform 1s ease",
            }}
          >
            The shortest poem is a name..
          </p>

          {/* Scroll indicator */}
          <ScrollIndicator visible={phase >= 3} />
        </div>
      </section>
    </>
  )
}
