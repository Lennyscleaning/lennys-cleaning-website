import { basePriceMatrix, addonPriceMap, TAX_RATE } from '@/lib/pricing-data';
import type { ServiceType, Bedrooms, AddonKey, Condition, Bathrooms } from './types';

export const addonPrices = addonPriceMap as Record<AddonKey, number>;

export const addonLabels: Record<AddonKey, string> = {
  oven: 'Inside oven',
  fridge: 'Inside fridge',
  cabinets: 'Inside cabinets',
  windows: 'Windows (interior)',
  laundry: 'Laundry (wash & fold)',
  dishes: 'Dishes',
  baseboards: 'Baseboards',
  'wall-spot': 'Wall spot clean',
  garage: 'Garage sweep',
  patio: 'Patio / deck',
  'green-products': 'Green cleaning products',
  'same-day': 'Same-day service',
  'early-morning': 'Early morning (before 9 AM)',
  weekend: 'Weekend service',
};

const BATHROOM_SURCHARGE = 20; // per full bathroom beyond the first

const conditionMultipliers: Record<Condition, number> = {
  normal: 1.0,
  'lived-in': 1.1,
  heavy: 1.25,
};

export interface PricingConfig {
  basePrices: Record<string, Record<number, number>>;
  addonPrices: Record<string, number>;
  addonNames: Record<string, string>;
  conditionMultipliers: Record<string, number>;
  taxRate?: number;
  bathroomSurcharge?: number;
}

export interface PriceBreakdown {
  base: number;
  bathroomSurcharge: number;
  conditionLabel: string;
  conditionMultiplier: number;
  petsSurcharge: number;
  addonsTotal: number;
  addonItems: { label: string; price: number }[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
}

export function calculatePrice(
  opts: {
    serviceType: ServiceType;
    bedrooms: Bedrooms;
    bathrooms: Bathrooms;
    condition: Condition;
    pets: boolean;
    addons: Set<AddonKey>;
  },
  config?: PricingConfig,
): PriceBreakdown {
  const prices = config?.basePrices ?? basePriceMatrix;
  const addonMap = config?.addonPrices ?? (addonPriceMap as Record<string, number>);
  const addonNameMap = config?.addonNames ?? (addonLabels as Record<string, string>);
  const condMults = config?.conditionMultipliers ?? (conditionMultipliers as Record<string, number>);
  const taxRate = config?.taxRate ?? TAX_RATE;
  const bathSurcharge = config?.bathroomSurcharge ?? BATHROOM_SURCHARGE;

  const base = prices[opts.serviceType][opts.bedrooms];

  const extraBathrooms = Math.max(0, Math.floor(opts.bathrooms) - 1);
  const bathroomSurcharge = extraBathrooms * bathSurcharge;

  const conditionMultiplier = condMults[opts.condition] ?? 1.0;
  const conditionLabel =
    conditionMultiplier === 1.0
      ? 'Normal'
      : `${opts.condition === 'lived-in' ? 'Lived-in' : 'Heavy'} (${conditionMultiplier.toFixed(2)}x)`;

  const petsSurcharge = opts.pets ? 15 : 0;

  const addonItems: { label: string; price: number }[] = [];
  let addonsTotal = 0;
  for (const key of opts.addons) {
    addonItems.push({ label: addonNameMap[key] ?? key, price: addonMap[key] ?? 0 });
    addonsTotal += addonMap[key] ?? 0;
  }

  const subtotal = Math.round((base + bathroomSurcharge) * conditionMultiplier + petsSurcharge + addonsTotal);
  const taxAmount = Math.round(subtotal * taxRate * 100) / 100;
  const total = subtotal + taxAmount;

  return {
    base,
    bathroomSurcharge,
    conditionLabel,
    conditionMultiplier,
    petsSurcharge,
    addonsTotal,
    addonItems,
    subtotal,
    taxRate,
    taxAmount,
    total,
  };
}
