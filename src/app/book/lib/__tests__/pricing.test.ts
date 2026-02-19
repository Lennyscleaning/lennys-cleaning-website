import { describe, it, expect } from 'vitest';
import { calculatePrice, type PricingConfig } from '../pricing';
import type { ServiceType, Bedrooms, Bathrooms, AddonKey, IntakeAnswers } from '../types';

/* ─── Test config matching Airtable values ─── */

const testConfig: PricingConfig = {
  basePrices: {
    standard: { 1: 95, 2: 130, 3: 180, 4: 230, 5: 285, 6: 340 },
    deep: { 1: 170, 2: 245, 3: 330, 4: 425, 5: 510, 6: 600 },
    move: { 1: 250, 2: 310, 3: 380, 4: 460, 5: 540, 6: 620 },
    airbnb: { 1: 95, 2: 135, 3: 195, 4: 255, 5: 305, 6: 360 },
    'post-construction': { 2: 310, 3: 390, 4: 480, 5: 570, 6: 660 },
  },
  addonPrices: {
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
  },
  taxRate: 0.102,
  bathroomSurcharge: 20,
  petSurcharge: 15,
  firstCleanPremium: 15,
  foundingDiscountPercent: 10,
};

/* ─── Intake answer presets by tier ─── */

// Score 0 → STANDARD (multiplier 1.0)
const standardIntake: IntakeAnswers = {
  lastProfessionalClean: 'within-month',
  petSituation: 'no-pets',
  visibleBuildup: 'no-buildup',
  clutterLevel: 'minimal',
  hasYoungChildren: 'no',
  flooringType: 'hard-surface',
};

// Score 4 → MODERATE (multiplier 1.1)
const moderateIntake: IntakeAnswers = {
  lastProfessionalClean: '6-12-months', // 2
  petSituation: '1-pet-shedding',       // 1
  visibleBuildup: 'some-areas',         // 1
  clutterLevel: 'minimal',              // 0
  hasYoungChildren: 'no',               // 0
  flooringType: 'hard-surface',         // 0
};

// Score 7 → HEAVY (multiplier 1.2)
const heavyIntake: IntakeAnswers = {
  lastProfessionalClean: 'over-year',   // 3
  petSituation: '2-pets',               // 2
  visibleBuildup: 'some-areas',         // 1
  clutterLevel: 'moderate',             // 1
  hasYoungChildren: 'no',               // 0
  flooringType: 'hard-surface',         // 0
};

// Score 10 → EXTREME (multiplier 1.35)
const extremeIntake: IntakeAnswers = {
  lastProfessionalClean: 'never',       // 4
  petSituation: '3-plus-pets',          // 3
  visibleBuildup: 'multiple-areas',     // 2
  clutterLevel: 'moderate',             // 1
  hasYoungChildren: 'no',               // 0
  flooringType: 'hard-surface',         // 0
};

// Has 1 shedding pet (score 1, triggers pet surcharge)
const petIntake: IntakeAnswers = {
  ...standardIntake,
  petSituation: '1-pet-shedding',
};

/* ─── Helper ─── */

function calc(overrides: Partial<Parameters<typeof calculatePrice>[0]> = {}, configOverrides: Partial<PricingConfig> = {}) {
  return calculatePrice(
    {
      serviceType: 'standard' as ServiceType,
      bedrooms: 3 as Bedrooms,
      bathrooms: 1 as Bathrooms,
      intake: standardIntake,
      addons: new Set<AddonKey>(),
      ...overrides,
    },
    { ...testConfig, ...configOverrides },
  );
}

/* ════════════════════════════════════════════════
   GROUP 1 — Base Prices (20 tests)
   ════════════════════════════════════════════════ */

describe('GROUP 1 — Base Prices', () => {
  const basePriceCases: [ServiceType, Bedrooms, number][] = [
    ['standard', 1, 95],
    ['standard', 2, 130],
    ['standard', 3, 180],
    ['standard', 4, 230],
    ['deep', 1, 170],
    ['deep', 2, 245],
    ['deep', 3, 330],
    ['deep', 4, 425],
    ['move', 1, 250],
    ['move', 2, 310],
    ['move', 3, 380],
    ['move', 4, 460],
    ['airbnb', 1, 95],
    ['airbnb', 2, 135],
    ['airbnb', 3, 195],
    ['airbnb', 4, 255],
    ['post-construction', 2, 310],
    ['post-construction', 3, 390],
    ['post-construction', 4, 480],
    ['post-construction', 5, 570],
  ];

  it.each(basePriceCases)(
    '%s %dBR base price is $%d',
    (serviceType, bedrooms, expected) => {
      const result = calc({ serviceType, bedrooms });
      expect(result.base).toBe(expected);
    },
  );
});

