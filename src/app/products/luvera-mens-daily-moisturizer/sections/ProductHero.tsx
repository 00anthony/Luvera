'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Shield, Truck, RotateCcw, Star } from 'lucide-react'
import { VARIANTS, type VariantId } from '../constants'
import { useCheckout } from '../hooks/Usecheckout'

// ─── Placeholder media slides ─────────────────────────────────────────────────
// Replace src values with your actual product images/videos.
const MEDIA = [
  { type: 'image', src: '/product/Science-BackedHydration_700x700.webp',   alt: 'Luvera moisturizer front'      },
  { type: 'image', src: '/images/product-hero-2.jpg',   alt: 'Luvera moisturizer texture'    },
  { type: 'image', src: '/images/product-hero-3.jpg',   alt: 'Luvera moisturizer lifestyle'  },
  { type: 'video', src: '/videos/product-demo.mp4',     alt: 'See it in action'              },
  { type: 'image', src: '/images/product-hero-4.jpg',   alt: 'Trio set contents'             },
] as const

const TRUST_BADGES = [
  { icon: Truck,      label: 'Free shipping'       },
  { icon: RotateCcw,  label: '90-day guarantee'    },
  { icon: Shield,     label: 'Dermatologist tested' },
]

export default function ProductHero() {
  const [activeMedia,   setActiveMedia]   = useState(0)
  const [activeVariant, setActiveVariant] = useState<VariantId>('trio')
  const [videoPlaying,  setVideoPlaying]  = useState(false)
  const { loading, error, checkout }      = useCheckout()

  const current  = MEDIA[activeMedia]
  const variant  = VARIANTS.find(v => v.id === activeVariant)!

  const prev = () => setActiveMedia(i => (i - 1 + MEDIA.length) % MEDIA.length)
  const next = () => setActiveMedia(i => (i + 1) % MEDIA.length)

  return (
    <section className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-2 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── LEFT: Media gallery ─────────────────────────────────────── */}
          <div className="lg:sticky lg:top-24 space-y-4">

            {/* Main media frame */}
            <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMedia}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  {current.type === 'video' ? (
                    <>
                      <video
                        src={current.src}
                        className="w-full h-full object-cover"
                        playsInline
                        muted={!videoPlaying}
                        autoPlay={videoPlaying}
                        loop
                        poster="/images/product-video-thumb.jpg"
                      />
                      {!videoPlaying && (
                        <button
                          onClick={() => setVideoPlaying(true)}
                          className="absolute inset-0 flex items-center justify-center group"
                        >
                          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl
                                          border border-white/20 flex items-center justify-center
                                          scale-90 group-hover:scale-100 transition-transform duration-300">
                            <Play className="w-8 h-8 fill-white text-white ml-1" />
                          </div>
                        </button>
                      )}
                    </>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={current.src}
                      alt={current.alt}
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next arrows */}
              <button onClick={prev} aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
                           bg-black/50 backdrop-blur-sm border border-white/10
                           flex items-center justify-center text-white/60
                           hover:text-white hover:border-white/30 transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={next} aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
                           bg-black/50 backdrop-blur-sm border border-white/10
                           flex items-center justify-center text-white/60
                           hover:text-white hover:border-white/30 transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Slide counter */}
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60
                              backdrop-blur-sm border border-white/10 text-white/50
                              text-[10px] tracking-widest font-bold">
                {activeMedia + 1} / {MEDIA.length}
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-3">
              {MEDIA.map((m, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveMedia(i); setVideoPlaying(false) }}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 shrink-0 ${
                    i === activeMedia
                      ? 'border-purple-500 opacity-100'
                      : 'border-white/10 opacity-50 hover:opacity-80'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.type === 'video' ? '/images/product-video-thumb.jpg' : m.src}
                    alt={m.alt}
                    className="w-full h-full object-cover"
                  />
                  {m.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="w-3 h-3 fill-white text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Product info + variant selector ───────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-8"
          >
            {/* Rating strip */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-purple-500 text-purple-500" />
                ))}
              </div>
              <span className="text-white/50 text-sm">4.9 · 2,300+ reviews</span>
            </div>

            {/* Title */}
            <div>
              <span className="text-purple-500 text-xs font-bold tracking-[0.4em] uppercase">
                Luvera Skincare
              </span>
              <h1 className="text-4xl md:text-5xl font-serif italic text-white tracking-tight mt-2 leading-[1.1]">
                Men's Daily<br />Moisturizer.
              </h1>
              <p className="text-white/50 mt-4 text-base leading-relaxed max-w-md">
                Lightweight, fast-absorbing hydration that calms irritation and strengthens your
                skin barrier — without the grease.
              </p>
            </div>

            {/* ── Variant selector ─────────────────────────────────────── */}
            <div className="space-y-3">
              <p className="text-white/40 text-xs uppercase tracking-[0.3em] font-bold">Choose your set</p>
              <div className="grid grid-cols-1 gap-3">
                {VARIANTS.map(v => (
                  <button
                    key={v.id}
                    onClick={() => setActiveVariant(v.id)}
                    className={`relative w-full text-left rounded-2xl border-2 p-5 transition-all duration-200 ${
                      activeVariant === v.id
                        ? 'border-purple-500 bg-purple-500/5'
                        : 'border-white/8 bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
                    {v.badge && (
                      <span className="absolute -top-px right-5 px-3 py-1 text-[9px] font-black
                                       tracking-[0.3em] uppercase bg-purple-500 text-black">
                        {v.badge}
                      </span>
                    )}

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          {/* Radio dot */}
                          <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0
                                           transition-colors duration-200 ${
                                             activeVariant === v.id
                                               ? 'border-purple-500'
                                               : 'border-white/20'
                                           }`}>
                            {activeVariant === v.id && (
                              <span className="w-2 h-2 rounded-full bg-purple-500 block" />
                            )}
                          </span>
                          <span className="text-white font-bold text-base">{v.label}</span>
                        </div>

                        <ul className="space-y-1.5">
                          {v.perks.map(p => (
                            <li key={p} className="flex items-center gap-2 text-sm text-white/50">
                              <span className="w-1 h-1 rounded-full bg-purple-500/60 shrink-0" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-white font-bold text-xl">{v.price}</p>
                        {v.oldPrice && (
                          <p className="text-white/30 text-sm line-through mt-0.5">{v.oldPrice}</p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ── CTA — direct Shopify cart URL, no API needed ─────────── */}
            <div className="space-y-3">
              <a
                href={variant.checkoutUrl}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-full
                           bg-white text-black font-black text-sm tracking-[0.15em] uppercase
                           hover:bg-purple-400 transition-colors duration-300"
              >
                Buy Now — {variant.price}
                <ChevronRight className="w-4 h-4" />
              </a>
              <p className="text-center text-white/30 text-xs tracking-wider">
                Secure checkout via Shopify · Free shipping · 90-day guarantee
              </p>
            </div>

            {/* ── Trust badges ─────────────────────────────────────────── */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <div key={label}
                  className="flex flex-col items-center gap-2 rounded-xl bg-white/[0.03]
                             border border-white/5 py-4 px-2 text-center">
                  <Icon className="w-4 h-4 text-purple-500" />
                  <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}