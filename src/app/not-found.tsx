import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-950 px-6 text-center">
      <div className="space-y-2">
        <h1 className="text-6xl font-bold tracking-tighter text-zinc-50">
          404
        </h1>
        <h2 className="text-xl font-medium tracking-tight text-zinc-300">
          Orphaned Node
        </h2>
        <p className="max-w-md text-zinc-400">
          The requested route does not exist in the current application tree.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-50 px-8 text-sm font-medium text-zinc-950 shadow transition-colors hover:bg-zinc-200"
      >
        Return to Root
      </Link>
    </div>
  );
}