/* ════════════════════════════════════════════════
   GROUP 2 — Condition Multipliers (4 tests)
   Standard 3BR at each tier
   Formula: Math.round((base + bathSurcharge) * multiplier + petsSurcharge)
   ════════════════════════════════════════════════ */

describe('GROUP 2 — Condition Multipliers', () => {
  it('STANDARD tier (×1.0): $180', () => {
    const result = calc({ intake: standardIntake });
    expect(result.subtotal).toBe(180);
    expect(result.conditionMultiplier).toBe(1.0);
    expect(result.conditionTier).toBe('STANDARD');
  });

  it('MODERATE tier (×1.1): $198', () => {
    // adjustedBase = Math.round((180 + 0) * 1.1 + 15) = 213 (has pet from intake)
    // Need no-pet moderate intake
    const moderateNoPet: IntakeAnswers = {
      lastProfessionalClean: '6-12-months', // 2
      petSituation: 'no-pets',              // 0
      visibleBuildup: 'some-areas',         // 1
      clutterLevel: 'moderate',             // 1
      hasYoungChildren: 'no',               // 0
      flooringType: 'hard-surface',         // 0
    }; // score = 4, no pets
    const result = calc({ intake: moderateNoPet });
    expect(result.subtotal).toBe(198);
    expect(result.conditionMultiplier).toBe(1.1);
  });

  it('HEAVY tier (×1.2): $216', () => {
    const heavyNoPet: IntakeAnswers = {
      lastProfessionalClean: 'over-year',   // 3
      petSituation: 'no-pets',              // 0
      visibleBuildup: 'some-areas',         // 1
      clutterLevel: 'moderate',             // 1
      hasYoungChildren: 'yes',              // 1
      flooringType: 'hard-surface',         // 0
    }; // score = 6, no pets
    const result = calc({ intake: heavyNoPet });
    expect(result.subtotal).toBe(216);
    expect(result.conditionMultiplier).toBe(1.2);
  });

  it('EXTREME tier (×1.35): $243', () => {
    const extremeNoPet: IntakeAnswers = {
      lastProfessionalClean: 'never',       // 4
      petSituation: 'no-pets',              // 0
      visibleBuildup: 'multiple-areas',     // 2
      clutterLevel: 'heavy',               // 2
      hasYoungChildren: 'yes',              // 1
      flooringType: 'hard-surface',         // 0
    }; // score = 9, no pets
    const result = calc({ intake: extremeNoPet });
    expect(result.subtotal).toBe(243);
    expect(result.conditionMultiplier).toBe(1.35);
  });
});

/* ════════════════════════════════════════════════
   GROUP 3 — First Visit Premium (2 tests)
   ════════════════════════════════════════════════ */

describe('GROUP 3 — First Visit Premium', () => {
  it('first visit adds 15% premium to adjusted base', () => {
    // adjustedBase = 180, premium = Math.round(180 * 15/100) = 27
    const result = calc({ isFirstVisit: true });
    expect(result.firstVisitPremium).toBe(27);
    expect(result.subtotal).toBe(207);
  });

  it('non-first visit has $0 premium', () => {
    const result = calc({ isFirstVisit: false });
    expect(result.firstVisitPremium).toBe(0);
    expect(result.subtotal).toBe(180);
  });
});

/* ════════════════════════════════════════════════
   GROUP 4 — Bathroom Surcharge (6 tests)
   Formula: Math.max(0, Math.floor(bathrooms) - 1) * $20
   ════════════════════════════════════════════════ */

describe('GROUP 4 — Bathroom Surcharge', () => {
  const bathCases: [Bathrooms, number][] = [
    [1, 0],
    [1.5, 0],
    [2, 20],
    [2.5, 20],
    [3, 40],
    [4, 60],
  ];

  it.each(bathCases)(
    '%s bathrooms → $%d surcharge',
    (bathrooms, expectedSurcharge) => {
      const result = calc({ bathrooms });
      expect(result.bathroomSurcharge).toBe(expectedSurcharge);
    },
  );
});

