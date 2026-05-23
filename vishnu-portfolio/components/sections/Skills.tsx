'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowCard } from '@/components/ui/GlowCard';
import { skills, skillCategories } from '@/data/skills';
import { cn } from '@/lib/utils';
import { fadeUp, staggerContainer } from '@/animations/variants';

export function Skills() {
  const categories = ['All', ...skillCategories];
  const [activeCategory, setActiveCategory] = useState('All');


  // Filter skills based on user selection
  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-20 md:py-28 relative px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Expertise"
          title="Skills & Technologies"
          subtitle="My technical stack is divided into creative interfaces, mathematical algorithms, and design architectures."
        />

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-5 py-2.5 rounded-full font-body text-xs font-medium tracking-wide uppercase transition-all duration-300 border focus:outline-none cursor-pointer',
                activeCategory === category
                  ? 'bg-accent-violet text-white border-accent-violet shadow-[0_0_15px_rgba(139,92,246,0.25)]'
                  : 'bg-background text-text-muted border-neutral-800 hover:text-text-primary hover:border-neutral-700'
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              layout
              key={skill.name}
              variants={fadeUp}
              className="w-full"
            >
              <GlowCard className="p-5 flex flex-col gap-4 bg-background">
                {/* Skill Name and Category */}
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-bold text-white tracking-wide">
                    {skill.name}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-text-faint px-2 py-0.5 bg-surface border border-neutral-800 rounded">
                    {skill.category}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: index * 0.05 }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent-violet to-accent-indigo rounded-full"
                  />
                </div>

                {/* Skill Level Percentage */}
                <div className="flex justify-end">
                  <span className="font-mono text-[10px] text-text-muted">
                    {skill.level}%
                  </span>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
