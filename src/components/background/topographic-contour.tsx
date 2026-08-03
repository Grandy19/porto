"use client";

import React from "react";

// Minimal, clean, and spacious topographic contour curves
const CONTOUR_PATH = [
  // Upper flow (About & Engineering Journey)
  "M -200 300 C 600 1000, 300 2000, -200 2800",
  "M -200 550 C 800 1250, 500 2250, -200 3050",
  
  "M 2600 500 C 1850 1200, 1950 2200, 2600 2900",
  "M 2600 750 C 1600 1450, 1700 2450, 2600 3150",

  // Lower flow (Experience Beyond Code & Technical Expertise)
  "M -200 3600 C 650 4300, 400 5400, -200 6200",
  "M -200 3900 C 850 4600, 600 5700, -200 6500",

  "M 2600 3800 C 1800 4500, 1900 5600, 2600 6300",
  "M 2600 4100 C 1550 4800, 1650 5900, 2600 6600",
].join(" ");

export function TopographicContour() {
  return (
    <div className="absolute inset-0 z-[0] overflow-hidden pointer-events-none">
      {/* Topographic Lines without any blurry/abstract glow or vignette spots */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)"
        }}
      >
        <svg 
          className="absolute top-0 left-0 w-full h-full opacity-[0.025] md:opacity-[0.03]" 
          viewBox="0 0 2400 7200" 
          fill="none" 
          preserveAspectRatio="none"
        >
          <path 
            d={CONTOUR_PATH} 
            stroke="#FFFFFF" 
            strokeWidth="0.6"  
            vectorEffect="non-scaling-stroke" 
            strokeLinejoin="round" 
            strokeLinecap="round" 
          />
        </svg>
      </div>
    </div>
  );
}
