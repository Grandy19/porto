import Image from 'next/image';
import { EngineeringJourney } from './engineering-journey';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export function About() {
  return (
    <section
      id="about"
      className="relative w-full border-t border-white/5 pt-24 md:pt-32"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Editorial Layout: Asymmetrical Grid */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-20">
          {/* Main Headline & Story (Spans Left Side) */}
          <div className="order-2 flex flex-col gap-8 md:order-none md:col-span-7 md:gap-12 lg:col-span-6">
            <ScrollReveal>
              <h2 className="text-4xl leading-[1.1] font-bold tracking-tighter text-zinc-50 md:text-5xl lg:text-6xl xl:text-7xl">
                <span className="text-zinc-400">Engineering</span> meaningful
                technology.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="flex flex-col gap-8 text-base leading-relaxed text-zinc-400 md:text-lg">
                <p>
                  Passionate about{' '}
                  <span className="font-semibold text-zinc-100">
                    Software Engineering
                  </span>
                  , <span className="font-semibold text-zinc-100">AI</span>,{' '}
                  <span className="font-semibold text-zinc-100">
                    Data Science
                  </span>
                  , and{' '}
                  <span className="font-semibold text-zinc-100">
                    Smart City technologies
                  </span>
                  , I build{' '}
                  <span className="font-semibold text-zinc-100">
                    scalable software
                  </span>{' '}
                  that transforms complex challenges into{' '}
                  <span className="font-semibold text-zinc-100">
                    practical digital solutions
                  </span>
                  .
                </p>
                <p>
                  I believe great technology goes beyond functionality. It
                  should{' '}
                  <span className="font-semibold text-zinc-100">
                    solve real problems
                  </span>
                  , create{' '}
                  <span className="font-semibold text-zinc-100">
                    meaningful impact
                  </span>
                  , and continuously evolve through{' '}
                  <span className="font-semibold text-zinc-100">curiosity</span>
                  ,{' '}
                  <span className="font-semibold text-zinc-100">
                    collaboration
                  </span>
                  , and{' '}
                  <span className="font-semibold text-zinc-100">
                    innovation
                  </span>
                  .
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Vertical Portrait (Spans Right Side - Harmonized with Hero size & Right Aligned) */}
          <div className="relative order-1 flex justify-center md:order-none md:col-span-5 md:col-start-8 md:justify-end lg:col-span-4 lg:col-start-9">
            <ScrollReveal
              delay={0.2}
              className="relative mx-auto w-[200px] sm:w-[240px] md:mx-0 md:ml-auto md:w-[260px] lg:w-[280px]"
            >
              {/* Subtle rim light aura */}
              <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[100%] w-[100%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-600/10 mix-blend-screen blur-[40px] md:blur-[120px]" />

              {/* Portrait with seamless fade mask (Native 4:5 Aspect Ratio, uncropped) */}
              <div className="relative aspect-[4/5] w-full [mask-image:linear-gradient(to_bottom,black_65%,transparent_100%)] opacity-90">
                <Image
                  src="/fotoabout2.jpg"
                  alt="Grandy Alexander"
                  fill
                  className="object-cover grayscale-[60%] transition-opacity duration-700 hover:opacity-100"
                  sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, 300px"
                  quality={85}
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Full-width Engineering Journey Timeline */}
        <EngineeringJourney />
      </div>
    </section>
  );
}
