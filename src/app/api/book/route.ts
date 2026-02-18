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

    // 1. Create customer record
    const customer = await createRecord('customers', {
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
      city: body.city || '',
      zip: body.zip,
      bedrooms: body.bedrooms,
      bathrooms: body.bathrooms,
      pets: body.pets ?? false,
      status: 'Lead',
      source: 'Website',
      is_active: true,
      service_vertical: 'CLEANING',
      created_at: new Date().toISOString(),
    });

    // 2. Build notes with time preference + any special instructions
    const notesParts: string[] = [];
    if (body.timeSlot) notesParts.push(`Preferred time: ${body.timeSlot}`);
    if (body.sqft) notesParts.push(`Square footage: ${body.sqft}`);
    if (body.instructions) notesParts.push(body.instructions);

    // 3. Create job request linked to customer
    const jobRequest = await createRecord('job_requests', {
      request_name: `JR-${Date.now()}`,
      customer: [customer.id],
      address: body.address,
      city: body.city || '',
      zip: body.zip,
      service_type: SERVICE_TYPE_LABELS[body.serviceType] ?? body.serviceType,
      frequency: 'One-Time',
      add_ons: addonNames || '',
      preferred_date: body.date,
      bedrooms: body.bedrooms,
      bathrooms: body.bathrooms,
      condition: CONDITION_LABELS[body.condition] ?? body.condition,
      pets: body.pets ?? false,
      notes: notesParts.join('\n'),
      quote_amount: price.subtotal,
      is_urgent: false,
      service_vertical: 'CLEANING',
    });

    return NextResponse.json({
      success: true,
      recordId: jobRequest.id,
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
