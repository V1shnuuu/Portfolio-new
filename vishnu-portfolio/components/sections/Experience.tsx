'use client';

import React, { useRef } from 'react';

import { m } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowCard } from '@/components/ui/GlowCard';
import { experience, certifications } from '@/data/experience';
import { Briefcase, Trophy, GraduationCap, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fadeUp, staggerContainer } from '@/animations/variants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!lineRef.current || !containerRef.current) return;

    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'bottom 60%',
          scrub: 1,
        },
      }
    );
  }, { scope: containerRef });


  // Resolve type icon and colors
  const getItemDetails = (type: 'work' | 'education' | 'achievement') => {
    switch (type) {
      case 'education':
        return {
          icon: GraduationCap,
          colorClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
          label: 'Education',
        };
      case 'achievement':
        return {
          icon: Trophy,
          colorClass: 'text-accent-violet bg-accent-violet/10 border-accent-violet/20',
          label: 'Achievement',
        };
      default:
        return {
          icon: Briefcase,
          colorClass: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
          label: 'Work',
        };
    }
  };

  return (
    <section id="experience" className="py-20 md:py-32 relative px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <SectionHeading
          number="04"
          title="Journey & Achievements"
          subtitle="Internships, hackathons, certifications, and milestones — in reverse order."
        />

        {/* ========================================================================= */}
        {/* VERTICAL TIMELINE GRID                                                    */}
        {/* ========================================================================= */}
        <div ref={containerRef} className="relative w-full mb-32 min-h-[500px]">
          
          {/* Vertical Track Lines */}
          {/* Background trace line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/10 z-0" />
          
          {/* Active drawing scroll-tied line */}
          <div
            ref={lineRef}
            style={{ transformOrigin: 'top top' }}
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-accent-violet origin-top z-0"
          />


          {/* Timeline Nodes */}
          <div className="flex flex-col gap-12 relative z-10">
            {experience.map((item, idx) => {
              const isOdd = idx % 2 === 0;
              const { icon: Icon, colorClass, label } = getItemDetails(item.type);

              return (
                <div 
                  key={item.id} 
                  className={cn(
                    "flex flex-col md:flex-row items-start md:items-center w-full relative",
                    isOdd ? "md:justify-start" : "md:justify-end"
                  )}
                >
                  {/* Center Dot marker (left-aligned on mobile, centered on desktop) */}
                  <div 
                    className="absolute left-[10px] md:left-1/2 md:-translate-x-1/2 top-4 md:top-1/2 md:-translate-y-1/2 w-3 h-3 rounded-full bg-accent-violet ring-4 ring-accent-violet/20 z-20"
                  />

                  {/* Horizontal Connector Line (desktop only) */}
                  <div 
                    className={cn(
                      "hidden md:block absolute top-1/2 -translate-y-1/2 w-10 h-[1px] bg-white/10 z-0",
                      isOdd ? "left-[calc(50%-40px)]" : "right-[calc(50%-40px)]"
                    )}
                  />

                  {/* Content Card (slides in from left or right) */}
                  <m.div
                    initial={{ x: isOdd ? -80 : 80, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "w-full md:w-[45%] pl-8 md:pl-0",
                      isOdd ? "md:pr-10" : "md:pl-10"
                    )}
                  >
                    <GlowCard 
                      className="bg-background border border-white/5 p-6 rounded-2xl w-full text-left relative group hover:border-accent-violet/30 transition-colors"
                      glowColor="rgba(139, 92, 246, 0.08)"
                    >
                      {/* Type Badge Card Top-Right */}
                      <div className="absolute top-4 right-4 z-20">
                        <span className={cn("font-mono text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border", colorClass)}>
                          {label}
                        </span>
                      </div>

                      {/* Header Info */}
                      <div className="flex gap-3 items-start mb-4">
                        <span className="p-2.5 rounded-xl bg-surface border border-white/5 text-accent-violet mt-0.5">
                          <Icon className="w-4 h-4" />
                        </span>
                        <div>
                          <h4 className="font-display text-lg font-bold text-white pr-20 leading-tight">
                            {item.role}
                          </h4>
                          <span className="font-body text-xs text-text-muted mt-1 block">
                            {item.company}
                          </span>
                        </div>
                      </div>

                      {/* Date details */}
                      <span className="font-mono text-[10px] text-text-faint tracking-wider block mb-4">
                        {item.period}
                      </span>

                      {/* Bullet details */}
                      <ul className="flex flex-col gap-2">
                        {item.description.map((bullet, bulletIdx) => (
                          <li
                            key={bulletIdx}
                            className="font-body text-sm text-text-muted leading-relaxed"
                          >
                            <span className="text-accent-violet mr-1 font-mono font-bold">&rsaquo;</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </GlowCard>
                  </m.div>

                </div>
              );
            })}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* CERTIFICATIONS SUBSECTION                                                 */}
        {/* ========================================================================= */}
        <div className="w-full border-t border-white/5 pt-20">
          <h3 className="font-mono text-xl font-bold text-text-muted tracking-wider uppercase mb-10 text-center md:text-left">
            Certifications
          </h3>

          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certifications.map((cert) => {
              const name = cert.split(' — ')[0];
              const issuer = cert.split(' — ')[1] || 'Coursera';

              return (
                <m.div
                  key={cert}
                  variants={fadeUp}
                  className="w-full"
                >
                  <GlowCard 
                    className="p-5 flex items-center gap-4 bg-surface border border-white/5 hover:border-accent-violet/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all duration-500 rounded-xl"
                    glowColor="rgba(139, 92, 246, 0.08)"
                  >
                    <span className="p-3 rounded-xl bg-background border border-white/5 text-accent-violet flex-shrink-0">
                      <Award className="w-5 h-5" />
                    </span>
                    <div className="text-left">
                      <h4 className="font-display text-sm font-semibold text-white leading-tight">
                        {name}
                      </h4>
                      <span className="font-mono text-[10px] text-text-faint block mt-1">
                        {issuer}
                      </span>
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

export default Experience;
