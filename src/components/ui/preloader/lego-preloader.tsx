'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { engine } from './audio-engine';

interface LegoPreloaderProps {
  onComplete: () => void;
}

type LegoStage = 'falling' | 'assembled' | 'glow' | 'dissolve';

// 5x5 Voxel Font Map for GRANDY
const FONT_MAP: Record<string, string[]> = {
  G: [' ### ', '#   #', '#    ', '#  ##', ' ### '],
  R: ['#### ', '#   #', '#### ', '#  # ', '#   #'],
  A: [' ### ', '#   #', '#####', '#   #', '#   #'],
  N: ['#   #', '##  #', '# # #', '#  ##', '#   #'],
  D: ['#### ', '#   #', '#   #', '#   #', '#### '],
  Y: ['#   #', ' # # ', '  #  ', '  #  ', '  #  '],
};

// Brick Grid Constants
const BRICK_PX = 22;
const GAP_PX = 3;
const CELL_PX = BRICK_PX + GAP_PX; // 25px per cell

// Exact dimensions: 35 columns (0..34) and 5 rows (0..4)
const WORD_TOTAL_WIDTH = 34 * CELL_PX + BRICK_PX; // 872px
const WORD_TOTAL_HEIGHT = 4 * CELL_PX + BRICK_PX; // 122px

interface BrickData {
  id: number;
  col: number;
  row: number;
  x: number;
  y: number;
  explodeX: number;
  explodeY: number;
  explodeRot: number;
  initialRotate: number;
  initialYOffset: number;
}

