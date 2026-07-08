import { NextRequest, NextResponse } from 'next/server';
import { listDrafts, upsertDraft } from '../blogs/store';
import { requireOwner } from '@/lib/server/ownerAuth';

export async function GET(request: NextRequest) {
  const unauthorized = requireOwner(request);
  if (unauthorized) return unauthorized;

  const userId = new URL(request.url).searchParams.get('userId') || 'vishnu-priyan';
  return NextResponse.json({ drafts: listDrafts(userId) });
}

export async function PUT(request: NextRequest) {
  const unauthorized = requireOwner(request);
  if (unauthorized) return unauthorized;

  const body = await request.json();
  if (!body.content) return NextResponse.json({ error: 'content is required' }, { status: 400 });
  return NextResponse.json({
    draft: upsertDraft({
      userId: body.userId || 'vishnu-priyan',
      blogId: body.blogId,
      content: body.content,
    }),
  });
}
