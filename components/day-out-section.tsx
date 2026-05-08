"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar } from "lucide-react"

export function DayOutSection() {
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
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-muted-foreground font-light mb-4">
              <Calendar className="w-4 h-4" />
              <span>April 30, 2026</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground text-balance">
              The Day We Went Out
            </h2>
          </div>

          {/* Content Card */}
          <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg shadow-primary/5 border border-border/50">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            
            <div className="space-y-8 text-lg md:text-xl leading-relaxed text-foreground/85 font-light">
              <p>
                The day we finally went out together. I never expected you would actually agree 
                to go out with me, a stranger, a new guy. At first, I was confused why you said yes, 
                but I tried to think logically. Maybe a friendly girl like you just likes making new friends.
              </p>

              <p>
                We started the day sitting side by side on the bus. You were practically glowing with happiness. 
                You looked so incredibly endearing when you proudly told me you won first place on Earth Day. 
                Honestly, I didn&apos;t know what to say; I was just captivated by the bright light of your smile. 
                We talked a lot during the trip, and I found myself getting lost in your eyes when you spoke. 
                They hold a warmth that feels like coming home, so deeply and wonderfully beautiful.
              </p>

              <p>
                What makes it even better is that we like the same things: reading, writing, and more. 
                When you said you love going on trips, deep down in my heart, I also really wanted to go out 
                and see beautiful places. I adore beautiful things, just like I am completely mesmerized by your smile. 
                During the trip, I really wanted to gently pat your head because your presence was just too sweet to bear.
              </p>

              <p>
                As we walked through the mall, I was incredibly nervous. My steps felt stiff, my hands were cold, 
                and everything felt so wonderfully awkward, though I tried my hardest to act completely normal. 
                While we were eating, I tried so hard to appear mature. Even though the food was amazing and normally 
                I would devour it quickly, I held back, terrified of putting you off. During the movie, I caught myself 
                constantly glancing your way, worried that you might be bored or scared. I had no idea how to start 
                a conversation, so we just sat there in silence throughout the whole film.
              </p>

              <p>
                It was all so simple, yet it brought me so much joy. I want to spend days like that every week 
                if possible, but I know I can&apos;t force you. I will probably overthink it a thousand times before 
                I can gather the courage to ask you out again. I am just that overthinking guy, but it is surely 
                because I like you so much. Or maybe... maybe it is already love? It might have been nothing out 
                of the ordinary for you, but it meant everything to me. I have never gone out like that, spending 
                time with someone I care about so deeply; it was incredibly meaningful.
              </p>

              <p>
                Even when I got back to my room, the happiness lingered, and I found myself endlessly writing about you. 
                From the bus ride until we went home, I tried so hard to hide my big smile. That was the best day 
                of my year. I just want to always be around you. Watching you grow and thrive would make me so happy. 
                Yes, something as simple as that is enough to bring me absolute joy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}