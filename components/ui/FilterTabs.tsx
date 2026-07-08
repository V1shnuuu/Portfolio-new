'use client';

import React from 'react';
import { m } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FilterTabsProps<T extends string> {
  filters: { label: string; value: T }[];
  active: T;
  onChange: (value: T) => void;
  className?: string;
}

export function FilterTabs<T extends string>({
  filters,
  active,
  onChange,
  className,
}: FilterTabsProps<T>) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 overflow-x-auto filter-bar-scroll pb-1',
        className
      )}
    >
      {filters.map((filter) => {
        const isActive = filter.value === active;
        return (
          <button
            key={filter.value}
            onClick={() => onChange(filter.value)}
            className={cn(
              'relative flex-shrink-0 px-5 py-2 rounded-full font-mono text-xs font-semibold uppercase tracking-widest transition-colors duration-300 focus:outline-none',
              isActive
                ? 'text-text-primary'
                : 'text-text-muted hover:text-text-primary border border-text-primary/10 hover:border-text-primary/20'
            )}
          >
            {/* Animated background for active state */}
            {isActive && (
              <m.span
                layoutId="filter-active-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-violet to-accent-indigo"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{filter.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default FilterTabs;
