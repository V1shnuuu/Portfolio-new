import { NextRequest, NextResponse } from 'next/server';
import { BlogPost } from '@/types';
import { listBlogs, upsertBlog } from './store';
import { requireOwner } from '@/lib/server/ownerAuth';

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function readingTime(content = '') {
  const words = content.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const category = searchParams.get('category');
  const query = searchParams.get('q')?.toLowerCase();

  const blogs = listBlogs()
    .filter(blog => !status || blog.status === status)
    .filter(blog => !category || blog.category === category)
    .filter(blog => {
      if (!query) return true;
      return [blog.title, blog.excerpt, blog.category, blog.author.name, blog.tags.join(' '), blog.content || '']
        .join(' ')
        .toLowerCase()
        .includes(query);
    });

  return NextResponse.json({ blogs });
}

export async function POST(request: NextRequest) {
  const unauthorized = requireOwner(request);
  if (unauthorized) return unauthorized;

  const body = await request.json() as Partial<BlogPost>;

  if (!body.title || !body.content || !body.category) {
    return NextResponse.json({ error: 'title, content, and category are required' }, { status: 400 });
  }

  const now = new Date().toISOString();
  const blog = upsertBlog({
    id: body.id || `blog-${Date.now()}`,
    slug: body.slug || slugify(body.title),
    title: body.title,
    subtitle: body.subtitle,
    excerpt: body.excerpt || '',
    category: body.category,
    tags: body.tags || [],
    readTime: body.readTime || readingTime(body.content),
    date: body.date || now,
    createdAt: body.createdAt || now,
    updatedAt: now,
    featured: body.featured || false,
    image: body.image || '',
    status: body.status || 'draft',
    views: body.views || 0,
    likes: body.likes || 0,
    comments: body.comments || [],
    seoTitle: body.seoTitle || body.title,
    seoDescription: body.seoDescription || body.excerpt,
    authorId: body.authorId || 'vishnu-priyan',
    author: body.author || { name: 'B Vishnu Priyan', initials: 'VP' },
    content: body.content,
  });

  return NextResponse.json({ blog }, { status: 201 });
}
