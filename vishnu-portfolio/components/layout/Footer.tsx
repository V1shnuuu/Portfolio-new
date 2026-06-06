'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { m, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp, Download } from 'lucide-react';
import { NAV_LINKS, SOCIAL_LINKS, RESUME_URL } from '@/lib/constants';
import { scrollToSection } from '@/lib/utils';

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-white/5 py-12 px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Top Row: Logo & Nav Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/5">
          <div className="flex flex-col items-center md:items-start gap-1">
            <Link href="/" className="flex items-center">
              <span className="font-display text-2xl font-bold bg-gradient-to-r from-accent-violet to-accent-indigo bg-clip-text text-transparent">
                VP
              </span>
            </Link>
            <span className="font-mono text-[9px] text-text-faint uppercase tracking-widest">Vishnu Priyan · Verix AI</span>
          </div>
          
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {NAV_LINKS.map((link) => {
              // Anchor links: smooth-scroll on home, navigate to /#hash on sub-pages
              const href = link.type === 'anchor'
                ? (isHome ? link.href : `/${link.href}`)
                : link.href;
              const onClick = (link.type === 'anchor' && isHome)
                ? (e: React.MouseEvent) => { e.preventDefault(); scrollToSection(link.href); }
                : undefined;
              return (
                <Link
                  key={link.label}
                  href={href}
                  onClick={onClick}
                  className="font-body text-xs md:text-sm text-text-muted hover:text-white transition-colors duration-300 uppercase tracking-wider font-semibold"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Resume download */}
          <a href={RESUME_URL} download className="font-mono text-xs text-text-faint hover:text-text-muted transition-colors flex items-center gap-1.5 uppercase tracking-wider">
            <Download className="w-3.5 h-3.5" />
            Resume
          </a>
        </div>


        {/* Middle Row: Tagline */}
        <div className="text-center py-4">
          <p className="font-body text-base md:text-lg text-text-muted italic leading-relaxed max-w-xl mx-auto">
            "Building at the intersection of code, design, and machine intelligence."
          </p>
        </div>

        {/* Bottom Row: Legal & Social links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/5">
          <p className="font-body text-xs md:text-sm text-text-muted text-center md:text-left">
            &copy; 2026 B Vishnu Priyan. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <m.a
              whileHover={{ scale: 1.1 }}
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-surface border border-white/5 text-text-muted hover:text-accent-violet transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </m.a>
            <m.a
              whileHover={{ scale: 1.1 }}
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-surface border border-white/5 text-text-muted hover:text-accent-violet transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </m.a>
            <m.a
              whileHover={{ scale: 1.1 }}
              href={SOCIAL_LINKS.email}
              className="p-2.5 rounded-full bg-surface border border-white/5 text-text-muted hover:text-accent-violet transition-colors duration-300"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </m.a>
          </div>
        </div>

      </div>

      {/* Floating Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <m.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={handleScrollTop}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-accent-violet to-accent-indigo text-white flex items-center justify-center z-50 shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_35px_rgba(139,92,246,0.65)] hover:scale-105 transition-all duration-300 focus:outline-none cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </m.button>
        )}
      </AnimatePresence>
    </footer>
  );
}

export default Footer;
