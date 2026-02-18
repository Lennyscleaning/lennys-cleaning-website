import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasApiKey: !!process.env.AIRTABLE_API_KEY,
    apiKeyPrefix: process.env.AIRTABLE_API_KEY?.substring(0, 6) || 'NOT SET',
    hasBaseId: !!process.env.AIRTABLE_BASE_ID,
    baseId: process.env.AIRTABLE_BASE_ID || 'NOT SET',
  });
}
