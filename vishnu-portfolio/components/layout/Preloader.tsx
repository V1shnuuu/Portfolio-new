'use client';

import React, { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Phase 1 (0-0.5s): Background fades in (automatic via mount animation)
    
    // Phase 2 (0.5s): Reveal "VP"
    const t2 = setTimeout(() => {
      setPhase(2);
    }, 500);

    // Phase 3 (1.5s): Animate Progress Bar
    const t3 = setTimeout(() => {
      setPhase(3);
    }, 1500);

    // Phase 4 (2.5s): Fade out text & progress bar
    const t4 = setTimeout(() => {
      setPhase(4);
    }, 2500);

    // Slide up exit (3.0s)
    const t5 = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <m.div
          initial={{ y: 0 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 bg-[#0a0a0a] z-[9999] flex flex-col items-center justify-center pointer-events-none select-none"
        >
          <div className="relative flex flex-col items-center justify-center">
            
            {/* Phase 2 & 3: Logo "VP" with Clip-path Reveal */}
            <AnimatePresence>
              {phase >= 2 && phase < 4 && (
                <m.h1
                  initial={{ clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }}
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-bold tracking-tighter text-center bg-gradient-to-r from-accent-violet to-accent-indigo bg-clip-text text-transparent text-[80px] md:text-[120px] leading-none"
                >
                  VP
                </m.h1>
              )}
            </AnimatePresence>

            {/* Phase 3: Progress Bar */}
            <div className="h-[1px] w-[200px] mt-4 overflow-hidden relative">
              <AnimatePresence>
                {phase >= 3 && phase < 4 && (
                  <m.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.0, ease: 'easeInOut' }}
                    className="h-full bg-gradient-to-r from-accent-violet to-accent-indigo absolute left-0"
                  />
                )}
              </AnimatePresence>
            </div>
            
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
