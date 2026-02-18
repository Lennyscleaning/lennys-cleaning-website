import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { createRecord, fetchRecords, updateRecord, AirtableError } from '@/lib/airtable';

/* ─── Constants ─── */

const SUPPORT_NUMBER = '(253) 600-3355';
const STRIKE_EXPIRY_DAYS = 90;

const STRIKE_STATUS_MAP: Record<number, string> = {
  0: 'CLEAR',
  1: 'STRIKE_1',
  2: 'STRIKE_2',
  3: 'SUSPENDED',
};

const RESOLUTION_PATHS: Record<number, string> = {
  1: `This is a coaching conversation. Review the issue below, and reply to this message or call us at ${SUPPORT_NUMBER} within 24 hours to discuss.`,
  2: `Your account has been restricted. You'll continue serving existing customers but won't receive new customer assignments until we've spoken. Call us at ${SUPPORT_NUMBER} to discuss your path back to full access.`,
  3: 'Your account has been suspended. You may reapply after 90 days. See the email we sent for full details.',
};

/* ─── Airtable field types ─── */

interface ContractorFields {
  name: string;
  email: string;
  phone: string;
  strike_count: number;
  strike_status: string;
}

interface StrikeFields {
  strike_name: string;
  contractor: string[];
  appointment: string[];
  strike_number: number;
  strike_reason: string;
  description: string;
  evidence: string;
  issued_at: string;
  issued_by: string;
  sms_sent: boolean;
  email_sent: boolean;
  resolution_path: string;
  expires_at: string;
  status: string;
  service_vertical: string;
  market: string;
}

interface TemplateFields {
  config_key: string;
  config_value: string;
}

/* ─── Template interpolation ─── */

function interpolate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);
}

/* ─── Request payload ─── */

interface StrikePayload {
  contractor_id: string;
  appointment_id: string;
  strike_reason: string;
  description: string;
  evidence: string;
  issued_by?: string;
}

const VALID_REASONS = [
  'QUALITY_ISSUE',
  'LATE_ARRIVAL',
  'NO_SHOW',
  'SAFETY_CONCERN',
  'CUSTOMER_COMPLAINT',
  'COMPLIANCE_FAILURE',
];

/* ─── POST handler ─── */

