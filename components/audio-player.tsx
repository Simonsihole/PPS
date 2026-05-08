"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [audioError, setAudioError] = useState<string | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const handleCanPlay = () => {
        console.log("[v0] Audio can play")
        setAudioError(null)
      }
      const handleError = (e: Event) => {
        const target = e.target as HTMLAudioElement
        console.log("[v0] Audio error:", target.error?.message)
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
    } catch (err) {
      console.log("[v0] Play error:", err)
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
      
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex items-center gap-2 bg-card/90 backdrop-blur-md rounded-full px-4 py-3 shadow-lg border border-border/50">
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-primary" />
            ) : (
              <Play className="w-5 h-5 text-primary ml-0.5" />
            )}
          </button>
          
          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-full hover:bg-primary/10 flex items-center justify-center transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Volume2 className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          
          <span className="text-xs text-muted-foreground font-light pr-1">
            {audioError ? "No audio" : "Music"}
          </span>
        </div>
      </div>
    </>
  )
}
