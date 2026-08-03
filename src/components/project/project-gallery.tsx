"use client";

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ProjectData } from '@/data/projects';
import { motion as m, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export function ProjectGallery({ project }: { project: ProjectData }) {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [direction, setDirection] = useState(1);

  // Responsive items per page
  useEffect(() => {
    setIsMounted(true);
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
    setDirection(1);
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // Swipe handlers for inline gallery
  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x;
    if (swipe < -50) handleNext();
    else if (swipe > 50) handlePrev();
  };

  // Lightbox navigation
  const handleLightboxNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null ? (prev + 1) % gallery.length : 0));
    }
  }, [gallery.length, lightboxIndex]);

  const handleLightboxPrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null ? (prev - 1 + gallery.length) % gallery.length : 0));
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
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  if (!gallery || gallery.length === 0) return null;

  // Determine visible items for inline gallery
  const visibleItems = isMounted ? gallery.slice(currentIndex, currentIndex + itemsPerPage) : gallery.slice(0, 3);

  // Animation variants for slider
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      z: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      z: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <section className="relative w-full">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="w-full h-[1px] bg-white/10" />
      </div>
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-32">
        <ScrollReveal>
          <div className="flex flex-col gap-12">
            
            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Design <span className="text-zinc-400">Gallery</span>
                </h2>
              </div>

              {/* Custom Premium Navigation (Desktop) */}
              {gallery.length > itemsPerPage && (
                <div className="hidden sm:flex items-center gap-6 bg-white/5 border border-white/10 hover:border-white/20 hover:-translate-y-[2px] transition-all duration-300 rounded-full p-2 pr-6 pl-6 backdrop-blur-sm">
                  <button 
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-all disabled:opacity-30 disabled:hover:text-zinc-400 disabled:cursor-not-allowed group"
                  >
                    <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Previous
                  </button>
                  
                  <span className="text-sm font-mono text-zinc-500 min-w-[60px] text-center">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(gallery.length - itemsPerPage + 1).padStart(2, '0')}
                  </span>
                  
                  <button 
                    onClick={handleNext}
                    disabled={currentIndex === maxIndex}
                    className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-all disabled:opacity-30 disabled:hover:text-zinc-400 disabled:cursor-not-allowed group"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              )}
            </div>

            {/* Gallery Grid */}
            <div className="relative overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  {visibleItems.map((image, idx) => {
                    // Unique key combining actual array index allows Framer Motion to track identity correctly
                    const actualIndex = currentIndex + idx;
                    return (
                      <m.div
                        key={`${image.src}-${actualIndex}`}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          x: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.3 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={handleDragEnd}
                        onClick={() => setLightboxIndex(actualIndex)}
                        role="button"
                        tabIndex={0}
                        className="group relative aspect-video w-full rounded-[24px] overflow-hidden bg-[#111111] border border-white/10 cursor-pointer touch-pan-y flex items-center justify-center"
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-all duration-[450ms] ease-[cubic-bezier(.22,.61,.36,1)] grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.02]"
                        />
                        {/* Subtle inner shadow for premium feel */}
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[24px] pointer-events-none group-hover:ring-white/20 transition-all duration-500" />
                      </m.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Navigation (Centered Below Grid) */}
            {gallery.length > itemsPerPage && (
              <div className="flex sm:hidden justify-center mt-2">
                <div className="flex items-center gap-6 bg-white/5 border border-white/10 transition-all duration-300 rounded-full p-2 pr-6 pl-6 backdrop-blur-sm">
                  <button 
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-all disabled:opacity-30 disabled:hover:text-zinc-400 disabled:cursor-not-allowed group"
                  >
                    <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Previous
                  </button>
                  
                  <span className="text-sm font-mono text-zinc-500 min-w-[60px] text-center">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(gallery.length - itemsPerPage + 1).padStart(2, '0')}
                  </span>
                  
                  <button 
                    onClick={handleNext}
                    disabled={currentIndex === maxIndex}
                    className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-all disabled:opacity-30 disabled:hover:text-zinc-400 disabled:cursor-not-allowed group"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
                style={{ transform: 'translateZ(0)' }}
              >
                {/* Backdrop Layer */}
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="fixed inset-0 bg-black/80 backdrop-blur-[2px] -z-10 cursor-pointer"
                  onClick={() => setLightboxIndex(null)}
                />

                {/* Modal Container Wrapper */}
                <m.div
                  initial={{ opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 8 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full max-w-3xl lg:max-w-4xl flex flex-col items-center gap-5 my-auto z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Photo-First Editorial Card */}
                  <div className="relative w-full aspect-video bg-zinc-950 border border-white/15 rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)]">
                    <Image
                      src={gallery[lightboxIndex].src}
                      alt={gallery[lightboxIndex].alt}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 1200px"
                      className="object-cover"
                    />

                    {/* Refined Minimalist Close Button */}
                    <button
                      onClick={() => setLightboxIndex(null)}
                      className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/45 hover:bg-black/75 border border-white/15 hover:border-white/30 text-zinc-300 hover:text-white backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg hover:scale-105"
                      aria-label="Close modal"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Seamless Gradient Blend Overlay at Bottom (No hard lines or borders) */}
                    <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none z-10" />

                    {/* Caption Text Content seamlessly integrated */}
                    <div className="absolute inset-x-0 bottom-0 z-20 px-6 py-5 sm:px-8 sm:py-6 flex items-end">
                      {/* Judul: Besar, Bold, Putih */}
                      <m.h3 
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.1, duration: 0.25 }}
                        className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                      >
                        {gallery[lightboxIndex].alt}
                      </m.h3>
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
                      className="w-11 h-11 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-zinc-300 hover:text-white transition-all hover:scale-105 cursor-pointer flex-shrink-0 flex items-center justify-center shadow-xl backdrop-blur-md"
                      aria-label="Previous design"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="w-28 h-11 flex items-center justify-center gap-2 font-mono text-sm text-zinc-400 bg-zinc-900/90 border border-white/15 rounded-full shadow-xl select-none backdrop-blur-md tabular-nums flex-shrink-0">
                      <span className="w-5 text-center text-white font-bold">{String(lightboxIndex + 1).padStart(2, '0')}</span>
                      <span className="text-zinc-600">/</span>
                      <span className="w-5 text-center">{String(gallery.length).padStart(2, '0')}</span>
                    </div>

                    <button
                      onClick={handleLightboxNext}
                      className="w-11 h-11 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-zinc-300 hover:text-white transition-all hover:scale-105 cursor-pointer flex-shrink-0 flex items-center justify-center shadow-xl backdrop-blur-md"
                      aria-label="Next design"
                    >
                      <ChevronRight className="w-5 h-5" />
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
