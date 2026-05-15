'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play, Pause } from 'lucide-react';
import { LUXURY_EASE } from '@/lib/constants';

interface CarouselItemProps {
  src: string;
  index: number;
  activeIndex: number;
  theme: 'light' | 'dark';
  total: number;
  onNext: () => void;
  onPrev: () => void;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ src, index, activeIndex, theme, total, onNext, onPrev }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const isLight = theme === 'light';
  
  const offset = index - activeIndex;
  const isActive = offset === 0;
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
        if (isActive && isPlaying) videoRef.current.play().catch(() => {});
        else videoRef.current.pause();
    }
  }, [isActive, isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={false}
      animate={{
        scale: isActive ? 1 : 0.8,
        opacity: isActive ? 1 : 0.15,
        x: `${offset * 60}%`,
        zIndex: isActive ? 20 : 10,
        filter: isActive ? 'blur(0px)' : 'blur(8px)',
      }}
      transition={{ duration: 1, ease: LUXURY_EASE }}
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
    >
      <motion.div 
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.x > 50) onPrev();
          else if (info.offset.x < -50) onNext();
        }}
        className={`relative w-[85vw] md:w-[35vw] aspect-[4/5] pointer-events-auto group`}
      >
        {isActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className={`absolute -inset-12 rounded-[3rem] blur-[100px] pointer-events-none ${isLight ? 'bg-ash' : 'bg-white'}`} 
          />
        )}

        <div className={`
          relative w-full h-full overflow-hidden rounded-[3rem] md:rounded-[4rem] border backdrop-blur-sm transition-all duration-1000
          ${isLight ? 'bg-ivory/80 border-black/5 shadow-2xl' : 'bg-smoke/80 border-white/5 shadow-2xl'}
          group-hover:scale-[1.01]
        `}>
           <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 6 }}
              className={`absolute top-0 bottom-0 w-1/2 skew-x-[45deg] ${isLight ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' : 'bg-gradient-to-r from-transparent via-white/5 to-transparent'}`}
            />
          </div>

          <video
            ref={videoRef}
            src={src}
            loop
            muted
            playsInline
            preload={Math.abs(offset) < 2 ? "metadata" : "none"}
            className={`w-full h-full object-cover transition-transform duration-[4000ms] ease-out scale-[0.85] group-hover:scale-[0.95] ${isLight ? 'grayscale-0' : 'grayscale-[0.2]'}`}
          />

          <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          {isActive && (
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5 z-20">
              <motion.div 
                className={`h-full ${isLight ? 'bg-black/40' : 'bg-white/40'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-20">
             <button 
                onClick={togglePlay}
                className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-xl border transition-transform hover:scale-110 ${isLight ? 'bg-white/10 border-black/10' : 'bg-black/10 border-white/10'}`}
             >
                {isPlaying ? <Pause size={18} className={isLight ? 'text-black/40' : 'text-white/40'} /> : <Play size={18} className={isLight ? 'text-black/40' : 'text-white/40'} fill="currentColor" />}
             </button>
          </div>

          <div className="absolute top-8 left-8 z-20 overflow-hidden">
            <span className={`text-[9px] uppercase tracking-[0.5em] font-light ${isLight ? 'text-black/30' : 'text-white/30'}`}>
               Volume 02 — Fragment {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface CinematicCarouselProps {
  videos: string[];
  theme: 'light' | 'dark';
}

const CinematicCarousel: React.FC<CinematicCarouselProps> = ({ videos, theme }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isLight = theme === 'light';

  const next = () => setActiveIndex((prev) => (prev + 1) % videos.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);

  // Improved wheel handling for both vertical and horizontal scroll
  const handleWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 30) {
      if (delta > 0) next();
      else prev();
    }
  };

  return (
    <div 
      onWheel={handleWheel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden cursor-ew-resize"
    >
      <div className="relative w-full h-full max-w-[100vw]">
        <AnimatePresence initial={false}>
          {videos.map((src, i) => (
            <CarouselItem 
              key={src} 
              src={src} 
              index={i} 
              activeIndex={activeIndex} 
              theme={theme}
              total={videos.length}
              onNext={next}
              onPrev={prev}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-6 md:px-12 pointer-events-none z-30">
          <button 
            onClick={prev}
            className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full border pointer-events-auto backdrop-blur-md transition-all hover:scale-110 active:scale-95 ${isLight ? 'border-black/5 bg-white/5' : 'border-white/5 bg-black/5'}`}
          >
            <ChevronDown className="rotate-90 w-4 h-4 md:w-5 md:h-5 text-current opacity-30" />
          </button>
          <button 
            onClick={next}
            className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full border pointer-events-auto backdrop-blur-md transition-all hover:scale-110 active:scale-95 ${isLight ? 'border-black/5 bg-white/5' : 'border-white/5 bg-black/5'}`}
          >
            <ChevronDown className="-rotate-90 w-4 h-4 md:w-5 md:h-5 text-current opacity-30" />
          </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-700 pointer-events-auto ${i === activeIndex ? 'w-8 bg-current' : 'w-4 bg-current/20 hover:bg-current/40'}`}
            />
          ))}
      </div>
    </div>
  );
};

export default CinematicCarousel;
