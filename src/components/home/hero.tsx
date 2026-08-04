import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { GeospatialMesh } from '@/components/background/geospatial-mesh';
import { ProfileScan, ProfileScanGlow } from '@/components/ui/profile-scan';

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden pt-24 md:flex-row md:justify-between md:pt-0"
    >
      <GeospatialMesh />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col-reverse items-center justify-between gap-12 px-6 sm:px-8 md:flex-row lg:px-12">
        {/* Text Content */}
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
          <ScrollReveal delay={0}>
            <h1 className="text-5xl leading-[1.1] font-bold tracking-tighter md:text-6xl md:leading-[1.05] lg:text-7xl">
              <span className="text-zinc-400">Grandy</span>{' '}
              <br className="hidden md:block" />
              <span className="text-zinc-50">Alexander.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <p className="mt-8 max-w-[650px] text-base leading-relaxed font-normal text-zinc-400 sm:text-lg md:text-xl">
              Building{' '}
              <span className="font-semibold text-zinc-100">
                intelligent software
              </span>
              ,{' '}
              <span className="font-semibold text-zinc-100">AI solutions</span>,
              and{' '}
              <span className="font-semibold text-zinc-100">
                digital experiences
              </span>{' '}
              for{' '}
              <span className="font-semibold text-zinc-100">
                smarter cities
              </span>{' '}
              and{' '}
              <span className="font-semibold text-zinc-100">businesses</span>.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.12} className="w-full sm:w-auto">
            <div className="mt-12 flex w-full flex-col items-center gap-6 sm:w-auto sm:flex-row">
              <Link href="/projects" className="w-[260px] sm:w-auto">
                <Button className="group h-auto w-full rounded-2xl bg-zinc-100 px-8 py-4 text-[10px] font-black tracking-[0.3em] text-zinc-950 uppercase shadow-none transition-all hover:scale-[1.05] hover:bg-white active:scale-95 sm:w-56 md:px-10 md:py-5">
                  View Projects
                </Button>
              </Link>
              <Button
                variant="outline"
                className="group h-auto w-[260px] rounded-2xl border border-zinc-800 bg-transparent px-8 py-4 text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase transition-all hover:scale-[1.05] hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-100 active:scale-95 sm:w-56 md:px-10 md:py-5"
              >
                Hire Me
              </Button>
            </div>
          </ScrollReveal>
        </div>

        {/* Portrait Implementation */}
        <div className="relative hidden w-full flex-1 items-center justify-center pt-8 md:flex md:justify-end md:pt-0">
          <ScrollReveal
            delay={0.18}
            className="relative z-0 h-[260px] w-[200px] sm:h-[300px] sm:w-[240px] md:h-[350px] md:w-[260px] lg:h-[400px] lg:w-[280px]"
          >
            {/* Subtle Rim Light */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-600/20 mix-blend-screen blur-[80px]" />
            <ProfileScanGlow />

            {/* Image Container */}
            <div className="relative z-10 h-full w-full -rotate-2 overflow-hidden rounded-lg border border-white/10 bg-zinc-950 shadow-2xl transition-transform duration-500 hover:scale-[1.02] hover:rotate-[0.5deg]">
              <Image
                src="/fotopribadi.jpeg"
                alt="Grandy Alexander - Software Engineer"
                fill
                loading="lazy"
                className="object-cover object-top drop-shadow-2xl md:object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
                quality={80}
              />
              <ProfileScan />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Infinite Marquee Ticker (Optimized solid semi-translucent background) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-white/5 bg-zinc-950/90 py-3">
        <div className="animate-marquee flex w-max">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-8 px-4 text-xs font-semibold tracking-[0.2em] text-zinc-500 sm:text-sm"
            >
              <span>SMART CITY</span>
              <span className="text-zinc-800">•</span>
              <span>DATA SCIENCE</span>
              <span className="text-zinc-800">•</span>
              <span>SOFTWARE ENGINEERING</span>
              <span className="text-zinc-800">•</span>
              <span>AI</span>
              <span className="text-zinc-800">•</span>
              <span>SMART CITY</span>
              <span className="text-zinc-800">•</span>
              <span>USER INTERFACE</span>
              <span className="text-zinc-800">•</span>
              <span>USER EXPERIENCE</span>
              <span className="text-zinc-800">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
