import { Metadata } from 'next';
import { CaseStudiesPageClient } from '@/components/sections/CaseStudiesPageClient';

export const metadata: Metadata = {
  title: 'Case Studies — Vishnu Priyan',
  description: 'In-depth project breakdowns: challenges, process, solutions, and measurable results from Vishnu Priyan\'s portfolio.',
  openGraph: {
    title: 'Case Studies — Vishnu Priyan',
    description: 'Deep-dives into real projects: challenges, process, and measurable outcomes.',
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesPageClient />;
}
