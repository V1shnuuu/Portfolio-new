import { NextRequest, NextResponse } from 'next/server';
import {
  clearOwnerSessionResponse,
  createOwnerSessionResponse,
  isOwnerAuthConfigured,
  isOwnerRequest,
  verifyOwnerPassword,
} from '@/lib/server/ownerAuth';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    configured: isOwnerAuthConfigured(),
    isOwner: isOwnerRequest(request),
  });
}

export async function POST(request: NextRequest) {
  if (!isOwnerAuthConfigured()) {
    return NextResponse.json(
      { error: 'Owner auth is not configured. Set BLOG_OWNER_PASSWORD in your environment.' },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!verifyOwnerPassword(password)) {
    return NextResponse.json({ error: 'Invalid owner password' }, { status: 401 });
  }

  return createOwnerSessionResponse();
}

export async function DELETE() {
  return clearOwnerSessionResponse();
}
