import { describe, it, expect } from 'vitest';
import { calculatePrice, type PricingConfig } from '../pricing';
import type { ServiceType, Bedrooms, Bathrooms, AddonKey, IntakeAnswers, AirbnbIntakeAnswers, PostConstructionIntakeAnswers } from '../types';
import {
  calculateAirbnbIntakeScore,
  calculatePostConstructionIntakeScore,
  airbnbHasPets,
  getAirbnbAutoAddons,
  getPostConstructionAutoAddons,
} from '../intake-scoring';

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

// Score 10 → EXTREME (multiplier 1.50)
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

  it('HEAVY tier (×1.25): $225', () => {
    const heavyNoPet: IntakeAnswers = {
      lastProfessionalClean: 'over-year',   // 3
      petSituation: 'no-pets',              // 0
      visibleBuildup: 'some-areas',         // 1
      clutterLevel: 'moderate',             // 1
      hasYoungChildren: 'yes',              // 1
      flooringType: 'hard-surface',         // 0
    }; // score = 6, no pets
    const result = calc({ intake: heavyNoPet });
    expect(result.subtotal).toBe(225);
    expect(result.conditionMultiplier).toBe(1.25);
  });

  it('EXTREME tier (×1.50): $270', () => {
    const extremeNoPet: IntakeAnswers = {
      lastProfessionalClean: 'never',       // 4
      petSituation: 'no-pets',              // 0
      visibleBuildup: 'multiple-areas',     // 2
      clutterLevel: 'heavy',               // 2
      hasYoungChildren: 'yes',              // 1
      flooringType: 'hard-surface',         // 0
    }; // score = 9, no pets
    const result = calc({ intake: extremeNoPet });
    expect(result.subtotal).toBe(270);
    expect(result.conditionMultiplier).toBe(1.5);
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
    }; // score = 6 → HEAVY ×1.25
    const result = calc({
      serviceType: 'deep',
      bedrooms: 4 as Bedrooms,
      bathrooms: 3 as Bathrooms,
      intake: heavyNoPet,
      addons: new Set(['oven', 'fridge', 'baseboards'] as AddonKey[]),
    });
    // base = 425, bathSurcharge = 40
    // adjustedBase = Math.round((425 + 40) * 1.25 + 0) = Math.round(581.25) = 581
    expect(result.base).toBe(425);
    expect(result.bathroomSurcharge).toBe(40);
    expect(result.conditionMultiplier).toBe(1.25);
    expect(result.petsSurcharge).toBe(0);
    expect(result.firstVisitPremium).toBe(0);
    expect(result.addonsTotal).toBe(85);
    // subtotal = 581 + 0 + 85 = 666
    expect(result.subtotal).toBe(666);
    // tax = Math.round(666 * 0.102 * 100) / 100 = 67.93
    expect(result.taxAmount).toBe(67.93);
    expect(result.total).toBeCloseTo(733.93, 2);
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
    }; // score = 10 → EXTREME ×1.50
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
    // adjustedBase = Math.round((425 + 60) * 1.50 + 15) = Math.round(727.5 + 15) = Math.round(742.5) = 743
    expect(result.base).toBe(425);
    expect(result.bathroomSurcharge).toBe(60);
    expect(result.conditionMultiplier).toBe(1.5);
    expect(result.petsSurcharge).toBe(15);
    // firstVisitPremium = Math.round(743 * 15/100) = Math.round(111.45) = 111
    expect(result.firstVisitPremium).toBe(111);
    // all addons = 35+30+30+35+15+10+20+15+25+30+10+50+15+20 = 340
    expect(result.addonsTotal).toBe(340);
    // preDiscountSubtotal = 743 + 111 + 340 = 1194
    // foundingDiscount = Math.round(1194 * 10/100) = Math.round(119.4) = 119
    expect(result.foundingDiscount).toBe(119);
    // subtotal = 1194 - 119 = 1075
    expect(result.subtotal).toBe(1075);
    // tax = Math.round(1075 * 0.102 * 100) / 100 = 109.65
    expect(result.taxAmount).toBe(109.65);
    expect(result.total).toBe(1184.65);
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

/* ════════════════════════════════════════════════
   GROUP 12 — Airbnb Intake Scoring (6 tests)
   ════════════════════════════════════════════════ */

// Airbnb intake presets
const airbnbMinimal: AirbnbIntakeAnswers = {
  guestCount: '1-2',              // 0
  postCheckoutCondition: 'tidy',  // 0
  petsAllowed: 'no',              // 0
  bathroomCount: '1',             // 0
  linenChange: 'no',              // 0
  sameDayTurnaround: 'no',        // 0
}; // score = 0 → STANDARD

