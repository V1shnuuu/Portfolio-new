import { NextResponse } from 'next/server';
import { listCategories } from '../blogs/store';

export async function GET() {
  return NextResponse.json({ categories: listCategories() });
}
