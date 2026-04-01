'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, ArrowRight, X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { CREATORS } from '../constants';
import { motion, Variants, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Creator {
  id: string | number;
  name: string;
  handle: string;
  quote: string;
  image: string;
  videoThumb: string;
  // Add one of these to your CREATORS constant per entry:
  // instagramUrl?: string   — links to the reel on Instagram (fallback)
  // videoUrl?: string       — direct .mp4 hosted on your CDN (best performance)
  // embedUrl?: string       — Instagram oEmbed iframe src (middle ground)
  instagramUrl?: string;
  videoUrl?: string;
  embedUrl?: string;
}

// ─── Video Modal ──────────────────────────────────────────────────────────────
function VideoModal({
  creator,
  onClose,
}: {
  creator: Creator;
  onClose: () => void;
}) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-999 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        {/* Modal card — stop propagation so clicking inside doesn't close */}
        <motion.div
          key="modal-card"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="relative w-full max-w-sm mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Video container — 9:16 aspect for short-form */}
          <div className="relative w-full aspect-9/16 rounded-3xl overflow-hidden bg-zinc-950">

            {/* ── Option A: direct .mp4 (best performance — host on CDN) ── */}
            {creator.videoUrl && (
              <video
                src={creator.videoUrl}
                className="w-full h-full object-cover"
                controls
                autoPlay
                playsInline
                // Only loads when modal opens — no preload
                preload="none"
                poster={creator.videoThumb}
              />
            )}

            {/* ── Option B: Instagram oEmbed iframe (no CDN needed) ── */}
            {!creator.videoUrl && creator.embedUrl && (
              <iframe
                src={creator.embedUrl}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen"
                allowFullScreen
                // loading="lazy" is implicit since it's only mounted on click
                title={`${creator.name} – Luvera review`}
              />
            )}

            {/* ── Option C: no video yet — show thumb + link to Instagram ── */}
            {!creator.videoUrl && !creator.embedUrl && (
              <div className="w-full h-full flex flex-col items-center justify-center gap-6 bg-zinc-900">
                <img
                  src={creator.videoThumb}
                  alt={creator.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="relative z-10 flex flex-col items-center gap-4 text-center px-8">
                  <p className="text-white/70 font-serif italic text-lg">"{creator.quote}"</p>
                  {creator.instagramUrl && (
                    <a
                      href={creator.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white text-black text-sm font-bold tracking-widest uppercase px-6 py-3 rounded-full hover:bg-purple-400 transition-colors"
                    >
                      Watch on Instagram
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Creator info strip below video */}
          <div className="flex items-center justify-between mt-4 px-1">
            <div className="flex items-center gap-3">
              <img
                src={creator.image}
                alt={creator.name}
                className="w-9 h-9 rounded-full border border-purple-500/40 object-cover"
              />
              <div>
                <p className="text-white font-bold text-sm leading-none">{creator.name}</p>
                <p className="text-purple-400 text-[10px] uppercase tracking-[0.3em] font-black mt-0.5">
                  {creator.handle}
                </p>
              </div>
            </div>
            {creator.instagramUrl && (
              <a
                href={creator.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
                title="Open on Instagram"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-zinc-700 transition-all z-10"
            aria-label="Close video"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Creator Card ─────────────────────────────────────────────────────────────
function CreatorCard({
  creator,
  variants,
  onPlay,
}: {
  creator: Creator;
  variants: Variants;
  onPlay: () => void;
}) {
  return (
    <motion.div
      variants={variants}
      onClick={onPlay}
      className="group relative overflow-hidden rounded-[2.5rem] shrink-0
                 w-[72vw] sm:w-[46vw] md:w-[28vw] lg:w-[22vw]
                 aspect-9/16 md:aspect-[3/4.5]
                 bg-zinc-900 border border-white/5 cursor-pointer snap-center"
    >
      {/* Thumbnail — this is ALL that loads until click */}
      <img
        src={creator.videoThumb}
        alt={creator.name}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-[1.5s]
                   group-hover:scale-110 opacity-70 group-hover:opacity-100
                   grayscale-[0.3] group-hover:grayscale-0"
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

      {/* Play button — fades in on hover / touch */}
      <div className="absolute inset-0 flex items-center justify-center
                      opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="w-20 h-20 bg-white/10 rounded-full
                        flex items-center justify-center border border-white/20
                        scale-75 group-hover:scale-100 transition-transform">
          <Play className="w-8 h-8 fill-white text-white ml-1" />
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-8 left-8 right-8 transition-transform duration-500 group-hover:-translate-y-2">
        <p className="text-sm italic text-gray-200 mb-6 line-clamp-3 font-serif leading-relaxed">
          "{creator.quote}"
        </p>
        <div className="flex items-center space-x-4">
          <div className="relative shrink-0">
            <img
              src={creator.image}
              className="w-10 h-10 rounded-full border-2 border-purple-500/30 object-cover"
              alt=""
              loading="lazy"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-500 rounded-full
                            border-2 border-black flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
          </div>
          <div>
            <h4 className="text-base font-bold text-white leading-none">{creator.name}</h4>
            <span className="text-[9px] text-purple-400 uppercase tracking-[0.3em] font-black mt-1 block">
              {creator.handle}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-px h-full bg-linear-to-b from-transparent via-white/10 to-transparent" />
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
const Creators: React.FC = () => {
  const [activeCreator, setActiveCreator] = useState<Creator | null>(null);
  const [activeIndex, setActiveIndex]     = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // +1 for the "See More" card
  const totalCards = CREATORS.length - 2;

  // ── Scroll → active index ──────────────────────────────────────────────────
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Each card occupies (scrollWidth / totalCards) of the scroll range
    const cardWidth = el.scrollWidth / totalCards;
    const idx = Math.min(
      Math.round(el.scrollLeft / cardWidth),
      totalCards - 1
    );
    setActiveIndex(idx);
  }, [totalCards]);

  // ── Programmatic scroll to a snap index ───────────────────────────────────
  const scrollTo = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / totalCards;
    el.scrollTo({ left: cardWidth * idx, behavior: 'smooth' });
    setActiveIndex(idx);
  }, [totalCards]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: -40, y: 60, scale: 0.93 },
    visible: {
      opacity: 1, x: 0, y: 0, scale: 1,
      transition: { type: 'spring', stiffness: 70, damping: 15 },
    },
  };

  return (
    <>
      <section className="py-24 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-purple-500 text-sm font-bold tracking-[0.4em] uppercase">
                Trusted Voices
              </span>
              <h2 className="text-5xl md:text-8xl font-serif italic mt-2 text-white tracking-tighter">
                Skin Rituals.
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gray-500 max-w-sm text-base md:text-lg italic"
            >
              The Luvera community consists of world-class dermatologists and aesthetic visionaries.
            </motion.p>
          </div>

          {/* ── Scroll track + edge fades ──────────────────────────────────── */}
          <div className="relative">

            {/* Prev arrow — hidden on touch devices via pointer:coarse media */}
            <button
              onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20
                         hidden pointer-fine:flex
                         w-10 h-10 rounded-full bg-black/60 border border-white/10
                         items-center justify-center text-white/50
                         hover:text-white hover:border-white/30 hover:bg-black/80
                         disabled:opacity-0 disabled:pointer-events-none
                         transition-all duration-200 backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next arrow */}
            <button
              onClick={() => scrollTo(Math.min(totalCards - 1, activeIndex + 1))}
              disabled={activeIndex === totalCards - 1}
              aria-label="Next"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20
                         hidden pointer-fine:flex
                         w-10 h-10 rounded-full bg-black/60 border border-white/10
                         items-center justify-center text-white/50
                         hover:text-white hover:border-white/30 hover:bg-black/80
                         disabled:opacity-0 disabled:pointer-events-none
                         transition-all duration-200 backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Scroll track */}
            <motion.div
              ref={scrollRef}
              onScroll={handleScroll}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory
                         hide-scrollbar -mx-6 px-6"
              // Suppress scrollbar cross-browser (no-scrollbar Tailwind plugin
              // handles Webkit; these cover Firefox + IE)
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
            >
              {CREATORS.map((creator) => (
                <CreatorCard
                  key={creator.id}
                  creator={creator as Creator}
                  variants={cardVariants}
                  onPlay={() => setActiveCreator(creator as Creator)}
                />
              ))}

              {/* See More card */}
              <a 
                href='https://www.instagram.com/luvera.skincare/'
                target='_blank'
                rel="noopener noreferrer"
              >
                <motion.div
                  variants={cardVariants}
                  className="shrink-0 w-[72vw] sm:w-[46vw] md:w-[28vw] lg:w-[22vw]
                            aspect-9/16 md:aspect-[3/4.5]
                            rounded-[2.5rem] bg-zinc-900/50 border-2 border-dashed
                            border-white/10 flex flex-col items-center justify-center
                            space-y-4 snap-center group cursor-pointer
                            hover:border-purple-500/30 transition-colors"
                >
                  <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center
                                  justify-center text-purple-500 group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                  <span className="text-white font-serif italic text-2xl">See More</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">
                    Join the community
                  </span>
                </motion.div>

                {/* Trailing spacer — lets the last card fully snap without
                    being obscured by the right fade overlay */}
                <div className="shrink-0 w-6" aria-hidden="true" />
              </a>
              
            </motion.div>

            {/* ── Dot indicators ─────────────────────────────────────────── */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {Array.from({ length: totalCards }).map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to card ${i + 1}`}
                  onClick={() => scrollTo(i)}
                  className="rounded-full transition-all duration-300 focus:outline-none"
                  style={{
                    width:      i === activeIndex ? 24 : 6,
                    height:     6,
                    background: i === activeIndex
                      ? '#a855f7'                  // emerald-500
                      : 'rgba(255,255,255,0.15)',
                  }}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Modal — only mounts when a creator is selected */}
      {activeCreator && (
        <VideoModal
          creator={activeCreator}
          onClose={() => setActiveCreator(null)}
        />
      )}
    </>
  );
};

export default Creators;