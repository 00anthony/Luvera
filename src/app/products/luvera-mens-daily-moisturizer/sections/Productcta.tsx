'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Shield, Truck, RotateCcw, Star } from 'lucide-react'
import { VARIANTS, type VariantId } from '../constants'
import { useCheckout } from '../hooks/Usecheckout'

export default function ProductCTA() {
  const [activeVariant, setActiveVariant] = useState<VariantId>('trio')
  const { loading, error, checkout }      = useCheckout()
  const variant = VARIANTS.find(v => v.id === activeVariant)!

  return (
    <section className="py-28 bg-black relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px]
                      bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px]
                      bg-purple-400/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">

        {/* Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-purple-500 text-purple-500" />
            ))}
          </div>
          <span className="text-white/40 text-sm">4.9 · 2,300+ reviews</span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h2 className="text-5xl md:text-7xl font-serif italic text-white tracking-tighter leading-[1.05] mb-6">
            Your skin.<br />Thirty days.<br />You'll see it.
          </h2>
          <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-lg mx-auto mb-12">
            Try Luvera risk-free. If you're not genuinely happy with how your skin looks
            and feels after 90 days, we'll give you every penny back. No questions.
          </p>
        </motion.div>

        {/* Variant selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-left"
        >
          {VARIANTS.map(v => (
            <button
              key={v.id}
              onClick={() => setActiveVariant(v.id)}
              className={`relative rounded-2xl border-2 p-5 transition-all duration-200 ${
                activeVariant === v.id
                  ? 'border-purple-500 bg-purple-500/5'
                  : 'border-white/8 bg-white/[0.02] hover:border-white/20'
              }`}
            >
              {v.badge && (
                <span className="absolute -top-px right-4 px-3 py-1 text-[9px] font-black
                                 tracking-[0.3em] uppercase bg-purple-500 text-black">
                  {v.badge}
                </span>
              )}
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-black text-sm">{v.label}</span>
                <div className="text-right">
                  <span className="text-white font-bold">{v.price}</span>
                  {v.oldPrice && (
                    <span className="text-white/25 text-xs line-through ml-2">{v.oldPrice}</span>
                  )}
                </div>
              </div>
              <ul className="space-y-1">
                {v.perks.slice(0, 3).map(p => (
                  <li key={p} className="text-white/40 text-xs flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-purple-500/50 shrink-0" />
                    {p}
                  </li>
                ))}
                {v.perks.length > 3 && (
                  <li className="text-purple-500/50 text-xs pl-3">
                    +{v.perks.length - 3} more included
                  </li>
                )}
              </ul>
            </button>
          ))}
        </motion.div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          <a
            href={variant.checkoutUrl}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-full
                       bg-white text-black font-black text-sm tracking-[0.15em] uppercase
                       hover:bg-purple-400 transition-colors duration-300"
          >
            Get Started — {variant.price}
            <ChevronRight className="w-4 h-4" />
          </a>
          <p className="text-white/25 text-xs tracking-wider text-center">
            Secure checkout via Shopify
          </p>
 
          {/* Trust row */}
          <div className="flex items-center justify-center gap-6 pt-4">
            {[
              { icon: Truck,      label: 'Free shipping'     },
              { icon: RotateCcw,  label: '90-day guarantee'  },
              { icon: Shield,     label: 'Secure checkout'   },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-white/30">
                <Icon className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}