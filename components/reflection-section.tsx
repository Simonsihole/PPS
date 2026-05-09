"use client"

import { useEffect, useRef, useState } from "react"

// Animated sparkle SVG
function SparkleIcon({ delay = 0 }: { delay?: number }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 20 20" fill="none"
      style={{ animation: `sparklePulse 2.5s ease-in-out ${delay}s infinite` }}
    >
      <path
        d="M10 0 L11.2 8.8 L20 10 L11.2 11.2 L10 20 L8.8 11.2 L0 10 L8.8 8.8 Z"
        fill="rgba(244,114,182,0.5)"
      />
      <path
        d="M10 4 L10.6 9.4 L16 10 L10.6 10.6 L10 16 L9.4 10.6 L4 10 L9.4 9.4 Z"
        fill="rgba(251,191,36,0.4)"
      />
    </svg>
  )
}

// Pull-quote highlight block
function PullQuote({ text }: { text: string }) {
  return (
    <div
      className="relative my-10 px-8 py-6 rounded-2xl"
      style={{
        background: "linear-gradient(135deg, rgba(253,242,248,0.9) 0%, rgba(255,251,235,0.7) 100%)",
        border: "1px solid rgba(249,168,212,0.3)",
        boxShadow: "0 4px 24px rgba(244,114,182,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
      }}
    >
      {/* Opening quote mark */}
      <span
        className="absolute top-3 left-5 font-serif select-none"
        style={{ fontSize: "3rem", lineHeight: 1, color: "rgba(244,114,182,0.25)" }}
      >
        "
      </span>
      <p className="font-serif text-xl md:text-2xl text-foreground/80 italic text-center leading-relaxed relative z-10">
        {text}
      </p>
      {/* Closing quote mark */}
      <span
        className="absolute bottom-0 right-5 font-serif select-none"
        style={{ fontSize: "3rem", lineHeight: 1, color: "rgba(244,114,182,0.25)" }}
      >
        "
      </span>
      {/* Tiny gold dot accents */}
      <div className="absolute top-3 right-5 w-1.5 h-1.5 rounded-full" style={{ background: "rgba(251,191,36,0.5)" }} />
      <div className="absolute bottom-3 left-5 w-1 h-1 rounded-full" style={{ background: "rgba(249,168,212,0.6)" }} />
    </div>
  )
}

export function ReflectionSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [p1Visible, setP1Visible] = useState(false)
  const [p2Visible, setP2Visible] = useState(false)
  const sectionRef  = useRef<HTMLElement>(null)
  const p1Ref = useRef<HTMLDivElement>(null)
  const p2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const makeObs = (ref: React.RefObject<HTMLDivElement | null>, setter: (v: boolean) => void) => {
      if (!ref.current) return
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setter(true) },
        { threshold: 0.2 }
      )
      obs.observe(ref.current)
      return obs
    }
    const o1 = makeObs(p1Ref, setP1Visible)
    const o2 = makeObs(p2Ref, setP2Visible)
    return () => { o1?.disconnect(); o2?.disconnect() }
  }, [])

  return (
    <>
      <style>{`
        @keyframes sparklePulse {
          0%, 100% { opacity: 0.4; transform: scale(0.9) rotate(0deg);   }
          50%       { opacity: 1;   transform: scale(1.1) rotate(15deg);  }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-8px); }
        }
      `}</style>

      <section ref={sectionRef} className="py-24 md:py-32 px-6 relative overflow-hidden">
        {/* Ambient glow right side */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 45% 55% at 85% 30%, rgba(253,230,138,0.08) 0%, transparent 65%)",
        }} />

        <div className="max-w-3xl mx-auto relative">
          {/* Header */}
          <div
            className="text-center mb-16"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.9s ease, transform 0.9s ease",
            }}
          >
            <span className="text-xs uppercase tracking-[0.35em] text-muted-foreground font-light">
              My Thoughts
            </span>
            <div className="flex justify-center mt-2 mb-5">
              <div style={{ width: 32, height: 1, background: "rgba(244,114,182,0.35)" }} />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">
              What I See in You
            </h2>
          </div>

          {/* First paragraph */}
          <div
            ref={p1Ref}
            style={{
              opacity: p1Visible ? 1 : 0,
              transform: p1Visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.9s ease, transform 0.9s ease",
            }}
          >
            <p className="text-lg md:text-xl leading-relaxed text-foreground/85 font-light">
              You have this rare, quiet strength. You don&apos;t seek validation from the world, you aren&apos;t tethered to a screen, and you don&apos;t chase after affection. You are already whole, perhaps because your heart is so perfectly full of the love you get from your family.
            </p>
          </div>

          {/* Pull quote — the heart of this section */}
          <div
            style={{
              opacity: p1Visible ? 1 : 0,
              transition: "opacity 1s ease 0.3s",
            }}
          >
            <PullQuote text="You are already whole.. and somehow that makes me want to be better too." />
          </div>

          {/* Sparkle divider */}
          <div
            className="flex items-center justify-center gap-4 my-2"
            style={{
              opacity: p1Visible ? 1 : 0,
              transition: "opacity 1s ease 0.5s",
            }}
          >
            <SparkleIcon delay={0} />
            <SparkleIcon delay={0.4} />
            <SparkleIcon delay={0.8} />
          </div>

          {/* Second paragraph */}
          <div
            ref={p2Ref}
            className="mt-8"
            style={{
              opacity: p2Visible ? 1 : 0,
              transform: p2Visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.9s ease, transform 0.9s ease",
            }}
          >
            <p className="text-lg md:text-xl leading-relaxed text-foreground/85 font-light">
              This is the first time I have liked someone this fast, but I know that can be a scary thing. I am afraid the feeling could fade just as fast. That is why I am trying to give you space, learning what you like and what you don&apos;t. I want this to last. For the first time, I am the one who fell first, not the other way around like in my past. I think you are worth every effort, and I want to set a goal to get closer to you.
            </p>
          </div>

          {/* Closing accent */}
          <div
            className="flex justify-end mt-10"
            style={{
              opacity: p2Visible ? 1 : 0,
              transition: "opacity 1s ease 0.4s",
            }}
          >
            <svg width="48" height="12" viewBox="0 0 48 12" fill="none">
              <path d="M0 6 Q12 0 24 6 Q36 12 48 6" stroke="rgba(249,168,212,0.4)" strokeWidth="1.5" fill="none"/>
              <circle cx="48" cy="6" r="2.5" fill="rgba(251,191,36,0.5)" />
            </svg>
          </div>
        </div>
      </section>
    </>
  )
}