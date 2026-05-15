'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveRight, Plus, ShoppingBag, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LUXURY_EASE, MOTION_SECTION } from '@/lib/constants';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('./Footer'), { ssr: false });

interface Product {
  id: string;
  title: string;
  price: number;
  src: string;
  is_video?: boolean;
  isVideo?: boolean;
  desc?: string;
  description?: string;
}

interface CollectionsPageProps {
  theme: 'light' | 'dark';
  onAddToCart: (product: any) => void;
  cartCount: number;
  products: Product[];
  title: string;
  subtitle?: string;
}

const CollectionsPage: React.FC<CollectionsPageProps> = ({ 
  theme, 
  onAddToCart, 
  cartCount,
  products,
  title,
  subtitle
}) => {
  const isLight = theme === 'light';
  const containerRef = useRef(null);
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Lock scroll when modal is open
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProduct]);

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen w-full transition-colors duration-1000 ${isLight ? 'bg-ivory' : 'bg-[#050505]'} overflow-x-hidden`}
    >
      {/* Premium Back Navigation */}
      <nav className="fixed top-0 left-0 w-full p-4 md:p-12 z-[70] flex justify-between items-center pointer-events-none">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
          onClick={() => router.push('/collections')}
          className="pointer-events-auto flex items-center gap-3 group"
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border backdrop-blur-3xl transition-all group-active:scale-90 ${isLight ? 'border-black/5 bg-black/[0.02]' : 'border-white/5 bg-white/[0.02]'}`}>
             <MoveRight className="rotate-180 w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] opacity-30 group-hover:opacity-100 transition-opacity hidden sm:block">Archive</span>
        </motion.button>
      </nav>

      {/* Hero Banner - Optimized for Retina & Mobile Height */}
      <section className="relative h-[65vh] md:h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <AnimatePresence>
          {products.length > 0 && (
            <motion.div 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2.5, ease: LUXURY_EASE }}
              className="absolute inset-0"
            >
              {products[0].is_video || products[0].isVideo ? (
                <video src={products[0].src} autoPlay loop muted playsInline className="w-full h-full object-cover brightness-[0.2]" />
              ) : (
                <img src={products[0].src} className="w-full h-full object-cover brightness-[0.2]" alt="Hero" />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]/40" />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="relative z-10 text-center space-y-4 md:space-y-8 px-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.3, y: 0 }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className="text-[8px] md:text-[10px] uppercase tracking-[1em] block font-light"
          >
            Archive Series
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.2, ease: LUXURY_EASE }}
            className="text-5xl sm:text-6xl md:text-[12rem] font-serif lowercase italic tracking-tighter leading-none"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 1.2, duration: 2 }}
            className="text-[9px] md:text-xs uppercase tracking-[0.4em] max-w-[260px] md:max-w-sm mx-auto leading-loose italic"
          >
            {subtitle || "Captured in the stillness of movement."}
          </motion.p>
        </div>
      </section>

      {/* Product Gallery Grid - Optimized Spacing & Touch Targets */}
      <section className="py-12 md:py-64 px-4 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 md:gap-y-32 gap-x-8 md:gap-x-12">
            {products.map((product, i) => (
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ delay: (i % 3) * 0.1, duration: 1.5, ease: LUXURY_EASE }}
                    className="group space-y-6"
                >
                    <div 
                      onClick={() => setSelectedProduct(product)}
                      className="aspect-[3/4] relative overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-white/5 bg-white/[0.01] backdrop-blur-3xl cursor-pointer"
                    >
                        {/* Placeholder/Skeleton effect while loading */}
                        {!imageLoaded[product.id] && (
                            <div className="absolute inset-0 bg-white/[0.02] animate-pulse" />
                        )}

                        {product.is_video || product.isVideo ? (
                            <video 
                              src={product.src} 
                              autoPlay loop muted playsInline 
                              onLoadedData={() => setImageLoaded(prev => ({...prev, [product.id]: true}))}
                              className={`w-full h-full object-cover transition-all duration-[3000ms] ${imageLoaded[product.id] ? 'opacity-70 scale-100' : 'opacity-0 scale-105'} group-hover:scale-105 group-hover:opacity-100 grayscale-[0.5] group-hover:grayscale-0`} 
                            />
                        ) : (
                            <img 
                              src={product.src} 
                              onLoad={() => setImageLoaded(prev => ({...prev, [product.id]: true}))}
                              className={`w-full h-full object-cover transition-all duration-[3000ms] ${imageLoaded[product.id] ? 'opacity-70 scale-100' : 'opacity-0 scale-105'} group-hover:scale-105 group-hover:opacity-100 grayscale-[0.5] group-hover:grayscale-0`} 
                              alt={product.title} 
                            />
                        )}
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        
                        {/* Enlarged touch targets for mobile */}
                        <div className="absolute bottom-6 right-6 scale-0 group-hover:scale-100 transition-all duration-700 md:block hidden">
                           <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl">
                              <Plus size={20} />
                           </div>
                        </div>
                    </div>

                    <div className="space-y-4 px-2">
                        <div className="flex justify-between items-baseline">
                            <h3 className="text-xl md:text-2xl font-serif lowercase italic opacity-40 group-hover:opacity-100 transition-all duration-700">{product.title}</h3>
                            <span className="text-[10px] md:text-xs tracking-widest font-light text-[#D4AF37]">₦{product.price.toLocaleString()}</span>
                        </div>
                        <p className="text-[9px] md:text-[10px] leading-relaxed italic opacity-10 group-hover:opacity-30 transition-opacity font-light line-clamp-2">
                          {product.desc || product.description}
                        </p>
                        
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(product);
                            }}
                            className={`w-full py-4 md:py-5 text-[8px] md:text-[9px] uppercase tracking-[0.4em] transition-all duration-1000 rounded-full border backdrop-blur-2xl active:scale-95 ${isLight ? 'bg-black text-white border-black/10' : 'bg-white text-black border-white/10'}`}
                        >
                            Add to Archive
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
      </section>

      {/* Detail Modal - Optimized for Mobile Thumb Swipe/Close */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
             <div 
               onClick={() => setSelectedProduct(null)}
               className="absolute inset-0 bg-black/95 backdrop-blur-3xl cursor-zoom-out"
             />
             
             <motion.div
               initial={{ y: "20%", opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: "20%", opacity: 0 }}
               transition={{ type: "spring", damping: 25, stiffness: 200 }}
               className={`relative w-full max-w-5xl max-h-[85vh] overflow-y-auto rounded-[2.5rem] md:rounded-[4rem] border shadow-2xl ${isLight ? 'bg-ivory border-black/5' : 'bg-[#0a0a0a] border-white/5'}`}
             >
                <div className="sticky top-0 right-0 p-6 md:p-10 flex justify-end z-20 pointer-events-none">
                    <button onClick={() => setSelectedProduct(null)} className="pointer-events-auto w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                        <X size={18} />
                    </button>
                </div>

                <div className="px-6 pb-12 md:px-24 md:pb-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
                   <div className="aspect-[3/4] relative overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-white/5 bg-black/20">
                      {selectedProduct.is_video || selectedProduct.isVideo ? (
                        <video src={selectedProduct.src} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                      ) : (
                        <img src={selectedProduct.src} className="w-full h-full object-cover" alt={selectedProduct.title} />
                      )}
                   </div>
                   
                   <div className="flex flex-col justify-center space-y-8 md:space-y-12">
                      <div className="space-y-4 md:space-y-6">
                        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.8em] opacity-20">Silhouette Detail</span>
                        <h2 className="text-4xl md:text-7xl font-serif lowercase italic tracking-tighter leading-none">
                          {selectedProduct.title}
                        </h2>
                        <p className="text-xl md:text-2xl text-[#D4AF37] font-serif">₦{selectedProduct.price.toLocaleString()}</p>
                      </div>

                      <p className="text-[11px] md:text-sm leading-relaxed italic opacity-40 font-light font-serif">
                        {selectedProduct.desc || selectedProduct.description || "A masterclass in form and structured grace."}
                      </p>

                      <div className="space-y-6 pt-8 border-t border-white/5">
                         <button 
                           onClick={() => {
                             onAddToCart(selectedProduct);
                             setSelectedProduct(null);
                           }}
                           className="w-full py-5 bg-white text-black text-[9px] uppercase tracking-[0.5em] font-bold rounded-full transition-all active:scale-95 flex items-center justify-center gap-4 shadow-2xl"
                         >
                           <ShoppingBag size={14} />
                           Acquire Piece
                         </button>
                         <p className="text-[8px] uppercase tracking-[0.4em] text-center opacity-10">Bespoke shipping included in the silhouette.</p>
                      </div>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      
      {/* Dynamic Film Grain Layer */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('/image/noise.svg')] mix-blend-overlay" />
    </motion.div>
  );
};

export default CollectionsPage;
