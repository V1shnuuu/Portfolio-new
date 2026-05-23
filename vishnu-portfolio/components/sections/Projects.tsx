'use client';

import React from 'react';
import { m } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowCard } from '@/components/ui/GlowCard';
import { projects } from '@/data/projects';
import { ExternalLink, Github } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/animations/variants';

export function Projects() {
  // Separate projects into featured and more projects
  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  // Helper to map categories to short text signatures
  const getCategorySignature = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'machine learning':
        return 'ML';
      case 'computer vision':
        return 'CV';
      case 'full stack':
        return 'FS';
      case 'blockchain':
        return 'BC';
      case 'ui/ux design':
        return 'UX';
      default:
        return 'DEV';
    }
  };

  return (
    <section id="projects" className="py-20 md:py-32 relative px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <SectionHeading
          number="03"
          title="Selected Work"
          subtitle="Real products. Real impact. Built with intention."
        />

        {/* ========================================================================= */}
        {/* PART A: Alternating Featured Projects                                      */}
        {/* ========================================================================= */}
        <div className="flex flex-col gap-24 md:gap-32 mb-28">
          {featuredProjects.map((project, idx) => {
            const isOdd = idx % 2 === 0; // Alternating layout flag
            const projectNumber = `0${idx + 1}`;
            const categorySig = getCategorySignature(project.category);

            return (
              <m.div
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="flex flex-col lg:flex-row items-center gap-10 md:gap-16"
              >
                
                {/* 1. Image Area (55% on desktop, stacked on mobile) */}
                <m.div
                  variants={{
                    hidden: { x: isOdd ? -80 : 80, opacity: 0 },
                    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="w-full lg:w-[55%] flex-shrink-0 order-1 lg:order-none"
                >
                  <GlowCard 
                    className="relative w-full aspect-video bg-surface-elevated rounded-2xl border border-white/10 hover:border-accent-violet/40 hover:scale-[1.02] transition-all duration-500 overflow-hidden group flex items-center justify-center p-0 cursor-pointer"
                    glowColor="rgba(139, 92, 246, 0.12)"
                  >
                    {/* IMAGE_PLACEHOLDER: When real images are added, they should use next/image with priority for above-fold images. */}
                    
                    {/* Big Category Text Indicator */}
                    <span className="font-mono text-8xl md:text-9xl font-bold tracking-tighter text-text-faint/15 select-none transition-colors duration-500 group-hover:text-text-faint/25">
                      {categorySig}
                    </span>

                    {/* Category Pill Tag */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="font-mono text-[10px] text-accent-violet font-semibold uppercase tracking-wider bg-accent-violet/20 border border-accent-violet/30 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>

                    {/* Mesh Gradient hover effects */}
                    <div className="absolute inset-0 bg-hero-gradient opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none" />
                  </GlowCard>
                </m.div>

                {/* 2. Content Area (45% on desktop, stacked on mobile) */}
                <m.div
                  variants={{
                    hidden: { x: isOdd ? 80 : -80, opacity: 0 },
                    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="w-full lg:w-[45%] flex flex-col gap-5 relative text-left"
                >
                  {/* Large background serial number */}
                  <span className="absolute -top-16 -left-4 font-display text-[120px] md:text-[180px] font-bold text-white/5 select-none pointer-events-none leading-none">
                    {projectNumber}
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-white relative z-10">
                    {project.title.split(' — ')[1] || project.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-base text-text-muted leading-relaxed relative z-10 max-w-md">
                    {project.longDescription || project.description}
                  </p>

                  {/* Technical details pills */}
                  <div className="flex flex-wrap gap-2 relative z-10 mt-1">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] text-text-muted bg-surface border border-white/10 rounded-full px-3 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA link row */}
                  <div className="flex items-center gap-6 mt-4 relative z-10 pt-4 border-t border-white/5">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-text-muted hover:text-white transition-colors duration-300"
                      >
                        <Github className="w-4 h-4" />
                        GitHub Repository
                      </a>
                    )}

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-accent-violet hover:text-white transition-colors duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                  </div>

                </m.div>

              </m.div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* PART B: Other Projects Grid                                               */}
        {/* ========================================================================= */}
        <div className="w-full border-t border-white/5 pt-20">
          <h3 className="font-mono text-xl font-bold text-text-muted tracking-wider uppercase mb-10 text-center md:text-left">
            More Projects
          </h3>

          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {otherProjects.map((project, idx) => {
              const projectNumber = `0${idx + featuredProjects.length + 1}`;
              
              return (
                <m.div
                  key={project.id}
                  variants={fadeUp}
                  className="w-full h-full"
                >
                  <GlowCard 
                    className="h-full flex flex-col justify-between p-6 bg-surface border border-white/5 hover:border-accent-violet/40 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-500 rounded-2xl group cursor-pointer"
                    glowColor="rgba(139, 92, 246, 0.08)"
                  >
                    
                    <div>
                      {/* Header Row: Category Badge & Project Number */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-mono text-[9px] text-text-muted bg-background border border-white/5 px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {project.category}
                        </span>
                        <span className="font-display text-base font-bold text-text-faint/45">
                          {projectNumber}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="font-display text-xl font-bold text-white mb-3 group-hover:text-accent-violet transition-colors">
                        {project.title.split(' — ')[0]}
                      </h4>

                      {/* Description */}
                      <p className="font-body text-sm text-text-muted leading-relaxed line-clamp-2 mb-6">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Technical Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6 overflow-hidden max-h-8">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[8px] uppercase tracking-wider text-text-faint bg-background px-2 py-0.5 rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Footer Row: Actions */}
                      <div className="flex items-center gap-2 pt-4 border-t border-white/5 text-xs font-mono font-semibold text-text-muted group-hover:text-white transition-colors duration-300">
                        <Github className="w-3.5 h-3.5" />
                        <span>View Project</span>
                      </div>
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

export default Projects;
