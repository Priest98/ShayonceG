'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveRight, Plus, ShoppingBag, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LUXURY_EASE, MOTION_SECTION } from '@/lib/constants';
import Footer from './Footer';

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

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen w-full transition-colors duration-1000 ${isLight ? 'bg-ivory' : 'bg-[#050505]'}`}
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-12 z-[70] flex justify-between items-center pointer-events-none">
        <button 
          onClick={() => router.push('/collections')}
          className="pointer-events-auto flex items-center gap-2 md:gap-4 group"
        >
          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border ${isLight ? 'border-black/10 bg-black/5' : 'border-white/10 bg-white/5'} backdrop-blur-2xl transition-all group-hover:scale-110 shadow-xl`}>
             <MoveRight className="rotate-180 w-3 h-3 md:w-4 md:h-4" />
          </div>
          <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">Archives</span>
        </button>

        <div className="flex items-center gap-6 pointer-events-auto">
            <div className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center backdrop-blur-2xl transition-all hover:scale-110 ${isLight ? 'border-black/10 bg-black/5 text-black' : 'border-white/10 bg-white/5 text-white'}`}>
                <span className="text-[10px] tracking-widest font-serif">{cartCount}</span>
                {cartCount > 0 && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37]" />
                )}
            </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative h-[70vh] md:h-[80vh] w-full flex items-center justify-center overflow-hidden">
        {products.length > 0 && (
          <div className="absolute inset-0">
            {products[0].is_video || products[0].isVideo ? (
              <video src={products[0].src} autoPlay loop muted playsInline className="w-full h-full object-cover brightness-[0.2]" />
            ) : (
              <img src={products[0].src} className="w-full h-full object-cover brightness-[0.2]" alt="Hero" />
            )}
          </div>
        )}
        <div className="relative z-10 text-center space-y-6 md:space-y-8 px-6 md:px-8">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ duration: 1.5 }}
            className="text-[8px] md:text-[10px] uppercase tracking-[0.8em] md:tracking-[1em] block"
          >
            Signature Series
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: LUXURY_EASE }}
            className="text-5xl md:text-[14rem] font-serif lowercase italic tracking-tighter leading-none"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.8, duration: 2 }}
            className="text-[9px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.6em] max-w-[280px] md:max-w-sm mx-auto leading-loose"
          >
            {subtitle || "Fashion and luxury hair designed for presence and feminine expression."}
          </motion.p>
        </div>
      </section>

      {/* Product Gallery Grid */}
      <section className="py-24 md:py-64 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 md:gap-y-32 gap-x-12">
            {products.map((product, i) => (
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ delay: (i % 3) * 0.1, duration: 1.5, ease: LUXURY_EASE }}
                    className="group space-y-6 md:space-y-8"
                >
                    <div 
                      onClick={() => setSelectedProduct(product)}
                      className="aspect-[3/4] relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl cursor-pointer"
                    >
                        {product.is_video || product.isVideo ? (
                            <video src={product.src} autoPlay loop muted playsInline className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-all duration-[3000ms] grayscale group-hover:grayscale-0" />
                        ) : (
                            <img src={product.src} className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-all duration-[3000ms] grayscale group-hover:grayscale-0" alt={product.title} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        
                        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 scale-0 group-hover:scale-100 transition-transform duration-700">
                           <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl">
                              <Plus size={18} />
                           </div>
                        </div>
                    </div>

                    <div className="space-y-4 px-2">
                        <div className="flex justify-between items-end">
                            <h3 className="text-xl md:text-2xl font-serif lowercase italic opacity-60 group-hover:opacity-100 transition-opacity">{product.title}</h3>
                            <span className="text-[10px] md:text-xs tracking-[0.2em] font-light text-[#D4AF37]">₦{product.price.toLocaleString()}</span>
                        </div>
                        <p className="text-[9px] md:text-[10px] leading-loose italic opacity-20 group-hover:opacity-40 transition-opacity font-light max-w-xs truncate">
                          {product.desc || product.description}
                        </p>
                        
                        <button 
                            onClick={() => onAddToCart(product)}
                            className={`w-full py-4 md:py-5 text-[9px] uppercase tracking-[0.4em] transition-all duration-1000 rounded-full border backdrop-blur-2xl ${isLight ? 'bg-black text-white border-black/10' : 'bg-white text-black border-white/10'}`}
                        >
                            Add to Cart
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedProduct(null)}
               className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
             />
             
             <motion.div
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className={`relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[3rem] md:rounded-[4rem] border ${isLight ? 'bg-ivory border-black/5' : 'bg-[#0a0a0a] border-white/5'} p-8 md:p-24 shadow-2xl`}
             >
                <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 md:top-12 md:right-12 opacity-30 hover:opacity-100 transition-opacity p-2">
                  <X size={20} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24">
                   <div className="aspect-[3/4] relative overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-white/5 bg-black">
                      {selectedProduct.is_video || selectedProduct.isVideo ? (
                        <video src={selectedProduct.src} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                      ) : (
                        <img src={selectedProduct.src} className="w-full h-full object-cover" alt={selectedProduct.title} />
                      )}
                   </div>
                   
                   <div className="flex flex-col justify-center space-y-8 md:space-y-12">
                      <div className="space-y-4 md:space-y-6">
                        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.8em] opacity-40">The Piece</span>
                        <h2 className="text-4xl md:text-7xl font-serif lowercase italic tracking-tighter leading-none">
                          {selectedProduct.title}
                        </h2>
                        <p className="text-xl md:text-2xl text-[#D4AF37] font-serif">₦{selectedProduct.price.toLocaleString()}</p>
                      </div>

                      <p className="text-xs md:text-sm leading-loose italic opacity-40 font-light font-serif">
                        {selectedProduct.desc || selectedProduct.description || "A signature piece from our archive. Architectural draping meets fluid motion in a study of presence and silhouette."}
                      </p>

                      <div className="space-y-6 md:space-y-8 pt-8 border-t border-white/5">
                         <button 
                           onClick={() => {
                             onAddToCart(selectedProduct);
                             setSelectedProduct(null);
                           }}
                           className="w-full py-5 md:py-6 bg-white text-black text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-bold rounded-full transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4 shadow-2xl"
                         >
                           <ShoppingBag size={14} />
                           Add to Silhouette
                         </button>
                         <p className="text-[8px] uppercase tracking-[0.4em] text-center opacity-20">Free worldwide editorial shipping on bridal sets.</p>
                      </div>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
      
      {/* Film Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('/image/noise.svg')] mix-blend-overlay" />
    </motion.div>
  );
};

export default CollectionsPage;
