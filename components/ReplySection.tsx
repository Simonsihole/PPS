"use client"

import { useState, useEffect, useRef } from "react"
import { supabase } from "@/lib/supabase"

type Phase = "idle" | "typing" | "submitting" | "done" | "error"

interface Message {
  id: string
  content: string
  created_at: string
}

const MAX_MESSAGES = 3
const DELETE_PASSWORD = process.env.NEXT_PUBLIC_DELETE_PASSWORD ?? ""

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  })
}

// ─── Decorative ───────────────────────────────────────────────────────────────
function HeartDivider() {
  return (
    <div className="flex items-center justify-center gap-3 mb-10">
      <div style={{ width: 48, height: 1, background: "linear-gradient(to right, transparent, rgba(244,114,182,0.3))" }}/>
      <svg width="16" height="14" viewBox="0 0 24 22" fill="none">
        <defs>
          <radialGradient id="hdg" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fce7f3"/>
            <stop offset="100%" stopColor="#f9a8d4"/>
          </radialGradient>
        </defs>
        <path d="M12 20 C12 20 2 13 2 7 C2 4.2 4.2 2 7 2 C8.8 2 10.3 2.9 12 5 C13.7 2.9 15.2 2 17 2 C19.8 2 22 4.2 22 7 C22 13 12 20 12 20Z"
          fill="url(#hdg)" opacity="0.85"/>
      </svg>
      <div style={{ width: 48, height: 1, background: "linear-gradient(to left, transparent, rgba(244,114,182,0.3))" }}/>
    </div>
  )
}

function FloatingPetal({ x, y, gold, delay }: { x: number; y: number; gold: boolean; delay: number }) {
  return (
    <div className="absolute pointer-events-none" style={{
      left: `${x}%`, top: `${y}%`,
      width: 8, height: 6,
      borderRadius: "50% 10% 50% 10%",
      background: gold
        ? "radial-gradient(circle at 40% 40%, #fef3c7, #fbbf24)"
        : "radial-gradient(circle at 40% 40%, #fce7f3, #f9a8d4)",
      opacity: 0.4,
      animation: `petalFloat ${3 + delay}s ease-in-out ${delay}s infinite alternate`,
    }}/>
  )
}

