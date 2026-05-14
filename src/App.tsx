import { motion, useScroll, useTransform, AnimatePresence, useInView } from "motion/react";
import { useEffect, useState, useRef, useMemo } from "react";
import { Menu, X, ChevronDown, MoveRight, Play, Pause } from "lucide-react";
import Lenis from "lenis";

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

// Motion Constants
const LUXURY_EASE = [0.22, 1, 0.36, 1];
const MOTION_SECTION = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-5%" },
  transition: { duration: 1, ease: LUXURY_EASE },
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

const VideoSection = ({ src, title, subtitle, index }: { src: string; title: string; subtitle: string; index: number }) => {
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
      <motion.div style={{ opacity, scale }} className="absolute inset-0 w-full h-full">
        <motion.video
          style={{ y: videoY }}
          src={src}
          autoPlay
          loop
          muted
          playsInline
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
            className="text-3xl md:text-6xl tracking-[0.1em] leading-tight"
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

const CarouselItem = ({ src, index, activeIndex, theme, total }: { src: string, index: number, activeIndex: number, theme: 'light' | 'dark', total: number }) => {
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
        scale: isActive ? 1 : (window.innerWidth < 768 ? 0.7 : 0.8),
        opacity: isActive ? 1 : 0.2,
        x: window.innerWidth < 768 ? `${offset * 90}%` : `${offset * 60}%`,
        zIndex: isActive ? 20 : 10,
        filter: isActive ? 'blur(0px)' : 'blur(8px)',
      }}
      transition={{ duration: 1, ease: LUXURY_EASE }}
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
    >
      <div className={`relative w-[90vw] md:w-[60vw] aspect-video pointer-events-auto group`}>
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
          relative w-full h-full overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-1000
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
            autoPlay
            loop
            muted
            playsInline
            className={`w-full h-full object-cover transition-transform duration-[4000ms] ease-out scale-115 group-hover:scale-125 ${isLight ? 'grayscale-0' : 'grayscale-[0.2]'}`}
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
      </div>
    </motion.div>
  );
};

const CinematicCarousel = ({ videos, theme }: { videos: string[], theme: 'light' | 'dark' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isLight = theme === 'light';

  const next = () => setActiveIndex((prev) => (prev + 1) % videos.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);

  // Autoplay
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [isHovered]);

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

      {/* Progress Line */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-px bg-current/10 flex items-center">
          <motion.div 
            animate={{ x: `${(activeIndex / (videos.length - 1)) * 100}%` }}
            className={`absolute w-12 h-px ${isLight ? 'bg-black' : 'bg-white'}`} 
          />
          <div className="absolute -top-6 left-0 w-full flex justify-between">
              {videos.map((_, i) => (
                <span key={i} className={`text-[8px] font-mono tracking-tighter transition-opacity duration-700 ${i === activeIndex ? 'opacity-40' : 'opacity-10'}`}>
                  0{i + 1}
                </span>
              ))}
          </div>
      </div>
    </div>
  );
};

