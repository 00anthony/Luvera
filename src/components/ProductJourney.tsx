'use client'
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { INGREDIENTS, BENEFITS } from '../constants';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const ProductJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tubRef = useRef<HTMLDivElement>(null);
  const foliageRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=500%", // Longer scroll for smoothness
          scrub: 1.5, // Smoother scrub factor
          pin: true,
          anticipatePin: 1,
        }
      });

      // Reset initial states
      gsap.set(".vegetation-left", { xPercent: 0, opacity: 1 });
      gsap.set(".vegetation-right", { xPercent: 0, opacity: 1 });
      gsap.set(".hero-bg-text", { opacity: 0.6, scale: 1 });
      gsap.set(".tub-lid", { y: -600 });
      gsap.set(".tub-base", { y: 1400 });
      gsap.set(".ingredient-card", { opacity: 0, scale: 0.3, xPercent: 0, yPercent: 0 });
      gsap.set(".benefits-overlay", { yPercent: 100 });
      gsap.set(".benefit-item", { opacity: 0, x: -50 });
      gsap.set(".hand-reveal", { opacity: 0, y: 150 });

      // PHASE 1: GENESIS (The Reveal)
      timeline
        .to(".hero-bg-text", { opacity: 0.05, scale: 0.9, duration: 1 }, 0)
        .to(".vegetation-left", { xPercent: -100, duration: 2 }, 0)
        .to(".vegetation-right", { xPercent: 100, duration: 2 }, 0)
        .to(".tub-lid", { y: 0, duration: 2, ease: "power2.out" }, 0.2)
        .to(".tub-base", { y: 0, duration: 2, ease: "power2.out" }, 0.2);

      // PHASE 2: INGREDIENTS (The Fan Out)
      // Desktop offsets are larger to hit the edges
      const desktopOffsets = [
        { x: -42, y: -38 }, // Top Left
        { x: 42, y: -38 },  // Top Right
        { x: 45, y: 15 },   // Mid Right
        { x: 0, y: 40 },    // Bottom
        { x: -45, y: 15 },  // Mid Left
      ];

      const mobileOffsets = [
        { x: -28, y: -25 },
        { x: 28, y: -25 },
        { x: 30, y: 5 },
        { x: 0, y: 25 },
        { x: -30, y: 5 },
      ];

      const offsets = isMobile ? mobileOffsets : desktopOffsets;

      INGREDIENTS.forEach((ing, i) => {
        timeline.to(`.ing-${i}`, {
          opacity: 1,
          scale: 1,
          xPercent: offsets[i].x * (isMobile ? 1 : 1),
          yPercent: offsets[i].y * (isMobile ? 1 : 1),
          duration: 0.8,
          ease: "back.out(1.7)"
        }, 1.5 + (i * 0.15));
      });

      // Frame where they stay readable
      timeline.to({}, { duration: 1 }); // Empty gap for pause

      // PHASE 3: BENEFITS (The Wipe & Hand Reveal)
      // Wipe: The benefits overlay slides UP, overlapping the ingredients
      timeline
        .to(".benefits-overlay", { 
          yPercent: 0, 
          duration: 2, 
          ease: "power2.inOut" 
        }, ">")
        // Tub moves to hand/top
        .to(".tub-container", {
          x: isMobile ? 0 : 350,
          y: isMobile ? -320 : -20,
          scale: isMobile ? 0.45 : 0.6,
          duration: 2,
          ease: "power2.inOut"
        }, "<")
        // Reveal hand and benefits list
        .to(".hand-reveal", { opacity: 0.7, y: 0, duration: 1.5 }, "<+0.5")
        .to(".benefit-item", { 
          opacity: 1, 
          x: 0, 
          stagger: 0.2, 
          duration: 1,
          ease: "power2.out"
        }, "<+0.2");

    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <div ref={containerRef} className="relative bg-black overflow-hidden">
      <div ref={triggerRef} className="h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* BACKGROUND AMBIENCE */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] bg-emerald-950/10 rounded-full blur-[200px]" />
        </div>

        {/* HERO BACKGROUND TEXT */}
        <div className="hero-bg-text absolute z-10 text-[25vw] font-serif font-black tracking-tighter text-zinc-900/60 select-none pointer-events-none">
          PURE
        </div>

        {/* PHASE 1: FOLIAGE */}
        <div className="vegetation-left absolute z-30 left-0 w-1/2 h-full pointer-events-none">
          <img src="https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?q=80&w=2000" className="h-full w-full object-cover opacity-70 grayscale-[0.2]" alt="" />
        </div>
        <div className="vegetation-right absolute z-30 right-0 w-1/2 h-full pointer-events-none">
          <img src="https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?q=80&w=2000" className="h-full w-full object-cover opacity-70 grayscale-[0.2] scale-x-[-1]" alt="" />
        </div>

        {/* INGREDIENTS (Phase 2 - Fan out to edges) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          {INGREDIENTS.map((ing, i) => (
            <div
              key={ing.id}
              className={`ing-${i} ingredient-card absolute ${isMobile ? 'w-40 p-4' : 'w-72 p-8'} rounded-[40px] bg-zinc-900/90 backdrop-blur-3xl border border-white/10 flex flex-col items-center text-center shadow-2xl`}
            >
              <div className="text-3xl md:text-5xl mb-3 md:mb-5 drop-shadow-lg">{ing.icon}</div>
              <h4 className="text-xs md:text-lg font-black uppercase tracking-widest text-emerald-400 mb-2 md:mb-4">{ing.name}</h4>
              <p className="text-[9px] md:text-sm leading-relaxed text-zinc-300 font-medium italic">{ing.desc}</p>
              
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
            </div>
          ))}
        </div>

        {/* PHASE 3 OVERLAY (Wipes over ingredients) */}
        <div className="benefits-overlay absolute inset-0 z-35 bg-black/40 backdrop-blur-sm pointer-events-none">
          {/* Subtle texture or subtle glow can go here */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent" />
        </div>

        {/* HAND REVEAL (Phase 3 Desktop) */}
        {!isMobile && (
          <div className="hand-reveal absolute z-40 right-[2%] bottom-[-10%] w-187.5 pointer-events-none opacity-0 translate-y-37.5">
             <img 
               src="https://images.unsplash.com/photo-1515377662630-6c7d95a4e6ca?q=80&w=1000&auto=format&fit=crop" 
               className="w-full h-auto grayscale opacity-80 mix-blend-screen scale-x-[-1]"
               alt=""
             />
          </div>
        )}

        {/* CENTERPIECE: PRODUCT TUB */}
        <div ref={tubRef} className="tub-container relative z-45 w-70 md:w-120 flex flex-col items-center">
          {/* Lid */}
          <div className="tub-lid z-20 -mb-2">
             <div className="w-55 md:w-87.5 h-11.25 md:h-17.5 bg-linear-to-b from-zinc-700 to-black rounded-t-[120px] shadow-2xl border-t border-white/20 relative">
               <div className="absolute inset-x-0 bottom-0 h-px bg-zinc-600/50" />
             </div>
          </div>
          {/* Base */}
          <div className="tub-base z-10 relative">
            <div className="w-54 md:w-86.5 h-40 md:h-65 bg-linear-to-br from-[#132a1e] via-[#0a1a12] to-[#050505] rounded-b-[50px] shadow-[0_40px_100px_rgba(0,0,0,1)] border-x border-b border-emerald-900/50 overflow-hidden flex flex-col items-center justify-center text-center p-6 md:p-10">
               <div className="font-serif tracking-[0.5em] text-emerald-500/50 text-[10px] md:text-[12px] mb-3 uppercase font-bold">Luvera Luxe</div>
               <div className="font-serif text-2xl md:text-5xl font-bold tracking-tight text-white/95 leading-tight">SKIN<br/>NOURISH</div>
               <div className="mt-4 md:mt-8 text-[8px] md:text-[10px] tracking-[0.4em] text-white/30 uppercase font-black">Luxury Formulation</div>
            </div>
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-linear-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* BENEFITS LIST (Phase 3) */}
        <div className={`absolute z-50 ${isMobile ? 'bottom-[8%] left-0 right-0 px-8 space-y-4' : 'left-[10%] top-1/2 -translate-y-1/2 max-w-xl space-y-8'}`}>
          {BENEFITS.map((benefit, i) => (
            <div key={i} className="benefit-item group relative overflow-hidden flex items-center space-x-6 p-6 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 shadow-2xl transition-transform hover:scale-105">
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-3xl bg-black border border-emerald-500/20 flex items-center justify-center shrink-0">
                <span className="text-3xl md:text-5xl drop-shadow-lg">{benefit.icon}</span>
              </div>
              <div>
                <h3 className="text-xl md:text-3xl font-serif text-white mb-1">{benefit.title}</h3>
                <p className="text-[11px] md:text-sm text-zinc-400 leading-relaxed font-bold uppercase tracking-widest">
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
          <div className="w-px h-12 bg-linear-to-b from-white to-transparent mb-2 animate-bounce opacity-30" />
          <span className="text-[10px] uppercase tracking-[0.6em] text-zinc-600 font-black">Experience Luvera</span>
        </div>

      </div>
    </div>
  );
};

export default ProductJourney;
