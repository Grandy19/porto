"use client";

import React, { useState, useCallback } from 'react';
import { motion as m, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

interface WelcomeScreenProps {
  onStart: () => void;
}

// Digital Topographic Contour Paths (Elevation curves representing GIS / Smart City Digital Mapping)
const TOPOGRAPHIC_PATHS = [
  // Top-left organic contour lines
  "M -100,180 C 250,140 450,320 600,80 C 720,-100 850,-50 950,-100",
  "M -100,280 C 280,240 500,420 680,160 C 800,-20 920,20 1050,-60",
  "M -100,380 C 310,340 550,520 760,240 C 880,60 1000,90 1150,-20",
  "M -100,480 C 340,440 600,620 840,320 C 960,140 1080,160 1250,20",

  // Bottom-right organic contour lines
  "M 950,1100 C 1150,850 1450,950 1650,720 C 1850,520 2050,600 2200,480",
  "M 850,1180 C 1080,930 1380,1030 1580,800 C 1780,600 1980,680 2150,560",
  "M 750,1260 C 1010,1010 1310,1110 1510,880 C 1710,680 1910,760 2100,640",
  "M 650,1340 C 940,1090 1240,1190 1440,960 C 1640,760 1840,840 2050,720",
].join(" ");

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [isExiting, setIsExiting] = useState(false);

  // Smooth coordinates for Blueprint Highlight sweep (Mouse & Touch supported)
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 500);

  const smoothMouseX = useSpring(mouseX, { damping: 35, stiffness: 220 });
  const smoothMouseY = useSpring(mouseY, { damping: 35, stiffness: 220 });

  // Top-level Hook call (Strictly adheres to React Rules of Hooks)
  const blueprintHighlightBg = useMotionTemplate`radial-gradient(380px circle at ${smoothMouseX}px ${smoothMouseY}px, rgba(161, 161, 170, 0.045), transparent 80%)`;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  }, [mouseX, mouseY]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      mouseX.set(e.touches[0].clientX);
      mouseY.set(e.touches[0].clientY);
    }
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
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchMove}
          className="pointer-events-auto fixed inset-0 z-[200] flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-[#09090B] px-4 py-6 sm:p-8"
        >
          {/* =================================================================== */}
          {/* LAYER 1: Base Solid Slate Black (#09090B)                           */}
          {/* =================================================================== */}
          <div className="pointer-events-none absolute inset-0 bg-[#09090B]" />

          {/* =================================================================== */}
          {/* LAYER 2: Blueprint Grid (Responsive Spacing & Dark Grey Tone)       */}
          {/* =================================================================== */}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(161, 161, 170, 1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(161, 161, 170, 1) 1px, transparent 1px)
              `,
              backgroundSize: '36px 36px',
              backgroundPosition: 'center center',
            }}
          />

          {/* Major Blueprint Grid Markers */}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.025]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(212, 212, 216, 1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(212, 212, 216, 1) 1px, transparent 1px)
              `,
              backgroundSize: '144px 144px',
              backgroundPosition: 'center center',
            }}
          />

          {/* =================================================================== */}
          {/* LAYER 3: Digital Topographic Lines (Contour Curves in Dark Grey)    */}
          {/* =================================================================== */}
          <div className="pointer-events-none absolute inset-0 z-15 overflow-hidden">
            <m.svg
              initial={{ opacity: 0.035 }}
              animate={{ opacity: [0.035, 0.055, 0.035] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
              className="h-full w-full"
              viewBox="0 0 2000 1200"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
            >
              <path
                d={TOPOGRAPHIC_PATHS}
                stroke="#71717a"
                strokeWidth="0.8"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </m.svg>
          </div>

          {/* =================================================================== */}
          {/* LAYER 4: Digital Connection Lines & System Architecture Schematic   */}
          {/* =================================================================== */}
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
            <svg
              className="h-full w-full opacity-[0.045]"
              viewBox="0 0 1920 1080"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Corner Engineering CAD Brackets */}
              {/* Top Left */}
              <path d="M 40 80 L 40 40 L 80 40" stroke="#71717a" strokeWidth="1" />
              <text x="44" y="96" fill="#a1a1aa" fontSize="9" fontFamily="monospace" letterSpacing="2" className="hidden sm:inline">SYS.ARCH // 01</text>

              {/* Top Right */}
              <path d="M 1880 80 L 1880 40 L 1840 40" stroke="#71717a" strokeWidth="1" />
              <text x="1750" y="96" fill="#a1a1aa" fontSize="9" fontFamily="monospace" letterSpacing="2" className="hidden sm:inline">LAT 0.5892° N</text>

              {/* Bottom Left */}
              <path d="M 40 1000 L 40 1040 L 80 1040" stroke="#71717a" strokeWidth="1" />
              <text x="44" y="990" fill="#a1a1aa" fontSize="9" fontFamily="monospace" letterSpacing="2" className="hidden sm:inline">SMART_CITY_CORE</text>

              {/* Bottom Right */}
              <path d="M 1880 1000 L 1880 1040 L 1840 1040" stroke="#71717a" strokeWidth="1" />
              <text x="1770" y="990" fill="#a1a1aa" fontSize="9" fontFamily="monospace" letterSpacing="2" className="hidden sm:inline">V.3.0_ONLINE</text>

              {/* Digital Schematic Connection Lines with Intersecting Nodes */}
              {/* Upper Left Schematics */}
              <path d="M 120 220 L 320 220 L 400 300 L 580 300" stroke="#71717a" strokeWidth="0.75" />
              <circle cx="120" cy="220" r="2" fill="#71717a" />
              <circle cx="320" cy="220" r="2" fill="#71717a" />
              <circle cx="400" cy="300" r="2" fill="#71717a" />
              <circle cx="580" cy="300" r="2.5" fill="#71717a" />
              
              <path d="M 320 220 L 320 140 L 460 140" stroke="#71717a" strokeWidth="0.6" strokeDasharray="3 3" />
              <circle cx="460" cy="140" r="1.5" fill="#71717a" />

              {/* Lower Right Schematics (Smart City Network Architecture) */}
              <path d="M 1340 780 L 1520 780 L 1600 700 L 1800 700" stroke="#71717a" strokeWidth="0.75" />
              <circle cx="1340" cy="780" r="2.5" fill="#71717a" />
              <circle cx="1520" cy="780" r="2" fill="#71717a" />
              <circle cx="1600" cy="700" r="2" fill="#71717a" />
              <circle cx="1800" cy="700" r="2" fill="#71717a" />

              <path d="M 1520 780 L 1520 880 L 1660 880" stroke="#71717a" strokeWidth="0.6" strokeDasharray="3 3" />
              <circle cx="1660" cy="880" r="1.5" fill="#71717a" />

              {/* Precision CAD Crosshair Markers (+) */}
              <path d="M 280 480 L 280 490 M 275 485 L 285 485" stroke="#71717a" strokeWidth="0.8" />
              <path d="M 1640 420 L 1640 430 M 1635 425 L 1645 425" stroke="#71717a" strokeWidth="0.8" />
              <path d="M 960 160 L 960 170 M 955 165 L 965 165" stroke="#71717a" strokeWidth="0.8" />
              <path d="M 960 920 L 960 930 M 955 925 L 965 925" stroke="#71717a" strokeWidth="0.8" />
            </svg>
          </div>

          {/* =================================================================== */}
          {/* LAYER 5: Static Noise Texture (~2% Opacity for Physical Tactile Feel)*/}
          {/* =================================================================== */}
          <div
            className="pointer-events-none absolute inset-0 z-25 opacity-[0.02] mix-blend-screen"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* =================================================================== */}
          {/* MOUSE/TOUCH INTERACTION: Subtle Dark Grey Blueprint Highlight Sweep */}
          {/* =================================================================== */}
          <m.div
            className="pointer-events-none absolute inset-0 z-30"
            style={{
              background: blueprintHighlightBg,
            }}
          />

          {/* =================================================================== */}
          {/* FOREGROUND CONTENT (Enhanced Mobile Typography & Proportions)       */}
          {/* =================================================================== */}
          <div className="relative z-50 flex w-full max-w-2xl flex-col items-center justify-center text-center">
            {/* GRANDY Title - Larger, bolder, and perfectly centered on mobile */}
            <m.h1
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="select-none pl-[0.24em] text-5xl font-bold tracking-[0.24em] text-white drop-shadow-[0_10px_35px_rgba(255,255,255,0.14)] xs:pl-[0.28em] xs:text-6xl xs:tracking-[0.28em] sm:pl-[0.35em] sm:text-7xl sm:tracking-[0.35em] md:pl-[0.4em] md:text-8xl md:tracking-[0.4em]"
            >
              GRANDY
            </m.h1>

            {/* Tagline - Clear, crisp, and comfortable readability on mobile */}
            <m.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.7, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
              className="mt-5 max-w-[280px] select-none px-2 text-[11px] font-semibold uppercase leading-relaxed tracking-[0.18em] text-zinc-200 drop-shadow-md xs:mt-5 xs:max-w-[320px] xs:text-xs xs:tracking-[0.2em] sm:mt-6 sm:max-w-sm sm:text-xs sm:tracking-[0.2em] md:text-sm"
            >
              Designing Intelligent Digital Experiences
            </m.p>

            {/* ENTER EXPERIENCE Button - Ergonomic, premium, and clearly legible */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
              className="mt-10 sm:mt-14 md:mt-16"
            >
              <m.button
                onClick={handleEnter}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                aria-label="Start Experience"
                className="group relative flex min-h-[46px] items-center justify-center gap-3.5 rounded-full border border-white/20 bg-zinc-900/85 px-8 py-4 text-[10px] font-semibold tracking-[0.18em] text-white shadow-2xl transition-colors duration-300 hover:border-white/50 hover:bg-zinc-800/90 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] active:border-white/60 active:bg-zinc-700/90 xs:px-9 xs:text-[11px] sm:gap-4 sm:px-10 sm:py-5 sm:text-xs sm:tracking-[0.2em]"
              >
                <span>ENTER EXPERIENCE</span>
                <svg
                  className="h-3.5 w-3.5 opacity-70 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 sm:h-4 sm:w-4"
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
