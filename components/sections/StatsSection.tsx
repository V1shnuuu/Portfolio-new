'use client';

import React from 'react';
import { m } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CountUp } from '@/components/ui/CountUp';
import { PORTFOLIO_STATS } from '@/lib/constants';
import { staggerContainer } from '@/animations/variants';

export function StatsSection() {
  return (
    <section className="py-16 md:py-24 px-6 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Cyan glow left */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,217,255,0.06) 0%, transparent 70%)' }}
      />
      {/* Pink glow right */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,0,110,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {PORTFOLIO_STATS.map((stat, idx) => {
            // Alternate glow colors
            const glowColors = ['text-accent-violet', 'text-accent-cyan', 'text-accent-pink', 'text-accent-indigo'];
            const glowClass = glowColors[idx % glowColors.length];

            return (
              <m.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="flex flex-col items-center text-center"
              >
                <div className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold ${glowClass}`}>
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={1800}
                  />
                </div>
                <div className="font-mono text-xs text-text-faint uppercase tracking-widest mt-2">
                  {stat.label}
                </div>
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}

export default StatsSection;
