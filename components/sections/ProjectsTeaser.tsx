'use client';

import React, { useState } from 'react';
import { m } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';
import { Project } from '@/types';
import { GlowCard } from '@/components/ui/GlowCard';
import { ProjectModal } from '@/components/ui/ProjectModal';
import { staggerContainer } from '@/animations/variants';

export function ProjectsTeaser() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  const getCategoryColor = (category: string) => {
    const map: Record<string, string> = {
      'Machine Learning': 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10',
      'Computer Vision': 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10',
      'Full Stack': 'text-accent-violet border-accent-violet/30 bg-accent-violet/10',
    };
    return map[category] || 'text-text-muted border-white/10 bg-white/5';
  };

  return (
    <>
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <section id="projects" className="py-20 md:py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="font-mono text-xs text-accent-violet uppercase tracking-widest">03 /</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-1">Selected Work</h2>
              <p className="font-body text-text-muted mt-2">Real products. Real impact. Built with intention.</p>
            </div>
            <Link
              href="/projects"
              className="hidden md:inline-flex items-center gap-2 font-mono text-xs font-semibold text-text-muted hover:text-white transition-colors uppercase tracking-wider group"
            >
              View All Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 3-column card grid */}
          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {featuredProjects.map((project, idx) => (
              <m.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { delay: idx * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="h-full"
              >
                <GlowCard
                  onClick={() => setSelectedProject(project)}
                  className="h-full flex flex-col gap-4 p-6 bg-surface border border-white/5 hover:border-accent-violet/30 rounded-2xl transition-colors duration-300 cursor-pointer group"
                  glowColor="rgba(139,92,246,0.1)"
                >
                  {/* Image area */}
                  <div className="w-full aspect-video rounded-xl bg-surface-elevated flex items-center justify-center relative overflow-hidden group/img">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                        className="object-cover transition-transform duration-700 group-hover/img:scale-105"
                      />
                    ) : (
                      <span className="font-mono text-5xl font-bold text-white/5">
                        {project.category.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/5 to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3 z-10">
                      <span className={`font-mono text-[9px] uppercase tracking-wider border px-2.5 py-1 rounded-full font-semibold ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-accent-violet transition-colors">
                    {project.shortTitle}
                  </h3>
                  <p className="font-body text-sm text-text-muted leading-relaxed line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map(t => (
                      <span key={t} className="font-mono text-[8px] uppercase tracking-wider text-text-faint bg-background px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="font-mono text-xs text-accent-violet">View Details →</span>
                    <div className="flex items-center gap-3">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-text-faint hover:text-white transition-colors" aria-label="GitHub">
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </GlowCard>
              </m.div>
            ))}
          </m.div>

          {/* Mobile CTA */}
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider hover:border-white/30 transition-all"
            >
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}

export default ProjectsTeaser;
