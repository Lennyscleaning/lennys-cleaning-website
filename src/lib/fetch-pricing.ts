/* ─── Server-side Airtable Pricing Fetcher ───
   Fetches live pricing from Airtable for server components.
   Falls back to static values from pricing-data.ts on failure.
   Cached for 5 minutes via unstable_cache.
   ──────────────────────────────────────────────── */

import { unstable_cache } from 'next/cache';
import { fetchRecords } from '@/lib/airtable';
import * as staticData from '@/lib/pricing-data';

/* ─── Airtable field interfaces ─── */

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

/* ─── Mappings (same as /api/pricing) ─── */

const SERVICE_TYPE_MAP: Record<string, string> = {
  'Standard': 'standard',
  'Deep Clean': 'deep',
  'Move-In-Out': 'move',
  'Airbnb Turnover': 'airbnb',
  'Post-Construction': 'post-construction',
};

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

/* ─── Addon display-name mapping (key → display name for pages) ─── */

const ADDON_DISPLAY_NAMES: Record<string, string> = {
  'oven': 'Inside oven',
  'fridge': 'Inside fridge',
  'cabinets': 'Inside cabinets',
  'windows': 'Windows interior',
  'laundry': 'Laundry (wash, dry, fold)',
  'dishes': 'Dishes',
  'baseboards': 'Baseboards',
  'wall-spot': 'Wall spot clean',
  'garage': 'Garage sweep',
  'patio': 'Patio / deck',
  'green-products': 'Green cleaning products',
  'same-day': 'Same-day service',
  'early-morning': 'Early morning',
  'weekend': 'Weekend',
};

/* ─── Bedroom config labels ─── */

const bedroomConfigs: [number, string][] = [
  [1, '1 bedroom / 1 bath'],
  [2, '2 bedrooms / 1 bath'],
  [3, '3 bedrooms / 2 baths'],
  [4, '4 bedrooms / 2.5 baths'],
  [5, '5 bedrooms / 3 baths'],
  [6, '6 bedrooms / 3.5 baths'],
];

/* ─── Return type ─── */

export interface PricingData {
  basePriceMatrix: Record<string, Record<number, number>>;
  addonPriceMap: Record<string, number>;
  TAX_RATE: number;
  standardPricing: { config: string; price: string }[];
  deepPricing: { config: string; price: string }[];
  movePricing: { config: string; price: string }[];
  airbnbPricing: { config: string; price: string }[];
  postConstructionPricing: { config: string; price: string }[];
  startingPrices: Record<string, string>;
  addons: { name: string; price: string }[];
  serviceComparison: { name: string; price: string; note: string; href: string }[];
  sizeRanges: { size: string; range: string }[];
  cityServiceCards: { title: string; price: string; href: string; desc: string }[];
}

/* ─── Build derived data from raw matrices ─── */

function formatPricingTable(
  matrix: Record<string, Record<number, number>>,
  serviceKey: string,
): { config: string; price: string }[] {
  const prices = matrix[serviceKey];
  if (!prices) return [];
  return bedroomConfigs.map(([beds, config]) => ({
    config,
    price: `$${prices[beds] ?? 0}`,
  }));
}

