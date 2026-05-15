import { motion, useScroll, useTransform, AnimatePresence, useInView } from "motion/react";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { Menu, X, ChevronDown, MoveRight, Play, Pause } from "lucide-react";
import Lenis from "lenis";

// Motion Constants
const LUXURY_EASE = [0.22, 1, 0.36, 1];
const MOTION_SECTION = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.8, ease: LUXURY_EASE },
};

// Cinematic Video Assets
const VIDEOS = [
  "/video/hero.mp4",
  "https://player.vimeo.com/external/371433846.hd.mp4?s=228a6358486049286d9d1be6a2469493922eb734&profile_id=170&oauth2_token_id=57447761",
  "https://player.vimeo.com/external/368700244.hd.mp4?s=7fcc180840428bd308253a63ec40081bfec2110c&profile_id=170&oauth2_token_id=57447761",
  "https://player.vimeo.com/external/554160416.hd.mp4?s=e7f34c264a2754630560b216c527f311c1d76378&profile_id=175&oauth2_token_id=57447761",
];

const TARI_VIDEOS = [
  "/video/tari/tari1.mp4",
  "/video/tari/tari2.mp4",
  "/video/tari/tari3.mp4",
];

const TARI_PRODUCTS = [
  { id: 'tari-1', title: "Tari Signature Set", price: 85000, src: "/video/tari/tari1.mp4", isVideo: true, desc: "A masterclass in silhouette, designed for absolute presence." },
  { id: 'tari-2', title: "Tari Luxe Edition", price: 120000, src: "/video/tari/tari2.mp4", isVideo: true, desc: "Premium tailoring meet architectural drape." },
  { id: 'tari-3', title: "Tari Evening Set", price: 95000, src: "/video/tari/tari3.mp4", isVideo: true, desc: "Fluid motion captured in the stillness of night." },
  { id: 'tari-4', title: "Tari Bridal Set", price: 150000, src: "/video/tari/tari1.mp4", isVideo: true, desc: "The ultimate transformation for the modern bride." },
];

const HAIR_COLLECTION = [
  { id: 1, src: "/image/hair1.png", title: "Bone Straight", category: "The Silk Edit" },
  { id: 2, src: "/image/hair2.png", title: "Deep Wave", category: "Liquid Motion" },
  { id: 3, src: "/image/hair3.png", title: "Burgundy Unit", category: "The Archive" },
  { id: 4, src: "https://player.vimeo.com/external/371433846.hd.mp4?s=228a6358486049286d9d1be6a2469493922eb734&profile_id=170&oauth2_token_id=57447761", title: "Bridal Install", category: "Eternal Silhouette", isVideo: true },
];

