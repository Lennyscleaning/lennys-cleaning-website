import { NextResponse } from 'next/server';
import { createRecord, fetchRecords, AirtableError } from '@/lib/airtable';
import { fetchPricingData } from '@/lib/fetch-pricing';
import { addonLabels, calculatePrice } from '@/app/book/lib/pricing';
import type { ServiceType, Bedrooms, Bathrooms, AddonKey, IntakeAnswers } from '@/app/book/lib/types';
import {
  calculateIntakeScore,
  getTierFromScore,
  hasPets,
  buildIntakeSummary,
} from '@/app/book/lib/intake-scoring';

const SERVICE_TYPE_LABELS: Record<string, string> = {
  standard: 'Standard',
  deep: 'Deep Clean',
  move: 'Move-In-Out',
  airbnb: 'Airbnb Turnover',
  'post-construction': 'Post-Construction',
};

interface BookingPayload {
  serviceType: string;
  bedrooms: number;
  bathrooms: number;
  sqft?: string;
  intake: IntakeAnswers;
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
  smsConsent?: boolean;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingPayload;

    // Validate required fields
    const required: (keyof BookingPayload)[] = [
      'serviceType', 'bedrooms', 'bathrooms',
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

    // Validate all 6 intake fields are present
    if (
      !body.intake ||
      !body.intake.lastProfessionalClean ||
      !body.intake.petSituation ||
      !body.intake.visibleBuildup ||
      !body.intake.clutterLevel ||
      !body.intake.hasYoungChildren ||
      !body.intake.flooringType
    ) {
      return NextResponse.json(
        { error: 'Missing required intake fields' },
        { status: 400 },
      );
    }

    // Check if this is a first-time customer + founding discount eligibility
    let isFirstVisit = true;
    let firstCleanPremium: number | undefined;
    let foundingDiscountEligible = false;
    let foundingDiscountPercent = 0;
    try {
      const safeEmail = body.email.replace(/'/g, "\\'");
      const [appointments, platformConfig, customerCount] = await Promise.all([
        fetchRecords<{ status: string }>('appointments', {
          filterByFormula: `AND({customer_email}='${safeEmail}',{status}='completed')`,
          maxRecords: 1,
          fields: ['status'],
        }),
        fetchRecords<{ config_key: string; config_value: string }>('platform_config', {
          filterByFormula: "OR(config_key='first_clean_premium',config_key='founding_discount_percent',config_key='founding_discount_max_customers',config_key='founding_discount_active')",
        }),
        fetchRecords<{ email: string }>('customers', {
          filterByFormula: `{email}='${safeEmail}'`,
          maxRecords: 1,
          fields: ['email'],
        }),
      ]);
      isFirstVisit = appointments.records.length === 0;

      // Parse platform config values
      const configMap: Record<string, string> = {};
      for (const rec of platformConfig.records) {
        configMap[rec.fields.config_key] = rec.fields.config_value;
      }
      if (configMap.first_clean_premium) {
        firstCleanPremium = parseFloat(configMap.first_clean_premium);
      }

      // Founding discount: must be active, customer must be new (not in customers table), and slots remaining
      const foundingActive = configMap.founding_discount_active === '1';
      const maxCustomers = parseFloat(configMap.founding_discount_max_customers || '20');
      const isNewCustomer = customerCount.records.length === 0;

      if (foundingActive && isNewCustomer) {
        // Count total customers to check if slots remain
        const allCustomers = await fetchRecords<{ email: string }>('customers', {
          fields: ['email'],
        });
        const slotsRemaining = maxCustomers - allCustomers.records.length;
        if (slotsRemaining > 0) {
          foundingDiscountEligible = true;
          foundingDiscountPercent = parseFloat(configMap.founding_discount_percent || '10');
        }
      }
    } catch {
      // If tables don't exist or query fails, default to first visit, no founding discount
      isFirstVisit = true;
    }

    // Fetch live pricing from Airtable and calculate quote
    const addonSet = new Set(body.addons as AddonKey[]);
    const livePricing = await fetchPricingData();

    const price = calculatePrice(
      {
        serviceType: body.serviceType as ServiceType,
        bedrooms: body.bedrooms as Bedrooms,
        bathrooms: body.bathrooms as Bathrooms,
        intake: body.intake,
        addons: addonSet,
        isFirstVisit,
        foundingDiscountEligible,
      },
      {
        basePrices: livePricing.basePriceMatrix,
        addonPrices: livePricing.addonPriceMap,
        taxRate: livePricing.TAX_RATE,
        firstCleanPremium: firstCleanPremium ?? undefined,
        foundingDiscountPercent: foundingDiscountPercent > 0 ? foundingDiscountPercent : undefined,
      },
    );

    // Compute intake score and tier for Airtable
    const intakeScore = calculateIntakeScore(body.intake) ?? 0;
    const tier = getTierFromScore(intakeScore);
    const intakeSummary = buildIntakeSummary(body.intake);

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
      pets: hasPets(body.intake),
      status: 'Lead',
      source: 'Website',
      is_active: true,
      sms_consent: body.smsConsent ?? false,
      service_vertical: 'CLEANING',
      created_at: new Date().toISOString(),
    });

    // 2. Build notes with time preference + intake summary + any special instructions
    const notesParts: string[] = [];
    if (body.timeSlot) notesParts.push(`Preferred time: ${body.timeSlot}`);
    if (body.sqft) notesParts.push(`Square footage: ${body.sqft}`);
    notesParts.push(`Condition: ${tier.friendlyLabel} condition (score: ${intakeScore}/13)`);
    notesParts.push(`Home details: ${intakeSummary}`);
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
      condition: tier.tier,
      pets: hasPets(body.intake),
      notes: notesParts.join('\n'),
      quote_amount: price.subtotal,
      first_visit_premium: price.firstVisitPremium > 0 ? price.firstVisitPremium : null,
      is_first_visit: isFirstVisit,
      founding_discount_applied: price.foundingDiscount > 0,
      founding_discount_amount: price.foundingDiscount > 0 ? price.foundingDiscount : null,
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
