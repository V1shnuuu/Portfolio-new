'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowCard } from '@/components/ui/GlowCard';
import { fadeUp, staggerContainer } from '@/animations/variants';

// TODO: Replace with real testimonials
const placeholderTestimonials = [
  {
    id: 't-1',
    name: 'Hackathon Team Lead',
    role: 'Team Lead',
    company: 'Evo Arena 2025',
    text: "Vishnu's ability to ship production-quality code under pressure is rare. His blockchain solution during our 48-hour sprint was both technically solid and impressively presented. A natural builder.",
    initials: 'TL',
  },
  {
    id: 't-2',
    name: 'Design Mentor',
    role: 'Senior Designer',
    company: 'Revatura',
    text: 'During his internship, Vishnu approached every design challenge with a clear user-first mindset. His Figma work was meticulous and his willingness to iterate based on feedback made every project better.',
    initials: 'DM',
  },
  {
    id: 't-3',
    name: 'Classmate & Collaborator',
    role: 'Peer Developer',
    company: 'Chennai Institute of Technology',
    text: 'Working with Vishnu on the Fever Oracle project was a great experience. He led the ML architecture end-to-end and ensured the dashboard was both functional and beautiful. Genuinely rare combination.',
    initials: 'CC',
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? placeholderTestimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === placeholderTestimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-20 md:py-32 relative px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <SectionHeading
          number="06"
          title="Kind Words"
          subtitle="What collaborators and peers say about working with Vishnu."
        />

        {/* ========================================================================= */}
        {/* DESKTOP LAYOUT: 3-column static grid                                      */}
        {/* ========================================================================= */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="hidden lg:grid grid-cols-3 gap-6"
        >
          {placeholderTestimonials.map((testimonial) => (
            <m.div key={testimonial.id} variants={fadeUp}>
              <GlowCard 
                className="h-full flex flex-col justify-between p-8 bg-background border border-white/5 hover:border-accent-violet/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-500 rounded-2xl relative"
                glowColor="rgba(139, 92, 246, 0.08)"
              >
                <div>
                  {/* Big Quote Glyph */}
                  <span className="font-display text-7xl font-bold text-accent-violet/30 leading-none select-none">
                    "
                  </span>
                  
                  {/* Quote text */}
                  <p className="font-body text-base text-text-muted italic leading-relaxed mb-8 mt-2">
                    {testimonial.text}
                  </p>
                </div>

                {/* Profile row */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="w-11 h-11 rounded-full bg-surface-elevated flex items-center justify-center font-display font-bold text-xs text-accent-violet border border-white/5">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h5 className="font-display text-sm font-bold text-white">
                      {testimonial.name}
                    </h5>
                    <span className="font-body text-[10px] text-text-faint uppercase tracking-wider block mt-0.5">
                      {testimonial.role} &bull; <span className="text-accent-indigo">{testimonial.company}</span>
                    </span>
                  </div>
                </div>
              </GlowCard>
            </m.div>
          ))}
        </m.div>

        {/* ========================================================================= */}
        {/* MOBILE LAYOUT: Slider carousel                                            */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-center lg:hidden max-w-md mx-auto">
          <div className="relative w-full min-h-[340px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {placeholderTestimonials.map((testimonial, idx) => {
                if (idx !== activeIndex) return null;

                return (
                  <m.div
                    key={testimonial.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.35 }}
                    className="w-full h-full"
                  >
                    <GlowCard 
                      className="h-full flex flex-col justify-between p-8 bg-background border border-white/5 rounded-2xl relative"
                      glowColor="rgba(139, 92, 246, 0.08)"
                    >
                      <div>
                        {/* Big Quote Glyph */}
                        <span className="font-display text-7xl font-bold text-accent-violet/30 leading-none select-none">
                          "
                        </span>
                        
                        {/* Quote text */}
                        <p className="font-body text-base text-text-muted italic leading-relaxed mb-8 mt-2">
                          {testimonial.text}
                        </p>
                      </div>

                      {/* Profile row */}
                      <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                        <div className="w-11 h-11 rounded-full bg-surface-elevated flex items-center justify-center font-display font-bold text-xs text-accent-violet border border-white/5">
                          {testimonial.initials}
                        </div>
                        <div>
                          <h5 className="font-display text-sm font-bold text-white">
                            {testimonial.name}
                          </h5>
                          <span className="font-body text-[10px] text-text-faint uppercase tracking-wider block mt-0.5">
                            {testimonial.role} &bull; <span className="text-accent-indigo">{testimonial.company}</span>
                          </span>
                        </div>
                      </div>
                    </GlowCard>
                  </m.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Slider Arrow Controls */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-white/5 hover:border-accent-violet/40 text-text-muted hover:text-white transition-colors cursor-pointer"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-xs text-text-faint">
              {activeIndex + 1} / {placeholderTestimonials.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-white/5 hover:border-accent-violet/40 text-text-muted hover:text-white transition-colors cursor-pointer"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Testimonials;
