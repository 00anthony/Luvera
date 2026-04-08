'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function BrandStory() {
  return (
    <section id='story' className="py-24 bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: editorial text block */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="space-y-8"
          >
            <div>
              <span className="text-purple-500 text-sm font-bold tracking-[0.4em] uppercase">
                Our story
              </span>
              <h2 className="text-5xl md:text-6xl font-serif italic mt-2 text-white tracking-tighter leading-[1.1]">
                Built from<br />frustration.
              </h2>
            </div>

            <div className="space-y-5 text-white/50 text-base leading-relaxed">
              <p>
                Luvera started because we were tired of skincare built for everyone — which really means
                built for no one. Most moisturizers on shelves are either too heavy, too fragranced,
                or designed around a shelf-appeal aesthetic that has nothing to do with what your skin actually needs.
              </p>
              <p>
                We set out to build one product, done right. No twelve-step routine. No vague claims.
                A lightweight daily moisturizer that works for men who want their skin to look good
                without turning it into a project.
              </p>
              <p>
                Every ingredient was chosen for a reason. Everything unnecessary was cut.
                The result is Luvera Men's Daily Moisturizer — the only thing in our lineup,
                and we intend to keep it that way until we're sure we've perfected it.
              </p>
            </div>

            {/* Founder signature area */}
            <div className="flex items-center gap-4 pt-2">
              <div className="w-12 h-12 rounded-full bg-zinc-800 border border-white/10 overflow-hidden">
                {/* Replace with actual founder image */}
                <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">The Luvera Team</p>
                <p className="text-white/30 text-xs uppercase tracking-[0.2em] font-bold mt-0.5">Founders</p>
              </div>
            </div>
          </motion.div>

          {/* Right: large pull quote + accent shapes */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full
                            bg-purple-500/5 blur-[80px] pointer-events-none" />

            <div className="relative rounded-[2rem] border border-white/[0.07] bg-white/[0.02] p-10 md:p-14">
              {/* Large quote mark */}
              <span className="block font-serif text-[8rem] leading-none text-purple-500/15
                               select-none -mt-6 -ml-2">
                "
              </span>
              <blockquote className="text-white text-2xl md:text-3xl font-serif italic leading-snug tracking-tight -mt-8">
                One product.<br />One commitment.<br />Better skin for men<br />who don't overthink it.
              </blockquote>

              {/* Stat row */}
              <div className="mt-10 pt-8 border-t border-white/[0.06] grid grid-cols-3 gap-4">
                {[
                  { n: '1',    label: 'Product'       },
                  { n: '6',    label: 'Key actives'   },
                  { n: '90',   label: 'Day guarantee' },
                ].map(({ n, label }) => (
                  <div key={label} className="text-center">
                    <p className="text-white text-3xl font-black tracking-tight">{n}</p>
                    <p className="text-white/30 text-[10px] uppercase tracking-[0.25em] font-bold mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}