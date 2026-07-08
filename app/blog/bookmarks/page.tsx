import { Metadata } from 'next';
import { BlogPageClient } from '@/components/sections/BlogPageClient';

export const metadata: Metadata = {
  title: 'My Bookmarks - Vishnu Priyan',
  description: 'Saved articles from the Vishnu Priyan portfolio blog.',
};

export default function BlogBookmarksPage() {
  return <BlogPageClient mode="bookmarks" />;
}
