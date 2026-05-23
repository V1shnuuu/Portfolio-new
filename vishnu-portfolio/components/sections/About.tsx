'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowCard } from '@/components/ui/GlowCard';
import { Calendar, MapPin, GraduationCap, Code2 } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/animations/variants';

export function About() {
  const profileDetails = [
    { icon: GraduationCap, label: 'Institution', value: 'Chennai Institute of Technology' },
    { icon: Calendar, label: 'Batch', value: '2024 — 2028 (Computer Science)' },
    { icon: MapPin, label: 'Location', value: 'Chennai, Tamil Nadu, India' },
    { icon: Code2, label: 'Focus', value: 'Creative UI/UX & Machine Learning' },
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="About Me"
          title="Bridging Aesthetics & Systems"
          subtitle="I explore the boundaries where interactive user interfaces meet high-accuracy machine learning predictions."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Bio Paragraphs */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px 0px' }}
            className="lg:col-span-7 flex flex-col gap-6 text-text-muted leading-relaxed"
          >
            <motion.h3 
              variants={fadeUp}
              className="font-display text-2xl font-bold text-white mb-2"
            >
              My Journey as a Creative Engineer
            </motion.h3>
            
            <motion.p variants={fadeUp}>
              As a Computer Science Engineering student at Chennai Institute of Technology, I started my journey fascinated by how visual code can look alive. That curiosity led me to explore physics engines, Canvas shaders, and smooth animation systems like GSAP and Lenis.
            </motion.p>
            
            <motion.p variants={fadeUp}>
              Over time, I recognized that animations become even more powerful when coupled with intelligent background logic. This inspired me to specialize in Machine Learning—combining computer vision models, tabular classification, and deep learning algorithms with clean dashboards that users love to navigate.
            </motion.p>

            {/* Quick stats cards */}
            <motion.div 
              variants={fadeUp}
              className="grid grid-cols-2 gap-4 mt-4"
            >
              <div className="p-4 rounded-xl border border-neutral-900 bg-surface">
                <span className="font-display text-3xl font-bold text-accent-violet">10+</span>
                <p className="font-body text-xs text-text-muted mt-1">Projects Completed</p>
              </div>
              <div className="p-4 rounded-xl border border-neutral-900 bg-surface">
                <span className="font-display text-3xl font-bold text-accent-indigo">99.4%</span>
                <p className="font-body text-xs text-text-muted mt-1">ML Prediction Accuracy</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Profile details list */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px 0px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <GlowCard className="flex flex-col gap-6">
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Quick Profile
              </h3>
              
              <div className="flex flex-col gap-5">
                {profileDetails.map((detail, idx) => {
                  const Icon = detail.icon;
                  return (
                    <div key={idx} className="flex gap-4 items-start pb-4 border-b border-neutral-800/50 last:border-0 last:pb-0">
                      <span className="p-2.5 rounded-xl bg-background border border-neutral-800 text-accent-violet mt-0.5">
                        <Icon className="w-4 h-4" />
                      </span>
                      <div>
                        <span className="font-mono text-[10px] text-text-faint uppercase tracking-wider block">
                          {detail.label}
                        </span>
                        <span className="font-body text-sm text-text-primary font-medium">
                          {detail.value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
