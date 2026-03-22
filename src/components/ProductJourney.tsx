'use client'
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { INGREDIENTS, BENEFITS } from '../constants';
import { ShoppingCart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TUB_LID_URL = "/tub-lid.png";
const TUB_BASE_URL = "/tub-base.png";
const LID_WIDTH_DESKTOP = "700px";
const LID_WIDTH_MOBILE = "350px";
const BASE_WIDTH_DESKTOP = "700px";
const BASE_WIDTH_MOBILE = "350px";
const LID_SCALE = 1.0;
const BASE_SCALE = 1.0;


const ProductJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const productInfoRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const PRODUCT = {
    title: "Luvera Men's Daily Moisturizer",
    handle: "luvera-mens-daily-moisturizer",
    price: "$34.99",
    variantId: "gid://shopify/ProductVariant/YOUR_VARIANT_ID", // keep for future cart use
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=500%",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        }
      });

      gsap.set(".vegetation-left", { xPercent: 0, rotate: 0, opacity: 1 });
      gsap.set(".vegetation-right", { xPercent: 0, rotate: 0, opacity: 1 });
      gsap.set(".hero-bg-text", { opacity: 0.2, scale: 1 });
      gsap.set(".tub-lid", { y: -800 });
      gsap.set(".tub-base", { y: 1400 });
      gsap.set(".ingredient-card", { opacity: 0, scale: 0.3, x: 0, y: 0 });
      gsap.set(".benefits-overlay", { yPercent: 100 });
      gsap.set(".benefit-item", { opacity: 0, x: -50 });
      gsap.set(".hand-reveal", { opacity: 0, y: 150 });
      gsap.set(".product-info", { opacity: 0, y: 20 });

      const exitDistance = isMobile ? 180 : 120;
      const exitRotation = isMobile ? 45 : 25;

      timeline
        .to(".hero-bg-text", { opacity: 1, scale: 1.05, duration: 1 }, 0)
        .to(".hero-bg-text", { opacity: 0.1, scale: 1, duration: 1 }, 1)
        .to(".vegetation-left", { xPercent: -exitDistance, rotate: -exitRotation, duration: 2, ease: "power2.out" }, 0)
        .to(".vegetation-right", { xPercent: exitDistance, rotate: exitRotation, duration: 2, ease: "power2.out" }, 0)
        .to(".tub-lid", { y: isMobile ? -80 : 0, duration: 2, ease: "power2.out" }, 0)
        .to(".tub-base", { y: isMobile ? -80 : 0, duration: 2, ease: "power2.out" }, 0)
        .to(".product-info", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out"}, 1.5);

      const desktopOffsets = [
        { x: "-26vw", y: "-30vh" },
        { x: "26vw", y: "-30vh" },
        { x: "34vw", y: "8vh" },
        { x: "0vw", y: "35vh" },
        { x: "-34vw", y: "8vh" },
      ];

      const mobileOffsets = [
        { x: "-28vw", y: "-25vh" },
        { x: "28vw", y: "-25vh" },
        { x: "30vw", y: "4vh" },
        { x: "0vw", y: "25vh" },
        { x: "-30vw", y: "4vh" },
      ];

      const activeOffsets = isMobile ? mobileOffsets : desktopOffsets;

      INGREDIENTS.forEach((ing, i) => {
        timeline.to(`.ing-${i}`, {
          opacity: 1,
          scale: 1,
          x: activeOffsets[i].x,
          y: activeOffsets[i].y,
          duration: 1,
          ease: "expo.out"
        }, 1.5 + (i * 0.1));
      });

      timeline
        .to(".product-info", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power2.in",
        pointerEvents: "none", // stops intercepting clicks when invisible
      }, ">-0.1")
        .to(".benefits-overlay", { yPercent: 0, duration: 2, ease: "power3.inOut" }, "<")
        .to(".tub-container", {
          x: isMobile ? 0 : "22vw",
          y: isMobile ? "-35vh" : "0vh",
          scale: isMobile ? 0.45 : 0.65,
          duration: 2,
          ease: "power3.inOut"
        }, "<")
        .to(".hand-reveal", { opacity: 0.7, y: 0, duration: 1.5 }, "<+0.5")
        .to(".benefit-item", {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.7,
          ease: "power2.out"
        }, "<+0.6");

    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <div ref={containerRef} className="relative bg-black overflow-hidden">
      <div ref={triggerRef} className="h-screen w-full flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] bg-emerald-950/10 rounded-full blur-[200px]" />
        </div>

        <div className="hero-bg-text absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <span className="text-[25vw] font-serif font-black tracking-tighter text-zinc-700 leading-none whitespace-nowrap">
            LUVERA
          </span>
        </div>

        <div className="vegetation-left absolute z-30 left-0 w-1/2 h-full pointer-events-none origin-bottom-left overflow-hidden">
          <img src="/aloe-plant-blackbg-left.png" className="h-full w-full object-cover object-right opacity-70 grayscale-[0.2]" alt="" />
        </div>

        <div className="vegetation-right absolute z-30 right-0 w-1/2 h-full pointer-events-none origin-bottom-right overflow-hidden">
          <img src="/aloe-plant-blackbg-right.png" className="h-full w-full object-cover object-left opacity-70 grayscale-[0.2]" alt="" />
        </div>

        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          {INGREDIENTS.map((ing, i) => (
            <div
              key={ing.id}
              className={`ing-${i} ingredient-card absolute ${isMobile ? 'w-48 p-5' : 'w-80 p-8'} rounded-[48px] bg-zinc-900/95 backdrop-blur-3xl border border-white/10 flex flex-col items-center text-center shadow-2xl overflow-hidden`}
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-violet-500/20 blur-2xl rounded-full" />
                <img src={ing.image} className="w-16 h-16 md:w-28 md:h-28 object-cover rounded-3xl relative z-10 border border-white/10 shadow-lg grayscale-[0.1]" alt={ing.name} />
              </div>
              <h4 className="text-sm md:text-xl font-black uppercase tracking-widest text-violet-400 mb-3 md:mb-4">{ing.name}</h4>
              <p className="text-[10px] md:text-base leading-relaxed text-zinc-300 font-medium italic">{ing.desc}</p>
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
            </div>
          ))}
        </div>

        <div className="benefits-overlay absolute inset-0 z-30 bg-black/50 backdrop-blur-md pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent" />
        </div>

        {!isMobile && (
          <div className="hand-reveal absolute z-40 right-[2%] bottom-[-15%] w-200 pointer-events-none opacity-0 translate-y-37.5">
            <img src="https://images.unsplash.com/photo-1515377662630-6c7d95a4e6ca?q=80&w=1000&auto=format&fit=crop" className="w-full h-auto grayscale opacity-80 mix-blend-screen scale-x-[-1]" alt="" />
          </div>
        )}

        {/* Tub + Product Info wrapper — keeps them coupled for desktop layout */}
        <div className="relative z-45 flex flex-col items-center">

          {/* Product Info */}
          <div className={`
            product-info absolute pointer-events-auto z-20
            ${isMobile
              ? 'top-full left -translate-x-1/2 -mt-44 w-20 flex flex-col items-center text-center pt-6'
              : 'left-5/6 top-1/2 -translate-y-1/2 -ml-8 w-55 flex flex-col items-start'
            }
          `}>
            <a
              href={`/products/${PRODUCT.handle}`}
              className="text-white font-serif font-black text-lg md:text-3xl leading-tight md:mb-2 hover:text-violet-400 transition-colors duration-300"
            >
              {PRODUCT.title}
            </a>

            <p className="text-violet-500 inline-flex text-sm font-bold uppercase tracking-widest md:mb-6">
              {PRODUCT.price} <span className='text-zinc-400 line-through ml-2'> $49.99</span>
            </p>

            <div className="h-px bg-white/10 mb-1 md:mb-6 w-full" />

            <button
              onClick={() => window.location.href = `/products/${PRODUCT.handle}`}
              className="w-full md:px-6 py-1 md:py-3 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-violet-400 transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              {/* Cart icon — mobile only */}
              <ShoppingCart />

              {/* Text — desktop only */}
              <span className="hidden md:ml-2 md:inline text-nowrap">Add to Cart</span>
            </button>
          </div>

          {/* Tub Container */}
          <div className="tub-container w-150 flex flex-col items-center">
            <div className="tub-lid z-20 overflow-visible flex justify-center">
              <img
                src={TUB_LID_URL}
                alt="Product Lid"
                style={{
                  width: isMobile ? LID_WIDTH_MOBILE : LID_WIDTH_DESKTOP,
                  maxWidth: "none",
                  transform: `scale(${LID_SCALE}) translateY(50%)`,
                  transformOrigin: "center bottom",
                }}
                className="h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              />
            </div>
            <div className="tub-base z-10 relative flex justify-center">
              <img
                src={TUB_BASE_URL}
                alt="Product Base"
                style={{
                  width: isMobile ? BASE_WIDTH_MOBILE : BASE_WIDTH_DESKTOP,
                  maxWidth: "none",
                  transform: `scale(${BASE_SCALE}) translateY(-51%)`,
                  transformOrigin: "center top",
                }}
                className="h-auto object-contain drop-shadow-[0_40px_100px_rgba(0,0,0,1)]"
              />
            </div>
          </div>
        </div>

        <div className={`absolute z-50 ${isMobile ? 'bottom-[5%] left-0 right-0 px-8 space-y-4' : 'left-[8%] top-1/2 -translate-y-1/2 max-w-xl space-y-8'}`}>
          {BENEFITS.map((benefit, i) => (
            <div key={i} className="benefit-item group relative overflow-hidden flex items-center space-x-6 p-6 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 shadow-2xl transition-transform hover:scale-105">
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-3xl bg-black flex items-center justify-center shrink-0 overflow-hidden">
                <img src={benefit.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={benefit.title} />
              </div>
              <div>
                <h3 className="text-xl md:text-4xl font-serif text-white mb-1 leading-tight">{benefit.title}</h3>
                <p className="text-[11px] md:text-sm text-zinc-400 leading-relaxed font-bold uppercase tracking-widest">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
          <div className="w-px h-12 bg-linear-to-b from-white to-transparent mb-2 animate-bounce opacity-30" />
          <span className="text-[10px] uppercase tracking-[0.6em] text-zinc-600 font-black text-center">Experience Luvera</span>
        </div>

      </div>
    </div>
  );
};

export default ProductJourney;