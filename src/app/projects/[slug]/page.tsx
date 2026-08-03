import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { ProjectHero } from '@/components/project/project-hero';
import { ProjectOverview } from '@/components/project/project-overview';
import { ProjectProcess } from '@/components/project/project-process';
import { ProjectGallery } from '@/components/project/project-gallery';
import { ProjectNavigation } from '@/components/project/project-navigation';
import { BlueprintGrid } from '@/components/background/blueprint-grid';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  
  if (currentIndex === -1) {
    notFound();
  }

  const project = projects[currentIndex];
  
  // Calculate Previous and Next projects for loop
  const prevProject = currentIndex === 0 ? projects[projects.length - 1] : projects[currentIndex - 1];
  const nextProject = currentIndex === projects.length - 1 ? projects[0] : projects[currentIndex + 1];

  return (
    <article className="min-h-screen bg-[#09090B]">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BlueprintGrid />
      </div>

      <div className="relative flex flex-col">
        <ProjectHero project={project} />
        <ProjectOverview project={project} />
        
        {/* Core Narrative: Research -> Outcome */}
        <ProjectProcess project={project} />
        
        <ProjectGallery project={project} />
        
        <ProjectNavigation prevProject={prevProject} nextProject={nextProject} />
      </div>
    </article>
  );
}
