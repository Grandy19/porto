import Image from 'next/image';
import { EngineeringJourney } from './engineering-journey';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export function About() {
  return (
    <section id="about" className="relative w-full border-t border-white/5 pt-24 md:pt-32">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Editorial Layout: Asymmetrical Grid */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-20">
          
          {/* Main Headline & Story (Spans Left Side) */}
          <div className="order-2 flex flex-col gap-8 md:order-none md:col-span-7 lg:col-span-6 md:gap-12">
            <ScrollReveal>
              <h2 className="text-4xl font-bold leading-[1.1] tracking-tighter text-zinc-50 md:text-5xl lg:text-6xl xl:text-7xl">
                <span className="text-zinc-400">Building</span> intelligent systems.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="flex flex-col gap-8 text-base leading-relaxed text-zinc-400 md:text-lg">
                <p>
                  I&apos;m Sitomorang Grandy Alexander, a fifth-semester Smart City Information Systems student at Telkom University with a strong interest in Software Engineering, Data Science, and Smart City technologies. I enjoy designing scalable software and transforming complex problems into practical digital solutions.
                </p>
                <p>
                  Beyond writing code, I focus on understanding systems, analyzing data, and building technology with purpose. I continuously improve through academic projects and hands-on development while preparing for a career as a Software Engineer.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Vertical Portrait (Spans Right Side) */}
          <div className="order-1 relative md:order-none md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
            <ScrollReveal delay={0.2} className="relative mx-auto h-[260px] w-full max-w-[200px] overflow-hidden sm:h-[300px] sm:max-w-[240px] md:mx-0 md:h-[350px] md:max-w-[260px] lg:h-[400px] lg:max-w-[280px]">
               {/* Subtle rim light aura */}
               <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[100%] w-[100%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-600/10 mix-blend-screen blur-[120px]" />
               
               {/* Portrait with seamless fade mask */}
               <div className="relative h-full w-full opacity-90 [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]">
                 <Image
                   src="/fotoabout.png"
                   alt="Grandy Alexander"
                   fill
                   className="object-cover object-[center_20%] grayscale-[60%] transition-opacity duration-700 hover:opacity-100"
                   sizes="(max-width: 768px) 100vw, 500px"
                   quality={90}
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