const airbnbModerate: AirbnbIntakeAnswers = {
  guestCount: '3-4',              // 1
  postCheckoutCondition: 'average', // 1
  petsAllowed: 'yes',             // 2
  bathroomCount: '1',             // 0
  linenChange: 'no',              // 0
  sameDayTurnaround: 'no',        // 0
}; // score = 4 → MODERATE

const airbnbWorstCase: AirbnbIntakeAnswers = {
  guestCount: '7-plus',           // 3
  postCheckoutCondition: 'trashed', // 3
  petsAllowed: 'yes',             // 2
  bathroomCount: '4-plus',        // 3
  linenChange: 'yes',             // 1
  sameDayTurnaround: 'yes',       // 1
}; // score = 13 → EXTREME

describe('GROUP 12 — Airbnb Intake Scoring', () => {
  it('minimal Airbnb answers → score 0 → STANDARD', () => {
    const score = calculateAirbnbIntakeScore(airbnbMinimal);
    expect(score).toBe(0);
  });

  it('moderate Airbnb answers → score 4 → MODERATE', () => {
    const score = calculateAirbnbIntakeScore(airbnbModerate);
    expect(score).toBe(4);
  });

  it('worst-case Airbnb answers → score 13 → EXTREME', () => {
    const score = calculateAirbnbIntakeScore(airbnbWorstCase);
    expect(score).toBe(13);
  });

  it('incomplete Airbnb answers → null', () => {
    const incomplete: AirbnbIntakeAnswers = {
      guestCount: '1-2',
      postCheckoutCondition: '',
      petsAllowed: '',
      bathroomCount: '',
      linenChange: '',
      sameDayTurnaround: '',
    };
    expect(calculateAirbnbIntakeScore(incomplete)).toBeNull();
  });

  it('airbnbHasPets returns true when pets allowed', () => {
    expect(airbnbHasPets(airbnbModerate)).toBe(true);
    expect(airbnbHasPets(airbnbMinimal)).toBe(false);
  });

  it('getAirbnbAutoAddons returns laundry and same-day when selected', () => {
    const addons = getAirbnbAutoAddons(airbnbWorstCase);
    expect(addons.has('laundry')).toBe(true);
    expect(addons.has('same-day')).toBe(true);
    expect(addons.size).toBe(2);

    const noAddons = getAirbnbAutoAddons(airbnbMinimal);
    expect(noAddons.size).toBe(0);
  });
});

/* ════════════════════════════════════════════════
   GROUP 13 — Airbnb Pricing with Overrides (4 tests)
   ════════════════════════════════════════════════ */

describe('GROUP 13 — Airbnb Pricing with Overrides', () => {
  it('Airbnb 2BR, standard condition (score override 0), no pets', () => {
    const result = calc({
      serviceType: 'airbnb',
      bedrooms: 2 as Bedrooms,
      bathrooms: 1 as Bathrooms,
      conditionScoreOverride: 0,
      hasPetsOverride: false,
    });
    expect(result.base).toBe(135);
    expect(result.conditionTier).toBe('STANDARD');
    expect(result.conditionMultiplier).toBe(1.0);
    expect(result.petsSurcharge).toBe(0);
    expect(result.subtotal).toBe(135);
  });

  it('Airbnb 3BR, moderate condition (score override 4), pets allowed', () => {
    const result = calc({
      serviceType: 'airbnb',
      bedrooms: 3 as Bedrooms,
      bathrooms: 1 as Bathrooms,
      conditionScoreOverride: 4,
      hasPetsOverride: true,
    });
    // adjustedBase = Math.round((195 + 0) * 1.1 + 15) = Math.round(214.5 + 15) = Math.round(229.5) = 230
    expect(result.base).toBe(195);
    expect(result.conditionTier).toBe('MODERATE');
    expect(result.conditionMultiplier).toBe(1.1);
    expect(result.petsSurcharge).toBe(15);
    expect(result.subtotal).toBe(230);
  });

  it('Airbnb 4BR, extreme condition (score override 13), pets, first visit', () => {
    const result = calc({
      serviceType: 'airbnb',
      bedrooms: 4 as Bedrooms,
      bathrooms: 2 as Bathrooms,
      conditionScoreOverride: 13,
      hasPetsOverride: true,
      isFirstVisit: true,
    });
    // base = 255, bathSurcharge = 20
    // adjustedBase = Math.round((255 + 20) * 1.5 + 15) = Math.round(412.5 + 15) = Math.round(427.5) = 428
    expect(result.base).toBe(255);
    expect(result.conditionTier).toBe('EXTREME');
    expect(result.conditionMultiplier).toBe(1.5);
    expect(result.petsSurcharge).toBe(15);
    // firstVisitPremium = Math.round(428 * 15/100) = Math.round(64.2) = 64
    expect(result.firstVisitPremium).toBe(64);
    // subtotal = 428 + 64 = 492
    expect(result.subtotal).toBe(492);
  });

  it('conditionScoreOverride takes precedence over residential intake', () => {
    // Pass extreme residential intake but override score to 0
    const result = calc({
      intake: extremeIntake,
      conditionScoreOverride: 0,
    });
    expect(result.conditionTier).toBe('STANDARD');
    expect(result.conditionMultiplier).toBe(1.0);
  });
});

