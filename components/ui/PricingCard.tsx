'use client';

import React from 'react';
import { Check, Zap } from 'lucide-react';
import { PricingTier } from '@/types';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  tier: PricingTier;
  accentColor?: 'violet' | 'cyan' | 'pink';
  onSelect?: () => void;
}

const ACCENT_CLASSES = {
  violet: {
    badge: 'bg-accent-violet/10 border-accent-violet/30 text-accent-violet',
    button: 'bg-gradient-to-r from-accent-violet to-accent-indigo shadow-glow-violet',
    border: 'border-accent-violet/40',
    glow: 'shadow-[0_0_40px_rgba(139,92,246,0.15)]',
    check: 'text-accent-violet',
    highlight: 'from-accent-violet/10 to-accent-indigo/5',
  },
  cyan: {
    badge: 'bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan',
    button: 'bg-gradient-to-r from-accent-cyan to-accent-purple shadow-glow-cyan text-black',
    border: 'border-accent-cyan/40',
    glow: 'shadow-[0_0_40px_rgba(0,217,255,0.15)]',
    check: 'text-accent-cyan',
    highlight: 'from-accent-cyan/10 to-accent-purple/5',
  },
  pink: {
    badge: 'bg-accent-pink/10 border-accent-pink/30 text-accent-pink',
    button: 'bg-gradient-to-r from-accent-purple to-accent-pink shadow-glow-pink',
    border: 'border-accent-pink/40',
    glow: 'shadow-[0_0_40px_rgba(255,0,110,0.15)]',
    check: 'text-accent-pink',
    highlight: 'from-accent-purple/10 to-accent-pink/5',
  },
};

export function PricingCard({ tier, accentColor = 'violet', onSelect }: PricingCardProps) {
  const accent = ACCENT_CLASSES[accentColor];

  return (
    <div
      className={cn(
        'relative flex flex-col gap-6 p-6 rounded-2xl border transition-all duration-500',
        tier.highlighted
          ? cn(
              'bg-gradient-to-b border-2',
              accent.highlight,
              accent.border,
              accent.glow,
              '-translate-y-2'
            )
          : 'bg-surface border-white/10 hover:border-white/20'
      )}
    >
      {/* Popular Badge */}
      {tier.highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border',
              accent.badge
            )}
          >
            <Zap className="w-3 h-3" />
            Most Popular
          </span>
        </div>
      )}

      {/* Tier Name & Price */}
      <div>
        <p className="font-mono text-xs text-text-faint uppercase tracking-widest mb-3">
          {tier.name}
        </p>
        <div className="flex items-baseline gap-1">
          <span className="font-display text-3xl md:text-4xl font-bold text-white">
            {tier.price}
          </span>
          {tier.period && (
            <span className="font-body text-xs text-text-faint ml-1">
              / {tier.period}
            </span>
          )}
        </div>
        <p className="font-body text-sm text-text-muted mt-2">
          {tier.description}
        </p>
      </div>

      {/* Feature List */}
      <ul className="flex flex-col gap-2.5 flex-1">
        {tier.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-sm">
            <Check className={cn('w-4 h-4 flex-shrink-0 mt-0.5', accent.check)} />
            <span className="font-body text-text-muted">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={onSelect}
        className={cn(
          'w-full py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:brightness-110 active:scale-95',
          tier.highlighted
            ? cn(accent.button, 'text-white')
            : 'border border-white/10 text-white hover:border-white/30 bg-white/5'
        )}
      >
        {tier.cta}
      </button>
    </div>
  );
}

export default PricingCard;
