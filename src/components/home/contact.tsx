import Link from 'next/link';
import { ArrowUpRight, Download } from 'lucide-react';
import { CopyEmailCard } from './copy-email-card';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { AmbientGlow } from '@/components/background/ambient-glow';

// Custom SVG Icons for Brands
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full border-t border-white/5 bg-[#09090B] py-24 md:py-32"
    >
      <AmbientGlow />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-20 flex max-w-4xl flex-col gap-6 md:mb-32">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-50 md:text-5xl lg:text-6xl">
              <span className="text-zinc-500">Let&apos;s Build</span> Something
              Meaningful
            </h2>
            <p className="max-w-[65ch] text-base leading-relaxed text-zinc-400 md:text-lg">
              Whether it&apos;s a{' '}
              <span className="font-semibold text-zinc-100">new product</span>,
              an{' '}
              <span className="font-semibold text-zinc-100">
                exciting opportunity
              </span>
              , or an{' '}
              <span className="font-semibold text-zinc-100">
                ambitious idea
              </span>
              , I&apos;d be happy to help{' '}
              <span className="font-semibold text-zinc-100">
                bring it to life
              </span>
              .
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <ScrollReveal delay={0}>
            <CopyEmailCard />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Link
              href="https://www.linkedin.com/in/situmorang-grandy/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between gap-8 rounded-[24px] border border-white/10 bg-zinc-900/30 p-10 transition-all duration-[180ms] active:scale-[0.98] active:border-white/20 active:bg-zinc-900/50 md:hover:-translate-y-[2px] md:hover:border-white/20 md:hover:bg-zinc-900/50"
            >
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/5 text-zinc-300">
                  <LinkedinIcon className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-1.5 overflow-hidden">
                  <h3 className="text-base font-semibold text-zinc-100">
                    LinkedIn
                  </h3>
                  <p className="truncate text-sm text-zinc-500">
                    Professional Network
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-zinc-400 uppercase transition-colors duration-[180ms] group-active:text-zinc-100 md:group-hover:text-zinc-100">
                View Profile
                <ArrowUpRight className="h-4 w-4 transition-transform duration-[180ms] group-active:translate-x-1 group-active:-translate-y-1 md:group-hover:translate-x-1 md:group-hover:-translate-y-1" />
              </div>
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Link
              href="https://github.com/Grandy19"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between gap-8 rounded-[24px] border border-white/10 bg-zinc-900/30 p-10 transition-all duration-[180ms] active:scale-[0.98] active:border-white/20 active:bg-zinc-900/50 md:hover:-translate-y-[2px] md:hover:border-white/20 md:hover:bg-zinc-900/50"
            >
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/5 text-zinc-300">
                  <GithubIcon className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-1.5 overflow-hidden">
                  <h3 className="text-base font-semibold text-zinc-100">
                    GitHub
                  </h3>
                  <p className="truncate text-sm text-zinc-500">
                    Code Repository
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-zinc-400 uppercase transition-colors duration-[180ms] group-active:text-zinc-100 md:group-hover:text-zinc-100">
                View Profile
                <ArrowUpRight className="h-4 w-4 transition-transform duration-[180ms] group-active:translate-x-1 group-active:-translate-y-1 md:group-hover:translate-x-1 md:group-hover:-translate-y-1" />
              </div>
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <Link
              href="https://www.instagram.com/s.grandy_/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between gap-8 rounded-[24px] border border-white/10 bg-zinc-900/30 p-10 transition-all duration-[180ms] active:scale-[0.98] active:border-white/20 active:bg-zinc-900/50 md:hover:-translate-y-[2px] md:hover:border-white/20 md:hover:bg-zinc-900/50"
            >
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/5 text-zinc-300">
                  <InstagramIcon className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-1.5 overflow-hidden">
                  <h3 className="text-base font-semibold text-zinc-100">
                    Instagram
                  </h3>
                  <p className="truncate text-sm text-zinc-500">Visual Feed</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-zinc-400 uppercase transition-colors duration-[180ms] group-active:text-zinc-100 md:group-hover:text-zinc-100">
                View Profile
                <ArrowUpRight className="h-4 w-4 transition-transform duration-[180ms] group-active:translate-x-1 group-active:-translate-y-1 md:group-hover:translate-x-1 md:group-hover:-translate-y-1" />
              </div>
            </Link>
          </ScrollReveal>
        </div>

        {/* Strong Primary CTA */}
        <ScrollReveal>
          <div className="mx-auto mt-32 flex max-w-2xl flex-col items-center justify-center gap-8 text-center md:mt-48">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-zinc-100 md:text-3xl">
                Interested in working together?
              </h3>
              <p className="mx-auto max-w-[60ch] text-base leading-relaxed text-zinc-400 md:text-lg">
                I&apos;m currently open for internship opportunities,
                collaboration, and meaningful software projects.
              </p>
            </div>
            <a
              href="/resumecv.pdf"
              target="_blank"
              className="group flex w-[260px] items-center justify-center gap-3 rounded-2xl bg-zinc-100 px-8 py-4 text-[10px] font-black tracking-[0.3em] text-zinc-950 uppercase shadow-none transition-all hover:scale-[1.05] hover:bg-white active:scale-95 md:w-auto md:px-10 md:py-5"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
