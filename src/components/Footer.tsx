'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MOTION_SECTION } from '@/lib/constants';

const Footer = () => {
  return (
    <footer className="min-h-[80vh] md:min-h-screen bg-onyx flex flex-col items-center justify-center px-6 md:px-8 text-center relative overflow-hidden py-32 md:py-48">
         <div className="relative z-10 space-y-24 md:space-y-32 w-full">
            <motion.h2 
              {...MOTION_SECTION}
              className="text-3xl sm:text-4xl md:text-8xl max-w-5xl mx-auto leading-tight italic text-white/30 font-serif lowercase tracking-tighter"
            >
               "We do not design fashion; we capture the space between the threads."
            </motion.h2>
            
            <div className="flex flex-col items-center gap-12 md:gap-16">
                <motion.button 
                    {...MOTION_SECTION}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 md:px-20 py-8 border border-white/10 text-[9px] md:text-[10px] uppercase tracking-[0.8em] md:tracking-[1em] hover:border-white/40 transition-all duration-1000 bg-white/[0.03] backdrop-blur-2xl rounded-full shadow-2xl"
                >
                    Enter Archive
                </motion.button>
                
                <div className="flex flex-col gap-10 md:gap-12 items-center w-full">
                    <motion.div 
                      {...MOTION_SECTION}
                      className="flex flex-wrap justify-center gap-8 md:gap-24 text-[8px] md:text-[10px] uppercase tracking-[0.5em] md:tracking-[0.6em] text-white/20"
                    >
                        {["Inquiries", "Manifesto", "Sustain", "Legal"].map((link) => (
                           <span key={link} className="hover:text-white transition-colors duration-700 cursor-pointer">{link}</span>
                        ))}
                    </motion.div>
                    
                    <div className="h-px w-16 md:w-24 bg-white/5" />
                    
                    <div className="flex gap-10 md:gap-12">
                        {["IG", "TW", "FB"].map(s => (
                            <span key={s} className="text-[9px] tracking-widest text-white/10 hover:text-white transition-colors cursor-pointer">{s}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        
        <div className="absolute bottom-8 md:bottom-12 w-full flex flex-col md:flex-row justify-between px-8 md:px-12 gap-4 text-[7px] md:text-[8px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-white/5 font-mono">
            <span>© SHAYONCE G MMXXVI</span>
            <span className="hidden md:inline">— ALL RIGHTS RESERVED —</span>
            <span>Crafted in Lagos</span>
        </div>
        
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
           <div className="absolute inset-0 bg-[#020202]" />
           <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent)]" />
        </div>
    </footer>
  );
};

export default Footer;
