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
    const [priceBook, addOns, conditions, platformConfig] = await Promise.all([
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
          "OR(config_key='default_sales_tax_rate',config_key='extra_bathroom_surcharge',config_key='platform_split_percent',config_key='first_clean_premium')",
      }),
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

    return NextResponse.json({
      basePrices,
      addOns: addOnsList,
      conditions: conditionsList,
      platformConfig: {
        // Value stored as percentage (10.2) — convert to decimal (0.102)
        defaultSalesTaxRate: config.default_sales_tax_rate != null
          ? config.default_sales_tax_rate / 100
          : null,
        extraBathroomSurcharge: config.extra_bathroom_surcharge ?? null,
        platformSplitPercent: config.platform_split_percent ?? null,
        // Stored as percentage (15) — passed through as-is
        firstCleanPremium: config.first_clean_premium ?? null,
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
