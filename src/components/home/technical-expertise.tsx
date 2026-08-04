'use client';

import React, { useState, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Layers, ChevronLeft, ChevronRight } from 'lucide-react';

export function TechnicalExpertise() {
  const [activeCard, setActiveCard] = useState<number>(0);

  const cards = [
    {
      label: 'SPECIALIZATION',
      title: 'Software Engineering',
      shortTitle: 'Software Eng',
      description:
        'Building scalable web applications across frontend, backend, APIs, and modern software architecture.',
      skills: [
        'React & Next.js',
        'Laravel',
        'RESTful APIs',
        'SQL Databases',
        'System Design',
        'Authentication',
      ],
    },
    {
      label: 'CORE COMPETENCY',
      title: 'Data & AI',
      shortTitle: 'Data & AI',
      description:
        'Analyzing datasets and integrating machine learning models for predictive intelligence and automation.',
      skills: [
        'Data Analysis',
        'Machine Learning',
        'Data Visualization',
        'NLP & LLM Integration',
        'Predictive Analytics',
        'Model Deployment',
      ],
    },
    {
      label: 'DOMAIN EXPERTISE',
      title: 'Smart City Systems',
      shortTitle: 'Smart City',
      description:
        'Designing interconnected urban systems using enterprise architecture, spatial data, and digital twin concepts.',
      skills: [
        'TOGAF ADM',
        'GIS & Spatial Data',
        'Urban Analytics',
        'Digital Twin Concepts',
        'Enterprise Architecture',
        'Smart Infrastructure',
      ],
    },
    {
      label: 'USER CENTRIC',
      title: 'Product & UI/UX',
      shortTitle: 'UI/UX Design',
      description:
        'Crafting intuitive digital experiences rooted in design systems and human-centered research.',
      skills: [
        'UI Design',
        'UX Research',
        'Wireframing & Prototyping',
        'Design Systems',
        'User Journey Mapping',
        'Product Strategy',
      ],
    },
  ];

  const handlePrev = () => {
    setActiveCard((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
  };

  const handleNext = () => {
    setActiveCard((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="expertise" className="relative w-full overflow-hidden">
      <div className="xs:px-6 relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12">
        {/* Wrapper matching Engineering Journey's constrained border */}
        <div className="mt-16 w-full border-t border-white/5 pt-16 sm:mt-24 sm:pt-24 md:mt-32 md:pt-32">
          {/* Header */}
          <ScrollReveal>
            <div className="mb-8 flex max-w-[650px] flex-col gap-3 sm:mb-12 sm:gap-4 md:mb-14">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-50 md:text-5xl lg:text-6xl">
                <span className="text-zinc-500">Technical</span> Expertise
              </h2>
              <p className="text-base leading-relaxed text-zinc-400 md:text-lg">
                Integrating{' '}
                <span className="font-semibold text-zinc-100">
                  software engineering
                </span>
                , <span className="font-semibold text-zinc-100">AI</span>,{' '}
                <span className="font-semibold text-zinc-100">
                  data science
                </span>
                , and{' '}
                <span className="font-semibold text-zinc-100">
                  product design
                </span>{' '}
                to create{' '}
                <span className="font-semibold text-zinc-100">
                  scalable solutions
                </span>{' '}
                for{' '}
                <span className="font-semibold text-zinc-100">businesses</span>{' '}
                and{' '}
                <span className="font-semibold text-zinc-100">
                  smarter cities
                </span>
                .
              </p>
            </div>
          </ScrollReveal>

          {/* Cards Deck Container (Responsive for Mobile, Tablet & Desktop) */}
          <div className="xs:min-h-[440px] relative flex min-h-[420px] w-full items-center justify-center overflow-hidden py-4 sm:min-h-[470px] sm:py-6 md:min-h-[490px]">
            {/* Desktop & Tablet Fanned Deck View */}
            <div className="hidden items-center justify-center -space-x-12 px-6 py-4 sm:flex sm:-space-x-16 md:-space-x-20 lg:-space-x-24">
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
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                      mass: 0.85,
                    }}
                    className={`group relative flex min-h-[390px] w-[280px] shrink-0 cursor-pointer flex-col justify-between rounded-[22px] p-6 transition-shadow duration-300 select-none sm:min-h-[400px] sm:w-[295px] sm:p-7 md:min-h-[415px] md:w-[320px] lg:w-[340px] ${
                      isActive
                        ? 'border-white/30 bg-[#121216] shadow-[0_22px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(255,255,255,0.06)]'
                        : 'border-white/10 bg-[#18181C] shadow-[0_12px_30px_rgba(0,0,0,0.7)] hover:border-white/20'
                    } border`}
                    style={{
                      transformOrigin: 'center bottom',
                    }}
                  >
                    {/* Top Sleek Silver/Grey Accent Rim */}
                    <div
                      className={`absolute inset-x-8 top-0 h-[2.5px] rounded-b-full transition-all duration-300 ${
                        isActive
                          ? 'bg-zinc-300 shadow-[0_0_14px_rgba(255,255,255,0.4)]'
                          : 'bg-zinc-600 shadow-[0_0_6px_rgba(255,255,255,0.1)]'
                      }`}
                    />

                    {/* Card Header Content */}
                    <div className="relative z-10 flex flex-col gap-2 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold tracking-[0.15em] text-zinc-500 uppercase">
                          {card.label}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] font-bold text-zinc-400">
                          0{i + 1}
                        </span>
                      </div>

                      <h3 className="mt-0.5 text-xl font-semibold tracking-tight text-zinc-50">
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
                          <li
                            key={j}
                            className="flex items-center gap-2.5 text-sm text-zinc-300"
                          >
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
            <div className="relative flex w-full max-w-[340px] items-center justify-center px-2 py-2 sm:hidden">
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
                        type: 'spring',
                        stiffness: 350,
                        damping: 28,
                      }}
                      className="xs:p-6 relative flex w-full flex-col rounded-[22px] border border-white/25 bg-[#121216] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(255,255,255,0.05)] select-none"
                    >
                      {/* Top Silver Luminous Accent Rim */}
                      <div className="absolute inset-x-8 top-0 h-[2.5px] rounded-b-full bg-zinc-200 shadow-[0_0_14px_rgba(255,255,255,0.5)]" />

                      {/* Card Header */}
                      <div className="relative z-10 flex flex-col gap-1.5 pt-1">
                        <div className="flex items-center justify-between">
                          <span className="xs:text-[11px] text-[10px] font-bold tracking-[0.15em] text-zinc-400 uppercase">
                            {card.label}
                          </span>
                          <span className="xs:text-[11px] rounded-full border border-white/15 bg-white/10 px-2 py-0.5 font-mono text-[10px] font-bold text-zinc-200">
                            0{i + 1} / 0{cards.length}
                          </span>
                        </div>

                        <h3 className="xs:text-xl mt-0.5 text-lg font-bold tracking-tight text-white">
                          {card.title}
                        </h3>

                        <p className="xs:text-sm mt-1.5 text-xs leading-relaxed text-zinc-300">
                          {card.description}
                        </p>
                      </div>

                      {/* Divider Line with Pleasant Balanced Spacing */}
                      <div className="mt-5 mb-4 h-[1px] w-full bg-white/10" />

                      {/* Skills List */}
                      <ul className="grid grid-cols-1 gap-2.5">
                        {card.skills.map((skill, j) => (
                          <li
                            key={j}
                            className="xs:text-sm flex items-center gap-2.5 text-xs text-zinc-200"
                          >
                            <span className="h-[4px] w-[4px] flex-shrink-0 rounded-full bg-zinc-300" />
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
          <div className="z-10 mt-4 flex items-center justify-center gap-3 sm:hidden">
            <button
              onClick={handlePrev}
              className="flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-zinc-900/90 text-zinc-300 shadow-xl backdrop-blur-md transition-all hover:bg-zinc-800 hover:text-white active:scale-95"
              aria-label="Previous skill card"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex h-10 w-24 flex-shrink-0 items-center justify-center gap-2 rounded-full border border-white/15 bg-zinc-900/90 font-mono text-xs text-zinc-400 tabular-nums shadow-xl backdrop-blur-md select-none">
              <span className="w-4 text-center font-bold text-white">
                {String(activeCard + 1).padStart(2, '0')}
              </span>
              <span className="text-zinc-600">/</span>
              <span className="w-4 text-center">
                {String(cards.length).padStart(2, '0')}
              </span>
            </div>

            <button
              onClick={handleNext}
              className="flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-zinc-900/90 text-zinc-300 shadow-xl backdrop-blur-md transition-all hover:bg-zinc-800 hover:text-white active:scale-95"
              aria-label="Next skill card"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Interactive Desktop Hint */}
          <p className="mt-2 hidden items-center justify-center gap-2 text-center text-xs text-zinc-500 sm:flex">
            <Layers className="h-3.5 w-3.5" />
            <span>Click any card to bring it to the front</span>
          </p>
        </div>
      </div>
    </section>
  );
}
