'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowCard } from '@/components/ui/GlowCard';
import { testimonials } from '@/data/testimonials';
import { Quote } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/animations/variants';

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 relative px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="References"
          title="Peer Reviews & Feedback"
          subtitle="Collaborations with startup teams and mentors during my academic years at Chennai Institute of Technology."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px 0px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={fadeUp}
              className="h-full"
            >
              <GlowCard className="h-full flex flex-col justify-between p-6 md:p-8 bg-background relative overflow-hidden">
                {/* Decorative Quotation Watermark */}
                <Quote className="absolute right-6 top-6 w-16 h-16 text-neutral-800/10 pointer-events-none" />

                <div>
                  {/* Quote Paragraph */}
                  <p className="font-body text-base text-text-muted italic leading-relaxed mb-8 relative z-10">
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Profile Details */}
                <div className="flex items-center gap-4 border-t border-neutral-900 pt-6">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border border-neutral-800"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-accent-violet/10 border border-accent-violet/20 flex items-center justify-center font-display font-bold text-accent-violet">
                      {testimonial.name[0]}
                    </div>
                  )}
                  
                  <div>
                    <h5 className="font-display text-sm font-bold text-white">
                      {testimonial.name}
                    </h5>
                    <p className="font-body text-xs text-text-muted">
                      {testimonial.role} &bull; <span className="text-accent-indigo">{testimonial.company}</span>
                    </p>
                  </div>
                </div>

              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
