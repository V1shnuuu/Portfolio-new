'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const words = ['CREATIVE DEVELOPER', 'UI/UX DESIGNER', 'ML ENGINEER', 'B VISHNU PRIYAN'];

export function Preloader({ onComplete }: PreloaderProps) {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (index === words.length - 1) {
      const timeout = setTimeout(() => {
        setLoading(false);
        setTimeout(onComplete, 500); // Trigger complete after fade out finishes
      }, 1200);
      return () => clearTimeout(timeout);
    }

    const interval = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, index === 0 ? 1000 : 700);

    return () => clearTimeout(interval);
  }, [index, onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
        >
          {/* Main loader design */}
          <div className="flex flex-col items-center max-w-lg px-6">
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="font-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider text-center"
            >
              {words[index]}
            </motion.div>
            
            {/* Visual load indicator */}
            <div className="w-48 h-[2px] bg-neutral-900 overflow-hidden relative rounded-full mt-8">
              <motion.div
                initial={{ left: '-100%' }}
                animate={{ left: '0%' }}
                transition={{ duration: 3, ease: 'easeInOut' }}
                className="absolute inset-0 bg-accent-violet"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
