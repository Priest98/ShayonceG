'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { VIDEOS, LUXURY_EASE } from '@/lib/constants';

interface HeroProps {
  onNavigate: (page: 'home' | 'collections') => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [heroIndex, setHeroIndex] = useState(0);
  const totalSlides = 2;
  const lastScrollTime = useRef(0);
  const containerRef = useRef<HTMLElement>(null);

  const nextSlide = useCallback(() => {
    setHeroIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setHeroIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Automatic Sliding
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Manual Sliding - Wheel Logic (Robust)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Ensure window is defined
      if (typeof window === 'undefined') return;
      
      // If we are deep into the page, don't intercept
      if (window.scrollY > 100) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 800) return; // Debounce

      if (Math.abs(e.deltaY) > 20) {
        // Intercept and slide
        if (e.deltaY > 0) nextSlide();
        else prevSlide();
        
        lastScrollTime.current = now;
        
        // Prevent page scroll only if we are at the top and sliding
        if (window.scrollY < 50) {
          e.preventDefault();
        }
      }
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (el) el.removeEventListener('wheel', handleWheel);
    };
  }, [nextSlide, prevSlide]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden z-10 select-none touch-none"
    >
      <AnimatePresence mode="wait">
        {heroIndex === 0 ? (
          <motion.div 
            key="hero-shayonce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: LUXURY_EASE }}
            className="absolute inset-0 w-full h-full"
          >
            <motion.div 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 3, ease: LUXURY_EASE }}
              className="absolute inset-0 w-full h-full bg-black"
            >
              <video
                src={VIDEOS[0]}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover brightness-[0.35] opacity-80"
              />
            </motion.div>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 2.2, ease: LUXURY_EASE }}
                className="text-center space-y-6 md:space-y-10 px-6"
              >
                <h1 className="text-5xl md:text-[8rem] font-serif leading-none tracking-[0.05em] py-2 md:py-8 uppercase text-white">
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: LUXURY_EASE }}
            className="absolute inset-0 w-full h-full"
          >
            <motion.div 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 3, ease: LUXURY_EASE }}
              className="absolute inset-0 w-full h-full bg-black"
            >
              <Image 
                src="/image/hair_hero.png" 
                fill
                priority
                className="object-cover brightness-[0.4] opacity-90"
                alt="Yonce Hair Hero"
                sizes="100vw"
              />
            </motion.div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5, duration: 2.2, ease: LUXURY_EASE }}
                 className="text-center space-y-6 md:space-y-10 px-6 max-w-4xl"
              >
                <h1 className="text-5xl md:text-[8rem] font-serif leading-none tracking-[0.05em] py-4 md:py-8 text-white uppercase">
                  Yonce Hair
                </h1>
                <div className="h-[1px] w-12 md:w-24 mx-auto bg-white/20" />
                <p className="text-[10px] md:text-sm uppercase tracking-[0.6em] text-white/40 max-w-[280px] mx-auto md:max-w-none italic font-light">
                  Luxury hair designed to complete the silhouette.
                </p>
                
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-12 justify-center">
                    <button onClick={() => onNavigate('collections')} className="px-10 py-5 border border-white/10 text-[9px] uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all duration-700 rounded-full bg-white/[0.03] backdrop-blur-2xl text-white">
                        Explore Yonce Hair
                    </button>
                    <button onClick={() => onNavigate('collections')} className="px-10 py-5 border border-white/10 text-[9px] uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all duration-700 rounded-full bg-white/[0.03] backdrop-blur-2xl text-white">
                        Complete The Look
                    </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manual Controls */}
      <div className="absolute inset-x-8 md:inset-x-12 top-1/2 -translate-y-1/2 flex justify-between items-center z-40 pointer-events-none text-white">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-xl pointer-events-auto transition-all hover:scale-110 active:scale-95 group"
          >
            <ChevronLeft size={20} className="text-white/20 group-hover:text-white transition-colors" />
          </button>
          <button 
            onClick={nextSlide}
            className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-xl pointer-events-auto transition-all hover:scale-110 active:scale-95 group"
          >
            <ChevronRight size={20} className="text-white/20 group-hover:text-white transition-colors" />
          </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-40">
          {[0, 1].map((i) => (
              <button 
                key={i}
                onClick={() => setHeroIndex(i)}
                className={`w-1.5 h-12 transition-all duration-1000 relative group rounded-full overflow-hidden`}
              >
                <div className={`absolute inset-0 w-full h-full transition-all duration-1000 ${i === heroIndex ? 'bg-white shadow-[0_0_20px_#fff]' : 'bg-white/10 group-hover:bg-white/40'}`} />
              </button>
          ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 2 }}
        className="absolute bottom-12 flex flex-col items-center gap-6 z-20 pointer-events-none"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">Slide to Explore</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
      
      {/* Universal Swipe Support */}
      <motion.div 
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 50) prevSlide();
          else if (info.offset.y < -50) nextSlide();
        }}
        className="absolute inset-0 z-0 pointer-events-auto cursor-ns-resize"
      />
    </section>
  );
};

export default Hero;
