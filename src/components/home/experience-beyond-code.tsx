'use client';

import React, {
  useState,
  useEffect,
  useCallback,
  useSyncExternalStore,
} from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { experiences } from '@/data/experiences';
import { motion as m, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

// Swiper React Components & Modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Keyboard, Mousewheel } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

const emptySubscribe = () => () => {};

export function ExperienceBeyondCode() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<number>(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const handleOpenLightbox = (index: number) => {
    setDirection(0);
    setLightboxIndex(index);
  };

  const handleLightboxNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setDirection(1);
      setLightboxIndex((prev) =>
        prev !== null ? (prev + 1) % experiences.length : 0
      );
    }
  }, [lightboxIndex]);

  const handleLightboxPrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setDirection(-1);
      setLightboxIndex((prev) =>
        prev !== null ? (prev - 1 + experiences.length) % experiences.length : 0
      );
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
      <div className="xs:px-6 relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12">
        {/* Constrained Section Divider Matching Technical Expertise & Engineering Journey */}
        <div className="mt-16 flex w-full flex-col items-center border-t border-white/5 pt-16 sm:mt-24 sm:pt-24 md:mt-32 md:pt-32">
          {/* Section Header */}
          <ScrollReveal className="w-full">
            <div className="mx-auto mb-10 flex w-full max-w-3xl flex-col items-center gap-4 text-center sm:mb-14 sm:gap-6 md:mb-20">
              <h2 className="flex flex-col gap-1 text-center text-3xl font-bold tracking-tight text-zinc-50 md:gap-2 md:text-5xl lg:text-6xl">
                <span className="text-zinc-500">Experience</span>
                <span>Beyond Code</span>
              </h2>
              <div className="flex max-w-2xl flex-col gap-3 px-2 text-center text-base leading-relaxed text-zinc-400 md:text-lg">
                <p>
                  My journey extends{' '}
                  <span className="font-semibold text-zinc-100">
                    beyond writing code
                  </span>
                  . Through{' '}
                  <span className="font-semibold text-zinc-100">
                    leadership
                  </span>
                  ,{' '}
                  <span className="font-semibold text-zinc-100">
                    startup development
                  </span>
                  ,{' '}
                  <span className="font-semibold text-zinc-100">
                    competitions
                  </span>
                  ,{' '}
                  <span className="font-semibold text-zinc-100">teaching</span>,
                  and{' '}
                  <span className="font-semibold text-zinc-100">
                    technology communities
                  </span>
                  , I have strengthened my{' '}
                  <span className="font-semibold text-zinc-100">
                    collaboration
                  </span>
                  ,{' '}
                  <span className="font-semibold text-zinc-100">
                    problem-solving
                  </span>
                  , and{' '}
                  <span className="font-semibold text-zinc-100">
                    engineering mindset
                  </span>
                  .
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* 3D Stacked Cards Deck (Swiper Effect Cards) */}
          <div className="relative flex w-full flex-col items-center">
            {/* Card Deck Wrapper with Responsive Width & Aspect Ratio */}
            <div className="xs:w-[280px] xs:h-[400px] h-[370px] w-[260px] sm:h-[420px] sm:w-[300px] md:h-[440px] md:w-[320px]">
              <Swiper
                effect={'cards'}
                grabCursor={true}
                speed={320}
                touchRatio={1.25}
                touchAngle={45}
                resistanceRatio={0.65}
                watchSlidesProgress={true}
                modules={[EffectCards, Keyboard, Mousewheel]}
                className="h-full w-full !overflow-visible"
                cardsEffect={{
                  slideShadows: false,
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
                  <SwiperSlide
                    key={exp.title}
                    className="h-full w-full transform-gpu overflow-hidden rounded-[20px] shadow-2xl will-change-transform sm:rounded-[24px]"
                  >
                    <div
                      onClick={() => handleOpenLightbox(idx)}
                      className="group relative h-full w-full cursor-pointer overflow-hidden rounded-[20px] border border-white/15 bg-zinc-900 select-none sm:rounded-[24px]"
                    >
                      {/* Background Card Image */}
                      <Image
                        src={exp.image}
                        alt={exp.title}
                        fill
                        quality={80}
                        sizes="(max-width: 640px) 280px, (max-width: 768px) 350px, 450px"
                        style={{
                          objectPosition: exp.imagePosition || '50% 50%',
                        }}
                        className="pointer-events-none object-cover brightness-95 contrast-[1.05] grayscale md:transition-all md:duration-500 md:group-hover:scale-105 md:group-hover:brightness-100 md:group-hover:grayscale-0"
                        loading={idx === 0 ? 'eager' : 'lazy'}
                      />

                      {/* Top Right Solid/Frosted Year Badge */}
                      <div className="xs:top-3.5 xs:right-3.5 absolute top-3 right-3 z-20 flex items-center justify-center rounded-full border border-white/20 bg-black/75 px-2.5 py-1 shadow-lg sm:top-4 sm:right-4">
                        <span className="xs:text-[11px] font-mono text-[10px] font-bold tracking-wider text-white sm:text-xs">
                          {exp.year}
                        </span>
                      </div>

                      {/* Gradient Overlay for Clean Text Legibility */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 via-50% to-transparent" />

                      {/* Card Content Area: Judul dan Deskripsi Ringkas */}
                      <div className="xs:p-4 absolute right-0 bottom-0 left-0 z-10 flex flex-col gap-0.5 p-3.5 sm:p-5">
                        <h3 className="xs:text-lg text-base leading-snug font-bold tracking-tight text-white transition-colors group-hover:text-zinc-100 sm:text-xl">
                          {exp.title}
                        </h3>

                        <p className="xs:text-xs text-[11px] font-medium tracking-wide text-zinc-300 sm:text-[13px]">
                          {exp.subtitle}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Navigation Controls & Indicators - Matching Modal Pop-up Controls */}
            <div className="z-10 mt-8 flex items-center justify-center gap-3 sm:mt-10 sm:gap-4">
              <button
                onClick={() => swiperInstance?.slidePrev()}
                disabled={activeIndex === 0}
                className="flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-zinc-900/90 text-zinc-300 shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:bg-zinc-800 hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 sm:h-11 sm:w-11"
                aria-label="Previous card"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Pagination Numbers Capsule */}
              <div className="flex h-10 w-24 flex-shrink-0 items-center justify-center gap-2 rounded-full border border-white/15 bg-zinc-900/90 font-mono text-xs text-zinc-400 tabular-nums shadow-xl backdrop-blur-md select-none sm:h-11 sm:w-28 sm:text-sm">
                <span className="w-4 text-center font-bold text-white sm:w-5">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-zinc-600">/</span>
                <span className="w-4 text-center sm:w-5">
                  {String(experiences.length).padStart(2, '0')}
                </span>
              </div>

              <button
                onClick={() => swiperInstance?.slideNext()}
                disabled={activeIndex === experiences.length - 1}
                className="flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-zinc-900/90 text-zinc-300 shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:bg-zinc-800 hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 sm:h-11 sm:w-11"
                aria-label="Next card"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

            {/* Swipe Hint */}
            <p className="mt-3 flex items-center gap-1.5 text-[11px] text-zinc-500 sm:mt-4 sm:text-xs">
              <Sparkles className="h-3.5 w-3.5" />
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
                className="xs:p-4 fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto p-3 sm:p-6"
                style={{ transform: 'translateZ(0)' }}
              >
                {/* Backdrop Layer */}
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="fixed inset-0 -z-10 cursor-pointer bg-black/80 backdrop-blur-[3px]"
                  onClick={() => setLightboxIndex(null)}
                />

                {/* Modal Container Wrapper */}
                <m.div
                  initial={{ opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 8 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 my-auto flex w-full max-w-lg flex-col items-center gap-4 sm:max-w-3xl sm:gap-5 lg:max-w-4xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Photo-First Editorial Card with Directional Smooth Slide Transition */}
                  <div className="xs:aspect-[3/4] xs:rounded-[24px] relative aspect-[4/5] w-full overflow-hidden rounded-[20px] border border-white/15 bg-zinc-950 shadow-[0_25px_80px_rgba(0,0,0,0.95)] sm:aspect-video sm:rounded-[28px]">
                    <AnimatePresence
                      custom={direction}
                      initial={false}
                      mode="popLayout"
                    >
                      <m.div
                        key={lightboxIndex}
                        custom={direction}
                        variants={{
                          enter: (dir: number) => ({
                            x: dir === 0 ? 0 : dir > 0 ? 70 : -70,
                            opacity: 0,
                            scale: 0.98,
                          }),
                          center: {
                            x: 0,
                            opacity: 1,
                            scale: 1,
                            transition: {
                              x: {
                                type: 'spring',
                                stiffness: 340,
                                damping: 32,
                              },
                              opacity: { duration: 0.28 },
                              scale: { duration: 0.28 },
                            },
                          },
                          exit: (dir: number) => ({
                            x: dir === 0 ? 0 : dir > 0 ? -70 : 70,
                            opacity: 0,
                            scale: 0.98,
                            transition: {
                              x: {
                                type: 'spring',
                                stiffness: 340,
                                damping: 32,
                              },
                              opacity: { duration: 0.2 },
                              scale: { duration: 0.2 },
                            },
                          }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(_, info) => {
                          if (info.offset.x < -40 || info.velocity.x < -300) {
                            handleLightboxNext();
                          } else if (
                            info.offset.x > 40 ||
                            info.velocity.x > 300
                          ) {
                            handleLightboxPrev();
                          }
                        }}
                        className="absolute inset-0 h-full w-full touch-pan-y"
                      >
                        <Image
                          src={experiences[lightboxIndex].image}
                          alt={experiences[lightboxIndex].title}
                          fill
                          priority
                          sizes="(max-width: 640px) 95vw, (max-width: 768px) 100vw, 1200px"
                          style={{
                            objectPosition:
                              experiences[lightboxIndex].imagePosition ||
                              '50% 50%',
                            transform:
                              experiences[lightboxIndex].imageTransform ||
                              'none',
                          }}
                          className="pointer-events-none object-cover select-none"
                        />

                        {/* Seamless Gradient Blend Overlay at Bottom */}
                        <div className="xs:h-48 pointer-events-none absolute inset-x-0 bottom-0 z-10 h-44 bg-gradient-to-t from-black/95 via-black/65 via-50% to-transparent sm:h-52" />

                        {/* Caption Text Content seamlessly integrated */}
                        <div className="xs:px-6 xs:py-5 pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col gap-1 px-4 py-4 sm:gap-2 sm:px-8 sm:py-6">
                          {/* Judul: Besar, Bold, Putih */}
                          <m.h3
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08, duration: 0.25 }}
                            className="xs:text-lg text-base leading-tight font-bold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-xl md:text-2xl"
                          >
                            {experiences[lightboxIndex].title}
                          </m.h3>

                          {/* Deskripsi Ringkas */}
                          {(experiences[lightboxIndex].story ||
                            experiences[lightboxIndex].description) && (
                            <m.p
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.12, duration: 0.25 }}
                              className="line-clamp-3 max-w-2xl text-xs leading-relaxed text-zinc-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] sm:line-clamp-2 sm:text-sm"
                            >
                              {experiences[lightboxIndex].story ||
                                experiences[lightboxIndex].description}
                            </m.p>
                          )}
                        </div>
                      </m.div>
                    </AnimatePresence>

                    {/* Refined Minimalist Close Button - Fixed Top Right */}
                    <button
                      onClick={() => setLightboxIndex(null)}
                      className="absolute top-3.5 right-3.5 z-30 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/55 text-zinc-300 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-white/40 hover:bg-black/80 hover:text-white active:scale-95 sm:top-4 sm:right-4"
                      aria-label="Close modal"
                    >
                      <X className="h-4 w-4" />
                    </button>
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
                      className="flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-zinc-900/90 text-zinc-300 shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:bg-zinc-800 hover:text-white active:scale-95 sm:h-11 sm:w-11"
                      aria-label="Previous experience"
                    >
                      <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>

                    <div className="flex h-10 w-24 flex-shrink-0 items-center justify-center gap-2 rounded-full border border-white/15 bg-zinc-900/90 font-mono text-xs text-zinc-400 tabular-nums shadow-xl backdrop-blur-md select-none sm:h-11 sm:w-28 sm:text-sm">
                      <div className="relative h-4 w-4 overflow-hidden sm:h-5 sm:w-5">
                        <AnimatePresence mode="popLayout" initial={false}>
                          <m.span
                            key={lightboxIndex}
                            initial={{ y: direction > 0 ? 8 : -8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: direction > 0 ? -8 : 8, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 flex items-center justify-center font-bold text-white"
                          >
                            {String(lightboxIndex + 1).padStart(2, '0')}
                          </m.span>
                        </AnimatePresence>
                      </div>
                      <span className="text-zinc-600">/</span>
                      <span className="w-4 text-center sm:w-5">
                        {String(experiences.length).padStart(2, '0')}
                      </span>
                    </div>

                    <button
                      onClick={handleLightboxNext}
                      className="flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-zinc-900/90 text-zinc-300 shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:bg-zinc-800 hover:text-white active:scale-95 sm:h-11 sm:w-11"
                      aria-label="Next experience"
                    >
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
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
