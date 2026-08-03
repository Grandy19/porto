'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export function SpaceBackground() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate deterministic-looking random numbers or just wait for mount
  const stars = useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1, // 1px to 3px
      delay: Math.random() * 3, // 0 to 3s delay for twinkling
      duration: Math.random() * 3 + 2, // 2s to 5s twinkle duration
    }));
  }, [isMounted]);

  const shootingStars = useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 50}%`,
      left: `${Math.random() * 50 + 50}%`, // Start from right half
      delay: Math.random() * 10 + i * 5, // Staggered delays
    }));
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Tiny Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.1, 0.8, 0.1],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting Stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={`shooting-star-${star.id}`}
          className="absolute h-[2px] w-[100px] rounded-full bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            top: star.top,
            left: star.left,
            rotate: "-45deg", // Shoot diagonally down-left
          }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: [-100, -800],
            y: [100, 800],
          }}
          transition={{
            duration: 2,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 10 + 5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
