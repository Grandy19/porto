'use client';

import React, { useState } from 'react';
import { motion as m } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Layers } from 'lucide-react';

export function TechnicalExpertise() {
  const [activeCard, setActiveCard] = useState<number>(0);

  const cards = [
    {
      label: "SPECIALIZATION",
      title: "Software Engineering",
      description: "Building scalable web applications across frontend, backend, APIs, and modern software architecture.",
      skills: [
        "Frontend Development",
        "Backend Development",
        "REST API Development",
        "Database Design",
        "Software Architecture",
        "Auth & Security"
      ]
    },
    {
      label: "CORE COMPETENCY",
      title: "Data & AI",
      description: "Analyzing datasets and integrating machine learning models for predictive intelligence and automation.",
      skills: [
        "Data Analysis",
        "Machine Learning",
        "Data Visualization",
        "NLP & LLM Integration",
        "Predictive Analytics",
        "Model Deployment"
      ]
    },
    {
      label: "DOMAIN EXPERTISE",
      title: "Smart City Systems",
      description: "Designing interconnected urban systems using enterprise architecture, spatial data, and digital twin concepts.",
      skills: [
        "TOGAF ADM",
        "GIS & Spatial Data",
        "Urban Analytics",
        "Digital Twin Concepts",
        "Enterprise Architecture",
        "Smart Infrastructure"
      ]
    },
    {
      label: "USER CENTRIC",
      title: "Product & UI/UX",
      description: "Crafting intuitive digital experiences rooted in design systems and human-centered research.",
      skills: [
        "UI Design",
        "UX Research",
        "Wireframing & Prototyping",
        "Design Systems",
        "User Journey Mapping",
        "Product Strategy"
      ]
    }
  ];

  return (
    <section className="relative w-full pb-24 md:pb-32 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Wrapper matching Engineering Journey's constrained border */}
        <div className="w-full mt-24 md:mt-32 pt-24 md:pt-32 border-t border-white/5">
        
          {/* Header */}
          <ScrollReveal>
            <div className="flex flex-col gap-4 mb-10 md:mb-14 max-w-[600px]">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-50 md:text-5xl lg:text-6xl">
                <span className="text-zinc-500">Technical</span> Expertise
              </h2>
              <p className="text-base text-zinc-400 leading-relaxed md:text-lg">
                A multidisciplinary foundation spanning software engineering, artificial intelligence, smart city systems, and product design.
              </p>
            </div>
          </ScrollReveal>

          {/* Overlapping Fanned Cards Deck Container */}
          <div className="relative flex items-center justify-center min-h-[440px] sm:min-h-[470px] md:min-h-[490px] w-full py-6 overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-center -space-x-12 sm:-space-x-16 md:-space-x-20 lg:-space-x-24 px-6 py-4">
              {cards.map((card, i) => {
                const isActive = activeCard === i;
                const distance = Math.abs(activeCard - i);
                
                // Rotations: natural card fan spread
                const baseRotations = [-4, -1.5, 1.5, 4];
                const cardRotation = isActive ? 0 : baseRotations[i];

                // Z-index calculation: Active card is always on top (z-40)
                const zIndex = isActive ? 40 : 20 - distance;

                return (
                  <m.div
                    key={card.title}
                    layout
                    onClick={() => setActiveCard(i)}
                    animate={{
                      scale: isActive ? 1.03 : 0.95,
                      y: isActive ? -14 : 0,
                      rotate: cardRotation,
                      zIndex: zIndex,
                      opacity: 1,
                    }}
                    whileHover={{
                      scale: isActive ? 1.04 : 0.97,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                      mass: 0.85
                    }}
                    className={`group relative flex flex-col justify-between w-[270px] sm:w-[295px] md:w-[320px] lg:w-[340px] min-h-[380px] sm:min-h-[400px] md:min-h-[415px] shrink-0 rounded-[22px] p-6 sm:p-7 cursor-pointer select-none transition-shadow duration-300 ${
                      isActive 
                        ? 'bg-[#121216] border-white/30 shadow-[0_22px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(255,255,255,0.06)]' 
                        : 'bg-[#18181C] border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.7)] hover:border-white/20'
                    } border`}
                    style={{
                      transformOrigin: "center bottom",
                    }}
                  >
                    {/* Top Sleek Silver/Grey Accent Rim */}
                    <div 
                      className={`absolute top-0 inset-x-8 h-[2.5px] rounded-b-full transition-all duration-300 ${
                        isActive ? 'bg-zinc-300 shadow-[0_0_14px_rgba(255,255,255,0.4)]' : 'bg-zinc-600 shadow-[0_0_6px_rgba(255,255,255,0.1)]'
                      }`}
                    />

                    {/* Card Header Content */}
                    <div className="flex flex-col gap-2 relative z-10 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                          {card.label}
                        </span>
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-zinc-400">
                          0{i + 1}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-zinc-50 tracking-tight mt-0.5">
                        {card.title}
                      </h3>
                      
                      <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                        {card.description}
                      </p>
                    </div>

                    {/* Skills List Area */}
                    <div className="mt-auto pt-5">
                      <div className="mb-4 h-[1px] w-full bg-white/10" />
                      
                      <ul className="flex flex-col gap-2.5">
                        {card.skills.map((skill, j) => (
                          <li key={j} className="flex items-center gap-2.5 text-sm text-zinc-300">
                            <span 
                              className={`h-[4px] w-[4px] rounded-full transition-colors duration-200 ${
                                isActive ? 'bg-zinc-300' : 'bg-zinc-600'
                              }`}
                            />
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </m.div>
                );
              })}
            </div>
          </div>

          {/* Interactive Hint */}
          <p className="text-xs text-zinc-500 flex items-center justify-center gap-2 mt-2 text-center">
            <Layers className="w-3.5 h-3.5" />
            <span>Click any card to bring it to the front</span>
          </p>

        </div>
      </div>
    </section>
  );
}
