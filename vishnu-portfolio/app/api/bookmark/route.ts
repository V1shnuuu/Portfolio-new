import { NextRequest, NextResponse } from 'next/server';
import { setBookmark } from '../blogs/store';
import { requireOwner } from '@/lib/server/ownerAuth';

async function mutate(request: NextRequest, enabled: boolean) {
  const unauthorized = requireOwner(request);
  if (unauthorized) return unauthorized;

  const body = await request.json();
  if (!body.blogId) return NextResponse.json({ error: 'blogId is required' }, { status: 400 });
  const bookmarks = setBookmark(body.userId || 'vishnu-priyan', body.blogId, enabled);
  if (!bookmarks) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  return NextResponse.json({ bookmarks });
}

export async function POST(request: NextRequest) {
  return mutate(request, true);
}

export async function DELETE(request: NextRequest) {
  return mutate(request, false);
}
