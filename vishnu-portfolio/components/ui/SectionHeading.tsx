'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from './Badge';
import { fadeUp } from '@/animations/variants';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  const isLeft = align === 'left';

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px 0px' }}
      variants={fadeUp}
      className={cn(
        'flex flex-col mb-16 md:mb-24 max-w-3xl',
        isLeft ? 'items-start text-left' : 'items-center text-center mx-auto',
        className
      )}
    >
      {badge && (
        <Badge variant="primary" className="mb-4">
          {badge}
        </Badge>
      )}
      
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
        {title}
      </h2>
      
      {subtitle && (
        <p className="font-body text-base md:text-lg text-text-muted leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export default SectionHeading;
