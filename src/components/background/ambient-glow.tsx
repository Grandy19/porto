'use client';

export function AmbientGlow() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Subtle Central Harmonized Ambient Glow */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[800px] h-[450px] rounded-full bg-white opacity-[0.015] blur-[120px] mix-blend-screen pointer-events-none" />
      
      {/* Top transition mask */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)"
        }}
      />
    </div>
  );
}
