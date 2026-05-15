'use client';

import React, { useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { usePaystackPayment } from 'react-paystack';
import { LUXURY_EASE } from '@/lib/constants';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: any[];
  removeFromCart: (id: string) => void;
  theme: 'light' | 'dark';
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, cart, removeFromCart, theme }) => {
  const isLight = theme === 'light';
  
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price, 0);
  }, [cart]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  // Paystack Configuration
  const config = {
    reference: (new Date()).getTime().toString(),
    email: "customer@shayonceg.com",
    amount: subtotal * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_placeholder',
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference: any) => {
    console.log('Payment Successful:', reference);
    alert('Order Received. Your silhouette is being prepared.');
    onClose();
  };

  const onClosePayment = () => {
    console.log('Payment Closed');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-md cursor-zoom-out"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.8, ease: LUXURY_EASE }}
            className={`fixed top-0 right-0 h-[100dvh] w-full md:w-[480px] z-[90] ${isLight ? 'bg-ivory text-black' : 'bg-[#0a0a0a] text-white'} shadow-2xl p-6 md:p-12 flex flex-col`}
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${isLight ? 'border-black/5' : 'border-white/5'}`}>
                   <ShoppingBag size={14} className="opacity-40" />
                </div>
                <h2 className="text-xl font-serif lowercase italic tracking-tighter">The Silhouette</h2>
              </div>
              <button onClick={onClose} className="p-2 opacity-30 hover:opacity-100 transition-opacity active:scale-75">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-10 pr-2 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-20">
                  <span className="text-[9px] uppercase tracking-[1em]">Archive Empty</span>
                  <div className="w-px h-16 bg-gradient-to-b from-current to-transparent" />
                </div>
              ) : (
                cart.map((item, i) => (
                  <motion.div
                    key={`${item.id}-${i}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-6 group"
                  >
                    <div className="w-20 h-28 md:w-24 md:h-32 rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] flex-shrink-0">
                       {item.isVideo || item.is_video ? (
                         <video src={item.src} muted loop autoPlay playsInline className="w-full h-full object-cover" />
                       ) : (
                         <img src={item.src} className="w-full h-full object-cover" alt={item.title} />
                       )}
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                       <div className="space-y-2">
                          <h3 className="text-base md:text-lg font-serif italic lowercase tracking-tight opacity-70">{item.title}</h3>
                          <p className="text-[10px] tracking-widest text-[#D4AF37]">₦{item.price.toLocaleString()}</p>
                       </div>
                       <button 
                         onClick={() => removeFromCart(item.id)}
                         className="flex items-center gap-2 text-[8px] uppercase tracking-[0.4em] opacity-20 hover:opacity-100 transition-opacity text-red-400 w-fit"
                       >
                         <Trash2 size={10} />
                         Remove Piece
                       </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="mt-8 md:mt-12 pt-8 border-t border-white/5 space-y-8">
                <div className="flex justify-between items-baseline">
                  <span className="text-[9px] uppercase tracking-[0.8em] opacity-30">Total Investment</span>
                  <span className="text-2xl font-serif text-[#D4AF37]">₦{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="space-y-4">
                    <button 
                        onClick={() => initializePayment({ onSuccess, onClose: onClosePayment })}
                        className="w-full py-6 bg-white text-black text-[10px] uppercase tracking-[0.5em] font-bold rounded-full transition-all active:scale-95 flex items-center justify-center gap-4 shadow-2xl"
                    >
                        Acquire Archive
                        <ArrowRight size={14} />
                    </button>
                    <p className="text-[8px] uppercase tracking-[0.4em] text-center opacity-10 italic">
                        Secured via Paystack. Express bridal shipping.
                    </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
