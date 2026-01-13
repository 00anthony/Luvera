
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TabContent {
  id: string;
  number: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  imageUrl: string;
  accentElement?: string;
}

const tabs: TabContent[] = [
  {
    id: 'nature',
    number: '01',
    label: 'NATURE',
    title: 'FROM',
    subtitle: 'NATURE',
    description: 'We research, test and formulate with powerful botanicals and proprietary ingredients to target unique-to-you skin concerns.',
    buttonText: 'OUR SCIENCE EXPLAINED',
    imageUrl: 'https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?auto=format&fit=crop&q=80&w=800',
    accentElement: '🍃'
  },
  {
    id: 'science',
    number: '02',
    label: 'SCIENCE',
    title: 'PURE',
    subtitle: 'SCIENCE',
    description: 'Every drop is a result of advanced molecular research, ensuring that high-performance actives reach the deepest layers of the dermis.',
    buttonText: 'VIEW THE FORMULA',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
    accentElement: '🧪'
  },
  {
    id: 'results',
    number: '03',
    label: 'RESULTS',
    title: 'PROVEN',
    subtitle: 'RESULTS',
    description: 'Clinical trials show 98% improvement in skin elasticity and moisture retention within just 7 days of consistent application.',
    buttonText: 'SEE CLINICAL DATA',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
    accentElement: '✨'
  }
];

const ProductDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabContent>(tabs[0]);

  return (
    <section id="about" className="py-24 bg-black border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Navigation Headers */}
        <div className="flex space-x-12 md:space-x-24 mb-20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab)}
              className="group relative flex flex-col items-start"
            >
              <div className="flex items-center space-x-1 mb-1">
                <span className={`text-[10px] font-bold tracking-tighter ${activeTab.id === tab.id ? 'text-white' : 'text-zinc-600'}`}>
                  {tab.number}
                </span>
              </div>
              <div className={`
                px-4 py-2 text-sm font-bold tracking-[0.2em] transition-all duration-300
                ${activeTab.id === tab.id 
                  ? 'text-white border border-white scale-105' 
                  : 'text-zinc-600 hover:text-zinc-400'
                }
              `}>
                {tab.label}
              </div>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-125">
          
          {/* Left Text Side */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-5xl md:text-6xl font-serif">
                    <span className="font-light">{activeTab.title}</span>{' '}
                    <span className="font-bold text-amber-50/90">{activeTab.subtitle}</span>
                  </h2>
                </div>
                
                <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                  {activeTab.description}
                </p>

                <div className="pt-8">
                  <button className="px-8 py-4 bg-[#f8f8f8] text-black text-xs font-bold tracking-widest uppercase hover:bg-purple-500 hover:text-white transition-all duration-300">
                    {activeTab.buttonText}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Image Side */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative group"
              >
                {/* Background glow behind image */}
                <div className="absolute -inset-4 bg-purple-500/10 blur-[80px] rounded-full opacity-50"></div>
                
                {/* Main Product Image Container */}
                <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-zinc-900 border border-white/5">
                  <img 
                    src={activeTab.imageUrl} 
                    alt={activeTab.label}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* The Floating Element (Like the leaf in the reference) */}
                  <motion.div 
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 left-10 text-6xl opacity-30 select-none pointer-events-none"
                  >
                    {activeTab.accentElement}
                  </motion.div>
                </div>

                {/* Aesthetic Detail Line (similar to the image) */}
                <div className="absolute -right-4 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/20 to-transparent"></div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
