'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, CheckCircle2, XCircle } from 'lucide-react'

const KEY_INGREDIENTS = [
  {
    name:    'Aloe Vera Extract',
    role:    'Soothing & hydration base',
    detail:  'A time-tested botanical that delivers rapid moisture and calms inflamed or irritated skin. Particularly effective at reducing post-shave redness and razor burn.',
  },
  {
    name:    'Hyaluronic Acid',
    role:    'Deep moisture binding',
    detail:  'Draws water from the environment and locks it into your skin cells. Can hold up to 1,000× its weight in moisture, keeping skin plump and hydrated throughout the day.',
  },
  {
    name:    'Niacinamide (Vitamin B3)',
    role:    'Barrier repair & tone',
    detail:  'Strengthens the skin barrier, reduces the appearance of pores, and helps even out skin tone over time. One of the most well-researched ingredients in modern skincare.',
  },
  {
    name:    'Glycerin',
    role:    'Humectant & softener',
    detail:  'A gentle humectant that pulls moisture into the outer skin layer and creates a soft, supple texture — without feeling heavy or occlusive.',
  },
  {
    name:    'Panthenol (Pro-Vitamin B5)',
    role:    'Healing & smoothing',
    detail:  'Penetrates deeply to support skin healing and reduce surface roughness. Especially useful for skin stressed by daily shaving.',
  },
  {
    name:    'Ceramide Complex',
    role:    'Barrier reinforcement',
    detail:  'Ceramides are the natural "mortar" between your skin cells. This complex replenishes what environmental stress and aging break down, keeping your skin resilient.',
  },
]

const CLEAN_LIST  = ['Fragrance-free', 'Paraben-free', 'Silicone-free', 'Alcohol-free', 'Cruelty-free', 'Dermatologist tested']
const NO_GO_LIST  = ['Synthetic fragrance', 'Parabens', 'Sulfates', 'Phthalates', 'Mineral oil', 'Artificial dyes']

function IngredientRow({ item, isOpen, onToggle }: {
  item: typeof KEY_INGREDIENTS[number]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-5 text-left group"
      >
        <div className="flex items-center gap-4">
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200 ${
            isOpen ? 'bg-purple-500' : 'bg-white/20'
          }`} />
          <div>
            <span className={`font-bold text-sm md:text-base transition-colors duration-200 ${
              isOpen ? 'text-white' : 'text-white/70 group-hover:text-white'
            }`}>
              {item.name}
            </span>
            <span className="hidden md:inline text-white/30 text-sm ml-3 font-normal">
              {item.role}
            </span>
          </div>
        </div>
        <span
          className="shrink-0 w-7 h-7 rounded-full border flex items-center justify-center
                     transition-all duration-300"
          style={{
            borderColor:     isOpen ? 'rgb(52 211 153 / 0.5)' : 'rgba(255,255,255,0.1)',
            backgroundColor: isOpen ? 'rgb(52 211 153 / 0.08)' : 'transparent',
            color:           isOpen ? 'rgb(52 211 153)'        : 'rgba(255,255,255,0.3)',
            transform:       isOpen ? 'rotate(45deg)'          : 'rotate(0deg)',
          }}
        >
          <Plus className="w-3.5 h-3.5" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 pl-5 md:pl-10">
              <p className="text-white/40 text-xs uppercase tracking-[0.25em] font-bold mb-2 md:hidden">
                {item.role}
              </p>
              <p className="text-white/50 text-sm leading-relaxed max-w-2xl">{item.detail}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Ingredients() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section id="science" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-purple-500 text-sm font-bold tracking-[0.4em] uppercase">
            What's inside
          </span>
          <h2 className="text-5xl md:text-7xl font-serif italic mt-2 text-white tracking-tighter">
            Every ingredient<br />earns its place.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-20">

          {/* Ingredient accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {KEY_INGREDIENTS.map((item, i) => (
              <IngredientRow
                key={item.name}
                item={item}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(prev => prev === i ? null : i)}
              />
            ))}
          </motion.div>

          {/* Clean / no-go sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {/* What's in */}
            <div className="rounded-[1.5rem] border border-purple-500/15 bg-purple-500/5 p-6">
              <p className="text-purple-500 text-xs font-black tracking-[0.3em] uppercase mb-4">
                What's in it
              </p>
              <ul className="space-y-3">
                {CLEAN_LIST.map(item => (
                  <li key={item} className="flex items-center gap-3 text-white/70 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* What's not */}
            <div className="rounded-[1.5rem] border border-white/[0.06] bg-white/[0.02] p-6">
              <p className="text-white/30 text-xs font-black tracking-[0.3em] uppercase mb-4">
                Never in our formula
              </p>
              <ul className="space-y-3">
                {NO_GO_LIST.map(item => (
                  <li key={item} className="flex items-center gap-3 text-white/30 text-sm">
                    <XCircle className="w-4 h-4 text-white/20 shrink-0" />
                    <span className="line-through decoration-white/20">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}