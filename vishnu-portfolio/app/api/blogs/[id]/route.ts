import { NextRequest, NextResponse } from 'next/server';
import { archiveBlog, getBlog, upsertBlog } from '../store';
import { requireOwner } from '@/lib/server/ownerAuth';

interface RouteContext {
  params: { id: string };
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const blog = getBlog(params.id);
  if (!blog || blog.status === 'archived') return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  return NextResponse.json({ blog });
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const unauthorized = requireOwner(request);
  if (unauthorized) return unauthorized;

  const existing = getBlog(params.id);
  if (!existing) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });

  const body = await request.json();
  const blog = upsertBlog({ ...existing, ...body, id: existing.id, slug: body.slug || existing.slug });
  return NextResponse.json({ blog });
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  const unauthorized = requireOwner(_request);
  if (unauthorized) return unauthorized;

  const blog = archiveBlog(params.id);
  if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  return NextResponse.json({ blog });
}
