import Image from 'next/image';

export function Footer() {
  return (
    <footer className="relative z-50 w-full border-t border-white/5 bg-zinc-950 pt-24 pb-12 md:pt-32 md:pb-12">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Top Section */}
        <div className="flex flex-col gap-16 md:flex-row md:justify-between mb-16 md:mb-20">
          
          {/* Brand & Name */}
          <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              {/* Premium Logo */}
              <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
                <Image src="/logo.png" alt="Situmorang Grandy Logo" fill className="object-cover" />
              </div>
              <h4 className="text-xl font-semibold tracking-tight text-zinc-100">
                Grandy Alexander
              </h4>
            </div>
            <p className="text-base text-zinc-500 leading-relaxed max-w-[30ch]">
              Building thoughtful software<br /> for real-world impact.
            </p>
          </div>

          {/* Right Section */}
          <div className="flex flex-col gap-6 items-center md:items-end text-center md:text-right">
            <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-600">
              Available For
            </h5>
            <ul className="flex flex-col gap-3 text-base font-medium text-zinc-400">
              <li className="flex items-center justify-center md:justify-end gap-3 transition-colors hover:text-zinc-200">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                Internship
              </li>
              <li className="flex items-center justify-center md:justify-end gap-3 transition-colors hover:text-zinc-200">
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                Collaboration
              </li>
              <li className="flex items-center justify-center md:justify-end gap-3 transition-colors hover:text-zinc-200">
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                Software Engineering Projects
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-6 md:flex-row items-center md:justify-between border-t border-white/5 pt-8 text-center md:text-left">
          <p className="text-sm font-medium text-zinc-500">
            © {new Date().getFullYear()} Grandy Alexander.
          </p>
          <p className="text-sm text-zinc-600">
            Built with <span className="text-zinc-300 font-medium hover:text-white transition-colors cursor-default">Next.js</span>, <span className="text-zinc-300 font-medium hover:text-white transition-colors cursor-default">TypeScript</span> &amp; <span className="text-zinc-300 font-medium hover:text-white transition-colors cursor-default">Tailwind CSS</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