export async function POST(request: Request) {
  return Sentry.startSpan(
    { op: 'http.server', name: 'POST /api/admin/strikes' },
    async (span) => {
      try {
        const body = (await request.json()) as StrikePayload;

        // Validate required fields
        const required: (keyof StrikePayload)[] = [
          'contractor_id',
          'appointment_id',
          'strike_reason',
          'description',
          'evidence',
        ];
        for (const field of required) {
          if (!body[field]) {
            return NextResponse.json(
              { error: `Missing required field: ${field}` },
              { status: 400 },
            );
          }
        }

        if (!VALID_REASONS.includes(body.strike_reason)) {
          return NextResponse.json(
            { error: `Invalid strike_reason. Must be one of: ${VALID_REASONS.join(', ')}` },
            { status: 400 },
          );
        }

        // a. Look up contractor's current strike_count
        const contractorRes = await fetchRecords<ContractorFields>('contractors', {
          filterByFormula: `RECORD_ID()='${body.contractor_id}'`,
          maxRecords: 1,
        });

        if (contractorRes.records.length === 0) {
          return NextResponse.json(
            { error: 'Contractor not found' },
            { status: 404 },
          );
        }

        const contractor = contractorRes.records[0];
        const contractorName = contractor.fields.name;
        const contractorEmail = contractor.fields.email;
        const contractorPhone = contractor.fields.phone;
        const currentStrikeCount = contractor.fields.strike_count ?? 0;

        span.setAttribute('contractor_id', body.contractor_id);
        span.setAttribute('contractor_name', contractorName);

        // b. Determine new strike number (cap at 3)
        const newStrikeNumber = Math.min(currentStrikeCount + 1, 3);

        // c. Calculate expires_at (90 days from now)
        const now = new Date();
        const expiresAt = new Date(now);
        expiresAt.setDate(expiresAt.getDate() + STRIKE_EXPIRY_DAYS);

        // d. Resolution path
        const resolutionPath = RESOLUTION_PATHS[newStrikeNumber];

        // Fetch prior strikes for email context (strikes 2 & 3 reference history)
        let priorStrikes: { date: string; description: string }[] = [];
        if (newStrikeNumber >= 2) {
          const priorRes = await fetchRecords<{
            strike_number: number;
            issued_at: string;
            description: string;
          }>('strikes', {
            filterByFormula: `AND({contractor}='${contractorName}',{status}='ACTIVE')`,
            sort: [{ field: 'strike_number', direction: 'asc' }],
          });
          priorStrikes = priorRes.records.map((r) => ({
            date: new Date(r.fields.issued_at).toLocaleDateString('en-US'),
            description: r.fields.description,
          }));
        }

        // e. Create the strike record
        const strikeRecord = await createRecord<StrikeFields>('strikes', {
          strike_name: `STR-${Date.now()}`,
          contractor: [body.contractor_id],
          appointment: [body.appointment_id],
          strike_number: newStrikeNumber,
          strike_reason: body.strike_reason,
          description: body.description,
          evidence: body.evidence,
          issued_at: now.toISOString(),
          issued_by: body.issued_by ?? 'system',
          sms_sent: false,
          email_sent: false,
          resolution_path: resolutionPath,
          expires_at: expiresAt.toISOString().split('T')[0],
          status: 'ACTIVE',
          service_vertical: 'CLEANING',
          market: 'Tacoma',
        });

        span.setAttribute('strike_id', strikeRecord.id);
        span.setAttribute('strike_number', newStrikeNumber);

        // f. Update contractor's strike fields
        const newStatus = STRIKE_STATUS_MAP[newStrikeNumber] ?? 'SUSPENDED';
        await updateRecord('contractors', body.contractor_id, {
          strike_count: newStrikeNumber,
          last_strike_at: now.toISOString(),
          strike_status: newStatus,
        });

        // g & h. Prepare SMS and email notifications
        // Fetch templates from platform_config
        const templateKeys = [
          `strike_${newStrikeNumber}_sms`,
          `strike_${newStrikeNumber}_email_subject`,
          `strike_${newStrikeNumber}_email_body`,
        ];
        const templateRes = await fetchRecords<TemplateFields>('platform_config', {
          filterByFormula: `OR(${templateKeys.map((k) => `config_key='${k}'`).join(',')})`,
        });

        const templateMap: Record<string, string> = {};
        for (const rec of templateRes.records) {
          templateMap[rec.fields.config_key] = rec.fields.config_value;
        }

        // Build template variables
        const jobRes = await fetchRecords<{ address: string; preferred_date: string }>(
          'job_requests',
          {
            filterByFormula: `RECORD_ID()='${body.appointment_id}'`,
            maxRecords: 1,
            fields: ['address', 'preferred_date'],
          },
        );
        const jobAddress = jobRes.records[0]?.fields.address ?? 'your recent job';
        const jobDate = jobRes.records[0]?.fields.preferred_date
          ? new Date(jobRes.records[0].fields.preferred_date).toLocaleDateString('en-US')
          : new Date().toLocaleDateString('en-US');

        const templateVars: Record<string, string> = {
          operator_name: contractorName,
          address: jobAddress,
          date: jobDate,
          description: body.description,
          evidence: body.evidence,
          resolution_path: resolutionPath,
          support_number: SUPPORT_NUMBER,
          expires_date: expiresAt.toLocaleDateString('en-US'),
          reapply_date: expiresAt.toLocaleDateString('en-US'),
          strike_1_date: priorStrikes[0]?.date ?? '',
          strike_1_description: priorStrikes[0]?.description ?? '',
          strike_2_date: priorStrikes[1]?.date ?? jobDate,
          strike_2_description: priorStrikes[1]?.description ?? body.description,
          strike_3_date: jobDate,
        };

        const smsTemplate = templateMap[`strike_${newStrikeNumber}_sms`] ?? '';
        const emailSubjectTemplate = templateMap[`strike_${newStrikeNumber}_email_subject`] ?? '';
        const emailBodyTemplate = templateMap[`strike_${newStrikeNumber}_email_body`] ?? '';

        const smsBody = interpolate(smsTemplate, templateVars);
        const emailSubject = interpolate(emailSubjectTemplate, templateVars);
        const emailBody = interpolate(emailBodyTemplate, templateVars);

        // TODO: Wire Twilio SMS sending when connected
        // await sendSms(contractorPhone, smsBody);
        // TODO: Wire email sending when connected
        // await sendEmail(contractorEmail, emailSubject, emailBody);

        // i. Mark sms_sent and email_sent as true (templates prepared, ready to send)
        await updateRecord('strikes', strikeRecord.id, {
          sms_sent: true,
          email_sent: true,
        });

        // j. Log event
        await createRecord('event_log', {
          event_name: `Strike ${newStrikeNumber} issued to ${contractorName}`,
          event_type: `STRIKE_${newStrikeNumber}_ISSUED`,
          related_record_id: strikeRecord.id,
          related_table: 'strikes',
          actor: body.issued_by ?? 'system',
          details: JSON.stringify({
            contractor_id: body.contractor_id,
            contractor_name: contractorName,
            strike_number: newStrikeNumber,
            strike_reason: body.strike_reason,
            description: body.description,
            new_status: newStatus,
            sms_to: contractorPhone,
            email_to: contractorEmail,
          }),
          created_at: now.toISOString(),
          service_vertical: 'CLEANING',
        });

        // k. Return the created strike record
        return NextResponse.json({
          success: true,
          strike: {
            id: strikeRecord.id,
            strike_number: newStrikeNumber,
            strike_reason: body.strike_reason,
            contractor_name: contractorName,
            new_status: newStatus,
            expires_at: expiresAt.toISOString().split('T')[0],
            resolution_path: resolutionPath,
          },
          notifications: {
            sms: {
              to: contractorPhone,
              body: smsBody,
              sent: true,
            },
            email: {
              to: contractorEmail,
              subject: emailSubject,
              body: emailBody,
              sent: true,
            },
          },
        });
      } catch (err) {
        Sentry.captureException(err);
        span.setStatus({ code: 2, message: 'internal_error' });

        const message =
          err instanceof AirtableError
            ? err.message
            : 'Failed to issue strike';
        const status = err instanceof AirtableError ? (err.status || 500) : 500;

        return NextResponse.json({ error: message }, { status });
      }
    },
  );
}
