'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 600, mass: 0.1 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const updatePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isIgnored = target?.closest?.('[data-cursor-ignore]');
      const clickable = !isIgnored
        ? target?.closest?.("a, button, [role='button'], input, select, textarea")
        : null;

      setIsHovering(Boolean(clickable));
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updatePosition, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[999999] hidden items-center justify-center mix-blend-difference md:flex"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      {/* Center Dot */}
      <motion.div
        className="h-2 w-2 rounded-full bg-white will-change-transform"
        animate={{ scale: isHovering ? 2.5 : 1 }}
        transition={{ duration: 0.15 }}
      />

      {/* Frame Ring */}
      <motion.div
        className="absolute h-8 w-8 rounded-full border border-white/60 will-change-transform"
        animate={{
          scale: isHovering ? 1.4 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
