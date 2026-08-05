'use client';

import Image from 'next/image';
import { ProjectData } from '@/data/projects';
import { m } from 'framer-motion';
import Link from 'next/link';

const LAPTOP_SLUGS = [
  'personal-portfolio',
  'farmora',
  'waves',
  'spbe-kota-bontang',
  'employee-attrition-prediction',
  'dashboard-iwp',
  'inkluvia',
];

interface ProjectMockupProps {
  project: ProjectData;
  className?: string;
  isMobileView?: boolean;
}

function ProjectMockup({
  project,
  className,
  isMobileView,
}: ProjectMockupProps) {
  const isLaptop = LAPTOP_SLUGS.includes(project.slug);

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex transform-gpu items-center justify-center will-change-transform ${className || ''}`}
    >
      {/* Soft Radial Glow - Lightweight CSS Radial on Mobile, Blur on Desktop */}
      <div
        className={`pointer-events-none absolute top-1/2 left-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full ${
          ['inkluvia', 'waves'].includes(project.slug)
            ? 'bg-blue-500/15 sm:bg-blue-500/20'
            : ['farmora', 'trix'].includes(project.slug)
              ? 'bg-emerald-500/15 sm:bg-emerald-500/20'
              : 'bg-white/5 sm:bg-white/10'
        } ${isMobileView ? 'opacity-70' : 'blur-[80px]'}`}
      />

      {isLaptop ? (
        <div
          className={`relative flex w-full max-w-[480px] -rotate-2 transform-gpu flex-col items-center will-change-transform lg:max-w-[560px] ${
            isMobileView ? '' : 'lg:animate-[bounce_6s_infinite_ease-in-out]'
          }`}
          style={
            !isMobileView
              ? { animation: 'floating 6s ease-in-out infinite' }
              : undefined
          }
        >
          {/* Laptop Screen */}
          <div className="relative aspect-[16/10] w-[92%] transform-gpu overflow-hidden rounded-t-xl rounded-b-sm border-[5px] border-zinc-900 bg-zinc-950 shadow-2xl sm:rounded-t-2xl sm:border-[8px] sm:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5),0_0_30px_rgba(59,130,246,0.1)]">
            <Image
              src={project.heroUrl || project.thumbnailUrl}
              alt={`${project.title} Preview`}
              fill
              priority
              quality={85}
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />

            {/* Webcam dot */}
            <div className="absolute top-1.5 left-1/2 z-10 hidden h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-zinc-800 sm:block" />

            {/* Inner shadow/vignette */}
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]" />
          </div>

          {/* Laptop Base */}
          <div className="relative flex h-3 w-full justify-center overflow-hidden rounded-t-sm rounded-b-lg bg-zinc-800 shadow-2xl sm:h-5 sm:rounded-b-2xl">
            <div className="absolute inset-x-0 top-0 h-[1px] bg-zinc-600/50" />
            <div className="h-1 w-16 rounded-b-md bg-zinc-900 sm:h-1.5 sm:w-24" />
          </div>
        </div>
      ) : (
        <div
          className={`relative aspect-[9/19.5] w-full max-w-[280px] -rotate-2 transform-gpu overflow-hidden rounded-[2.2rem] border-[3.5px] border-zinc-900 bg-zinc-950 shadow-2xl will-change-transform sm:rounded-[2.5rem] sm:border-4 sm:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5),0_0_30px_rgba(59,130,246,0.1)]`}
          style={
            !isMobileView
              ? { animation: 'floating 6s ease-in-out infinite' }
              : undefined
          }
        >
          <Image
            src={project.heroUrl || project.thumbnailUrl}
            alt={`${project.title} Preview`}
            fill
            priority
            quality={85}
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />

          {/* Fake Mobile Notch */}
          <div className="absolute inset-x-0 top-0 z-10 flex h-6 justify-center sm:h-7">
            <div className="h-full w-[40%] rounded-b-xl bg-zinc-950" />
          </div>

          {/* Inner shadow/vignette for premium feel */}
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]" />
        </div>
      )}
    </m.div>
  );
}

export function ProjectHero({ project }: { project: ProjectData }) {
  const metadata = [
    { label: 'Role', value: project.role },
    { label: 'Timeline', value: project.year },
    { label: 'Team', value: project.team },
    { label: 'Platform', value: project.platform },
  ];

  return (
    <section className="relative flex min-h-[90vh] w-full items-center overflow-hidden pt-32 pb-24 md:pb-32">
      {/* Background Enhancements */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className={`absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,${['inkluvia', 'waves'].includes(project.slug) ? 'rgba(59,130,246,0.08)' : ['farmora', 'trix'].includes(project.slug) ? 'rgba(16,185,129,0.08)' : '#ffffff08'}_0%,transparent_50%)]`}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left: Text Content (±45%) */}
          <div className="flex w-full flex-col gap-6 lg:col-span-5">
            <m.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-bold tracking-widest text-zinc-300 uppercase shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                {project.category}
              </span>
            </m.div>

            <m.h1
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.2,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-2 text-5xl font-bold tracking-tight text-zinc-50 md:text-6xl lg:text-7xl"
            >
              {project.title}
            </m.h1>

            {/* Mobile Mockup (Interleaved) */}
            <div className="mx-auto my-10 block w-[65%] max-w-[260px] transform-gpu sm:max-w-[320px] lg:hidden">
              <ProjectMockup project={project} isMobileView={true} />
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
              className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 border-y border-white/5 py-6"
            >
              {metadata.map((item, index) => (
                <div key={index} className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-600 uppercase">
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
              className="mt-8 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row lg:items-start"
            >
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target={project.liveUrl.startsWith('/') ? '_self' : '_blank'}
                  rel={project.liveUrl.startsWith('/') ? '' : 'noreferrer'}
                  className="flex w-[260px] items-center justify-center rounded-xl bg-zinc-100 px-6 py-3 text-[11px] font-black tracking-[0.2em] text-zinc-950 uppercase transition-transform hover:scale-[1.02] active:scale-95 sm:w-auto sm:min-w-[220px]"
                >
                  Go to{' '}
                  {project.slug === 'personal-portfolio'
                    ? 'Porto'
                    : project.title}
                </Link>
              )}
              <a
                href="#process"
                className="flex w-[260px] items-center justify-center rounded-xl border border-zinc-800 bg-transparent px-6 py-3 text-[11px] font-black tracking-[0.2em] text-zinc-400 uppercase transition-all hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-100 active:scale-95 sm:w-auto sm:min-w-[220px]"
              >
                View Design Process
              </a>
            </m.div>
          </div>

          {/* Right: Mockup Image (±55%) - Desktop Only */}
          <div className="hidden h-[600px] w-full transform-gpu items-center justify-center lg:col-span-7 lg:flex lg:translate-x-12 xl:h-[700px]">
            <ProjectMockup
              project={project}
              isMobileView={false}
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
