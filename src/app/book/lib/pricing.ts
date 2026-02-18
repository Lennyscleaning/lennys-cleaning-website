import type { ServiceType, Bedrooms, AddonKey, Bathrooms, IntakeAnswers } from './types';
import {
  calculateIntakeScore,
  getTierFromScore,
  hasPets,
  DEFAULT_TIER_CONFIG,
  type TierConfig,
} from './intake-scoring';

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
const DEFAULT_PET_SURCHARGE = 15;
const DEFAULT_TAX_RATE = 0.102; // Tacoma default — should come from Airtable

export interface PricingConfig {
  basePrices: Record<string, Record<number, number>>;
  addonPrices: Record<string, number>;
  addonNames?: Record<string, string>;
  tierConfig?: TierConfig[];
  petSurcharge?: number;
  taxRate?: number;
  bathroomSurcharge?: number;
  firstCleanPremium?: number; // percentage, e.g. 15 for 15%
  foundingDiscountPercent?: number; // percentage, e.g. 10 for 10%
}

export interface PriceBreakdown {
  base: number;
  bathroomSurcharge: number;
  conditionTier: string;
  conditionFriendlyLabel: string;
  conditionFriendlyMessage: string;
  conditionScore: number;
  conditionMultiplier: number;
  petsSurcharge: number;
  firstVisitPremium: number;
  foundingDiscount: number;
  addonsTotal: number;
  addonItems: { label: string; price: number }[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
}

const DEFAULT_FIRST_CLEAN_PREMIUM = 15; // percentage

export function calculatePrice(
  opts: {
    serviceType: ServiceType;
    bedrooms: Bedrooms;
    bathrooms: Bathrooms;
    intake: IntakeAnswers;
    addons: Set<AddonKey>;
    isFirstVisit?: boolean;
    foundingDiscountEligible?: boolean;
  },
  config: PricingConfig,
): PriceBreakdown {
  const prices = config.basePrices;
  const addonMap = config.addonPrices;
  const addonNameMap = config.addonNames ?? (addonLabels as Record<string, string>);
  const tierConfig = config.tierConfig ?? DEFAULT_TIER_CONFIG;
  const petSurchargeAmount = config.petSurcharge ?? DEFAULT_PET_SURCHARGE;
  const taxRate = config.taxRate ?? DEFAULT_TAX_RATE;
  const bathSurcharge = config.bathroomSurcharge ?? BATHROOM_SURCHARGE;
  const premiumPercent = config.firstCleanPremium ?? DEFAULT_FIRST_CLEAN_PREMIUM;
  const foundingPercent = config.foundingDiscountPercent ?? 0;

  const base = prices[opts.serviceType][opts.bedrooms];

  const extraBathrooms = Math.max(0, Math.floor(opts.bathrooms) - 1);
  const bathroomSurcharge = extraBathrooms * bathSurcharge;

  const score = calculateIntakeScore(opts.intake) ?? 0;
  const tier = getTierFromScore(score, tierConfig);
  const conditionMultiplier = tier.multiplier;

  const petsSurcharge = hasPets(opts.intake) ? petSurchargeAmount : 0;

  // Adjusted base price: base + bathroom surcharge, scaled by condition, plus pets
  const adjustedBase = Math.round((base + bathroomSurcharge) * conditionMultiplier + petsSurcharge);

  // First Visit Assessment: applied AFTER all adjustments, to base price only (not add-ons)
  const firstVisitPremium = opts.isFirstVisit
    ? Math.round(adjustedBase * premiumPercent / 100)
    : 0;

  const addonItems: { label: string; price: number }[] = [];
  let addonsTotal = 0;
  for (const key of opts.addons) {
    addonItems.push({ label: addonNameMap[key] ?? key, price: addonMap[key] ?? 0 });
    addonsTotal += addonMap[key] ?? 0;
  }

  // Founding customer discount: applied to subtotal before tax
  const preDiscountSubtotal = adjustedBase + firstVisitPremium + addonsTotal;
  const foundingDiscount = opts.foundingDiscountEligible && foundingPercent > 0
    ? Math.round(preDiscountSubtotal * foundingPercent / 100)
    : 0;

  const subtotal = preDiscountSubtotal - foundingDiscount;
  const taxAmount = Math.round(subtotal * taxRate * 100) / 100;
  const total = subtotal + taxAmount;

  return {
    base,
    bathroomSurcharge,
    conditionTier: tier.tier,
    conditionFriendlyLabel: tier.friendlyLabel,
    conditionFriendlyMessage: tier.friendlyMessage,
    conditionScore: score,
    conditionMultiplier,
    petsSurcharge,
    firstVisitPremium,
    foundingDiscount,
    addonsTotal,
    addonItems,
    subtotal,
    taxRate,
    taxAmount,
    total,
  };
}
