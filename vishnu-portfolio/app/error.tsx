'use client';

import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,0,110,0.07) 0%, transparent 70%)' }}
      />
      <div className="relative z-10 text-center flex flex-col items-center gap-6">
        <span className="font-display text-[10rem] font-bold leading-none text-white/5 select-none">500</span>
        <div className="-mt-20 flex flex-col items-center gap-4">
          <span className="font-mono text-xs text-accent-pink uppercase tracking-widest border border-accent-pink/30 bg-accent-pink/10 px-4 py-1.5 rounded-full">
            Something went wrong
          </span>
          <h1 className="font-display text-3xl font-bold text-white">Unexpected Error</h1>
          <p className="font-body text-base text-text-muted max-w-sm">
            Something broke on our end. Don't worry — it's not you.
          </p>
          {error.digest && (
            <code className="font-mono text-[10px] text-text-faint bg-surface border border-white/5 px-3 py-1 rounded">
              Error: {error.digest}
            </code>
          )}
          <div className="flex gap-3 mt-2">
            <button
              onClick={reset}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-pink to-accent-purple text-white font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all active:scale-95"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="px-6 py-3 rounded-full border border-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider hover:border-white/30 transition-all"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
