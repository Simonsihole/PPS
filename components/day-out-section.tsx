"use client"

import { useEffect, useRef, useState } from "react"

const MOMENTS = [
  {
    tag: "First thought",
    text: `The day we finally went out together. I never expected you would actually agree to go out with me, a stranger, a new guy. At first, I was confused why you said yes, but I tried to think logically. Maybe a friendly girl like you just likes making new friends.`,
  },
  {
    tag: "On the bus",
    text: `We started the day sitting side by side on the bus. You were practically glowing with happiness. You looked so incredibly endearing when you proudly told me you won first place on Earth Day. Honestly, I didn't know what to say; I was just captivated by the bright light of your smile. We talked a lot during the trip, and I found myself getting lost in your eyes when you spoke. They hold a warmth that feels like coming home, so deeply and wonderfully beautiful.`,
  },
  {
    tag: "In common",
    text: `What makes it even better is that we like the same things: reading, writing, and more. When you said you love going on trips, deep down in my heart, I also really wanted to go out and see beautiful places. I adore beautiful things, just like I am completely mesmerized by your smile. During the trip, I really wanted to gently pat your head because your presence was just too sweet to bear.`,
  },
  {
    tag: "The mall",
    text: `As we walked through the mall, I was incredibly nervous. My steps felt stiff, my hands were cold, and everything felt so wonderfully awkward, though I tried my hardest to act completely normal. While we were eating, I tried so hard to appear mature. Even though the food was amazing and normally I would devour it quickly, I held back, terrified of putting you off. During the movie, I caught myself constantly glancing your way, worried that you might be bored or scared. I had no idea how to start a conversation, so we just sat there in silence throughout the whole film.`,
  },
  {
    tag: "What it meant",
    text: `It was all so simple, yet it brought me so much joy. I want to spend days like that every week if possible, but I know I can't force you. I will probably overthink it a thousand times before I can gather the courage to ask you out again. I am just that overthinking guy, but it is surely because I like you so much. Or maybe... maybe it is something else? It might have been nothing out of the ordinary for you, but it meant everything to me.`,
  },
  {
    tag: "After",
    text: `Even when I got back to my room, the happiness lingered, and I found myself endlessly writing about you. From the bus ride until we went home, I tried so hard to hide my big smile. That was the best day of my year. I just want to always be around you. Watching you grow and thrive would make me so happy. Yes, something as simple as that is enough to bring me absolute joy.`,
  },
  {
    tag: "A spark",
    text: `I remember seeing a quote you once shared: "If, in that low-stakes space, a little warmth comes back, you have your answer." I want you to know that because of you, that warmth has finally returned to me. A spark came back to life the moment our day out ended. Everything feels completely different now. I find myself feeling alive and productive again playing my guitar, singing, finding new inspiration at work, studying, reading, and writing, just like I am doing right now. To you, it might have just been an ordinary day, but it helped me in ways I cannot fully explain. Thank you so much. You truly are a wonderfully beautiful soul to be around.`,
  },
]

function MomentCard({ moment, index, visible }: {
  moment: typeof MOMENTS[0]
  index: number
  visible: boolean
}) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.75s ease ${index * 0.07}s, transform 0.75s ease ${index * 0.07}s`,
      }}
    >
      {/* Timeline node */}
      <div className="flex gap-5 md:gap-8">
        {/* Left: timeline dot + line */}
        <div className="flex flex-col items-center" style={{ minWidth: 20 }}>
          <div
            className="rounded-full flex-shrink-0"
            style={{
              width: 10, height: 10, marginTop: 8,
              background: index % 3 === 0
                ? "rgba(244,114,182,0.8)"
                : index % 3 === 1
                  ? "rgba(251,191,36,0.75)"
                  : "rgba(251,207,232,0.9)",
              boxShadow: "0 0 8px rgba(244,114,182,0.3)",
            }}
          />
          {index < MOMENTS.length - 1 && (
            <div style={{
              flex: 1, width: 1, marginTop: 6,
              background: "linear-gradient(to bottom, rgba(251,207,232,0.5), transparent)",
              minHeight: 32,
            }} />
          )}
        </div>

        {/* Right: tag + text */}
        <div className="pb-10">
          <span
            className="inline-block text-xs uppercase tracking-[0.25em] font-light mb-3 px-2 py-0.5 rounded-full"
            style={{
              color: "rgba(244,114,182,0.9)",
              background: "rgba(253,242,248,0.8)",
              border: "1px solid rgba(251,207,232,0.6)",
            }}
          >
            {moment.tag}
          </span>
          <p className="text-lg md:text-xl leading-relaxed text-foreground/85 font-light">
            {moment.text}
          </p>
        </div>
      </div>
    </div>
  )
}

export function DayOutSection() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const [visibleItems, setVisibleItems] = useState<boolean[]>(MOMENTS.map(() => false))
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const observers = itemRefs.current.map((el, i) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting)
            setVisibleItems(prev => { const n = [...prev]; n[i] = true; return n })
        },
        { threshold: 0.15 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-secondary/30 relative overflow-hidden">
      {/* Subtle background bloom */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 50% 60% at 20% 40%, rgba(251,207,232,0.12) 0%, transparent 70%)",
      }} />

      <div className="max-w-3xl mx-auto relative">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          {/* Date chip */}
          <div
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(253,242,248,0.9)",
              border: "1px solid rgba(249,168,212,0.4)",
              boxShadow: "0 2px 12px rgba(244,114,182,0.08)",
            }}
          >
            {/* Tiny calendar icon */}
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="3" width="14" height="12" rx="2" stroke="#f9a8d4" strokeWidth="1.5"/>
              <path d="M1 7h14" stroke="#f9a8d4" strokeWidth="1.5"/>
              <path d="M5 1v4M11 1v4" stroke="#f9a8d4" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-light">
              April 30, 2026
            </span>
          </div>

          <div className="flex justify-center mb-5">
            <div style={{ width: 32, height: 1, background: "rgba(244,114,182,0.35)" }} />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">
            The Day We Went Out
          </h2>
        </div>

        {/* Timeline */}
        <div>
          {MOMENTS.map((moment, i) => (
            <div key={i} ref={el => { itemRefs.current[i] = el }}>
              <MomentCard moment={moment} index={i} visible={visibleItems[i]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}