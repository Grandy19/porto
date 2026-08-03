import Link from 'next/link';
import { ProjectData } from '@/data/projects';

export function ProjectNavigation({ 
  prevProject, 
  nextProject 
}: { 
  prevProject: ProjectData;
  nextProject: ProjectData;
}) {
  return (
    <section className="relative w-full">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="w-full h-[1px] bg-white/10" />
      </div>
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-32">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          
          {/* Previous Project */}
          <Link 
            href={`/projects/${prevProject.slug}`}
            className="group flex flex-col items-center sm:items-start gap-2 w-full sm:w-1/2 p-6 rounded-2xl transition-all hover:bg-zinc-900/50"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2 transition-colors group-hover:text-zinc-400">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Previous Project
            </span>
            <h4 className="text-xl md:text-2xl font-bold text-zinc-300 transition-colors group-hover:text-zinc-50 text-center sm:text-left">
              {prevProject.title}
            </h4>
          </Link>

          {/* Vertical Divider (Desktop) */}
          <div className="hidden sm:block w-[1px] h-16 bg-white/10 shrink-0" />
          
          {/* Horizontal Divider (Mobile) */}
          <div className="block sm:hidden w-16 h-[1px] bg-white/10 shrink-0" />

          {/* Next Project */}
          <Link 
            href={`/projects/${nextProject.slug}`}
            className="group flex flex-col items-center sm:items-end gap-2 w-full sm:w-1/2 p-6 rounded-2xl transition-all hover:bg-zinc-900/50 text-right"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2 transition-colors group-hover:text-zinc-400">
              Next Project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
            <h4 className="text-xl md:text-2xl font-bold text-zinc-300 transition-colors group-hover:text-zinc-50 text-center sm:text-right">
              {nextProject.title}
            </h4>
          </Link>

        </div>
      </div>
    </section>
  );
}
