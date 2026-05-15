'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

export default CustomCursor;
