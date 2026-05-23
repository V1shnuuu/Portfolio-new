'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ArrowDown, Cpu, Palette, Code } from 'lucide-react';
import { OWNER_NAME, SOCIAL_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { staggerContainer, fadeUp, fadeIn } from '@/animations/variants';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden px-6">
      
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-violet-glow pointer-events-none z-0" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column - Hero Content */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start gap-6 text-left"
        >
          {/* Subtitle Badge */}
          <motion.div 
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full font-mono text-xs text-accent-violet tracking-wide uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-accent-violet animate-pulse" />
            Computer Science Engineering Student @ CIT
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={fadeUp}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05]"
          >
            Creative <span className="text-gradient">Developer</span> & ML Engineer.
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={fadeUp}
            className="font-body text-base md:text-lg text-text-muted max-w-xl leading-relaxed"
          >
            Hi, I'm <strong className="text-white font-medium">{OWNER_NAME}</strong>. I design premium user experiences, engineer high-performance web applications, and develop intelligent machine learning systems.
          </motion.p>

          {/* Buttons and Social Links */}
          <motion.div 
            variants={fadeUp}
            className="flex flex-wrap items-center gap-4 mt-4"
          >
            <MagneticButton>
              <Link href="#projects">
                <Button variant="glow" size="lg">
                  View my work
                  <ArrowDown className="w-4 h-4 ml-1 animate-bounce" />
                </Button>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link href="#contact">
                <Button variant="outline" size="lg">
                  Get in touch
                </Button>
              </Link>
            </MagneticButton>

            {/* Social Icons */}
            <div className="flex items-center gap-3 ml-2">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-neutral-800 hover:border-accent-violet text-text-muted hover:text-white transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-neutral-800 hover:border-accent-violet text-text-muted hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Decorative Card Element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="lg:col-span-5 hidden lg:flex items-center justify-center relative"
        >
          {/* Main Visual Card */}
          <div className="relative w-80 h-[420px] rounded-3xl bg-neutral-900 border border-neutral-800 p-8 overflow-hidden shadow-2xl flex flex-col justify-between group">
            {/* Corner glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-violet/20 rounded-full blur-2xl group-hover:bg-accent-violet/30 transition-colors duration-500" />
            
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-text-faint">BVP // 2024-2028</span>
              <Cpu className="w-6 h-6 text-accent-violet animate-pulse" />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <span className="p-2 rounded-xl bg-background border border-neutral-800 text-accent-violet">
                  <Code className="w-5 h-5" />
                </span>
                <span className="p-2 rounded-xl bg-background border border-neutral-800 text-accent-indigo">
                  <Palette className="w-5 h-5" />
                </span>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white leading-tight">
                  Design meets Intelligent Logic.
                </h3>
                <p className="font-body text-xs text-text-muted mt-2">
                  Bridging the gap between front-end visuals and machine learning computations.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Import Link so Next.js router transitions work */}
      <div className="hidden">
        <Link href="#contact" />
        <Link href="#projects" />
      </div>
    </section>
  );
}

// Quick inline stub of Link since next/link is used in next.js
import Link from 'next/link';

export default Hero;
