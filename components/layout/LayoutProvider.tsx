'use client';

import React, { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import dynamic from 'next/dynamic';

// Dynamic imports for client-side only components to optimize performance
const Preloader = dynamic(
  () => import('@/components/layout/Preloader').then((mod) => mod.Preloader),
  { ssr: false, loading: () => <div className="fixed inset-0 z-[9999] bg-[#0a0a0a]" /> }
);

const CustomCursor = dynamic(
  () => import('@/components/layout/CustomCursor').then((mod) => mod.CustomCursor),
  { ssr: false }
);

interface LayoutProviderProps {
  children: React.ReactNode;
}

export function LayoutProvider({ children }: LayoutProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return background placeholder to prevent flash of content during server rendering
    return <div className="min-h-screen bg-[#0a0a0a]" />;
  }

  return (
    <>
      {/* Cinematic preloader plays once on mount */}
      <Preloader onComplete={() => setIsLoading(false)} />

      {/* Renders main viewport layout only after preloader completes with a smooth fade in */}
      {!isLoading && (
        <m.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative min-h-screen flex flex-col overflow-x-hidden"
        >
          {/* Custom Cursor follower */}
          <CustomCursor />

          {/* Scroll progress indicator line */}
          <ScrollProgress />

          {/* Global navbar header */}
          <Navbar />

          {/* Page content wrapper */}
          <main className="flex-grow relative z-10 w-full">
            {children}
          </main>

          {/* Global footer */}
          <Footer />
        </m.div>
      )}
    </>
  );
}

export default LayoutProvider;

