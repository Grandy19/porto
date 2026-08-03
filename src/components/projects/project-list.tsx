'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, PackageOpen } from 'lucide-react';
import { ProjectData } from '@/data/projects';
import { ProjectCard } from './project-card';
import { SpaceBackground } from './space-background';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

const CATEGORIES = [
  'Semua',
  'Software Engineering',
  'UI/UX Design',
  'Machine Learning',
  'Smart City',
  'Data Analytics',
  'IoT'
];

type SortOption = 'Terbaru' | 'Terlama' | 'A-Z';

interface ProjectListProps {
  initialProjects: ProjectData[];
}

export function ProjectList({ initialProjects }: ProjectListProps) {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('Terbaru');
  const [activePopup, setActivePopup] = useState<string | null>(null);

  // Filter & Sort Logic
  const filteredProjects = useMemo(() => {
    let result = [...initialProjects];

    // 1. Search Filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q));
    }

    // 2. Category Filter
    if (activeCategory !== 'Semua') {
      result = result.filter(p => p.category === activeCategory);
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
      } else { // Terlama
        return yearA - yearB;
      }
    });

    return result;
  }, [initialProjects, activeCategory, searchQuery, sortBy]);

  const [width, setWidth] = useState(1000);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const generatePath = () => {
    if (filteredProjects.length === 0) return '';
    // Mobile responsive: use smaller zig-zag if width is small
    const offset = width < 768 ? 0.15 : 0.25;
    const xLeft = width * offset;
    const xRight = width * (1 - offset);
    
    let path = `M ${xLeft} 20`;
    for (let i = 0; i < filteredProjects.length - 1; i++) {
      const isEven = i % 2 === 0;
      const x1 = isEven ? xLeft : xRight;
      const x2 = ((i + 1) % 2 === 0) ? xLeft : xRight;
      const y1 = i * 250 + 20;
      const y2 = (i + 1) * 250 + 20;
      const yMid = (y1 + y2) / 2;
      path += ` C ${x1} ${yMid}, ${x2} ${yMid}, ${x2} ${y2}`;
    }
    return path;
  };

  const totalHeight = Math.max(1, filteredProjects.length) * 250 + 200;
  const pathData = generatePath();

  return (
    <div className="w-full relative">
      <SpaceBackground />
      
      {/* Grid / Roadmap Timeline */}
      <motion.div 
        layout 
        ref={containerRef}
        className="relative z-10 w-full pb-32 mt-4" 
        style={{ height: totalHeight }}
      >
        <svg 
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-visible"
          viewBox={`0 0 ${width} ${totalHeight}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="roadmap-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
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
                {/* 
                  The lucide-react Rocket icon normally points at -45 deg (top-right).
                  We rotate it by 45 deg so it points at 0 deg (right),
                  ensuring rotate="auto" aligns it perfectly with the path's tangent.
                  Scale 1.5 makes it larger.
                */}
                <g transform="scale(1.5)">
                  <g transform="translate(-12, -12) rotate(45, 12, 12)" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
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

        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, i) => {
              const offset = width < 768 ? 0.15 : 0.25;
              const isEven = i % 2 === 0;
              const x = isEven ? `${offset * 100}%` : `${(1 - offset) * 100}%`;
              const y = i * 250 + 20;
              
              const isActive = activePopup === project.slug;

              return (
                <motion.div 
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
                  animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                  exit={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="absolute z-10 w-12 h-12 md:w-16 md:h-16 group cursor-pointer"
                  style={{ left: x, top: y }}
                  onClick={() => setActivePopup(isActive ? null : project.slug)}
                >
                  <ScrollReveal delay={i * 0.1} className="w-full h-full relative">
                    {/* Premium Node (Exactly fills the container) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Outer Ping Ring */}
                      <div className={`absolute inset-0 rounded-full bg-primary/20 transition-all duration-500 ${isActive ? 'opacity-0 scale-150 animate-none' : 'opacity-75 animate-ping group-hover:bg-primary/40 group-hover:animate-none group-hover:scale-150'}`} />
                      {/* Glass border ring */}
                      <div className={`absolute inset-1 rounded-full border backdrop-blur-sm bg-zinc-950/50 transition-colors duration-500 ${isActive ? 'border-primary' : 'border-primary/30 group-hover:border-primary'}`} />
                      {/* Inner glowing core */}
                      <div className={`relative w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full transition-all duration-500 ${isActive ? 'scale-150 shadow-[0_0_30px_rgba(59,130,246,1)]' : 'shadow-[0_0_15px_rgba(59,130,246,1)] group-hover:scale-150 group-hover:shadow-[0_0_30px_rgba(59,130,246,1)]'}`} />
                    </div>
                    
                    {/* Glassmorphism Title Pill */}
                    <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-3 px-5 py-2 rounded-full border backdrop-blur-md shadow-lg transition-all duration-300 ${isActive ? 'bg-primary/20 border-primary/50 -translate-y-1' : 'border-white/10 bg-zinc-950/60 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1'}`}>
                      <span className="text-xs md:text-sm font-bold text-white tracking-wider uppercase whitespace-nowrap transition-colors">
                          {project.title}
                      </span>
                    </div>

                    {/* The Click Popup (Desktop Only) */}
                    <div className={`hidden md:block absolute top-full mt-14 pt-4 w-[280px] md:w-[350px] transition-all duration-300 z-50 
                      ${isEven ? 'left-1/2 -translate-x-1/2 md:left-0 md:-translate-x-1/4' : 'left-1/2 -translate-x-1/2 md:right-0 md:translate-x-1/4 md:left-auto'}
                      ${isActive ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'}
                    `}
                    onClick={(e) => e.stopPropagation()}
                    >
                        <ProjectCard project={project} index={i} />
                    </div>
                  </ScrollReveal>
                </motion.div>
              )
            })
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-24 text-center rounded-2xl border border-dashed border-white/10 bg-zinc-950/30"
            >
              <PackageOpen className="h-12 w-12 text-zinc-700 mb-4" />
              <h3 className="text-xl font-bold text-zinc-300 mb-2">No Projects Found</h3>
              <p className="text-zinc-500 text-sm max-w-sm">
                We couldn't find any projects matching "{searchQuery}" in the "{activeCategory}" category.
              </p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('Semua'); }}
                className="mt-6 text-sm text-primary hover:underline underline-offset-4"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Global styles */}
      <style jsx global>{`
        @keyframes dash {
          to { stroke-dashoffset: -1000; }
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
      
      {/* Mobile Modal Overlay for Projects */}
      <AnimatePresence>
        {activePopup && width < 768 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-zinc-950/80 backdrop-blur-md md:hidden"
            onClick={() => setActivePopup(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[340px]"
            >
              <ProjectCard 
                project={filteredProjects.find(p => p.slug === activePopup)!} 
                index={0} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
