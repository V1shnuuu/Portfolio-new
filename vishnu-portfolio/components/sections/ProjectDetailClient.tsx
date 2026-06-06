'use client';

import React from 'react';
import { m } from 'framer-motion';
import Link from 'next/link';
import { Github, ExternalLink, ArrowLeft, BookOpen } from 'lucide-react';
import { Project } from '@/types';
import { CountUp } from '@/components/ui/CountUp';
import { GlowCard } from '@/components/ui/GlowCard';
import { fadeUp, staggerContainer } from '@/animations/variants';

interface ProjectDetailClientProps {
  project: Project;
  relatedProjects: Project[];
}

export function ProjectDetailClient({ project, relatedProjects }: ProjectDetailClientProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-12"
    >
      {/* Hero */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-accent-cyan uppercase tracking-widest border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1 rounded-full">
            {project.category}
          </span>
          <span className="font-mono text-[10px] text-text-faint">{project.year}</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          {project.shortTitle}
        </h1>
        <p className="font-body text-lg text-text-muted leading-relaxed max-w-2xl">
          {project.longDescription}
        </p>
      </div>

      {/* Hero image placeholder */}
      <div className="w-full aspect-video bg-surface-elevated rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden relative">
        <span className="font-mono text-[10rem] font-bold text-white/5 select-none">
          {project.category.slice(0, 2).toUpperCase()}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated/50 to-transparent" />
      </div>

      {/* Metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <div>
          <h2 className="font-mono text-xs text-text-faint uppercase tracking-widest mb-6">Project Metrics</h2>
          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {project.metrics.map((metric, idx) => (
              <m.div
                key={idx}
                variants={fadeUp}
                className="bg-surface border border-white/5 rounded-xl p-5 text-center"
              >
                <div className="font-display text-3xl font-bold text-white">
                  <CountUp
                    value={parseFloat(metric.value.replace(/[^0-9.]/g, '')) || 0}
                    suffix={metric.suffix}
                    prefix={metric.value.startsWith('<') ? '<' : ''}
                  />
                </div>
                <div className="font-mono text-[10px] text-text-faint uppercase tracking-wider mt-2">
                  {metric.label}
                </div>
                {metric.description && (
                  <div className="font-body text-xs text-text-faint/70 mt-1">{metric.description}</div>
                )}
              </m.div>
            ))}
          </m.div>
        </div>
      )}

      {/* Tech Stack */}
      <div>
        <h2 className="font-mono text-xs text-text-faint uppercase tracking-widest mb-4">Technologies Used</h2>
        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span
              key={t}
              className="font-mono text-xs text-text-muted bg-surface border border-white/10 rounded-full px-4 py-1.5"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Row */}
      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/5">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-text-muted hover:text-white font-mono text-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:border-white/30 text-text-muted hover:text-white font-mono text-xs transition-all"
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-accent-violet to-accent-indigo text-white font-mono text-xs font-semibold hover:brightness-110 transition-all shadow-glow-violet"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
        )}
        {project.hasCaseStudy && (
          <Link
            href={`/case-studies/${project.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan font-mono text-xs font-semibold hover:bg-accent-cyan/20 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            Read Case Study
          </Link>
        )}
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="pt-8 border-t border-white/5">
          <h2 className="font-display text-2xl font-bold text-white mb-6">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedProjects.map(rp => (
              <Link key={rp.id} href={`/projects/${rp.slug}`}>
                <GlowCard className="h-full p-5 bg-surface border border-white/5 hover:border-accent-violet/30 rounded-xl transition-colors cursor-pointer">
                  <span className="font-mono text-[9px] text-text-faint uppercase tracking-wider">{rp.category}</span>
                  <h4 className="font-display text-base font-bold text-white mt-1 hover:text-accent-violet transition-colors">
                    {rp.shortTitle}
                  </h4>
                  <p className="font-body text-xs text-text-muted mt-1 line-clamp-2">{rp.description}</p>
                </GlowCard>
              </Link>
            ))}
          </div>
        </div>
      )}
    </m.div>
  );
}

export default ProjectDetailClient;
