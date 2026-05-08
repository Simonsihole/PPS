"use client"

import { useEffect, useState } from "react"

// Cute bunny SVG
function Bunny({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      {/* Ears */}
      <ellipse cx="35" cy="25" rx="8" ry="20" className="fill-current" />
      <ellipse cx="65" cy="25" rx="8" ry="20" className="fill-current" />
      <ellipse cx="35" cy="25" rx="5" ry="15" className="fill-pink-200" />
      <ellipse cx="65" cy="25" rx="5" ry="15" className="fill-pink-200" />
      {/* Head */}
      <circle cx="50" cy="55" r="30" className="fill-current" />
      {/* Eyes */}
      <circle cx="40" cy="50" r="4" className="fill-gray-800" />
      <circle cx="60" cy="50" r="4" className="fill-gray-800" />
      <circle cx="41" cy="49" r="1.5" className="fill-white" />
      <circle cx="61" cy="49" r="1.5" className="fill-white" />
      {/* Nose */}
      <ellipse cx="50" cy="60" rx="3" ry="2" className="fill-pink-300" />
      {/* Cheeks */}
      <ellipse cx="32" cy="58" rx="5" ry="3" className="fill-pink-200 opacity-60" />
      <ellipse cx="68" cy="58" rx="5" ry="3" className="fill-pink-200 opacity-60" />
      {/* Mouth */}
      <path d="M47 64 Q50 68 53 64" stroke="#666" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

// Cute cat SVG
function Cat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      {/* Ears */}
      <polygon points="25,45 35,15 45,45" className="fill-current" />
      <polygon points="55,45 65,15 75,45" className="fill-current" />
      <polygon points="30,42 35,22 40,42" className="fill-pink-200" />
      <polygon points="60,42 65,22 70,42" className="fill-pink-200" />
      {/* Head */}
      <ellipse cx="50" cy="58" rx="30" ry="26" className="fill-current" />
      {/* Eyes */}
      <ellipse cx="38" cy="52" rx="5" ry="6" className="fill-gray-800" />
      <ellipse cx="62" cy="52" rx="5" ry="6" className="fill-gray-800" />
      <ellipse cx="39" cy="50" rx="2" ry="2.5" className="fill-white" />
      <ellipse cx="63" cy="50" rx="2" ry="2.5" className="fill-white" />
      {/* Nose */}
      <polygon points="50,60 47,64 53,64" className="fill-pink-300" />
      {/* Cheeks */}
      <ellipse cx="28" cy="62" rx="6" ry="4" className="fill-pink-200 opacity-60" />
      <ellipse cx="72" cy="62" rx="6" ry="4" className="fill-pink-200 opacity-60" />
      {/* Whiskers */}
      <line x1="20" y1="58" x2="32" y2="60" stroke="#999" strokeWidth="1" />
      <line x1="20" y1="64" x2="32" y2="64" stroke="#999" strokeWidth="1" />
      <line x1="68" y1="60" x2="80" y2="58" stroke="#999" strokeWidth="1" />
      <line x1="68" y1="64" x2="80" y2="64" stroke="#999" strokeWidth="1" />
      {/* Mouth */}
      <path d="M47 67 Q50 71 53 67" stroke="#666" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

// Cute bear SVG
function Bear({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      {/* Ears */}
      <circle cx="25" cy="30" r="12" className="fill-current" />
      <circle cx="75" cy="30" r="12" className="fill-current" />
      <circle cx="25" cy="30" r="7" className="fill-pink-200" />
      <circle cx="75" cy="30" r="7" className="fill-pink-200" />
      {/* Head */}
      <circle cx="50" cy="55" r="32" className="fill-current" />
      {/* Eyes */}
      <circle cx="38" cy="50" r="4" className="fill-gray-800" />
      <circle cx="62" cy="50" r="4" className="fill-gray-800" />
      <circle cx="39" cy="49" r="1.5" className="fill-white" />
      <circle cx="63" cy="49" r="1.5" className="fill-white" />
      {/* Muzzle */}
      <ellipse cx="50" cy="64" rx="12" ry="9" className="fill-amber-50" />
      {/* Nose */}
      <ellipse cx="50" cy="60" rx="4" ry="3" className="fill-amber-800" />
      {/* Cheeks */}
      <ellipse cx="28" cy="58" rx="5" ry="3" className="fill-pink-200 opacity-60" />
      <ellipse cx="72" cy="58" rx="5" ry="3" className="fill-pink-200 opacity-60" />
      {/* Mouth */}
      <path d="M46 67 Q50 72 54 67" stroke="#8B4513" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

// Small heart
function Heart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  )
}

// Small star
function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
}

// Small flower
function Flower({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      <ellipse cx="50" cy="25" rx="15" ry="20" className="fill-pink-300" />
      <ellipse cx="25" cy="50" rx="20" ry="15" className="fill-pink-300" />
      <ellipse cx="75" cy="50" rx="20" ry="15" className="fill-pink-300" />
      <ellipse cx="50" cy="75" rx="15" ry="20" className="fill-pink-300" />
      <ellipse cx="30" cy="30" rx="15" ry="15" className="fill-pink-200" />
      <ellipse cx="70" cy="30" rx="15" ry="15" className="fill-pink-200" />
      <ellipse cx="30" cy="70" rx="15" ry="15" className="fill-pink-200" />
      <ellipse cx="70" cy="70" rx="15" ry="15" className="fill-pink-200" />
      <circle cx="50" cy="50" r="12" className="fill-yellow-300" />
    </svg>
  )
}

interface Decoration {
  id: number
  type: "bunny" | "cat" | "bear" | "heart" | "star" | "flower"
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

export function CuteDecorations() {
  const [decorations, setDecorations] = useState<Decoration[]>([])

  useEffect(() => {
    // Check if mobile
    const isMobile = window.innerWidth < 768
    
    // Create decorations with different positions for mobile
    const items: Decoration[] = isMobile ? [
      // Mobile: Left side decorations - smaller and pushed to edge
      { id: 1, type: "bunny", x: -2, y: 15, size: 28, delay: 0, duration: 4 },
      { id: 2, type: "heart", x: 0, y: 35, size: 12, delay: 0.5, duration: 3 },
      { id: 3, type: "cat", x: -3, y: 55, size: 26, delay: 1, duration: 4.5 },
      { id: 4, type: "star", x: 1, y: 75, size: 10, delay: 0.3, duration: 3.5 },
      { id: 5, type: "flower", x: -2, y: 90, size: 18, delay: 0.8, duration: 4 },
      
      // Mobile: Right side decorations - moved toward middle (around 80-85%)
      { id: 6, type: "cat", x: 82, y: 12, size: 26, delay: 0.2, duration: 4.2 },
      { id: 7, type: "star", x: 84, y: 30, size: 12, delay: 0.7, duration: 3.2 },
      { id: 8, type: "bear", x: 80, y: 48, size: 28, delay: 0.4, duration: 4.8 },
      { id: 9, type: "heart", x: 85, y: 68, size: 14, delay: 0.6, duration: 3.8 },
      { id: 10, type: "bunny", x: 82, y: 85, size: 24, delay: 0.9, duration: 4.3 },
    ] : [
      // Desktop: Left side decorations
      { id: 1, type: "bunny", x: 1, y: 15, size: 40, delay: 0, duration: 4 },
      { id: 2, type: "heart", x: 2, y: 35, size: 16, delay: 0.5, duration: 3 },
      { id: 3, type: "cat", x: 0, y: 55, size: 36, delay: 1, duration: 4.5 },
      { id: 4, type: "star", x: 3, y: 75, size: 14, delay: 0.3, duration: 3.5 },
      { id: 5, type: "flower", x: 1, y: 90, size: 24, delay: 0.8, duration: 4 },
      
      // Desktop: Right side decorations
      { id: 6, type: "cat", x: 96, y: 12, size: 36, delay: 0.2, duration: 4.2 },
      { id: 7, type: "star", x: 95, y: 30, size: 18, delay: 0.7, duration: 3.2 },
      { id: 8, type: "bear", x: 96, y: 48, size: 38, delay: 0.4, duration: 4.8 },
      { id: 9, type: "heart", x: 97, y: 68, size: 20, delay: 0.6, duration: 3.8 },
      { id: 10, type: "bunny", x: 96, y: 85, size: 34, delay: 0.9, duration: 4.3 },
      
      // Desktop only: Extra small accents
      { id: 11, type: "heart", x: 4, y: 25, size: 12, delay: 1.2, duration: 3 },
      { id: 12, type: "star", x: 94, y: 40, size: 14, delay: 1.5, duration: 3.3 },
      { id: 13, type: "flower", x: 95, y: 58, size: 18, delay: 1.1, duration: 3.7 },
      { id: 14, type: "heart", x: 3, y: 65, size: 12, delay: 1.4, duration: 3.1 },
    ]
    setDecorations(items)
  }, [])

  const renderDecoration = (type: Decoration["type"], className: string) => {
    switch (type) {
      case "bunny":
        return <Bunny className={className} />
      case "cat":
        return <Cat className={className} />
      case "bear":
        return <Bear className={className} />
      case "heart":
        return <Heart className={className} />
      case "star":
        return <Star className={className} />
      case "flower":
        return <Flower className={className} />
    }
  }

  const getColor = (type: Decoration["type"]) => {
    switch (type) {
      case "bunny":
        return "text-white"
      case "cat":
        return "text-amber-100"
      case "bear":
        return "text-amber-200"
      case "heart":
        return "text-pink-300"
      case "star":
        return "text-yellow-300"
      case "flower":
        return "text-pink-200"
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {decorations.map((dec) => (
        <div
          key={dec.id}
          className="absolute"
          style={{
            left: `${dec.x}%`,
            top: `${dec.y}%`,
            width: dec.size,
            height: dec.size,
            animation: `float ${dec.duration}s ease-in-out infinite`,
            animationDelay: `${dec.delay}s`,
            opacity: 0.7,
          }}
        >
          {renderDecoration(dec.type, `w-full h-full ${getColor(dec.type)} drop-shadow-sm`)}
        </div>
      ))}
      
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(3deg);
          }
        }
      `}</style>
    </div>
  )
}
