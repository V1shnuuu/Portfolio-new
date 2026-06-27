import { Metadata } from 'next';
import { blogPosts } from '@/data/blog';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { BlogDetailClient } from '@/components/sections/BlogDetailClient';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) {
    return {
      title: 'Blog Article - Vishnu Priyan',
      description: 'Read articles and saved local drafts from the Vishnu Priyan portfolio blog.',
    };
  }

  return {
    title: `${post.title} - Vishnu Priyan`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function BlogDetailPage({ params }: PageProps) {
  const post = blogPosts.find(p => p.slug === params.slug);
  const related = blogPosts
    .filter(p => post && p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  return (
    <main className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb
          items={[
            { label: 'Blog', href: '/blog' },
            { label: post?.title || 'Article' },
          ]}
          className="mb-8"
        />
        <BlogDetailClient post={post || null} relatedPosts={related} slug={params.slug} />
      </div>
    </main>
  );
}
