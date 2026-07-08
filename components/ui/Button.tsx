'use client';

import React, { forwardRef } from 'react';
import { m, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'primary', size = 'md', fullWidth = false, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-body font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-violet/50 active:scale-95 disabled:opacity-55 disabled:pointer-events-none cursor-pointer';
    
    const variants = {
      primary: 'bg-white text-black hover:bg-zinc-200 shadow-md',
      secondary: 'bg-surface-elevated text-text-primary hover:bg-neutral-800 border border-neutral-800',
      outline: 'bg-transparent text-text-primary border border-text-muted/30 hover:border-text-primary hover:bg-neutral-900',
      ghost: 'bg-transparent text-text-muted hover:text-text-primary hover:bg-neutral-900',
      glow: 'relative bg-accent-violet text-white hover:bg-accent-violet/90 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_35px_rgba(139,92,246,0.5)] transition-shadow duration-300',
    };

    const sizes = {
      sm: 'text-xs px-4 py-2 gap-1.5',
      md: 'text-sm px-6 py-3 gap-2',
      lg: 'text-base px-8 py-4 gap-2.5',
    };

    return (
      <m.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </m.button>
    );
  }
);

Button.displayName = 'Button';
