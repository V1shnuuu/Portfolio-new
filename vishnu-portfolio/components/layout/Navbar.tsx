'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS, OWNER_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:px-12',
          scrolled 
            ? 'bg-background/80 backdrop-blur-md border-b border-neutral-900/60 py-3' 
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo / Name */}
          <Link href="#" className="flex items-center gap-2 group">
            <span className="font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-accent-violet">
              {OWNER_NAME.split(' ').slice(1).join(' ') || OWNER_NAME}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-violet group-hover:animate-ping" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-body text-sm text-text-muted hover:text-text-primary transition-colors relative py-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Call to Action */}
          <div className="hidden md:block">
            <Link href="#contact">
              <Button variant="outline" size="sm" className="group">
                Let's talk
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-text-muted hover:text-text-primary focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed top-[57px] left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-neutral-900 z-40 px-6 py-8 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-display text-lg font-medium text-text-muted hover:text-text-primary transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-neutral-900">
                <Link href="#contact" onClick={() => setIsOpen(false)}>
                  <Button variant="glow" fullWidth>
                    Let's talk
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
