'use client';

import React, { useRef, useState, useEffect } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  range?: number; // Distance from button to trigger magnetic effect
  strength?: number; // Speed/multiplier of magnetic pull
}

export function MagneticButton({
  children,
  className,
  range = 60,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      // Calculate distance between cursor and center of the button
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);
      
      if (distance < range) {
        // Pull the button towards cursor
        x.set(deltaX * strength);
        y.set(deltaY * strength);
      } else {
        // Snap back to original position
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [x, y, range, strength]);

  return (
    <div ref={ref} className="inline-block">
      <m.div
        style={{ x: springX, y: springY }}
        className={className}
      >
        {children}
      </m.div>
    </div>
  );
}

export default MagneticButton;
