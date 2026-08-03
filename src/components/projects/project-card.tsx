'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProjectData } from '@/data/projects';

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="h-full w-full"
    >
      <Link href={`/projects/${project.slug}`} className="relative group flex flex-col h-full gap-4 rounded-3xl border border-white/10 bg-zinc-950/80 p-5 transition-all duration-500 hover:border-white/20 hover:bg-zinc-900 shadow-2xl backdrop-blur-md">
        
        {/* Image Container */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-950 flex items-center justify-center">
          <Image 
            src={project.thumbnailUrl} 
            alt={project.title} 
            fill 
            className="object-cover opacity-85 grayscale transition-all duration-500 md:group-hover:opacity-100 md:group-hover:grayscale-0 md:group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        
        {/* Content */}
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-xs leading-relaxed text-zinc-400 line-clamp-3">
            {project.shortDescription}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
