
import React from 'react';
import { Play } from 'lucide-react';
import { CREATORS } from '../constants';
import { motion } from 'framer-motion';

const Creators: React.FC = () => {
  return (
    <section className="py-24 bg-black px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4">
          <div>
            <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">Community</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-2">Tested by Experts</h2>
          </div>
          <p className="text-gray-400 max-w-md">
            Join thousands of skincare enthusiasts and professionals who trust Luvera for their daily ritual.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CREATORS.map((creator) => (
            <div key={creator.id} className="group relative overflow-hidden rounded-2xl aspect-3/4">
              <img 
                src={creator.videoThumb} 
                alt={creator.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent"></div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                  <Play className="w-6 h-6 fill-white text-white ml-1" />
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm italic text-gray-200 mb-3 line-clamp-3">"{creator.quote}"</p>
                <div className="flex items-center space-x-3">
                  <img src={creator.image} className="w-8 h-8 rounded-full border border-white/20" alt="" />
                  <div>
                    <h4 className="text-sm font-bold leading-none">{creator.name}</h4>
                    <span className="text-[10px] text-purple-400 uppercase tracking-widest">{creator.handle}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Creators;
