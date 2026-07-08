'use client';

import React from 'react';
import { m } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeUp } from '@/animations/variants';

interface SectionHeadingProps {
  number?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  number,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  const isLeft = align === 'left';

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px 0px' }}
      variants={fadeUp}
      className={cn(
        'flex flex-col mb-16 md:mb-20 max-w-3xl',
        isLeft ? 'items-start text-left' : 'items-center text-center mx-auto',
        className
      )}
    >
      {/* 1. Category/Number Prefix */}
      {number && (
        <span className="font-mono text-xs text-text-faint tracking-widest uppercase mb-3">
          {number} //
        </span>
      )}
      
      {/* 2. Headline Display */}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-tight">
        {title}
      </h2>

      {/* 3. Decorative Accent Line */}
      <div 
        className={cn(
          'h-[2px] w-20 bg-accent-violet mt-5 mb-5 rounded-full',
          !isLeft && 'mx-auto'
        )} 
      />
      
      {/* 4. Subtitle Paragraph */}
      {subtitle && (
        <p className="font-body text-sm md:text-base text-text-muted leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </m.div>
  );
}

export default SectionHeading;
