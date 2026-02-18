import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const key = process.env.AT_KEY || process.env.AIRTABLE_API_KEY || '';
  return NextResponse.json({
    keyLength: key.length,
    keyStart: key.substring(0, 10),
    keyEnd: key.substring(key.length - 6),
  });
}
