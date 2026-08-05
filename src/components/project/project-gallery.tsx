'use client';

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useSyncExternalStore,
} from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ProjectData } from '@/data/projects';
import { motion as m, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

const emptySubscribe = () => () => {};

export function ProjectGallery({ project }: { project: ProjectData }) {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const isDraggingRef = useRef(false);

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gallery = project.gallery;
  const maxIndex = Math.max(0, gallery.length - itemsPerPage);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // Swipe handlers for inline gallery
  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number } }
  ) => {
    const swipe = info.offset.x;
    if (swipe < -40) handleNext();
    else if (swipe > 40) handlePrev();

    // Release drag flag quickly so subsequent taps are responsive
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 60);
  };

  const handleCardClick = (index: number) => {
    if (isDraggingRef.current) return;
    setLightboxIndex(index);
  };

  // Lightbox navigation
  const handleLightboxNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev !== null ? (prev + 1) % gallery.length : 0
      );
    }
  }, [gallery.length, lightboxIndex]);

  const handleLightboxPrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev !== null ? (prev - 1 + gallery.length) % gallery.length : 0
      );
    }
  }, [gallery.length, lightboxIndex]);

  // Keyboard navigation for Lightbox
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

  // Lock body scroll when lightbox is open
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

  if (!gallery || gallery.length === 0) return null;

  const maxDisplayCount = Math.max(1, gallery.length - itemsPerPage + 1);

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="h-[1px] w-full bg-white/10" />
      </div>
      <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-8 md:py-32 lg:px-12">
        <ScrollReveal>
          <div className="flex flex-col gap-12">
            {/* Header */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-50 md:text-3xl">
                <span className="text-zinc-500">Design</span> Gallery
              </h2>
            </div>

            {/* Continuous Smooth Slider Track */}
            <div className="relative -mx-3 overflow-hidden px-3">
              <m.div
                animate={{
                  x: `-${currentIndex * (100 / itemsPerPage)}%`,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 240,
                  damping: 30,
                  mass: 0.5,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                className="flex transform-gpu cursor-grab touch-pan-y will-change-transform active:cursor-grabbing"
              >
                {gallery.map((image, actualIndex) => (
                  <div
                    key={`${image.src}-${actualIndex}`}
                    style={{ width: `${100 / itemsPerPage}%` }}
                    className="shrink-0 px-3"
                  >
                    <div
                      onClick={() => handleCardClick(actualIndex)}
                      role="button"
                      tabIndex={0}
                      className="group relative flex aspect-video w-full transform-gpu cursor-pointer items-center justify-center overflow-hidden rounded-[20px] border border-white/10 bg-[#111111] transition-all duration-200 will-change-transform hover:border-white/25 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] active:scale-[0.98] sm:rounded-[24px]"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        quality={85}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover opacity-85 grayscale transition-all duration-300 ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-0"
                      />
                      {/* Subtle inner shadow for premium feel */}
                      <div className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-white/10 transition-all duration-300 ring-inset group-hover:ring-white/20 sm:rounded-[24px]" />
                    </div>
                  </div>
                ))}
              </m.div>
            </div>

            {/* Centered Navigation Controls (Mobile & Desktop) */}
            {gallery.length > itemsPerPage && (
              <div className="mt-2 flex justify-center sm:mt-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-zinc-900/90 text-zinc-300 shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:bg-zinc-800 hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-zinc-300"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <div className="flex h-10 w-24 flex-shrink-0 items-center justify-center gap-2 rounded-full border border-white/15 bg-zinc-900/90 font-mono text-xs text-zinc-400 tabular-nums shadow-xl backdrop-blur-md select-none">
                    <span className="w-4 text-center font-bold text-white">
                      {String(currentIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="text-zinc-600">/</span>
                    <span className="w-4 text-center">
                      {String(maxDisplayCount).padStart(2, '0')}
                    </span>
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={currentIndex === maxIndex}
                    className="flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-zinc-900/90 text-zinc-300 shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:bg-zinc-800 hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-zinc-300"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>

      {/* Photo-First Storytelling Modal matching Beyond Code Modal Style */}
      {isMounted &&
        createPortal(
          <AnimatePresence>
            {lightboxIndex !== null && (
              <div
                className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto p-4 sm:p-6"
                style={{ transform: 'translateZ(0)' }}
              >
                {/* Backdrop Layer */}
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="fixed inset-0 -z-10 cursor-pointer bg-black/85 backdrop-blur-[2px]"
                  onClick={() => setLightboxIndex(null)}
                />

                {/* Modal Container Wrapper */}
                <m.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 my-auto flex w-full max-w-3xl transform-gpu flex-col items-center gap-4 will-change-transform sm:gap-5 lg:max-w-4xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Photo-First Editorial Card */}
                  <div className="relative aspect-video w-full transform-gpu overflow-hidden rounded-[20px] border border-white/15 bg-zinc-950 shadow-2xl sm:rounded-[28px] sm:shadow-[0_25px_80px_rgba(0,0,0,0.95)]">
                    <Image
                      src={gallery[lightboxIndex].src}
                      alt={gallery[lightboxIndex].alt}
                      fill
                      priority
                      quality={85}
                      sizes="(max-width: 768px) 100vw, 1200px"
                      className="object-cover"
                    />

                    {/* Refined Minimalist Close Button */}
                    <button
                      onClick={() => setLightboxIndex(null)}
                      className="absolute top-3.5 right-3.5 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/55 text-zinc-300 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-white/30 hover:bg-black/80 hover:text-white active:scale-95 sm:top-4 sm:right-4"
                      aria-label="Close modal"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    {/* Seamless Gradient Blend Overlay at Bottom (No hard lines or borders) */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/90 via-black/45 to-transparent sm:h-36" />

                    {/* Caption Text Content seamlessly integrated */}
                    <div className="absolute inset-x-0 bottom-0 z-20 flex items-end px-5 py-4 sm:px-8 sm:py-6">
                      <h3 className="xs:text-base text-sm leading-tight font-bold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-lg md:text-xl">
                        {gallery[lightboxIndex].alt}
                      </h3>
                    </div>
                  </div>

                  {/* Navigation Controls Floating OUTSIDE the Modal Card */}
                  <div className="flex items-center justify-center gap-3 sm:gap-4">
                    <button
                      onClick={handleLightboxPrev}
                      className="flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-zinc-900/90 text-zinc-300 shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:bg-zinc-800 hover:text-white active:scale-95 sm:h-11 sm:w-11"
                      aria-label="Previous design"
                    >
                      <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>

                    <div className="flex h-10 w-24 flex-shrink-0 items-center justify-center gap-2 rounded-full border border-white/15 bg-zinc-900/90 font-mono text-xs text-zinc-400 tabular-nums shadow-xl backdrop-blur-md select-none sm:h-11 sm:w-28 sm:text-sm">
                      <span className="w-4 text-center font-bold text-white sm:w-5">
                        {String(lightboxIndex + 1).padStart(2, '0')}
                      </span>
                      <span className="text-zinc-600">/</span>
                      <span className="w-4 text-center sm:w-5">
                        {String(gallery.length).padStart(2, '0')}
                      </span>
                    </div>

                    <button
                      onClick={handleLightboxNext}
                      className="flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-zinc-900/90 text-zinc-300 shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:bg-zinc-800 hover:text-white active:scale-95 sm:h-11 sm:w-11"
                      aria-label="Next design"
                    >
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                </m.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
