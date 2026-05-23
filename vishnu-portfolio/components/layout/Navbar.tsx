'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { m, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Github, Linkedin } from 'lucide-react';
import { cn, scrollToSection } from '@/lib/utils';
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/ui/MagneticButton';


export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <m.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-5 md:px-12',
          scrolled 
            ? 'bg-surface/80 backdrop-blur-xl border-b border-white/5 py-4' 
            : 'bg-transparent py-6'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <Link 
            href="#home" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="flex items-center gap-1 group"
          >
            <span className="font-display text-2xl font-bold tracking-tighter bg-gradient-to-r from-accent-violet to-accent-indigo bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
              VP
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="group relative py-2 font-body text-sm font-medium text-text-muted hover:text-white transition-colors duration-300"
              >
                {link.label}
                {/* Underline sliding in from left */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent-violet transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <MagneticButton>
              <Link 
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
              >
                <Button variant="glow" size="sm" className="px-5 py-2.5 text-xs uppercase tracking-wider rounded-full">
                  Let's Talk
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 text-text-muted hover:text-white transition-colors focus:outline-none"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

        </div>
      </m.header>

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 bg-background flex flex-col justify-between p-8 md:hidden"
          >
            {/* Header row in mobile overlay */}
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-bold bg-gradient-to-r from-accent-violet to-accent-indigo bg-clip-text text-transparent">
                VP
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-text-muted hover:text-white focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav list container */}
            <m.nav 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  }
                }
              }}
              className="flex flex-col gap-6 my-auto"
            >
              {NAV_LINKS.map((link) => (
                <m.div
                  key={link.label}
                  variants={{
                    hidden: { y: 40, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { ease: 'easeOut', duration: 0.4 } }
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      scrollToSection(link.href);
                    }}
                    className="font-display text-5xl font-bold text-text-muted hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </m.div>
              ))}
            </m.nav>

            {/* Social channels at bottom */}
            <div className="flex items-center justify-between border-t border-neutral-900 pt-6">
              <div className="flex items-center gap-4">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-neutral-800 text-text-muted hover:text-white transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-neutral-800 text-text-muted hover:text-white transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>

              <Link 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  scrollToSection('#contact');
                }}
              >
                <Button variant="glow" size="sm">
                  Let's Talk
                </Button>
              </Link>
            </div>

          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
