'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { generateTargets } from './brick-word';
import { engine } from './audio-engine';
import { VolumeX } from 'lucide-react';

interface LegoPreloaderProps {
  onComplete: () => void;
}

type LegoStage = 'falling' | 'assembled' | 'glow' | 'dissolve';

export function LegoPreloader({ onComplete }: LegoPreloaderProps) {
  const [stage, setStage] = useState<LegoStage>('falling');
  const [settledCount, setSettledCount] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const { targets, bounds } = useMemo(() => generateTargets(), []);

  useEffect(() => {
    // Enable audio engine
    engine.setEnabled(true);
    engine.playAmbient();
  }, []);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    engine.setEnabled(!nextMuted);
  };

  // Precise Audio Synchronization with Falling Bricks (1:1 Touchdown Timing)
  useEffect(() => {
    if (stage !== 'falling' || targets.length === 0) return;

    const DROP_TOUCHDOWN = 0.50; // Exact time when a brick touches down on its position
    const timers: NodeJS.Timeout[] = [];

    targets.forEach((brick, idx) => {
      const delay = (idx / targets.length) * 2.85; // 2.85s stagger span
      const landingTimeMs = (delay + DROP_TOUCHDOWN) * 1000;

      const t = setTimeout(() => {
        engine.playBrickClick(brick.x);
      }, landingTimeMs);

      timers.push(t);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [stage, targets]);

  // Stage state machine
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (stage === 'falling') {
        setStage('assembled');
        setTimeout(() => {
          setStage('glow');
          engine.playChime();
          engine.playWhoosh();
        }, 400);
      }
    }, 4500);

    if (stage === 'falling' && settledCount >= targets.length && targets.length > 0) {
      setStage('assembled');
      setTimeout(() => {
        setStage('glow');
        engine.playChime();
        engine.playWhoosh();
      }, 400);
    } else if (stage === 'glow') {
      const glowTimer = setTimeout(() => {
        setStage('dissolve');
        engine.playShimmer();
        engine.fadeOutAmbient();
        setTimeout(() => {
          onComplete();
        }, 600);
      }, 1600);
      return () => clearTimeout(glowTimer);
    }

    return () => clearTimeout(safetyTimer);
  }, [stage, settledCount, targets.length, onComplete]);

  // Brick sizing: matching the authentic lego grid
  const BRICK_PX = 22; 
  const GAP_PX = 3;

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#09090B] px-4 select-none">
      
      {/* Radiant Bloom Center Glow behind GRANDY */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700"
        style={{
          width: stage === 'glow' ? '700px' : '480px',
          height: stage === 'glow' ? '400px' : '300px',
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 45%, transparent 75%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Scaled Responsive Container for GRANDY Lego Word */}
      <div className="relative z-20 flex flex-col items-center justify-center scale-[0.58] sm:scale-[0.8] md:scale-[0.95] lg:scale-100 transition-transform duration-500">
        <div
          className="relative"
          style={{
            width: `${(bounds.width + 1) * (BRICK_PX + GAP_PX)}px`,
            height: `${(bounds.height + 1) * (BRICK_PX + GAP_PX)}px`,
          }}
        >
          {targets.map((brick, idx) => {
            const posX = (brick.x + bounds.width / 2) * (BRICK_PX + GAP_PX);
            const posY = (bounds.height / 2 - brick.y) * (BRICK_PX + GAP_PX);
            const delay = targets.length > 0 ? (idx / targets.length) * 2.85 : 0;

            // Trajectory for final dissolve explosion
            const explodeX = (Math.random() - 0.5) * 550;
            const explodeY = (Math.random() - 0.5) * 550 - 120;
            const explodeRot = (Math.random() - 0.5) * 540;

            return (
              <m.div
                key={brick.id}
                initial={{
                  x: posX,
                  y: -500 - (idx % 6) * 40,
                  opacity: 0,
                  rotate: (Math.random() - 0.5) * 45,
                  scale: 0.35,
                }}
                animate={
                  stage === 'dissolve'
                    ? {
                        x: posX + explodeX,
                        y: posY + explodeY,
                        opacity: 0,
                        rotate: explodeRot,
                        scale: 0,
                      }
                    : {
                        x: posX,
                        y: posY,
                        opacity: 1,
                        rotate: 0,
                        scale: 1,
                      }
                }
                transition={
                  stage === 'dissolve'
                    ? { duration: 0.55, ease: 'easeIn' }
                    : {
                        duration: 0.58,
                        ease: [0.22, 1.15, 0.4, 1], // Smooth graceful landing touching down right at 0.50s
                        delay: delay,
                      }
                }
                onAnimationComplete={() => {
                  if (stage === 'falling') {
                    setSettledCount((prev) => prev + 1);
                  }
                }}
                className="absolute left-0 top-0 will-change-transform"
                style={{
                  width: `${BRICK_PX}px`,
                  height: `${BRICK_PX}px`,
                }}
              >
                {/* Luminous White Lego Brick */}
                <div
                  className="relative flex h-full w-full items-center justify-center rounded-[3px] bg-white border border-white transition-all duration-300"
                  style={{
                    boxShadow: stage === 'glow'
                      ? '0 0 16px rgba(255,255,255,0.95), 0 0 32px rgba(255,255,255,0.65), 0 2px 4px rgba(0,0,0,0.5)'
                      : '0 0 10px rgba(255,255,255,0.75), 0 2px 4px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Lego Top Circular Stud */}
                  <div
                    className="h-[9px] w-[9px] rounded-full bg-white/95 border border-white/80"
                    style={{
                      boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.15), 0 0 4px rgba(255,255,255,0.9)',
                    }}
                  />
                </div>
              </m.div>
            );
          })}
        </div>

        {/* PORTFOLIO Subtitle & Connecting Center Line */}
        <AnimatePresence>
          {(stage === 'assembled' || stage === 'glow' || stage === 'dissolve') && (
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={
                stage === 'dissolve'
                  ? { opacity: 0, scale: 0.95 }
                  : { opacity: 1, y: 0 }
              }
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="mt-6 flex items-center justify-center gap-3 sm:gap-4 select-none"
            >
              <div className="h-[1px] w-8 sm:w-16 bg-white/40" />
              <span 
                className="font-mono text-xs sm:text-sm font-light tracking-[0.6em] uppercase text-white"
                style={{
                  textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)',
                }}
              >
                PORTFOLIO
              </span>
              <div className="h-[1px] w-8 sm:w-16 bg-white/40" />
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Left: Audio / Sound Toggle Button ('N' / Volume Icon) */}
      <button
        onClick={toggleSound}
        className="fixed bottom-6 left-6 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-zinc-900/80 text-xs font-semibold text-white/90 backdrop-blur-md transition-all hover:scale-110 hover:border-white/40 hover:bg-zinc-800"
        title={isMuted ? "Unmute Sound" : "Mute Sound"}
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4 text-zinc-400" />
        ) : (
          <span className="font-mono text-xs font-bold tracking-tighter">N</span>
        )}
      </button>

    </div>
  );
}
