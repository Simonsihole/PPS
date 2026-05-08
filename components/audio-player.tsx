"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX, GripHorizontal } from "lucide-react"

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
      
      // Keep within viewport bounds
      const maxX = window.innerWidth - (playerRef.current?.offsetWidth || 200)
      const maxY = window.innerHeight - (playerRef.current?.offsetHeight || 50)
      
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
      
      const maxX = window.innerWidth - (playerRef.current?.offsetWidth || 200)
      const maxY = window.innerHeight - (playerRef.current?.offsetHeight || 50)
      
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
      // Browser blocked autoplay, user needs to interact first
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
        className="fixed z-50"
        style={{
          left: position.x,
          top: position.y,
          cursor: isDragging ? "grabbing" : "default",
        }}
      >
        <div className="flex items-center gap-1 bg-card/95 backdrop-blur-md rounded-full px-3 py-2 shadow-lg border border-border/50">
          {/* Drag handle */}
          <div
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-primary/10 rounded-full transition-colors"
          >
            <GripHorizontal className="w-4 h-4 text-muted-foreground" />
          </div>
          
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-primary" />
            ) : (
              <Play className="w-4 h-4 text-primary ml-0.5" />
            )}
          </button>
          
          <button
            onClick={toggleMute}
            className="w-7 h-7 rounded-full hover:bg-primary/10 flex items-center justify-center transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-muted-foreground" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-muted-foreground" />
            )}
          </button>
          
          <span className="text-xs text-muted-foreground font-light pr-1 hidden sm:inline">
            {audioError ? "No audio" : "Music"}
          </span>
        </div>
      </div>
    </>
  )
}