export function LegoPreloader({ onComplete }: LegoPreloaderProps) {
  const [stage, setStage] = useState<LegoStage>('falling');

  // Generate exact pixel coordinates and deterministic explosion trajectories for all Lego bricks
  const bricks = useMemo<BrickData[]>(() => {
    const word = 'GRANDY';
    const result: BrickData[] = [];
    let colOffset = 0;
    let id = 0;

    // Pseudo-random deterministic generator to avoid layout thrashing
    const pseudoRandom = (seed: number) => {
      const x = Math.sin(seed * 9999) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const pattern = FONT_MAP[char];
      if (!pattern) continue;

      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
          if (pattern[r][c] === '#') {
            const col = colOffset + c;
            const row = r;
            const seed1 = id * 1.37;
            const seed2 = id * 2.71;
            const seed3 = id * 3.14;

            result.push({
              id: id++,
              col,
              row,
              x: col * CELL_PX,
              y: row * CELL_PX,
              explodeX: (pseudoRandom(seed1) - 0.5) * 450,
              explodeY: (pseudoRandom(seed2) - 0.5) * 450 - 80,
              explodeRot: (pseudoRandom(seed3) - 0.5) * 360,
              initialRotate: (pseudoRandom(seed1) - 0.5) * 40,
              initialYOffset: -450 - (id % 6) * 35,
            });
          }
        }
      }
      colOffset += 6; // 5 columns for letter + 1 space column
    }
    return result;
  }, []);

  // Dynamic mathematically-exact responsive scaling for ALL mobile screen viewports
  const [scale, setScale] = useState(0.8);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth =
        typeof window !== 'undefined' ? window.innerWidth : 1200;

      // On mobile screens (<640px), keep word at 72%-76% of screen width so letters have plenty of breathing room
      const availableWidth =
        screenWidth < 640
          ? Math.min(screenWidth * 0.74, screenWidth - 48)
          : Math.min(screenWidth * 0.86, WORD_TOTAL_WIDTH);

      const calculatedScale = Math.min(
        1.0,
        Math.max(0.24, availableWidth / WORD_TOTAL_WIDTH)
      );
      setScale(calculatedScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Enable audio engine
    engine.setEnabled(true);
    engine.playAmbient();
  }, []);

  // Precise Audio Synchronization with Falling Bricks (1:1 Touchdown Timing)
  useEffect(() => {
    if (stage !== 'falling' || bricks.length === 0) return;

    const DROP_TOUCHDOWN = 0.5; // Exact time when a brick touches down on its position
    const timers: NodeJS.Timeout[] = [];

    bricks.forEach((brick, idx) => {
      const delay = (idx / bricks.length) * 2.85; // 2.85s stagger span
      const landingTimeMs = (delay + DROP_TOUCHDOWN) * 1000;

      const t = setTimeout(() => {
        engine.playBrickClick(brick.col - 17);
      }, landingTimeMs);

      timers.push(t);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [stage, bricks]);

  // Stage state machine
  useEffect(() => {
    let glowTimer: NodeJS.Timeout | null = null;
    let assembleTimer: NodeJS.Timeout | null = null;

    if (stage === 'falling') {
      // Total stagger is ~2.85s + 0.58s landing = 3.43s. Trigger assembled at 3.5s
      assembleTimer = setTimeout(() => {
        setStage('assembled');
        setTimeout(() => {
          setStage('glow');
          engine.playChime();
          engine.playWhoosh();
        }, 400);
      }, 3500);
    } else if (stage === 'glow') {
      glowTimer = setTimeout(() => {
        setStage('dissolve');
        engine.playShimmer();
        engine.fadeOutAmbient();
        setTimeout(() => {
          onComplete();
        }, 500);
      }, 1600);
    }

    return () => {
      if (assembleTimer) clearTimeout(assembleTimer);
      if (glowTimer) clearTimeout(glowTimer);
    };
  }, [stage, onComplete]);

  return (
    <div className="relative flex h-full min-h-[100dvh] w-full touch-none flex-col items-center justify-center overflow-hidden bg-[#09090B] px-4 select-none">
      {/* Radiant Bloom Center Glow behind GRANDY */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700"
        style={{
          width: stage === 'glow' ? '80vw' : '60vw',
          maxWidth: '700px',
          height: stage === 'glow' ? '50vh' : '35vh',
          maxHeight: '400px',
          background:
            'radial-gradient(circle at center, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 45%, transparent 75%)',
          filter: 'blur(45px)',
        }}
      />

      {/* Main Center Container */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        {/* Dynamic Mathematically Scaled Container for GRANDY Lego Word */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: `${WORD_TOTAL_WIDTH * scale}px`,
            height: `${WORD_TOTAL_HEIGHT * scale}px`,
          }}
        >
          <div
            className="relative origin-top-left transform-gpu"
            style={{
              width: `${WORD_TOTAL_WIDTH}px`,
              height: `${WORD_TOTAL_HEIGHT}px`,
              transform: `scale(${scale})`,
            }}
          >
            {bricks.map((brick, idx) => {
              const delay =
                bricks.length > 0 ? (idx / bricks.length) * 2.85 : 0;

              return (
                <m.div
                  key={brick.id}
                  initial={{
                    x: brick.x,
                    y: brick.initialYOffset,
                    opacity: 0,
                    rotate: brick.initialRotate,
                    scale: 0.35,
                  }}
                  animate={
                    stage === 'dissolve'
                      ? {
                          x: brick.x + brick.explodeX,
                          y: brick.y + brick.explodeY,
                          opacity: 0,
                          rotate: brick.explodeRot,
                          scale: 0,
                        }
                      : {
                          x: brick.x,
                          y: brick.y,
                          opacity: 1,
                          rotate: 0,
                          scale: 1,
                        }
                  }
                  transition={
                    stage === 'dissolve'
                      ? { duration: 0.45, ease: [0.32, 0, 0.67, 0] }
                      : {
                          duration: 0.58,
                          ease: [0.22, 1.15, 0.4, 1], // Smooth graceful landing touching down right at 0.50s
                          delay: delay,
                        }
                  }
                  className="absolute top-0 left-0 transform-gpu will-change-transform"
                  style={{
                    width: `${BRICK_PX}px`,
                    height: `${BRICK_PX}px`,
                  }}
                >
                  {/* Luminous White Lego Brick */}
                  <div
                    className="relative flex h-full w-full items-center justify-center rounded-[3px] border border-white bg-white"
                    style={{
                      boxShadow:
                        stage === 'glow'
                          ? '0 0 16px rgba(255,255,255,0.95), 0 0 28px rgba(255,255,255,0.5), 0 2px 4px rgba(0,0,0,0.5)'
                          : '0 0 8px rgba(255,255,255,0.7), 0 2px 4px rgba(0,0,0,0.4)',
                    }}
                  >
                    {/* Lego Top Circular Stud */}
                    <div
                      className="h-[9px] w-[9px] rounded-full border border-white/80 bg-white/95"
                      style={{
                        boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.15)',
                      }}
                    />
                  </div>
                </m.div>
              );
            })}
          </div>
        </div>

        {/* PORTFOLIO Subtitle & Connecting Center Line - Closely positioned under GRANDY */}
        <AnimatePresence>
          {(stage === 'assembled' ||
            stage === 'glow' ||
            stage === 'dissolve') && (
            <m.div
              initial={{ opacity: 0, y: 6 }}
              animate={
                stage === 'dissolve'
                  ? { opacity: 0, scale: 0.95 }
                  : { opacity: 1, y: 0 }
              }
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="mt-3 flex items-center justify-center gap-2.5 select-none sm:mt-4 sm:gap-4"
            >
              <div className="xs:w-8 h-[1.5px] w-6 bg-gradient-to-r from-transparent via-white/50 to-white/80 sm:w-14" />
              <span className="xs:text-xs pl-[0.45em] font-mono text-[11px] font-medium tracking-[0.45em] text-white uppercase drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] sm:pl-[0.6em] sm:text-sm sm:tracking-[0.6em]">
                PORTFOLIO
              </span>
              <div className="xs:w-8 h-[1.5px] w-6 bg-gradient-to-l from-transparent via-white/50 to-white/80 sm:w-14" />
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
