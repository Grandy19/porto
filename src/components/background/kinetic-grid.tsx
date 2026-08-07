'use client';

import React, { useEffect, useRef, memo } from 'react';

interface KineticGridProps {
  className?: string;
  gridSpacing?: number;
  dotSize?: number;
  mouseRadius?: number;
  color?: string;
}

interface Point {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  intensity: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  amplitude: number;
  decay: number;
  opacity: number;
}

export const KineticGrid = memo(function KineticGrid({
  className = '',
  gridSpacing = 28,
  dotSize = 1.3,
  mouseRadius = 150,
}: KineticGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let points: Point[] = [];
    const ripples: Ripple[] = [];

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isActive: false,
    };

    const initGrid = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      const cols = Math.ceil(width / gridSpacing) + 2;
      const rows = Math.ceil(height / gridSpacing) + 2;
      const offsetX = (width - (cols - 1) * gridSpacing) / 2;
      const offsetY = (height - (rows - 1) * gridSpacing) / 2;

      points = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const originX = offsetX + c * gridSpacing;
          const originY = offsetY + r * gridSpacing;
          points.push({
            originX,
            originY,
            x: originX,
            y: originY,
            vx: 0,
            vy: 0,
            radius: dotSize,
            intensity: 0,
          });
        }
      }
    };

    const addRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.9,
        speed: 7.5,
        amplitude: 22,
        decay: 0.965,
        opacity: 1,
      });
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      mouse.targetX = clientX - rect.left;
      mouse.targetY = clientY - rect.top;
      mouse.isActive = true;
    };

    const handlePointerLeave = () => {
      mouse.isActive = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const x = clientX - rect.left;
      const y = clientY - rect.top;
      addRipple(x, y);
    };

    // Attach interaction listeners to the container & window
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    container.addEventListener('pointerdown', handlePointerDown, {
      passive: true,
    });
    document.addEventListener('mouseleave', handlePointerLeave);

    const resizeObserver = new ResizeObserver(() => {
      initGrid();
    });
    resizeObserver.observe(container);
    initGrid();

    // Trigger an initial gentle ripple from center on mount
    const startTimeout = setTimeout(() => {
      if (width > 0 && height > 0) {
        addRipple(width / 2, height / 2);
      }
    }, 400);

    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Mouse position smoothing (lerp)
      if (mouse.isActive) {
        mouse.x += (mouse.targetX - mouse.x) * 0.2;
        mouse.y += (mouse.targetY - mouse.y) * 0.2;
      } else {
        mouse.x += (-1000 - mouse.x) * 0.1;
        mouse.y += (-1000 - mouse.y) * 0.1;
      }

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.radius += ripple.speed;
        ripple.amplitude *= ripple.decay;
        ripple.opacity *= ripple.decay;

        if (ripple.radius > ripple.maxRadius || ripple.opacity < 0.01) {
          ripples.splice(i, 1);
        }
      }

      ctx.clearRect(0, 0, width, height);

      const timeSec = time * 0.001;

      // Update and draw points
      const pointsLen = points.length;
      for (let i = 0; i < pointsLen; i++) {
        const p = points[i];

        // 1. Ambient gentle breathing
        const ambientX =
          Math.sin(p.originX * 0.008 + timeSec * 0.8) *
          Math.cos(p.originY * 0.008 + timeSec * 0.6) *
          2.2;
        const ambientY =
          Math.cos(p.originX * 0.008 + timeSec * 0.7) *
          Math.sin(p.originY * 0.008 + timeSec * 0.9) *
          2.2;

        let targetX = p.originX + ambientX;
        let targetY = p.originY + ambientY;
        let targetIntensity = 0;

        // 2. Mouse Warping / Gravitational Bending
        if (mouse.isActive || mouse.x > -500) {
          const dx = mouse.x - p.originX;
          const dy = mouse.y - p.originY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius && dist > 0.001) {
            const factor = Math.pow(1 - dist / mouseRadius, 1.8);
            // Attract towards cursor with smooth kinetic displacement
            const warpStrength = 24 * factor;
            targetX += (dx / dist) * warpStrength;
            targetY += (dy / dist) * warpStrength;
            targetIntensity = Math.max(targetIntensity, factor * 0.9);
          }
        }

        // 3. Ripple Shockwave Displacement
        const ripplesLen = ripples.length;
        for (let r = 0; r < ripplesLen; r++) {
          const ripple = ripples[r];
          const rdx = p.originX - ripple.x;
          const rdy = p.originY - ripple.y;
          const rDist = Math.sqrt(rdx * rdx + rdy * rdy);

          const waveWidth = 55;
          const distDiff = Math.abs(rDist - ripple.radius);

          if (distDiff < waveWidth && rDist > 0.001) {
            const waveIntensity = Math.cos(
              (distDiff / waveWidth) * (Math.PI / 2)
            );
            const disp = waveIntensity * ripple.amplitude;
            targetX += (rdx / rDist) * disp;
            targetY += (rdy / rDist) * disp;
            targetIntensity = Math.max(
              targetIntensity,
              waveIntensity * ripple.opacity
            );
          }
        }

        // 4. Spring physics integration
        const springK = 18;
        const damping = 0.82;

        const ax = (targetX - p.x) * springK;
        const ay = (targetY - p.y) * springK;

        p.vx = (p.vx + ax * delta) * damping;
        p.vy = (p.vy + ay * delta) * damping;

        p.x += p.vx;
        p.y += p.vy;

        p.intensity += (targetIntensity - p.intensity) * 0.15;

        // 5. Render Dot
        const baseAlpha = 0.14;
        const glowAlpha = 0.86;
        const alpha = baseAlpha + p.intensity * (glowAlpha - baseAlpha);
        const radius = p.radius + p.intensity * 0.8;

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('mouseleave', handlePointerLeave);
      resizeObserver.disconnect();
    };
  }, [gridSpacing, dotSize, mouseRadius]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-auto absolute inset-0 z-0 h-full w-full overflow-hidden bg-[#09090B] ${className}`}
      style={{
        maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, black 80%, transparent 100%)',
      }}
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-[450px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-600/5 blur-[120px]" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full cursor-crosshair touch-none"
      />
    </div>
  );
});
