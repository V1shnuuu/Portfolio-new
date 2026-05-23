'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowCard } from '@/components/ui/GlowCard';
import { Button } from '@/components/ui/Button';
import { projects } from '@/data/projects';
import { ExternalLink, Github } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/animations/variants';

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28 relative px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Portfolio"
          title="Featured Projects"
          subtitle="A selection of machine learning applications, visual interfaces, and custom design libraries."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px 0px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              className="group h-full"
            >
              <GlowCard className="h-full flex flex-col justify-between p-6 md:p-8 bg-surface">
                
                {/* Visual Header / Mock Image Canvas */}
                <div className="relative w-full h-48 rounded-xl bg-background border border-neutral-800 overflow-hidden mb-6 flex flex-col justify-between p-6">
                  
                  {/* Decorative mesh gradient instead of direct images to ensure high fidelity fallback */}
                  <div className="absolute inset-0 bg-hero-gradient opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="flex items-center justify-between z-10">
                    <span className="font-mono text-[10px] text-text-faint uppercase tracking-wider bg-surface border border-neutral-800 px-2 py-0.5 rounded">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="font-mono text-[10px] text-accent-violet uppercase tracking-wider bg-accent-violet/10 border border-accent-violet/20 px-2 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="z-10">
                    <h4 className="font-display text-2xl font-bold text-white group-hover:text-accent-violet transition-colors">
                      {project.title.split(' — ')[0]}
                    </h4>
                  </div>
                </div>

                {/* Info Content */}
                <div className="flex-grow">
                  <p className="font-body text-sm text-text-muted mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technical tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] text-text-muted bg-background border border-neutral-800 px-2.5 py-1 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* External links and buttons */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-neutral-800/40">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-text-primary transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Repository
                    </a>
                  )}

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-violet hover:text-white transition-colors ml-auto"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </a>
                  )}
                </div>

              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
