import { ProjectData } from '@/data/projects';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export function ProjectOverview({ project }: { project: ProjectData }) {
  return (
    <section className="relative w-full">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="w-full h-[1px] bg-white/10" />
      </div>
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-32">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Left Column - Section Title */}
            <div className="lg:col-span-4">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-50 md:text-3xl">
                <span className="text-zinc-500">Project</span> Overview
              </h2>
            </div>
            
            {/* Right Column - Content */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <p className="text-base leading-relaxed font-normal text-zinc-400 sm:text-lg md:text-xl">
                {project.overview}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
