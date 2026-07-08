'use client';

import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: string;
  glowSize?: number;
}

export function GlowCard({
  className,
  children,
  glowColor = 'rgba(139, 92, 246, 0.12)', // Default violet glow
  glowSize = 350,
  ...props
}: GlowCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-neutral-800 bg-surface p-6 transition-all duration-300',
        className
      )}
      {...props}
    >
      {/* Radial Glow Overlay following the mouse */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            background: `radial-gradient(${glowSize}px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`,
          }}
        />
      )}
      
      {/* Content wrapper with relative positioning so it sits above the glow overlay */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}

export default GlowCard;
