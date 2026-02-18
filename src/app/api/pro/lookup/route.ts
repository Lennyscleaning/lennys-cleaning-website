import { NextResponse } from 'next/server';
import { fetchRecords, AirtableError } from '@/lib/airtable';

interface ContractorFields {
  name: string;
  phone: string;
}

interface AvailabilityFields {
  contractor: string[];
  day_of_week: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) return digits.slice(1);
  return digits;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { phone?: string };

    if (!body.phone || typeof body.phone !== 'string') {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 },
      );
    }

    const phone = normalizePhone(body.phone);
    if (phone.length !== 10) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit phone number' },
        { status: 400 },
      );
    }

    // Look up contractor by phone — normalize stored phone to compare digits
    const safePhone = phone.replace(/'/g, "\\'");
    const result = await fetchRecords<ContractorFields>('contractors', {
      filterByFormula: `RIGHT(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE({phone},'-',''),'(',''),')',''),' ',''),'+',''),10)='${safePhone}'`,
      maxRecords: 1,
      fields: ['name', 'phone'],
    });

    if (result.records.length === 0) {
      return NextResponse.json({ found: false });
    }

    const contractor = result.records[0];
    const contractorId = contractor.id;
    const contractorName = contractor.fields.name || '';

    // Fetch existing availability for this contractor
    const availResult = await fetchRecords<AvailabilityFields>(
      'operator_availability',
      {
        maxRecords: 100,
        fields: [
          'contractor',
          'day_of_week',
          'start_time',
          'end_time',
          'is_available',
        ],
      },
    );

    const availability = availResult.records
      .filter(
        (rec) =>
          Array.isArray(rec.fields.contractor) &&
          rec.fields.contractor.includes(contractorId),
      )
      .map((rec) => ({
        day: rec.fields.day_of_week,
        isAvailable: rec.fields.is_available ?? false,
        startTime: rec.fields.start_time || '08:00',
        endTime: rec.fields.end_time || '17:00',
      }));

    return NextResponse.json({
      found: true,
      contractorId,
      contractorName,
      availability,
    });
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 },
      );
    }

    const message =
      err instanceof AirtableError
        ? err.message
        : 'Failed to look up contractor';
    const status = err instanceof AirtableError ? (err.status || 500) : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
