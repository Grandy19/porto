'use client';

export function BlueprintGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
      {/* Central Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 z-0 hidden h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-[0.015] mix-blend-screen blur-[100px] md:block" />

      {/* Edge Vignette */}
      <div className="absolute inset-0 z-20 h-full w-full shadow-[inset_0_0_150px_80px_#09090B]" />

      {/* Mask for Top and Bottom Transitions */}
      <div
        className="absolute inset-0 z-10 h-full w-full"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
        }}
      >
        {/* CSS-only Ultra Thin Engineering Grid */}
        <div
          className="absolute inset-0 h-full w-full bg-[length:64px_64px] md:bg-[length:56px_56px] lg:bg-[length:48px_48px]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
            `,
            backgroundPosition: 'center center',
          }}
        />
      </div>
    </div>
  );
}
