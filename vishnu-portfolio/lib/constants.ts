export const SITE_URL = 'https://vishnupriyan.dev';
export const OWNER_NAME = 'B Vishnu Priyan';
export const OWNER_EMAIL = 'vishnupriyan.dev@gmail.com';

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
] as const;

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/in/thevishnupriyan',
  github: 'https://github.com/V1shnuuu',
  email: `mailto:${OWNER_EMAIL}`,
} as const;

export const ANIMATION_DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.8,
  stagger: 0.1,
} as const;
