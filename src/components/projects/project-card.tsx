'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProjectData } from '@/data/projects';

interface ProjectCardProps {
  project: ProjectData;
  index?: number;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="h-full w-full"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group relative flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-zinc-950/80 p-5 shadow-2xl backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-zinc-900"
      >
        {/* Image Container */}
        <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-zinc-950">
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            className="object-cover opacity-100 transition-all duration-500 md:group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="text-xl font-bold tracking-tight text-white transition-colors">
            {project.title}
          </h3>
          <p className="line-clamp-3 text-xs leading-relaxed text-zinc-400">
            {project.shortDescription}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
