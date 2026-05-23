'use client';

import React from 'react';
import { useLenis } from '@/animations/useLenis';

// Section components
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Services } from '@/components/sections/Services';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  // Initialize Lenis smooth scroll globally on mount
  useLenis();

  return (
    <main>
      
      {/* 1. Hero / Home section */}
      <Hero />
      
      {/* Divider */}
      <div className="h-[1px] bg-white/5 mx-auto max-w-6xl" />

      {/* 2. About biography section */}
      <About />

      {/* Divider */}
      <div className="h-[1px] bg-white/5 mx-auto max-w-6xl" />

      {/* 3. Skills dashboard section */}
      <Skills />

      {/* Divider */}
      <div className="h-[1px] bg-white/5 mx-auto max-w-6xl" />

      {/* 4. Projects portfolio section */}
      <Projects />

      {/* Divider */}
      <div className="h-[1px] bg-white/5 mx-auto max-w-6xl" />

      {/* 5. Experience timeline section */}
      <Experience />

      {/* Divider */}
      <div className="h-[1px] bg-white/5 mx-auto max-w-6xl" />

      {/* 6. Services offerings section */}
      <Services />

      {/* Divider */}
      <div className="h-[1px] bg-white/5 mx-auto max-w-6xl" />

      {/* 7. Testimonials references section */}
      <Testimonials />

      {/* Divider */}
      <div className="h-[1px] bg-white/5 mx-auto max-w-6xl" />

      {/* 8. Contact form section */}
      <Contact />

    </main>
  );
}
