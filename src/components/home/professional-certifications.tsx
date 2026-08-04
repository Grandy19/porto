'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion as m, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { certifications } from '@/data/certifications';
import { CertificatePreview } from './certificate-preview';

const VISIBLE_COUNT = 5;

export function ProfessionalCertifications() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [screenWidth, setScreenWidth] = useState<number>(1200);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });

  const total = certifications.length;

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const newIndex = ((index % total) + total) % total;
      setActiveIndex(newIndex);
    },
    [total]
  );

  const handleNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const handlePrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  // Auto-play interval with pause on hover/focus or when out of view
  useEffect(() => {
    if (!isInView || isHovered || isFocused) return;
    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, 4500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isInView, isHovered, isFocused, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Circular orbital position calculation based on Nexus UI circular-carousel
  const getItemPosition = (index: number) => {
    const isMobile = screenWidth < 640;
    const isTablet = screenWidth >= 640 && screenWidth < 1024;

    const radiusX = isMobile ? 135 : isTablet ? 255 : 345;
    const radiusY = isMobile ? 32 : isTablet ? 60 : 85;

    const offset = index - activeIndex;
    const half = Math.floor(VISIBLE_COUNT / 2);
    let adjustedOffset = offset;

    if (offset > half) adjustedOffset = offset - total;
    if (offset < -half) adjustedOffset = offset + total;

    if (Math.abs(adjustedOffset) > half * 2) {
      return {
        x: adjustedOffset * (isMobile ? 180 : 320),
        y: 120,
        scale: 0.5,
        rotate: adjustedOffset > 0 ? 20 : -20,
        opacity: 0,
        zIndex: 0,
        adjustedOffset,
        isVisible: false,
      };
    }

    const angle = (adjustedOffset / VISIBLE_COUNT) * Math.PI;
    const x = Math.sin(angle) * radiusX;
    const y = -Math.cos(angle) * radiusY + radiusY;

    const distance = Math.abs(adjustedOffset);
    const maxDistance = half + 1;
    const scale = Math.max(
      0.65,
      1 - (distance / maxDistance) * (isMobile ? 0.32 : 0.26)
    );
    const rotate = (adjustedOffset / VISIBLE_COUNT) * (isMobile ? 20 : 26);
    const zIndex = VISIBLE_COUNT - distance + 10;
    const opacity = isMobile && distance > 1 ? 0 : 1;

    return {
      x,
      y,
      scale,
      rotate,
      opacity,
      zIndex,
      distance,
      adjustedOffset,
      isVisible: opacity > 0,
    };
  };

  const activeCert = certifications[activeIndex];

  return (
    <section
      id="certifications"
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="relative w-full overflow-hidden"
    >
      <div className="xs:px-6 relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12">
        {/* Constrained Section Divider */}
        <div className="mt-16 flex w-full flex-col items-center border-t border-white/5 pt-16 sm:mt-24 sm:pt-24 md:mt-32 md:pt-32">
          {/* Section Header */}
          <ScrollReveal className="w-full">
            <div className="mx-auto mb-12 flex w-full max-w-3xl flex-col items-center gap-4 text-center sm:mb-16 sm:gap-6 md:mb-20">
              <h2 className="text-center text-3xl font-bold tracking-tight text-zinc-50 md:text-5xl lg:text-6xl">
                <span className="text-zinc-500">Professional</span>{' '}
                Certifications
              </h2>
              <p className="max-w-2xl px-2 text-center text-base leading-relaxed text-zinc-400 md:text-lg">
                Industry-recognized certifications validating my expertise
                across{' '}
                <span className="font-semibold text-zinc-100">
                  software engineering
                </span>
                ,{' '}
                <span className="font-semibold text-zinc-100">
                  artificial intelligence
                </span>
                ,{' '}
                <span className="font-semibold text-zinc-100">
                  data science
                </span>
                ,{' '}
                <span className="font-semibold text-zinc-100">
                  cloud technologies
                </span>
                , and{' '}
                <span className="font-semibold text-zinc-100">
                  UI/UX design
                </span>
                .
              </p>
            </div>
          </ScrollReveal>

          {/* Circular Carousel 3D Orbital Stage */}
          <div className="relative flex w-full flex-col items-center select-none">
            {/* Gesture Drag & Orbital Track Container */}
            <m.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                if (info.offset.x < -35) handleNext();
                else if (info.offset.x > 35) handlePrev();
              }}
              className="xs:min-h-[260px] relative flex min-h-[230px] w-full cursor-grab touch-pan-y items-center justify-center active:cursor-grabbing sm:min-h-[290px] md:min-h-[330px] lg:min-h-[360px]"
            >
              <AnimatePresence mode="popLayout">
                {certifications.map((cert, index) => {
                  const pos = getItemPosition(index);
                  const isActive = index === activeIndex;

                  return (
                    <m.div
                      key={cert.id}
                      initial={false}
                      animate={{
                        x: pos.x,
                        y: pos.y,
                        rotate: pos.rotate,
                        scale: pos.scale,
                        opacity: pos.opacity,
                        zIndex: pos.zIndex,
                      }}
                      transition={{
                        duration: 0.65,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{
                        y: pos.y - 8,
                        scale: pos.scale * 1.03,
                        transition: { duration: 0.2 },
                      }}
                      onClick={() => {
                        if (!isActive) goTo(index);
                      }}
                      style={{
                        transformOrigin: 'center center',
                        pointerEvents: pos.isVisible ? 'auto' : 'none',
                      }}
                      className={`xs:w-[290px] xs:h-[195px] absolute h-[174px] w-[260px] rounded-xl transition-shadow duration-300 sm:h-[220px] sm:w-[330px] sm:rounded-2xl md:h-[248px] md:w-[370px] lg:h-[275px] lg:w-[410px] ${
                        isActive ? 'cursor-default' : 'cursor-pointer'
                      }`}
                    >
                      <CertificatePreview
                        cert={cert}
                        isActive={isActive}
                        distance={pos.distance}
                      />
                    </m.div>
                  );
                })}
              </AnimatePresence>
            </m.div>

            {/* Number Indicator (e.g. 01 of 06) */}
            <div className="mt-6 mb-3 flex flex-col items-center justify-center sm:mt-8 sm:mb-4">
              <m.span
                key={activeIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="font-mono text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
              >
                {String(activeIndex + 1).padStart(2, '0')}
              </m.span>
              <span className="mt-1 text-[11px] font-semibold tracking-[0.25em] text-zinc-500 uppercase">
                of {String(total).padStart(2, '0')}
              </span>
            </div>

            {/* View Credential Action Link */}
            <div className="flex items-center justify-center">
              <a
                href={activeCert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-xs font-semibold text-zinc-200 shadow-sm transition-all hover:scale-[1.03] hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95"
              >
                <span>View Credential</span>
                <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Bottom Controls: Prev Arrow, Circular Dot Indicators, Next Arrow */}
            <div className="mt-6 mb-16 flex items-center justify-center gap-5 sm:mt-8 sm:mb-20 sm:gap-6 md:mb-28">
              <m.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                aria-label="Previous certificate"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 shadow-md backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/30 sm:h-11 sm:w-11"
              >
                <ChevronLeft className="h-5 w-5" />
              </m.button>

              {/* Dot Indicators */}
              <div
                className="flex items-center gap-1.5 sm:gap-2"
                role="tablist"
              >
                {certifications.map((_, idx) => (
                  <button
                    key={idx}
                    role="tab"
                    aria-selected={idx === activeIndex}
                    onClick={() => goTo(idx)}
                    aria-label={`Go to certificate ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? 'w-6 bg-white sm:w-8'
                        : 'w-1.5 bg-white/25 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              <m.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                aria-label="Next certificate"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 shadow-md backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/30 sm:h-11 sm:w-11"
              >
                <ChevronRight className="h-5 w-5" />
              </m.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
