import { NextRequest, NextResponse } from 'next/server';

export const OWNER_SESSION_COOKIE = 'vp_owner_session';

function getOwnerPassword() {
  return process.env.BLOG_OWNER_PASSWORD?.trim() || '';
}

function getOwnerSessionToken() {
  return process.env.BLOG_OWNER_SESSION_TOKEN?.trim() || getOwnerPassword();
}

export function isOwnerAuthConfigured() {
  return Boolean(getOwnerPassword() && getOwnerSessionToken());
}

export function isOwnerRequest(request: NextRequest) {
  const token = getOwnerSessionToken();
  if (!token) return false;

  const cookieToken = request.cookies.get(OWNER_SESSION_COOKIE)?.value;
  const headerToken = request.headers.get('x-owner-token');
  return cookieToken === token || headerToken === token;
}

export function requireOwner(request: NextRequest) {
  if (!isOwnerAuthConfigured()) {
    return NextResponse.json(
      { error: 'Owner auth is not configured. Set BLOG_OWNER_PASSWORD in your environment.' },
      { status: 500 }
    );
  }

  if (!isOwnerRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return null;
}

export function createOwnerSessionResponse() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: OWNER_SESSION_COOKIE,
    value: getOwnerSessionToken(),
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}

export function clearOwnerSessionResponse() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: OWNER_SESSION_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
  return response;
}

export function verifyOwnerPassword(value: string) {
  const password = getOwnerPassword();
  return Boolean(password) && value === password;
}
