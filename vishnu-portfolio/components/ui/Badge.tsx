import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'glow';
}

export function Badge({ className, children, variant = 'primary', ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium rounded-full tracking-wider uppercase';
  
  const variants = {
    primary: 'bg-accent-violet/10 text-accent-violet border border-accent-violet/20',
    secondary: 'bg-accent-indigo/10 text-accent-indigo border border-accent-indigo/20',
    outline: 'bg-transparent text-text-muted border border-text-faint',
    glow: 'bg-surface text-accent-violet border border-accent-violet/30 shadow-[0_0_15px_rgba(139,92,246,0.1)]',
  };

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default Badge;
