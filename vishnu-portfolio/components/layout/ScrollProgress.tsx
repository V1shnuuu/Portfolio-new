'use client';

import React, { useEffect } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const progress = useMotionValue(0);
  
  // Spring configuration for trailing smoothing
  const scaleX = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const totalScrollable = docHeight - winHeight;
      
      const scrollPercent = totalScrollable > 0 ? scrollY / totalScrollable : 0;
      progress.set(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger initial scroll computation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [progress]);

  return (
    <m.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-violet to-accent-indigo origin-left z-50 pointer-events-none"
      style={{ scaleX }}
    />
  );
}

export default ScrollProgress;
