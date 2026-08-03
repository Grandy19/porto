"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { experiences } from '@/data/experiences';
import { motion as m, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

// Swiper React Components & Modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation, Pagination, Keyboard, Mousewheel } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function ExperienceBeyondCode() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLightboxNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null ? (prev + 1) % experiences.length : 0));
    }
  }, [lightboxIndex]);

  const handleLightboxPrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null ? (prev - 1 + experiences.length) % experiences.length : 0));
    }
  }, [lightboxIndex]);

  // Keyboard navigation for Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleLightboxNext();
      if (e.key === 'ArrowLeft') handleLightboxPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleLightboxNext, handleLightboxPrev]);

  // Clean scroll lock
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  return (
    <section id="beyond-code" className="relative w-full overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Constrained Section Divider Matching Technical Expertise & Engineering Journey */}
        <div className="w-full mt-16 sm:mt-24 md:mt-32 pt-16 sm:pt-24 md:pt-32 border-t border-white/5 flex flex-col items-center">
          
          {/* Section Header */}
          <ScrollReveal className="w-full">
            <div className="flex flex-col items-center text-center gap-4 sm:gap-6 max-w-3xl mx-auto w-full mb-10 sm:mb-14 md:mb-20">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-50 md:text-5xl lg:text-6xl text-center flex flex-col gap-1 md:gap-2">
                <span className="text-zinc-500">Experience</span>
                <span>Beyond Code</span>
              </h2>
              <div className="flex flex-col gap-3 text-base text-zinc-400 leading-relaxed md:text-lg max-w-2xl text-center px-2">
                <p>
                  My journey extends beyond writing code. Through leadership, startup development, competitions, teaching, and technology communities, I have strengthened my collaboration, problem-solving, and engineering mindset.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* 3D Stacked Cards Deck (Swiper Effect Cards) */}
          <div className="relative w-full flex flex-col items-center">
            
            {/* Card Deck Wrapper with Responsive Width & Aspect Ratio */}
            <div className="w-[260px] h-[370px] xs:w-[280px] xs:h-[400px] sm:w-[300px] sm:h-[420px] md:w-[320px] md:h-[440px]">
              <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards, Navigation, Pagination, Keyboard, Mousewheel]}
                className="w-full h-full !overflow-visible"
                cardsEffect={{
                  slideShadows: true,
                  perSlideRotate: 3,
                  perSlideOffset: 8,
                }}
                mousewheel={{
                  forceToAxis: true,
                  sensitivity: 1,
                  releaseOnEdges: true,
                }}
                keyboard={{
                  enabled: true,
                  onlyInViewport: true,
                }}
                onSwiper={(swiper) => setSwiperInstance(swiper)}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              >
                {experiences.map((exp, idx) => (
                  <SwiperSlide key={exp.title} className="w-full h-full rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-2xl">
                    <div
                      onClick={() => setLightboxIndex(idx)}
                      className="group relative w-full h-full bg-zinc-900 border border-white/15 rounded-[20px] sm:rounded-[24px] overflow-hidden cursor-pointer select-none"
                    >
                      {/* Background Card Image - Sharp Monochrome by default, Colorful on hover */}
                      <Image
                        src={exp.image}
                        alt={exp.title}
                        fill
                        quality={95}
                        sizes="(max-width: 640px) 280px, (max-width: 768px) 350px, 450px"
                        style={{ objectPosition: exp.imagePosition || '50% 50%' }}
                        className="object-cover filter grayscale contrast-[1.05] brightness-95 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 ease-out group-hover:scale-105"
                        priority={idx < 3}
                      />

                      {/* Top Right Frosted Glass Year Badge with White Text */}
                      <div className="absolute top-3 right-3 xs:top-3.5 xs:right-3.5 sm:top-4 sm:right-4 z-20 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center">
                        <span className="text-[10px] xs:text-[11px] sm:text-xs font-mono font-bold text-white tracking-wider">
                          {exp.year}
                        </span>
                      </div>

                      {/* Gradient Overlay for Clean Text Legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 via-50% to-transparent pointer-events-none transition-opacity duration-300" />

                      {/* Card Content Area: Judul dan Deskripsi Ringkas */}
                      <div className="absolute bottom-0 left-0 right-0 p-3.5 xs:p-4 sm:p-5 flex flex-col gap-0.5 z-10">
                        <h3 className="text-base xs:text-lg sm:text-xl font-bold text-white leading-snug tracking-tight group-hover:text-zinc-100 transition-colors">
                          {exp.title}
                        </h3>

                        <p className="text-[11px] xs:text-xs sm:text-[13px] text-zinc-300 font-medium tracking-wide">
                          {exp.subtitle}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Navigation Controls & Indicators - Matching Modal Pop-up Controls */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 z-10">
              <button
                onClick={() => swiperInstance?.slidePrev()}
                disabled={activeIndex === 0}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-zinc-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0 flex items-center justify-center shadow-xl backdrop-blur-md"
                aria-label="Previous card"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Pagination Numbers Capsule */}
              <div className="w-24 sm:w-28 h-10 sm:h-11 flex items-center justify-center gap-2 font-mono text-xs sm:text-sm text-zinc-400 bg-zinc-900/90 border border-white/15 rounded-full shadow-xl select-none backdrop-blur-md tabular-nums flex-shrink-0">
                <span className="w-4 sm:w-5 text-center text-white font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
                <span className="text-zinc-600">/</span>
                <span className="w-4 sm:w-5 text-center">{String(experiences.length).padStart(2, '0')}</span>
              </div>

              <button
                onClick={() => swiperInstance?.slideNext()}
                disabled={activeIndex === experiences.length - 1}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-zinc-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0 flex items-center justify-center shadow-xl backdrop-blur-md"
                aria-label="Next card"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Swipe Hint */}
            <p className="text-[11px] sm:text-xs text-zinc-500 flex items-center gap-1.5 mt-3 sm:mt-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Swipe or use buttons to explore</span>
            </p>

          </div>
        </div>
      </div>

      {/* Photo-First Storytelling Editorial Modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {lightboxIndex !== null && (
              <div 
                className="fixed inset-0 z-[9999] flex items-center justify-center p-3 xs:p-4 sm:p-6 overflow-y-auto"
                style={{ transform: 'translateZ(0)' }}
              >
                {/* Backdrop Layer */}
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="fixed inset-0 bg-black/80 backdrop-blur-[3px] -z-10 cursor-pointer"
                  onClick={() => setLightboxIndex(null)}
                />

                {/* Modal Container Wrapper */}
                <m.div
                  initial={{ opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 8 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full max-w-lg sm:max-w-3xl lg:max-w-4xl flex flex-col items-center gap-4 sm:gap-5 my-auto z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Photo-First Editorial Card */}
                  <div className="relative w-full aspect-[4/5] xs:aspect-[3/4] sm:aspect-video bg-zinc-950 border border-white/15 rounded-[20px] xs:rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)]">
                    <Image
                      src={experiences[lightboxIndex].image}
                      alt={experiences[lightboxIndex].title}
                      fill
                      priority
                      sizes="(max-width: 640px) 95vw, (max-width: 768px) 100vw, 1200px"
                      style={{ 
                        objectPosition: experiences[lightboxIndex].imagePosition || '50% 50%',
                        transform: experiences[lightboxIndex].imageTransform || 'none'
                      }}
                      className="object-cover"
                    />

                    {/* Refined Minimalist Close Button */}
                    <button
                      onClick={() => setLightboxIndex(null)}
                      className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/55 hover:bg-black/80 border border-white/20 hover:border-white/40 text-zinc-300 hover:text-white backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                      aria-label="Close modal"
                    >
                      <X className="w-4 h-4" />
                    </button>



                    {/* Seamless Gradient Blend Overlay at Bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-44 xs:h-48 sm:h-52 bg-gradient-to-t from-black/95 via-black/65 via-50% to-transparent pointer-events-none z-10" />

                    {/* Caption Text Content seamlessly integrated */}
                    <div className="absolute inset-x-0 bottom-0 z-20 px-4 py-4 xs:px-6 xs:py-5 sm:px-8 sm:py-6 flex flex-col gap-1 sm:gap-2">
                      {/* Judul: Besar, Bold, Putih */}
                      <m.h3 
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.1, duration: 0.25 }}
                        className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                      >
                        {experiences[lightboxIndex].title}
                      </m.h3>

                      {/* Deskripsi Ringkas */}
                      {(experiences[lightboxIndex].story || experiences[lightboxIndex].description) && (
                        <m.p 
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: 0.15, duration: 0.25 }}
                          className="text-xs sm:text-sm text-zinc-300 line-clamp-3 sm:line-clamp-2 max-w-2xl leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
                        >
                          {experiences[lightboxIndex].story || experiences[lightboxIndex].description}
                        </m.p>
                      )}
                    </div>
                  </div>

                  {/* Navigation Controls Floating OUTSIDE the Modal Card */}
                  <m.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.28, duration: 0.25 }}
                    className="flex items-center justify-center gap-3 sm:gap-4"
                  >
                    <button
                      onClick={handleLightboxPrev}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-zinc-300 hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0 flex items-center justify-center shadow-xl backdrop-blur-md"
                      aria-label="Previous experience"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    <div className="w-24 sm:w-28 h-10 sm:h-11 flex items-center justify-center gap-2 font-mono text-xs sm:text-sm text-zinc-400 bg-zinc-900/90 border border-white/15 rounded-full shadow-xl select-none backdrop-blur-md tabular-nums flex-shrink-0">
                      <span className="w-4 sm:w-5 text-center text-white font-bold">{String(lightboxIndex + 1).padStart(2, '0')}</span>
                      <span className="text-zinc-600">/</span>
                      <span className="w-4 sm:w-5 text-center">{String(experiences.length).padStart(2, '0')}</span>
                    </div>

                    <button
                      onClick={handleLightboxNext}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-zinc-300 hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0 flex items-center justify-center shadow-xl backdrop-blur-md"
                      aria-label="Next experience"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </m.div>

                </m.div>

              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
