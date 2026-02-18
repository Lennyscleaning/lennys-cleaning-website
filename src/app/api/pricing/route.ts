import { NextResponse } from 'next/server';
import { fetchRecords, AirtableError } from '@/lib/airtable';

export const revalidate = 300; // cache for 5 minutes

/* ─── Map Airtable service_type labels → form keys ─── */
const SERVICE_TYPE_MAP: Record<string, string> = {
  'Standard': 'standard',
  'Deep Clean': 'deep',
  'Move-In-Out': 'move',
  'Airbnb Turnover': 'airbnb',
  'Post-Construction': 'post-construction',
};

/* ─── Derive addon key from display name ─── */
function toAddonKey(name: string): string {
  const map: Record<string, string> = {
    'Inside Oven': 'oven',
    'Inside Fridge': 'fridge',
    'Inside Cabinets': 'cabinets',
    'Windows Interior': 'windows',
    'Laundry': 'laundry',
    'Dishes': 'dishes',
    'Baseboards': 'baseboards',
    'Wall Spot Clean': 'wall-spot',
    'Garage Sweep': 'garage',
    'Patio/Deck': 'patio',
    'Green Cleaning Products': 'green-products',
    'Same-Day Service': 'same-day',
    'Early Morning': 'early-morning',
    'Weekend': 'weekend',
  };
  return map[name] ?? name.toLowerCase().replace(/[\s/]+/g, '-');
}

/* ─── Derive condition key from display name ─── */
function toConditionKey(name: string): string {
  const map: Record<string, string> = {
    'Normal': 'normal',
    'Lived-In': 'lived-in',
    'Heavy': 'heavy',
  };
  return map[name] ?? name.toLowerCase().replace(/\s+/g, '-');
}

interface PriceBookFields {
  service_type: string;
  bedrooms: number;
  base_price: number;
}

interface AddOnFields {
  add_on_name: string;
  price: number;
}

interface ConditionFields {
  condition_name: string;
  adjustment_percent: number;
}

interface PlatformConfigFields {
  config_key: string;
  config_value: string;
}

