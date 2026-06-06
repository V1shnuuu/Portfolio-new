import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found | Vishnu Priyan',
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 text-center flex flex-col items-center gap-6">
        {/* Big 404 */}
        <span className="font-display text-[12rem] md:text-[16rem] font-bold leading-none text-white/5 select-none">
          404
        </span>

        {/* Content overlay */}
        <div className="-mt-24 flex flex-col items-center gap-4">
          <span className="font-mono text-xs text-accent-violet uppercase tracking-widest border border-accent-violet/30 bg-accent-violet/10 px-4 py-1.5 rounded-full">
            Page Not Found
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
            Lost in the void?
          </h1>
          <p className="font-body text-base text-text-muted max-w-sm">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <Link
              href="/"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-violet to-accent-indigo text-white font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all active:scale-95"
            >
              Go Home
            </Link>
            <Link
              href="/projects"
              className="px-6 py-3 rounded-full border border-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider hover:border-white/30 transition-all"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
