'use client';

import { m, useScroll, useSpring } from 'framer-motion';
import { usePreloaderStatus } from '@/hooks/use-preloader-status';

export function ScrollProgress() {
  const isPreloaderComplete = usePreloaderStatus();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (!isPreloaderComplete) {
    return null;
  }

  return (
    <m.div
      className="fixed top-0 right-0 left-0 z-[100] h-[2px] origin-left bg-white"
      style={{ scaleX }}
    />
  );
}
