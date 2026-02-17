import { basePriceMatrix, addonPriceMap } from '@/lib/pricing-data';
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

const conditionMultipliers: Record<Condition, number> = {
  normal: 1.0,
  'lived-in': 1.1,
  heavy: 1.25,
};

export interface PriceBreakdown {
  base: number;
  bathroomSurcharge: number;
  conditionLabel: string;
  conditionMultiplier: number;
  petsSurcharge: number;
  addonsTotal: number;
  addonItems: { label: string; price: number }[];
  total: number;
}

export function calculatePrice(opts: {
  serviceType: ServiceType;
  bedrooms: Bedrooms;
  bathrooms: Bathrooms;
  condition: Condition;
  pets: boolean;
  addons: Set<AddonKey>;
}): PriceBreakdown {
  const base = basePriceMatrix[opts.serviceType][opts.bedrooms];

  // Extra bathroom surcharge: $20 per half-bath beyond 1
  const halfBaths = opts.bathrooms * 2; // convert to half-bath units
  const extraHalfBaths = Math.max(0, halfBaths - 2); // beyond 1 full bath (2 half-baths)
  const bathroomSurcharge = extraHalfBaths * 20;

  const conditionMultiplier = conditionMultipliers[opts.condition];
  const conditionLabel =
    opts.condition === 'normal'
      ? 'Normal'
      : opts.condition === 'lived-in'
        ? 'Lived-in (1.10x)'
        : 'Heavy (1.25x)';

  const petsSurcharge = opts.pets ? 15 : 0;

  const addonItems: { label: string; price: number }[] = [];
  let addonsTotal = 0;
  for (const key of opts.addons) {
    addonItems.push({ label: addonLabels[key], price: addonPrices[key] });
    addonsTotal += addonPrices[key];
  }

  const subtotal = (base + bathroomSurcharge) * conditionMultiplier + petsSurcharge + addonsTotal;
  const total = Math.round(subtotal);

  return {
    base,
    bathroomSurcharge,
    conditionLabel,
    conditionMultiplier,
    petsSurcharge,
    addonsTotal,
    addonItems,
    total,
  };
}
