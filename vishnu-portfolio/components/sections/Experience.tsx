'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowCard } from '@/components/ui/GlowCard';
import { experience } from '@/data/experience';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/animations/variants';

export function Experience() {
  const getIcon = (type: 'work' | 'education' | 'achievement') => {
    switch (type) {
      case 'education':
        return GraduationCap;
      case 'achievement':
        return Award;
      default:
        return Briefcase;
    }
  };

  return (
    <section id="experience" className="py-20 md:py-28 relative px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          badge="Timeline"
          title="Education & Experience"
          subtitle="A chronological journey of my academic progress, achievements, and technical contributions."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px 0px' }}
          className="relative border-l border-neutral-800 ml-4 md:ml-6 flex flex-col gap-12"
        >
          {experience.map((item, idx) => {
            const Icon = getIcon(item.type);
            
            return (
              <motion.div
                key={item.id}
                variants={fadeUp}
                className="relative pl-8 md:pl-10 group"
              >
                {/* Timeline node icon indicator */}
                <span className="absolute -left-[17px] top-1 p-2 rounded-full bg-background border border-neutral-800 text-accent-violet group-hover:border-accent-violet group-hover:bg-accent-violet group-hover:text-white transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </span>

                <GlowCard className="bg-background border border-neutral-850 p-6 md:p-8">
                  {/* Item Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <h4 className="font-display text-lg md:text-xl font-bold text-white">
                        {item.role}
                      </h4>
                      <p className="font-body text-sm text-accent-indigo font-medium">
                        {item.company}
                      </p>
                    </div>

                    <span className="inline-flex self-start md:self-center px-3 py-1 bg-neutral-900 border border-neutral-800/80 rounded-full font-mono text-[10px] text-text-muted">
                      {item.period}
                    </span>
                  </div>

                  {/* Bullet description points */}
                  <ul className="flex flex-col gap-2.5">
                    {item.description.map((bullet, bulletIdx) => (
                      <li
                        key={bulletIdx}
                        className="font-body text-sm text-text-muted leading-relaxed list-disc list-inside marker:text-accent-violet"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Experience;