/* ════════════════════════════════════════════════
   GROUP 5 — Pet Surcharge (2 tests)
   ════════════════════════════════════════════════ */

describe('GROUP 5 — Pet Surcharge', () => {
  it('no pets → $0 surcharge', () => {
    const result = calc({ intake: standardIntake });
    expect(result.petsSurcharge).toBe(0);
  });

  it('1 shedding pet → $15 surcharge', () => {
    const result = calc({ intake: petIntake });
    expect(result.petsSurcharge).toBe(15);
  });
});

/* ════════════════════════════════════════════════
   GROUP 6 — Founding Discount (2 tests)
   Applied to preDiscountSubtotal (adjustedBase + firstVisitPremium + addons)
   ════════════════════════════════════════════════ */

describe('GROUP 6 — Founding Discount', () => {
  it('eligible customer gets 10% off', () => {
    // Standard 3BR, 1 bath, standard condition: adjustedBase = 180
    // preDiscountSubtotal = 180, discount = Math.round(180 * 10/100) = 18
    const result = calc({ foundingDiscountEligible: true });
    expect(result.foundingDiscount).toBe(18);
    expect(result.subtotal).toBe(162);
  });

  it('non-eligible customer gets $0 discount', () => {
    const result = calc({ foundingDiscountEligible: false });
    expect(result.foundingDiscount).toBe(0);
    expect(result.subtotal).toBe(180);
  });
});

/* ════════════════════════════════════════════════
   GROUP 7 — Add-ons (3 tests)
   ════════════════════════════════════════════════ */

describe('GROUP 7 — Add-ons', () => {
  it('single add-on (oven $35)', () => {
    const result = calc({ addons: new Set(['oven'] as AddonKey[]) });
    expect(result.addonsTotal).toBe(35);
    expect(result.addonItems).toHaveLength(1);
    expect(result.subtotal).toBe(180 + 35);
  });

  it('multiple add-ons (oven + fridge + baseboards = $85)', () => {
    const result = calc({ addons: new Set(['oven', 'fridge', 'baseboards'] as AddonKey[]) });
    expect(result.addonsTotal).toBe(85);
    expect(result.addonItems).toHaveLength(3);
    expect(result.subtotal).toBe(180 + 85);
  });

  it('no add-ons → $0', () => {
    const result = calc({ addons: new Set<AddonKey>() });
    expect(result.addonsTotal).toBe(0);
    expect(result.addonItems).toHaveLength(0);
  });
});

/* ════════════════════════════════════════════════
   GROUP 8 — Tax (2 tests)
   taxAmount = Math.round(subtotal * taxRate * 100) / 100
   ════════════════════════════════════════════════ */

describe('GROUP 8 — Tax', () => {
  it('10.2% tax on $180 subtotal = $18.36', () => {
    const result = calc();
    expect(result.taxRate).toBe(0.102);
    expect(result.taxAmount).toBe(18.36);
    expect(result.total).toBe(198.36);
  });

  it('tax applied after founding discount', () => {
    // subtotal = 180 - 18 (founding) = 162
    // tax = Math.round(162 * 0.102 * 100) / 100 = Math.round(1652.4) / 100 = 16.52
    const result = calc({ foundingDiscountEligible: true });
    expect(result.subtotal).toBe(162);
    expect(result.taxAmount).toBe(16.52);
    expect(result.total).toBe(178.52);
  });
});

/* ════════════════════════════════════════════════
   GROUP 9 — Full Stack Scenarios (5 tests)
   ════════════════════════════════════════════════ */

