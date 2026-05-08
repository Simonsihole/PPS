"use client"

import { useEffect, useRef, useState } from "react"

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [audioError, setAudioError] = useState<string | null>(null)
  const [position, setPosition] = useState({ x: 20, y: 20 })
  const [isDragging, setIsDragging] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const handleCanPlay = () => {
        setAudioError(null)
      }
      const handleError = (e: Event) => {
        const target = e.target as HTMLAudioElement
        setAudioError(target.error?.message || "Audio failed to load")
      }
      
      audio.addEventListener("canplaythrough", handleCanPlay)
      audio.addEventListener("error", handleError)
      
      return () => {
        audio.removeEventListener("canplaythrough", handleCanPlay)
        audio.removeEventListener("error", handleError)
      }
    }
  }, [])

  // Handle dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      
      const newX = e.clientX - dragOffset.current.x
      const newY = e.clientY - dragOffset.current.y
      
      const maxX = window.innerWidth - (playerRef.current?.offsetWidth || 80)
      const maxY = window.innerHeight - (playerRef.current?.offsetHeight || 80)
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return
      
      const touch = e.touches[0]
      const newX = touch.clientX - dragOffset.current.x
      const newY = touch.clientY - dragOffset.current.y
      
      const maxX = window.innerWidth - (playerRef.current?.offsetWidth || 80)
      const maxY = window.innerHeight - (playerRef.current?.offsetHeight || 80)
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      })
    }

    const handleTouchEnd = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchmove", handleTouchMove)
      window.addEventListener("touchend", handleTouchEnd)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isDragging])

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const player = playerRef.current
    if (!player) return

    let clientX: number, clientY: number
    
    if ("touches" in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    dragOffset.current = {
      x: clientX - position.x,
      y: clientY - position.y,
    }
    setIsDragging(true)
  }

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        await audio.play()
        setIsPlaying(true)
      }
    } catch {
      // Browser blocked autoplay
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.muted = !audio.muted
    setIsMuted(!isMuted)
  }

  return (
    <>
      <audio ref={audioRef} src="/Mrsmagic.mp3" loop preload="auto" />
      
      <div
        ref={playerRef}
        className="fixed z-50 select-none"
        style={{
          left: position.x,
          top: position.y,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        {/* Cute Bunny Audio Player */}
        <div className="relative">
          {/* Bunny body */}
          <svg 
            viewBox="0 0 100 120" 
            className="w-16 h-20 md:w-20 md:h-24 drop-shadow-lg"
            onClick={(e) => {
              e.stopPropagation()
              togglePlay()
            }}
          >
            {/* Ears */}
            <ellipse cx="35" cy="20" rx="10" ry="25" fill="#FFF5F5" stroke="#FECDD3" strokeWidth="2" />
            <ellipse cx="65" cy="20" rx="10" ry="25" fill="#FFF5F5" stroke="#FECDD3" strokeWidth="2" />
            <ellipse cx="35" cy="20" rx="5" ry="18" fill="#FECDD3" />
            <ellipse cx="65" cy="20" rx="5" ry="18" fill="#FECDD3" />
            
            {/* Head/Body */}
            <ellipse cx="50" cy="70" rx="35" ry="38" fill="#FFF5F5" stroke="#FECDD3" strokeWidth="2" />
            
            {/* Eyes - change based on playing state */}
            {isPlaying ? (
              <>
                {/* Happy closed eyes when playing */}
                <path d="M35 62 Q40 58 45 62" stroke="#4B5563" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M55 62 Q60 58 65 62" stroke="#4B5563" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </>
            ) : (
              <>
                {/* Open eyes when paused */}
                <circle cx="40" cy="62" r="5" fill="#4B5563" />
                <circle cx="60" cy="62" r="5" fill="#4B5563" />
                <circle cx="41.5" cy="60.5" r="2" fill="white" />
                <circle cx="61.5" cy="60.5" r="2" fill="white" />
              </>
            )}
            
            {/* Nose */}
            <ellipse cx="50" cy="72" rx="4" ry="3" fill="#FDA4AF" />
            
            {/* Cheeks */}
            <ellipse cx="28" cy="72" rx="6" ry="4" fill="#FECDD3" opacity="0.6" />
            <ellipse cx="72" cy="72" rx="6" ry="4" fill="#FECDD3" opacity="0.6" />
            
            {/* Mouth */}
            <path d="M46 78 Q50 83 54 78" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
            
            {/* Play/Pause icon on belly */}
            {isPlaying ? (
              <>
                <rect x="43" y="88" width="5" height="12" rx="1" fill="#FDA4AF" />
                <rect x="52" y="88" width="5" height="12" rx="1" fill="#FDA4AF" />
              </>
            ) : (
              <polygon points="45,88 45,100 58,94" fill="#FDA4AF" />
            )}
          </svg>
          
          {/* Mute button - small circle */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleMute()
            }}
            className="absolute -bottom-1 -right-1 w-6 h-6 md:w-7 md:h-7 rounded-full bg-white border-2 border-pink-200 flex items-center justify-center shadow-md hover:bg-pink-50 transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <svg viewBox="0 0 24 24" className="w-3 h-3 md:w-4 md:h-4 text-pink-400" fill="currentColor">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-3 h-3 md:w-4 md:h-4 text-pink-400" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            )}
          </button>
          
          {/* Status indicator */}
          {audioError && (
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-red-100 text-red-500 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
              No audio
            </div>
          )}
          
          {/* Floating animation when playing */}
          {isPlaying && (
            <div className="absolute -top-1 left-1/2 -translate-x-1/2">
              <span className="text-xs animate-bounce inline-block">&#9835;</span>
            </div>
          )}
        </div>
      </div>
      
    </>
  )
}
