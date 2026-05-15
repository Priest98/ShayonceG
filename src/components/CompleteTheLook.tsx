'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MOTION_SECTION } from '@/lib/constants';

interface CompleteTheLookProps {
  theme: 'light' | 'dark';
  onNavigate: () => void;
}

const CompleteTheLook: React.FC<CompleteTheLookProps> = ({ theme, onNavigate }) => {
  const isLight = theme === 'light';
  return (
    <section className={`py-32 md:py-48 px-8 text-center relative overflow-hidden ${isLight ? 'bg-ivory' : 'bg-[#080808]'}`}>
        <div className="relative z-10 space-y-16">
            <motion.div {...MOTION_SECTION}>
                <h2 className={`text-[12vw] md:text-[8rem] font-serif lowercase italic tracking-tighter mb-8 ${isLight ? 'text-black/60' : 'text-white/40'}`}>
                    Complete The Look.
                </h2>
                <p className={`text-[10px] md:text-sm leading-loose italic font-light max-w-[280px] md:max-w-lg mx-auto ${isLight ? 'text-black/40' : 'text-white/20'}`}>
                    Custom fashion and luxury hair curated into one refined feminine experience.
                </p>
            </motion.div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-12 py-5 text-[9px] uppercase tracking-[0.6em] transition-all duration-700 ${isLight ? 'bg-black text-white' : 'bg-white text-black'} rounded-full w-full max-w-[280px] md:w-auto`}
                >
                    Book Consultation
                </motion.button>
                <motion.button 
                    onClick={onNavigate}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-12 py-5 text-[9px] uppercase tracking-[0.6em] border transition-all duration-700 ${isLight ? 'border-black/10 text-black' : 'border-white/10 text-white'} rounded-full w-full max-w-[280px] md:w-auto`}
                >
                    Explore Collections
                </motion.button>
            </div>
        </div>
        
        {/* Subtle Espresso/Wine gradient for depth */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#2D1B1B,transparent)]" />
        </div>
    </section>
  );
};

export default CompleteTheLook;
