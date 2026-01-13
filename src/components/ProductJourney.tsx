'use client'
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
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
  const buzzwordOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0.1]);
  const lidY = useTransform(smoothProgress, [0, 0.3], [-600, 0]);
  const baseY = useTransform(smoothProgress, [0, 0.3], [1200, 0]); // Base starts way down
  
  // Phase 2: Ingredients (0.3 to 0.6)
  const tubScale = useTransform(smoothProgress, [0.3, 0.45, 0.7], [1, 0.85, isMobile ? 0.5 : 0.65]);
  const ingredientFadeOut = useTransform(smoothProgress, [0.6, 0.65], [1, 0]);

  // Phase 3: Benefits (0.65 to 1)
  // Conditional values for Desktop vs Mobile
  const tubX = useTransform(smoothProgress, [0.65, 0.85], [0, isMobile ? 0 : 320]);
  const tubY = useTransform(smoothProgress, [0.65, 0.85], [0, isMobile ? -280 : -40]);
  
  const handOpacity = useTransform(smoothProgress, [0.75, 0.85], [0, isMobile ? 0 : 1]);
  const handY = useTransform(smoothProgress, [0.75, 0.85], [100, 0]);

  const benefitsOpacity = useTransform(smoothProgress, [0.8, 0.9], [0, 1]);
  const benefitsContainerY = useTransform(smoothProgress, [0.8, 0.9], [isMobile ? 150 : 0, 0]);

  return (
    <div ref={containerRef} className="h-[500vh] relative bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Glow */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-[100vw] bg-emerald-900/10 rounded-full blur-[150px]" 
          />
        </div>

        {/* Phase 1: Buzzword Behind Vegetation */}
        <motion.div 
          style={{ opacity: buzzwordOpacity }}
          className="absolute z-10 text-[18vw] font-serif font-black tracking-tighter text-zinc-900/40 select-none pointer-events-none"
        >
          PURE
        </motion.div>

        {/* Phase 1: Vegetation Assets */}
        <motion.div 
          style={{ x: vegetationXLeft, opacity: vegetationOpacity }}
          className="absolute z-30 left-0 w-1/2 h-full flex items-center justify-start pointer-events-none"
        >
          <img src="https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?q=80&w=2000" className="h-[120%] object-cover opacity-60 contrast-125" alt="" />
        </motion.div>
        <motion.div 
          style={{ x: vegetationXRight, opacity: vegetationOpacity }}
          className="absolute z-30 right-0 w-1/2 h-full flex items-center justify-end pointer-events-none"
        >
          <img src="https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?q=80&w=2000" className="h-[120%] object-cover opacity-60 contrast-125 scale-x-[-1]" alt="" />
        </motion.div>

        {/* Phase 3: The Hand (Desktop Only) */}
        {!isMobile && (
          <motion.div 
            style={{ opacity: handOpacity, y: handY }}
            className="absolute z-30 right-[5%] bottom-[10%] w-150 pointer-events-none"
          >
             <img 
               src="https://images.unsplash.com/photo-1515377662630-6c7d95a4e6ca?q=80&w=1000&auto=format&fit=crop" 
               className="w-full h-auto grayscale opacity-40 mix-blend-screen"
               alt="Hand reaching up"
             />
          </motion.div>
        )}

        {/* THE PRODUCT TUB (Centerpiece) */}
        <motion.div 
          style={{ scale: tubScale, x: tubX, y: tubY }}
          className="relative z-40 w-75 md:w-112.5 flex flex-col items-center"
        >
          {/* Lid */}
          <motion.div style={{ y: lidY }} className="z-20 -mb-2">
             <div className="w-55 md:w-[320px] h-10 md:h-15 bg-linear-to-b from-zinc-700 to-black rounded-t-[100px] shadow-2xl border-t border-white/20 relative">
               <div className="absolute inset-x-0 bottom-0 h-px bg-zinc-600/50" />
             </div>
          </motion.div>
          {/* Base */}
          <motion.div style={{ y: baseY }} className="z-10 relative">
            <div className="w-54 md:w-79 h-40 md:h-60 bg-linear-to-br from-[#132a1e] via-[#0a1a12] to-[#050505] rounded-b-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.9)] border-x border-b border-emerald-900/40 overflow-hidden flex flex-col items-center justify-center text-center p-4 md:p-8">
               <div className="font-serif tracking-[0.4em] text-zinc-500 text-[8px] md:text-xs mb-2">LUVERA</div>
               <div className="font-serif text-xl md:text-3xl font-bold tracking-tight text-white/90 leading-tight">SKIN<br/>NOURISH</div>
               <div className="mt-2 md:mt-4 text-[6px] md:text-[8px] tracking-[0.3em] text-emerald-400/50 uppercase">Clinical Hydration</div>
            </div>
            {/* Glossy Reflection Overlay */}
            <div className="absolute inset-0 bg-linear-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Phase 2: Ingredients Modules (STAGGERED) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {INGREDIENTS.map((ing, i) => {
              // Staggered calculation: each ingredient gets its own window of scroll progress
              const start = 0.35 + (i * 0.05);
              const end = start + 0.1;
              
              // Mobile vs Desktop Multipliers
              const multiplier = isMobile ? 0.65 : 1.8;
              const targetX = ing.pos.x * multiplier;
              const targetY = ing.pos.y * multiplier;

              const ingX = useTransform(smoothProgress, [start, end], [0, targetX]);
              const ingY = useTransform(smoothProgress, [start, end], [0, targetY]);
              const ingOpac = useTransform(smoothProgress, [start, start + 0.05, 0.6, 0.65], [0, 1, 1, 0]);
              const ingScale = useTransform(smoothProgress, [start, end], [0.4, 1]);

              return (
                <motion.div
                  key={ing.id}
                  style={{ 
                    x: ingX, 
                    y: ingY, 
                    opacity: ingOpac,
                    scale: ingScale 
                  }}
                  className={`absolute ${isMobile ? 'w-32' : 'w-48'} p-3 md:p-5 rounded-3xl bg-zinc-900/60 backdrop-blur-2xl border border-white/10 flex flex-col items-center text-center shadow-3xl z-50`}
                >
                  <div className="text-xl md:text-3xl mb-1 md:mb-2">{ing.icon}</div>
                  <h4 className="text-[8px] md:text-xs font-bold uppercase tracking-widest text-emerald-400 mb-1">{ing.name}</h4>
                  <p className="text-[7px] md:text-[10px] leading-tight text-zinc-400">{ing.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Phase 3: Benefits List */}
        <motion.div 
          style={{ opacity: benefitsOpacity, y: benefitsContainerY }}
          className={`absolute z-50 ${isMobile ? 'bottom-[5%] left-0 right-0 px-6 space-y-4' : 'left-[10%] top-1/2 -translate-y-1/2 max-w-lg space-y-10'}`}
        >
          {BENEFITS.map((benefit, i) => (
            <motion.div 
              key={i}
              className="flex items-start space-x-4 md:space-x-6 group"
            >
              <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-center shrink-0`}>
                <span className="text-lg md:text-2xl">{benefit.icon}</span>
              </div>
              <div>
                <h3 className="text-lg md:text-2xl font-serif text-white mb-1">{benefit.title}</h3>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed line-clamp-2 md:line-clamp-none">
                  {benefit.desc}
                </p>
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
          <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-500">Discover Luvera</span>
        </motion.div>

      </div>
    </div>
  );
};

export default ProductJourney;
