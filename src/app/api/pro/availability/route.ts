import { NextResponse } from 'next/server';
import {
  fetchRecords,
  createRecords,
  deleteRecords,
  AirtableError,
} from '@/lib/airtable';

interface AvailabilityFields {
  contractor: string[];
  day_of_week: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

interface DayPayload {
  day: string;
  isAvailable: boolean;
  startTime: string;
  endTime: string;
}

const VALID_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contractorId = searchParams.get('contractorId');

  if (!contractorId) {
    return NextResponse.json(
      { error: 'contractorId is required' },
      { status: 400 },
    );
  }

  try {
    const result = await fetchRecords<AvailabilityFields>(
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

    const availability = result.records
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

    return NextResponse.json({ availability });
  } catch (err) {
    const message =
      err instanceof AirtableError
        ? err.message
        : 'Failed to fetch availability';
    const status = err instanceof AirtableError ? (err.status || 500) : 500;

    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      contractorId?: string;
      availability?: DayPayload[];
    };

    if (!body.contractorId) {
      return NextResponse.json(
        { error: 'contractorId is required' },
        { status: 400 },
      );
    }

    if (!Array.isArray(body.availability) || body.availability.length === 0) {
      return NextResponse.json(
        { error: 'availability array is required' },
        { status: 400 },
      );
    }

    for (const day of body.availability) {
      if (!VALID_DAYS.includes(day.day)) {
        return NextResponse.json(
          { error: `Invalid day: ${day.day}` },
          { status: 400 },
        );
      }
    }

    // Delete existing availability records for this contractor
    const existing = await fetchRecords<AvailabilityFields>(
      'operator_availability',
      {
        maxRecords: 100,
        fields: ['contractor'],
      },
    );

    const toDelete = existing.records
      .filter(
        (rec) =>
          Array.isArray(rec.fields.contractor) &&
          rec.fields.contractor.includes(body.contractorId!),
      )
      .map((rec) => rec.id);

    if (toDelete.length > 0) {
      await deleteRecords('operator_availability', toDelete);
    }

    // Create new availability records (batch — all 7 in one request)
    await createRecords(
      'operator_availability',
      body.availability.map((day) => ({
        contractor: [body.contractorId],
        day_of_week: day.day,
        start_time: day.isAvailable ? day.startTime : '',
        end_time: day.isAvailable ? day.endTime : '',
        is_available: day.isAvailable,
      })),
    );

    return NextResponse.json({ success: true });
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
        : 'Failed to save availability';
    const status = err instanceof AirtableError ? (err.status || 500) : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
