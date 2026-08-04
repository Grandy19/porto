'use client';

import React from 'react';
import Image from 'next/image';
import { Certification } from '@/data/certifications';

interface CertificatePreviewProps {
  cert: Certification;
  isActive: boolean;
  distance?: number;
}

export function CertificatePreview({
  cert,
  isActive,
  distance = 0,
}: CertificatePreviewProps) {
  // Determine dark overlay opacity based on orbital distance from active center card
  const getDarkOverlayClass = () => {
    if (isActive || distance === 0) return 'bg-black/0';
    if (distance === 1) return 'bg-black/50 group-hover:bg-black/30';
    return 'bg-black/70 group-hover:bg-black/45';
  };

  return (
    <div
      className={`group relative h-full w-full overflow-hidden rounded-xl transition-all duration-300 select-none sm:rounded-2xl ${
        isActive
          ? 'shadow-[0_25px_60px_-12px_rgba(0,0,0,0.95)] ring-1 ring-white/30'
          : 'shadow-[0_12px_36px_-6px_rgba(0,0,0,0.6)] ring-1 ring-white/10'
      }`}
    >
      {/* Full Bleed Certificate Image with dynamic contrast & brightness */}
      <Image
        src={cert.image}
        alt={cert.title}
        fill
        className={`object-cover transition-all duration-500 ease-out group-hover:scale-[1.02] ${
          isActive
            ? 'brightness-100 contrast-100'
            : distance === 1
              ? 'brightness-85 contrast-[0.95]'
              : 'brightness-70 contrast-[0.90]'
        }`}
        sizes="(max-width: 640px) 290px, (max-width: 1024px) 370px, 420px"
        quality={95}
        priority
      />

      {/* Dark tint overlay for non-active cards to make active card pop */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-xl transition-colors duration-300 sm:rounded-2xl ${getDarkOverlayClass()}`}
      />

      {/* Crisp subtle border framing around rounded corners */}
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset sm:rounded-2xl" />
    </div>
  );
}
