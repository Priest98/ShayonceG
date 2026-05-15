'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TariCollection from '@/components/TariCollection';
import YonceHairSection from '@/components/YonceHairSection';
import CompleteTheLook from '@/components/CompleteTheLook';
import Consultation from '@/components/Consultation';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import { LUXURY_EASE, TARI_PRODUCTS as STATIC_TARI, HAIR_PRODUCTS as STATIC_HAIR } from '@/lib/constants';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();
  
  // Dynamic Data fallback
  const [tariProducts, setTariProducts] = useState(STATIC_TARI);
  const [hairProducts, setHairProducts] = useState(STATIC_HAIR);

  useEffect(() => {
    fetchDynamicData();
  }, []);

  const fetchDynamicData = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'published')
      .order('order_index', { ascending: true });

    if (!error && data && data.length > 0) {
      const tari = data.filter(p => p.category === 'tari').map(p => ({
        ...p,
        isVideo: p.is_video,
        desc: p.description
      }));
      const hair = data.filter(p => p.category === 'hair').map(p => ({
        ...p,
        isVideo: p.is_video,
        desc: p.description
      }));
      
      if (tari.length > 0) setTariProducts(tari);
      if (hair.length > 0) setHairProducts(hair);
    }
  };

  const addToCart = (product: any) => {
    setCart((prev) => [...prev, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
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
    <main className="relative min-h-screen">
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
                className="text-lg md:text-xl tracking-[0.8em] font-serif uppercase text-white"
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

      <Navbar 
        theme={theme} 
        setTheme={setTheme} 
        currentPage="home"
        setCurrentPage={(page) => page === 'collections' ? router.push('/collections/curly-braids') : router.push('/')}
        cartCount={cart.length}
        setIsCartOpen={setIsCartOpen}
      />

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        removeFromCart={removeFromCart}
        theme={theme}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: LUXURY_EASE }}
      >
        <Hero onNavigate={(page) => page === 'collections' ? router.push('/collections/curly-braids') : router.push('/')} />
        <TariCollection theme={theme} onNavigate={() => router.push('/collections/tari')} />
        <YonceHairSection theme={theme} onNavigate={() => router.push('/collections/curly-braids')} />
        <CompleteTheLook theme={theme} onNavigate={() => router.push('/collections/curly-braids')} />
        <Consultation theme={theme} />
        <Footer />
      </motion.div>
    </main>
  );
}
