'use client';

import React from 'react';
import { useLenis } from '@/animations/useLenis';

// Section components
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { ProjectsTeaser } from '@/components/sections/ProjectsTeaser';
import { Experience } from '@/components/sections/Experience';
import { StatsSection } from '@/components/sections/StatsSection';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';

const Divider = () => <div className="h-[1px] bg-white/5 mx-auto max-w-6xl" />;

export default function Home() {
  // Initialize Lenis smooth scroll globally on mount
  useLenis();

  return (
    <main>
      {/* 1. Hero / Home section */}
      <Hero />

      <Divider />

      {/* 2. About biography section */}
      <About />

      <Divider />

      {/* 3. Skills dashboard section */}
      <Skills />

      <Divider />

      {/* 4. Projects teaser — 3 featured cards → /projects */}
      <ProjectsTeaser />

      <Divider />

      {/* 5. Experience timeline section */}
      <Experience />

      <Divider />

      {/* 6. Animated stats strip */}
      <StatsSection />

      <Divider />

      {/* 7. Testimonials references section */}
      <Testimonials />

      <Divider />

      {/* 8. Contact form section */}
      <Contact />
    </main>
  );
}
