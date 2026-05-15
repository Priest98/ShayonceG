'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import { TARI_VIDEOS, MOTION_SECTION } from '@/lib/constants';

interface CollectionsPageProps {
  onBack: () => void;
  theme: 'light' | 'dark';
  onAddToCart: (product: any) => void;
  cartCount: number;
  tariProducts: any[];
  hairProducts: any[];
}

const CollectionsPage: React.FC<CollectionsPageProps> = ({ 
  onBack, 
  theme, 
  onAddToCart, 
  cartCount,
  tariProducts,
  hairProducts
}) => {
  const isLight = theme === 'light';
  const containerRef = useRef(null);

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen w-full ${isLight ? 'bg-ivory' : 'bg-onyx'}`}
    >
      <nav className="fixed top-0 left-0 w-full p-8 md:p-12 z-[70] flex justify-between items-center pointer-events-none">
        <button 
          onClick={onBack}
          className="pointer-events-auto flex items-center gap-4 group"
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${isLight ? 'border-black/10 bg-black/5' : 'border-white/10 bg-white/5'} backdrop-blur-2xl transition-all group-hover:scale-110 shadow-xl`}>
             <MoveRight className="rotate-180 w-4 h-4" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">Back</span>
        </button>

        <div className="flex items-center gap-6 pointer-events-auto">
            <div className={`relative w-12 h-12 rounded-full border flex items-center justify-center backdrop-blur-2xl transition-all hover:scale-110 ${isLight ? 'border-black/10 bg-black/5 text-black' : 'border-white/10 bg-white/5 text-white'}`}>
                <span className="text-[10px] tracking-widest font-serif">{cartCount}</span>
                {cartCount > 0 && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 w-3 h-3 bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37]" />
                )}
            </div>
        </div>
      </nav>

      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video src={TARI_VIDEOS[1]} autoPlay loop muted playsInline className="w-full h-full object-cover brightness-[0.3]" />
        </div>
        <div className="relative z-10 text-center space-y-8 px-8">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ duration: 1.5 }}
            className="text-[10px] uppercase tracking-[1em] block"
          >
            Curated Selection
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="text-6xl md:text-[12rem] font-serif lowercase italic tracking-tighter"
          >
            Collections
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.8, duration: 2 }}
            className="text-[10px] md:text-xs uppercase tracking-[0.6em] max-w-sm mx-auto leading-loose"
          >
            Fashion and luxury hair designed for presence and feminine expression.
          </motion.p>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="pt-24 opacity-20"
          >
            <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Tari Set Collection */}
      <section id="tari-collection" className="py-32 md:py-48 px-8 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-32">
            <div className="text-center space-y-6">
                <span className="text-[10px] tracking-[0.8em] text-white/20 uppercase">Volume 01</span>
                <h2 className="text-5xl md:text-9xl font-serif lowercase italic tracking-tighter opacity-40">Tari Set Collection</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
                {tariProducts.map((product, i) => (
                    <motion.div
                        key={product.id}
                        {...MOTION_SECTION}
                        transition={{ ...MOTION_SECTION.transition, delay: i * 0.1 }}
                        className={`group relative p-8 md:p-16 border ${isLight ? 'border-black/5 bg-white/40' : 'border-white/5 bg-white/[0.02]'} backdrop-blur-3xl overflow-hidden transition-all duration-1000`}
                    >
                        <div className="aspect-[3/4] overflow-hidden rounded-[2rem] mb-12 relative">
                            {product.isVideo ? (
                                <video src={product.src} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3000ms]" />
                            ) : (
                                <img src={product.src} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3000ms]" alt={product.title} />
                            )}
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-end">
                                <h3 className="text-2xl md:text-3xl font-serif lowercase italic opacity-60 group-hover:opacity-100 transition-opacity">{product.title}</h3>
                                <span className="text-xs tracking-[0.2em] font-light text-[#D4AF37]">₦{product.price.toLocaleString()}</span>
                            </div>
                            <p className="text-[10px] md:text-xs leading-loose italic opacity-30 group-hover:opacity-50 transition-opacity font-light max-w-xs">{product.desc || product.description}</p>
                            
                            <div className="flex gap-4 pt-4">
                                <button 
                                    onClick={() => onAddToCart(product)}
                                    className={`flex-1 py-5 text-[9px] uppercase tracking-[0.4em] transition-all duration-1000 rounded-full border backdrop-blur-2xl shadow-xl ${isLight ? 'bg-black text-white border-black/10' : 'bg-white text-black border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]'}`}
                                >
                                    Add to Cart
                                </button>
                                <button className={`px-8 py-5 text-[9px] uppercase tracking-[0.4em] transition-all duration-700 rounded-full border backdrop-blur-2xl ${isLight ? 'border-black/10 hover:bg-black/5' : 'border-white/10 hover:bg-white/5'}`}>
                                    Details
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Yonce Hair Collection */}
      <section id="hair-collection" className={`py-32 md:py-48 px-8 md:px-12 relative overflow-hidden ${isLight ? 'bg-white/5' : 'bg-white/[0.01]'}`}>
        <div className="max-w-7xl mx-auto space-y-32">
            <div className="text-center space-y-6">
                <span className="text-[10px] tracking-[0.8em] text-white/20 uppercase">Volume 02</span>
                <h2 className="text-5xl md:text-9xl font-serif lowercase italic tracking-tighter opacity-40">Yonce Hair Collection</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {hairProducts.map((product, i) => (
                    <motion.div
                        key={product.id}
                        {...MOTION_SECTION}
                        transition={{ ...MOTION_SECTION.transition, delay: i * 0.1 }}
                        className={`group relative p-6 rounded-[3rem] border ${isLight ? 'border-black/5 bg-white/60 shadow-xl' : 'border-white/5 bg-black/40 shadow-2xl'} backdrop-blur-3xl overflow-hidden transition-all duration-1000 hover:translate-y-[-10px]`}
                    >
                        <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-8 relative">
                             <img src={product.src} className="w-full h-full object-cover brightness-[0.8] group-hover:scale-105 transition-all duration-[2000ms]" alt={product.title} />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-40" />
                        </div>

                        <div className="space-y-6 px-4 pb-6">
                            <div className="space-y-2">
                                <h3 className="text-xl md:text-2xl font-serif lowercase italic opacity-80">{product.title}</h3>
                                <span className="text-[10px] tracking-[0.4em] font-serif text-[#D4AF37]">₦{product.price.toLocaleString()}</span>
                            </div>
                            <p className="text-[9px] md:text-[10px] leading-loose opacity-30 italic font-light line-clamp-2">{product.desc || product.description}</p>
                            
                            <button 
                                onClick={() => onAddToCart(product)}
                                className={`w-full py-5 text-[8px] uppercase tracking-[0.4em] transition-all duration-1000 rounded-full border backdrop-blur-2xl shadow-xl ${isLight ? 'bg-black text-white border-black/10' : 'bg-white text-black border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]'}`}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      <footer className="py-24 text-center">
         <span className="text-[9px] uppercase tracking-[0.8em] opacity-20">Shayonce G Atelier MMXXVI</span>
      </footer>
    </motion.div>
  );
};

export default CollectionsPage;
