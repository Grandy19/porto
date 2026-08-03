import { ProjectData } from '@/data/projects';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export function ProjectFeatures({ project }: { project: ProjectData }) {
  return (
    <section className="relative w-full py-16 md:py-24 bg-zinc-900/20 border-y border-white/5">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Left Column - Section Title */}
          <div className="lg:col-span-4">
            <ScrollReveal>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-50 md:text-3xl">
                <span className="text-zinc-500">Key</span> Features
              </h2>
            </ScrollReveal>
          </div>
          
          {/* Right Column - Features Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.features.map((feature, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-zinc-900/50 border border-white/5 transition-all hover:bg-zinc-800/50 hover:border-white/10">
                    <div className="mt-0.5 shrink-0 h-6 w-6 rounded-full bg-zinc-100 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-950">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-base font-medium text-zinc-300">
                      {feature}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
