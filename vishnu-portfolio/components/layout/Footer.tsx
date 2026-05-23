import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { OWNER_NAME, SOCIAL_LINKS } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-surface border-t border-neutral-900 py-12 px-6 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left copyright section */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="font-body text-sm text-text-muted text-center md:text-left">
            &copy; {currentYear} {OWNER_NAME}. All rights reserved.
          </p>
          <p className="font-mono text-[10px] text-text-faint uppercase tracking-wider">
            Designed & Built with Next.js + GSAP
          </p>
        </div>

        {/* Center socials */}
        <div className="flex items-center gap-6">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-background border border-neutral-800 text-text-muted hover:text-text-primary hover:border-accent-violet transition-all duration-300"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-background border border-neutral-800 text-text-muted hover:text-text-primary hover:border-accent-violet transition-all duration-300"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={SOCIAL_LINKS.email}
            className="p-2.5 rounded-full bg-background border border-neutral-800 text-text-muted hover:text-text-primary hover:border-accent-violet transition-all duration-300"
            aria-label="Email Contact"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Back to top scroll button */}
        <button
          onClick={handleScrollTop}
          className="flex items-center gap-2 font-mono text-xs text-text-muted hover:text-text-primary transition-colors focus:outline-none"
        >
          Back to top
          <span className="p-2 rounded-full bg-background border border-neutral-800 hover:border-accent-violet transition-colors">
            <ArrowUp className="w-3.5 h-3.5" />
          </span>
        </button>

      </div>
    </footer>
  );
}

export default Footer;
