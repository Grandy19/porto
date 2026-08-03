'use client';

export function BlueprintGrid() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      
      {/* Central Subtle Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white opacity-[0.015] blur-[100px] mix-blend-screen z-0" />

      {/* Edge Vignette */}
      <div className="absolute inset-0 w-full h-full shadow-[inset_0_0_150px_80px_#09090B] z-20" />

      {/* Mask for Top and Bottom Transitions */}
      <div 
        className="absolute inset-0 w-full h-full z-10"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)"
        }}
      >
        {/* CSS-only Ultra Thin Engineering Grid */}
        <div 
          className="absolute inset-0 w-full h-full bg-[length:64px_64px] md:bg-[length:56px_56px] lg:bg-[length:48px_48px]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
            `,
            backgroundPosition: "center center"
          }}
        />
      </div>
    </div>
  );
}
