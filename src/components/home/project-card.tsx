import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/constants/projects';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { isFeatured, title, shortDescription, role, techStack, impactMetrics, link } = project;

  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/50 p-6 shadow-2xl transition-all duration-500 hover:border-white/10 hover:bg-zinc-900/50 md:p-8',
        isFeatured ? 'col-span-1 md:col-span-2 lg:p-12' : 'col-span-1'
      )}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute top-0 right-0 rounded-bl-3xl border-b border-l border-white/10 bg-zinc-900 px-6 py-2 text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">
          Featured
        </div>
      )}

      {/* Decorative subtle grid background for featured */}
      {isFeatured && (
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-10 [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_50%)]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      )}

      <div className="relative z-10 flex h-full flex-col justify-between gap-8">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <div className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
              {role}
            </div>
            <h3
              className={cn(
                'font-bold tracking-tight text-zinc-50',
                isFeatured ? 'text-3xl md:text-5xl' : 'text-2xl'
              )}
            >
              {title}
            </h3>
            <p
              className={cn(
                'mt-2 font-normal leading-relaxed text-zinc-400',
                isFeatured ? 'max-w-2xl text-base md:text-lg' : 'text-sm'
              )}
            >
              {shortDescription}
            </p>
          </div>

          {/* Impact Metrics */}
          {impactMetrics.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-semibold tracking-widest text-zinc-600 uppercase">
                Key Impact
              </span>
              <ul className="flex flex-col gap-2">
                {impactMetrics.map((metric, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                    <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                    <span className="leading-snug">{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="rounded-lg bg-zinc-900 text-xs font-medium text-zinc-300 hover:bg-zinc-800"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 flex items-center">
          <Link
            href={link}
            className="group/link inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-zinc-50 transition-colors hover:text-emerald-400"
          >
            View Case Study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
