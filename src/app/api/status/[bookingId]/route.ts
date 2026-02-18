import { NextResponse } from 'next/server';
import { fetchRecords, AirtableError } from '@/lib/airtable';

interface JobRequestFields {
  request_name: string;
  status: string;
  service_type: string;
  preferred_date: string;
  notes: string;
  address: string;
  city: string;
  operator_first_name?: string;
}

const STATUS_MAP: Record<string, string> = {
  Pending: 'confirmed',
  Confirmed: 'confirmed',
  Assigned: 'assigned',
  'En Route': 'en_route',
  'In Progress': 'in_progress',
  Completed: 'completed',
  Cancelled: 'cancelled',
};

export async function GET(
  _request: Request,
  { params }: { params: { bookingId: string } },
) {
  const { bookingId } = params;

  if (!bookingId || bookingId.length < 4) {
    return NextResponse.json(
      { error: 'Invalid booking ID' },
      { status: 400 },
    );
  }

  try {
    const safeId = bookingId.replace(/'/g, "\\'");
    const result = await fetchRecords<JobRequestFields>('job_requests', {
      filterByFormula: `{request_name}='${safeId}'`,
      maxRecords: 1,
      fields: [
        'request_name',
        'status',
        'service_type',
        'preferred_date',
        'notes',
        'address',
        'city',
        'operator_first_name',
      ],
    });

    if (result.records.length === 0) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 },
      );
    }

    const fields = result.records[0].fields;

    // Extract preferred time from notes (format: "Preferred time: 9:00 AM")
    let scheduledTime = '';
    if (fields.notes) {
      const timeMatch = fields.notes.match(/Preferred time:\s*(.+)/);
      if (timeMatch) scheduledTime = timeMatch[1].trim();
    }

    // Strip unit/apt numbers from address — keep only the street portion
    const streetAddress = fields.address?.split(/[,#]/)[0]?.trim() ?? '';

    const status = STATUS_MAP[fields.status] ?? 'confirmed';

    return NextResponse.json({
      bookingId: fields.request_name,
      status,
      serviceType: fields.service_type ?? '',
      scheduledDate: fields.preferred_date ?? '',
      scheduledTime,
      address: streetAddress,
      city: fields.city ?? '',
      operatorFirstName: status !== 'confirmed' ? (fields.operator_first_name ?? null) : null,
    });
  } catch (err) {
    const message =
      err instanceof AirtableError ? err.message : 'Failed to fetch booking status';
    const statusCode = err instanceof AirtableError ? (err.status || 500) : 500;

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
