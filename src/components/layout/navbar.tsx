'use client';

import * as React from 'react';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, Download, ArrowUpRight } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { useScroll } from '@/hooks/use-scroll';
import { useActiveSection } from '@/hooks/use-active-section';
import { navLinks } from '@/constants/navigation';
import { usePreloaderStatus } from '@/hooks/use-preloader-status';
import { cn } from '@/lib/utils';

export function Navbar() {
  const isPreloaderComplete = usePreloaderStatus();
  const scrolled = useScroll(20);
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  // Extract IDs from navLinks for IntersectionObserver
  const sectionIds = useMemo(
    () => navLinks.map((link) => link.href.replace('#', '')).filter(Boolean),
    []
  );
  const activeSection = useActiveSection(sectionIds);

  if (!isPreloaderComplete) {
    return null;
  }

  return (
    <m.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed top-3 right-0 left-0 z-[100] flex justify-center px-3.5 sm:top-5 sm:px-6"
    >
      {/* Capsule Container (Pill) */}
      <div
        className={cn(
          'pointer-events-auto flex w-full max-w-[1100px] items-center justify-between rounded-full border transition-all duration-200 ease-out',
          scrolled
            ? 'h-[52px] border-white/10 bg-zinc-950/85 px-3.5 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:h-[62px] sm:px-5 md:h-[68px]'
            : 'h-[56px] border-white/10 bg-zinc-950/60 px-3.5 py-2.5 shadow-md backdrop-blur-xl sm:h-[70px] sm:border-white/5 sm:px-6 sm:shadow-sm md:h-[80px] md:border-transparent md:bg-transparent md:px-8 md:shadow-none md:backdrop-blur-none'
        )}
      >
        {/* Kiri: Logo + Brand Identity */}
        <Link
          href="/#home"
          className={cn(
            'flex shrink-0 items-center gap-2.5 transition-transform duration-150 active:scale-95 sm:gap-3',
            scrolled ? 'scale-[0.97]' : 'scale-100'
          )}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-[2px] shadow-[0_0_12px_rgba(255,255,255,0.25)] sm:h-8 sm:w-8">
            <Image
              src="/logo.png"
              alt="Grandy Alexander Official Logo"
              width={32}
              height={32}
              priority
              className="h-full w-full object-contain"
            />
          </div>
          <span className="text-sm font-semibold tracking-tight text-zinc-50 sm:text-base md:text-xl">
            Grandy.
          </span>
        </Link>

        {/* Tengah: Navigation Links (Desktop) */}
        <nav className="hidden flex-1 items-center justify-center gap-8 md:flex lg:gap-10">
          {navLinks.map((link) => {
            const isProjectsPage = pathname.startsWith('/projects');
            const isActive = isProjectsPage
              ? link.name === 'Projects'
              : activeSection === link.href.replace('#', '');
            const href = pathname === '/' ? link.href : `/${link.href}`;
            return (
              <Link
                key={link.name}
                href={href}
                className={cn(
                  'relative py-1 text-sm font-medium tracking-wide transition-colors duration-150',
                  isActive
                    ? 'text-zinc-50'
                    : 'text-zinc-400 hover:text-zinc-200'
                )}
              >
                {link.name}
                {isActive && (
                  <m.div
                    layoutId="activeNavIndicator"
                    className="absolute right-0 -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-white/80 to-transparent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Kanan: Desktop Resume Button */}
        <div className="hidden shrink-0 md:flex">
          <button
            onClick={() => setResumeModalOpen(true)}
            className="group flex h-auto cursor-pointer items-center justify-center rounded-2xl bg-zinc-100 px-6 py-2.5 text-[10px] font-black tracking-[0.25em] text-zinc-950 uppercase shadow-none transition-all duration-150 hover:scale-[1.04] hover:bg-white active:scale-95 sm:px-8 sm:py-3"
          >
            Resume
          </button>
        </div>

        {/* Mobile Toggle Button (Instant touch-manipulation) */}
        <button
          className={cn(
            'flex h-9 w-9 shrink-0 cursor-pointer touch-manipulation items-center justify-center rounded-full border transition-transform duration-100 active:scale-90 md:hidden',
            mobileMenuOpen
              ? 'border-white/30 bg-white text-zinc-950 shadow-[0_0_15px_rgba(255,255,255,0.4)]'
              : 'border-white/15 bg-white/10 text-zinc-200 active:bg-white/20'
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown & Backdrop (Guaranteed Top Layer above all components & footer) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Lightweight GPU-Accelerated Frosted Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setMobileMenuOpen(false)}
              className="pointer-events-auto fixed inset-0 z-[110] touch-none bg-black/60 backdrop-blur-md md:hidden"
            />

            {/* Ultra-Responsive Mobile Menu Card */}
            <m.div
              initial={{ opacity: 0, scale: 0.96, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -6 }}
              transition={{ duration: 0.16, ease: [0.2, 0, 0, 1] }}
              className="pointer-events-auto fixed top-[64px] right-3.5 left-3.5 z-[120] mx-auto max-w-sm transform-gpu overflow-hidden rounded-[26px] border border-white/15 bg-zinc-950/95 p-4 shadow-[0_25px_60px_rgba(0,0,0,0.95)] sm:top-[76px] sm:p-5 md:hidden"
            >
              {/* Radial Top Ambient Rim Lighting */}
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* Card Header Label */}
              <div className="mb-2 px-1.5 pt-0.5">
                <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-zinc-400 uppercase">
                  Navigation
                </span>
              </div>

              {/* Navigation Items List */}
              <div className="relative z-10 flex flex-col gap-1">
                {navLinks.map((link, idx) => {
                  const isProjectsPage = pathname.startsWith('/projects');
                  const isActive = isProjectsPage
                    ? link.name === 'Projects'
                    : activeSection === link.href.replace('#', '');
                  const href = pathname === '/' ? link.href : `/${link.href}`;

                  return (
                    <Link
                      key={link.name}
                      href={href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'group flex min-h-[46px] touch-manipulation items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-100 active:scale-[0.98]',
                        isActive
                          ? 'border border-white/20 bg-white/10 font-semibold text-white shadow-sm'
                          : 'border border-transparent text-zinc-300 active:bg-white/[0.08] active:text-white'
                      )}
                    >
                      <span className="flex items-center gap-3">
                        {isActive ? (
                          <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]" />
                        ) : (
                          <span className="font-mono text-[11px] font-semibold tracking-wider text-zinc-500">
                            0{idx + 1}
                          </span>
                        )}
                        <span className="text-[14px] font-medium tracking-tight">
                          {link.name}
                        </span>
                      </span>

                      <ArrowUpRight
                        className={cn(
                          'h-4 w-4 transition-colors',
                          isActive ? 'text-white' : 'text-zinc-500'
                        )}
                      />
                    </Link>
                  );
                })}
              </div>

              {/* Refined Divider */}
              <div className="my-2.5 border-t border-white/10" />

              {/* Mobile Resume Action Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setResumeModalOpen(true);
                }}
                className="group flex min-h-[44px] w-full cursor-pointer touch-manipulation items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-zinc-100 via-white to-zinc-200 px-4 py-3 text-xs font-bold tracking-[0.16em] text-zinc-950 uppercase shadow-md transition-transform duration-100 active:scale-[0.98]"
              >
                <Download className="h-3.5 w-3.5 text-zinc-950" />
                <span>View Resume / CV</span>
              </button>
            </m.div>
          </>
        )}
      </AnimatePresence>

      {/* Resume Preview Modal (Guaranteed Top Layer) */}
      <AnimatePresence>
        {resumeModalOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-2xl sm:p-6"
            onClick={() => setResumeModalOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setResumeModalOpen(false)}
              className="absolute top-4 right-4 z-[210] cursor-pointer rounded-full border border-white/15 bg-white/10 p-2.5 text-zinc-300 transition-all hover:scale-105 hover:border-white/30 hover:bg-white/20 hover:text-white sm:top-6 sm:right-6 sm:p-3"
              aria-label="Close resume preview"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Modal Content */}
            <m.div
              initial={{ scale: 0.95, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex w-full max-w-4xl transform-gpu flex-col items-center gap-4 will-change-transform sm:gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* PDF Viewer/Iframe Container */}
              <div className="relative h-[65vh] max-h-[800px] w-full overflow-hidden rounded-2xl border border-white/15 bg-zinc-950 shadow-[0_0_60px_rgba(0,0,0,0.8)] sm:rounded-[24px] md:h-[75vh]">
                <iframe
                  src="/resumecv.pdf#view=FitH"
                  className="h-full w-full rounded-2xl border-none bg-white sm:rounded-[24px]"
                  title="Resume Preview"
                />
              </div>

              {/* Download Button */}
              <a
                href="/resumecv.pdf"
                download="Grandy_Alexander_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-auto cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-zinc-100 px-6 py-3 text-xs font-bold tracking-[0.2em] text-zinc-950 uppercase shadow-none transition-all duration-[180ms] hover:scale-[1.03] hover:bg-white active:scale-95 sm:rounded-2xl sm:px-8 sm:py-3.5"
                onClick={() => setResumeModalOpen(false)}
              >
                <Download className="h-4 w-4" />
                <span>Download Resume</span>
              </a>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  );
}
