import { NextResponse } from 'next/server';
import { createRecord, AirtableError } from '@/lib/airtable';
import * as Sentry from '@sentry/nextjs';

interface WaitlistFields {
  Name: string;
  Email: string;
  Phone: string;
  'Years of Experience': string;
  'Has Own Equipment': boolean;
  Availability: string;
  Notes: string;
  Source: string;
  'Created At': string;
}

export async function POST(request: Request) {
  return Sentry.startSpan(
    { op: 'api.waitlist.operator', name: 'POST /api/waitlist/operator' },
    async () => {
      const { logger } = Sentry;

      try {
        const body = await request.json();

        const { name, email, phone, yearsOfExperience, hasOwnEquipment, availability, notes } =
          body as {
            name?: string;
            email?: string;
            phone?: string;
            yearsOfExperience?: string;
            hasOwnEquipment?: boolean;
            availability?: string;
            notes?: string;
          };

        if (!name || !email) {
          return NextResponse.json(
            { error: 'Name and email are required.' },
            { status: 400 },
          );
        }

        await createRecord<WaitlistFields>('Operator Waitlist', {
          Name: name,
          Email: email,
          Phone: phone || '',
          'Years of Experience': yearsOfExperience || '',
          'Has Own Equipment': hasOwnEquipment ?? false,
          Availability: availability || '',
          Notes: notes || '',
          Source: 'Apply Form',
          'Created At': new Date().toISOString(),
        });

        logger.info('Operator waitlist signup recorded', { email });

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
            ? 'We couldn\u2019t save your application right now. Please try again.'
            : 'Something went wrong. Please try again.';
        const status = err instanceof AirtableError ? (err.status || 500) : 500;

        return NextResponse.json({ error: message }, { status });
      }
    },
  );
}
