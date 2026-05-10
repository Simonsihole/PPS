import { HeroSection } from "@/components/hero-section"
import { StorySection } from "@/components/story-section"
import { DayOutSection } from "@/components/day-out-section"
import { ReflectionSection } from "@/components/reflection-section"
import { ClosingSection } from "@/components/closing-section"
import { Footer } from "@/components/footer"
import { AudioPlayer } from "@/components/audio-player"
import { CuteDecorations } from "@/components/cute-decorations"
import { ReplySection } from "@/components/ReplySection"

export default function TributePage() {
  return (
    <main className="min-h-screen bg-background">
      <CuteDecorations />
      <AudioPlayer />
      <HeroSection />
      <StorySection />
      <DayOutSection />
      <ReflectionSection />
      <ClosingSection />
      <ReplySection />
      <Footer />
    </main>
  )
}
