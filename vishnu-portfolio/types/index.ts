// ============================================================
// Core Data Types
// ============================================================

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  filterTags: ('ai' | 'web' | 'design' | 'blockchain')[];
  description: string;
  longDescription: string;
  tech: string[];
  image: string;
  images: string[];
  github?: string;
  live?: string;
  featured: boolean;
  metrics?: ProjectMetric[];
  videoUrl?: string;
  hasCaseStudy?: boolean;
  year: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  suffix?: string;
  description?: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  type: 'work' | 'education' | 'achievement';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  features: string[];
  pricing?: PricingTier[];
  cta?: {
    label: string;
    href?: string;
    action?: 'modal' | 'calendly' | 'link';
  };
  accentColor?: 'violet' | 'cyan' | 'pink';
  featured?: boolean;
}

export interface PricingTier {
  name: 'Starter' | 'Pro' | 'Enterprise';
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar?: string;
  initials: string;
  projectId?: string;
}

// ============================================================
// Case Study Types
// ============================================================

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  thumbnail: string;
  heroImage: string;
  tagline: string;
  challenge: string;
  solution: string;
  process: ProcessStep[];
  metrics: CaseStudyMetric[];
  before?: string;
  after?: string;
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
  projectId?: string;
  tech: string[];
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon?: string;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  change: string; // e.g. "+200%" or "3x faster"
  isPositive: boolean;
}

// ============================================================
// Blog Types
// ============================================================

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  readTime: number; // minutes
  date: string; // ISO date string
  featured: boolean;
  image: string;
  author: {
    name: string;
    avatar?: string;
    initials: string;
  };
  content?: string; // MDX content or HTML string
}

// ============================================================
// Form Types
// ============================================================

export type ContactType = 'inquiry' | 'booking' | 'newsletter';

export interface ContactFormData {
  name: string;
  email: string;
  type: ContactType;
  subject?: string;
  message?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  company?: string;
}

// ============================================================
// Filter Types
// ============================================================

export type ProjectFilterValue = 'all' | 'ai' | 'web' | 'design' | 'blockchain';
export type BlogFilterValue = 'all' | 'ai' | 'web' | 'design' | 'career';
