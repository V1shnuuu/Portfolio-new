'use client';

import React from 'react';
import { m } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowCard } from '@/components/ui/GlowCard';
import { slideInLeft, slideInRight } from '@/animations/variants';

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 relative px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <SectionHeading
          number="01"
          title="About Me"
          subtitle="A peek into my background, core development philosophies, and academic context."
        />

        {/* Editorial Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Narrative & Statistics (Slides in from Left)                */}
          {/* ========================================================================= */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={slideInLeft}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Pull Quote */}
            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
              I build things that think, look good, and work flawlessly.
            </h3>

            {/* Narrative paragraphs */}
            <p className="font-body text-sm md:text-base text-text-muted leading-relaxed">
              I'm Vishnu Priyan — a Computer Science student at Chennai Institute of Technology with an obsession for systems that bridge intelligence and design. Whether I'm training a neural network for clinical predictions, designing a component library in Figma, or building full-stack applications, I bring the same standard: thoughtful, precise, and impactful work.
            </p>

            <p className="font-body text-sm md:text-base text-text-muted leading-relaxed">
              My work spans machine learning, frontend engineering, and UI/UX — not because I couldn't choose, but because the most interesting problems sit at the intersection of all three. I've shipped real products, reached hackathon finals, and interned in both software and design — all before completing my second year of engineering.
            </p>

            {/* Stats list */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/5">
              <div className="flex flex-col">
                <span className="font-display text-3xl md:text-4xl font-bold text-accent-violet">3+</span>
                <span className="font-body text-[11px] uppercase tracking-wider text-text-faint mt-1">
                  Projects Shipped
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-3xl md:text-4xl font-bold text-accent-indigo">2x</span>
                <span className="font-body text-[11px] uppercase tracking-wider text-text-faint mt-1">
                  Hackathon Finalist
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-3xl md:text-4xl font-bold text-white">2</span>
                <span className="font-body text-[11px] uppercase tracking-wider text-text-faint mt-1">
                  Industry Internships
                </span>
              </div>
            </div>
          </m.div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Interactive Code Aesthetic Card (Slides in from Right)     */}
          {/* ========================================================================= */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={slideInRight}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* JSON Code Card */}
            <GlowCard 
              className="bg-surface-elevated border border-white/10 hover:border-accent-violet/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-500 rounded-2xl p-6 md:p-8"
              glowColor="rgba(139, 92, 246, 0.08)"
            >
              <pre className="font-mono text-xs md:text-sm leading-relaxed overflow-x-auto text-left select-all">
                <code>
                  <span className="text-white">{`{`}</span>
                  {'\n  '}
                  <span className="text-accent-violet">"name"</span>
                  <span className="text-white">{`: `}</span>
                  <span className="text-green-400">"B Vishnu Priyan"</span>
                  <span className="text-white">{`,`}</span>
                  {'\n  '}
                  <span className="text-accent-violet">"role"</span>
                  <span className="text-white">{`: `}</span>
                  <span className="text-white">{`[`}</span>
                  <span className="text-amber-400">"Developer"</span>
                  <span className="text-white">{`, `}</span>
                  <span className="text-amber-400">"Designer"</span>
                  <span className="text-white">{`, `}</span>
                  <span className="text-amber-400">"ML Engineer"</span>
                  <span className="text-white">{`],`}</span>
                  {'\n  '}
                  <span className="text-accent-violet">"location"</span>
                  <span className="text-white">{`: `}</span>
                  <span className="text-green-400">"Chennai, India"</span>
                  <span className="text-white">{`,`}</span>
                  {'\n  '}
                  <span className="text-accent-violet">"education"</span>
                  <span className="text-white">{`: `}</span>
                  <span className="text-green-400">"CIT — CSE 2024–2028"</span>
                  <span className="text-white">{`,`}</span>
                  {'\n  '}
                  <span className="text-accent-violet">"passion"</span>
                  <span className="text-white">{`: `}</span>
                  <span className="text-green-400">"Intelligence × Design"</span>
                  <span className="text-white">{`,`}</span>
                  {'\n  '}
                  <span className="text-accent-violet">"status"</span>
                  <span className="text-white">{`: `}</span>
                  <span className="text-green-400">"Available for opportunities"</span>
                  {'\n'}
                  <span className="text-white">{`}`}</span>
                </code>
              </pre>
            </GlowCard>

            {/* Quick Badges below JSON card */}
            <div className="flex flex-wrap gap-2.5">
              {['React', 'Python', 'TensorFlow', 'Figma'].map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs text-text-muted bg-surface border border-white/10 px-4 py-2 rounded-full hover:border-accent-violet/30 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </m.div>

        </div>
      </div>
    </section>
  );
}

export default About;
