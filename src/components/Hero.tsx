
import React from 'react';
import { motion } from 'framer-motion';
import { TIKTOK_SHOP_URL } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-purple-900/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-indigo-900/20 rounded-full blur-[120px]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
        <div className="text-center lg:text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-purple-400 text-sm font-semibold tracking-[0.3em] uppercase block mb-4">
              Premium Skincare Essentials
            </span>
            <h1 className="text-5xl md:text-7xl font-serif italic mb-2">
              Where Confidence
            </h1>
            <h1 className="text-5xl md:text-7xl font-serif font-bold uppercase tracking-tight">
              Meets Clarity
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-gray-400 text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed"
          >
            A meticulously crafted hydrating moisturizer designed to revitalize your skin's natural glow and provide lasting protection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="pt-4"
          >
            <a 
              href={TIKTOK_SHOP_URL}
              className="inline-block px-12 py-5 bg-white text-black font-bold uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-2xl shadow-purple-500/20"
            >
              Shop Now
            </a>
          </motion.div>
        </div>

        {/* Product Image Animation */}
        <div className="relative flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1, type: "spring", stiffness: 50 }}
            className="relative z-20"
          >
            {/* The Jar Container */}
            <div className="relative group">
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?auto=format&fit=crop&q=80&w=800" 
                  alt="Luvera Hydrating Moisturizer"
                  className="w-100 h-auto object-contain rounded-2xl shadow-[0_0_80px_rgba(139,92,246,0.3)] ring-1 ring-white/10"
                />
              </motion.div>
              {/* Dynamic Splash Overlay */}
              <div className="absolute -inset-10 pointer-events-none">
                 <div className="w-full h-full relative">
                    <motion.div 
                        animate={{ scale: [0.8, 1, 0.8], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute bottom-10 left-10 w-32 h-32 bg-purple-500/30 blur-3xl rounded-full" 
                    />
                 </div>
              </div>
            </div>
          </motion.div>
          
          {/* Splash Background - imitating the user photo's water ripples */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none opacity-40">
             <div className="w-full h-full border border-purple-500/20 rounded-full animate-[ping_5s_linear_infinite]" />
             <div className="absolute inset-0 border border-purple-400/10 rounded-full animate-[ping_7s_linear_infinite] delay-1000" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] mb-2 opacity-50">Scroll</span>
        <div className="w-px h-12 bg-linear-to-b from-white to-transparent opacity-50"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
