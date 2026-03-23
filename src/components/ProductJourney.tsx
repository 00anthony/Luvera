'use client'
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { INGREDIENTS, BENEFITS } from '../constants';
import { ShoppingCart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TUB_LID_URL = "/tub-lid2.webp";
const TUB_BASE_URL = "/tub-base2.webp";
const LID_WIDTH_DESKTOP = "700px";
const LID_WIDTH_MOBILE = "350px";
const BASE_WIDTH_DESKTOP = "700px";
const BASE_WIDTH_MOBILE = "350px";
const LID_SCALE = 1.0;
const BASE_SCALE = 1.0;



const ProductJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const PRODUCT = {
    title: "Luvera Men's Daily Moisturizer",
    handle: "luvera-mens-daily-moisturizer",
    price: "$34.99",
    variantId: "gid://shopify/ProductVariant/46411922964655",
  };

  const handleAddToCart = async () => {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2026-01/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        query: `mutation {
          cartCreate(input: {
            lines: [{ quantity: 1, merchandiseId: "${PRODUCT.variantId}" }]
          }) {
            cart { checkoutUrl }
          }
        }`
      }),
    }
  );

  console.log('Status:', res.status);
  const data = await res.json();
    console.log('Full response:', JSON.stringify(data, null, 2));

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return;
    }

    if (!data.data?.cartCreate?.cart) {
      console.error('No cart returned:', data);
      return;
    }

    window.location.href = data.data.cartCreate.cart.checkoutUrl;
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
        .to(".tub-lid", { y: isMobile ? -83 : -7, duration: 2, ease: "power2.out" }, 0)
        .to(".tub-base", { y: isMobile ? -80 : 0, duration: 2, ease: "power2.out" }, 0)
        .to(".product-info", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out"}, 1.5);

      const desktopOffsets = [
        { x: "-26vw", y: "-30vh" }, //TL
        { x: "26vw", y: "-30vh" }, //TR
        { x: "-34vw", y: "8vh" }, //BL
        { x: "0vw", y: "35vh" }, //bottom
        { x: "34vw", y: "8vh" }, //BR
        
      ];

      const mobileOffsets = [
        { x: "-28vw", y: "-30vh" }, //Aloe (TL)
        { x: "28vw", y: "-30vh" }, //Vit C (TR)
        { x: "-27vw", y: "12vh" }, //HA (BL)
        { x: "0vw", y: "35vh" }, //squalene (bottom-most)
        { x: "27vw", y: "12vh" }, //chamo (BR)
        
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
          x: isMobile ? "-32vw" : "9vw",
          y: isMobile ? "-29vh" : "15vh",
          scale: isMobile ? 0.45 : 1.2,
          duration: 1,
          ease: "power2.in" // stops intercepting clicks when invisible
        }, ">-0.1")
        .to(".benefits-overlay", { yPercent: 0, duration: 2, ease: "power3.inOut" }, "<")
        .to(".tub-container", {
          x: isMobile ? 0 : "25vw",
          y: isMobile ? "-34vh" : "14vh",
          scale: isMobile ? 0.45 : 1.2,
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
          <span className="text-[25vw] font-serif font-black tracking-tight md:tracking-tighter text-zinc-700 leading-none whitespace-nowrap">
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
              className={`ing-${i} ingredient-card absolute rounded-4xl overflow-hidden flex flex-col`}
              style={{
                width: isMobile ? '200px' : '300px',
                backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                background: '',
                border: '0px solid rgba(255,255,255,0.1)',
              }}
            >
              {/* Top: split image + header */}
              <div className="flex relative overflow-hidden" style={{ height: isMobile ? '110px' : '148px' }}>
                {/* Image panel — left half, full bleed */}
                <div className="relative overflow-hidden" style={{ width: '48%', flexShrink: 0 }}>
                  <img
                    src={ing.image}
                    alt={ing.name}
                    className="w-full h-full object-cover object-center block"
                    style={{ filter: 'saturate(0.6) brightness(0.85)' }}
                  />
                  {/* Feather edge toward the text */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to right, transparent 60%, #111114 100%)' }}
                  />
                </div>

                {/* Text header — bottom-aligned */}
                <div className="flex-1 flex flex-col justify-end relative z-10 px-3 pb-3 pt-4">
                  <p
                    className="uppercase mb-1.5"
                    style={{
                      fontFamily: "'Tenor Sans', sans-serif",
                      fontSize: isMobile ? '6px' : '8px',
                      letterSpacing: '0.22em',
                      color: 'rgba(255,255,255,0.3)',
                    }}
                  >
                    Premium Ingredient
                  </p>
                  <h4
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: isMobile ? '17px' : '22px',
                      fontWeight: 300,
                      color: '#f0ece6',
                      lineHeight: 1.1,
                      letterSpacing: '0.01em',
                    }}
                  >
                    {ing.name}
                  </h4>
                </div>

                {/* Giant faded index number */}
                <div
                  className="absolute bottom-0 right-2 pointer-events-none select-none leading-none"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: isMobile ? '64px' : '96px',
                    fontWeight: 300,
                    color: 'rgba(255,255,255,0.04)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Divider */}
              <div className="px-5 mb-3.5">
                <div style={{ height: '0.5px', background: 'linear-gradient(to right, rgba(255,255,255,0.15), rgba(255,255,255,0.04))' }} />
              </div>

              {/* Body: desc + benefit pill */}
              <div className="px-5 pb-5 flex flex-col gap-3.5">
                <p
                  className="m-0"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: isMobile ? '12px' : '15px',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    color: 'rgba(240,236,230,0.65)',
                    lineHeight: 1.65,
                  }}
                >
                  {ing.desc}
                </p>
                <div
                  className="self-start"
                  style={{
                    padding: '4px 12px',
                    borderRadius: '100px',
                    border: '0.5px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.04)',
                    fontFamily: "'Tenor Sans', sans-serif",
                    fontSize: isMobile ? '7px' : '9px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  {ing.benefit}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="benefits-overlay absolute inset-0 z-30 pointer-events-none">
          {/* Dark overlay for the whole section */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent" />

          {/* Image — desktop only, right side, slightly transparent */}
          <img
            src="/benefits/benefits-bg-no-tub.png"
            alt="benefits-background"
            className="hidden md:block absolute top-0 right-0 h-full w-1/2 object-cover object-center"
            style={{ filter: 'saturate(0.6) brightness(0.85)', opacity: 0.45 }}
          />
        </div>

        {!isMobile && (
          <div className="hand-reveal absolute z-40 right-[2%] bottom-[-15%] w-200 pointer-events-none opacity-0 translate-y-37.5">
            <img src="https://images.unsplash.com/photo-1515377662630-6c7d95a4e6ca?q=80&w=1000&auto=format&fit=crop" className="w-full h-auto grayscale opacity-80 mix-blend-screen scale-x-[-1]" alt="" />
          </div>
        )}

        {/* Tub + Product Info wrapper — keeps them coupled for desktop layout */}
        <div className="relative z-50 flex flex-col items-center">

          {/* Product Info */}
          <div className={`
            product-info absolute pointer-events-auto z-50
            ${isMobile
              ? 'left-3/4 top-1/4 -translate-y-1/2 -ml-16 mt-26 w-20 flex flex-col items-center text-center'
              : 'left-5/6 top-1/2 -translate-y-1/2 -ml-8 mt-3 w-55 flex flex-col items-start'
            }
          `}>
            {/* Full-container link — sits behind everything */}
            {/* Full-container click target */}
            <div
              onClick={() => window.location.href = `/products/${PRODUCT.handle}`}
              className="absolute inset-0 z-0 cursor-pointer"
            />

            {/* Content — z-10 so it renders above the link */}
            <a 
            href={`/products/${PRODUCT.handle}`}
            className="text-white hover:text-violet-400 z-10 font-serif font-black text-lg md:text-3xl leading-tight md:mb-2 relative transition duration-200">
              {PRODUCT.title}
            </a>

            <p className="text-violet-500 inline-flex text-sm font-bold uppercase tracking-widest md:mb-6 pointer-events-none relative z-10">
              {PRODUCT.price} <span className='text-zinc-400 line-through ml-2'> $49.99</span>
            </p>

            <div className="h-px bg-white/10 mb-1 md:mb-6 w-full pointer-events-none relative z-10" />

            {/* Button — z-20 so it sits above the link and captures its own clicks */}
            <button
              onClick={handleAddToCart}
              className="relative z-20 w-full md:px-6 py-1 md:py-3 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-violet-40 shadow-[0_20px_60px_rgba(139,92,246,0.3)] transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              <ShoppingCart />
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

        <div className={`absolute z-45 ${isMobile ? 'bottom-[5%] left-0 right-0 px-6 space-y-3' : 'left-[8%] top-1/2 -translate-y-1/2 max-w-xl space-y-3.5'}`}>
          {BENEFITS.map((benefit, i) => (
            <div
              key={i}
              className="benefit-item group relative flex items-stretch overflow-hidden rounded-[28px] bg-zinc-900/95 border border-white/9"
              style={{ minHeight: isMobile ? '88px' : '110px' }}
            >
              {/* Image — absolutely positioned behind everything */}
              <div className="absolute top-0 left-0 bottom-0 overflow-hidden" style={{ width: isMobile ? '110px' : '130px' }}>
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-full object-cover object-center block"
                  
                />
                {/* Feather edge toward the text */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to right, transparent 60%, #111114 100%)' }}
                />
              </div>

              {/* Index column — sits on top of image, transparent + blurred */}
              <div
                className="shrink-0 flex flex-col items-center justify-end pb-3 relative z-10 border-r border-white/[0.07]"
                style={{
                  width: isMobile ? '36px' : '42px',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  background: 'rgba(17,17,20,0.25)',
                }}
              >
                <span
                  className="text-white/35"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '11px',
                    fontWeight: 300,
                    letterSpacing: '0.1em',
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Text content */}
              <div className="ml-20 flex-1 flex flex-col justify-center gap-2 px-4 py-5 relative z-10">
                <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: '7.5px', letterSpacing: '0.24em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
                  Luvera Certified
                </p>
                <h3 className="m-0" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? '20px' : '26px', fontWeight: 300, color: '#f0ece6', lineHeight: 1.05 }}>
                  {benefit.title}
                </h3>
                <div style={{ height: '0.5px', background: 'linear-gradient(to right, rgba(255,255,255,0.12), transparent)' }} />
                <p className="m-0" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? '11px' : '13.5px', fontStyle: 'italic', fontWeight: 300, color: 'rgba(240,236,230,0.5)', lineHeight: 1.6 }}>
                  {benefit.desc}
                </p>
              </div>

              {/* Ghost number */}
              <div className="absolute right-4 bottom-0 pointer-events-none select-none leading-none z-10"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '88px', fontWeight: 300, color: 'rgba(255,255,255,0.03)' }}>
                {String(i + 1).padStart(2, '0')}
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