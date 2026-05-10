"use client"

import { useEffect, useRef, useState } from "react"

const NOTES = [
  { id: 0, x: 18, delay: 0.0, dur: 2.4, symbol: "♪" },
  { id: 1, x: 60, delay: 0.8, dur: 2.9, symbol: "♫" },
  { id: 2, x: 38, delay: 1.6, dur: 2.2, symbol: "♩" },
]

export function AudioPlayer() {
  const audioRef  = useRef<HTMLAudioElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying]   = useState(false)
  const [audioError, setAudioError] = useState<string | null>(null)
  const [position, setPosition]     = useState({ x: 20, y: 20 })
  const [isDragging, setIsDragging] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onOk  = () => setAudioError(null)
    const onErr = (e: Event) => setAudioError((e.target as HTMLAudioElement).error?.message ?? "Audio failed")
    audio.addEventListener("canplaythrough", onOk)
    audio.addEventListener("error", onErr)
    return () => {
      audio.removeEventListener("canplaythrough", onOk)
      audio.removeEventListener("error", onErr)
    }
  }, [])

  useEffect(() => {
    if (!isDragging) return
    const move = (cx: number, cy: number) => {
      const maxX = window.innerWidth  - (playerRef.current?.offsetWidth  ?? 80)
      const maxY = window.innerHeight - (playerRef.current?.offsetHeight ?? 80)
      setPosition({
        x: Math.max(0, Math.min(cx - dragOffset.current.x, maxX)),
        y: Math.max(0, Math.min(cy - dragOffset.current.y, maxY)),
      })
    }
    const onMM  = (e: MouseEvent) => move(e.clientX, e.clientY)
    const onTM  = (e: TouchEvent) => move(e.touches[0].clientX, e.touches[0].clientY)
    const onEnd = () => setIsDragging(false)
    window.addEventListener("mousemove", onMM)
    window.addEventListener("mouseup", onEnd)
    window.addEventListener("touchmove", onTM, { passive: true })
    window.addEventListener("touchend", onEnd)
    return () => {
      window.removeEventListener("mousemove", onMM)
      window.removeEventListener("mouseup", onEnd)
      window.removeEventListener("touchmove", onTM)
      window.removeEventListener("touchend", onEnd)
    }
  }, [isDragging])

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const [cx, cy] = "touches" in e
      ? [e.touches[0].clientX, e.touches[0].clientY]
      : [e.clientX, e.clientY]
    dragOffset.current = { x: cx - position.x, y: cy - position.y }
    setIsDragging(true)
  }

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      if (isPlaying) { audio.pause(); setIsPlaying(false) }
      else           { await audio.play(); setIsPlaying(true) }
    } catch {}
  }

  return (
    <>
      <style>{`
        @keyframes ringPulse {
          0%   { transform: scale(1);    opacity: 0.6; }
          70%  { transform: scale(1.55); opacity: 0;   }
          100% { transform: scale(1.55); opacity: 0;   }
        }
        @keyframes ringPulse2 {
          0%   { transform: scale(1);    opacity: 0.4; }
          70%  { transform: scale(1.8);  opacity: 0;   }
          100% { transform: scale(1.8);  opacity: 0;   }
        }
        @keyframes noteFloat {
          0%   { opacity: 0;   transform: translateY(0px)   rotate(0deg);  }
          15%  { opacity: 0.9;                                              }
          80%  { opacity: 0.6;                                              }
          100% { opacity: 0;   transform: translateY(-38px) rotate(25deg); }
        }
        @keyframes bunnyBob {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-3px); }
        }
      `}</style>

      <audio ref={audioRef} src="/Mrsmagic.mp3" loop preload="auto" />

      <div
        ref={playerRef}
        className="fixed z-50 select-none"
        style={{
          left: position.x,
          top:  position.y,
          cursor: isDragging ? "grabbing" : "grab",
          touchAction: "none",
        }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div className="relative">
          {/* Pulsing glow rings — only when playing */}
          {isPlaying && (
            <>
              <div className="absolute inset-0 rounded-full" style={{
                background: "rgba(249,168,212,0.35)",
                animation: "ringPulse 1.6s ease-out infinite",
                zIndex: -1,
              }}/>
              <div className="absolute inset-0 rounded-full" style={{
                background: "rgba(249,168,212,0.2)",
                animation: "ringPulse2 1.6s ease-out 0.4s infinite",
                zIndex: -1,
              }}/>
            </>
          )}

          {/* Floating music notes */}
          {isPlaying && NOTES.map(n => (
            <div key={n.id}
              className="absolute pointer-events-none font-serif"
              style={{
                left: `${n.x}%`,
                bottom: "100%",
                fontSize: "0.75rem",
                color: "rgba(244,114,182,0.8)",
                animation: `noteFloat ${n.dur}s ease-out ${n.delay}s infinite`,
              }}
            >
              {n.symbol}
            </div>
          ))}

          {/* Bunny — tap to play/pause, drag to move */}
          <svg
            viewBox="0 -8 100 128"
            className="w-16 h-20 md:w-20 md:h-24 drop-shadow-lg"
            style={{
              animation: isPlaying ? "bunnyBob 1.2s ease-in-out infinite" : "none",
              filter: isPlaying
                ? "drop-shadow(0 4px 12px rgba(249,168,212,0.5))"
                : "drop-shadow(0 2px 6px rgba(0,0,0,0.1))",
            }}
            onClick={e => { e.stopPropagation(); togglePlay() }}
          >
            {/* Ears */}
            <ellipse cx="35" cy="20" rx="10" ry="25" fill="#FFF5F5" stroke="#FECDD3" strokeWidth="2"/>
            <ellipse cx="65" cy="20" rx="10" ry="25" fill="#FFF5F5" stroke="#FECDD3" strokeWidth="2"/>
            <ellipse cx="35" cy="20" rx="5"  ry="18" fill="#FECDD3"/>
            <ellipse cx="65" cy="20" rx="5"  ry="18" fill="#FECDD3"/>

            {/* Head / body */}
            <ellipse cx="50" cy="70" rx="35" ry="38" fill="#FFF5F5" stroke="#FECDD3" strokeWidth="2"/>

            {/* Cheeks */}
            <ellipse cx="28" cy="72" rx="7" ry="5" fill="#FECDD3" opacity="0.55"/>
            <ellipse cx="72" cy="72" rx="7" ry="5" fill="#FECDD3" opacity="0.55"/>

            {/* Eyes */}
            {isPlaying ? (
              <>
                <path d="M34 62 Q39 57 44 62" stroke="#4B5563" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                <path d="M56 62 Q61 57 66 62" stroke="#4B5563" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                <circle cx="30" cy="58" r="1.2" fill="#fbbf24" opacity="0.7"/>
                <circle cx="70" cy="58" r="1.2" fill="#fbbf24" opacity="0.7"/>
              </>
            ) : (
              <>
                <circle cx="40" cy="62" r="5" fill="#4B5563"/>
                <circle cx="60" cy="62" r="5" fill="#4B5563"/>
                <circle cx="41.5" cy="60.5" r="2" fill="white"/>
                <circle cx="61.5" cy="60.5" r="2" fill="white"/>
              </>
            )}

            {/* Nose */}
            <ellipse cx="50" cy="72" rx="4" ry="3" fill="#FDA4AF"/>

            {/* Mouth */}
            <path d="M46 78 Q50 83 54 78" stroke="#9CA3AF" strokeWidth="1.5" fill="none"/>

            {/* Belly play/pause indicator */}
            {isPlaying ? (
              <>
                <rect x="43" y="88" width="5" height="12" rx="1.5" fill="#FDA4AF"/>
                <rect x="52" y="88" width="5" height="12" rx="1.5" fill="#FDA4AF"/>
              </>
            ) : (
              <polygon points="45,88 45,100 58,94" fill="#FDA4AF"/>
            )}
          </svg>

          {/* Audio error badge */}
          {audioError && (
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-red-50 text-red-400 text-xs px-2 py-0.5 rounded-full whitespace-nowrap border border-red-100">
              No audio
            </div>
          )}
        </div>
      </div>
    </>
  )
}