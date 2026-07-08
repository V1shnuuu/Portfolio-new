'use client';

import React from 'react';
import { m } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, TrendingUp, Quote } from 'lucide-react';
import { CaseStudy } from '@/types';
import { CountUp } from '@/components/ui/CountUp';
import { staggerContainer } from '@/animations/variants';

interface CaseStudyDetailClientProps {
  caseStudy: CaseStudy;
}

export function CaseStudyDetailClient({ caseStudy: cs }: CaseStudyDetailClientProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-14"
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[10px] text-accent-cyan uppercase tracking-widest border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1 rounded-full">
            {cs.category}
          </span>
          <span className="font-mono text-[10px] text-text-faint">{cs.year} · {cs.client}</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight mb-4">
          {cs.title}
        </h1>
        <p className="font-body text-xl text-text-muted italic">{cs.tagline}</p>
      </div>

      {/* Hero image placeholder */}
      <div className="w-full aspect-video bg-surface-elevated rounded-2xl border border-text-primary/10 flex items-center justify-center relative overflow-hidden">
        <span className="font-mono text-[10rem] font-bold text-text-primary/5 select-none">CS</span>
        <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/3 to-transparent" />
      </div>

      {/* Challenge */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent-pink/10 border border-accent-pink/20 flex items-center justify-center">
            <span className="font-mono text-xs font-bold text-accent-pink">01</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-text-primary">The Challenge</h2>
        </div>
        <div className="pl-11">
          <p className="font-body text-base text-text-muted leading-relaxed">{cs.challenge}</p>
        </div>
      </section>

      {/* Process Flow */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent-violet/10 border border-accent-violet/20 flex items-center justify-center">
            <span className="font-mono text-xs font-bold text-accent-violet">02</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-text-primary">The Process</h2>
        </div>

        <div className="pl-11 flex flex-col gap-4">
          {cs.process.map((step, idx) => (
            <m.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-4 p-5 bg-surface border border-text-primary/5 rounded-xl"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-violet/10 border border-accent-violet/20 flex items-center justify-center font-mono text-xs font-bold text-accent-violet">
                {step.step}
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-text-primary mb-1">{step.title}</h3>
                <p className="font-body text-sm text-text-muted leading-relaxed">{step.description}</p>
              </div>
            </m.div>
          ))}
        </div>
      </section>

      {/* Solution */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
            <span className="font-mono text-xs font-bold text-accent-cyan">03</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-text-primary">The Solution</h2>
        </div>
        <div className="pl-11">
          <p className="font-body text-base text-text-muted leading-relaxed">{cs.solution}</p>
        </div>
      </section>

      {/* Metrics */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent-indigo/10 border border-accent-indigo/20 flex items-center justify-center">
            <span className="font-mono text-xs font-bold text-accent-indigo">04</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-text-primary">Results</h2>
        </div>
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="pl-11 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {cs.metrics.map((metric, idx) => (
            <m.div
              key={idx}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: idx * 0.1, duration: 0.5 } } }}
              className="bg-surface border border-text-primary/5 rounded-xl p-5 text-center"
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className={`w-3.5 h-3.5 ${metric.isPositive ? 'text-accent-cyan' : 'text-accent-pink'}`} />
              </div>
              <div className="font-display text-2xl font-bold text-text-primary">{metric.value}</div>
              <div className="font-mono text-[9px] text-accent-cyan uppercase tracking-wider mt-1">{metric.change}</div>
              <div className="font-mono text-[9px] text-text-faint uppercase tracking-wider mt-0.5">{metric.label}</div>
            </m.div>
          ))}
        </m.div>
      </section>

      {/* Testimonial */}
      {cs.testimonial && (
        <section className="bg-surface border border-text-primary/5 rounded-2xl p-8">
          <Quote className="w-8 h-8 text-accent-cyan/30 mb-4" />
          <blockquote className="font-body text-lg text-text-primary italic leading-relaxed mb-6">
            "{cs.testimonial.text}"
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center font-display font-bold text-xs text-accent-cyan">
              {cs.testimonial.author.slice(0, 2)}
            </div>
            <div>
              <div className="font-display text-sm font-bold text-text-primary">{cs.testimonial.author}</div>
              <div className="font-mono text-[10px] text-text-faint uppercase tracking-wider">{cs.testimonial.role}</div>
            </div>
          </div>
        </section>
      )}

      {/* Tech Stack */}
      <section>
        <h2 className="font-mono text-xs text-text-faint uppercase tracking-widest mb-4">Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {cs.tech.map(t => (
            <span key={t} className="font-mono text-xs text-text-muted bg-surface border border-text-primary/10 rounded-full px-4 py-1.5">
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Nav footer */}
      <div className="flex items-center justify-between pt-6 border-t border-text-primary/5">
        <Link href="/case-studies" className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          All Case Studies
        </Link>
        {cs.projectId && (
          <Link
            href={`/projects/${cs.projectId}`}
            className="inline-flex items-center gap-2 font-mono text-xs text-accent-violet hover:text-text-primary transition-colors"
          >
            View Project →
          </Link>
        )}
      </div>
    </m.div>
  );
}

export default CaseStudyDetailClient;
