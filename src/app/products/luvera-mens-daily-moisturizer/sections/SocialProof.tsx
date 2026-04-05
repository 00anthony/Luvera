'use client'

import React, { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const STATS = [
  { value: '4.9',   label: 'Average rating'    },
  { value: '2,300+', label: 'Verified reviews' },
  { value: '90%',   label: 'Would recommend'   },
  { value: '87%',   label: 'Repurchase rate'   },
]

const REVIEWS = [
  {
    id: 1,
    name: 'Marcus T.',
    handle: 'Verified buyer',
    rating: 5,
    date: 'March 2025',
    text: "I've tried pretty much every men's moisturizer on the market. This is the only one that actually absorbs without leaving my face looking shiny three hours later. Skin's been noticeably clearer since week two.",
    tag: 'Combination skin',
  },
  {
    id: 2,
    name: 'James R.',
    handle: 'Verified buyer',
    rating: 5,
    date: 'February 2025',
    text: "Started using it post-shave and my neck irritation basically disappeared. The face roller that came with it is genuinely useful too — I use it every morning now.",
    tag: 'Sensitive skin',
  },
  {
    id: 3,
    name: 'Daniel K.',
    handle: 'Verified buyer',
    rating: 5,
    date: 'March 2025',
    text: "My girlfriend bought it for me and I was skeptical. Three weeks in, she commented my skin looked better. That's all the review I need.",
    tag: 'First-time skincare user',
  },
  {
    id: 4,
    name: 'Alex W.',
    handle: 'Verified buyer',
    rating: 5,
    date: 'January 2025',
    text: "The trio set is insane value. The ingredient decoder alone changed how I shop for skincare. Not going back.",
    tag: 'Dry skin',
  },
  {
    id: 5,
    name: 'Ryan P.',
    handle: 'Verified buyer',
    rating: 4,
    date: 'February 2025',
    text: "Really solid daily moisturizer. Lightweight without feeling like you put nothing on. Would love a SPF version next.",
    tag: 'Oily skin',
  },
]

const RATING_BARS = [
  { stars: 5, pct: 82 },
  { stars: 4, pct: 11 },
  { stars: 3, pct: 4  },
  { stars: 2, pct: 2  },
  { stars: 1, pct: 1  },
]

function ReviewCard({ review }: { review: typeof REVIEWS[number] }) {
  return (
    <div className="shrink-0 w-[82vw] sm:w-[55vw] md:w-[38vw] lg:w-[30vw]
                    bg-zinc-900/60 border border-white/[0.07] rounded-[1.75rem] p-7
                    flex flex-col gap-5 snap-start">
      <Quote className="w-5 h-5 text-purple-500/50" />
      <p className="text-white/70 text-sm leading-relaxed flex-1 font-serif italic">
        "{review.text}"
      </p>
      <div>
        <div className="flex items-center gap-0.5 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < review.rating ? 'fill-purple-500 text-purple-500' : 'fill-white/10 text-white/10'
              }`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-bold text-sm">{review.name}</p>
            <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold mt-0.5">
              {review.handle}
            </p>
          </div>
          <span className="text-[10px] text-purple-500/70 border border-purple-500/20
                           bg-purple-500/5 px-2.5 py-1 rounded-full font-bold tracking-wide">
            {review.tag}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function SocialProof() {
  const scrollRef   = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const total = REVIEWS.length

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setActive(Math.min(Math.round(el.scrollLeft / (el.scrollWidth / total)), total - 1))
  }, [total])

  const scrollTo = useCallback((i: number) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: (el.scrollWidth / total) * i, behavior: 'smooth' })
    setActive(i)
  }, [total])

  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-purple-500 text-sm font-bold tracking-[0.4em] uppercase">
              Real Results
            </span>
            <h2 className="text-5xl md:text-7xl font-serif italic mt-2 text-white tracking-tighter">
              2,300 men<br />can't be wrong.
            </h2>
          </motion.div>

          {/* Rating breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-2 min-w-55"
          >
            {RATING_BARS.map(({ stars, pct }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-white/30 text-xs w-4 text-right">{stars}</span>
                <Star className="w-3 h-3 fill-purple-500 text-purple-500 shrink-0" />
                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 * (6 - stars) }}
                    className="h-full bg-purple-500 rounded-full"
                  />
                </div>
                <span className="text-white/30 text-xs w-8">{pct}%</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12"
        >
          {STATS.map(({ value, label }) => (
            <div key={label}
              className="bg-white/0.03 border border-white/0.06 rounded-2xl
                         px-6 py-5 text-center">
              <p className="text-white text-2xl font-black tracking-tight">{value}</p>
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] font-bold mt-1">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Review scroll track */}
        <div className="relative">
          <div className="absolute -left-10 inset-y-0 w-10 bg-linear-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute -right-10 inset-y-0 w-16 bg-linear-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory -mx-6 px-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
          >
            {REVIEWS.map(r => <ReviewCard key={r.id} review={r} />)}
            <div className="shrink-0 w-6" aria-hidden />
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to review ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width:      i === active ? 24 : 6,
                  height:     6,
                  background: i === active ? '#C084FC' : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}