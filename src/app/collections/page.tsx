'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { LUXURY_EASE } from '@/lib/constants';
import Image from 'next/image';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

const CollectionsLanding = () => {
  const router = useRouter();

  const collections = [
    {
      id: 'tari-set',
      title: 'Tari Set',
      subtitle: 'Volume 01',
      desc: 'Architectural silhouettes and structured elegance. A study of form and presence.',
      image: '/video/tari/tari1.mp4',
      isVideo: true,
      link: '/collections/tari-set'
    },
    {
      id: 'yonce-hair',
      title: 'Yonce Hair',
      subtitle: 'Volume 02',
      desc: 'Luxury textures designed to complete the silhouette. The final layer of expression.',
      image: '/image/hair_hero.png',
      isVideo: false,
      link: '/collections/hair-collection'
    }
  ];

  return (
    <main className="bg-onyx min-h-screen text-white/90 selection:bg-white/10">
      <Navbar 
        theme="dark" 
        setTheme={() => {}} 
        currentPage="collections" 
        setCurrentPage={() => {}} 
        cartCount={0} 
        setIsCartOpen={() => {}} 
      />

      {/* Hero Section */}
      <section className="pt-48 pb-24 px-8 md:px-12 max-w-7xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: LUXURY_EASE }}
          className="space-y-6"
        >
          <span className="text-[10px] uppercase tracking-[1em] text-white/20">Archive Overview</span>
          <h1 className="text-6xl md:text-[10rem] font-serif lowercase italic tracking-tighter leading-none text-white">
            Our Collections
          </h1>
          <p className="text-xs md:text-sm uppercase tracking-[0.6em] text-white/30 max-w-xl leading-loose font-light">
            Bespoke bridal, luxury hair, and architectural silhouettes curated for the modern feminine presence.
          </p>
        </motion.div>
      </section>

      {/* Collections Grid */}
      <section className="px-8 md:px-12 max-w-7xl mx-auto pb-48">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {collections.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 1.5, ease: LUXURY_EASE }}
              className="group cursor-pointer space-y-12"
              onClick={() => router.push(col.link)}
            >
              <div className="aspect-[4/5] relative overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl shadow-2xl">
                {col.isVideo ? (
                  <video 
                    src={col.image} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover brightness-[0.6] group-hover:scale-105 transition-all duration-[3000ms] grayscale group-hover:grayscale-0" 
                  />
                ) : (
                  <Image 
                    src={col.image} 
                    fill 
                    className="object-cover brightness-[0.6] group-hover:scale-105 transition-all duration-[3000ms] grayscale group-hover:grayscale-0" 
                    alt={col.title}
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-12 left-12 space-y-4">
                  <span className="text-[9px] uppercase tracking-[0.8em] text-white/40">{col.subtitle}</span>
                  <h2 className="text-4xl md:text-6xl font-serif lowercase italic tracking-tighter text-white">
                    {col.title}
                  </h2>
                </div>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-[10px] md:text-xs leading-loose italic opacity-30 group-hover:opacity-60 transition-opacity font-light">
                  {col.desc}
                </p>
                <button className="flex items-center gap-6 group/btn">
                  <span className="text-[9px] uppercase tracking-[0.6em] text-white/40 group-hover/btn:text-white transition-colors">Explore Collection</span>
                  <div className="w-12 h-px bg-white/10 group-hover/btn:w-20 group-hover/btn:bg-white transition-all duration-700" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
      
      {/* Film Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('/image/noise.svg')] mix-blend-overlay" />
    </main>
  );
};

export default CollectionsLanding;
