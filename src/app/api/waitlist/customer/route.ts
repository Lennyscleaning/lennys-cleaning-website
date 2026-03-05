import { NextResponse } from 'next/server';
import { createRecord, AirtableError } from '@/lib/airtable';
import * as Sentry from '@sentry/nextjs';

interface CustomerWaitlistFields {
  Name: string;
  Email: string;
  Phone: string;
  'Service Type': string;
  Bedrooms: number;
  Address: string;
  'Preferred Date': string;
  Notes: string;
  Source: string;
  'Created At': string;
}

export async function POST(request: Request) {
  return Sentry.startSpan(
    { op: 'api.waitlist.customer', name: 'POST /api/waitlist/customer' },
    async () => {
      const { logger } = Sentry;

      try {
        const body = await request.json();

        const { name, email, phone, serviceType, bedrooms, address, preferredDate, notes } =
          body as {
            name?: string;
            email?: string;
            phone?: string;
            serviceType?: string;
            bedrooms?: string;
            address?: string;
            preferredDate?: string;
            notes?: string;
          };

        if (!name || !email) {
          return NextResponse.json(
            { error: 'Name and email are required.' },
            { status: 400 },
          );
        }

        await createRecord<CustomerWaitlistFields>('Customer Waitlist', {
          Name: name,
          Email: email,
          Phone: phone || '',
          'Service Type': serviceType || '',
          Bedrooms: bedrooms ? Number(bedrooms) : 0,
          Address: address || '',
          'Preferred Date': preferredDate || '',
          Notes: notes || '',
          Source: 'Booking Form',
          'Created At': new Date().toISOString(),
        });

        logger.info('Customer waitlist signup recorded', { email });

        return NextResponse.json({ success: true });
      } catch (err) {
        if (err instanceof SyntaxError) {
          return NextResponse.json(
            { error: 'Invalid request.' },
            { status: 400 },
          );
        }

        Sentry.captureException(err);

        const message =
          err instanceof AirtableError
            ? 'We couldn\u2019t save your details right now. Please try again.'
            : 'Something went wrong. Please try again.';
        const status = err instanceof AirtableError ? (err.status || 500) : 500;

        return NextResponse.json({ error: message }, { status });
      }
    },
  );
}
