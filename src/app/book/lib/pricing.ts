import type { ServiceType, Bedrooms, AddonKey, Condition, Bathrooms } from './types';

const basePrices: Record<ServiceType, Record<Bedrooms, number>> = {
  standard:          { 1: 85,  2: 120, 3: 165, 4: 210, 5: 255, 6: 300 },
  deep:              { 1: 150, 2: 220, 3: 295, 4: 380, 5: 460, 6: 540 },
  move:              { 1: 175, 2: 225, 3: 325, 4: 400, 5: 475, 6: 550 },
  airbnb:            { 1: 125, 2: 155, 3: 195, 4: 250, 5: 300, 6: 350 },
  'post-construction': { 1: 250, 2: 320, 3: 390, 4: 480, 5: 570, 6: 660 },
};

export const addonPrices: Record<AddonKey, number> = {
  oven: 35,
  fridge: 30,
  cabinets: 30,
  windows: 35,
  laundry: 15,
  dishes: 10,
  baseboards: 20,
  'wall-spot': 15,
  garage: 25,
  patio: 30,
  'green-products': 10,
  'same-day': 50,
  'early-morning': 15,
  weekend: 20,
};

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
  const base = basePrices[opts.serviceType][opts.bedrooms];

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