describe('GROUP 9 — Full Stack Scenarios', () => {
  it('Scenario A — Simple: Standard 3BR, 1 bath, standard, no extras', () => {
    const result = calc();
    expect(result.base).toBe(180);
    expect(result.bathroomSurcharge).toBe(0);
    expect(result.conditionMultiplier).toBe(1.0);
    expect(result.petsSurcharge).toBe(0);
    expect(result.firstVisitPremium).toBe(0);
    expect(result.foundingDiscount).toBe(0);
    expect(result.addonsTotal).toBe(0);
    expect(result.subtotal).toBe(180);
    expect(result.taxAmount).toBe(18.36);
    expect(result.total).toBe(198.36);
  });

  it('Scenario B — Moderate First-Timer with founding discount', () => {
    // Standard 3BR, 2 bath, moderate (no-pet variant, score 4), 1 shedding pet via intake, first visit, founding
    const intake: IntakeAnswers = {
      lastProfessionalClean: '6-12-months', // 2
      petSituation: '1-pet-shedding',       // 1 (triggers pet surcharge)
      visibleBuildup: 'some-areas',         // 1
      clutterLevel: 'minimal',              // 0
      hasYoungChildren: 'no',               // 0
      flooringType: 'hard-surface',         // 0
    }; // score = 4 → MODERATE ×1.1
    const result = calc({
      bathrooms: 2 as Bathrooms,
      intake,
      isFirstVisit: true,
      foundingDiscountEligible: true,
    });
    // base = 180, bathSurcharge = 20
    // adjustedBase = Math.round((180 + 20) * 1.1 + 15) = Math.round(220 + 15) = 235
    expect(result.base).toBe(180);
    expect(result.bathroomSurcharge).toBe(20);
    expect(result.conditionMultiplier).toBe(1.1);
    expect(result.petsSurcharge).toBe(15);
    // firstVisitPremium = Math.round(235 * 15 / 100) = 35
    expect(result.firstVisitPremium).toBe(35);
    // preDiscountSubtotal = 235 + 35 + 0 = 270
    // foundingDiscount = Math.round(270 * 10 / 100) = 27
    expect(result.foundingDiscount).toBe(27);
    // subtotal = 270 - 27 = 243
    expect(result.subtotal).toBe(243);
    // tax = Math.round(243 * 0.102 * 100) / 100 = 24.79
    expect(result.taxAmount).toBe(24.79);
    expect(result.total).toBe(267.79);
  });

  it('Scenario C — Heavy Deep: Deep 4BR, 3 bath, heavy, oven+fridge+baseboards', () => {
    const heavyNoPet: IntakeAnswers = {
      lastProfessionalClean: 'over-year',   // 3
      petSituation: 'no-pets',              // 0
      visibleBuildup: 'some-areas',         // 1
      clutterLevel: 'moderate',             // 1
      hasYoungChildren: 'yes',              // 1
      flooringType: 'hard-surface',         // 0
    }; // score = 6 → HEAVY ×1.2
    const result = calc({
      serviceType: 'deep',
      bedrooms: 4 as Bedrooms,
      bathrooms: 3 as Bathrooms,
      intake: heavyNoPet,
      addons: new Set(['oven', 'fridge', 'baseboards'] as AddonKey[]),
    });
    // base = 425, bathSurcharge = 40
    // adjustedBase = Math.round((425 + 40) * 1.2 + 0) = Math.round(558) = 558
    expect(result.base).toBe(425);
    expect(result.bathroomSurcharge).toBe(40);
    expect(result.conditionMultiplier).toBe(1.2);
    expect(result.petsSurcharge).toBe(0);
    expect(result.firstVisitPremium).toBe(0);
    expect(result.addonsTotal).toBe(85);
    // subtotal = 558 + 0 + 85 = 643
    expect(result.subtotal).toBe(643);
    // tax = Math.round(643 * 0.102 * 100) / 100 = 65.59
    expect(result.taxAmount).toBe(65.59);
    expect(result.total).toBe(708.59);
  });

  it('Scenario D — Airbnb Quick: Airbnb 2BR, 1 bath, standard, minimal', () => {
    const result = calc({
      serviceType: 'airbnb',
      bedrooms: 2 as Bedrooms,
      bathrooms: 1 as Bathrooms,
    });
    expect(result.base).toBe(135);
    expect(result.subtotal).toBe(135);
    // tax = Math.round(135 * 0.102 * 100) / 100 = 13.77
    expect(result.taxAmount).toBe(13.77);
    expect(result.total).toBe(148.77);
  });

  it('Scenario E — Maximum Everything: Deep 4BR, 4 bath, extreme, pet, all addons, first visit, founding', () => {
    const extremeWithPet: IntakeAnswers = {
      lastProfessionalClean: 'never',       // 4
      petSituation: '1-pet-shedding',       // 1 (pet surcharge)
      visibleBuildup: 'multiple-areas',     // 2
      clutterLevel: 'heavy',               // 2
      hasYoungChildren: 'yes',              // 1
      flooringType: 'hard-surface',         // 0
    }; // score = 10 → EXTREME ×1.35
    const allAddons = new Set([
      'oven', 'fridge', 'cabinets', 'windows', 'laundry', 'dishes', 'baseboards',
      'wall-spot', 'garage', 'patio', 'green-products', 'same-day', 'early-morning', 'weekend',
    ] as AddonKey[]);
    const result = calc({
      serviceType: 'deep',
      bedrooms: 4 as Bedrooms,
      bathrooms: 4 as Bathrooms,
      intake: extremeWithPet,
      addons: allAddons,
      isFirstVisit: true,
      foundingDiscountEligible: true,
    });
    // base = 425, bathSurcharge = 60
    // adjustedBase = Math.round((425 + 60) * 1.35 + 15) = Math.round(654.75 + 15) = Math.round(669.75) = 670
    expect(result.base).toBe(425);
    expect(result.bathroomSurcharge).toBe(60);
    expect(result.conditionMultiplier).toBe(1.35);
    expect(result.petsSurcharge).toBe(15);
    // firstVisitPremium = Math.round(670 * 15/100) = Math.round(100.5) = 101
    expect(result.firstVisitPremium).toBe(101);
    // all addons = 35+30+30+35+15+10+20+15+25+30+10+50+15+20 = 340
    expect(result.addonsTotal).toBe(340);
    // preDiscountSubtotal = 670 + 101 + 340 = 1111
    // foundingDiscount = Math.round(1111 * 10/100) = 111
    expect(result.foundingDiscount).toBe(111);
    // subtotal = 1111 - 111 = 1000
    expect(result.subtotal).toBe(1000);
    // tax = Math.round(1000 * 0.102 * 100) / 100 = 102.00
    expect(result.taxAmount).toBe(102);
    expect(result.total).toBe(1102);
  });
});

