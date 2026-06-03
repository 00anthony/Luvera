'use client'
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import Image from 'next/image'
import { Instagram } from 'lucide-react'

const CART_URL = 'https://checkout.useluvera.com/cart'

const NAV_LINKS = [
  { href: '/',          label: 'Home'      },
  { href: '/products/luvera-mens-daily-moisturizer',          label: 'Shop'      },
  { href: '/products/luvera-mens-daily-moisturizer#science',  label: 'Science'   },
  { href: '/products/luvera-mens-daily-moisturizer#story',    label: 'Story'     },
]

// ─── Mobile overlay ───────────────────────────────────────────────────────────
// Rendered via a portal directly into <body> so it is never trapped inside the
// <nav> stacking context — that's what caused the positional shift on scroll.
function MobileMenu({ onClose }: { onClose: () => void }) {
  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const overlay = (
    <div
      className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center"
      style={{ zIndex: 998 }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close menu"
        className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
      >
        <X className="w-7 h-7" />
      </button>

      {/* Links */}
      <nav className="flex flex-col items-center gap-10">
        {NAV_LINKS.map(({ href, label }) => (
          <a
            key={label}
            href={href}
            onClick={onClose}
            className="text-3xl font-serif italic text-white hover:text-purple-400 transition-colors"
          >
            {label}
          </a>
        ))}

        <a
          href={CART_URL}
          onClick={onClose}
          className="mt-4 px-12 py-4 bg-white text-black font-black uppercase
                     tracking-[0.2em] text-sm hover:bg-purple-400 transition-colors"
        >
          Buy Now
        </a>

        <div className="flex space-x-4">
          <a 
            href='https://www.instagram.com/luvera.skincare/'
            target='_blank'
            rel="noopener noreferrer"
            aria-label='instagram'
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-purple-500 hover:text-purple-400 transition-all"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a 
            href="https://www.tiktok.com/@luveraskincare"
            target='_blank'
            rel='noopener noreferrer' 
            className="bottom-1 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group hover:border-purple-500 group-hover:text-purple-400 transition-all"
          >
            <svg viewBox="0 0 24 24" fill='white' className='w-4 h-4 group-hover:fill-purple-400' xmlns="http://www.w3.org/2000/svg"><title>TikTok</title><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
          </a>
          
        </div>
      </nav>

      {/* Subtle bottom wordmark */}
      <p className="absolute bottom-10 text-white/10 text-xs tracking-[0.4em] uppercase font-bold">
        Luvera · Skincare
      </p>
    </div>
  )

  // Portal escapes the nav's stacking context entirely
  return createPortal(overlay, document.body)
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar: React.FC = () => {
  const [isScrolled,     setIsScrolled]     = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted,        setMounted]        = useState(false)

  // Need to be mounted before rendering portal
  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 transition-all duration-700 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl py-4 border-b border-white/10'
            : 'bg-transparent py-8 border-b border-transparent'
        }`}
        style={{ zIndex: 997 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

          {/* Left: desktop nav links */}
          <div className="hidden md:flex space-x-10">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className="text-[10px] font-bold tracking-[0.3em] uppercase
                           text-white/70 hover:text-purple-400 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Left: mobile hamburger */}
          <button
            className="md:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Center: logo */}
          <a
            href="/"
            className="absolute left-1/2 -translate-x-1/2"
            aria-label="Luvera home"
          >
            <Image
              src="/logo-white.webp"
              alt="Luvera logo"
              width={155}
              height={72}
              className="max-h-18 w-auto object-contain"
            />
          </a>

          {/* Right: cart icon */}
          <a
            href={CART_URL}
            aria-label="View cart"
            className="relative group"
          >
            <ShoppingBag className="w-4 h-4 text-white/70 group-hover:text-purple-400 transition-colors" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full" />
          </a>

        </div>
      </nav>

      {/* Portal overlay — only rendered client-side after mount */}
      {mounted && mobileMenuOpen && (
        <MobileMenu onClose={() => setMobileMenuOpen(false)} />
      )}
    </>
  )
}

export default Navbar