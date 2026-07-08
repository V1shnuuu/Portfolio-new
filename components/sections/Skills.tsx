'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowCard } from '@/components/ui/GlowCard';
import { skills, skillCategories, marqueeSkills } from '@/data/skills';
import { cn } from '@/lib/utils';
import { fadeUp, staggerContainer } from '@/animations/variants';

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('Frontend');

  // Filter skills based on tab selection
  const filteredSkills = skills.filter((skill) => skill.category === activeCategory);

  // Pick top 9 skills across all categories dynamically for featured layout
  const featuredSkills = [...skills]
    .sort((a, b) => b.level - a.level)
    .slice(0, 9);

  return (
    <section id="skills" className="py-20 md:py-32 relative px-6 bg-surface">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Section Heading */}
        <SectionHeading
          number="02"
          title="Skills & Expertise"
          subtitle="My technical stack ranges across interactive frontend engineering, deep learning training models, design tools, and network protocols."
        />

        {/* 1. Header Marquee Ticker (Right to Left / Opposite direction) */}
        <div className="w-full overflow-hidden border-y border-text-primary/5 py-5 mb-16 select-none bg-background/30 pointer-events-none">
          <Marquee 
            speed={40} 
            direction="right"
            gradient={false}
            className="font-mono text-base uppercase tracking-widest text-text-primary/20"
          >
            {marqueeSkills.map((skill, idx) => (
              <span key={`ticker-2-${skill}-${idx}`} className="inline-flex items-center">
                <span className="mx-6">{skill}</span>
                <span className="text-accent-indigo">◆</span>
              </span>
            ))}
          </Marquee>
        </div>

        {/* ========================================================================= */}
        {/* PART A: Interactive Skill Bars by Category                                */}
        {/* ========================================================================= */}
        <div className="w-full max-w-4xl mx-auto mb-24">
          <h3 className="font-display text-2xl font-bold text-text-primary mb-6 text-center md:text-left">
            Core Competencies
          </h3>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-10">
            {skillCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'px-4 py-2 rounded-full font-body text-xs font-semibold uppercase tracking-wider transition-all duration-300 border focus:outline-none cursor-pointer',
                  activeCategory === category
                    ? 'bg-accent-violet text-text-primary border-accent-violet shadow-[0_0_15px_rgba(139,92,246,0.25)]'
                    : 'bg-background text-text-muted border-text-primary/5 hover:text-text-primary hover:border-text-primary/10'
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Skill Bars list */}
          <div className="flex flex-col gap-6 bg-background/50 border border-text-primary/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm min-h-[300px]">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <m.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-2"
                >
                  {/* Skill Name */}
                  <span className="font-display text-sm font-semibold text-text-primary min-w-[150px]">
                    {skill.name}
                  </span>

                  {/* Progress slide wrapper */}
                  <div className="flex-grow flex items-center gap-4">
                    <div className="flex-grow h-1 bg-neutral-900 rounded-full overflow-hidden relative">
                      <m.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent-violet to-accent-indigo rounded-full"
                      />
                    </div>
                    
                    {/* Level */}
                    <span className="font-mono text-xs text-text-muted min-w-[30px] text-right">
                      {skill.level}%
                    </span>
                  </div>
                </m.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PART B: Featured Skill Grid with Custom SVG Circular Rings                */}
        {/* ========================================================================= */}
        <div className="w-full">
          <h3 className="font-display text-2xl font-bold text-text-primary mb-8 text-center">
            Top Specialties
          </h3>

          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredSkills.map((skill) => {
              const radius = 12;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = circumference - (skill.level / 100) * circumference;

              return (
                <m.div
                  key={`feat-${skill.name}`}
                  variants={fadeUp}
                  className="w-full"
                >
                  <GlowCard 
                    className="p-5 flex items-center justify-between bg-surface border border-text-primary/5 hover:border-accent-violet/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-500 rounded-xl"
                    glowColor="rgba(139, 92, 246, 0.08)"
                  >
                    <div>
                      <h4 className="font-display text-base font-bold text-text-primary tracking-wide">
                        {skill.name}
                      </h4>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-text-faint block mt-1">
                        {skill.category}
                      </span>
                    </div>

                    {/* Circular progress meter */}
                    <div className="relative w-8 h-8 flex items-center justify-center select-none pointer-events-none">
                      <svg className="w-8 h-8 transform -rotate-90">
                        {/* Background Ring */}
                        <circle
                          cx="16"
                          cy="16"
                          r={radius}
                          className="stroke-neutral-850"
                          strokeWidth="2.5"
                          fill="transparent"
                        />
                        {/* Main Colored Meter */}
                        <circle
                          cx="16"
                          cy="16"
                          r={radius}
                          className="stroke-accent-violet"
                          strokeWidth="2.5"
                          fill="transparent"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                        />
                      </svg>
                      {/* Central core dot */}
                      <span className="absolute w-1.5 h-1.5 rounded-full bg-accent-violet" />
                    </div>
                  </GlowCard>
                </m.div>
              );
            })}
          </m.div>
        </div>

      </div>
    </section>
  );
}

export default Skills;
