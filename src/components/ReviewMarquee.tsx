
import React from 'react';
import { TRUST_BADGES } from '../constants';

const LaurelWreath: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className} 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M50 95c-5 0-10-3-15-8-12-11-18-28-18-47 0-15 4-28 10-37 1-1 3-1 4 0s1 3 0 4c-5 8-9 20-9 33 0 18 5 33 16 43 4 4 8 7 12 7 1 0 2 1 2 2.5s-1 2.5-2 2.5zM50 95c5 0 10-3 15-8 12-11 18-28 18-47 0-15-4-28-10-37-1-1-3-1-4 0s-1 3 0 4c5 8 9 20 9 33 0 18-5 33-16 43-4 4-8 7-12 7-1 0-2 1-2 2.5s1 2.5 2 2.5z" />
    <path d="M25 25c-2 3-5 5-8 5-1 0-2-1-2-2s1-2 2-2c2 0 4-1 6-4 1-1 2-1 3 0s1 2 0 3zM22 40c-2 2-5 3-8 2-1 0-2-1-2-2s1-2 2-2c2 1 4 0 6-2 1-1 2-1 3 0s1 2-1 4zM22 55c-2 2-5 2-8 0-1-1-1-2 0-3s2-1 4-1c2 0 4-1 5-3 1-1 2 0 3 1s-2 4-4 6zM25 70c-2 1-5 1-8-1-1-1-1-2 0-3s2 0 4 1c2 1 4 1 6-1 1-1 2 0 3 1s-3 2-5 3z" />
    <path d="M75 25c2 3 5 5 8 5 1 0 2-1 2-2s-1-2-2-2c-2 0-4-1-6-4-1-1-2-1-3 0s-1 2 1 3zM78 40c2 2 5 3 8 2 1 0 2-1 2-2s-1-2-2-2c-2 1-4 0-6-2-1-1-2-1-3 0s-1 2 1 4zM78 55c2 2 5 2 8 0 1-1 1-2 0-3s-2-1-4-1c-2 0-4-1-5-3-1-1-2 0-3 1s2 4 4 6zM75 70c2 1 5 1 8-1 1-1 1-2 0-3s-2 0-4 1c-2 1-4 1-6-1-1-1-2 0-3 1s3 2 5 3z" />
  </svg>
);

const ReviewMarquee: React.FC = () => {
  // Duplicate for seamless loop
  const list = [...TRUST_BADGES, ...TRUST_BADGES, ...TRUST_BADGES];

  return (
    <div className="bg-[#0a0a0a] py-12 overflow-hidden relative border-y border-white/5">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {list.map((badge, idx) => (
          <div key={idx} className="inline-flex items-center px-16 group">
            {/* Laurel Wreath Left */}
            <LaurelWreath className="w-12 h-12 text-zinc-700 transition-colors group-hover:text-purple-500/50" />
            
            <div className="flex flex-col items-center justify-center px-6 text-center">
              <span className="text-[10px] italic text-zinc-500 uppercase tracking-[0.2em] mb-1">
                {badge.topText}
              </span>
              <span className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-none mb-1">
                {badge.metric}
              </span>
              <span className="text-[10px] text-zinc-600 uppercase tracking-[0.3em]">
                {badge.bottomText}
              </span>
            </div>

            {/* Laurel Wreath Right */}
            <LaurelWreath className="w-12 h-12 text-zinc-700 transition-colors group-hover:text-purple-500/50 rotate-180 scale-x-[-1]" />
          </div>
        ))}
      </div>
      
      {/* Side Fades for Luxury Depth */}
      <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#0a0a0a] to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#0a0a0a] to-transparent z-10"></div>
    </div>
  );
};

export default ReviewMarquee;
