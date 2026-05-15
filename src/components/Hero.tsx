'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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
  const videoRef = useRef<HTMLVideoElement>(null);

  // Parallax effect
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 300]);
  const scaleParallax = useTransform(scrollY, [0, 500], [1, 1.1]);

  const nextSlide = useCallback(() => {
    setHeroIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setHeroIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (heroIndex === 0 && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [heroIndex]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden z-10 bg-black"
    >
      <AnimatePresence mode="wait">
        <motion.div 
            key={heroIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: LUXURY_EASE }}
            className="absolute inset-0 w-full h-full"
        >
            <motion.div 
                style={{ y: yParallax, scale: scaleParallax }}
                className="absolute inset-0 w-full h-full bg-black"
            >
                {heroIndex === 0 ? (
                    <video
                        ref={videoRef}
                        src="/video/hero.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover brightness-[0.4] opacity-80"
                    />
                ) : (
                    <Image 
                        src="/image/hair_hero.png" 
                        fill
                        priority
                        className="object-cover brightness-[0.45] opacity-90"
                        alt="Yonce Hair Hero"
                        sizes="100vw"
                    />
                )}
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />
            
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 2, ease: LUXURY_EASE }}
                className="space-y-6 md:space-y-12 max-w-4xl"
              >
                <motion.span 
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-[8px] md:text-[10px] uppercase tracking-[1em] block text-white/40"
                >
                    {heroIndex === 0 ? "The Architecture" : "The Silk Edit"}
                </motion.span>
                
                <h1 className="text-5xl sm:text-6xl md:text-[10rem] font-serif leading-[0.9] tracking-tighter uppercase text-white drop-shadow-2xl">
                   {heroIndex === 0 ? "Shayonce G" : "Yonce Hair"}
                </h1>
                
                <div className="h-[1px] w-8 md:w-24 mx-auto bg-white/20" />
                
                <p className="text-[10px] md:text-sm uppercase tracking-[0.5em] text-white/40 max-w-[280px] md:max-w-none mx-auto italic font-light">
                   {heroIndex === 0 ? "The space between silhouettes." : "Completion of the feminine form."}
                </p>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1.5 }}
                    className="flex flex-col sm:flex-row gap-4 md:gap-8 mt-8 md:mt-12 justify-center items-center"
                >
                    <button 
                        onClick={() => onNavigate('collections')} 
                        className="group relative px-10 py-5 bg-white text-black text-[9px] uppercase tracking-[0.4em] font-bold rounded-full transition-all active:scale-95 shadow-2xl overflow-hidden pointer-events-auto"
                    >
                        <span className="relative z-10">Enter Archive</span>
                        <motion.div className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                    <button 
                        onClick={() => onNavigate('collections')} 
                        className="px-10 py-5 border border-white/20 text-[9px] uppercase tracking-[0.4em] text-white hover:bg-white/10 transition-all rounded-full backdrop-blur-xl active:scale-95 pointer-events-auto"
                    >
                        Explore Pieces
                    </button>
                </motion.div>
              </motion.div>
            </div>
        </motion.div>
      </AnimatePresence>

      {/* Luxury Slide Controls */}
      <div className="absolute inset-x-6 md:inset-x-12 bottom-24 md:top-1/2 md:-translate-y-1/2 flex justify-between items-center z-40 pointer-events-none md:block">
          <button 
            onClick={prevSlide}
            className="md:absolute md:left-0 w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-xl pointer-events-auto transition-all active:scale-75 group"
          >
            <ChevronLeft size={16} className="text-white/30 group-hover:text-white transition-colors" />
          </button>
          <button 
            onClick={nextSlide}
            className="md:absolute md:right-0 w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-xl pointer-events-auto transition-all active:scale-75 group"
          >
            <ChevronRight size={16} className="text-white/30 group-hover:text-white transition-colors" />
          </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-40">
          {[0, 1].map((i) => (
              <button 
                key={i}
                onClick={() => setHeroIndex(i)}
                className="group relative py-4 px-2 pointer-events-auto"
              >
                <div className={`w-8 md:w-12 h-[2px] transition-all duration-1000 ${i === heroIndex ? 'bg-white shadow-[0_0_20px_#fff]' : 'bg-white/20 group-hover:bg-white/40'}`} />
              </button>
          ))}
      </div>

      {/* Optimized Swipe Layer for Mobile - Horizontal Only to preserve vertical scroll */}
      <motion.div 
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.x > 50) prevSlide();
          else if (info.offset.x < -50) nextSlide();
        }}
        className="absolute inset-0 z-0 pointer-events-auto cursor-ew-resize"
      />
    </section>
  );
};

export default Hero;
