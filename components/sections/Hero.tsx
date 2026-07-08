'use client';

import React, { useRef } from 'react';
import { m } from 'framer-motion';

import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { OWNER_NAME, SOCIAL_LINKS } from '@/lib/constants';
import { marqueeSkills } from '@/data/skills';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { fadeIn, staggerContainer } from '@/animations/variants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { splitTextToSpans } from '@/lib/utils';

export function Hero() {
  const creativeText = "Creative";
  const developerText = "Developer.";
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate the name characters first
    gsap.from('.hero-name-char', {
      y: 40,
      opacity: 0,
      stagger: 0.03,
      duration: 0.8,
      ease: 'power4.out',
    });

    // Animate the main headline characters with a slight delay
    gsap.from('.hero-char', {
      y: 100,
      opacity: 0,
      stagger: 0.02,
      duration: 0.8,
      ease: 'power4.out',
      delay: 0.15,
    });
  }, { scope: containerRef });



  return (
    <section ref={containerRef} id="home" className="relative min-h-[100svh] flex flex-col justify-between items-center overflow-hidden px-6 pt-32 pb-12">

      
      {/* ========================================================================= */}
      {/* BACKGROUND LAYERS (z-0)                                                   */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Layer 1: Solid bg-background is handled globally by body class */}
        
        {/* Layer 2: Centered-left large radial violet glow (20% opacity) */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
            left: '15%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Layer 3: Centered-right smaller indigo glow (10% opacity) */}
        <div 
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
            right: '15%',
            top: '40%',
            transform: 'translate(50%, -50%)',
          }}
        />

        {/* Layer 4: Subtle white tech grid overlay (3% opacity, 40px grid spacing) */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* CONTENT WIDGETS (z-10)                                                    */}
      {/* ========================================================================= */}
      <div className="flex-grow flex flex-col items-center justify-center text-center max-w-5xl z-10 w-full">
        
        {/* 1. Eyebrow Badge */}
        <m.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-accent-violet/30 bg-accent-violet/10 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-violet animate-ping" />
            <span className="font-mono text-xs text-accent-violet font-semibold tracking-wider uppercase">
              Available for Internships & Collaborations
            </span>
          </div>
        </m.div>

        {/* Owner's Name reveal */}
        <div className="overflow-hidden flex mb-4">
          {splitTextToSpans(OWNER_NAME.toUpperCase(), "hero-name-char font-mono text-sm tracking-[0.25em] text-accent-violet font-bold")}
        </div>

        {/* 2. Main Title - Character-by-character reveals using GSAP */}
        <h1 
          className="font-display font-bold tracking-tight text-text-primary mb-6 select-text flex flex-col items-center"
          style={{ fontSize: 'clamp(72px, 10vw, 140px)', lineHeight: '0.95' }}
        >
          {/* Creative Row */}
          <div className="overflow-hidden flex">
            {splitTextToSpans(creativeText, "hero-char")}
          </div>

          {/* Developer. Row */}
          <div className="overflow-hidden flex">
            {splitTextToSpans(developerText, "hero-char bg-gradient-to-r from-accent-violet to-accent-indigo bg-clip-text text-transparent")}
          </div>
        </h1>


        {/* 3. Subheadline */}
        <m.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-body font-medium tracking-wide text-text-muted text-base md:text-xl lg:text-2xl mb-4"
        >
          ML Engineer &bull; UI/UX Designer &bull; Full Stack Builder
        </m.p>

        {/* 4. Bio */}
        <m.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-body text-sm md:text-base text-text-muted/80 max-w-lg mb-10 leading-relaxed"
        >
          Building intelligent systems and premium digital experiences from Chennai, India.
        </m.p>

        {/* 5. Call To Action Buttons */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          <MagneticButton>
            <Link href="#projects">
              <Button variant="glow" size="lg" className="rounded-full px-8 py-4 text-text-primary uppercase tracking-wider font-semibold text-xs">
                View My Work
              </Button>
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link href="#contact">
              <Button variant="outline" size="lg" className="rounded-full px-8 py-4 text-text-primary border-text-primary/20 uppercase tracking-wider font-semibold text-xs">
                Get In Touch
              </Button>
            </Link>
          </MagneticButton>
        </m.div>

        {/* 6. Social Icon Row */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex items-center gap-6"
        >
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent-violet transition-colors duration-300 transform hover:scale-105"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent-violet transition-colors duration-300 transform hover:scale-105"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={SOCIAL_LINKS.email}
            className="text-text-muted hover:text-accent-violet transition-colors duration-300 transform hover:scale-105"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </m.div>

      </div>

      {/* ========================================================================= */}
      {/* BOTTOM LAYOUT WIDGETS                                                     */}
      {/* ========================================================================= */}
      <div className="w-full flex flex-col items-center gap-4 relative z-10 select-none pointer-events-none mt-auto">
        {/* Scroll down indicator icon */}
        <div className="animate-bounce">
          <ChevronDown className="w-5 h-5 text-text-primary/60" />
        </div>

        {/* Fast Marquee Ticker */}
        <div className="w-full overflow-hidden border-y border-text-primary/5 py-4 pointer-events-auto bg-background/50 backdrop-blur-sm">
          <Marquee 
            speed={40} 
            gradient={false}
            className="font-mono text-xs uppercase tracking-widest text-text-faint"
          >
            {marqueeSkills.map((skill, idx) => (
              <span key={`${skill}-${idx}`} className="inline-flex items-center">
                <span className="mx-6 text-text-primary/80">{skill}</span>
                <span className="text-accent-violet">◆</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>

    </section>
  );
}

export default Hero;