const HAIR_PRODUCTS = [
  { id: 'hair-1', title: "Bone Straight 24”", price: 350000, src: "/image/hair1.png", desc: "Sleek, liquid-like texture with mirror-shine finish." },
  { id: 'hair-2', title: "Deep Wave 26”", price: 420000, src: "/image/hair2.png", desc: "Luxurious volume with defined, flowing waves." },
  { id: 'hair-3', title: "Curly Volume 22”", price: 380000, src: "/image/hair3.png", desc: "Bold, textured curls for an ethereal silhouette." },
  { id: 'hair-4', title: "Burgundy Unit 24”", price: 450000, src: "/image/hair3.png", desc: "Rich, editorial color with signature frontal finish." },
];
const CollectionsPage: React.FC<{ onBack: () => void, theme: 'light' | 'dark', onAddToCart: (product: any) => void, cartCount: number }> = ({ onBack, theme, onAddToCart, cartCount }) => {
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
                {TARI_PRODUCTS.map((product, i) => (
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
                            <p className="text-[10px] md:text-xs leading-loose italic opacity-30 group-hover:opacity-50 transition-opacity font-light max-w-xs">{product.desc}</p>
                            
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
                {HAIR_PRODUCTS.map((product, i) => (
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
                            <p className="text-[9px] md:text-[10px] leading-loose opacity-30 italic font-light line-clamp-2">{product.desc}</p>
                            
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

const Consultation: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
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

const HairCarouselItem: React.FC<{ item: any, index: number, activeIndex: number, theme: 'light' | 'dark', onNext: () => void, onPrev: () => void }> = ({ item, index, activeIndex, theme, onNext, onPrev }) => {
  const isLight = theme === 'light';
  const offset = index - activeIndex;
  const isActive = offset === 0;

  return (
    <motion.div
      initial={false}
      animate={{
        scale: isActive ? 1 : (window.innerWidth < 768 ? 0.75 : 0.8),
        opacity: isActive ? 1 : 0.15,
        x: window.innerWidth < 768 ? `${offset * 105}%` : `${offset * 60}%`,
        zIndex: isActive ? 20 : 10,
        filter: isActive ? 'blur(0px)' : (window.innerWidth < 768 ? 'blur(12px)' : 'blur(8px)'),
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
        className={`relative w-[85vw] md:w-[35vw] aspect-[4/5] pointer-events-auto group`}
      >
        {/* Deep Wine / Espresso Glow behind active slide */}
        {isActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 4, repeat: Infinity }}
            className={`absolute -inset-16 rounded-[4rem] blur-[120px] pointer-events-none ${isLight ? 'bg-[#4A2D2D]' : 'bg-[#2D1B1B]'}`} 
          />
        )}

        <div className={`
          relative w-full h-full overflow-hidden rounded-[3rem] md:rounded-[4rem] border backdrop-blur-sm transition-all duration-1000
          ${isLight ? 'bg-ivory/80 border-black/5 shadow-2xl' : 'bg-smoke/80 border-white/5 shadow-2xl'}
          group-hover:scale-[1.01]
        `}>
           {/* Champagne Sweep */}
           <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
              className={`absolute top-0 bottom-0 w-1/2 skew-x-[45deg] bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent`}
            />
          </div>

          {item.isVideo ? (
            <video
              src={item.src}
              autoPlay={isActive}
              loop
              muted
              playsInline
              className={`w-full h-full object-cover transition-transform duration-[4000ms] ease-out scale-[0.85] group-hover:scale-[0.95] ${isLight ? 'grayscale-0' : 'grayscale-[0.1]'}`}
            />
          ) : (
            <img 
              src={item.src} 
              alt={item.title} 
              className={`w-full h-full object-cover transition-transform duration-[4000ms] ease-out scale-[0.85] group-hover:scale-[0.95] ${isLight ? 'grayscale-0' : 'grayscale-[0.1]'}`}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
          
          <div className="absolute bottom-12 left-12 z-20">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={isActive ? { opacity: 0.4, y: 0 } : { opacity: 0 }}
              className="text-[8px] uppercase tracking-[0.6em] mb-3 block"
            >
               {item.category}
            </motion.span>
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
              className="text-2xl font-serif lowercase italic"
            >
              {item.title}
            </motion.h3>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const YonceHairSection = ({ theme }: { theme: 'light' | 'dark' }) => {
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
          
          <div className="md:pt-12 space-y-8 md:text-right md:items-end flex flex-col">
            <motion.p 
              {...MOTION_SECTION}
              transition={{ ...MOTION_SECTION.transition, delay: 0.2 }}
              className={`max-w-xs text-xs md:text-sm leading-loose italic font-light ${isLight ? 'text-black/50' : 'text-white/30'}`}
            >
              Luxury hair pieces designed to complete the silhouette. Crafted for softness, movement, elegance, and feminine presence.
            </motion.p>
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

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
            {HAIR_COLLECTION.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1 rounded-full transition-all duration-700 ${i === activeIndex ? 'w-12 bg-[#D4AF37]' : 'w-4 bg-current/10'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CompleteTheLook: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-12 py-5 text-[9px] uppercase tracking-[0.6em] border transition-all duration-700 ${isLight ? 'border-black/10 text-black' : 'border-white/10 text-white'} rounded-full w-full max-w-[280px] md:w-auto`}
                >
                    Explore Yonce Hair
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

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsHovering(
        !!target.closest('button') || 
        !!target.closest('a') || 
        !!target.closest('.interactive') ||
        target.classList.contains('cursor-pointer')
      );
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/20 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      animate={{
        x: mousePos.x - 16,
        y: mousePos.y - 16,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0)",
        borderColor: isHovering ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)",
      }}
      transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.8 }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          animate={{ scale: isHovering ? 0 : 1 }}
          className="w-1 h-1 bg-white/60 rounded-full" 
        />
      </div>
    </motion.div>
  );
};

const VideoSection: React.FC<{ src: string; title: string; subtitle: string; index: number }> = ({ src, title, subtitle, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 0.95]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <motion.div style={{ opacity, scale }} className="absolute inset-0 w-full h-full bg-black/20 backdrop-blur-3xl">
          <motion.video
            style={{ y: videoY }}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-[110%] object-cover grayscale brightness-[0.4]"
          />
      </motion.div>
      
      <div className="relative z-10 text-center px-6">
        <motion.span
          animate={isInView ? { opacity: 0.4, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 1.2, delay: 0.2, ease: LUXURY_EASE }}
          className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/40 mb-6 block"
        >
          Volume {String(index + 1).padStart(2, '0')}
        </motion.span>
        
        <div className="overflow-hidden mb-8">
          <motion.h2
            animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: LUXURY_EASE }}
            className="text-4xl md:text-8xl tracking-[0.1em] leading-tight font-serif lowercase italic"
          >
            {title}
          </motion.h2>
        </div>

        <motion.button
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="group flex flex-col items-center gap-6 text-[9px] md:text-[10px] uppercase tracking-[0.6em] text-white/40 hover:text-white transition-colors cursor-pointer"
        >
          <div className="h-[1px] w-6 bg-white/20 group-hover:w-16 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          {subtitle}
        </motion.button>
      </div>
    </section>
  );
};

const CarouselItem: React.FC<{ src: string, index: number, activeIndex: number, theme: 'light' | 'dark', total: number, onNext: () => void, onPrev: () => void }> = ({ src, index, activeIndex, theme, total, onNext, onPrev }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const isLight = theme === 'light';
  
  const offset = index - activeIndex;
  const isActive = offset === 0;
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const updateProgress = () => setProgress((video.currentTime / video.duration) * 100);
    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={false}
      animate={{
        scale: isActive ? 1 : (window.innerWidth < 768 ? 0.75 : 0.8),
        opacity: isActive ? 1 : 0.15,
        x: window.innerWidth < 768 ? `${offset * 105}%` : `${offset * 60}%`,
        zIndex: isActive ? 20 : 10,
        filter: isActive ? 'blur(0px)' : (window.innerWidth < 768 ? 'blur(12px)' : 'blur(8px)'),
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
        {/* Ambient Glow behind active video */}
        {isActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className={`absolute -inset-12 rounded-[3rem] blur-[100px] pointer-events-none ${isLight ? 'bg-ash' : 'bg-white'}`} 
          />
        )}

        {/* Metallic Frame */}
        <div className={`
          relative w-full h-full overflow-hidden rounded-[3rem] md:rounded-[4rem] border backdrop-blur-sm transition-all duration-1000
          ${isLight ? 'bg-ivory/80 border-black/5 shadow-2xl' : 'bg-smoke/80 border-white/5 shadow-2xl'}
          group-hover:scale-[1.01]
        `}>
           {/* Light Sweep */}
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
            autoPlay={isActive}
            loop
            muted
            playsInline
            preload={Math.abs(offset) < 2 ? "metadata" : "none"}
            className={`w-full h-full object-cover transition-transform duration-[4000ms] ease-out scale-[0.85] group-hover:scale-[0.95] ${isLight ? 'grayscale-0' : 'grayscale-[0.2]'}`}
          />

          <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          {/* Progress Indicator */}
          {isActive && (
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5 z-20">
              <motion.div 
                className={`h-full ${isLight ? 'bg-black/40' : 'bg-white/40'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* UI Overlay */}
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

const CinematicCarousel = ({ videos, theme }: { videos: string[], theme: 'light' | 'dark' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isLight = theme === 'light';

  const next = () => setActiveIndex((prev) => (prev + 1) % videos.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);

  // Wheel handling
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > 30) {
      if (e.deltaX > 0) next();
      else prev();
    }
  };

  return (
    <div 
      onWheel={handleWheel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden"
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

      {/* Luxury Controls */}
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

      {/* Pill Pagination */}
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

const TariCollection = ({ theme, onNavigate }: { theme: 'light' | 'dark', onNavigate: () => void }) => {
  const isLight = theme === 'light';
  
  return (
    <section className={`relative py-32 md:py-48 overflow-hidden transition-colors duration-1000 ${isLight ? 'bg-[#FDFCFB]' : 'bg-onyx'}`}>
      <div className={`absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none`}>
        <div className={`absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full blur-[150px] ${isLight ? 'bg-ash/10' : 'bg-white/5'}`} />
        <div className={`absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full blur-[150px] ${isLight ? 'bg-ash/10' : 'bg-white/5'}`} />
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 md:mb-32 gap-12 text-center md:text-left">
          <motion.div {...MOTION_SECTION} className="space-y-6 flex-1">
            <span className={`text-[10px] tracking-[0.6em] uppercase ${isLight ? 'text-black/20' : 'text-white/20'}`}>The Campaign</span>
            <button 
              onClick={onNavigate}
              className="group text-left"
            >
              <h2 className={`text-5xl md:text-8xl font-serif lowercase italic tracking-tighter leading-none transition-all group-hover:opacity-60 ${isLight ? 'text-black/60' : 'text-white/40'}`}>
                Tari Set Collection
              </h2>
            </button>
          </motion.div>
          
          <motion.p 
            {...MOTION_SECTION}
            transition={{ ...MOTION_SECTION.transition, delay: 0.2 }}
            className={`max-w-xs text-xs leading-loose italic font-light mx-auto md:mx-0 ${isLight ? 'text-black/40' : 'text-white/20'}`}
          >
            A visual study of liquid form and architectural drape. Captured in the stillness of our Lagos atelier.
          </motion.p>
        </div>

        <CinematicCarousel videos={TARI_VIDEOS} theme={theme} />
        
        <div className="mt-32 max-w-sm mx-auto text-center">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 2, ease: LUXURY_EASE }}
              className={`h-px mb-8 mx-auto ${isLight ? 'bg-black/10' : 'bg-white/10'}`} 
            />
            <p className={`text-[11px] leading-loose italic font-light ${isLight ? 'text-black/30' : 'text-white/30'}`}>
                "The Tari Set represents our most rigorous exploration of the body's natural movement against structured grace."
            </p>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [heroIndex, setHeroIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState<'home' | 'collections'>('home');
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: any) => {
    setCart((prev) => [...prev, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const timer = setTimeout(() => setLoading(false), 2200);
    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, [currentPage]);

  return (
    <div className="bg-onyx relative min-h-screen">
      <CustomCursor />
      
      <AnimatePresence>
        {loading && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-onyx flex flex-col items-center justify-center p-12"
          >
            <div className="space-y-8 overflow-hidden py-4 text-center">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.8, ease: LUXURY_EASE }}
                className="text-lg md:text-xl tracking-[0.8em] font-serif uppercase"
              >
                SHAYONCE G
              </motion.h1>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, delay: 0.5, ease: LUXURY_EASE }}
                className="h-[1px] w-24 mx-auto bg-white/10"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-12 z-50 flex justify-between items-center pointer-events-none transition-all duration-700">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1.5 }}
          className="pointer-events-auto"
        >
          <span className="text-base md:text-xl tracking-[0.4em] font-serif hover:opacity-50 transition-opacity cursor-pointer">SHAYONCE G</span>
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

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`group relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border rounded-full transition-all duration-700 pointer-events-auto ${menuOpen ? 'bg-white border-white' : (theme === 'dark' ? 'bg-black/20 border-white/10' : 'bg-white/20 border-black/10')} backdrop-blur-xl`}
          >
            {menuOpen ? <X size={16} className="text-black" /> : (
              <div className="space-y-1.5 flex flex-col items-end">
                <div className={`w-5 h-[1px] ${theme === 'dark' ? 'bg-white/60' : 'bg-black/60'} group-hover:w-8 transition-all duration-700`} />
                <div className={`w-8 h-[1px] ${theme === 'dark' ? 'bg-white/60' : 'bg-black/60'} group-hover:w-5 transition-all duration-700`} />
              </div>
            )}
          </button>
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
                    className="group flex items-center gap-6 md:gap-10 cursor-pointer"
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

      <main>
        <AnimatePresence mode="wait">
          {currentPage === 'home' ? (
            <motion.div
              key="home-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: LUXURY_EASE }}
            >
        {/* Hero Section */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {heroIndex === 0 ? (
              <motion.div 
                key="hero-shayonce"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: LUXURY_EASE }}
                className="absolute inset-0 w-full h-full flex items-center justify-center"
              >
                <motion.div 
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 3, ease: LUXURY_EASE }}
                  className="absolute inset-0 w-full h-full"
                >
                  <video
                    src={VIDEOS[0]}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover brightness-[0.35]"
                  />
                </motion.div>
                
                <div className="relative z-10 text-center flex flex-col items-center p-6 md:p-12">
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 1, duration: 2.2, ease: LUXURY_EASE }}
                     className="space-y-6 md:space-y-10"
                  >
                    <h1 className="text-5xl md:text-[8rem] font-serif leading-none tracking-[0.05em] py-2 md:py-8">
                      Shayonce G
                    </h1>
                    <div className="h-[1px] w-12 md:w-24 mx-auto bg-white/20" />
                    <p className="text-[10px] md:text-sm uppercase tracking-[0.8em] text-white/40">
                      The Architecture of Silhouette
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="hero-hair"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: LUXURY_EASE }}
                className="absolute inset-0 w-full h-full flex items-center justify-center"
              >
                <motion.div 
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 3, ease: LUXURY_EASE }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img 
                    src="/image/hair_hero.png" 
                    className="w-full h-full object-cover brightness-[0.4]"
                    alt="Yonce Hair Hero"
                  />
                </motion.div>
                
                <div className="relative z-10 text-center flex flex-col items-center p-6 md:p-12">
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.5, duration: 2.2, ease: LUXURY_EASE }}
                     className="space-y-6 md:space-y-10"
                  >
                    <h1 className="text-[12vw] md:text-[8rem] font-serif leading-none tracking-[0.05em] py-4 md:py-8">
                      YONCE HAIR
                    </h1>
                    <div className="h-[1px] w-12 md:w-24 mx-auto bg-white/20" />
                    <p className="text-[10px] md:text-sm uppercase tracking-[0.6em] text-white/40 max-w-[280px] mx-auto md:max-w-none">
                      Luxury hair designed to complete the silhouette.
                    </p>
                    
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-12 w-full max-w-[280px] md:max-w-none">
                        <button className="px-8 py-5 border border-white/10 text-[9px] uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all duration-700 rounded-full bg-white/[0.03] backdrop-blur-xl">
                            Explore Yonce Hair
                        </button>
                        <button className="px-8 py-5 border border-white/10 text-[9px] uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all duration-700 rounded-full bg-white/[0.03] backdrop-blur-xl">
                            Complete The Look
                        </button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 2 }}
            className="absolute bottom-12 md:bottom-16 flex flex-col items-center gap-6 z-20"
          >
            <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">Explore Archive</span>
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-16 md:h-20 bg-gradient-to-b from-white/30 to-transparent" 
            />
          </motion.div>
          
          {/* Slide Indicators */}
          <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-30">
              {[0, 1].map((i) => (
                  <button 
                    key={i}
                    onClick={() => setHeroIndex(i)}
                    className={`w-1 h-8 md:h-12 transition-all duration-1000 ${i === heroIndex ? 'bg-white' : 'bg-white/10'}`}
                  />
              ))}
          </div>
        </section>

        {/* Brand Positioning Section */}
        <section className="relative min-h-screen w-full flex items-center justify-center bg-onyx px-8 md:px-12 py-32 md:py-48 overflow-hidden">
             <div className="max-w-4xl w-full flex flex-col gap-24 md:gap-32 text-center items-center">
                <motion.div
                  {...MOTION_SECTION}
                  className="space-y-8"
                >
                    <span className="text-[10px] tracking-[0.6em] text-white/20 uppercase">The Ethos</span>
                    <h2 className="text-4xl md:text-6xl leading-[1.2] font-serif lowercase tracking-tight italic">Minimum noise.<br/>Maximum intensity.</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 w-full text-left">
                    <motion.div 
                      {...MOTION_SECTION}
                      transition={{ ...MOTION_SECTION.transition, delay: 0.2 }}
                      className="p-12 md:p-20 bg-onyx space-y-10"
                    >
                        <span className="text-[9px] tracking-[0.5em] uppercase text-white/20">Narrative</span>
                        <p className="text-sm md:text-base text-white/50 leading-[2.2] italic font-light">
                          "Shayonce G is a visual manifestation of silence. We create garments for those who find power in the unspoken, using the most refined textures to speak volumes."
                        </p>
                    </motion.div>
                    <motion.div 
                      {...MOTION_SECTION}
                      transition={{ ...MOTION_SECTION.transition, delay: 0.4 }}
                      className="p-12 md:p-20 bg-onyx space-y-10"
                    >
                        <span className="text-[9px] tracking-[0.5em] uppercase text-white/20">Craft</span>
                        <p className="text-sm md:text-base text-white/50 leading-[2.2] font-light">
                          Every silhouette is an exploration of geometry and gravity. Hand-sculpted in our Lagos studio, designed to transcend seasonal constraints through sheer material integrity.
                        </p>
                    </motion.div>
                </div>
             </div>
             
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-white/[0.01] blur-[150px] rounded-full pointer-events-none" />
        </section>

        {/* Narrative Section 01 */}
        <VideoSection 
          src={VIDEOS[1]} 
          title="LIQUID FORM" 
          subtitle="Explore Technique" 
          index={1}
        />

        <TariCollection theme={theme} onNavigate={() => setCurrentPage('collections')} />

        {/* Yonce Hair Section */}
        <YonceHairSection theme={theme} />
        
        {/* Complete The Look CTA */}
        <CompleteTheLook theme={theme} />

        {/* The Designer Section */}
        <section className={`relative min-h-screen w-full flex items-center justify-center py-32 px-8 md:px-12 overflow-hidden transition-colors duration-1000 ${theme === 'light' ? 'bg-[#FDFCFB]' : 'bg-onyx'}`}>
             <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, ease: LUXURY_EASE }}
                  viewport={{ once: true }}
                  className="relative group w-full max-w-xl mx-auto lg:mx-0"
                >
                    <div className={`absolute -inset-4 blur-2xl opacity-10 ${theme === 'light' ? 'bg-ash' : 'bg-white'}`} />
                    <div className={`relative overflow-hidden rounded-2xl border ${theme === 'light' ? 'border-black/5' : 'border-white/5'}`}>
                        <img 
                          src="/image/visionary.jpg" 
                          alt="Shayonce G" 
                          className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-all duration-[2000ms] ease-out" 
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                    </div>
                </motion.div>

                <div className="space-y-12 md:space-y-16">
                    <motion.div {...MOTION_SECTION}>
                        <span className={`text-[10px] tracking-[0.6em] uppercase mb-6 block ${theme === 'light' ? 'text-black/20' : 'text-white/20'}`}>The Visionary</span>
                        <h2 className={`text-5xl md:text-8xl font-serif lowercase italic tracking-tighter leading-none ${theme === 'light' ? 'text-black/60' : 'text-white/40'}`}>
                            Shayonce G
                        </h2>
                    </motion.div>

                    <div className={`space-y-10 text-sm md:text-base leading-loose font-light italic ${theme === 'light' ? 'text-black/50' : 'text-white/30'}`}>
                        <motion.p {...MOTION_SECTION} transition={{ ...MOTION_SECTION.transition, delay: 0.2 }}>
                            "Design is not about the garment, but the silence it creates around the wearer. My work is an ongoing dialogue between the weight of heritage and the lightness of the future."
                        </motion.p>
                        <motion.p {...MOTION_SECTION} transition={{ ...MOTION_SECTION.transition, delay: 0.3 }}>
                            Founded in 2021, the studio exists at the intersection of West African sculptural traditions and contemporary brutalist architecture. Each piece is hand-sculpted to transcend seasonal constraints.
                        </motion.p>
                    </div>

                    <div className="flex flex-col gap-10">
                        <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: 64 }}
                            transition={{ duration: 2, delay: 0.6, ease: LUXURY_EASE }}
                            className={`h-[1px] ${theme === 'light' ? 'bg-black/10' : 'bg-white/10'}`}
                        />
                        
                        <motion.div 
                            {...MOTION_SECTION}
                            transition={{ ...MOTION_SECTION.transition, delay: 0.5 }}
                            className="flex flex-col md:flex-row gap-6 md:gap-12 text-[9px] uppercase tracking-[0.4em]"
                        >
                            <span className={theme === 'light' ? 'text-black/40' : 'text-white/20'}>Lagos Atelier MMXXI</span>
                            <span className={theme === 'light' ? 'text-black/40' : 'text-white/20'}>London Showroom MMXXVI</span>
                        </motion.div>
                    </div>
                </div>
             </div>
        </section>

        <section className={`relative min-h-screen w-full flex items-center justify-center py-32 md:py-48 px-8 md:px-12 overflow-hidden transition-colors duration-1000 ${theme === 'light' ? 'bg-[#FDFCFB]' : 'bg-onyx'}`}>
            <div className="max-w-6xl w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
                    <motion.div {...MOTION_SECTION}>
                        <span className={`text-[10px] tracking-[0.6em] uppercase mb-8 block ${theme === 'light' ? 'text-black/20' : 'text-white/20'}`}>The Choice</span>
                        <h2 className={`text-5xl md:text-8xl font-serif lowercase italic tracking-tighter leading-none mb-12 ${theme === 'light' ? 'text-black/60' : 'text-white/40'}`}>
                            Why Shayonce G
                        </h2>
                        <div className={`space-y-12 text-sm md:text-base leading-loose font-light italic ${theme === 'light' ? 'text-black/40' : 'text-white/20'}`}>
                            <p>"We do not follow trends; we create architectural monuments for the body. Choosing us is an investment in a silhouette that remains relevant beyond the season."</p>
                            <button className={`w-full md:w-auto px-16 py-6 border text-[10px] uppercase tracking-[0.6em] transition-all duration-1000 rounded-full backdrop-blur-2xl shadow-2xl ${theme === 'light' ? 'bg-black text-white border-black/10 hover:bg-black/80 shadow-black/20' : 'bg-white text-black border-white/10 hover:bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.05)]'}`}>
                                Our Manifesto
                            </button>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-px bg-current/5">
                        {[
                            { title: "Precision", detail: "Every thread is placed with mathematical intent." },
                            { title: "Materiality", detail: "Sourcing only the most profound textures globally." },
                            { title: "Exclusivity", detail: "Limited series and private commissions only." }
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.2, delay: i * 0.2, ease: LUXURY_EASE }}
                                viewport={{ once: true }}
                                className={`p-12 md:p-16 transition-colors duration-700 ${theme === 'light' ? 'bg-white hover:bg-black/5' : 'bg-smoke/10 hover:bg-white/5'}`}
                            >
                                <span className={`text-[9px] font-mono tracking-widest mb-6 block ${theme === 'light' ? 'text-black/20' : 'text-white/20'}`}>0{i + 1}</span>
                                <h3 className={`text-2xl font-serif lowercase italic mb-4 ${theme === 'light' ? 'text-black/60' : 'text-white/40'}`}>{item.title}</h3>
                                <p className={`text-xs md:text-sm font-light leading-relaxed ${theme === 'light' ? 'text-black/40' : 'text-white/30'}`}>{item.detail}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
        
        <section className="relative min-h-screen w-full bg-onyx flex flex-col items-center justify-center py-32 px-8 md:px-12">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
                {[
                    { label: "01. Consultation", detail: "A visual deep-dive into your identity." },
                    { label: "02. Sculpture", detail: "The fabric meets the form. Iterative tailoring." },
                    { label: "03. Delivery", detail: "The revelation of your new silhouette." }
                ].map((step, i) => (
                    <motion.div
                        key={step.label}
                        {...MOTION_SECTION}
                        transition={{ ...MOTION_SECTION.transition, delay: i * 0.1 }}
                        className="group p-12 md:p-20 bg-onyx hover:bg-white/[0.02] transition-colors duration-1000 space-y-10"
                    >
                        <span className="text-[10px] text-white/20 font-mono italic tracking-widest">{step.label.split('.')[0]}</span>
                        <h3 className="text-2xl md:text-3xl text-white/50 group-hover:text-white transition-all duration-700 font-serif lowercase italic">{step.label.split('.')[1]}</h3>
                        <p className="text-xs md:text-sm leading-loose text-white/30 font-light italic">{step.detail}</p>
                        <div className="w-12 group-hover:w-full h-px bg-white/10 transition-all duration-1000" />
                    </motion.div>
                ))}
            </div>
            
            <motion.div 
              {...MOTION_SECTION}
              className="mt-32 w-full flex justify-center"
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group w-full md:w-auto flex items-center justify-center gap-8 text-[10px] uppercase tracking-[0.8em] transition-all duration-1000 px-16 py-8 border rounded-full backdrop-blur-2xl shadow-2xl ${theme === 'light' ? 'bg-black text-white border-black/10' : 'bg-white text-black border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]'}`}
                >
                    Start Your Narrative <MoveRight size={16} className="opacity-40 group-hover:translate-x-4 transition-transform duration-700" />
                </motion.button>
            </motion.div>
        </section>

        <section className={`relative min-h-screen w-full flex items-center justify-center py-32 md:py-48 px-8 md:px-12 overflow-hidden transition-colors duration-1000 ${theme === 'light' ? 'bg-[#FDFCFB]' : 'bg-onyx'}`}>
             <div className="max-w-4xl w-full text-center space-y-32 md:space-y-48">
                <motion.div {...MOTION_SECTION}>
                    <span className={`text-[10px] tracking-[0.6em] uppercase mb-8 block ${theme === 'light' ? 'text-black/20' : 'text-white/20'}`}>Reflections</span>
                    <h2 className={`text-5xl md:text-8xl font-serif lowercase italic tracking-tighter ${theme === 'light' ? 'text-black/60' : 'text-white/40'}`}>
                        Client Narratives
                    </h2>
                </motion.div>

                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: LUXURY_EASE }}
                        className="space-y-16"
                    >
                        <p className={`text-3xl md:text-5xl font-serif leading-tight italic ${theme === 'light' ? 'text-black/40' : 'text-white/30'}`}>
                            "Wearing Shayonce G is like wearing a sculpture. It feels powerful yet invisible—a rare balance that modern luxury often forgets."
                        </p>
                        <div className="flex flex-col items-center gap-6">
                            <div className={`h-px w-16 ${theme === 'light' ? 'bg-black/10' : 'bg-white/10'}`} />
                            <span className={`text-[10px] uppercase tracking-[0.8em] ${theme === 'light' ? 'text-black/60' : 'text-white/40'}`}>Vogue International</span>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 text-left">
                    {[
                        { author: "Ethereal Archive", text: "The architectural integrity of the Tari Set is unmatched. A masterclass in silhouette." },
                        { author: "Hypebeast Luxury", text: "Shayonce G is redefining what it means to be a modern atelier in West Africa." }
                    ].map((review, i) => (
                        <motion.div
                            key={review.author}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, delay: i * 0.2, ease: LUXURY_EASE }}
                            viewport={{ once: true }}
                            className={`p-12 md:p-16 border rounded-[3rem] md:rounded-[4rem] ${theme === 'light' ? 'bg-white border-black/5 shadow-xl' : 'bg-smoke/10 border-white/5 shadow-2xl'}`}
                        >
                            <p className={`text-sm md:text-lg leading-loose italic mb-10 font-light ${theme === 'light' ? 'text-black/40' : 'text-white/30'}`}>"{review.text}"</p>
                            <span className={`text-[9px] uppercase tracking-[0.5em] ${theme === 'light' ? 'text-black/20' : 'text-white/20'}`}>{review.author}</span>
                        </motion.div>
                    ))}
                </div>
             </div>
        </section>

        {/* Virtual Consultation Section */}
        <Consultation theme={theme} />

        <AnimatePresence>
            {isCartOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xl flex justify-end"
                >
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 1, ease: LUXURY_EASE }}
                        className={`w-full max-w-lg h-full ${theme === 'dark' ? 'bg-onyx' : 'bg-ivory'} p-12 relative flex flex-col shadow-2xl`}
                    >
                        <button 
                            onClick={() => setIsCartOpen(false)}
                            className="absolute top-12 right-12 w-10 h-10 rounded-full border border-current/10 flex items-center justify-center hover:scale-110 transition-transform"
                        >
                            <X size={16} />
                        </button>

                        <div className="flex-1 overflow-y-auto space-y-16 pt-16">
                            <div className="space-y-4">
                                <span className="text-[10px] uppercase tracking-[0.8em] opacity-30">Your Selection</span>
                                <h2 className="text-5xl font-serif lowercase italic tracking-tighter">Shopping Bag</h2>
                            </div>

                            <div className="space-y-12">
                                {cart.length === 0 ? (
                                    <p className="text-sm italic opacity-30">The bag is currently empty.</p>
                                ) : (
                                    cart.map((item, i) => (
                                        <motion.div 
                                            key={i} 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex gap-8 items-center border-b border-current/5 pb-8 group"
                                        >
                                            <div className="w-24 h-32 rounded-2xl overflow-hidden border border-current/5">
                                                {item.isVideo ? (
                                                    <video src={item.src} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                                                ) : (
                                                    <img src={item.src} className="w-full h-full object-cover" />
                                                )}
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <h4 className="text-lg font-serif italic">{item.title}</h4>
                                                <p className="text-[10px] tracking-widest text-[#D4AF37]">₦{item.price.toLocaleString()}</p>
                                            </div>
                                            <button 
                                                onClick={() => removeFromCart(item.id)}
                                                className="opacity-0 group-hover:opacity-30 hover:!opacity-100 transition-opacity"
                                            >
                                                <X size={14} />
                                            </button>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="pt-12 space-y-8 border-t border-current/5">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] uppercase tracking-[0.6em] opacity-30">Total Value</span>
                                <span className="text-2xl font-serif text-[#D4AF37]">₦{cartTotal.toLocaleString()}</span>
                            </div>
                            <button 
                                onClick={() => {
                                    alert("Proceeding to Paystack Secure Checkout...");
                                    // Mock Paystack Success
                                    setIsCartOpen(false);
                                    setCart([]);
                                }}
                                disabled={cart.length === 0}
                                className={`w-full py-8 text-[11px] uppercase tracking-[0.8em] transition-all duration-1000 rounded-full border backdrop-blur-2xl shadow-2xl ${theme === 'light' ? 'bg-black text-white border-black/10' : 'bg-white text-black border-white/10'} disabled:opacity-20`}
                            >
                                Secure Checkout
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        <section className="min-h-screen bg-onyx flex flex-col items-center justify-center px-8 text-center relative overflow-hidden py-48">
             <div className="relative z-10 space-y-32">
                <motion.h2 
                  {...MOTION_SECTION}
                  className="text-4xl md:text-8xl max-w-5xl mx-auto leading-tight italic text-white/30 font-serif lowercase tracking-tighter"
                >
                   "We do not design fashion; we capture the space between the threads."
                </motion.h2>
                
                <div className="flex flex-col items-center gap-16">
                    <motion.button 
                        {...MOTION_SECTION}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-20 py-10 md:py-8 border border-white/10 text-[10px] uppercase tracking-[1em] hover:border-white/40 transition-all duration-1000 bg-white/[0.05] backdrop-blur-2xl rounded-full shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                    >
                        Enter Archive
                    </motion.button>
                    
                    <div className="flex flex-col gap-12 items-center">
                        <motion.div 
                          {...MOTION_SECTION}
                          className="flex flex-wrap justify-center gap-10 md:gap-24 text-[9px] md:text-[10px] uppercase tracking-[0.6em] text-white/20"
                        >
                            {["Inquiries", "Manifesto", "Sustainability", "Legal"].map((link) => (
                               <span key={link} className="hover:text-white transition-colors duration-700 cursor-pointer">{link}</span>
                            ))}
                        </motion.div>
                        
                        <div className="h-px w-24 bg-white/5" />
                        
                        <div className="flex gap-12">
                            {["IG", "TW", "FB"].map(s => (
                                <span key={s} className="text-[9px] tracking-widest text-white/10 hover:text-white transition-colors cursor-pointer">{s}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="absolute bottom-12 w-full flex flex-col md:flex-row justify-between px-12 gap-6 text-[8px] uppercase tracking-[0.6em] text-white/5 font-mono">
                <span>© SHAYONCE G MMXXVI — ALL RIGHTS RESERVED</span>
                <span>Crafted in the Void — Lagos</span>
            </div>
            
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
               <div className="absolute inset-0 bg-[#020202]" />
               <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent)]" />
            </div>
        </section>
            </motion.div>
          ) : (
            <CollectionsPage 
              key="collections" 
              onBack={() => setCurrentPage('home')} 
              theme={theme} 
              onAddToCart={addToCart}
              cartCount={cart.length}
            />
          )}
        </AnimatePresence>
      </main>

      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
        
        html.lenis {
          height: auto;
        }

        .lenis.lenis-smooth {
          scroll-behavior: auto !important;
        }

        .lenis.lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }

        .lenis.lenis-stopped {
          overflow: hidden;
        }

        .lenis.lenis-scrolling iframe {
          pointer-events: none;
        }
        
        button, a.button-frozen {
          pointer-events: none !important;
          cursor: default !important;
        }
      `}</style>
    </div>
  );
}
