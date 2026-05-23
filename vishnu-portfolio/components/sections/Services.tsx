'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowCard } from '@/components/ui/GlowCard';
import { services } from '@/data/services';
import { Code2, Layers, Brain, Globe, Palette, Link, ArrowRight } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/animations/variants';

export function Services() {
  const getIconComponent = (icon: string) => {
    switch (icon) {
      case 'Code2':
        return Code2;
      case 'Layers':
        return Layers;
      case 'Brain':
        return Brain;
      case 'Globe':
        return Globe;
      case 'Palette':
        return Palette;
      case 'Link':
        return Link;
      default:
        return Code2;
    }
  };


  return (
    <section id="services" className="py-20 md:py-28 relative px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Services"
          title="What I Offer"
          subtitle="Helping startups and development teams build modern applications with responsive visuals and clean background intelligence."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px 0px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = getIconComponent(service.icon);
            
            return (
              <motion.div
                key={service.title}
                variants={fadeUp}
                className="h-full"
              >
                <GlowCard className="h-full flex flex-col justify-between p-6 md:p-8 bg-surface">
                  
                  <div>
                    {/* Icon frame */}
                    <span className="inline-flex p-3 rounded-2xl bg-background border border-neutral-800 text-accent-violet mb-6">
                      <Icon className="w-6 h-6" />
                    </span>

                    <h4 className="font-display text-xl font-bold text-white mb-4">
                      {service.title}
                    </h4>

                    <p className="font-body text-sm text-text-muted mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features list */}
                    <ul className="flex flex-col gap-2.5 mb-8">
                      {service.features.map((feature, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-center gap-2 font-body text-xs text-text-muted"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-violet" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Connect link */}
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-accent-violet hover:text-white transition-colors group mt-auto"
                  >
                    Discuss project
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>

                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
