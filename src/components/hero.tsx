"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface Slide {
  id: number;
  image: string;
  alt: string;
  eyebrow: string;
  headline: string;
  cta: string;
  ctaHref: string;
}

const slides: Slide[] = [
  {
    id: 0,
    image: "/hero2/tub-on-table.JPG",
    alt: "Woman with radiant skin in natural light",
    eyebrow: "Your skin. Elevated.",
    headline: "Science that\nfeels like luxury.",
    cta: "Explore The Collection",
    ctaHref: "/shop",
  },
  {
    id: 1,
    image: "/hero2/asian.png",
    alt: "Close-up of glowing skin with Luvera products",
    eyebrow: "Clinically proven.",
    headline: "Visible results\nin 14 days.",
    cta: "See The Science",
    ctaHref: "/science",
  },
  {
    id: 2,
    image: "/hero2/corvette.png",
    alt: "Luvera lifestyle — confident, radiant living",
    eyebrow: "Live luminously.",
    headline: "Skincare built\nfor your life.",
    cta: "Discover Your Ritual",
    ctaHref: "/ritual",
  },
];

const N = slides.length;
// Each slide is 1/3 of the viewport. The strip holds 3 repeats = 9 slides total.
// translateX is in units of (100/3)vw per slide step.
const SLIDE_W_PCT = 100 / N; // 33.333...%

