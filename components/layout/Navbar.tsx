'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { m, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Github, Linkedin, Download } from 'lucide-react';
import { cn, scrollToSection } from '@/lib/utils';
import { NAV_LINKS, SOCIAL_LINKS, RESUME_URL } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  const handleNavClick = (e: React.MouseEvent, link: typeof NAV_LINKS[number]) => {
    if (link.type === 'anchor') {
      if (isHome) {
        // On home page: smooth-scroll to section
        e.preventDefault();
        scrollToSection(link.href);
      }
      // On sub-pages: fall through — the href is already "/#about" (set below),
      // so Next.js navigates home and the browser scrolls to the hash.
    }
    // route links navigate normally
  };

  // Resolve the correct href for each link:
  // - Anchor links on sub-pages → "/#about", on home → "#about"
  // - Route links → unchanged
  const resolvedHref = (link: typeof NAV_LINKS[number]) => {
    if (link.type === 'anchor') {
      return isHome ? link.href : `/${link.href}`;
    }
    return link.href;
  };

  const isActive = (link: typeof NAV_LINKS[number]) => {
    if (link.type === 'route') return pathname.startsWith(link.href);
    return false;
  };

  return (
    <>
      <m.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12',
          scrolled
            ? 'bg-surface/80 backdrop-blur-xl border-b border-text-primary/5 py-4'
            : 'bg-transparent py-6'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group" aria-label="Vishnu Priyan Home">
            <span className="font-display text-2xl font-bold tracking-tighter bg-gradient-to-r from-accent-violet to-accent-indigo bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
              VP
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={resolvedHref(link)}
                onClick={(e) => handleNavClick(e, link)}
                className={cn(
                  'group relative py-2 font-body text-sm font-medium transition-colors duration-300',
                  isActive(link) ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
                )}
              >
                {link.label}
                {/* Active / hover underline */}
                <span className={cn(
                  'absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-accent-violet to-accent-cyan transition-all duration-300',
                  isActive(link) ? 'w-full' : 'w-0 group-hover:w-full'
                )} />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={RESUME_URL}
              download
              className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-text-primary transition-colors uppercase tracking-wider"
              title="Download Resume"
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </a>
            <MagneticButton>
              <Link href="/contact">
                <Button variant="glow" size="sm" className="px-5 py-2.5 text-xs uppercase tracking-wider rounded-full">
                  Let's Talk
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 text-text-muted hover:text-text-primary transition-colors focus:outline-none"
            aria-label="Open navigation menu"
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
            {/* Header row */}
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-bold bg-gradient-to-r from-accent-violet to-accent-indigo bg-clip-text text-transparent">VP</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-text-muted hover:text-text-primary focus:outline-none"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav links */}
            <m.nav
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              className="flex flex-col gap-6 my-auto"
              aria-label="Mobile Navigation"
            >
              {NAV_LINKS.map((link) => (
                <m.div
                  key={link.label}
                  variants={{ hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { ease: 'easeOut', duration: 0.4 } } }}
                >
                  <Link
                    href={resolvedHref(link)}
                    onClick={(e) => {
                      handleNavClick(e, link);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'font-display text-5xl font-bold transition-colors',
                      isActive(link) ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
                    )}
                  >
                    {link.label}
                  </Link>
                </m.div>
              ))}
            </m.nav>

            {/* Footer row */}
            <div className="flex items-center justify-between border-t border-neutral-900 pt-6">
              <div className="flex items-center gap-4">
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-neutral-800 text-text-muted hover:text-text-primary transition-all" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-neutral-800 text-text-muted hover:text-text-primary transition-all" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={RESUME_URL} download className="p-2.5 rounded-full border border-neutral-800 text-text-muted hover:text-text-primary transition-all" aria-label="Download Resume">
                  <Download className="w-5 h-5" />
                </a>
              </div>
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <Button variant="glow" size="sm">Let's Talk</Button>
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
