'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HAIR_COLLECTION, MOTION_SECTION, LUXURY_EASE } from '@/lib/constants';
import { ChevronDown } from 'lucide-react';

interface HairCarouselItemProps {
  item: any;
  index: number;
  activeIndex: number;
  theme: 'light' | 'dark';
  onNext: () => void;
  onPrev: () => void;
}

const HairCarouselItem: React.FC<HairCarouselItemProps> = ({ item, index, activeIndex, theme, onNext, onPrev }) => {
  const isLight = theme === 'light';
  const offset = index - activeIndex;
  const isActive = offset === 0;

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
      transition={{ duration: 1.2, ease: LUXURY_EASE }}
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
    >
      <motion.div 
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.x > 50) onPrev();
          else if (info.offset.x < -50) onNext();
        }}
        className={`relative w-[85vw] md:w-[30vw] aspect-[3/4] pointer-events-auto group`}
      >
        <div className={`relative w-full h-full overflow-hidden rounded-[4rem] border backdrop-blur-sm transition-all duration-1000 ${isLight ? 'bg-ivory/80 border-black/5 shadow-2xl' : 'bg-smoke/80 border-white/5 shadow-2xl'} group-hover:scale-[1.01]`}>
          {item.isVideo ? (
             <video src={item.src} autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out scale-[1.1] group-hover:scale-[1.2]" />
          ) : (
             <img src={item.itemSrc || item.src} className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out scale-[1.1] group-hover:scale-[1.2]" alt={item.title} />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          
          <div className="absolute bottom-12 left-12 right-12 space-y-4">
             <span className="text-[9px] uppercase tracking-[0.5em] text-white/40 block">{item.category}</span>
             <h3 className="text-2xl md:text-3xl font-serif lowercase italic text-white tracking-tighter">{item.title}</h3>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface YonceHairSectionProps {
  theme: 'light' | 'dark';
  onNavigate: () => void;
}

const YonceHairSection: React.FC<YonceHairSectionProps> = ({ theme, onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isLight = theme === 'light';
  const next = () => setActiveIndex((prev) => (prev + 1) % HAIR_COLLECTION.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + HAIR_COLLECTION.length) % HAIR_COLLECTION.length);

  return (
    <section className={`relative py-32 md:py-48 overflow-hidden transition-colors duration-1000 ${isLight ? 'bg-white' : 'bg-[#0A0A0A]'}`}>
      <div className="max-w-7xl mx-auto px-8 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start mb-24 md:mb-32">
          <motion.div {...MOTION_SECTION}>
            <h2 className={`text-[15vw] md:text-[9rem] font-serif lowercase italic tracking-tighter leading-none ${isLight ? 'text-black/60' : 'text-white/40'}`}>
              yonce hair
            </h2>
          </motion.div>
          
          <div className="md:pt-12 space-y-12 md:text-right md:items-end flex flex-col">
            <motion.p 
              {...MOTION_SECTION}
              transition={{ ...MOTION_SECTION.transition, delay: 0.2 }}
              className={`max-w-xs text-xs md:text-sm leading-loose italic font-light ${isLight ? 'text-black/50' : 'text-white/30'}`}
            >
              Luxury hair pieces designed to complete the silhouette. Crafted for softness, movement, elegance, and feminine presence.
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
            <motion.div 
              {...MOTION_SECTION}
              className={`h-px w-16 ${isLight ? 'bg-black/10' : 'bg-white/10'}`} 
            />
          </div>
        </div>

        <div className="relative h-[60vh] md:h-[80vh] flex items-center justify-center">
          <AnimatePresence initial={false}>
            {HAIR_COLLECTION.map((item, i) => (
              <HairCarouselItem 
                key={item.id} 
                item={item} 
                index={i} 
                activeIndex={activeIndex} 
                theme={theme}
                onNext={next}
                onPrev={prev}
              />
            ))}
          </AnimatePresence>

          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-6 md:px-0 pointer-events-none z-30">
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
        </div>
      </div>
    </section>
  );
};

export default YonceHairSection;
