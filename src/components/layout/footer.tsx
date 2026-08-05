import Image from 'next/image';

export function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-white/5 bg-zinc-950 pt-24 pb-12 md:pt-32 md:pb-12">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Top Section */}
        <div className="mb-16 flex flex-col gap-16 md:mb-20 md:flex-row md:justify-between">
          {/* Brand & Name */}
          <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
            <div className="flex items-center justify-center gap-4 md:justify-start">
              {/* Premium Logo */}
              <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
                <Image
                  src="/logo.png"
                  alt="Situmorang Grandy Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-xl font-semibold tracking-tight text-zinc-100">
                Grandy Alexander
              </h4>
            </div>
            <p className="max-w-[30ch] text-base leading-relaxed text-zinc-500">
              Building thoughtful software
              <br /> for real-world impact.
            </p>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-center gap-6 text-center md:items-end md:text-right">
            <h5 className="text-[11px] font-bold tracking-[0.2em] text-zinc-600 uppercase">
              Available For
            </h5>
            <ul className="flex flex-col gap-3 text-base font-medium text-zinc-400">
              <li className="flex items-center justify-center gap-3 transition-colors hover:text-zinc-200 md:justify-end">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                Internship
              </li>
              <li className="flex items-center justify-center gap-3 transition-colors hover:text-zinc-200 md:justify-end">
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                Collaboration
              </li>
              <li className="flex items-center justify-center gap-3 transition-colors hover:text-zinc-200 md:justify-end">
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                Software Engineering Projects
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-6 border-t border-white/5 pt-8 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-sm font-medium text-zinc-500">
            © {new Date().getFullYear()} Grandy Alexander.
          </p>
          <p className="text-sm text-zinc-600">
            Built with{' '}
            <span className="cursor-default font-medium text-zinc-300 transition-colors hover:text-white">
              Next.js
            </span>
            ,{' '}
            <span className="cursor-default font-medium text-zinc-300 transition-colors hover:text-white">
              TypeScript
            </span>{' '}
            &amp;{' '}
            <span className="cursor-default font-medium text-zinc-300 transition-colors hover:text-white">
              Tailwind CSS
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
