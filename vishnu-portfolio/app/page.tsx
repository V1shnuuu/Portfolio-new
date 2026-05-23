'use client';

import React, { useState } from 'react';
import { useLenis } from '@/animations/useLenis';
import { Preloader } from '@/components/layout/Preloader';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Sections
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Services } from '@/components/sections/Services';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <>
      {/* 1. Loader screen */}
      <Preloader onComplete={() => setIsLoading(false)} />

      {/* 2. Page layout components */}
      {!isLoading && (
        <div className="relative min-h-screen flex flex-col overflow-hidden">
          {/* Custom Cursor follower */}
          <CustomCursor />

          {/* Scroll progress bar indicator */}
          <ScrollProgress />

          {/* Header navigation bar */}
          <Navbar />

          {/* Page main content grid */}
          <main className="flex-grow">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Services />
            <Testimonials />
            <Contact />
          </main>

          {/* Site footer summary */}
          <Footer />
        </div>
      )}
    </>
  );
}
