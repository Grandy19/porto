import { Metadata } from 'next';
import { ProjectList } from '@/components/projects/project-list';
import { projects } from '@/data/projects';
import { BlueprintGrid } from '@/components/background/blueprint-grid';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export const metadata: Metadata = {
  title: 'All Projects — Grandy Alexander',
  description: 'Kumpulan proyek yang telah saya kerjakan selama perjalanan karir.',
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#09090B] relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        <BlueprintGrid />
      </div>
      
      {/* Glow Effects */}
      <div className="fixed left-0 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 mix-blend-screen blur-[120px] pointer-events-none" />
      <div className="fixed right-0 bottom-0 -z-10 h-[600px] w-[600px] translate-x-1/3 translate-y-1/3 rounded-full bg-blue-600/10 mix-blend-screen blur-[150px] pointer-events-none" />

      <div className="w-full max-w-7xl relative z-10 mx-auto px-6 sm:px-8 lg:px-12 py-32 md:py-40">
        {/* Hero Section */}
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-16 md:mb-24 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-50 md:text-6xl lg:text-7xl mb-6">
              <span className="text-zinc-500">All</span> Projects
            </h1>
            <p className="text-base text-zinc-400 leading-relaxed md:text-lg max-w-2xl px-2">
              A showcase of projects built to solve <strong className="font-semibold text-zinc-50">real-world problems</strong> through <strong className="font-semibold text-zinc-50">software engineering</strong>, <strong className="font-semibold text-zinc-50">intelligent systems</strong>, and <strong className="font-semibold text-zinc-50">user-centered design</strong>.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter and Grid */}
        <ProjectList initialProjects={projects} />
      </div>
    </main>
  );
}
