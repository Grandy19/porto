"use client";

import { useState, useRef } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
          className="pointer-events-auto absolute inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#09090B]"
        >
          {/* 1. Native 60 FPS Video Background (Stationary & Hardware-Accelerated) */}
          <div className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden">
            <video
              ref={videoRef}
              src="/vid.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
            />
          </div>

          {/* 2. High-Performance Dark Tint Overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{ backgroundColor: 'rgba(9, 9, 11, 0.82)' }}
          />

          {/* 3. Static Subtle Ambient Glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-[80px]"
          />

          {/* 4. Static Grain Texture */}
          <div className="pointer-events-none absolute inset-0 z-20 bg-[url('/noise.svg')] bg-repeat opacity-[0.025]" />

          {/* 5. Static Vignette */}
          <div
            className="pointer-events-none absolute inset-0 z-20 opacity-80"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(9,9,11,0.6) 80%, #09090B 100%)',
            }}
          />

          {/* Fixed Centered Foreground Content (No cursor sway / parallax) */}
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
