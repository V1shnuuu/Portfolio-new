'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-1.5 font-mono text-xs text-text-faint', className)}
    >
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-text-muted transition-colors"
        aria-label="Home"
      >
        <Home className="w-3.5 h-3.5" />
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3 h-3 flex-shrink-0 text-text-faint/50" />
            {isLast || !item.href ? (
              <span className={cn(isLast ? 'text-text-muted' : 'text-text-faint')}>
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-text-muted transition-colors"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