function buildDerivedData(
  basePriceMatrix: Record<string, Record<number, number>>,
  addonPriceMap: Record<string, number>,
  taxRate: number,
): PricingData {
  const standardPricing = formatPricingTable(basePriceMatrix, 'standard');
  const deepPricing = formatPricingTable(basePriceMatrix, 'deep');
  const movePricing = formatPricingTable(basePriceMatrix, 'move');
  const airbnbPricing = formatPricingTable(basePriceMatrix, 'airbnb');
  const postConstructionPricing = formatPricingTable(basePriceMatrix, 'post-construction');

  const startingPrices: Record<string, string> = {
    standard: `$${basePriceMatrix.standard?.[1] ?? 85}`,
    deep: `$${basePriceMatrix.deep?.[1] ?? 150}`,
    move: `$${basePriceMatrix.move?.[1] ?? 175}`,
    airbnb: `$${basePriceMatrix.airbnb?.[1] ?? 125}`,
    postConstruction: `$${basePriceMatrix['post-construction']?.[1] ?? 250}`,
  };

  // Build addons list for display
  const addons = Object.entries(addonPriceMap).map(([key, price]) => ({
    name: ADDON_DISPLAY_NAMES[key] ?? key,
    price: `$${price}`,
  }));

  // Recurring pricing uses 3BR standard as base
  const recurringBase = basePriceMatrix.standard?.[3] ?? 165;
  const weeklyPrice = Math.round(recurringBase * 0.85);

  const serviceComparison = [
    { name: 'Standard cleaning', price: startingPrices.standard, note: 'Regular maintenance', href: '/services/standard' },
    { name: 'Deep cleaning', price: startingPrices.deep, note: 'Top-to-bottom detail', href: '/services/deep' },
    { name: 'Move-in / move-out', price: startingPrices.move, note: 'Get your deposit back', href: '/services/move' },
    { name: 'Airbnb turnover', price: startingPrices.airbnb, note: 'Guest-ready every time', href: '/services/airbnb' },
    { name: 'Recurring plans', price: `From $${weeklyPrice}/visit`, note: 'Save up to 15%', href: '/services/recurring' },
  ];

  // Size ranges: min(standard) to max(post-construction or deep) per bedroom count
  const sizeRanges = bedroomConfigs.map(([beds, _]) => {
    const std = basePriceMatrix.standard?.[beds] ?? 0;
    const pc = basePriceMatrix['post-construction']?.[beds] ?? basePriceMatrix.deep?.[beds] ?? 0;
    const maxPrice = Math.max(pc, basePriceMatrix.deep?.[beds] ?? 0, basePriceMatrix.move?.[beds] ?? 0);
    return {
      size: `${beds} bedroom${beds > 1 ? 's' : ''}`,
      range: `$${std}\u2013$${maxPrice}`,
    };
  });

  const cityServiceCards = [
    {
      title: 'Standard cleaning',
      price: `Starting at ${startingPrices.standard}`,
      href: '/services/standard',
      desc: 'Regular maintenance cleaning for your home \u2014 kitchens, bathrooms, floors, and surfaces.',
    },
    {
      title: 'Deep cleaning',
      price: `Starting at ${startingPrices.deep}`,
      href: '/services/deep',
      desc: 'A thorough, top-to-bottom clean including inside appliances, baseboards, and detail work.',
    },
    {
      title: 'Move-out cleaning',
      price: `Starting at ${startingPrices.move}`,
      href: '/services/move',
      desc: 'Get your deposit back with a comprehensive clean designed for move-in and move-out transitions.',
    },
  ];

  return {
    basePriceMatrix,
    addonPriceMap,
    TAX_RATE: taxRate,
    standardPricing,
    deepPricing,
    movePricing,
    airbnbPricing,
    postConstructionPricing,
    startingPrices,
    addons,
    serviceComparison,
    sizeRanges,
    cityServiceCards,
  };
}

/* ─── Static fallback ─── */

function getStaticFallback(): PricingData {
  return buildDerivedData(
    staticData.basePriceMatrix,
    staticData.addonPriceMap,
    staticData.TAX_RATE,
  );
}

/* ─── Airtable fetch (uncached) ─── */

async function fetchFromAirtable(): Promise<PricingData> {
  const [priceBook, addOns, _conditions, platformConfig] = await Promise.all([
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
        "OR(config_key='default_sales_tax_rate',config_key='extra_bathroom_surcharge',config_key='platform_split_percent')",
    }),
  ]);

  // Build base price matrix
  const basePriceMatrix: Record<string, Record<number, number>> = {};
  for (const rec of priceBook.records) {
    const { service_type, bedrooms, base_price } = rec.fields;
    const key = SERVICE_TYPE_MAP[service_type] ?? service_type.toLowerCase();
    if (!basePriceMatrix[key]) basePriceMatrix[key] = {};
    basePriceMatrix[key][bedrooms] = base_price;
  }

  // Build addon price map
  const addonPriceMap: Record<string, number> = {};
  for (const rec of addOns.records) {
    const key = toAddonKey(rec.fields.add_on_name);
    addonPriceMap[key] = rec.fields.price;
  }

  // Get tax rate
  const configMap: Record<string, number> = {};
  for (const rec of platformConfig.records) {
    configMap[rec.fields.config_key] = parseFloat(rec.fields.config_value);
  }
  const taxRate = configMap.default_sales_tax_rate != null
    ? configMap.default_sales_tax_rate / 100
    : staticData.TAX_RATE;

  return buildDerivedData(basePriceMatrix, addonPriceMap, taxRate);
}

/* ─── Cached public API ─── */

const getCachedPricing = unstable_cache(
  async (): Promise<PricingData> => {
    try {
      return await fetchFromAirtable();
    } catch {
      return getStaticFallback();
    }
  },
  ['pricing-data'],
  { revalidate: 300 },
);

export async function fetchPricingData(): Promise<PricingData> {
  return getCachedPricing();
}
