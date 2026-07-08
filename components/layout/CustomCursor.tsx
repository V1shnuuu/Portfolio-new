'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function CustomCursor() {
  const isFinePointer = useMediaQuery('(pointer: fine)');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const mouse = useMousePosition();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Position references for lerping
  const ringPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });

  // Update target coordinates
  useEffect(() => {
    targetPos.current = { x: mouse.x, y: mouse.y };
  }, [mouse]);

  // Lerp Animation Loop
  useEffect(() => {
    if (!isFinePointer) return;

    let animationFrameId: number;

    const animateRing = () => {
      const dx = targetPos.current.x - ringPos.current.x;
      const dy = targetPos.current.y - ringPos.current.y;

      // Apply lerp factor 0.12
      ringPos.current.x += dx * 0.12;
      ringPos.current.y += dy * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animateRing);
    };

    animateRing();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isFinePointer]);

  // Hide/Show cursor listeners and interactive element detection
  useEffect(() => {
    if (!isFinePointer) return;

    // Apply cursor: none to body while custom cursor is mounted
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      body, a, button, input, textarea, select, [role="button"], .cursor-pointer {
        cursor: none !important;
      }
    `;
    document.head.appendChild(styleEl);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseMove = () => {
      if (!isVisible) setIsVisible(true);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousemove', handleMouseMove);

    // Dynamic hover handler
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.hasAttribute('data-cursor') ||
        target.closest('[data-cursor="pointer"]') !== null;

      setIsHovered(isInteractive);
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      styleEl.remove();
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isFinePointer, isVisible]);

  // Only render on desktop-like systems with fine pointer coordinates
  if (!isFinePointer || !isVisible) return null;

  return (
    <>
      {/* 1. Lerped Follower Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[100000] rounded-full border-2 border-accent-violet/50 transition-all duration-300 ease-out"
        style={{
          width: isHovered ? '56px' : '32px',
          height: isHovered ? '56px' : '32px',
          backgroundColor: isHovered ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0)',
          borderColor: isHovered ? 'rgba(139, 92, 246, 0.8)' : 'rgba(139, 92, 246, 0.5)',
        }}
      />

      {/* 2. Immediate Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[100000] rounded-full bg-accent-violet transition-transform duration-200"
        style={{
          left: mouse.x,
          top: mouse.y,
          width: '8px',
          height: '8px',
          transform: `translate3d(-50%, -50%, 0) scale(${isHovered ? 2 : 1})`,
        }}
      />
    </>
  );
}

export default CustomCursor;
