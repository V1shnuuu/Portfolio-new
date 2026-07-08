import { NextRequest, NextResponse } from 'next/server';
import { addComment, deleteComment } from '../blogs/store';
import { requireOwner } from '@/lib/server/ownerAuth';

export async function POST(request: NextRequest) {
  const unauthorized = requireOwner(request);
  if (unauthorized) return unauthorized;

  const body = await request.json();
  if (!body.blogId || !body.content) {
    return NextResponse.json({ error: 'blogId and content are required' }, { status: 400 });
  }

  const comment = addComment({
    blogId: body.blogId,
    authorId: body.authorId || 'vishnu-priyan',
    authorName: body.authorName || 'B Vishnu Priyan',
    authorInitials: body.authorInitials || 'VP',
    content: body.content,
    parentComment: body.parentComment,
  });

  if (!comment) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  return NextResponse.json({ comment }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const unauthorized = requireOwner(request);
  if (unauthorized) return unauthorized;

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: 'comment id is required' }, { status: 400 });
  return NextResponse.json({ deleted: deleteComment(id) });
}
