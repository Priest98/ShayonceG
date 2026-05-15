'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VIDEOS, LUXURY_EASE } from '@/lib/constants';

interface HeroProps {
  onNavigate: (page: 'home' | 'collections') => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [heroIndex, setHeroIndex] = useState(0);
  const totalSlides = 2;

  const nextSlide = useCallback(() => {
    setHeroIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setHeroIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Handle Wheel Events
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > 50) {
      if (e.deltaY > 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <section 
      onWheel={handleWheel}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden cursor-ns-resize"
    >
      <AnimatePresence mode="wait">
        {heroIndex === 0 ? (
          <motion.div 
            key="hero-shayonce"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.5, ease: LUXURY_EASE }}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 3, ease: LUXURY_EASE }}
              className="absolute inset-0 w-full h-full"
            >
              <video
                src={VIDEOS[0]}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover brightness-[0.35]"
              />
            </motion.div>
            
            <div className="relative z-10 text-center flex flex-col items-center p-6 md:p-12">
              <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5, duration: 2.2, ease: LUXURY_EASE }}
                 className="space-y-6 md:space-y-10"
              >
                <h1 className="text-5xl md:text-[8rem] font-serif leading-none tracking-[0.05em] py-2 md:py-8">
                  Shayonce G
                </h1>
                <div className="h-[1px] w-12 md:w-24 mx-auto bg-white/20" />
                <p className="text-[10px] md:text-sm uppercase tracking-[0.8em] text-white/40">
                  The Architecture of Silhouette
                </p>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="hero-hair"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.5, ease: LUXURY_EASE }}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 3, ease: LUXURY_EASE }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src="/image/hair_hero.png" 
                className="w-full h-full object-cover brightness-[0.4]"
                alt="Yonce Hair Hero"
              />
            </motion.div>
            
            <div className="relative z-10 text-center flex flex-col items-center p-6 md:p-12">
              <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5, duration: 2.2, ease: LUXURY_EASE }}
                 className="space-y-6 md:space-y-10"
              >
                <h1 className="text-[12vw] md:text-[8rem] font-serif leading-none tracking-[0.05em] py-4 md:py-8 text-white/90">
                  YONCE HAIR
                </h1>
                <div className="h-[1px] w-12 md:w-24 mx-auto bg-white/20" />
                <p className="text-[10px] md:text-sm uppercase tracking-[0.6em] text-white/40 max-w-[280px] mx-auto md:max-w-none italic font-light">
                  Luxury hair designed to complete the silhouette.
                </p>
                
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-12 w-full max-w-[280px] md:max-w-none">
                    <button onClick={() => onNavigate('collections')} className="px-10 py-5 border border-white/10 text-[9px] uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all duration-700 rounded-full bg-white/[0.03] backdrop-blur-2xl">
                        Explore Yonce Hair
                    </button>
                    <button onClick={() => onNavigate('collections')} className="px-10 py-5 border border-white/10 text-[9px] uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all duration-700 rounded-full bg-white/[0.03] backdrop-blur-2xl">
                        Complete The Look
                    </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide Indicators - Restored from original */}
      <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-30">
          {[0, 1].map((i) => (
              <button 
                key={i}
                onClick={() => setHeroIndex(i)}
                className={`w-1 h-8 md:h-12 transition-all duration-1000 relative group`}
              >
                <div className={`absolute inset-0 w-full h-full transition-all duration-1000 ${i === heroIndex ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'bg-white/10 group-hover:bg-white/30'}`} />
              </button>
          ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 2 }}
        className="absolute bottom-12 md:bottom-16 flex flex-col items-center gap-6 z-20"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/10">Explore Archive</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
