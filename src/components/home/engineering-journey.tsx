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
    year: '2026 — Present',
    role: 'Frontend Engineer & UI/UX Designer',
    organization: 'Tres Dynamics',
    location: 'Startup',
    description: [
      'Designed responsive user interfaces and developed modern frontend applications using React and TypeScript.',
      'Created user-centered UI/UX designs, from user flows and wireframes to high-fidelity prototypes in Figma.',
      'Collaborated with cross-functional teams to deliver scalable digital products aligned with user and business needs.',
    ],
  },
  {
    year: '2026 — Present',
    role: 'Frontend Developer & UI/UX Designer',
    organization: 'Sales Performance Dashboard (IWP)',
    location: 'PT IWP',
    description: [
      'Designed intuitive UI/UX and developed responsive frontend interfaces for a sales performance dashboard using React and TypeScript.',
      'Collaborated with stakeholders to transform manual reporting workflows into an interactive dashboard with real-time business insights.',
      'Built reusable frontend components and scalable user interfaces to improve consistency, maintainability, and user experience.',
    ],
  },
  {
    year: '2025 — 2026',
    role: 'Vice Chairman',
    organization: 'Student Representative Board (BPM)',
    location: 'Telkom University',
    description: [
      'Led organizational initiatives and coordinated internal programs to support student development and governance.',
      'Represented Smart City Information Systems students in academic discussions and policy-related meetings with the faculty.',
      'Collaborated with faculty members and student organizations to organize academic programs and strengthen cross-organization partnerships.',
    ],
  },
  {
    year: '2024 — Present',
    role: 'Full Stack Developer & UI/UX Designer',
    organization: 'HarmonyKids',
    location: 'Academic Project',
    description: [
      'Designed and developed a full-stack platform that helps parents discover and compare kindergartens, preschools, and daycare services.',
      'Created user-centered UI/UX designs and implemented responsive interfaces using modern web technologies.',
      'Collaborated with a multidisciplinary team to build scalable features from backend development to frontend implementation.',
    ],
  },
  {
    year: 'Feb 2026 — Jun 2026',
    role: 'Teaching Assistant',
    organization: 'Web Programming & UX Laboratory',
    location: 'Telkom University',
    description: [
      'Assisted students during Web Programming and UX laboratory sessions through hands-on technical guidance and mentoring.',
      'Guided students in frontend and backend development, wireframing, prototyping, and usability evaluation.',
      'Reviewed assignments, provided constructive feedback, and supported laboratory activities to enhance student learning.',
    ],
  },
  {
    year: '2026',
    role: 'System Analyst & UI/UX Designer',
    organization: 'Inkluvia (LIDM)',
    location: 'National Student Digital Innovation Competition (LIDM)',
    description: [
      'Analyzed system requirements and designed an AI-assisted learning platform for hearing-impaired junior high school students.',
      'Created user flows, wireframes, and high-fidelity prototypes to deliver an accessible and intuitive learning experience.',
      'Collaborated with the development team to ensure system feasibility and seamless Speech-to-Text integration.',
    ],
  },
  {
    year: '2025',
    role: 'UI/UX Designer & Backend Developer',
    organization: 'Farmora',
    location: 'Web Development Competition',
    description: [
      'Designed intuitive UI/UX and user flows for an agriculture e-commerce platform connecting farmers with consumers.',
      'Developed secure backend services, database architecture, and RESTful APIs to support product and transaction management.',
      'Collaborated with the development team to deliver a scalable platform with seamless user and business workflows.',
    ],
  },
  {
    year: '2024 — Present',
    role: 'Bachelor of Applied Science',
    organization: 'Telkom University (Smart City Information Systems)',
    location: 'Bandung, Indonesia',
    description: [
      'Currently pursuing a degree focused on the intersection of software engineering, data science, and urban technology.',
      'Maintaining a 3.75 GPA while actively participating in academic laboratories and student organizations.',
      'Building a strong foundation in scalable software architecture and human-centered design principles.',
    ],
  },
  {
    year: '2024 — 2026',
    role: 'Professional Certifications',
    organization: 'Various Institutions',
    location: 'Online',
    description: [
      'Earned professional certifications in Software Development, Data Science, UI/UX Design, and Cloud Computing.',
      'Strengthened practical skills through industry-recognized programs covering modern tools, frameworks, and engineering best practices.',
      'Applied certified knowledge to academic projects and real-world software development experiences.',
    ],
  },
  {
    year: '2024 — 2026',
    role: 'Participant & Award Winner',
    organization: 'IEEE Fest Universitas Brawijaya',
    location: 'National Level',
    description: [
      'Received the Best Innovation Award in the UI/UX category for designing an innovative and user-centered digital solution.',
      'Collaborated with a multidisciplinary team to transform ideas into functional prototypes under competitive timelines.',
      'Strengthened expertise in UI/UX design, problem-solving, and presenting innovative solutions in a national competition.',
    ],
  },
];

