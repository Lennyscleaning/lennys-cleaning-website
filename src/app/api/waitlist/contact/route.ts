import { NextResponse } from 'next/server';
import { createRecord, AirtableError } from '@/lib/airtable';
import * as Sentry from '@sentry/nextjs';

interface ContactFormLeadFields {
  Name: string;
  Email: string;
  Phone: string;
  Topic: string;
  Message: string;
  Source: string;
  'Created At': string;
}

export async function POST(request: Request) {
  return Sentry.startSpan(
    { op: 'api.waitlist.contact', name: 'POST /api/waitlist/contact' },
    async () => {
      const { logger } = Sentry;

      try {
        const body = await request.json();

        const { name, email, phone, topic, message } =
          body as {
            name?: string;
            email?: string;
            phone?: string;
            topic?: string;
            message?: string;
          };

        if (!name || !email) {
          return NextResponse.json(
            { error: 'Name and email are required.' },
            { status: 400 },
          );
        }

        await createRecord<ContactFormLeadFields>('Contact Form Leads', {
          Name: name,
          Email: email,
          Phone: phone || '',
          Topic: topic || '',
          Message: message || '',
          Source: 'Contact Form',
          'Created At': new Date().toISOString(),
        });

        logger.info('Contact form lead recorded', { email });

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
            ? 'We couldn\u2019t save your message right now. Please try again.'
            : 'Something went wrong. Please try again.';
        const status = err instanceof AirtableError ? (err.status || 500) : 500;

        return NextResponse.json({ error: message }, { status });
      }
    },
  );
}
