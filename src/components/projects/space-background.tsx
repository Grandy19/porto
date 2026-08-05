'use client';

import { useSyncExternalStore, useMemo } from 'react';

const emptySubscribe = () => () => {};

export function SpaceBackground() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const stars = useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      left: `${(i * 19.3 + 7) % 100}%`,
      top: `${(i * 23.7 + 11) % 100}%`,
      size: i % 3 === 0 ? 2.5 : i % 2 === 0 ? 1.8 : 1.2,
      delay: (i % 5) * 0.8,
      duration: 2.5 + (i % 4) * 0.7,
    }));
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 transform-gpu overflow-hidden">
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="animate-twinkle absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes starTwinkle {
          0%,
          100% {
            opacity: 0.15;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.2);
          }
        }
        .animate-twinkle {
          animation: starTwinkle infinite ease-in-out;
          will-change: opacity, transform;
        }
      `}</style>
    </div>
  );
}