export function EngineeringJourney() {
  const [showAll, setShowAll] = useState(false);
  const displayedData = showAll ? journeyData : journeyData.slice(0, 3);

  return (
    <div className="relative mt-24 flex w-full flex-col items-center border-t border-white/5 pt-24 md:mt-32 md:pt-32">
      {/* Section Header */}
      <ScrollReveal>
        <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center gap-5 text-center md:mb-24">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 md:text-5xl lg:text-6xl">
            <span className="text-zinc-500">Engineering</span> Journey
          </h2>
          <p className="max-w-2xl px-2 text-base leading-relaxed text-zinc-400 md:text-lg">
            From{' '}
            <span className="font-semibold text-zinc-100">
              academic projects
            </span>{' '}
            to{' '}
            <span className="font-semibold text-zinc-100">
              real-world products
            </span>
            , every experience has strengthened my{' '}
            <span className="font-semibold text-zinc-100">
              engineering mindset
            </span>
            , <span className="font-semibold text-zinc-100">collaboration</span>
            , and{' '}
            <span className="font-semibold text-zinc-100">
              problem-solving approach
            </span>
            .
          </p>
        </div>
      </ScrollReveal>

      {/* Vertical Timeline - Centered Max Width */}
      <div className="relative flex w-full max-w-4xl flex-col gap-20 px-6">
        {displayedData.map((item, index) => (
          <ScrollReveal key={index}>
            <div className="group relative flex flex-col gap-4 pl-6 md:flex-row md:gap-12 md:pl-0">
              {/* Timeline Line (Mobile & Desktop) */}
              <div className="absolute top-3 bottom-[-60px] left-0 w-[1px] bg-white/5 transition-colors duration-300 group-hover:bg-white/20 last:hidden md:bottom-[-100px] md:left-[150px]" />

              {/* Year Column */}
              <div className="relative z-10 shrink-0 text-left md:w-[120px] md:text-right">
                <div className="pt-1 text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
                  {item.year.includes(' — ')
                    ? item.year.split(' — ').map((part, i, arr) => (
                        <span key={i} className="block md:inline lg:block">
                          {part}
                          {i < arr.length - 1 ? ' —' : ''}
                        </span>
                      ))
                    : item.year}
                </div>
                {/* Timeline Dot (Mobile & Desktop) */}
                <div className="absolute top-[9px] left-[-26px] h-[5px] w-[5px] rounded-full border border-zinc-600 bg-zinc-800 transition-all duration-300 group-hover:scale-[1.15] group-hover:border-zinc-300 group-hover:bg-zinc-400 md:top-[10px] md:right-[-34px] md:left-auto md:h-[7px] md:w-[7px]" />
              </div>

              {/* Content Column */}
              <div className="flex flex-1 flex-col gap-4 transition-transform duration-300 md:group-hover:translate-x-[6px]">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-zinc-100 transition-colors duration-300 group-hover:text-white md:text-2xl">
                    {item.role}
                  </h3>
                  <div className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:gap-3 md:text-base">
                    <span className="font-medium text-zinc-300">
                      {item.organization}
                    </span>
                    <span className="hidden text-zinc-700 sm:block">•</span>
                    <span className="text-zinc-500">{item.location}</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-4">
                  {item.description.map((point, i) => (
                    <li
                      key={i}
                      className="relative pl-6 text-sm leading-relaxed text-zinc-400 md:text-base"
                    >
                      <span className="absolute top-[0.65em] left-0 h-[4px] w-[4px] rounded-full bg-zinc-700 transition-colors duration-300 group-hover:bg-zinc-500" />
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
      <div className="mt-20 flex w-full justify-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="group flex w-[260px] items-center justify-center gap-3 rounded-2xl bg-zinc-100 px-8 py-4 text-[10px] font-black tracking-[0.3em] text-zinc-950 uppercase shadow-none transition-all hover:scale-[1.05] hover:bg-white active:scale-95 sm:w-auto md:px-10 md:py-5"
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
