"use client"

import { useEffect, useRef, useState } from "react"

const PARAGRAPHS = [
  `A new intern from USU. Honestly, my first impression was nothing at all. I was too busy dealing with a hundred strange invoices that month, so I didn't have time to say hi or get to know you.`,
  `Then, in a quiet moment in March, we met. Just the two of us in the elevator. I looked at you and saw a quiet kind of beauty that caught me completely off guard. For some reason, I felt incredibly nervous. I am never nervous around anyone, but that was the first time. Since that day, whenever I am not working, I can't stop thinking about you.`,
  `I was so curious to know your name that I asked Mr. Vero, which turned out to be a really bad idea. He immediately told you I was interested. It was so embarrassing, to be honest. I have never let myself look that awkward in my whole life.`,
  `Long story short, I reached out to you on WhatsApp with awkward small talk. Day after day, I felt embarrassed by the way I texted, probably because I was just so nervous. But slowly, I realized that I really do like you. You possess this effortless grace so radiant and cheerful, yet holding a delicate, captivating shyness that draws me in. I realize you are not like the other girls I used to know.`,
]

// Small decorative petal divider
function PetalDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <div style={{ width: 40, height: 1, background: "linear-gradient(to right, transparent, rgba(244,114,182,0.3))" }} />
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <ellipse cx="6" cy="6" rx="3" ry="5" fill="#f9a8d4" opacity="0.6" transform="rotate(-30 6 6)" />
        <ellipse cx="6" cy="6" rx="3" ry="5" fill="#fbcfe8" opacity="0.5" transform="rotate(30 6 6)" />
        <circle cx="6" cy="6" r="1.5" fill="#fbbf24" opacity="0.7" />
      </svg>
      <div style={{ width: 40, height: 1, background: "linear-gradient(to left, transparent, rgba(244,114,182,0.3))" }} />
    </div>
  )
}

export function StorySection() {
  const [isVisible, setIsVisible] = useState(false)
  const [paraVisible, setParaVisible] = useState<boolean[]>(PARAGRAPHS.map(() => false))
  const sectionRef = useRef<HTMLElement>(null)
  const paraRefs = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const observers = paraRefs.current.map((el, i) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting)
            setParaVisible(prev => { const n = [...prev]; n[i] = true; return n })
        },
        { threshold: 0.2 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <>
      <style>{`
        @keyframes borderGrow {
          from { height: 0; opacity: 0; }
          to   { height: 100%; opacity: 1; }
        }
        @keyframes floatQuote {
          0%, 100% { transform: translateY(0px) rotate(-8deg); }
          50%       { transform: translateY(-6px) rotate(-8deg); }
        }
      `}</style>

      <section ref={sectionRef} className="py-24 md:py-32 px-6 relative overflow-hidden">
        {/* Soft background texture */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(249,168,212,0.06) 0%, transparent 70%)",
        }} />

        <div className="max-w-3xl mx-auto relative">
          {/* Section header */}
          <div
            className="text-center mb-16"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.9s ease, transform 0.9s ease",
            }}
          >
            <span className="text-xs uppercase tracking-[0.35em] text-muted-foreground font-light">
              The Beginning
            </span>
            {/* Decorative line under label */}
            <div className="flex justify-center mt-2 mb-5">
              <div style={{ width: 32, height: 1, background: "rgba(244,114,182,0.35)" }} />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">
              How We Met
            </h2>
          </div>

          {/* Content with animated left accent bar */}
          <div className="relative pl-6 md:pl-10">
            {/* Animated left border line */}
            <div
              className="absolute left-0 top-0 w-px"
              style={{
                background: "linear-gradient(to bottom, transparent, rgba(244,114,182,0.5) 20%, rgba(251,207,232,0.4) 80%, transparent)",
                animation: isVisible ? "borderGrow 1.4s ease 0.3s forwards" : "none",
                height: 0,
                opacity: 0,
              }}
            />

            {/* Big decorative opening quote */}
            <div
              className="absolute -top-4 -left-2 font-serif select-none pointer-events-none"
              style={{
                fontSize: "5rem",
                lineHeight: 1,
                color: "rgba(249,168,212,0.2)",
                animation: isVisible ? "floatQuote 4s ease-in-out infinite" : "none",
                opacity: isVisible ? 1 : 0,
                transition: "opacity 1s ease 0.5s",
              }}
            >
              "
            </div>

            <div className="space-y-0">
              {PARAGRAPHS.map((text, i) => (
                <div key={i}>
                  <p
                    ref={el => { paraRefs.current[i] = el }}
                    className="text-lg md:text-xl leading-relaxed text-foreground/85 font-light py-5"
                    style={{
                      opacity: paraVisible[i] ? 1 : 0,
                      transform: paraVisible[i] ? "translateX(0)" : "translateX(-12px)",
                      transition: `opacity 0.8s ease ${i * 0.08}s, transform 0.8s ease ${i * 0.08}s`,
                    }}
                  >
                    {/* Dropcap on first paragraph */}
                    {i === 0 ? (
                      <>
                        <span
                          className="float-left font-serif leading-none mr-2"
                          style={{
                            fontSize: "3.8rem",
                            lineHeight: "0.85",
                            color: "rgba(244,114,182,0.6)",
                            marginTop: "4px",
                          }}
                        >
                          {text[0]}
                        </span>
                        {text.slice(1)}
                      </>
                    ) : text}
                  </p>
                  {i < PARAGRAPHS.length - 1 && <PetalDivider />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}