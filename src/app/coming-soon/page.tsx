'use client';

import React, { useState, useEffect, useRef } from 'react';

const ComingSoon: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Stagger mount for entrance animations
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = () => {
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        

        .cs-root {
          min-height: 100svh;
          background: #000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          padding: 2rem;
        }

        /* Ambient glow */
        .cs-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          translate: -50% -50%;
          width: 70vw;
          height: 70vw;
          max-width: 800px;
          max-height: 800px;
          background: radial-gradient(ellipse, rgba(109,40,217,0.12) 0%, transparent 70%);
          pointer-events: none;
          border-radius: 50%;
        }

        /* Noise grain overlay */
        .cs-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        /* Horizontal rule lines top/bottom */
        .cs-rule {
          position: absolute;
          left: 2rem;
          right: 2rem;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent);
        }
        .cs-rule-top { top: 5rem; }
        .cs-rule-bottom { bottom: 5rem; }

        /* Corner marks */
        .cs-corner {
          position: absolute;
          width: 18px;
          height: 18px;
          opacity: 0.2;
        }
        .cs-corner::before,
        .cs-corner::after {
          content: '';
          position: absolute;
          background: rgba(255,255,255,0.6);
        }
        .cs-corner::before { width: 1px; height: 100%; }
        .cs-corner::after  { width: 100%; height: 1px; }
        .cs-corner.tl { top: 1.5rem; left: 1.5rem; }
        .cs-corner.tr { top: 1.5rem; right: 1.5rem; transform: scaleX(-1); }
        .cs-corner.bl { bottom: 1.5rem; left: 1.5rem; transform: scaleY(-1); }
        .cs-corner.br { bottom: 1.5rem; right: 1.5rem; transform: scale(-1); }

        /* Scroll line animation */
        @keyframes scrollLine {
          0%   { transform: translateY(100%); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(-100%); opacity: 0; }
        }

        /* Entrance animations */
        .cs-fade-up {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .cs-fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.25s; }
        .delay-3 { transition-delay: 0.4s; }
        .delay-4 { transition-delay: 0.55s; }
        .delay-5 { transition-delay: 0.7s; }

        .cs-wordmark {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(72px, 18vw, 180px);
          font-weight: 300;
          letter-spacing: -0.02em;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.15);
          user-select: none;
          pointer-events: none;
          position: absolute;
          white-space: nowrap;
        }

        .cs-label {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }

        .cs-headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(42px, 8vw, 80px);
          line-height: 1.0;
          color: #f0ece6;
          letter-spacing: -0.01em;
          text-align: center;
        }

        .cs-headline em {
          font-style: italic;
          color: rgba(240,236,230,0.55);
        }

        .cs-body {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(15px, 2vw, 18px);
          font-style: italic;
          font-weight: 300;
          color: rgba(240,236,230,0.45);
          line-height: 1.7;
          text-align: center;
          max-width: 420px;
        }

        /* Glass input pill */
        .cs-input-wrap {
          display: flex;
          align-items: center;
          gap: 0;
          background: rgba(255,255,255,0.04);
          border: 0.5px solid rgba(255,255,255,0.12);
          border-radius: 9999px;
          padding: 6px 6px 6px 20px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          width: 100%;
          max-width: 380px;
          transition: border-color 0.3s;
        }
        .cs-input-wrap:focus-within {
          border-color: rgba(139,92,246,0.45);
          box-shadow: 0 0 24px rgba(139,92,246,0.1);
        }
        .cs-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'Tenor Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.7);
          min-width: 0;
        }
        .cs-input::placeholder {
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.2em;
        }
        .cs-btn {
          background: #fff;
          color: #000;
          border: none;
          border-radius: 9999px;
          padding: 10px 20px;
          font-family: 'Tenor Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-weight: 400;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.25s, color 0.25s;
          flex-shrink: 0;
        }
        .cs-btn:hover {
          background: rgb(167,139,250);
          color: #fff;
        }

        /* Divider */
        .cs-divider {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.15), transparent);
          margin: 0 auto;
        }

        /* Success state */
        .cs-success {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          font-style: italic;
          color: rgba(167,139,250,0.8);
          letter-spacing: 0.05em;
          text-align: center;
        }

        /* Bottom nav link */
        .cs-nav-link {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 8px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          text-decoration: none;
          transition: color 0.2s;
        }
        .cs-nav-link:hover { color: rgba(255,255,255,0.6); }
      `}</style>

      <div className="cs-root" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
        {/* Atmosphere */}
        <div className="cs-glow" />
        <div className="cs-grain" />
        <div className="cs-rule cs-rule-top" />
        <div className="cs-rule cs-rule-bottom" />
        <div className="cs-corner tl" />
        <div className="cs-corner tr" />
        <div className="cs-corner bl" />
        <div className="cs-corner br" />

        <div className="hero-bg-text absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-40">
          <span className="text-[25vw] font-serif font-black tracking-tight md:tracking-tighter text-zinc-700 leading-none whitespace-nowrap">
            LUVERA
          </span>
        </div>

        {/* Main content */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>

          {/* Logo / brand label */}
          <div className={`cs-fade-up delay-1 ${mounted ? 'visible' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            {/* Scroll line */}
            <div style={{ width: '1px', height: '28px', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent)',
                animation: 'scrollLine 1.6s ease-in-out infinite',
              }} />
            </div>
            <span className="cs-label">Luvéra Skincare</span>
          </div>

          {/* Headline */}
          <div className={`cs-fade-up delay-2 ${mounted ? 'visible' : ''}`}>
            <h1 className="cs-headline">
              Something<br /><em>beautiful</em> is coming.
            </h1>
          </div>

          {/* Divider */}
          <div className={`cs-fade-up delay-3 ${mounted ? '' : ''}`}>
            <div className="cs-divider" />
          </div>

          {/* Body copy */}
          <div className={`cs-fade-up delay-3 ${mounted ? 'visible' : ''}`}>
            <p className="cs-body">
              A new chapter in men's skincare is almost here.
              Check back to see what's in store.
            </p>
          </div>

          {/* Email capture */}
          {/*
            <div className={`cs-fade-up delay-4 ${mounted ? 'visible' : ''}`} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              {!submitted ? (
                <div className="cs-input-wrap">
                  <input
                    ref={inputRef}
                    className="cs-input"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  />
                  <button className="cs-btn" onClick={handleSubmit}>
                    Notify me
                  </button>
                </div>
              ) : (
                <p className="cs-success">
                  You're on the list — we'll be in touch.
                </p>
              )}
            </div>
          */}

          {/* Bottom links */}
          <div className={`cs-fade-up delay-5 ${mounted ? 'visible' : ''}`} style={{ display: 'flex', gap: '32px', marginTop: '8px' }}>
            <a href="https://www.instagram.com/luvera.skincare/" target="_blank" rel="noopener noreferrer" className="cs-nav-link">
              Instagram
            </a>
            <span className="cs-label" style={{ opacity: 0.2 }}>·</span>
            <a href="/products/luvera-mens-daily-moisturizer" className="cs-nav-link">
              Shop
            </a>
            <span className="cs-label" style={{ opacity: 0.2 }}>·</span>
            <a href="mailto:luveraskincare@gmail.com" className="cs-nav-link">
              Contact
            </a>
          </div>

        </div>
      </div>
    </>
  );
};

export default ComingSoon;