"use client"

import { useEffect, useRef, useState } from "react"

export function StorySection() {
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
    <section ref={sectionRef} className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-light">
              The Beginning
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4 text-foreground text-balance">
              How We Met
            </h2>
          </div>

          {/* First Paragraph */}
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden md:block" />
            
            <div className="space-y-8 text-lg md:text-xl leading-relaxed text-foreground/85 font-light">
              <p>
                A new intern from USU. Honestly, my first impression was nothing at all. 
                I was too busy dealing with a hundred strange invoices that month, so I 
                didn&apos;t have time to say hi or get to know you.
              </p>

              <p>
                Then, in a quiet moment in March, we met. Just the two of us in the elevator. 
                I looked at you and saw a quiet kind of beauty that caught me completely off guard. 
                For some reason, I felt incredibly nervous. I am never nervous around anyone, 
                but that was the first time. Since that day, whenever I am not working, 
                I can&apos;t stop thinking about you.
              </p>

              <p>
                I was so curious to know your name that I asked Mr. Vero, which turned out to be 
                a really bad idea. He immediately told you I was interested. It was so embarrassing, 
                to be honest. I have never let myself look that awkward in my whole life.
              </p>

              <p>
                Long story short, I reached out to you on WhatsApp with awkward small talk. 
                Day after day, I felt embarrassed by the way I texted, probably because I was 
                just so nervous. But slowly, I realized that I really do like you. You possess 
                this effortless grace so radiant and cheerful, yet holding a delicate, captivating 
                shyness that draws me in. I realize you are not like the other girls I used to know.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
