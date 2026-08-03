'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

type Experience = {
  year: string;
  role: string;
  organization: string;
  location: string;
  description: string[];
};

// Urutan dari yang terbaru (2026/Present) hingga yang terlama (2024)
const journeyData: Experience[] = [
  {
    year: "2026 — Present",
    role: "Frontend Engineer & UI/UX Designer",
    organization: "Tres Dynamics",
    location: "Startup",
    description: [
      "Designed and developed user-centered digital products focused on solving real-world problems through intuitive and scalable interfaces.",
      "Led the UI/UX design process from user flows and wireframes to high-fidelity prototypes and responsive interface implementation.",
      "Built modern frontend experiences while collaborating with cross-functional team members to transform ideas into functional products.",
      "Contributed to product strategy by balancing user needs, business objectives, and technical feasibility."
    ]
  },
  {
    year: "2026 — Present",
    role: "Frontend Developer & UI/UX Designer",
    organization: "Sales Performance Dashboard (IWP)",
    location: "Bandung, Indonesia",
    description: [
      "Designed a responsive sales dashboard focused on business reporting for distributor operations.",
      "Collaborated closely with stakeholders to transform manual reporting processes into an interactive digital dashboard.",
      "Built reusable frontend components using modern UI patterns to ensure maintainability.",
      "Delivered a production-ready system that is actively used within the company."
    ]
  },
  {
    year: "2025 — 2026",
    role: "Vice Chairman",
    organization: "Student Representative Board (BPM)",
    location: "Telkom University",
    description: [
      "Coordinated organizational programs and internal initiatives to support student development.",
      "Represented Smart City Information Systems students in critical academic discussions with the faculty.",
      "Collaborated with faculty and other student organizations to ensure the success of academic activities."
    ]
  },
  {
    year: "2024 — Present",
    role: "Full Stack Developer & UI/UX Designer",
    organization: "HarmonyKids",
    location: "Bandung, Indonesia",
    description: [
      "Designed and developed a comprehensive platform that helps parents discover and compare educational institutions.",
      "Collaborated with a cross-functional team of three throughout the entire product lifecycle from planning to deployment.",
      "Developed end-to-end features bridging complex backend logic with intuitive user interfaces.",
      "Successfully deployed the application and currently driving continuous improvements."
    ]
  },
  {
    year: "Feb 2026 — Jun 2026",
    role: "Teaching Assistant",
    organization: "Web Programming & UX Laboratory",
    location: "Telkom University",
    description: [
      "Assisted students during practical sessions for both Web Programming and UX research.",
      "Guided students in frontend and backend implementation, wireframing, prototyping, and usability evaluation.",
      "Supported laboratory activities, reviewed assignments, and provided constructive design feedback."
    ]
  },
  {
    year: "2026",
    role: "System Analyst & UI/UX Designer",
    organization: "Inkluvia (LIDM)",
    location: "Bandung, Indonesia",
    description: [
      "Designed an AI-assisted learning platform tailored for hearing-impaired junior high school students.",
      "Created seamless user flows, comprehensive wireframes, and premium high-fidelity interfaces.",
      "Conducted deep system analysis to effectively integrate Speech-to-Text capabilities into the learning experience.",
      "Collaborated closely with the development team throughout the competition to ensure technical feasibility."
    ]
  },
  {
    year: "2025",
    role: "Full Stack Developer",
    organization: "Farmora",
    location: "Bandung, Indonesia",
    description: [
      "Developed a modern agriculture e-commerce platform connecting farmers directly with consumers.",
      "Architected the database schema and implemented robust API endpoints to handle transactions securely.",
      "Focused on creating a responsive and accessible user interface for seamless mobile and desktop experiences."
    ]
  },

  {
    year: "2024 — Present",
    role: "Bachelor of Applied Science",
    organization: "Telkom University (Smart City Information Systems)",
    location: "Bandung, Indonesia",
    description: [
      "Currently pursuing a degree focused on the intersection of software engineering, data science, and urban technology.",
      "Maintaining a 3.75 GPA while actively participating in academic laboratories and student organizations.",
      "Building a strong foundation in scalable software architecture and human-centered design principles."
    ]
  },
  {
    year: "2024 — 2026",
    role: "Professional Certifications",
    organization: "Various Institutions",
    location: "Online",
    description: [
      "Continuously expanding technical expertise through specialized certifications in software development and data science.",
      "Focusing on industry-standard tools and methodologies to ensure best practices in all engineering endeavors."
    ]
  },
  {
    year: "2024 — 2026",
    role: "Participant & Finalist",
    organization: "Competitions & Awards",
    location: "National Level",
    description: [
      "Competed in various national-level hackathons and software development competitions.",
      "Demonstrated the ability to deliver innovative technical solutions under strict time constraints.",
      "Recognized for excellence in UI/UX design and scalable system architecture."
    ]
  }
];

