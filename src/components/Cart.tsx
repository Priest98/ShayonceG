'use client';

import React, { useMemo } from 'react';
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

  // Paystack Configuration
  const config = {
    reference: (new Date()).getTime().toString(),
    email: "customer@example.com", // Should be captured from a form in a real app
    amount: subtotal * 100, // Paystack works in kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_placeholder',
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference: any) => {
    console.log('Payment Successful:', reference);
    alert('Payment Successful! Thank you for your order.');
    onClose();
    // In a real app, clear cart and redirect to success page
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
            className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 1, ease: LUXURY_EASE }}
            className={`fixed top-0 right-0 h-full w-full md:w-[450px] z-[90] ${isLight ? 'bg-ivory text-black' : 'bg-onyx text-white'} shadow-2xl p-8 flex flex-col`}
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-4">
                <ShoppingBag size={18} className="opacity-30" />
                <h2 className="text-xl font-serif lowercase italic tracking-tighter">Your Silhouette</h2>
              </div>
              <button onClick={onClose} className="opacity-30 hover:opacity-100 transition-opacity p-2">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-20">
                  <p className="text-[10px] uppercase tracking-[0.6em]">Archive Empty</p>
                  <div className="w-px h-12 bg-current" />
                </div>
              ) : (
                cart.map((item, i) => (
                  <motion.div
                    key={`${item.id}-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className="w-24 h-32 rounded-2xl overflow-hidden border border-current/5 bg-black/10">
                       {item.isVideo || item.is_video ? (
                         <video src={item.src} muted loop autoPlay className="w-full h-full object-cover" />
                       ) : (
                         <img src={item.src} className="w-full h-full object-cover" alt={item.title} />
                       )}
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-2">
                       <div className="space-y-2">
                          <h3 className="text-lg font-serif italic lowercase tracking-tight opacity-80">{item.title}</h3>
                          <p className="text-[10px] tracking-widest text-[#D4AF37]">₦{item.price.toLocaleString()}</p>
                       </div>
                       <button 
                         onClick={() => removeFromCart(item.id)}
                         className="flex items-center gap-2 text-[8px] uppercase tracking-[0.4em] opacity-20 hover:opacity-100 transition-opacity text-red-500"
                       >
                         <Trash2 size={10} />
                         Remove
                       </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="mt-12 pt-8 border-t border-current/5 space-y-8">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] uppercase tracking-[0.6em] opacity-30">Subtotal</span>
                  <span className="text-2xl font-serif text-[#D4AF37]">₦{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="space-y-4">
                    <button 
                        onClick={() => {
                          initializePayment({ onSuccess, onClose: onClosePayment });
                        }}
                        className="w-full py-6 bg-white text-black text-[10px] uppercase tracking-[0.5em] font-bold rounded-full transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4 shadow-2xl"
                    >
                        Secure Checkout
                        <ArrowRight size={14} />
                    </button>
                    <p className="text-[8px] uppercase tracking-[0.4em] text-center opacity-20 italic">
                        Secured by Paystack. International silhouettes accepted.
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
