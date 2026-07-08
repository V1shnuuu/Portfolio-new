'use client';

import React from 'react';
import { m } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowCard } from '@/components/ui/GlowCard';
import { services } from '@/data/services';
import { Code2, Layers, Brain, Globe, Palette, Link, Check } from 'lucide-react';
import { staggerContainer } from '@/animations/variants';

export function Services() {
  // Map string names from data layer to Lucide React components
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

  const cardVariants: any = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };


  return (
    <section id="services" className="py-20 md:py-32 relative px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <SectionHeading
          number="05"
          title="What I Do"
          subtitle="End-to-end capabilities across development, design, and machine intelligence."
        />

        {/* Services Grid */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = getIconComponent(service.icon);
            
            return (
              <m.div
                key={service.title}
                variants={cardVariants}
                className="w-full h-full"
              >
                <GlowCard 
                  className="h-full flex flex-col justify-between p-8 bg-surface border border-text-primary/5 hover:border-accent-violet/40 hover:-translate-y-1.5 transition-all duration-500 rounded-2xl cursor-default"
                  glowColor="rgba(139, 92, 246, 0.08)"
                >
                  <div>
                    {/* Top Icon Block */}
                    <div className="inline-flex p-3 rounded-xl bg-accent-violet/10 border border-accent-violet/20 text-accent-violet">
                      <Icon className="w-8 h-8" />
                    </div>

                    {/* Title */}
                    <h4 className="font-display text-xl font-bold text-text-primary mt-6">
                      {service.title}
                    </h4>

                    {/* Description */}
                    <p className="font-body text-sm text-text-muted mt-3 line-clamp-3 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Feature bullet list */}
                    <ul className="flex flex-col gap-2.5 mt-6">
                      {service.features.map((feature, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-center gap-2 font-body text-xs text-text-muted"
                        >
                          <Check className="w-3.5 h-3.5 text-accent-violet flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </GlowCard>
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}

export default Services;
