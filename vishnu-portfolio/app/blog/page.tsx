import { Metadata } from 'next';
import { BlogPageClient } from '@/components/sections/BlogPageClient';

export const metadata: Metadata = {
  title: 'Blog & Insights — Vishnu Priyan',
  description: 'Thoughts on AI automation, machine learning, web development, and building intelligent systems. By Vishnu Priyan.',
  openGraph: {
    title: 'Blog & Insights — Vishnu Priyan',
    description: 'AI, ML, web dev insights from a creative developer and ML engineer.',
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
