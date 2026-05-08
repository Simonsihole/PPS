"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles } from "lucide-react"

export function ReflectionSection() {
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
              My Thoughts
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4 text-foreground text-balance">
              What I See in You
            </h2>
          </div>

          {/* Content */}
          <div className="space-y-8 text-lg md:text-xl leading-relaxed text-foreground/85 font-light">
            <p>
              You have this rare, quiet strength. 
              You don&apos;t seek validation from the world, you aren&apos;t tethered to a screen, and you don&apos;t 
              chase after affection. You are already whole, perhaps because your heart is so perfectly full 
              of the love you get from your family.
            </p>

            <div className="flex justify-center py-4">
              <Sparkles className="w-6 h-6 text-primary/40" />
            </div>

            <p>
              This is the first time I have liked someone this fast, but I know that can be a scary thing. 
              I am afraid the feeling could fade just as fast. That is why I am trying to give you space, 
              learning what you like and what you don&apos;t. I want this to last. For the first time, 
              I am the one who fell first, not the other way around like in my past. I think you are worth 
              every effort, and I want to set a goal to get closer to you.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