export async function GET() {
  try {
    const [priceBook, addOns, conditions, platformConfig, customerCount] = await Promise.all([
      fetchRecords<PriceBookFields>('price_book', {
        sort: [{ field: 'service_type' }, { field: 'bedrooms', direction: 'asc' }],
      }),
      fetchRecords<AddOnFields>('add_ons_config', {
        sort: [{ field: 'add_on_name', direction: 'asc' }],
      }),
      fetchRecords<ConditionFields>('condition_adjustments', {
        sort: [{ field: 'condition_name', direction: 'asc' }],
      }),
      fetchRecords<PlatformConfigFields>('platform_config', {
        filterByFormula:
          "OR(config_key='default_sales_tax_rate',config_key='extra_bathroom_surcharge',config_key='platform_split_percent',config_key='first_clean_premium',config_key='condition_tier_standard_max',config_key='condition_tier_moderate_max',config_key='condition_tier_heavy_max',config_key='condition_moderate_multiplier',config_key='condition_heavy_multiplier',config_key='condition_extreme_multiplier',config_key='pet_surcharge',config_key='founding_discount_percent',config_key='founding_discount_max_customers',config_key='founding_discount_active')",
      }),
      // Count unique customers for founding discount eligibility
      fetchRecords<{ email: string }>('customers', {
        fields: ['email'],
      }).catch(() => ({ records: [] as { id: string; createdTime: string; fields: { email: string } }[] })),
    ]);

    // Build price matrix: { standard: { 1: 85, 2: 120, ... }, ... }
    const basePrices: Record<string, Record<number, number>> = {};
    for (const rec of priceBook.records) {
      const { service_type, bedrooms, base_price } = rec.fields;
      const key = SERVICE_TYPE_MAP[service_type] ?? service_type.toLowerCase();
      if (!basePrices[key]) basePrices[key] = {};
      basePrices[key][bedrooms] = base_price;
    }

    // Build add-ons list
    const addOnsList = addOns.records.map((rec) => ({
      key: toAddonKey(rec.fields.add_on_name),
      name: rec.fields.add_on_name,
      price: rec.fields.price,
    }));

    // Build conditions list (convert adjustment_percent → multiplier)
    const conditionsList = conditions.records.map((rec) => ({
      key: toConditionKey(rec.fields.condition_name),
      name: rec.fields.condition_name,
      multiplier: 1 + rec.fields.adjustment_percent / 100,
    }));

    // Build platform config map
    const config: Record<string, number> = {};
    for (const rec of platformConfig.records) {
      config[rec.fields.config_key] = parseFloat(rec.fields.config_value);
    }

    // Build tier config from individual platform_config values (if present)
    const hasTierConfig =
      config.condition_tier_standard_max != null ||
      config.condition_tier_moderate_max != null ||
      config.condition_tier_heavy_max != null;

    let tierConfig: {
      tier: string;
      minScore: number;
      maxScore: number;
      multiplier: number;
      friendlyLabel: string;
      friendlyMessage: string;
    }[] | undefined;

    if (hasTierConfig) {
      const stdMax = config.condition_tier_standard_max ?? 2;
      const modMax = config.condition_tier_moderate_max ?? 5;
      const hvyMax = config.condition_tier_heavy_max ?? 8;
      tierConfig = [
        {
          tier: 'STANDARD',
          minScore: 0,
          maxScore: stdMax,
          multiplier: 1.0,
          friendlyLabel: 'Standard',
          friendlyMessage: 'Your home sounds well-maintained! Standard pricing applies.',
        },
        {
          tier: 'MODERATE',
          minScore: stdMax + 1,
          maxScore: modMax,
          multiplier: config.condition_moderate_multiplier ?? 1.1,
          friendlyLabel: 'Moderate',
          friendlyMessage: "Got it — we'll allocate a bit of extra time for your home.",
        },
        {
          tier: 'HEAVY',
          minScore: modMax + 1,
          maxScore: hvyMax,
          multiplier: config.condition_heavy_multiplier ?? 1.2,
          friendlyLabel: 'Heavy',
          friendlyMessage: "Thanks for being upfront! We'll make sure your cleaning professional has plenty of time to do a thorough job.",
        },
        {
          tier: 'EXTREME',
          minScore: hvyMax + 1,
          maxScore: 13,
          multiplier: config.condition_extreme_multiplier ?? 1.35,
          friendlyLabel: 'Intensive',
          friendlyMessage: "Your home needs some serious love — we'll price this to make sure your cleaning professional can do it right, not rushed.",
        },
      ];
    }

    // Founding discount: check if active and slots remain
    const foundingActive = config.founding_discount_active === 1;
    const foundingPercent = config.founding_discount_percent ?? 10;
    const foundingMaxCustomers = config.founding_discount_max_customers ?? 20;
    const totalCustomers = customerCount.records.length;
    const foundingSlotsRemaining = Math.max(0, foundingMaxCustomers - totalCustomers);
    const foundingDiscountEligible = foundingActive && foundingSlotsRemaining > 0;

    return NextResponse.json({
      basePrices,
      addOns: addOnsList,
      conditions: conditionsList, // kept for backward compat
      platformConfig: {
        // Value stored as percentage (10.2) — convert to decimal (0.102)
        defaultSalesTaxRate: config.default_sales_tax_rate != null
          ? config.default_sales_tax_rate / 100
          : null,
        extraBathroomSurcharge: config.extra_bathroom_surcharge ?? null,
        platformSplitPercent: config.platform_split_percent ?? null,
        // Stored as percentage (15) — passed through as-is
        firstCleanPremium: config.first_clean_premium ?? null,
        tierConfig: tierConfig ?? null,
        petSurcharge: config.pet_surcharge ?? null,
        foundingDiscountEligible,
        foundingDiscountPercent: foundingDiscountEligible ? foundingPercent : 0,
        foundingSlotsRemaining: foundingDiscountEligible ? foundingSlotsRemaining : 0,
      },
    });
  } catch (err) {
    const message =
      err instanceof AirtableError
        ? err.message
        : 'Failed to fetch pricing data';
    const status = err instanceof AirtableError ? (err.status || 500) : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
