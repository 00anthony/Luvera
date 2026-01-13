'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift } from 'lucide-react';

const DiscountPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if they've already seen it this session
      const seen = sessionStorage.getItem('luvera-popup-seen');
      if (!seen) {
        setIsVisible(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    sessionStorage.setItem('luvera-popup-seen', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-100 flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-zinc-900 border border-white/10 p-1 rounded-3xl overflow-hidden"
          >
            <div className="bg-linear-to-br from-purple-900/40 to-black p-8 md:p-12 text-center relative">
              <button 
                onClick={closePopup}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-white flex items-center justify-center rounded-2xl rotate-12">
                  <Gift className="w-8 h-8 text-purple-600" />
                </div>
              </div>

              <h2 className="text-3xl font-serif mb-2">Wait! Before you glow...</h2>
              <p className="text-gray-400 mb-8">
                Join our exclusive circle and receive <span className="text-white font-bold">15% OFF</span> your first order plus early access to new drops.
              </p>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); closePopup(); }}>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  required
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-white"
                />
                <button 
                  type="submit"
                  className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all rounded-xl"
                >
                  Unlock My Discount
                </button>
                <button 
                  type="button"
                  onClick={closePopup}
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-[0.2em]"
                >
                  No thanks, I'll pay full price
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DiscountPopup;
