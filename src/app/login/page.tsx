'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { LUXURY_EASE } from '@/lib/constants';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/secret-admin-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-onyx flex items-center justify-center p-8">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#2D1B1B,transparent)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: LUXURY_EASE }}
        className="w-full max-w-md p-12 border border-white/5 bg-white/[0.02] backdrop-blur-3xl relative z-10 space-y-12 rounded-[2rem]"
      >
        <div className="space-y-4 text-center">
          <span className="text-[10px] uppercase tracking-[0.8em] text-white/20">Studio Portal</span>
          <h1 className="text-4xl font-serif lowercase italic tracking-tighter text-white/60">Admin Access</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-10">
          <div className="space-y-6">
            <label className="text-[10px] uppercase tracking-[0.6em] text-white/20 block">Identity</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email" 
              className="w-full bg-transparent border-b border-white/5 py-6 text-sm tracking-[0.2em] text-white outline-none transition-all duration-700 placeholder:opacity-20 focus:border-white/20" 
              required
            />
          </div>
          <div className="space-y-6">
            <label className="text-[10px] uppercase tracking-[0.6em] text-white/20 block">Secret</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full bg-transparent border-b border-white/5 py-6 text-sm tracking-[0.2em] text-white outline-none transition-all duration-700 placeholder:opacity-20 focus:border-white/20" 
              required
            />
          </div>

          {error && <p className="text-[10px] text-red-500/60 uppercase tracking-widest text-center">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full py-8 text-[11px] uppercase tracking-[0.8em] transition-all duration-1000 mt-8 rounded-full border border-white/10 bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-20"
          >
            {loading ? 'Authenticating...' : 'Enter Studio'}
          </motion.button>
        </form>

        <div className="text-center">
            <button 
                onClick={() => router.push('/')}
                className="text-[9px] uppercase tracking-[0.4em] text-white/20 hover:text-white transition-opacity"
            >
                Return to Site
            </button>
        </div>
      </motion.div>
    </div>
  );
}
