'use client'

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import Image from 'next/image'
import BenefitCards from '@/components/BenefitCards'
import { BENEFITS } from '@/constants'

export default function Benefits() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
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

        {/* Mobile-only: lifestyle image between header and cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="block lg:hidden mb-10 rounded-2xl overflow-hidden"
          style={{ aspectRatio: '4 / 3' }}
        >
          <Image
            src="/benefits/dark-flexing-guy.jpg" // ← replace with your image
            alt="Luvera lifestyle"
            fill={false}
            width={800}
            height={600}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Desktop: image left, cards right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: lifestyle image — desktop only */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hidden lg:block relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: '1 / 1' }}   
          >
            <Image
              src="/benefits/dark-flexing-guy.jpg" // ← replace with your image
              alt="Luvera lifestyle"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </motion.div>

          {/* Right: benefit cards */}
          <div className="flex justify-center lg:justify-start">
            <BenefitCards
              benefits={BENEFITS}
              isMobile={isMobile}
              className="w-full"
            />
          </div>
        </div>

      </div>
    </section>
  )
}