/* ════════════════════════════════════════════════
   GROUP 10 — Operator Payout (3 tests)
   Not in calculatePrice — testing split math directly
   ════════════════════════════════════════════════ */

describe('GROUP 10 — Operator Payout', () => {
  const subtotal = 180; // Scenario A base

  it('Standard tier (70% to operator): $126', () => {
    expect(Math.round(subtotal * 0.70 * 100) / 100).toBe(126);
  });

  it('Preferred tier (75% to operator): $135', () => {
    expect(Math.round(subtotal * 0.75 * 100) / 100).toBe(135);
  });

  it('Elite tier (78% to operator): $140.40', () => {
    expect(Math.round(subtotal * 0.78 * 100) / 100).toBe(140.40);
  });
});

/* ════════════════════════════════════════════════
   GROUP 11 — Edge Cases (4 tests)
   ════════════════════════════════════════════════ */

describe('GROUP 11 — Edge Cases', () => {
  it('empty addon set works fine', () => {
    const result = calc({ addons: new Set<AddonKey>() });
    expect(result.addonsTotal).toBe(0);
    expect(result.addonItems).toHaveLength(0);
  });

  it('incomplete intake answers default score to 0 (STANDARD tier)', () => {
    const incomplete: IntakeAnswers = {
      lastProfessionalClean: '',
      petSituation: '',
      visibleBuildup: '',
      clutterLevel: '',
      hasYoungChildren: '',
      flooringType: '',
    };
    const result = calc({ intake: incomplete });
    // calculateIntakeScore returns null → defaults to 0 → STANDARD
    expect(result.conditionScore).toBe(0);
    expect(result.conditionTier).toBe('STANDARD');
    expect(result.conditionMultiplier).toBe(1.0);
  });

  it('1.5 bathrooms → floor to 1 → 0 extra → $0 surcharge', () => {
    const result = calc({ bathrooms: 1.5 as Bathrooms });
    expect(result.bathroomSurcharge).toBe(0);
  });

  it('founding discount with 0% configured → $0 discount', () => {
    const result = calc(
      { foundingDiscountEligible: true },
      { foundingDiscountPercent: 0 },
    );
    expect(result.foundingDiscount).toBe(0);
  });
});