const TariCollection = ({ theme }: { theme: 'light' | 'dark' }) => {
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
            <h2 className={`text-5xl md:text-8xl font-serif lowercase italic tracking-tighter leading-none ${isLight ? 'text-black/60' : 'text-white/40'}`}>
              Tari Set Collection
            </h2>
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

  useEffect(() => {
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
  }, []);

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
            className={`group relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border rounded-full transition-all duration-700 ${menuOpen ? 'bg-white border-white' : 'bg-transparent border-white/10 hover:border-white/20'}`}
          >
            {menuOpen ? <X size={16} className="text-black" /> : (
              <div className="space-y-1.5 flex flex-col items-end">
                <div className="w-5 h-[1px] bg-white/60 group-hover:w-8 transition-all duration-700" />
                <div className="w-8 h-[1px] bg-white/60 group-hover:w-5 transition-all duration-700" />
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
        {/* Hero Section */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
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
               transition={{ delay: 2.5, duration: 2.2, ease: LUXURY_EASE }}
               className="space-y-6 md:space-y-10"
            >
              <h1 className="text-5xl md:text-[5rem] font-serif leading-none tracking-[0.1em] py-2">
                Shayonce G
              </h1>
              <div className="h-[1px] w-16 mx-auto bg-white/20" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.8em] text-white/40">
                The Architecture of Silhouette
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 2 }}
              className="absolute bottom-12 md:bottom-16 flex flex-col items-center gap-6"
            >
              <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">Explore Archive</span>
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-[1px] h-16 md:h-20 bg-gradient-to-b from-white/30 to-transparent" 
              />
            </motion.div>
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

        <TariCollection theme={theme} />

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
                          src="/designer_portrait_1778770716466.png" 
                          alt="Shayonce G" 
                          className="w-full aspect-[4/5] object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms] ease-out" 
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
                            <button className={`w-full md:w-auto px-16 py-6 border text-[10px] uppercase tracking-[0.6em] transition-all duration-700 ${theme === 'light' ? 'bg-black text-white border-black hover:bg-transparent hover:text-black' : 'bg-white text-black border-white hover:bg-transparent hover:text-white'}`}>
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
                    className="group w-full md:w-auto flex items-center justify-center gap-8 text-[10px] uppercase tracking-[0.8em] text-white/40 hover:text-white transition-all duration-700 px-16 py-8 border border-white/5 hover:border-white/20"
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
                            {...MOTION_SECTION}
                            transition={{ ...MOTION_SECTION.transition, delay: i * 0.2 }}
                            className={`p-12 md:p-16 border rounded-2xl ${theme === 'light' ? 'bg-white border-black/5' : 'bg-smoke/10 border-white/5'}`}
                        >
                            <p className={`text-sm md:text-base leading-loose italic mb-10 font-light ${theme === 'light' ? 'text-black/40' : 'text-white/30'}`}>"{review.text}"</p>
                            <span className={`text-[9px] uppercase tracking-[0.5em] ${theme === 'light' ? 'text-black/20' : 'text-white/20'}`}>{review.author}</span>
                        </motion.div>
                    ))}
                </div>
             </div>
        </section>

        <section className="relative min-h-screen w-full flex items-center justify-center bg-onyx px-8 py-32 overflow-hidden">
             <video 
                src={VIDEOS[3]} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover opacity-5 filter blur-3xl grayscale"
                loading="lazy"
             />
             
             <div className="max-w-6xl w-full relative z-10 flex flex-col lg:flex-row gap-24 items-center">
                <div className="w-full lg:flex-1 space-y-12">
                    <motion.div {...MOTION_SECTION}>
                        <span className="text-[10px] tracking-[0.8em] text-white/20 uppercase mb-8 block font-light">Experience</span>
                        <h2 className="text-5xl md:text-8xl font-serif lowercase italic tracking-tighter leading-none italic">Virtual<br/>Consultation</h2>
                    </motion.div>
                    
                    <motion.p 
                        {...MOTION_SECTION}
                        transition={{ ...MOTION_SECTION.transition, delay: 0.2 }}
                        className="text-white/30 text-sm md:text-base leading-[2.2] font-light italic max-w-sm"
                    >
                        Connect with our master tailors from anywhere in the world. A private digital dialogue designed to capture your aesthetic intent.
                    </motion.p>
                    
                    <motion.div
                        {...MOTION_SECTION}
                        transition={{ ...MOTION_SECTION.transition, delay: 0.4 }}
                        className="grid grid-cols-1 gap-6 text-[10px] uppercase tracking-[0.6em] text-white/20"
                    >
                        {["Digital Body Mapping", "Sourcing Dialogue", "Silhouette Preview"].map((feature) => (
                           <div key={feature} className="flex items-center gap-8">
                               <div className="w-2 h-2 bg-white/5 rounded-full border border-white/10" />
                               <span>{feature}</span>
                           </div>
                        ))}
                    </motion.div>
                </div>

                <motion.div 
                    {...MOTION_SECTION}
                    transition={{ ...MOTION_SECTION.transition, delay: 0.3 }}
                    className="w-full lg:flex-1 max-w-xl p-12 md:p-20 border border-white/5 bg-white/[0.01] backdrop-blur-3xl relative group overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-[2000ms]" />
                    
                    <div className="space-y-10 md:space-y-12">
                      <div className="space-y-6">
                          <label className="text-[10px] uppercase tracking-[0.6em] text-white/20 block">Full Identity</label>
                          <input type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-white/5 py-6 text-sm tracking-[0.2em] focus:border-white/20 outline-none transition-all duration-700 placeholder:opacity-20" />
                      </div>
                      <div className="space-y-6">
                          <label className="text-[10px] uppercase tracking-[0.6em] text-white/20 block">Contact</label>
                          <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-white/5 py-6 text-sm tracking-[0.2em] focus:border-white/20 outline-none transition-all duration-700 placeholder:opacity-20" />
                      </div>
                      <div className="space-y-6">
                          <label className="text-[10px] uppercase tracking-[0.6em] text-white/20 block">Intent</label>
                          <div className="relative">
                            <select className="w-full bg-transparent border-b border-white/5 py-6 text-sm tracking-[0.2em] focus:border-white/20 outline-none transition-all duration-700 cursor-pointer appearance-none lowercase italic text-white/40">
                                <option className="bg-onyx">private commission</option>
                                <option className="bg-onyx">editorial inquiry</option>
                                <option className="bg-onyx">bridal evolution</option>
                            </select>
                            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10 pointer-events-none" />
                          </div>
                      </div>
                      
                      <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-8 bg-white text-black text-[10px] uppercase tracking-[0.8em] hover:bg-transparent hover:text-white border border-white transition-all duration-1000 mt-8"
                      >
                          Apply for Access
                      </motion.button>
                    </div>
                </motion.div>
             </div>
        </section>

        <section className="min-h-screen bg-onyx flex flex-col items-center justify-center px-8 text-center relative overflow-hidden py-48">
            <div className="relative z-10 space-y-32">
                <motion.h2 
                  {...MOTION_SECTION}
                  className="text-4xl md:text-6xl max-w-4xl mx-auto leading-tight italic text-white/30 font-serif lowercase tracking-tighter"
                >
                   "We do not design fashion; we capture the space between the threads."
                </motion.h2>
                
                <div className="flex flex-col items-center gap-16">
                    <motion.button 
                        {...MOTION_SECTION}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-20 py-8 border border-white/5 text-[10px] uppercase tracking-[1em] hover:border-white/40 transition-all duration-1000 bg-white/[0.02]"
                    >
                        Enter Archive
                    </motion.button>
                    
                    <div className="flex flex-col gap-12 items-center">
                        <motion.div 
                          {...MOTION_SECTION}
                          className="flex flex-wrap justify-center gap-12 md:gap-24 text-[9px] uppercase tracking-[0.6em] text-white/20"
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
      `}</style>
    </div>
  );
}
