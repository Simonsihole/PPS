import { Heart, Sparkles } from "lucide-react"
import { FlowerGarden } from "./FlowerGarden"

export function Footer() {
  return (
    <footer className="bg-secondary/20">
      {/* 🌸 Flower growing animation — appears when user scrolls here */}
      <FlowerGarden />

      <div className="py-16 px-6 max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-4 h-4 text-primary/50" />
          <Heart className="w-6 h-6 text-primary fill-primary/30" />
          <Sparkles className="w-4 h-4 text-primary/50" />
        </div>

        <p className="font-serif text-2xl md:text-3xl text-foreground mb-4 text-balance">
          {"\"Never let your smile fade.\""}
        </p>

        <p className="text-sm text-muted-foreground font-light">
          For Pricilia, with all my heart
        </p>
      </div>
    </footer>
  )
}
