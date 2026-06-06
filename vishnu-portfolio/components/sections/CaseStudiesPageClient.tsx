'use client';

import React from 'react';
import { m } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, BarChart2 } from 'lucide-react';
import { caseStudies } from '@/data/case-studies';
import { PageTransition } from '@/components/ui/PageTransition';
import { staggerContainer } from '@/animations/variants';

export function CaseStudiesPageClient() {
  return (
    <PageTransition>
      <main className="min-h-screen pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-14">
            <m.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="font-mono text-xs text-accent-cyan uppercase tracking-widest mb-3">
              Deep Dives
            </m.p>
            <m.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Case Studies
            </m.h1>
            <m.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-base text-text-muted max-w-lg">
              In-depth breakdowns of complex projects — the challenge, the process, the solution, and the measurable results.
            </m.p>
          </div>

          {/* Case Studies Grid */}
          <m.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8"
          >
            {caseStudies.map((cs, idx) => (
              <m.div
                key={cs.id}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: idx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
              >
                <Link href={`/case-studies/${cs.slug}`} className="block group">
                  <div className="bg-surface border border-white/5 hover:border-accent-cyan/30 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,217,255,0.06)]">
                    <div className="flex flex-col md:flex-row">
                      {/* Left: Visual placeholder */}
                      <div className="md:w-80 aspect-video md:aspect-auto flex-shrink-0 bg-surface-elevated relative flex items-center justify-center overflow-hidden">
                        <span className="font-mono text-6xl font-bold text-white/5 select-none">CS</span>
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <span className="font-mono text-[9px] text-accent-cyan border border-accent-cyan/30 bg-accent-cyan/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                            {cs.category}
                          </span>
                        </div>
                      </div>

                      {/* Right: Content */}
                      <div className="p-6 md:p-8 flex flex-col gap-4 flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-mono text-xs text-text-faint mb-1">{cs.year} · {cs.client}</p>
                            <h2 className="font-display text-2xl md:text-3xl font-bold text-white group-hover:text-accent-cyan transition-colors duration-300">
                              {cs.title}
                            </h2>
                          </div>
                          <ArrowRight className="w-5 h-5 text-text-faint group-hover:text-accent-cyan group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" />
                        </div>

                        <p className="font-body text-sm text-text-muted leading-relaxed">
                          {cs.tagline}
                        </p>

                        {/* Key metrics preview */}
                        <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                          {cs.metrics.slice(0, 3).map((metric, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <BarChart2 className="w-3.5 h-3.5 text-accent-cyan flex-shrink-0" />
                              <span className="font-mono text-xs">
                                <span className="text-white font-bold">{metric.value}</span>
                                <span className="text-text-faint ml-1">{metric.label}</span>
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {cs.tech.slice(0, 4).map(t => (
                            <span key={t} className="font-mono text-[8px] uppercase tracking-wider text-text-faint bg-background px-2 py-0.5 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </m.div>
            ))}
          </m.div>

          {/* Empty state */}
          {caseStudies.length === 0 && (
            <div className="text-center py-32">
              <p className="font-mono text-text-faint">More case studies coming soon.</p>
            </div>
          )}

        </div>
      </main>
    </PageTransition>
  );
}

export default CaseStudiesPageClient;
