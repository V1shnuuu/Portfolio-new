export const SITE_URL = 'https://vishnupriyan.dev';
export const OWNER_NAME = 'B Vishnu Priyan';
export const OWNER_EMAIL = 'vishnupriyan.dev@gmail.com';
export const RESUME_URL = '/resume.pdf'; // Place your resume at public/resume.pdf

// ============================================================
// Navigation Links — supports both anchor (#section) and routes (/page)
// ============================================================
export const NAV_LINKS = [
  { label: 'About', href: '#about', type: 'anchor' as const },
  { label: 'Projects', href: '/projects', type: 'route' as const },
  { label: 'Services', href: '/services', type: 'route' as const },
  { label: 'Blog', href: '/blog', type: 'route' as const },
  { label: 'Contact', href: '/contact', type: 'route' as const },
] as const;

// Links used on the home page for smooth scroll (anchor-only)
export const HOME_ANCHOR_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const;

// ============================================================
// Social Links
// ============================================================
export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/in/thevishnupriyan',
  github: 'https://github.com/V1shnuuu',
  email: `mailto:${OWNER_EMAIL}`,
} as const;

// ============================================================
// Verix AI Links (replace with real Calendly/Stripe links)
// ============================================================
export const VERIX_AI = {
  name: 'Verix AI',
  tagline: 'Intelligent Automation for Modern Businesses',
  calendlyUrl: 'https://calendly.com/vishnupriyan', // TODO: Replace with real Calendly URL
  contactEmail: OWNER_EMAIL,
} as const;

// ============================================================
// Animation Duration Tokens
// ============================================================
export const ANIMATION_DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.8,
  stagger: 0.1,
} as const;

// ============================================================
// Project Filter Categories
// ============================================================
export const PROJECT_FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'AI & ML', value: 'ai' },
  { label: 'Web Dev', value: 'web' },
  { label: 'Design', value: 'design' },
  { label: 'Blockchain', value: 'blockchain' },
] as const;

// ============================================================
// Blog Categories
// ============================================================
export const BLOG_CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'AI & Automation', value: 'ai' },
  { label: 'Web Dev', value: 'web' },
  { label: 'Design', value: 'design' },
  { label: 'Career', value: 'career' },
] as const;

// ============================================================
// Stats for animated metrics section
// ============================================================
export const PORTFOLIO_STATS = [
  { value: 6, suffix: '+', label: 'Projects Shipped' },
  { value: 3, suffix: '', label: 'Hackathons Competed' },
  { value: 10, suffix: '+', label: 'Technologies' },
  { value: 100, suffix: '%', label: 'Passion for Craft' },
] as const;
