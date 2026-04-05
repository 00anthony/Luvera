// app/products/luvera-mens-daily-moisturizer/page.tsx
import type { Metadata } from 'next'
import ProductHero       from './sections/ProductHero'
import SocialProof       from './sections/SocialProof'
import Benefits          from './sections/Benefits'
import Ingredients       from './sections/Ingredients'
import HowToUse          from './sections/Howtouse'
import BrandStory        from './sections/BrandStory'
import ProductCTA        from './sections/Productcta'

export const metadata: Metadata = {
  title:       "Luvera Men's Daily Moisturizer",
  description: "A lightweight daily moisturizer built for men. Deep hydration, no grease, fast-absorbing. Ships free with a 90-day money-back guarantee.",
}

export default function ProductPage() {
  return (
    <main className="bg-black min-h-screen">
      <ProductHero />
      <SocialProof />
      <Benefits />
      <Ingredients />
      <HowToUse />
      <BrandStory />
      <ProductCTA />
    </main>
  )
}