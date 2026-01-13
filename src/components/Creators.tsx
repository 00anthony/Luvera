'use client'
import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { CREATORS } from '../constants';
import { motion, Variants } from 'framer-motion';

const Creators: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      x: -50, 
      y: 100, 
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        duration: 0.8
      }
    }
  };

  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-emerald-500 text-sm font-bold tracking-[0.4em] uppercase">Trusted Voices</span>
            <h2 className="text-5xl md:text-8xl font-serif italic mt-2 text-white tracking-tighter">Skin Rituals.</h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-500 max-w-sm text-base md:text-lg italic"
          >
            The Luvera community consists of world-class dermatologists and aesthetic visionaries.
          </motion.p>
        </div>

        {/* Mobile: Horizontal Scroll | Desktop: Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex md:grid md:grid-cols-4 gap-6 md:gap-8 overflow-x-auto md:overflow-visible pb-10 md:pb-0 snap-x snap-mandatory no-scrollbar -mx-6 px-6 md:mx-0 md:px-0"
        >
          {CREATORS.map((creator) => (
            <motion.div 
              key={creator.id} 
              variants={cardVariants}
              className="group relative overflow-hidden rounded-[2.5rem] shrink-0 w-[80vw] sm:w-[50vw] md:w-full aspect-9/16 md:aspect-[3/4.5] bg-zinc-900 border border-white/5 cursor-pointer snap-center"
            >
              <img 
                src={creator.videoThumb} 
                alt={creator.name} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-70 group-hover:opacity-100 group-hover:grayscale-0 grayscale-[0.3]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent"></div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 scale-75 group-hover:scale-100 transition-transform">
                  <Play className="w-8 h-8 fill-white text-white ml-1 shadow-2xl" />
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8 transition-transform duration-500 group-hover:-translate-y-2">
                <p className="text-sm italic text-gray-200 mb-6 line-clamp-3 font-serif leading-relaxed">"{creator.quote}"</p>
                <div className="flex items-center space-x-4">
                  <div className="relative shrink-0">
                    <img src={creator.image} className="w-10 h-10 rounded-full border-2 border-emerald-500/30 object-cover" alt="" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-black flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white leading-none">{creator.name}</h4>
                    <span className="text-[9px] text-emerald-500 uppercase tracking-[0.3em] font-black mt-1 block">{creator.handle}</span>
                  </div>
                </div>
              </div>

              <div className="absolute top-0 right-0 w-px h-full bg-linear-to-b from-transparent via-white/10 to-transparent" />
            </motion.div>
          ))}

          {/* See More Card (Mobile Only) */}
          <motion.div 
            variants={cardVariants}
            className="md:hidden shrink-0 w-[80vw] aspect-9/16 rounded-[2.5rem] bg-zinc-900/50 border-2 border-dashed border-white/10 flex flex-col items-center justify-center space-y-4 snap-center group cursor-pointer hover:border-emerald-500/50 transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
               <ArrowRight className="w-8 h-8" />
            </div>
            <span className="text-white font-serif italic text-2xl">See More</span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">Join the community</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Creators;
