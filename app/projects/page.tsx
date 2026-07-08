'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { Project, ProjectFilterValue } from '@/types';
import { FilterTabs } from '@/components/ui/FilterTabs';
import { ProjectModal } from '@/components/ui/ProjectModal';
import { GlowCard } from '@/components/ui/GlowCard';
import { PageTransition } from '@/components/ui/PageTransition';
import { PROJECT_FILTERS } from '@/lib/constants';
import { fadeUp, staggerContainer } from '@/animations/variants';
import type { Metadata } from 'next';

// ── 3D Card hover effect ──────────────────────────────────────────────────────
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 8;
    const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * 8;
    setRotate({ x: rotateX, y: rotateY });
  };

  const getCategoryColor = (category: string) => {
    const map: Record<string, string> = {
      'Machine Learning': 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10',
      'Computer Vision': 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10',
      'Full Stack': 'text-accent-violet border-accent-violet/30 bg-accent-violet/10',
      'Blockchain': 'text-accent-pink border-accent-pink/30 bg-accent-pink/10',
      'UI/UX Design': 'text-accent-indigo border-accent-indigo/30 bg-accent-indigo/10',
    };
    return map[category] || 'text-text-muted border-white/10 bg-white/5';
  };

  return (
    <div
      style={{
        perspective: '1000px',
        transform: isHovered
          ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.02)`
          : 'rotateX(0deg) rotateY(0deg) scale(1)',
        transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setRotate({ x: 0, y: 0 }); }}
      onClick={onClick}
      className="cursor-pointer h-full"
    >
      <GlowCard
        className="h-full flex flex-col gap-4 p-6 bg-surface border border-white/5 hover:border-accent-violet/30 rounded-2xl transition-colors duration-300"
        glowColor="rgba(139,92,246,0.1)"
      >
        {/* Top: Image Area */}
        <div className="w-full aspect-video rounded-xl bg-surface-elevated flex items-center justify-center relative overflow-hidden group/img">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover/img:scale-105"
            />
          ) : (
            <span className="font-mono text-5xl font-bold text-white/5">
              {project.category.slice(0, 2).toUpperCase()}
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/5 to-transparent pointer-events-none" />
          <div className="absolute top-3 left-3 z-10">
            <span className={`font-mono text-[9px] font-semibold uppercase tracking-wider border px-2.5 py-1 rounded-full ${getCategoryColor(project.category)}`}>
              {project.category}
            </span>
          </div>
          <div className="absolute top-3 right-3 z-10">
            <span className="font-mono text-[9px] text-text-faint border border-white/5 px-2 py-1 rounded-full bg-background/50 backdrop-blur-sm">
              {project.year}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="font-display text-lg font-bold text-white group-hover:text-accent-violet transition-colors">
            {project.shortTitle}
          </h3>
          <p className="font-body text-sm text-text-muted leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 3).map(t => (
            <span key={t} className="font-mono text-[8px] uppercase tracking-wider text-text-faint bg-background px-2 py-0.5 rounded">
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="font-mono text-[8px] uppercase tracking-wider text-text-faint bg-background px-2 py-0.5 rounded">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <span className="font-mono text-xs text-text-faint flex items-center gap-1.5 hover:text-white transition-colors">
            View Details <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="text-text-faint hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="text-text-faint hover:text-accent-violet transition-colors"
                aria-label="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </GlowCard>
    </div>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterValue>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.filterTags.includes(activeFilter));

  return (
    <>
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <PageTransition>
        <main className="min-h-screen pt-28 pb-20 px-6">
          <div className="max-w-7xl mx-auto">

            {/* Page Header */}
            <div className="mb-12">
              <m.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-mono text-xs text-accent-violet uppercase tracking-widest mb-3"
              >
                Portfolio
              </m.p>
              <m.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4"
              >
                All Projects
              </m.h1>
              <m.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-body text-base text-text-muted max-w-lg"
              >
                A complete collection of shipped projects — from ML systems and full-stack platforms to design systems and blockchain experiments.
              </m.p>
            </div>

            {/* Filter Bar */}
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-10"
            >
              <FilterTabs
                filters={PROJECT_FILTERS as unknown as { label: string; value: ProjectFilterValue }[]}
                active={activeFilter}
                onChange={setActiveFilter}
              />
            </m.div>

            {/* Project Grid */}
            <AnimatePresence mode="wait">
              <m.div
                key={activeFilter}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project, idx) => (
                    <m.div
                      key={project.id}
                      variants={fadeUp}
                      layout
                      className="h-full"
                    >
                      <ProjectCard
                        project={project}
                        onClick={() => setSelectedProject(project)}
                      />
                    </m.div>
                  ))
                ) : (
                  <m.div
                    variants={fadeUp}
                    className="col-span-full text-center py-24"
                  >
                    <p className="font-mono text-text-faint">No projects found in this category.</p>
                  </m.div>
                )}
              </m.div>
            </AnimatePresence>

            {/* Result count */}
            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-mono text-xs text-text-faint mt-10 text-center"
            >
              Showing {filteredProjects.length} of {projects.length} projects
            </m.p>

          </div>
        </main>
      </PageTransition>
    </>
  );
}
