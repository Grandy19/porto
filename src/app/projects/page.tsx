import { Metadata } from 'next';
import { ProjectList } from '@/components/projects/project-list';
import { projects } from '@/data/projects';
import { BlueprintGrid } from '@/components/background/blueprint-grid';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export const metadata: Metadata = {
  title: 'All Projects — Grandy Alexander',
  description:
    'Kumpulan proyek yang telah saya kerjakan selama perjalanan karir.',
};

export default function ProjectsPage() {
  return (
    <div className="relative z-20 min-h-screen w-full overflow-x-clip bg-[#09090B]">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-50">
        <BlueprintGrid />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-16 sm:px-8 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 lg:px-12">
        {/* Hero Section */}
        <ScrollReveal>
          <div className="mx-auto mb-16 flex max-w-2xl flex-col items-center text-center md:mb-24">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-50 md:text-6xl lg:text-7xl">
              <span className="text-zinc-500">All</span> Projects
            </h1>
            <p className="max-w-2xl px-2 text-base leading-relaxed text-zinc-400 md:text-lg">
              A showcase of projects built to solve{' '}
              <strong className="font-semibold text-zinc-50">
                real-world problems
              </strong>{' '}
              through{' '}
              <strong className="font-semibold text-zinc-50">
                software engineering
              </strong>
              ,{' '}
              <strong className="font-semibold text-zinc-50">
                intelligent systems
              </strong>
              , and{' '}
              <strong className="font-semibold text-zinc-50">
                user-centered design
              </strong>
              .
            </p>
          </div>
        </ScrollReveal>

        {/* Filter and Grid */}
        <ProjectList initialProjects={projects} />
      </div>
    </div>
  );
}
