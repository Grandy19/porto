'use client';

import React, { useState, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { engine } from './preloader/audio-engine';
import { WelcomeScreen } from './welcome-screen';
import { LegoPreloader } from './preloader/lego-preloader';

type GlobalPreloaderState = 'welcome' | 'loading' | 'complete';

export function Preloader() {
  const [stage, setStage] = useState<GlobalPreloaderState>('welcome');

  useEffect(() => {
    // Ensure initial scroll position is always at top
    window.scrollTo(0, 0);

    // Safety fallback: if anything gets stuck, force remove after 25 seconds
    const timeout = setTimeout(() => {
      setStage('complete');
    }, 25000);
    return () => clearTimeout(timeout);
  }, []);

  // Sync audio engine with state
  useEffect(() => {
    if (stage === 'loading') {
      engine.setEnabled(true);
    }
  }, [stage]);

  // Strict Full Scroll Lock (HTML + Body + Wheel/Touch prevent) while not complete
  useEffect(() => {
    if (stage !== 'complete') {
      window.scrollTo(0, 0);
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overscrollBehavior = 'none';
      document.body.style.overscrollBehavior = 'none';

      const preventDefault = (e: Event) => {
        e.preventDefault();
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
          e.preventDefault();
        }
      };

      window.addEventListener('wheel', preventDefault, { passive: false });
      window.addEventListener('touchmove', preventDefault, { passive: false });
      window.addEventListener('keydown', handleKeyDown, { capture: true });

      return () => {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.documentElement.style.overscrollBehavior = '';
        document.body.style.overscrollBehavior = '';
        window.removeEventListener('wheel', preventDefault);
        window.removeEventListener('touchmove', preventDefault);
        window.removeEventListener('keydown', handleKeyDown, { capture: true });
      };
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.overscrollBehavior = '';
      document.body.style.overscrollBehavior = '';
      engine.stopAll();
    }
  }, [stage]);

  const handleStart = () => {
    setStage('loading');
  };

  return (
    <AnimatePresence>
      {stage !== 'complete' && (
        <m.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-[#09090B] touch-none select-none overscroll-none overflow-hidden"
        >
          {/* Welcome Screen Overlay */}
          {stage === 'welcome' && (
            <WelcomeScreen onStart={handleStart} />
          )}

          {/* 3D Lego Brick Falling & Assembling Animation */}
          {stage === 'loading' && (
            <div className="absolute inset-0 h-full w-full">
              <LegoPreloader onComplete={() => setStage('complete')} />
            </div>
          )}
        </m.div>
      )}
    </AnimatePresence>
  );
}
