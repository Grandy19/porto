'use client';

import React, { useEffect, useState } from 'react';
import { motion as m } from 'framer-motion';
import { engine } from './audio-engine';

interface FallbackLoadingProps {
  onComplete: () => void;
}

export function FallbackLoading({ onComplete }: FallbackLoadingProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING ENVIRONMENT');

  useEffect(() => {
    // Start audio engine
    engine.setEnabled(true);
    engine.playWhoosh();

    const statuses = [
      { at: 15, text: 'LOADING ASSETS & GRAPHICS' },
      { at: 45, text: 'PREPARING EXPERIENCE' },
      { at: 75, text: 'CALIBRATING DESIGN SYSTEM' },
      { at: 95, text: 'FINALIZING PORTFOLIO' },
    ];

    const startTime = performance.now();
    const duration = 2400; // 2.4 seconds

    let frameId: number;
    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      const found = statuses.slice().reverse().find((s) => pct >= s.at);
      if (found) {
        setStatusText(found.text);
      }

      if (pct < 100) {
        frameId = requestAnimationFrame(updateProgress);
      } else {
        engine.playChime();
        engine.playShimmer();
        engine.fadeOutAmbient();
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    };

    frameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [onComplete]);

  return (
    <div className="relative flex h-full min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-[#09090B] px-4 sm:px-6 select-none touch-none">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-white/[0.03] blur-[80px] sm:blur-[120px]" />

      {/* Center Branding */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center gap-2.5 sm:gap-3"
        >
          <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.3em] sm:tracking-[0.4em] uppercase text-zinc-500">
            System Initialization
          </span>
          <h1 className="text-4xl xs:text-5xl sm:text-6xl font-bold tracking-[0.25em] sm:tracking-[0.3em] text-white">
            GRANDY
          </h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="h-[1px] w-6 sm:w-8 bg-zinc-700" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] sm:tracking-[0.25em] text-zinc-400 uppercase">
              PORTFOLIO
            </span>
            <span className="h-[1px] w-6 sm:w-8 bg-zinc-700" />
          </div>
        </m.div>

        {/* Progress Bar & Numeric Counter */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 sm:mt-12 w-full max-w-[260px] xs:max-w-xs sm:max-w-sm flex flex-col items-center gap-3"
        >
          {/* Progress track */}
          <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-zinc-800/80">
            <div
              className="h-full bg-gradient-to-r from-zinc-500 via-white to-zinc-400 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(255,255,255,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Details below bar */}
          <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-zinc-500">
            <span className="tracking-wider uppercase text-[9px] sm:text-[10px]">{statusText}</span>
            <span className="text-zinc-300 font-semibold tracking-widest">{String(progress).padStart(2, '0')}%</span>
          </div>
        </m.div>
      </div>

      {/* Decorative Corner Accents */}
      <div className="pointer-events-none absolute inset-x-6 top-6 sm:inset-x-8 sm:top-8 flex justify-between text-[9px] sm:text-[10px] font-mono text-zinc-600">
        <span>EST. 2024</span>
        <span className="hidden xs:inline">LATENCY: OPTIMAL</span>
      </div>
      <div className="pointer-events-none absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8 flex justify-between text-[9px] sm:text-[10px] font-mono text-zinc-600">
        <span>STATUS: ACTIVE</span>
        <span className="hidden xs:inline">ENGINE: V3.0</span>
      </div>
    </div>
  );
}