export function EngineeringJourney() {
  const [showAll, setShowAll] = useState(false);
  const displayedData = showAll ? journeyData : journeyData.slice(0, 3);

  return (
    <div className="relative flex w-full flex-col items-center mt-24 md:mt-32 pt-24 md:pt-32 border-t border-white/5">
      
      {/* Section Header */}
      <ScrollReveal>
        <div className="flex flex-col items-center text-center gap-5 mb-16 md:mb-24 mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 md:text-5xl lg:text-6xl">
            <span className="text-zinc-500">Engineering</span> Journey
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed md:text-lg max-w-2xl px-2">
            From academic projects to real-world products, every experience has strengthened my engineering mindset, collaboration, and problem-solving approach.
          </p>
        </div>
      </ScrollReveal>

      {/* Vertical Timeline - Centered Max Width */}
      <div className="relative flex w-full max-w-4xl flex-col gap-20 px-6">
        {displayedData.map((item, index) => (
          <ScrollReveal key={index}>
            <div className="group relative flex flex-col gap-4 md:flex-row md:gap-12 pl-6 md:pl-0">
              
              {/* Timeline Line (Mobile & Desktop) */}
              <div className="absolute left-0 md:left-[150px] top-3 bottom-[-60px] md:bottom-[-100px] w-[1px] bg-white/5 transition-colors duration-300 group-hover:bg-white/20 last:hidden" />
              
              {/* Year Column */}
              <div className="md:w-[120px] shrink-0 relative z-10 text-left md:text-right">
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 pt-1">
                  {item.year.includes(' — ') ? (
                    item.year.split(' — ').map((part, i, arr) => (
                      <span key={i} className="block md:inline lg:block">
                        {part}{i < arr.length - 1 ? ' —' : ''}
                      </span>
                    ))
                  ) : (
                    item.year
                  )}
                </div>
                {/* Timeline Dot (Mobile & Desktop) */}
                <div className="absolute left-[-26px] md:left-auto md:right-[-34px] top-[9px] md:top-[10px] h-[5px] w-[5px] md:h-[7px] md:w-[7px] rounded-full bg-zinc-800 border border-zinc-600 transition-all duration-300 group-hover:scale-[1.15] group-hover:bg-zinc-400 group-hover:border-zinc-300" />
              </div>
              
              {/* Content Column */}
              <div className="flex flex-col gap-4 flex-1 transition-transform duration-300 md:group-hover:translate-x-[6px]">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl md:text-2xl font-semibold text-zinc-100 transition-colors duration-300 group-hover:text-white">
                  {item.role}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm md:text-base">
                  <span className="font-medium text-zinc-300">{item.organization}</span>
                  <span className="hidden sm:block text-zinc-700">•</span>
                  <span className="text-zinc-500">{item.location}</span>
                </div>
              </div>

              <ul className="flex flex-col gap-4">
                {item.description.map((point, i) => (
                  <li key={i} className="relative pl-6 text-sm md:text-base text-zinc-400 leading-relaxed">
                    <span className="absolute left-0 top-[0.65em] h-[4px] w-[4px] rounded-full bg-zinc-700 transition-colors duration-300 group-hover:bg-zinc-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        </ScrollReveal>
      ))}
      </div>

      {/* See More Button */}
      <div className="mt-20 flex justify-center w-full">
        <button
          onClick={() => setShowAll(!showAll)}
          className="group flex w-[260px] sm:w-auto items-center justify-center gap-3 rounded-2xl bg-zinc-100 px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-950 shadow-none transition-all hover:scale-[1.05] hover:bg-white active:scale-95 md:px-10 md:py-5"
        >
          {showAll ? (
            <>
              Show Less
              <ChevronUp className="h-4 w-4 text-zinc-500 transition-transform group-hover:-translate-y-0.5" />
            </>
          ) : (
            <>
              See More Journey
              <ChevronDown className="h-4 w-4 text-zinc-500 transition-transform group-hover:translate-y-0.5" />
            </>
          )}
        </button>
      </div>
      
    </div>
  );
}
