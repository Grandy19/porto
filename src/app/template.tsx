"use client";

import { m } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 12, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full"
    >
      {children}
    </m.div>
  );
}
