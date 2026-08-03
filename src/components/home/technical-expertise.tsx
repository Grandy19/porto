'use client';

import React, { useState, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Layers, ChevronLeft, ChevronRight } from 'lucide-react';

export function TechnicalExpertise() {
  const [activeCard, setActiveCard] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cards = [
    {
      label: "SPECIALIZATION",
      title: "Software Engineering",
      shortTitle: "Software Eng",
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
      shortTitle: "Data & AI",
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
      shortTitle: "Smart City",
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
      shortTitle: "UI/UX Design",
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

  const handlePrev = () => {
    setActiveCard((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
  };

  const handleNext = () => {
    setActiveCard((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="relative w-full pb-20 sm:pb-24 md:pb-32 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Wrapper matching Engineering Journey's constrained border */}
        <div className="w-full mt-16 sm:mt-24 md:mt-32 pt-16 sm:pt-24 md:pt-32 border-t border-white/5">
        
          {/* Header */}
          <ScrollReveal>
            <div className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-14 max-w-[650px]">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-50 md:text-5xl lg:text-6xl">
                <span className="text-zinc-500">Technical</span> Expertise
              </h2>
              <p className="text-base text-zinc-400 leading-relaxed md:text-lg">
                A multidisciplinary foundation spanning software engineering, artificial intelligence, smart city systems, and product design.
              </p>
            </div>
          </ScrollReveal>



          {/* Cards Deck Container (Responsive for Mobile, Tablet & Desktop) */}
          <div className="relative flex items-center justify-center min-h-[420px] xs:min-h-[440px] sm:min-h-[470px] md:min-h-[490px] w-full py-4 sm:py-6 overflow-hidden">
            
            {/* Desktop & Tablet Fanned Deck View */}
            <div className="hidden sm:flex items-center justify-center -space-x-12 sm:-space-x-16 md:-space-x-20 lg:-space-x-24 px-6 py-4">
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
                    className={`group relative flex flex-col justify-between w-[280px] sm:w-[295px] md:w-[320px] lg:w-[340px] min-h-[390px] sm:min-h-[400px] md:min-h-[415px] shrink-0 rounded-[22px] p-6 sm:p-7 cursor-pointer select-none transition-shadow duration-300 ${
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

            {/* Mobile Stacked Deck View (Flawlessly Centered & Touch-Optimized) */}
            <div className="relative flex sm:hidden items-center justify-center w-full max-w-[340px] px-2 py-2">
              <AnimatePresence mode="wait">
                {cards.map((card, i) => {
                  if (i !== activeCard) return null;
                  
                  return (
                    <m.div
                      key={card.title}
                      initial={{ opacity: 0, scale: 0.94, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: -10 }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 28,
                      }}
                      className="relative flex flex-col w-full rounded-[22px] p-5 xs:p-6 bg-[#121216] border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(255,255,255,0.05)] select-none"
                    >
                      {/* Top Silver Luminous Accent Rim */}
                      <div className="absolute top-0 inset-x-8 h-[2.5px] rounded-b-full bg-zinc-200 shadow-[0_0_14px_rgba(255,255,255,0.5)]" />

                      {/* Card Header */}
                      <div className="flex flex-col gap-1.5 relative z-10 pt-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] xs:text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-400">
                            {card.label}
                          </span>
                          <span className="text-[10px] xs:text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border border-white/15 bg-white/10 text-zinc-200">
                            0{i + 1} / 0{cards.length}
                          </span>
                        </div>
                        
                        <h3 className="text-lg xs:text-xl font-bold text-white tracking-tight mt-0.5">
                          {card.title}
                        </h3>
                        
                        <p className="mt-1 text-xs xs:text-sm leading-relaxed text-zinc-300">
                          {card.description}
                        </p>
                      </div>

                      {/* Divider Line with Tight, Balanced Spacing */}
                      <div className="my-3.5 h-[1px] w-full bg-white/10" />

                      {/* Skills List */}
                      <ul className="grid grid-cols-1 gap-2">
                        {card.skills.map((skill, j) => (
                          <li key={j} className="flex items-center gap-2 text-xs xs:text-sm text-zinc-200">
                            <span className="h-[4px] w-[4px] rounded-full bg-zinc-300 flex-shrink-0" />
                            <span className="truncate">{skill}</span>
                          </li>
                        ))}
                      </ul>

                    </m.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </div>

          {/* Navigation Controls on Mobile */}
          <div className="flex sm:hidden items-center justify-center gap-3 mt-4 z-10">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-zinc-300 hover:text-white transition-all active:scale-95 cursor-pointer flex-shrink-0 flex items-center justify-center shadow-xl backdrop-blur-md"
              aria-label="Previous skill card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="w-24 h-10 flex items-center justify-center gap-2 font-mono text-xs text-zinc-400 bg-zinc-900/90 border border-white/15 rounded-full shadow-xl select-none backdrop-blur-md tabular-nums flex-shrink-0">
              <span className="w-4 text-center text-white font-bold">{String(activeCard + 1).padStart(2, '0')}</span>
              <span className="text-zinc-600">/</span>
              <span className="w-4 text-center">{String(cards.length).padStart(2, '0')}</span>
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-zinc-300 hover:text-white transition-all active:scale-95 cursor-pointer flex-shrink-0 flex items-center justify-center shadow-xl backdrop-blur-md"
              aria-label="Next skill card"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Desktop Hint */}
          <p className="hidden sm:flex text-xs text-zinc-500 items-center justify-center gap-2 mt-2 text-center">
            <Layers className="w-3.5 h-3.5" />
            <span>Click any card to bring it to the front</span>
          </p>

        </div>
      </div>
    </section>
  );
}
