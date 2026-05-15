'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LUXURY_EASE } from '@/lib/constants';

interface NavbarProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  currentPage: string;
  setCurrentPage: (page: 'home' | 'collections') => void;
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, setTheme, currentPage, setCurrentPage, cartCount, setIsCartOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [menuOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full p-6 md:p-12 z-50 flex justify-between items-center pointer-events-none transition-all duration-700 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1.5 }}
          className="pointer-events-auto"
        >
          <span 
            onClick={() => router.push('/')}
            className="text-base md:text-xl tracking-[0.4em] font-serif hover:opacity-50 transition-opacity cursor-pointer"
          >
            SHAYONCE G
          </span>
        </motion.div>
        
        <div className="flex items-center gap-6 md:gap-16 pointer-events-auto">
          {!menuOpen && (
             <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`hidden md:block text-[9px] uppercase tracking-[0.4em] transition-colors ${theme === 'dark' ? 'text-white/20 hover:text-white' : 'text-black/40 hover:text-black'}`}
             >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
             </button>
          )}

          <div className="flex items-center gap-6">
            <button
                onClick={() => setIsCartOpen(true)}
                className={`relative w-12 h-12 rounded-full border flex items-center justify-center backdrop-blur-xl transition-all hover:scale-110 ${theme === 'dark' ? 'border-white/10 bg-white/5 text-white' : 'border-black/10 bg-black/5 text-black'}`}
            >
                <span className="text-[10px] tracking-widest font-serif">{cartCount}</span>
                {cartCount > 0 && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 w-3 h-3 bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37]" />
                )}
            </button>

            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`group relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border rounded-full transition-all duration-700 ${menuOpen ? 'bg-white border-white' : (theme === 'dark' ? 'bg-black/20 border-white/10' : 'bg-white/20 border-black/10')} backdrop-blur-xl`}
            >
                {menuOpen ? <X size={16} className="text-black" /> : (
                <div className="space-y-1.5 flex flex-col items-end">
                    <div className={`w-5 h-[1px] ${theme === 'dark' ? 'bg-white/60' : 'bg-black/60'} group-hover:w-8 transition-all duration-700`} />
                    <div className={`w-8 h-[1px] ${theme === 'dark' ? 'bg-white/60' : 'bg-black/60'} group-hover:w-5 transition-all duration-700`} />
                </div>
                )}
            </button>
          </div>
        </div>
      </nav>

      {/* Cinematic Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[45] bg-onyx/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8 overflow-hidden"
          >
            <div className="w-full max-w-7xl flex flex-col md:flex-row gap-16 md:gap-24 justify-between h-full pt-32 pb-12">
              <div className="flex flex-col gap-6 md:gap-4 flex-1">
                {["Collections", "Editorial", "Exploration", "Archive", "Atmosphere"].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 1, ease: LUXURY_EASE }}
                    className="group flex items-center gap-6 md:gap-10 cursor-pointer text-white"
                    onClick={() => {
                        if (item === "Collections") router.push('/collections');
                        else router.push('/');
                        setMenuOpen(false);
                    }}
                  >
                    <span className="text-[9px] md:text-[10px] text-white/20 font-mono tracking-widest">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-4xl md:text-8xl text-white/40 group-hover:text-white group-hover:italic transition-all duration-700 font-serif lowercase tracking-tighter">
                      {item}
                    </h3>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex flex-col justify-end gap-12 md:gap-16 max-w-sm md:text-right md:items-end">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-10"
                >
                    <button 
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="md:hidden text-[10px] uppercase tracking-[0.5em] text-white/40 hover:text-white transition-colors py-4 border-b border-white/10 w-full text-left"
                    >
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </button>

                    <p className="text-white/30 text-xs md:text-sm leading-loose font-light italic">
                    Capturing the profound truths found in the space between silhouettes. A visual study of absence and presence.
                    </p>
                    
                    <div className="flex flex-col gap-4">
                        <span className="text-[9px] uppercase tracking-[0.6em] text-white/10">Lagos — Paris — London</span>
                        <div className="flex gap-8 md:justify-end">
                            {["Instagram", "Twitter", "Email"].map(social => (
                                <span key={social} className="text-[9px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors cursor-pointer">{social}</span>
                            ))}
                        </div>
                    </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
