'use client';

import * as React from 'react';
import { useState, useMemo } from 'react';
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
  const sectionIds = useMemo(() => 
    navLinks.map(link => link.href.replace('#', '')).filter(Boolean), 
  []);
  const activeSection = useActiveSection(sectionIds);

  // Mencegah scroll pada body ketika mobile menu terbuka
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <header className="pointer-events-none fixed top-6 right-0 left-0 z-50 flex justify-center px-4 md:px-6">
      {/* Capsule Container (Pill) */}
      <div
        className={cn(
          'pointer-events-auto flex w-full max-w-[1100px] items-center justify-between rounded-full border transition-all duration-[180ms] ease-out',
          scrolled
            ? 'h-[68px] bg-zinc-950/70 border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-[18px] px-5 py-2'
            : 'h-[80px] bg-transparent border-transparent shadow-none px-6 py-3 md:px-8'
        )}
      >
        {/* Kiri: Logo + Brand Identity */}
        <Link
          href="#home"
          className={cn(
            "flex shrink-0 items-center gap-3 transition-all duration-[180ms] hover:opacity-80",
            scrolled ? "scale-[0.94]" : "scale-100"
          )}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-[2px]">
            <Image
              src="/logo.png"
              alt="Grandy Alexander Official Logo"
              width={32}
              height={32}
              priority
              className="h-full w-full object-contain"
            />
          </div>
          <span className="text-xl font-medium tracking-tight text-zinc-50">
            Grandy.
          </span>
        </Link>

        {/* Tengah: Navigation (Center Spaced) */}
        <nav className="hidden flex-1 items-center justify-center gap-10 md:flex">
          {navLinks.map((link) => {
            const isPathProjects = pathname.startsWith('/projects') && link.name === 'Projects';
            const isActive = activeSection === link.href.replace('#', '') || isPathProjects;
            const href = pathname === '/' ? link.href : `/${link.href}`;
            return (
              <Link
                key={link.name}
                href={href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors duration-[180ms]",
                  isActive ? "text-zinc-50" : "text-zinc-500 hover:text-zinc-200"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Kanan: Resume Button */}
        <div className="hidden shrink-0 md:flex">
          <button
            onClick={() => setResumeModalOpen(true)}
            className="group flex h-auto items-center justify-center rounded-2xl bg-zinc-100 px-8 py-3 text-[10px] font-black tracking-[0.3em] text-zinc-950 uppercase shadow-none transition-all duration-[180ms] hover:scale-[1.05] hover:bg-white active:scale-95"
          >
            Resume
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="flex min-h-[48px] min-w-[48px] shrink-0 items-center justify-center p-2 text-zinc-300 transition-colors hover:text-zinc-50 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay Dropdown */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto fixed inset-0 top-[90px] z-40 mx-4 mb-4 flex flex-col items-center justify-center gap-6 rounded-3xl border border-white/10 bg-zinc-950/80 shadow-2xl backdrop-blur-xl md:hidden">
          {navLinks.map((link) => {
            const isPathProjects = pathname.startsWith('/projects') && link.name === 'Projects';
            const isActive = activeSection === link.href.replace('#', '') || isPathProjects;
            const href = pathname === '/' ? link.href : `/${link.href}`;
            return (
              <Link
                key={link.name}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex min-h-[48px] items-center justify-center text-2xl font-medium tracking-tight transition-colors duration-[180ms]",
                  isActive ? "text-zinc-50" : "text-zinc-400 hover:text-zinc-200"
                )}
              >
                {link.name}
              </Link>
            );
          })}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setResumeModalOpen(true);
            }}
            className="group mt-6 flex h-auto items-center justify-center rounded-2xl bg-zinc-100 px-10 py-5 text-[10px] font-black tracking-[0.3em] text-zinc-950 uppercase shadow-none transition-all hover:scale-[1.05] hover:bg-white active:scale-95"
          >
            Download CV
          </button>
        </div>
      )}

      {/* Resume Preview Modal */}
      <AnimatePresence>
        {resumeModalOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-2xl pointer-events-auto"
            onClick={() => setResumeModalOpen(false)}
          >
            {/* Close Button */}
            <button 
              onClick={() => setResumeModalOpen(false)}
              className="absolute top-6 right-6 sm:top-8 sm:right-8 z-[110] p-3 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <m.div
              initial={{ scale: 0.95, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl mx-4 sm:mx-12 flex flex-col items-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* PDF Viewer/Iframe Container */}
              <div className="relative w-full h-[65vh] md:h-[75vh] max-h-[800px] rounded-[24px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 bg-zinc-950">
                 <iframe 
                   src="/resumecv.pdf#view=FitH" 
                   className="w-full h-full border-none rounded-[24px] bg-white"
                   title="Resume Preview"
                 />
              </div>

              {/* Download Button */}
              <a
                href="/resumecv.pdf"
                download="Grandy_Alexander_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-auto items-center justify-center gap-3 rounded-2xl bg-zinc-100 px-8 py-4 text-xs font-black tracking-[0.3em] text-zinc-950 uppercase shadow-none transition-all duration-[180ms] hover:scale-[1.05] hover:bg-white active:scale-95"
                onClick={() => setResumeModalOpen(false)}
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
