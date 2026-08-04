'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function ProfileScan() {
  const [showScan, setShowScan] = useState(true);

  useEffect(() => {
    // Only play once on mount. Clean up after 5s when sequence is fully finished.
    // Increased timeout to account for the 1.5s delay.
    const timer = setTimeout(() => {
      setShowScan(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!showScan) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-lg">
      {/* 1. Left-to-Right Scan Sweep */}
      <motion.div
        className="absolute top-0 bottom-0 w-[60%] border-r-[2px] border-white bg-gradient-to-r from-transparent via-white/5 to-white/30 mix-blend-overlay shadow-[4px_0_16px_rgba(255,255,255,0.8)]"
        initial={{ left: '-60%', opacity: 0 }}
        animate={{ left: ['-60%', '100%'], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.5, ease: 'easeInOut', delay: 1.2 }}
      />

      {/* 2. Detection Frame (Corners) */}
      <motion.div
        className="absolute inset-[8%] border-white/60"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.95, 1, 1, 1.05] }}
        transition={{ duration: 2.0, ease: 'easeInOut', delay: 1.5 }}
      >
        <div className="absolute top-0 left-0 h-6 w-6 rounded-tl-sm border-t-[1.5px] border-l-[1.5px] border-current" />
        <div className="absolute top-0 right-0 h-6 w-6 rounded-tr-sm border-t-[1.5px] border-r-[1.5px] border-current" />
        <div className="absolute bottom-0 left-0 h-6 w-6 rounded-bl-sm border-b-[1.5px] border-l-[1.5px] border-current" />
        <div className="absolute right-0 bottom-0 h-6 w-6 rounded-br-sm border-r-[1.5px] border-b-[1.5px] border-current" />
      </motion.div>

      {/* 5. Status Text */}
      <motion.div
        className="absolute bottom-4 left-4 font-mono text-xs font-bold tracking-[0.2em] text-white/90 drop-shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3.2, ease: 'linear', delay: 1.0 }}
      >
        Analyzing Profile...
      </motion.div>

      {/* 6. Flash Highlight (Camera capture effect without being too flashy) */}
      <motion.div
        className="absolute inset-0 bg-white mix-blend-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0] }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 3.5 }}
      />
    </div>
  );
}

export function ProfileScanGlow() {
  const [showScan, setShowScan] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScan(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!showScan) return null;

  return (
    <motion.div
      className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 transform-gpu rounded-full bg-white/5 mix-blend-screen blur-[30px] md:blur-[80px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 3.0, ease: 'easeInOut', delay: 1.2 }}
    />
  );
}
