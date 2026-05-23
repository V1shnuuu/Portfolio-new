export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tech: string[];
  image: string;
  github?: string;
  live?: string;
  featured: boolean;
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
  title: string;
  description: string;
  icon: string; // Lucide icon name or SVG path
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar?: string;
}
