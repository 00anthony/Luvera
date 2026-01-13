'use client'
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { INGREDIENTS, BENEFITS } from '../constants';

const ProductJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Phase 1: Reveal (0 to 0.3)
  const vegetationXLeft = useTransform(smoothProgress, [0, 0.25], [0, -800]);
  const vegetationXRight = useTransform(smoothProgress, [0, 0.25], [0, 800]);
  const vegetationOpacity = useTransform(smoothProgress, [0.2, 0.3], [1, 0]);
  const buzzwordOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0.05]);
  const lidY = useTransform(smoothProgress, [0, 0.3], [-600, 0]);
  const baseY = useTransform(smoothProgress, [0, 0.3], [1400, 0]); // Base starts way down off screen
  
  // Phase 2: Ingredients (0.3 to 0.65)
  // We want a frame where they are ALL visible. Let's finish reveal by 0.5 and start fade at 0.65
  const tubScale = useTransform(smoothProgress, [0.3, 0.45, 0.7, 0.9], [1, 0.85, isMobile ? 0.45 : 0.6, isMobile ? 0.4 : 0.55]);

  // Phase 3: Benefits (0.7 to 1)
  const tubX = useTransform(smoothProgress, [0.7, 0.9], [0, isMobile ? 0 : 350]);
  const tubY = useTransform(smoothProgress, [0.7, 0.9], [0, isMobile ? -320 : -20]);
  
  const handOpacity = useTransform(smoothProgress, [0.8, 0.9], [0, isMobile ? 0 : 0.6]);
  const handY = useTransform(smoothProgress, [0.8, 0.9], [150, 0]);

  const benefitsOpacity = useTransform(smoothProgress, [0.75, 0.9], [0, 1]);
  const benefitsContainerY = useTransform(smoothProgress, [0.75, 0.9], [isMobile ? 100 : 0, 0]);

  return (
    <div ref={containerRef} className="h-[600vh] relative bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-emerald-900/10 rounded-full blur-[180px]" 
          />
        </div>

        {/* Hero Background Text */}
        <motion.div 
          style={{ opacity: buzzwordOpacity }}
          className="absolute z-10 text-[22vw] font-serif font-black tracking-tighter text-zinc-900/60 select-none pointer-events-none"
        >
          PURE
        </motion.div>

        {/* Phase 1: Moving Foliage */}
        <motion.div 
          style={{ x: vegetationXLeft, opacity: vegetationOpacity }}
          className="absolute z-30 left-0 w-1/2 h-full flex items-center justify-start pointer-events-none"
        >
          <img src="https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?q=80&w=2000" className="h-[130%] object-cover opacity-70 grayscale-[0.2]" alt="" />
        </motion.div>
        <motion.div 
          style={{ x: vegetationXRight, opacity: vegetationOpacity }}
          className="absolute z-30 right-0 w-1/2 h-full flex items-center justify-end pointer-events-none"
        >
          <img src="https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?q=80&w=2000" className="h-[130%] object-cover opacity-70 grayscale-[0.2] scale-x-[-1]" alt="" />
        </motion.div>

        {/* Phase 3: The Hand (Desktop Only) */}
        {!isMobile && (
          <motion.div 
            style={{ opacity: handOpacity, y: handY }}
            className="absolute z-30 right-[2%] bottom-[-5%] w-175 pointer-events-none select-none"
          >
             <img 
               src="https://images.unsplash.com/photo-1515377662630-6c7d95a4e6ca?q=80&w=1000&auto=format&fit=crop" 
               className="w-full h-auto grayscale opacity-80 mix-blend-screen scale-x-[-1]"
               alt="Hand reaching up"
             />
          </motion.div>
        )}

        {/* CENTERPIECE: PRODUCT TUB */}
        <motion.div 
          style={{ scale: tubScale, x: tubX, y: tubY }}
          className="relative z-40 w-75 md:w-120 flex flex-col items-center"
        >
          {/* Lid */}
          <motion.div style={{ y: lidY }} className="z-20 -mb-2">
             <div className="w-60 md:w-87.5 h-11.25 md:h-17.5 bg-linear-to-b from-zinc-700 to-black rounded-t-[120px] shadow-2xl border-t border-white/20 relative">
               <div className="absolute inset-x-0 bottom-0 h-px bg-zinc-600/50" />
             </div>
          </motion.div>
          {/* Base */}
          <motion.div style={{ y: baseY }} className="z-10 relative">
            <div className="w-59 md:w-86.5 h-45 md:h-65 bg-linear-to-br from-[#132a1e] via-[#0a1a12] to-[#050505] rounded-b-[50px] shadow-[0_40px_100px_rgba(0,0,0,0.95)] border-x border-b border-emerald-900/40 overflow-hidden flex flex-col items-center justify-center text-center p-6 md:p-10">
               <div className="font-serif tracking-[0.5em] text-emerald-500/40 text-[9px] md:text-[11px] mb-3 uppercase">Luvera Luxe</div>
               <div className="font-serif text-2xl md:text-4xl font-bold tracking-tight text-white/95 leading-tight">SKIN<br/>NOURISH</div>
               <div className="mt-4 md:mt-6 text-[7px] md:text-[9px] tracking-[0.4em] text-white/20 uppercase font-black">2.5oz / 75ml</div>
            </div>
            {/* Realtime Shimmer */}
            <motion.div 
               animate={{ x: ['-100%', '200%'] }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 bg-linear-to-r from-transparent via-white/3 to-transparent skew-x-12 pointer-events-none" 
            />
          </motion.div>

          {/* Phase 2: Ingredients Modules (LARGER & STAGGERED) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {INGREDIENTS.map((ing, i) => {
              // Shorter stagger: 0.03 instead of 0.05
              const start = 0.35 + (i * 0.03);
              const end = start + 0.12;
              
              const multiplier = isMobile ? 0.9 : 2.2; // Desktop spread is wider
              const targetX = ing.pos.x * multiplier;
              const targetY = ing.pos.y * multiplier;

              const ingX = useTransform(smoothProgress, [start, end], [0, targetX]);
              const ingY = useTransform(smoothProgress, [start, end], [0, targetY]);
              // Stay visible until 0.65 then fade quickly
              const ingOpac = useTransform(smoothProgress, [start, start + 0.04, 0.68, 0.73], [0, 1, 1, 0]);
              const ingScale = useTransform(smoothProgress, [start, end], [0.3, 1]);

              return (
                <motion.div
                  key={ing.id}
                  style={{ 
                    x: ingX, 
                    y: ingY, 
                    opacity: ingOpac,
                    scale: ingScale 
                  }}
                  className={`absolute ${isMobile ? 'w-36' : 'w-56'} p-4 md:p-6 rounded-4xl bg-zinc-900/80 backdrop-blur-3xl border border-white/10 flex flex-col items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50`}
                >
                  <div className="text-2xl md:text-4xl mb-2 md:mb-3 drop-shadow-md">{ing.icon}</div>
                  <h4 className="text-[10px] md:text-[13px] font-black uppercase tracking-widest text-emerald-400 mb-2">{ing.name}</h4>
                  <p className="text-[8px] md:text-[11px] leading-snug text-zinc-300 font-medium">{ing.desc}</p>
                  
                  {/* Glass highlight */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Phase 3: Benefits List (PIZZAZZ EDITION) */}
        <motion.div 
          style={{ opacity: benefitsOpacity, y: benefitsContainerY }}
          className={`absolute z-50 ${isMobile ? 'bottom-[5%] left-0 right-0 px-6 space-y-4' : 'left-[8%] top-1/2 -translate-y-1/2 max-w-xl space-y-6'}`}
        >
          {BENEFITS.map((benefit, i) => (
            <motion.div 
              key={i}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
              viewport={{ once: false }}
              className="group relative overflow-hidden flex items-center space-x-6 p-6 rounded-4xl bg-linear-to-r from-emerald-950/20 to-transparent border border-white/5 hover:border-emerald-500/20 transition-all duration-500 hover:translate-x-4 shadow-xl"
            >
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-black border border-white/10 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500">
                <span className="text-3xl md:text-5xl drop-shadow-lg">{benefit.icon}</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl md:text-3xl font-serif text-white mb-2 group-hover:text-emerald-300 transition-colors">{benefit.title}</h3>
                <p className="text-[10px] md:text-sm text-zinc-400 leading-relaxed font-light uppercase tracking-widest opacity-80">
                  {benefit.desc}
                </p>
              </div>
              
              {/* Corner Accent */}
              <div className="absolute top-2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-500/40" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]) }}
          className="absolute bottom-10 flex flex-col items-center"
        >
          <div className="w-px h-12 bg-linear-to-b from-white to-transparent mb-2 animate-bounce" />
          <span className="text-[10px] uppercase tracking-[0.6em] text-zinc-500 font-bold">Discover Your Glow</span>
        </motion.div>

      </div>
    </div>
  );
};

export default ProductJourney;
