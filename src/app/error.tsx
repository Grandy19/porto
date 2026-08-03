'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 bg-zinc-950 px-6 text-center">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          System Fault Detected
        </h2>
        <p className="max-w-md text-zinc-400">
          An unexpected error occurred in the application layer. Please try
          recovering the session.
        </p>
      </div>
      <Button
        onClick={() => reset()}
        variant="outline"
        className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-zinc-50"
      >
        Attempt Recovery
      </Button>
    </div>
  );
}
