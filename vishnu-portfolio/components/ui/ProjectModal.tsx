'use client';

import React from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Play } from 'lucide-react';
import { Project } from '@/types';
import { CountUp } from '@/components/ui/CountUp';
import { cn } from '@/lib/utils';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Close on Escape key
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] modal-backdrop"
            onClick={handleBackdropClick}
          />

          {/* Modal Panel */}
          <m.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-[201] bg-surface border border-white/10 rounded-2xl overflow-y-auto shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hero Image / Placeholder */}
            <div className="relative w-full aspect-video bg-surface-elevated flex items-center justify-center overflow-hidden rounded-t-2xl">
              <span className="font-mono text-[8rem] md:text-[12rem] font-bold text-white/5 select-none">
                {project.category.slice(0, 2).toUpperCase()}
              </span>
              {/* Category pill */}
              <div className="absolute top-4 left-4">
                <span className="font-mono text-[10px] text-accent-cyan font-semibold uppercase tracking-wider bg-accent-cyan/10 border border-accent-cyan/30 px-3 py-1 rounded-full">
                  {project.category}
                </span>
              </div>
              {/* Year badge */}
              <div className="absolute top-4 right-12">
                <span className="font-mono text-[10px] text-text-faint border border-white/5 px-3 py-1 rounded-full">
                  {project.year}
                </span>
              </div>
              {/* Video play button if videoUrl exists */}
              {project.videoUrl && (
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="w-16 h-16 rounded-full bg-accent-violet/80 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform shadow-glow-violet">
                    <Play className="w-7 h-7 text-white ml-1" />
                  </div>
                </a>
              )}
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left: Main content */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  <div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                      {project.shortTitle}
                    </h2>
                    <p className="font-body text-base text-text-muted leading-relaxed">
                      {project.longDescription}
                    </p>
                  </div>

                  {/* Tech stack */}
                  <div>
                    <h4 className="font-mono text-xs text-text-faint uppercase tracking-widest mb-3">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] text-text-muted bg-background border border-white/10 rounded-full px-3 py-1"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:border-accent-violet/50 text-text-muted hover:text-white font-mono text-xs font-semibold transition-all duration-300"
                      >
                        <Github className="w-4 h-4" />
                        View Code
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-accent-violet to-accent-indigo text-white font-mono text-xs font-semibold hover:brightness-110 transition-all duration-300 shadow-glow-violet"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                    {project.hasCaseStudy && (
                      <a
                        href={`/case-studies/${project.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan font-mono text-xs font-semibold hover:bg-accent-cyan/20 transition-all duration-300"
                      >
                        Read Case Study →
                      </a>
                    )}
                  </div>
                </div>

                {/* Right: Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <h4 className="font-mono text-xs text-text-faint uppercase tracking-widest">
                      Project Metrics
                    </h4>
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                      {project.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="bg-background border border-white/5 rounded-xl p-4"
                        >
                          <div className="font-display text-2xl font-bold text-white">
                            <CountUp
                              value={parseFloat(metric.value.replace(/[^0-9.]/g, '')) || 0}
                              suffix={metric.suffix}
                              prefix={metric.value.startsWith('<') ? '<' : ''}
                            />
                          </div>
                          <div className="font-mono text-[10px] text-text-faint uppercase tracking-wider mt-1">
                            {metric.label}
                          </div>
                          {metric.description && (
                            <div className="font-body text-xs text-text-faint/70 mt-1">
                              {metric.description}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ProjectModal;
