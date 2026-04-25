'use client'
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import Link from 'next/link'

const CART_URL = 'https://checkout.useluvera.com/cart'

const NAV_LINKS = [
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
      className="fixed inset-0 bg-black flex flex-col items-center justify-center"
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
            <img
              src="/logo-white.webp"
              alt="Luvera logo"
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