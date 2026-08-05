'use client';

import { ReactNode } from 'react';
import { m, useReducedMotion, Variants } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: delay,
      },
    },
  };

  return (
    <m.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -50px 0px' }}
      className={`transform-gpu will-change-transform ${className || ''}`}
    >
      {children}
    </m.div>
  );
}
