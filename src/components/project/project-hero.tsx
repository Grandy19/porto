"use client";

import Image from 'next/image';
import { ProjectData } from '@/data/projects';
import { m } from 'framer-motion';
import Link from 'next/link';

export function ProjectHero({ project }: { project: ProjectData }) {
  const metadata = [
    { label: 'Role', value: project.role },
    { label: 'Timeline', value: project.year },
    { label: 'Team', value: project.team },
    { label: 'Platform', value: project.platform },
  ];

  const laptopSlugs = ['personal-portfolio', 'farmora', 'waves', 'spbe-kota-bontang', 'employee-attrition-prediction', 'dashboard-iwp', 'inkluvia'];
  const isLaptop = laptopSlugs.includes(project.slug);

  // Helper component for the Mockup to avoid duplicating code
  const Mockup = ({ className }: { className?: string }) => (
    <m.div 
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex items-center justify-center ${className}`}
    >
      {/* Soft Radial Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 blur-[100px] rounded-full pointer-events-none ${['inkluvia', 'waves'].includes(project.slug) ? 'bg-blue-500/20' : ['farmora', 'trix'].includes(project.slug) ? 'bg-emerald-500/20' : 'bg-white/10'}`} />
      
      {isLaptop ? (
        <m.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex flex-col items-center w-full max-w-[480px] lg:max-w-[560px] -rotate-2"
        >
          {/* Laptop Screen */}
          <div className="relative w-[92%] aspect-[16/10] rounded-t-xl sm:rounded-t-2xl rounded-b-sm bg-zinc-950 border-[6px] sm:border-[8px] border-zinc-900 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5),0_0_30px_rgba(59,130,246,0.1)] overflow-hidden">
            <Image
              src={project.heroUrl || project.thumbnailUrl}
              alt={`${project.title} Preview`}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
            
            {/* Webcam dot */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-zinc-800 z-10 hidden sm:block" />
            
            {/* Inner shadow/vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] pointer-events-none" />
          </div>
          
          {/* Laptop Base */}
          <div className="w-full h-3 sm:h-5 bg-zinc-800 rounded-b-lg sm:rounded-b-2xl rounded-t-sm shadow-2xl relative overflow-hidden flex justify-center">
            <div className="absolute top-0 inset-x-0 h-[1px] bg-zinc-600/50" />
            <div className="w-16 h-1 sm:w-24 sm:h-1.5 bg-zinc-900 rounded-b-md" />
          </div>
        </m.div>
      ) : (
        <m.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full max-w-[280px] aspect-[9/19.5] rounded-[2.5rem] bg-zinc-950 border-4 border-zinc-900 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5),0_0_30px_rgba(59,130,246,0.1)] overflow-hidden -rotate-2"
        >
          <Image
            src={project.heroUrl || project.thumbnailUrl}
            alt={`${project.title} Preview`}
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          
          {/* Fake Mobile Notch */}
          <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-10">
            <div className="w-[40%] h-full bg-zinc-950 rounded-b-xl" />
          </div>
          
          {/* Inner shadow/vignette for premium feel */}
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] pointer-events-none" />
        </m.div>
      )}
    </m.div>
  );

  return (
    <section className="relative w-full min-h-[90vh] flex items-center pt-32 pb-24 md:pb-32 overflow-hidden">
      
      {/* Background Enhancements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,${['inkluvia', 'waves'].includes(project.slug) ? 'rgba(59,130,246,0.08)' : ['farmora', 'trix'].includes(project.slug) ? 'rgba(16,185,129,0.08)' : '#ffffff08'}_0%,transparent_50%)]`} />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: Text Content (±45%) */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            
            <m.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[11px] font-bold uppercase tracking-widest text-zinc-300 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                {project.category}
              </span>
            </m.div>

            <m.h1 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl font-bold tracking-tight text-zinc-50 md:text-6xl lg:text-7xl mb-2"
            >
              {project.title}
            </m.h1>

            {/* Mobile Mockup (Interleaved) */}
            <div className="block lg:hidden w-[65%] max-w-[260px] sm:max-w-[320px] mx-auto my-10">
              <Mockup />
            </div>

            <m.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-base leading-relaxed font-normal text-zinc-400 sm:text-lg md:text-xl"
            >
              {project.heroDescription || project.shortDescription}
            </m.p>

            <m.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="grid grid-cols-2 gap-y-6 gap-x-4 mt-6 py-6 border-y border-white/5"
            >
              {metadata.map((item, index) => (
                <div key={index} className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                    {item.label}
                  </span>
                  <span className="text-sm font-medium text-zinc-300">
                    {item.value}
                  </span>
                </div>
              ))}
            </m.div>

            <m.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-8 flex flex-col items-center lg:items-start sm:flex-row gap-4 w-full sm:w-auto"
            >
              {project.liveUrl && (
                <Link 
                  href={project.liveUrl}
                  target={project.liveUrl.startsWith('/') ? '_self' : '_blank'}
                  rel={project.liveUrl.startsWith('/') ? '' : 'noreferrer'}
                  className="flex w-[260px] sm:w-auto sm:min-w-[220px] items-center justify-center rounded-xl bg-zinc-100 px-6 py-3 text-[11px] font-black tracking-[0.2em] text-zinc-950 uppercase transition-transform hover:scale-[1.02] active:scale-95"
                >
                  Go to {project.slug === 'personal-portfolio' ? 'Porto' : project.title}
                </Link>
              )}
              <a 
                href="#process"
                className="flex w-[260px] sm:w-auto sm:min-w-[220px] items-center justify-center rounded-xl border border-zinc-800 bg-transparent px-6 py-3 text-[11px] font-black tracking-[0.2em] text-zinc-400 uppercase transition-all hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-100 active:scale-95"
              >
                View Design Process
              </a>
            </m.div>
          </div>

          {/* Right: Mockup Image (±55%) - Desktop Only */}
          <div className="hidden lg:flex lg:col-span-7 justify-center items-center w-full h-[600px] xl:h-[700px] lg:translate-x-12">
            <Mockup className="w-full h-full" />
          </div>

        </div>
      </div>
    </section>
  );
}
