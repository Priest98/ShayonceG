'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { VIDEOS, MOTION_SECTION } from '@/lib/constants';

interface ConsultationProps {
  theme: 'light' | 'dark';
}

const Consultation: React.FC<ConsultationProps> = ({ theme }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const isLight = theme === 'light';

  return (
    <section ref={ref} className={`relative min-h-screen w-full flex items-center justify-center ${isLight ? 'bg-ivory' : 'bg-onyx'} px-8 py-32 overflow-hidden`}>
        {isInView && (
            <video 
                src={VIDEOS[3]} 
                autoPlay 
                loop 
                muted 
                playsInline 
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover opacity-5 filter blur-3xl grayscale"
            />
        )}
        
        <div className="max-w-6xl w-full relative z-10 flex flex-col lg:flex-row gap-24 items-center">
        <div className="w-full lg:flex-1 space-y-12">
            <motion.div {...MOTION_SECTION}>
                <span className={`text-[10px] tracking-[0.8em] ${isLight ? 'text-black/20' : 'text-white/20'} uppercase mb-8 block font-light`}>Experience</span>
                <h2 className={`text-5xl md:text-8xl font-serif lowercase italic tracking-tighter leading-none ${isLight ? 'text-black/60' : 'text-white/40'}`}>Virtual<br/>Consultation</h2>
            </motion.div>
            
            <motion.p 
                {...MOTION_SECTION}
                transition={{ ...MOTION_SECTION.transition, delay: 0.2 }}
                className={`${isLight ? 'text-black/30' : 'text-white/30'} text-sm md:text-base leading-[2.2] font-light italic max-w-sm`}
            >
                Connect with our master tailors from anywhere in the world. A private digital dialogue designed to capture your aesthetic intent.
            </motion.p>
        </div>

        <motion.div 
            {...MOTION_SECTION}
            transition={{ ...MOTION_SECTION.transition, delay: 0.3 }}
            className={`w-full lg:flex-1 max-w-xl p-12 md:p-20 border ${isLight ? 'border-black/5 bg-black/[0.02]' : 'border-white/5 bg-white/[0.01]'} backdrop-blur-3xl relative group overflow-hidden`}
        >
            <div className="space-y-10 md:space-y-12">
                <div className="space-y-6">
                    <label className={`text-[10px] uppercase tracking-[0.6em] ${isLight ? 'text-black/20' : 'text-white/20'} block`}>Full Identity</label>
                    <input type="text" placeholder="Your Name" className={`w-full bg-transparent border-b ${isLight ? 'border-black/5 text-black' : 'border-white/5 text-white'} py-6 text-sm tracking-[0.2em] outline-none transition-all duration-700 placeholder:opacity-20`} />
                </div>
                <div className="space-y-6">
                    <label className={`text-[10px] uppercase tracking-[0.6em] ${isLight ? 'text-black/20' : 'text-white/20'} block`}>Contact</label>
                    <input type="email" placeholder="Email Address" className={`w-full bg-transparent border-b ${isLight ? 'border-black/5 text-black' : 'border-white/5 text-white'} py-6 text-sm tracking-[0.2em] outline-none transition-all duration-700 placeholder:opacity-20`} />
                </div>
                
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-8 text-[11px] uppercase tracking-[0.8em] transition-all duration-1000 mt-8 rounded-full border backdrop-blur-xl ${isLight ? 'bg-black text-white border-black/10' : 'bg-white text-black border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]'}`}
                >
                    Apply for Access
                </motion.button>
            </div>
        </motion.div>
        </div>
    </section>
  );
};

export default Consultation;
