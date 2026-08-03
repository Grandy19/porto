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
  G: [
    " ### ",
    "#   #",
    "#    ",
    "#  ##",
    " ### "
  ],
  R: [
    "#### ",
    "#   #",
    "#### ",
    "#  # ",
    "#   #"
  ],
  A: [
    " ### ",
    "#   #",
    "#####",
    "#   #",
    "#   #"
  ],
  N: [
    "#   #",
    "##  #",
    "# # #",
    "#  ##",
    "#   #"
  ],
  D: [
    "#### ",
    "#   #",
    "#   #",
    "#   #",
    "#### "
  ],
  Y: [
    "#   #",
    " # # ",
    "  #  ",
    "  #  ",
    "  #  "
  ]
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
}

export function LegoPreloader({ onComplete }: LegoPreloaderProps) {
  const [stage, setStage] = useState<LegoStage>('falling');
  const [settledCount, setSettledCount] = useState(0);

  // Generate exact pixel coordinates for all Lego bricks
  const bricks = useMemo<BrickData[]>(() => {
    const word = "GRANDY";
    const result: BrickData[] = [];
    let colOffset = 0;
    let id = 0;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const pattern = FONT_MAP[char];
      if (!pattern) continue;

      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
          if (pattern[r][c] === '#') {
            const col = colOffset + c;
            const row = r;
            result.push({
              id: id++,
              col,
              row,
              x: col * CELL_PX,
              y: row * CELL_PX,
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
      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
      
      // On mobile screens (<640px), keep word at 72%-76% of screen width so letters have plenty of breathing room
      const availableWidth = screenWidth < 640 
        ? Math.min(screenWidth * 0.74, screenWidth - 48)
        : Math.min(screenWidth * 0.86, WORD_TOTAL_WIDTH);
        
      const calculatedScale = Math.min(1.0, Math.max(0.24, availableWidth / WORD_TOTAL_WIDTH));
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

    const DROP_TOUCHDOWN = 0.50; // Exact time when a brick touches down on its position
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

    if (stage === 'falling' && settledCount >= bricks.length && bricks.length > 0) {
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
  }, [stage, settledCount, bricks.length, onComplete]);

  return (
    <div className="relative flex h-full min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-[#09090B] px-4 select-none touch-none">
      
      {/* Radiant Bloom Center Glow behind GRANDY */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700"
        style={{
          width: stage === 'glow' ? '80vw' : '60vw',
          maxWidth: '700px',
          height: stage === 'glow' ? '50vh' : '35vh',
          maxHeight: '400px',
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 45%, transparent 75%)',
          filter: 'blur(45px)',
        }}
      />

      {/* Main Center Container */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        
        {/* Dynamic Mathematically Scaled Container for GRANDY Lego Word */}
        <div 
          className="relative flex items-center justify-center transition-all duration-200 ease-out"
          style={{
            width: `${WORD_TOTAL_WIDTH * scale}px`,
            height: `${WORD_TOTAL_HEIGHT * scale}px`,
          }}
        >
          <div
            className="relative origin-top-left"
            style={{
              width: `${WORD_TOTAL_WIDTH}px`,
              height: `${WORD_TOTAL_HEIGHT}px`,
              transform: `scale(${scale})`,
            }}
          >
            {bricks.map((brick, idx) => {
              const delay = bricks.length > 0 ? (idx / bricks.length) * 2.85 : 0;

              // Trajectory for final dissolve explosion
              const explodeX = (Math.random() - 0.5) * 550;
              const explodeY = (Math.random() - 0.5) * 550 - 120;
              const explodeRot = (Math.random() - 0.5) * 540;

              return (
                <m.div
                  key={brick.id}
                  initial={{
                    x: brick.x,
                    y: -500 - (idx % 6) * 40,
                    opacity: 0,
                    rotate: (Math.random() - 0.5) * 45,
                    scale: 0.35,
                  }}
                  animate={
                    stage === 'dissolve'
                      ? {
                          x: brick.x + explodeX,
                          y: brick.y + explodeY,
                          opacity: 0,
                          rotate: explodeRot,
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
        </div>

        {/* PORTFOLIO Subtitle & Connecting Center Line - Closely positioned under GRANDY */}
        <AnimatePresence>
          {(stage === 'assembled' || stage === 'glow' || stage === 'dissolve') && (
            <m.div
              initial={{ opacity: 0, y: 6 }}
              animate={
                stage === 'dissolve'
                  ? { opacity: 0, scale: 0.95 }
                  : { opacity: 1, y: 0 }
              }
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="mt-3 sm:mt-4 flex items-center justify-center gap-2.5 sm:gap-4 select-none"
            >
              <div className="h-[1.5px] w-6 xs:w-8 sm:w-14 bg-gradient-to-r from-transparent via-white/50 to-white/80" />
              <span 
                className="font-mono text-[11px] xs:text-xs sm:text-sm font-medium tracking-[0.45em] sm:tracking-[0.6em] pl-[0.45em] sm:pl-[0.6em] uppercase text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"
              >
                PORTFOLIO
              </span>
              <div className="h-[1.5px] w-6 xs:w-8 sm:w-14 bg-gradient-to-l from-transparent via-white/50 to-white/80" />
            </m.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
}
