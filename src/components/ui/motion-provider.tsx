"use client";

import { ReactNode } from "react";
import { LazyMotion, domAnimation } from "framer-motion";

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
}
