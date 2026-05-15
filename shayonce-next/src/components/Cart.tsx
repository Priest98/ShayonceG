'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { LUXURY_EASE } from '@/lib/constants';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: any[];
  removeFromCart: (id: string) => void;
  theme: 'light' | 'dark';
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, cart, removeFromCart, theme }) => {
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xl flex justify-end"
            >
                {/* Backdrop overlay for closing */}
                <div className="absolute inset-0" onClick={onClose} />

                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 1, ease: LUXURY_EASE }}
                    className={`w-full max-w-lg h-full ${theme === 'dark' ? 'bg-onyx text-white' : 'bg-ivory text-black'} p-12 relative flex flex-col shadow-2xl z-10`}
                >
                    <button 
                        onClick={onClose}
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
                                        key={`${item.id}-${i}`} 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex gap-8 items-center border-b border-current/5 pb-8 group"
                                    >
                                        <div className="w-24 h-32 rounded-2xl overflow-hidden border border-current/5 bg-black/10">
                                            {item.isVideo ? (
                                                <video src={item.src} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                                            ) : (
                                                <img src={item.src} className="w-full h-full object-cover" alt={item.title} />
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
                                alert("Proceeding to Secure Checkout...");
                                // Checkout logic here
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
  );
};

export default Cart;
