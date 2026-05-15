'use client';

import React from 'react';
import { motion } from 'motion/react';
import { TARI_VIDEOS, MOTION_SECTION, LUXURY_EASE } from '@/lib/constants';
import CinematicCarousel from './CinematicCarousel';

interface TariCollectionProps {
  theme: 'light' | 'dark';
  onNavigate: () => void;
}

const TariCollection: React.FC<TariCollectionProps> = ({ theme, onNavigate }) => {
  const isLight = theme === 'light';
  
  return (
    <section className={`relative py-32 md:py-48 overflow-hidden transition-colors duration-1000 ${isLight ? 'bg-[#FDFCFB]' : 'bg-onyx'}`}>
      <div className={`absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none`}>
        <div className={`absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full blur-[150px] ${isLight ? 'bg-ash/10' : 'bg-white/5'}`} />
        <div className={`absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full blur-[150px] ${isLight ? 'bg-ash/10' : 'bg-white/5'}`} />
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 md:mb-32 gap-12 text-center md:text-left">
          <motion.div {...MOTION_SECTION} className="space-y-6 flex-1">
            <span className={`text-[10px] tracking-[0.6em] uppercase ${isLight ? 'text-black/20' : 'text-white/20'}`}>The Campaign</span>
            <button 
              onClick={onNavigate}
              className="group text-left"
            >
              <h2 className={`text-5xl md:text-8xl font-serif lowercase italic tracking-tighter leading-none transition-all group-hover:opacity-60 ${isLight ? 'text-black/60' : 'text-white/40'}`}>
                Tari Set Collection
              </h2>
            </button>
          </motion.div>
          
            <motion.p 
            {...MOTION_SECTION}
            transition={{ ...MOTION_SECTION.transition, delay: 0.2 }}
            className={`max-w-xs text-xs leading-loose italic font-light mx-auto md:mx-0 ${isLight ? 'text-black/40' : 'text-white/20'}`}
          >
            A visual study of liquid form and architectural drape. Captured in the stillness of our Lagos atelier.
          </motion.p>
          <motion.button
            {...MOTION_SECTION}
            onClick={onNavigate}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-12 py-5 text-[9px] uppercase tracking-[0.5em] rounded-full border backdrop-blur-xl transition-all duration-700 ${isLight ? 'bg-black text-white border-black/10' : 'bg-white text-black border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]'}`}
          >
            Shop the Collection
          </motion.button>
        </div>

        <CinematicCarousel videos={TARI_VIDEOS} theme={theme} />
        
        <div className="mt-32 max-w-sm mx-auto text-center">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 2, ease: LUXURY_EASE }}
              className={`h-px mb-8 mx-auto ${isLight ? 'bg-black/10' : 'bg-white/10'}`} 
            />
            <p className={`text-[11px] leading-loose italic font-light ${isLight ? 'text-black/30' : 'text-white/30'}`}>
                "The Tari Set represents our most rigorous exploration of the body's natural movement against structured grace."
            </p>
        </div>
      </div>
    </section>
  );
};

export default TariCollection;