export default function Hero() {
  const [offset, setOffset] = useState(0); // in slide units, grows negatively going "next"
  const [animating, setAnimating] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Active index: which slide is in the center slot.
  // At offset=0 the base translate places strip-index (N+1) in center => slides[1].
  // General: activeIndex = (N+1 - offset) mod N
  const activeIndex = ((N + 1 - offset) % N + N) % N;

  const navigate = useCallback(
    (direction: "prev" | "next") => {
      if (animating) return;
      setAnimating(true);
      setTextVisible(false);
      setTransitioning(true);
      setOffset((prev) => prev + (direction === "next" ? -1 : 1));
      setTimeout(() => {
        setTextVisible(true);
        setAnimating(false);
      }, 650);
    },
    [animating]
  );

  // Silently normalise offset after transition so it never drifts far from 0.
  // Keep offset in the window [-1, 1] by collapsing any equivalent mod-N value.
  useEffect(() => {
    if (!animating && !transitioning) {
      const mod = ((offset % N) + N) % N; // 0..N-1
      const normalised = mod <= Math.floor(N / 2) ? mod : mod - N;
      if (normalised !== offset) {
        setOffset(normalised);
      }
    }
  }, [animating, offset, transitioning]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      navigate(dx < 0 ? "next" : "prev");
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const activeSlide = slides[activeIndex];

  // Strip is 3 repeats wide = 9 slides × (100/3)vw = 300vw total.
  // We want the middle repeat's CENTER slide to start visible in the center slot.
  // Middle repeat starts at index N=3, so center slide is at index N+1=4.
  // To place slide index 4 in the center slot (slot 1, left edge = 33.33vw):
  //   translateX = -(4 * 33.33vw) + 33.33vw = -(3 * 33.33vw) = -100vw
  // Then offset shifts by one SLIDE_W_PCT per step.
  // base = -N * SLIDE_W_PCT  (moves strip left by one full repeat to land on middle)
  const baseTranslate = -N * SLIDE_W_PCT; // = -100%  (of the strip's own reference, but we use vw)
  // Actually easier: translateX in vw = (baseTranslate + offset * SLIDE_W_PCT) vw
  const translateVw = (baseTranslate + offset * SLIDE_W_PCT);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap');

        .luvera-display { font-family: 'Playfair Display', Georgia, serif; }
        .luvera-sans   { font-family: 'Inter', system-ui, sans-serif; }

        .luvera-strip {
          display: flex;
          height: 100%;
          will-change: transform;
        }
        .luvera-strip.is-transitioning {
          transition: transform 0.65s cubic-bezier(0.77, 0, 0.175, 1);
        }

        .luvera-text-fade {
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .luvera-arrow {
          transition: opacity 0.2s ease, transform 0.2s ease, background 0.2s ease;
        }
        .luvera-arrow:hover { transform: scale(1.08); }

        .progress-pip {
          transition: width 0.35s cubic-bezier(0.77, 0, 0.175, 1), background 0.35s ease;
        }

        @media (prefers-reduced-motion: reduce) {
          .luvera-strip.is-transitioning,
          .luvera-text-fade,
          .luvera-arrow,
          .progress-pip { transition: none !important; }
        }
      `}</style>

      <section
        className="relative w-full overflow-hidden bg-[#0A0A0A]"
        style={{ height: "100svh", minHeight: 560 }}
        aria-label="Luvera hero carousel"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* ─── DESKTOP ──────────────────────────────────────────────── */}
        <div className="hidden md:block h-full w-full overflow-hidden relative">

          {/* Strip: 3 repeats × N slides, each slide = 1/3 vw */}
          <div
            className={`luvera-strip${transitioning ? " is-transitioning" : ""}`}
            style={{ transform: `translateX(${translateVw}vw)` }}
            onTransitionEnd={() => setTransitioning(false)}
          >
            {[0, 1, 2].map((repeat) =>
              slides.map((slide, i) => (
                <div
                  key={`${repeat}-${i}`}
                  className="relative flex-shrink-0"
                  style={{ width: `${SLIDE_W_PCT}vw`, height: "100%" }}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    draggable={false}
                  />
                  {/* Bottom gradient for CTA legibility */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.78) 100%)",
                    }}
                  />
                </div>
              ))
            )}
          </div>

          {/* Top navbar gradient */}
          <div
            className="absolute inset-x-0 top-0 z-10 pointer-events-none"
            style={{
              height: "140px",
              background: "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, transparent 100%)",
            }}
          />

          {/* CTA overlay — centred over the middle panel */}
          <div className="absolute inset-0 z-20 flex items-end pointer-events-none"
            style={{ paddingBottom: "3.5rem", paddingLeft: `${SLIDE_W_PCT}vw` }}
          >
            <div
              style={{ width: `${SLIDE_W_PCT}vw` }}
              className="flex flex-col items-center"
            >
              <div
                className="luvera-text-fade text-center pointer-events-auto px-6 w-full"
                style={{
                  opacity: textVisible ? 1 : 0,
                  transform: textVisible ? "translateY(0)" : "translateY(12px)",
                }}
              >
                <p
                  className="luvera-sans text-purple-500 uppercase text-xs mb-3"
                  style={{ letterSpacing: "0.22em" }}
                >
                  {activeSlide.eyebrow}
                </p>
                <h1
                  className="luvera-display text-white mb-7"
                  style={{
                    fontSize: "clamp(1.6rem, 2.5vw, 3rem)",
                    lineHeight: 1.1,
                    fontWeight: 400,
                    whiteSpace: "pre-line",
                  }}
                >
                  {activeSlide.headline}
                </h1>
                <a
                  href={activeSlide.ctaHref}
                  className="luvera-sans inline-block text-white border border-purple-400 px-8 py-3 text-xs uppercase hover:bg-purple-400 hover:text-[#0A0A0A] transition-colors duration-300"
                  style={{ letterSpacing: "0.18em" }}
                >
                  {activeSlide.cta}
                </a>
              </div>
            </div>
          </div>

          {/* Arrow — Prev */}
          <button
            onClick={() => navigate("prev")}
            disabled={animating}
            className="luvera-arrow absolute left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center border border-white/20 bg-black/20 hover:bg-black/50 text-white disabled:opacity-30"
            aria-label="Previous slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Arrow — Next */}
          <button
            onClick={() => navigate("next")}
            disabled={animating}
            className="luvera-arrow absolute right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center border border-white/20 bg-black/20 hover:bg-black/50 text-white disabled:opacity-30"
            aria-label="Next slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Slide counter */}
          <div
            className="luvera-sans absolute top-7 right-8 z-30 text-white/40 text-xs select-none"
            style={{ letterSpacing: "0.15em" }}
          >
            {String(activeIndex + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </div>
        </div>

        {/* ─── MOBILE: Fade crossfade ───────────────────────────────── */}
        <div className="flex md:hidden h-full w-full relative">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className="absolute inset-0"
              style={{
                opacity: i === activeIndex ? 1 : 0,
                transition: "opacity 0.45s ease",
                pointerEvents: i === activeIndex ? "auto" : "none",
              }}
              aria-hidden={i !== activeIndex}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="absolute inset-0 w-full h-full object-cover object-center"
                draggable={false}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, transparent 35%, rgba(10,10,10,0.78) 100%)",
                }}
              />
            </div>
          ))}

          {/* Mobile top navbar gradient */}
          <div
            className="absolute inset-x-0 top-0 z-10 pointer-events-none"
            style={{
              height: "120px",
              background: "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, transparent 100%)",
            }}
          />

          {/* Mobile CTA */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center pb-10 px-6">
            <div
              className="luvera-text-fade text-center w-full"
              style={{
                opacity: textVisible ? 1 : 0,
                transform: textVisible ? "translateY(0)" : "translateY(10px)",
              }}
            >
              <p className="luvera-sans text-purple-500 uppercase text-[10px] mb-2.5" style={{ letterSpacing: "0.2em" }}>
                {activeSlide.eyebrow}
              </p>
              <h1
                className="luvera-display text-white mb-6"
                style={{ fontSize: "clamp(1.9rem, 8vw, 2.6rem)", lineHeight: 1.1, fontWeight: 400, whiteSpace: "pre-line" }}
              >
                {activeSlide.headline}
              </h1>
              <a
                href={activeSlide.ctaHref}
                className="luvera-sans inline-block text-white border border-purple-400 px-8 py-3 text-[10px] uppercase hover:bg-purple-400 hover:text-[#0A0A0A] transition-colors duration-300"
                style={{ letterSpacing: "0.18em" }}
              >
                {activeSlide.cta}
              </a>
            </div>

            <div className="flex items-center gap-2 mt-7">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const diff = i - activeIndex;
                    if (diff === 0) return;
                    navigate(diff > 0 ? "next" : "prev");
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                  className="progress-pip h-[2px] rounded-full"
                  style={{
                    width: i === activeIndex ? 28 : 12,
                    background: i === activeIndex ? "#9C27B0" : "rgba(255,255,255,0.3)",
                  }}
                />
              ))}
            </div>
          </div>

          <button onClick={() => navigate("prev")} className="absolute left-0 top-0 h-full w-1/4 z-20 opacity-0" aria-label="Previous slide" />
          <button onClick={() => navigate("next")} className="absolute right-0 top-0 h-full w-1/4 z-20 opacity-0" aria-label="Next slide" />
        </div>
      </section>
    </>
  );
}