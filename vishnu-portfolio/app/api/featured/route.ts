import { NextResponse } from 'next/server';
import { listFeatured } from '../blogs/store';

export async function GET() {
  return NextResponse.json({ blogs: listFeatured() });
}
