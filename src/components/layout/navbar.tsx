'use client';

import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, Download } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { useScroll } from '@/hooks/use-scroll';
import { useActiveSection } from '@/hooks/use-active-section';
import { navLinks } from '@/constants/navigation';
import { cn } from '@/lib/utils';

export function Navbar() {
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

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="pointer-events-none fixed top-4 right-0 left-0 z-50 flex justify-center px-3.5 sm:top-6 sm:px-6">
      {/* Capsule Container (Pill) */}
      <div
        className={cn(
          'pointer-events-auto flex w-full max-w-[1100px] items-center justify-between rounded-full border transition-all duration-[220ms] ease-out',
          scrolled
            ? 'h-[54px] border-white/10 bg-zinc-950/80 px-4 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:h-[62px] sm:px-5 md:h-[68px]'
            : 'h-[58px] border-white/5 bg-zinc-950/40 px-4 py-2.5 shadow-sm backdrop-blur-lg sm:h-[70px] sm:px-6 md:h-[80px] md:border-transparent md:bg-transparent md:px-8 md:shadow-none md:backdrop-blur-none'
        )}
      >
        {/* Kiri: Logo + Brand Identity */}
        <Link
          href="/#home"
          className={cn(
            'flex shrink-0 items-center gap-2.5 transition-all duration-[180ms] hover:opacity-85 sm:gap-3',
            scrolled ? 'scale-[0.96]' : 'scale-100'
          )}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-[2px] shadow-sm sm:h-8 sm:w-8">
            <Image
              src="/logo.png"
              alt="Grandy Alexander Official Logo"
              width={32}
              height={32}
              priority
              className="h-full w-full object-contain"
            />
          </div>
          <span className="text-base font-medium tracking-tight text-zinc-50 sm:text-lg md:text-xl">
            Grandy.
          </span>
        </Link>

        {/* Tengah: Navigation Links (Desktop) */}
        <nav className="hidden flex-1 items-center justify-center gap-8 md:flex lg:gap-10">
          {navLinks.map((link) => {
            const isPathProjects =
              pathname.startsWith('/projects') && link.name === 'Projects';
            const isActive =
              activeSection === link.href.replace('#', '') || isPathProjects;
            const href = pathname === '/' ? link.href : `/${link.href}`;
            return (
              <Link
                key={link.name}
                href={href}
                className={cn(
                  'relative py-1 text-sm font-medium tracking-wide transition-colors duration-[180ms]',
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
            className="group flex h-auto items-center justify-center rounded-2xl bg-zinc-100 px-6 py-2.5 text-[10px] font-black tracking-[0.25em] text-zinc-950 uppercase shadow-none transition-all duration-[180ms] hover:scale-[1.04] hover:bg-white active:scale-95 sm:px-8 sm:py-3"
          >
            Resume
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-all hover:bg-white/10 hover:text-white active:scale-95 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="h-4 w-4 text-white" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown & Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Soft Ambient Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="pointer-events-auto fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Elegant Floating Glass Menu Card */}
            <m.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto fixed top-[72px] right-4 left-4 z-50 mx-auto max-w-xs overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl sm:top-[82px] sm:max-w-sm md:hidden"
            >
              {/* Navigation Items List */}
              <div className="flex flex-col gap-1">
                {navLinks.map((link, idx) => {
                  const isPathProjects =
                    pathname.startsWith('/projects') &&
                    link.name === 'Projects';
                  const isActive =
                    activeSection === link.href.replace('#', '') ||
                    isPathProjects;
                  const href = pathname === '/' ? link.href : `/${link.href}`;

                  return (
                    <Link
                      key={link.name}
                      href={href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium tracking-wide transition-all duration-150 sm:text-sm',
                        isActive
                          ? 'border border-white/10 bg-white/[0.09] font-semibold text-white'
                          : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100'
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
                        )}
                        <span>{link.name}</span>
                      </span>

                      <span className="font-mono text-[10px] tracking-wider text-zinc-500">
                        0{idx + 1}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Refined Divider */}
              <div className="my-2 border-t border-white/5" />

              {/* Mobile Resume Action Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setResumeModalOpen(true);
                }}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-100 px-4 py-2.5 text-xs font-bold tracking-wider text-zinc-950 uppercase shadow-none transition-all hover:bg-white active:scale-[0.98]"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Resume / CV</span>
              </button>
            </m.div>
          </>
        )}
      </AnimatePresence>

      {/* Resume Preview Modal */}
      <AnimatePresence>
        {resumeModalOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-2xl sm:p-6"
            onClick={() => setResumeModalOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setResumeModalOpen(false)}
              className="absolute top-4 right-4 z-[110] rounded-full border border-white/10 bg-white/5 p-2.5 text-zinc-400 transition-all hover:scale-105 hover:border-white/20 hover:bg-white/10 hover:text-white sm:top-6 sm:right-6 sm:p-3"
              aria-label="Close resume preview"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Modal Content */}
            <m.div
              initial={{ scale: 0.95, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex w-full max-w-4xl flex-col items-center gap-4 sm:gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* PDF Viewer/Iframe Container */}
              <div className="relative h-[65vh] max-h-[800px] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-[0_0_50px_rgba(0,0,0,0.6)] sm:rounded-[24px] md:h-[75vh]">
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
                className="group flex h-auto items-center justify-center gap-2.5 rounded-xl bg-zinc-100 px-6 py-3 text-xs font-bold tracking-[0.2em] text-zinc-950 uppercase shadow-none transition-all duration-[180ms] hover:scale-[1.03] hover:bg-white active:scale-95 sm:rounded-2xl sm:px-8 sm:py-3.5"
                onClick={() => setResumeModalOpen(false)}
              >
                <Download className="h-4 w-4" />
                <span>Download Resume</span>
              </a>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
