'use client';

import {
  useState,
  useMemo,
  useRef,
  useEffect,
  useSyncExternalStore,
} from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PackageOpen, X } from 'lucide-react';
import { ProjectData } from '@/data/projects';
import { ProjectCard } from './project-card';
import { SpaceBackground } from './space-background';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

interface ProjectListProps {
  initialProjects: ProjectData[];
}

const emptySubscribe = () => () => {};

export function ProjectList({ initialProjects }: ProjectListProps) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [activeCategory] = useState('Semua');
  const [searchQuery] = useState('');
  const [sortBy] = useState<'Terbaru' | 'Terlama' | 'A-Z'>('Terbaru');
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [width, setWidth] = useState(1000);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setWidth(entries[0].contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Filter & Sort Logic
  const filteredProjects = useMemo(() => {
    let result = [...initialProjects];

    // 1. Search Filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }

    // 2. Category Filter
    if (activeCategory !== 'Semua') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // 3. Sort
    result.sort((a, b) => {
      if (sortBy === 'A-Z') {
        return a.title.localeCompare(b.title);
      }

      const yearA = parseInt(a.year) || 0;
      const yearB = parseInt(b.year) || 0;

      if (sortBy === 'Terbaru') {
        return yearB - yearA;
      } else {
        return yearA - yearB;
      }
    });

    return result;
  }, [initialProjects, activeCategory, searchQuery, sortBy]);

  const generatePath = () => {
    if (filteredProjects.length === 0) return '';
    // Mobile responsive: use smaller zig-zag if width is small
    const offset = width < 768 ? 0.18 : 0.25;
    const xLeft = width * offset;
    const xRight = width * (1 - offset);

    let path = `M ${xLeft} 20`;
    for (let i = 0; i < filteredProjects.length - 1; i++) {
      const isEven = i % 2 === 0;
      const x1 = isEven ? xLeft : xRight;
      const x2 = (i + 1) % 2 === 0 ? xLeft : xRight;
      const y1 = i * 250 + 20;
      const y2 = (i + 1) * 250 + 20;
      const yMid = (y1 + y2) / 2;
      path += ` C ${x1} ${yMid}, ${x2} ${yMid}, ${x2} ${y2}`;
    }
    return path;
  };

  const isMobile = width < 768;
  const lastIndex = Math.max(0, filteredProjects.length - 1);
  const totalHeight =
    filteredProjects.length === 0
      ? 300
      : lastIndex * 250 + (isMobile ? 120 : 100);
  const pathData = generatePath();

  return (
    <div className="relative w-full">
      <SpaceBackground />

      {/* Grid / Roadmap Timeline */}
      <div
        ref={containerRef}
        className="relative z-10 mt-4 w-full pb-2 md:pb-16"
        style={{ height: totalHeight }}
      >
        <svg
          className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full overflow-visible"
          viewBox={`0 0 ${width} ${totalHeight}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="roadmap-gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#a1a1aa" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* The Road Path */}
          {pathData && (
            <>
              {/* Glow background road */}
              <path
                d={pathData}
                fill="none"
                stroke="url(#roadmap-gradient)"
                strokeWidth="4"
                filter="url(#glow)"
                strokeLinecap="round"
                className="opacity-50"
              />
              {/* Core road */}
              <path
                id="rocket-path"
                d={pathData}
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                className="opacity-80"
              />

              {/* The Animated Rocket (White Icon) */}
              <g className="drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">
                <g transform="scale(1.5)">
                  <g
                    transform="translate(-12, -12) rotate(45, 12, 12)"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                  </g>
                </g>
                <animateMotion
                  dur={`${Math.max(8, filteredProjects.length * 3)}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath href="#rocket-path" />
                </animateMotion>
              </g>
            </>
          )}
        </svg>

        <AnimatePresence>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, i) => {
              const offset = width < 768 ? 0.18 : 0.25;
              const isEven = i % 2 === 0;
              const x = isEven ? `${offset * 100}%` : `${(1 - offset) * 100}%`;
              const y = i * 250 + 20;

              const isActive = activePopup === project.slug;

              return (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
                  animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                  exit={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="group absolute z-10 h-12 w-12 cursor-pointer md:h-16 md:w-16"
                  style={{ left: x, top: y }}
                  onClick={() => setActivePopup(isActive ? null : project.slug)}
                >
                  <ScrollReveal
                    delay={i * 0.1}
                    className="relative h-full w-full"
                  >
                    {/* Premium Node (Exactly fills the container) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Outer Ping Ring */}
                      <div
                        className={`absolute inset-0 rounded-full bg-white/10 transition-all duration-500 ${isActive ? 'scale-150 animate-none opacity-0' : 'animate-ping opacity-60 group-hover:scale-150 group-hover:animate-none group-hover:bg-white/20'}`}
                      />
                      {/* Glass border ring */}
                      <div
                        className={`absolute inset-1 rounded-full border bg-zinc-950/70 backdrop-blur-sm transition-colors duration-500 ${isActive ? 'border-white/80' : 'border-white/20 group-hover:border-white/60'}`}
                      />
                      {/* Inner glowing core */}
                      <div
                        className={`relative h-3 w-3 rounded-full bg-white transition-all duration-500 md:h-4 md:w-4 ${isActive ? 'scale-150 shadow-[0_0_20px_rgba(255,255,255,1)]' : 'shadow-[0_0_10px_rgba(255,255,255,0.8)] group-hover:scale-150 group-hover:shadow-[0_0_20px_rgba(255,255,255,1)]'}`}
                      />
                    </div>

                    {/* Glassmorphism Title Pill */}
                    <div
                      className={`absolute top-full left-1/2 mt-3 max-w-[150px] -translate-x-1/2 rounded-full border px-3.5 py-1.5 text-center shadow-lg backdrop-blur-md transition-all duration-300 sm:max-w-none sm:px-5 sm:py-2 ${isActive ? '-translate-y-1 border-white/40 bg-white/15' : 'border-white/10 bg-zinc-950/60 group-hover:-translate-y-1 group-hover:border-white/30 group-hover:bg-white/10'}`}
                    >
                      <span className="block truncate text-[11px] font-bold tracking-wider text-white uppercase transition-colors sm:text-xs md:text-sm">
                        {project.title}
                      </span>
                    </div>

                    {/* The Click Popup (Desktop Only) */}
                    <div
                      className={`absolute top-full z-50 mt-14 hidden w-[280px] pt-4 transition-all duration-300 md:block md:w-[350px] ${isEven ? 'left-1/2 -translate-x-1/2 md:left-0 md:-translate-x-1/4' : 'left-1/2 -translate-x-1/2 md:right-0 md:left-auto md:translate-x-1/4'} ${isActive ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'} `}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ProjectCard project={project} index={i} />
                    </div>
                  </ScrollReveal>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-zinc-950/30 py-24 text-center"
            >
              <PackageOpen className="mb-4 h-12 w-12 text-zinc-700" />
              <h3 className="mb-2 text-xl font-bold text-zinc-300">
                No Projects Found
              </h3>
              <p className="max-w-sm text-sm text-zinc-500">
                We couldn&apos;t find any projects.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .mask-linear-fade {
          mask-image: linear-gradient(to right, black 80%, transparent 100%);
        }
      `}</style>

      {/* Mobile Modal Overlay for Projects (High performance, zero lag, above footer via Portal) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activePopup && width < 768 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-[150] flex touch-none items-center justify-center overscroll-none bg-black/75 px-6 md:hidden"
                style={{ touchAction: 'none', overscrollBehavior: 'none' }}
                onTouchMove={(e) => e.preventDefault()}
                onTouchStart={(e) => e.stopPropagation()}
                onClick={() => setActivePopup(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, y: 15, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.95, y: 15, opacity: 0 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-[340px] transform-gpu"
                >
                  {/* Close button */}
                  <button
                    onClick={() => setActivePopup(null)}
                    className="absolute -top-3 -right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-zinc-900 text-zinc-200 shadow-xl active:scale-90"
                    aria-label="Close project preview"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <ProjectCard
                    project={filteredProjects.find(
                      (p) => p.slug === activePopup
                    )!}
                    index={0}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
