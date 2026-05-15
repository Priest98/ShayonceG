'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
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
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const router = useRouter();

  // Scroll-aware behavior: Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [menuOpen]);

  return (
    <>
      <motion.nav 
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.8, ease: LUXURY_EASE }}
        className={`fixed top-0 left-0 w-full p-5 md:p-12 z-50 flex justify-between items-center pointer-events-none transition-colors duration-1000 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="pointer-events-auto"
        >
          <span 
            onClick={() => router.push('/')}
            className="text-xs md:text-xl tracking-[0.5em] font-serif hover:opacity-50 transition-opacity cursor-pointer uppercase"
          >
            SHAYONCE G
          </span>
        </motion.div>
        
        <div className="flex items-center gap-3 md:gap-16 pointer-events-auto">
          {!menuOpen && (
             <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`hidden md:block text-[9px] uppercase tracking-[0.4em] transition-colors ${theme === 'dark' ? 'text-white/20 hover:text-white' : 'text-black/40 hover:text-black'}`}
             >
                {theme === 'dark' ? 'Light' : 'Dark'}
             </button>
          )}

          <div className="flex items-center gap-3 md:gap-6">
            <button
                onClick={() => setIsCartOpen(true)}
                className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center backdrop-blur-3xl transition-all active:scale-90 ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}
            >
                <ShoppingBag size={14} className="opacity-40" />
                <span className="absolute text-[8px] font-serif top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-0.5">{cartCount}</span>
                {cartCount > 0 && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-1 right-1 w-2 h-2 bg-[#D4AF37] rounded-full" />
                )}
            </button>

            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`group relative w-10 h-10 md:w-14 md:h-14 flex items-center justify-center border rounded-full transition-all duration-700 ${menuOpen ? 'bg-white border-white' : (theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10')} backdrop-blur-3xl active:scale-90`}
            >
                {menuOpen ? <X size={14} className="text-black" /> : (
                <div className="space-y-1 md:space-y-1.5 flex flex-col items-end pr-0.5">
                    <div className={`w-3.5 md:w-5 h-[1px] ${theme === 'dark' ? 'bg-white/40' : 'bg-black/40'} group-hover:w-8 transition-all duration-700`} />
                    <div className={`w-5 md:w-8 h-[1px] ${theme === 'dark' ? 'bg-white/40' : 'bg-black/40'} group-hover:w-5 transition-all duration-700`} />
                </div>
                )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Cinematic Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[45] bg-onyx/98 backdrop-blur-3xl flex flex-col items-center justify-center p-6 md:p-8 overflow-y-auto"
          >
             {/* Abstract Background for Menu */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                <motion.div 
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/2 -right-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent)] blur-3xl" 
                />
            </div>

            <div className="w-full max-w-7xl flex flex-col md:flex-row gap-12 md:gap-24 justify-between h-full pt-24 md:pt-32 pb-12 relative z-10">
              <div className="flex flex-col gap-2 md:gap-4 flex-1">
                {["Collections", "Editorial", "Archive", "Atmosphere", "Private"].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 + 0.2, duration: 1, ease: LUXURY_EASE }}
                    className="group flex items-center gap-4 md:gap-10 cursor-pointer text-white w-fit"
                    onClick={() => {
                        if (item === "Collections") router.push('/collections');
                        else if (item === "Private") router.push('/login');
                        else router.push('/');
                        setMenuOpen(false);
                    }}
                  >
                    <span className="text-[7px] md:text-[10px] text-white/10 font-mono tracking-widest">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-4xl sm:text-5xl md:text-8xl text-white/30 group-hover:text-white transition-all duration-1000 font-serif lowercase tracking-tighter hover:italic">
                      {item}
                    </h3>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex flex-col justify-end gap-10 md:gap-16 max-w-sm md:text-right md:items-end">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 1.5 }}
                  className="space-y-6 md:space-y-10"
                >
                    <div className="flex md:hidden gap-6 pb-6 border-b border-white/5">
                        <button 
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="text-[9px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors"
                        >
                            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    </div>

                    <p className="text-white/20 text-[10px] md:text-sm leading-loose font-light italic max-w-[240px] md:max-w-none">
                    "We do not design fashion; we capture the space between the threads." — Manifesto MMXXVI
                    </p>
                    
                    <div className="flex flex-col gap-4">
                        <span className="text-[8px] uppercase tracking-[0.6em] text-white/10 block">Lagos — Paris — London</span>
                        <div className="flex gap-8 md:justify-end">
                            {["Instagram", "Editorial", "Inquiry"].map(link => (
                                <span key={link} className="text-[9px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors cursor-pointer">{link}</span>
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
