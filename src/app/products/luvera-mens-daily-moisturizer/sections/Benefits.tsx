'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Shield, Droplets, Wind, Sun, Leaf } from 'lucide-react'

const BENEFITS = [
  {
    icon:  Droplets,
    title: 'Deep hydration',
    body:  'Binds moisture to skin cells for all-day hydration without reapplying. No tight, dry feeling by midday.',
    accent: 'text-purple-500',
    bg:     'bg-purple-500/8',
    border: 'border-purple-500/15',
  },
  {
    icon:  Zap,
    title: 'Fast-absorbing',
    body:  'Gone in seconds — not sitting on your skin. Works as a base under SPF or worn alone.',
    accent: 'text-purple-400',
    bg:     'bg-purple-400/8',
    border: 'border-purple-400/15',
  },
  {
    icon:  Shield,
    title: 'Barrier support',
    body:  'Reinforces your skin\'s natural barrier so environmental stress — wind, cold, pollution — does less damage.',
    accent: 'text-purple-500',
    bg:     'bg-purple-500/8',
    border: 'border-purple-500/15',
  },
  {
    icon:  Wind,
    title: 'Post-shave calm',
    body:  'Designed to go on straight after shaving. Instantly reduces redness and razor burn without stinging.',
    accent: 'text-purple-400',
    bg:     'bg-purple-400/8',
    border: 'border-purple-400/15',
  },
  {
    icon:  Leaf,
    title: 'No grease',
    body:  'Lightweight formula won\'t clog pores or leave a film. Built for men who hate the feeling of moisturizer.',
    accent: 'text-purple-500',
    bg:     'bg-purple-500/8',
    border: 'border-purple-500/15',
  },
  {
    icon:  Sun,
    title: 'Morning-ready',
    body:  'One step, 30 seconds. Fits in your existing routine without adding complexity or a new shelf.',
    accent: 'text-purple-400',
    bg:     'bg-purple-400/8',
    border: 'border-purple-400/15',
  },
]

const cardVariants = {
  hidden:   { opacity: 0, y: 40 },
  visible:  { opacity: 1, y: 0  },
}

export default function Benefits() {
  return (
    <section className="py-24 bg-black">
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
              Why it works
            </span>
            <h2 className="text-5xl md:text-7xl font-serif italic mt-2 text-white tracking-tighter">
              Built for men<br />who do things.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/40 max-w-xs text-sm md:text-base italic leading-relaxed"
          >
            No complicated routines. No ten-step systems. Just skin that looks and feels better.
          </motion.p>
        </div>

        {/* Benefits grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {BENEFITS.map(({ icon: Icon, title, body, accent, bg, border }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className={`group relative rounded-[1.75rem] border ${border} ${bg}
                          p-8 flex flex-col gap-5 hover:border-opacity-50 transition-all duration-300`}
            >
              <div className={`w-11 h-11 rounded-xl border ${border} flex items-center
                               justify-center ${accent} transition-transform duration-300
                               group-hover:scale-110`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-black text-lg tracking-tight mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{body}</p>
              </div>

              {/* Subtle corner accent */}
              <div className={`absolute top-0 right-0 w-px h-1/2 bg-gradient-to-b ${
                accent.includes('purple') ? 'from-purple-500/20' : 'from-purple-400/20'
              } to-transparent`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}