// ─── Delete button ────────────────────────────────────────────────────────────
// On desktop: hidden until hover. On mobile: always visible at low opacity.
// Uses a touch-friendly tap target (min 44×44px area).
function DeleteButton({ onDelete }: { onDelete: () => Promise<void> }) {
  const [open, setOpen]       = useState(false)
  const [pw, setPw]           = useState("")
  const [shake, setShake]     = useState(false)
  const [loading, setLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIsMobile(window.matchMedia("(hover: none)").matches)
  }, [])

  const handleOpen = () => {
    setOpen(true)
    setPw("")
    setTimeout(() => inputRef.current?.focus(), 80)
  }

  const handleConfirm = async () => {
    if (pw !== DELETE_PASSWORD) {
      setShake(true)
      setTimeout(() => setShake(false), 600)
      setPw("")
      return
    }
    setLoading(true)
    await onDelete()
    setLoading(false)
    setOpen(false)
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter")  handleConfirm()
    if (e.key === "Escape") { setOpen(false); setPw("") }
  }

  if (!open) {
    return (
      // Outer div is the full tap-target (44×44 min), button sits inside
      <div className="absolute top-2 right-2 flex items-center justify-center" style={{ width: 44, height: 44 }}>
        <button
          onClick={handleOpen}
          aria-label="Delete message"
          title="Delete message"
          style={{
            width: 28, height: 28,
            borderRadius: "50%",
            background: "rgba(253,242,248,0.9)",
            border: "1px solid rgba(249,168,212,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            // Always visible on mobile (opacity 0.55), hover-reveal on desktop
            opacity: isMobile ? 0.55 : undefined,
            transition: "opacity 0.2s ease, box-shadow 0.2s ease",
            boxShadow: "0 1px 4px rgba(244,114,182,0.1)",
          }}
          // Desktop hover handled via inline onMouse events since Tailwind group-hover doesn't work cross-platform
          onMouseEnter={e => { if (!isMobile) (e.currentTarget as HTMLButtonElement).style.opacity = "1" }}
          onMouseLeave={e => { if (!isMobile) (e.currentTarget as HTMLButtonElement).style.opacity = "0" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"
              stroke="rgba(244,114,182,0.75)" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    )
  }

  // Password prompt — wider on mobile
  return (
    <div
      className="absolute top-3 right-3 flex items-center gap-2 px-3 py-2 rounded-2xl z-10"
      style={{
        background: "rgba(255,255,255,0.97)",
        border: "1px solid rgba(249,168,212,0.45)",
        boxShadow: "0 4px 16px rgba(244,114,182,0.18)",
        animation: shake ? "shake 0.5s ease" : "none",
        // Ensure it doesn't clip on narrow screens
        maxWidth: "calc(100% - 16px)",
      }}
    >
      <input
        ref={inputRef}
        type="password"
        value={pw}
        onChange={e => setPw(e.target.value)}
        onKeyDown={handleKey}
        placeholder="password"
        className="outline-none text-xs font-light text-foreground/70 placeholder:text-muted-foreground/40 bg-transparent"
        style={{
          // Wider on mobile so the keyboard doesn't obscure it
          width: isMobile ? 96 : 72,
          minWidth: 0,
        }}
      />
      <button
        onClick={handleConfirm}
        disabled={loading}
        style={{
          background: "linear-gradient(135deg, #f9a8d4, #fbbf24)",
          color: "white",
          border: "none",
          borderRadius: 20,
          padding: "3px 10px",
          fontSize: 12,
          cursor: "pointer",
          opacity: loading ? 0.6 : 1,
          // Bigger tap area on mobile
          minHeight: isMobile ? 32 : "auto",
          minWidth: isMobile ? 36 : "auto",
        }}
      >
        {loading ? "…" : "ok"}
      </button>
      <button
        onClick={() => { setOpen(false); setPw("") }}
        style={{
          background: "none", border: "none", cursor: "pointer",
          fontSize: 13, color: "rgba(156,163,175,0.7)",
          // Bigger tap area on mobile
          padding: isMobile ? "6px 4px" : "0",
          lineHeight: 1,
        }}
      >
        ✕
      </button>
    </div>
  )
}

// ─── Single message card ──────────────────────────────────────────────────────
function MessageCard({
  msg, index, onDelete,
}: {
  msg: Message
  index: number
  onDelete: (id: string) => Promise<void>
}) {
  const [visible, setVisible]   = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 120)
    return () => clearTimeout(t)
  }, [index])

  const handleDelete = async () => {
    setDeleting(true)
    await onDelete(msg.id)
  }

  return (
    <div
      className="relative"
      style={{
        opacity: deleting ? 0 : visible ? 1 : 0,
        transform: deleting
          ? "scale(0.95) translateY(-4px)"
          : visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        pointerEvents: deleting ? "none" : "auto",
      }}
    >
      <div
        className="relative rounded-2xl p-6"
        style={{
          background: "rgba(255,255,255,0.65)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(249,168,212,0.2)",
          boxShadow: "0 4px 20px rgba(244,114,182,0.07)",
          // Extra right padding so text never goes under the delete button
          paddingRight: "3rem",
        }}
      >
        <DeleteButton onDelete={handleDelete} />

        <p className="text-base md:text-lg leading-relaxed text-foreground/80 font-light whitespace-pre-wrap">
          {msg.content}
        </p>

        <p className="text-xs text-muted-foreground/50 font-light mt-4">
          {formatDate(msg.created_at)}
        </p>
      </div>
    </div>
  )
}

