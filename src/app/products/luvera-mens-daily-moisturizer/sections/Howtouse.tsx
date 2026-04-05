'use client'

import React from 'react'
import { motion } from 'framer-motion'

const STEPS = [
  {
    step:   '01',
    title:  'Cleanse',
    body:   'Wash your face with a gentle cleanser and pat dry — don\'t rub. Your skin should feel clean but not tight.',
    time:   '60 sec',
    tip:    'Lukewarm water only. Hot water strips moisture.',
  },
  {
    step:   '02',
    title:  'Apply',
    body:   'Pump a pea-sized amount into your palm. Warm it between your fingers, then press gently into cheeks, forehead, nose, and chin.',
    time:   '30 sec',
    tip:    'Less is more — a little goes a long way.',
  },
  {
    step:   '03',
    title:  'Blend',
    body:   'Use upward strokes to distribute evenly. The formula absorbs in 20–30 seconds. No rubbing, no residue.',
    time:   '30 sec',
    tip:    'Don\'t forget your neck and jaw.',
  },
  {
    step:   '04',
    title:  'Roll (optional)',
    body:   'Use the Cooling Face Roller along your jawline, cheeks, and under-eyes to de-puff and boost absorption.',
    time:   '60 sec',
    tip:    'Store your roller in the fridge for extra effect.',
  },
]

export default function HowToUse() {
  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-purple-400 text-sm font-bold tracking-[0.4em] uppercase">
              The routine
            </span>
            <h2 className="text-5xl md:text-7xl font-serif italic mt-2 text-white tracking-tighter">
              Simple. Fast.<br />Every morning.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/40 max-w-xs text-sm md:text-base italic leading-relaxed"
          >
            Total time: under 3 minutes. Results: long-term.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector line — desktop only */}
          <div className="hidden lg:block absolute left-[2.15rem] top-10 bottom-10 w-px bg-gradient-to-b from-purple-400/30 via-purple-500/20 to-transparent" />

          <div className="space-y-6">
            {STEPS.map(({ step, title, body, time, tip }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-6 lg:gap-10 group"
              >
                {/* Step number node */}
                <div className="shrink-0 flex flex-col items-center gap-2">
                  <div className="w-[4.3rem] h-[4.3rem] rounded-full border-2 border-purple-400/30
                                  bg-purple-400/5 flex items-center justify-center
                                  group-hover:border-purple-400/60 group-hover:bg-purple-400/10
                                  transition-all duration-300 z-10">
                    <span className="text-purple-400 font-black text-sm tracking-wide">{step}</span>
                  </div>
                </div>

                {/* Content card */}
                <div className="flex-1 rounded-[1.5rem] border border-white/[0.06] bg-white/[0.02]
                                hover:border-white/10 hover:bg-white/[0.04]
                                transition-all duration-300 p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-white font-black text-xl tracking-tight">{title}</h3>
                    <span className="shrink-0 text-[10px] text-purple-500 border border-purple-500/25
                                     bg-purple-500/5 px-2.5 py-1 rounded-full font-bold tracking-wider">
                      {time}
                    </span>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{body}</p>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-purple-400/60 shrink-0" />
                    <p className="text-purple-400/60 text-xs italic">{tip}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pro tip strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 rounded-2xl border border-purple-400/15 bg-purple-400/5 px-8 py-6
                     flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <div className="shrink-0 w-10 h-10 rounded-xl bg-purple-400/10 border border-purple-400/20
                          flex items-center justify-center text-purple-400 font-black text-xs">
            PRO
          </div>
          <p className="text-white/50 text-sm leading-relaxed">
            <span className="text-white font-medium">Consistency beats intensity.</span>{' '}
            Using Luvera once a day for 30 days delivers better results than sporadic heavy application.
            Make it part of your morning — brush teeth, wash face, moisturize. Done.
          </p>
        </motion.div>
      </div>
    </section>
  )
}