/* ════════════════════════════════════════════════
   GROUP 14 — Post-Construction Intake Scoring (6 tests)
   ════════════════════════════════════════════════ */

const pcMinimal: PostConstructionIntakeAnswers = {
  constructionType: 'minor-remodel',  // 0
  dustDebrisLevel: 'light',           // 0
  paintAdhesiveResidue: 'none',       // 0
  bathroomCount: '1',                 // 0
  windowsCleaning: 'no',              // 0
  deadlineUrgency: 'no-rush',         // 0
}; // score = 0 → STANDARD

const pcModerate: PostConstructionIntakeAnswers = {
  constructionType: 'kitchen-bath',   // 1
  dustDebrisLevel: 'moderate-dust',   // 1
  paintAdhesiveResidue: 'few-spots',  // 1
  bathroomCount: '2',                 // 1
  windowsCleaning: 'no',              // 0
  deadlineUrgency: 'within-week',     // 1
}; // score = 5 → MODERATE

const pcWorstCase: PostConstructionIntakeAnswers = {
  constructionType: 'full-gut',           // 3
  dustDebrisLevel: 'extreme-debris',      // 3
  paintAdhesiveResidue: 'multiple-areas', // 2
  bathroomCount: '4-plus',               // 3
  windowsCleaning: 'yes',                // 1
  deadlineUrgency: 'within-48hrs',       // 2
}; // score = 14 → EXTREME

describe('GROUP 14 — Post-Construction Intake Scoring', () => {
  it('minimal post-construction answers → score 0 → STANDARD', () => {
    const score = calculatePostConstructionIntakeScore(pcMinimal);
    expect(score).toBe(0);
  });

  it('moderate post-construction answers → score 5 → MODERATE', () => {
    const score = calculatePostConstructionIntakeScore(pcModerate);
    expect(score).toBe(5);
  });

  it('worst-case post-construction answers → score 14 → EXTREME', () => {
    const score = calculatePostConstructionIntakeScore(pcWorstCase);
    expect(score).toBe(14);
  });

  it('incomplete post-construction answers → null', () => {
    const incomplete: PostConstructionIntakeAnswers = {
      constructionType: 'minor-remodel',
      dustDebrisLevel: '',
      paintAdhesiveResidue: '',
      bathroomCount: '',
      windowsCleaning: '',
      deadlineUrgency: '',
    };
    expect(calculatePostConstructionIntakeScore(incomplete)).toBeNull();
  });

  it('getPostConstructionAutoAddons returns windows when selected', () => {
    const addons = getPostConstructionAutoAddons(pcWorstCase);
    expect(addons.has('windows')).toBe(true);
    expect(addons.size).toBe(1);

    const noAddons = getPostConstructionAutoAddons(pcMinimal);
    expect(noAddons.size).toBe(0);
  });

  it('Post-construction 3BR pricing with score override → MODERATE ×1.1', () => {
    const result = calc({
      serviceType: 'post-construction',
      bedrooms: 3 as Bedrooms,
      bathrooms: 1 as Bathrooms,
      conditionScoreOverride: 5,
      hasPetsOverride: false,
    });
    // base = 390, bathSurcharge = 0
    // adjustedBase = Math.round((390 + 0) * 1.1 + 0) = Math.round(429) = 429
    expect(result.base).toBe(390);
    expect(result.conditionTier).toBe('MODERATE');
    expect(result.conditionMultiplier).toBe(1.1);
    expect(result.petsSurcharge).toBe(0);
    expect(result.subtotal).toBe(429);
  });
});