// ─── Guestbook full state ─────────────────────────────────────────────────────
function GuestbookFull() {
  return (
    <div
      className="text-center py-8 px-6 rounded-3xl"
      style={{
        background: "rgba(255,255,255,0.5)",
        border: "1px solid rgba(249,168,212,0.2)",
        animation: "fadeSlideUp 0.7s ease forwards",
      }}
    >
      <div className="flex justify-center mb-4">
        {[0, 1, 2].map(i => (
          <svg key={i} width="18" height="16" viewBox="0 0 24 22" fill="none"
            style={{ margin: "0 3px", opacity: 0.7 + i * 0.1 }}
          >
            <defs>
              <radialGradient id={`fh${i}`} cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#fce7f3"/>
                <stop offset="100%" stopColor="#f9a8d4"/>
              </radialGradient>
            </defs>
            <path d="M12 20 C12 20 2 13 2 7 C2 4.2 4.2 2 7 2 C8.8 2 10.3 2.9 12 5 C13.7 2.9 15.2 2 17 2 C19.8 2 22 4.2 22 7 C22 13 12 20 12 20Z"
              fill={`url(#fh${i})`}/>
          </svg>
        ))}
      </div>
      <p className="font-serif text-xl text-foreground mb-2">
        This little guestbook is full.
      </p>
      <p className="text-sm text-muted-foreground font-light">
        Thank you for your words, Pricilia. 🌸
      </p>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export function ReplySection() {
  const [phase, setPhase]         = useState<Phase>("idle")
  const [message, setMessage]     = useState("")
  const [charCount, setCharCount] = useState(0)
  const [messages, setMessages]   = useState<Message[]>([])
  const [loading, setLoading]     = useState(true)
  const CHAR_MAX = 280
  const isFull = messages.length >= MAX_MESSAGES

  useEffect(() => {
    async function fetchMessages() {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false })
      if (!error && data) setMessages(data)
      setLoading(false)
    }
    fetchMessages()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    if (val.length <= CHAR_MAX) {
      setMessage(val)
      setCharCount(val.length)
      setPhase(val.length > 0 ? "typing" : "idle")
    }
  }

  const handleSubmit = async () => {
    if (!message.trim() || phase === "submitting" || phase === "done" || isFull) return
    setPhase("submitting")
    try {
      const { data, error } = await supabase
        .from("messages")
        .insert([{ content: message.trim() }])
        .select()
        .single()
      if (error) throw error
      if (data) setMessages(prev => [data, ...prev])
      setPhase("done")
    } catch {
      setPhase("error")
    }
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("messages").delete().eq("id", id)
    if (!error) {
      setTimeout(() => {
        setMessages(prev => prev.filter(m => m.id !== id))
        if (phase === "done") { setPhase("idle"); setMessage(""); setCharCount(0) }
      }, 500)
    }
  }

  return (
    <>
      <style>{`
        @keyframes petalFloat {
          from { transform: translateY(0px)   rotate(0deg);  }
          to   { transform: translateY(-10px) rotate(20deg); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes doneScale {
          0%   { transform: scale(0.8); opacity: 0; }
          60%  { transform: scale(1.05);            }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes heartBeat {
          0%, 100% { transform: scale(1);    }
          25%       { transform: scale(1.2);  }
          50%       { transform: scale(0.95); }
          75%       { transform: scale(1.1);  }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0);    }
          20%       { transform: translateX(-6px); }
          40%       { transform: translateX(6px);  }
          60%       { transform: translateX(-4px); }
          80%       { transform: translateX(4px);  }
        }
      `}</style>

      <section
        className="py-20 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(to bottom, rgba(253,242,248,0.4), rgba(255,251,235,0.2))" }}
      >
        <FloatingPetal x={5}  y={20} gold={false} delay={0.3}/>
        <FloatingPetal x={90} y={15} gold={true}  delay={1.1}/>
        <FloatingPetal x={8}  y={70} gold={true}  delay={0.7}/>
        <FloatingPetal x={88} y={65} gold={false} delay={1.5}/>
        <FloatingPetal x={50} y={5}  gold={false} delay={0.9}/>

        <div className="max-w-xl mx-auto relative">
          <HeartDivider />

          {/* Heading */}
          <div className="text-center mb-8" style={{ animation: "fadeSlideUp 0.8s ease forwards" }}>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-light mb-3">
              A moment for you
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
              Drop a thought, anytime.
            </h2>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Drop a favorite quote, a random thought, or a song you&apos;ve been listening to.
              <br/>I&apos;ll be reading it. 🌸
            </p>

            {/* Slot indicator dots */}
            {!loading && (
              <div className="flex items-center justify-center gap-2 mt-4">
                {[0, 1, 2].map(i => (
                  <div key={i} className="rounded-full transition-all duration-500" style={{
                    width: 8, height: 8,
                    background: i < messages.length
                      ? "linear-gradient(135deg, #f9a8d4, #fbbf24)"
                      : "rgba(249,168,212,0.2)",
                    border: "1px solid rgba(249,168,212,0.4)",
                    boxShadow: i < messages.length ? "0 0 6px rgba(249,168,212,0.5)" : "none",
                  }}/>
                ))}
                <span className="text-xs text-muted-foreground/50 font-light ml-1">
                  {messages.length}/{MAX_MESSAGES}
                </span>
              </div>
            )}
          </div>

          {/* Form / states */}
          {loading ? (
            <div className="flex justify-center py-8">
              <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="rgba(244,114,182,0.4)" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12"/>
              </svg>
            </div>

          ) : isFull && phase !== "done" ? (
            <GuestbookFull />

          ) : phase === "done" ? (
            <div
              className="text-center py-12"
              style={{ animation: "doneScale 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
            >
              <div style={{ animation: "heartBeat 1s ease 0.3s" }} className="inline-block mb-5">
                <svg width="48" height="42" viewBox="0 0 24 22" fill="none">
                  <defs>
                    <radialGradient id="doneHeart" cx="50%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#fce7f3"/>
                      <stop offset="100%" stopColor="#f9a8d4"/>
                    </radialGradient>
                  </defs>
                  <path d="M12 20 C12 20 2 13 2 7 C2 4.2 4.2 2 7 2 C8.8 2 10.3 2.9 12 5 C13.7 2.9 15.2 2 17 2 C19.8 2 22 4.2 22 7 C22 13 12 20 12 20Z"
                    fill="url(#doneHeart)"/>
                </svg>
              </div>
              <p className="font-serif text-2xl text-foreground mb-2">
                Thank you, Pricilia.
              </p>
              <p className="text-sm text-muted-foreground font-light">
                I hope you are happy. 🌸
              </p>
            </div>

          ) : (
            <div
              className="relative rounded-3xl p-8"
              style={{
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(249,168,212,0.25)",
                boxShadow: "0 8px 32px rgba(244,114,182,0.1), 0 2px 8px rgba(0,0,0,0.04)",
                animation: "fadeSlideUp 0.8s ease 0.2s both",
              }}
            >
              <textarea
                value={message}
                onChange={handleChange}
                placeholder="Your thoughts belong here..."
                rows={5}
                className="w-full resize-none outline-none text-base leading-relaxed font-light text-foreground/85 placeholder:text-muted-foreground/40"
                style={{ background: "transparent", border: "none", fontFamily: "inherit" }}
                disabled={phase === "submitting"}
              />

              <div className="flex items-center justify-between mt-4 pt-4" style={{
                borderTop: "1px solid rgba(249,168,212,0.2)",
              }}>
                <span className="text-xs font-light" style={{
                  color: charCount > CHAR_MAX * 0.85
                    ? "rgba(244,114,182,0.8)"
                    : "rgba(156,163,175,0.7)",
                }}>
                  {charCount}/{CHAR_MAX}
                </span>

                <button
                  onClick={handleSubmit}
                  disabled={!message.trim() || phase === "submitting"}
                  className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-light"
                  style={{
                    background: message.trim()
                      ? "linear-gradient(135deg, #f9a8d4, #fbbf24)"
                      : "rgba(249,168,212,0.2)",
                    color: message.trim() ? "white" : "rgba(244,114,182,0.5)",
                    border: "none",
                    cursor: message.trim() ? "pointer" : "default",
                    boxShadow: message.trim() ? "0 4px 12px rgba(244,114,182,0.3)" : "none",
                    transform: phase === "submitting" ? "scale(0.96)" : "scale(1)",
                    transition: "all 0.3s ease",
                    // Bigger tap target on mobile
                    minHeight: 40,
                  }}
                >
                  {phase === "submitting" ? (
                    <>
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12"/>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send
                      <svg width="12" height="10" viewBox="0 0 24 22" fill="none">
                        <path d="M12 20 C12 20 2 13 2 7 C2 4.2 4.2 2 7 2 C8.8 2 10.3 2.9 12 5 C13.7 2.9 15.2 2 17 2 C19.8 2 22 4.2 22 7 C22 13 12 20 12 20Z"
                          fill="white" opacity="0.9"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {phase === "error" && (
                <p className="text-xs text-center mt-3" style={{ color: "rgba(244,114,182,0.8)" }}>
                  Something went wrong — please try again 🌸
                </p>
              )}
            </div>
          )}

          {/* Messages list */}
          {!loading && messages.length > 0 && (
            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(244,114,182,0.25))" }}/>
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground/60 font-light whitespace-nowrap">
                  Her words
                </span>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(244,114,182,0.25))" }}/>
              </div>

              {messages.map((msg, i) => (
                <MessageCard
                  key={msg.id}
                  msg={msg}
                  index={i}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
