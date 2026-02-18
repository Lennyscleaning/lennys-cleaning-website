import { NextResponse } from 'next/server';
import { createRecord, AirtableError } from '@/lib/airtable';
import { addonLabels, calculatePrice } from '@/app/book/lib/pricing';
import type { ServiceType, Bedrooms, Bathrooms, Condition, AddonKey } from '@/app/book/lib/types';

const SERVICE_TYPE_LABELS: Record<string, string> = {
  standard: 'Standard',
  deep: 'Deep Clean',
  move: 'Move-In-Out',
  airbnb: 'Airbnb Turnover',
  'post-construction': 'Post-Construction',
};

const CONDITION_LABELS: Record<string, string> = {
  normal: 'Normal',
  'lived-in': 'Lived-In',
  heavy: 'Heavy',
};

interface BookingPayload {
  serviceType: string;
  bedrooms: number;
  bathrooms: number;
  sqft?: string;
  condition: string;
  pets: boolean;
  addons: string[];
  date: string;
  timeSlot: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  instructions?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingPayload;

    // Validate required fields
    const required: (keyof BookingPayload)[] = [
      'serviceType', 'bedrooms', 'bathrooms', 'condition',
      'date', 'timeSlot', 'name', 'email', 'phone', 'address', 'zip',
    ];
    for (const field of required) {
      if (!body[field] && body[field] !== false && body[field] !== 0) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    // Calculate quote amount (subtotal before tax)
    const addonSet = new Set(body.addons as AddonKey[]);
    const price = calculatePrice({
      serviceType: body.serviceType as ServiceType,
      bedrooms: body.bedrooms as Bedrooms,
      bathrooms: body.bathrooms as Bathrooms,
      condition: body.condition as Condition,
      pets: body.pets ?? false,
      addons: addonSet,
    });

    // Build add-on display names
    const addonNames = body.addons
      .map((key) => addonLabels[key as AddonKey] ?? key)
      .join(', ');

    const record = await createRecord('job_requests', {
      request_name: `JR-${Date.now()}`,
      address: body.address,
      city: body.city || '',
      zip: body.zip,
      service_type: SERVICE_TYPE_LABELS[body.serviceType] ?? body.serviceType,
      frequency: 'One-Time',
      add_ons: addonNames || '',
      preferred_date: body.date,
      preferred_time: body.timeSlot,
      bedrooms: body.bedrooms,
      bathrooms: body.bathrooms,
      condition: CONDITION_LABELS[body.condition] ?? body.condition,
      pets: body.pets ?? false,
      special_instructions: body.instructions || '',
      status: 'New',
      quote_amount: price.subtotal,
      source: 'Website',
      is_urgent: false,
      urgency_tier: 'Standard',
      service_vertical: 'CLEANING',
      customer_name: body.name,
      customer_email: body.email,
      customer_phone: body.phone,
    });

    return NextResponse.json({
      success: true,
      recordId: record.id,
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
        : 'Failed to create booking';
    const status = err instanceof AirtableError ? (err.status || 500) : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
