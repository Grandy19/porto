"use client";

import React, { useState, useCallback } from 'react';
import { motion as m, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [isExiting, setIsExiting] = useState(false);

  // Smooth mouse coordinates for ambient white spotlight (Linear / Apple / Vercel style)
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 500);

  const smoothMouseX = useSpring(mouseX, { damping: 35, stiffness: 200 });
  const smoothMouseY = useSpring(mouseY, { damping: 35, stiffness: 200 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  }, [mouseX, mouseY]);

  const handleEnter = () => {
    if (isExiting) return;
    setIsExiting(true);

    // 800ms clean fade before triggering 3D Loading Screen
    setTimeout(() => {
      onStart();
    }, 800);
  };

  return (
    <AnimatePresence>
      {!isExiting ? (
        <m.div
          key="welcome-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          onMouseMove={handleMouseMove}
          className="pointer-events-auto absolute inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#09090B]"
        >
          {/* 1. Deep Black Base Layer */}
          <div className="pointer-events-none absolute inset-0 bg-[#09090B]" />

          {/* 2. Pure Monochrome White Aurora Blobs (Slow, Infinite 20-28s, 60 FPS) */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* White Ambient Blob 1 (Top-Left / Center) */}
            <m.div
              animate={{
                x: [-30, 50, -20, -30],
                y: [-25, 35, -45, -25],
                scale: [1, 1.12, 0.96, 1],
                opacity: [0.04, 0.07, 0.035, 0.04],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -left-[10%] -top-[10%] h-[650px] w-[650px] rounded-full bg-white blur-[140px] will-change-transform sm:h-[900px] sm:w-[900px] sm:blur-[180px]"
            />

            {/* White Ambient Blob 2 (Bottom-Right) */}
            <m.div
              animate={{
                x: [40, -35, 30, 40],
                y: [30, -35, 20, 30],
                scale: [1.08, 0.94, 1.15, 1.08],
                opacity: [0.035, 0.065, 0.03, 0.035],
              }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-[15%] -right-[10%] h-[600px] w-[600px] rounded-full bg-white blur-[150px] will-change-transform sm:h-[850px] sm:w-[850px] sm:blur-[190px]"
            />

            {/* White Ambient Blob 3 (Center / Top-Right) */}
            <m.div
              animate={{
                x: [-20, 30, -30, -20],
                y: [25, -25, 25, 25],
                scale: [0.95, 1.1, 0.98, 0.95],
                opacity: [0.025, 0.05, 0.03, 0.025],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute left-[35%] top-[15%] h-[550px] w-[550px] rounded-full bg-white blur-[130px] will-change-transform sm:h-[750px] sm:w-[750px] sm:blur-[160px]"
            />
          </div>

          {/* 3. Subtle 3% Opacity Architectural Grid */}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 1) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px',
            }}
          />

          {/* 4. Soft Pure White Interactive Spotlight Following Cursor */}
          <m.div
            className="pointer-events-none absolute inset-0 z-15"
            style={{
              background: useMotionTemplate`radial-gradient(600px circle at ${smoothMouseX}px ${smoothMouseY}px, rgba(255, 255, 255, 0.05), transparent 80%)`,
            }}
          />

          {/* 5. Static Noise Texture Layer (~2% Opacity) */}
          <div
            className="pointer-events-none absolute inset-0 z-20 opacity-[0.02] mix-blend-screen"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* 6. Gentle Cinematic Vignette */}
          <div
            className="pointer-events-none absolute inset-0 z-25 opacity-90"
            style={{
              background: 'radial-gradient(circle at center, transparent 35%, rgba(9,9,11,0.5) 75%, #09090B 100%)',
            }}
          />

          {/* 7. Centered Foreground Content */}
          <div className="relative z-50 flex flex-col items-center justify-center text-center">
            {/* GRANDY Title */}
            <m.h1
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="select-none text-5xl font-bold tracking-[0.35em] text-white drop-shadow-[0_10px_35px_rgba(255,255,255,0.12)] sm:text-6xl sm:tracking-[0.4em] md:text-8xl"
            >
              GRANDY
            </m.h1>

            {/* Tagline */}
            <m.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.65, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
              className="mt-5 max-w-[320px] select-none px-2 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-zinc-200 drop-shadow-md sm:mt-6 sm:max-w-sm sm:text-xs md:text-sm"
            >
              Designing Intelligent Digital Experiences
            </m.p>

            {/* ENTER EXPERIENCE Button */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
              className="mt-14 sm:mt-16"
            >
              <m.button
                onClick={handleEnter}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                aria-label="Start Experience"
                className="group relative flex items-center gap-4 rounded-full border border-white/20 bg-zinc-900/80 px-8 py-4 text-[10px] font-semibold tracking-[0.2em] text-white shadow-2xl transition-colors duration-300 hover:border-white/50 hover:bg-zinc-800/90 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] active:border-white/60 active:bg-zinc-700/90 sm:px-10 sm:py-5 sm:text-xs"
              >
                <span>ENTER EXPERIENCE</span>
                <svg
                  className="h-3 w-3 opacity-70 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 sm:h-4 sm:w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </m.button>
            </m.div>
          </div>
        </m.div>
      ) : (
        /* Seamless Black Fadeout on Exit */
        <m.div
          key="welcome-exit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-0 z-[250] bg-black"
        />
      )}
    </AnimatePresence>
  );
}
