export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="flex flex-col items-center gap-4">
        {/* Minimalist pulse ring for loading */}
        <div className="h-8 w-8 animate-pulse rounded-full bg-emerald-400/20 ring-1 ring-emerald-400/50" />
        <p className="text-sm font-medium tracking-widest text-zinc-500 uppercase">
          Initializing Systems
        </p>
      </div>
    </div>
  );
}
