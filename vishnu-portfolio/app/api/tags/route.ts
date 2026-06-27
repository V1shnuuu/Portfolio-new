import { NextResponse } from 'next/server';
import { listTags } from '../blogs/store';

export async function GET() {
  return NextResponse.json({ tags: listTags() });
}
