"use client";

import { ProjectData } from '@/data/projects';
import { m } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Search, Lightbulb, Rocket, Target, CheckCircle2 } from 'lucide-react';

export function ProjectProcess({ project }: { project: ProjectData }) {
  const processSteps = [
    { 
      id: '01', 
      title: 'Research', 
      content: project.process.research,
      icon: Search 
    },
    { 
      id: '02', 
      title: 'Insights', 
      content: project.process.insights,
      icon: Lightbulb 
    },
    { 
      id: '03', 
      title: 'Solution', 
      content: project.process.solution,
      icon: Rocket 
    },
    { 
      id: '04', 
      title: 'Outcome', 
      content: project.process.outcome.description,
      icon: Target,
      highlights: project.process.outcome.highlights
    },
  ];

  return (
    <section id="process" className="relative w-full">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="w-full h-[1px] bg-white/10" />
      </div>
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-32">
        <div className="max-w-4xl mx-auto flex flex-col gap-16 md:gap-20">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <ScrollReveal 
                key={step.id}
                delay={index * 0.1}
                className="group flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-24 relative p-6 md:p-8 -mx-6 md:-mx-8 rounded-2xl transition-all duration-300 hover:bg-white/[0.02] hover:-translate-y-[3px]"
              >
                
                {/* Desktop Connecting Line */}
                {index !== processSteps.length - 1 && (
                  <div className="hidden md:block absolute left-[86px] top-[96px] bottom-[-40px] w-[1px] bg-white/[0.04] group-hover:bg-white/10 transition-colors duration-300" />
                )}

                {/* Left Side: Number & Dot */}
                <div className="flex items-start gap-8 md:w-32 shrink-0 relative">
                  <span className="text-4xl md:text-5xl font-semibold tracking-widest text-zinc-600 font-mono">
                    {step.id}
                  </span>
                  
                  {/* Timeline Dot (Desktop only, absolutely positioned) */}
                  <div className="hidden md:flex absolute right-0 top-3 h-3 w-3 rounded-full border-2 border-zinc-700 bg-zinc-950 transition-all duration-300 group-hover:scale-150 group-hover:border-zinc-500" />
                </div>
                
                {/* Right Side: Content */}
                <div className="flex flex-col gap-4 max-w-[65ch]">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                    <h3 className="text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className="text-base md:text-lg leading-relaxed text-zinc-400">
                    {step.content}
                  </p>

                  {/* Highlights Grid (Outcome only) */}
                  {step.highlights && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mt-6">
                      {step.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-zinc-500 shrink-0" />
                          <span className="text-sm font-medium text-zinc-300">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
