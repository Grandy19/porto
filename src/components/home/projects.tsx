'use client';

import * as React from 'react';
import { projects } from '@/constants/projects';
import { ProjectCard } from '@/components/home/project-card';

export function Projects() {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="relative w-full border-t border-white/5 bg-zinc-950/20 py-24 md:py-32">
      <div className="container mx-auto flex flex-col gap-16 px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
          <h2 className="text-4xl font-bold tracking-tighter text-zinc-50 md:text-5xl lg:text-6xl">
            Selected <span className="text-zinc-500">Projects.</span>
          </h2>
          <p className="max-w-[600px] text-base font-normal text-zinc-400 sm:text-lg">
            A showcase of engineering work focusing on scalable architecture, data infrastructure, and intelligent systems.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
