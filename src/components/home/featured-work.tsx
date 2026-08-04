import Image from 'next/image';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { BlueprintGrid } from '@/components/background/blueprint-grid';

import { projects } from '@/data/projects';

export function FeaturedWork() {
  return (
    <section
      id="projects"
      className="relative w-full border-t border-white/5 bg-[#09090B] py-24 md:py-32"
    >
      <BlueprintGrid />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-16 flex max-w-2xl flex-col gap-6 md:mb-24">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-50 md:text-5xl lg:text-6xl">
              <span className="text-zinc-500">Featured</span> Work
            </h2>
            <p className="text-base leading-relaxed text-zinc-400 md:text-lg">
              A curated selection of projects showcasing{' '}
              <span className="font-semibold text-zinc-100">
                scalable software
              </span>
              ,{' '}
              <span className="font-semibold text-zinc-100">
                user-centered design
              </span>
              , and{' '}
              <span className="font-semibold text-zinc-100">
                innovative solutions
              </span>{' '}
              for{' '}
              <span className="font-semibold text-zinc-100">
                real-world challenges
              </span>
              .
            </p>
          </div>
        </ScrollReveal>

        {/* 3-Column Grid */}
        <div className="group/grid grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects.slice(0, 3).map((project, index) => (
            <ScrollReveal
              key={project.title}
              delay={index * 0.1}
              className="h-full"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group relative flex h-full flex-col gap-8 rounded-3xl border border-white/5 bg-zinc-900/20 p-6 transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)] hover:border-white/20 hover:bg-zinc-900/40 hover:shadow-2xl hover:shadow-black/50 md:group-hover/grid:opacity-50 md:hover:-translate-y-[6px] md:hover:!opacity-100"
              >
                {/* The CustomCursor component will automatically handle the focus brackets for this Link */}

                {/* Image Container */}
                <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-zinc-950">
                  <Image
                    src={project.thumbnailUrl}
                    alt={project.title}
                    fill
                    className="object-cover opacity-85 grayscale transition-all duration-[450ms] ease-[cubic-bezier(.22,.61,.36,1)] group-active:opacity-100 group-active:grayscale-0 md:group-hover:scale-[1.03] md:group-hover:opacity-100 md:group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/30 transition-opacity duration-[450ms] group-active:bg-transparent md:group-hover:bg-transparent" />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-bold tracking-[0.15em] text-zinc-500 uppercase">
                      {project.role}
                    </span>
                    <h3 className="flex items-center justify-between text-xl font-semibold text-zinc-300 transition-colors duration-500 group-hover:text-zinc-50 md:text-2xl">
                      {project.title}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="-translate-x-4 opacity-0 transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:translate-x-0 group-hover:opacity-100"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </h3>
                  </div>

                  <p className="text-sm leading-relaxed text-zinc-400">
                    {project.shortDescription}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-zinc-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Projects CTA */}
        <ScrollReveal delay={0.3}>
          <div className="mt-16 flex flex-col items-center justify-center gap-4 md:mt-24">
            <Link
              href="/projects"
              className="group flex w-[260px] items-center justify-center gap-3 rounded-2xl bg-zinc-100 px-8 py-4 text-[10px] font-black tracking-[0.3em] text-zinc-950 uppercase shadow-none transition-all hover:scale-[1.05] hover:bg-white active:scale-95 sm:w-auto md:px-10 md:py-5"
            >
              View All Projects
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <p className="mt-2 text-center text-base leading-relaxed text-zinc-400 md:text-lg">
              Explore my complete engineering portfolio.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
