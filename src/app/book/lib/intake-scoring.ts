import type {
  IntakeAnswers,
  ConditionTier,
  LastProfessionalClean,
  PetSituation,
  VisibleBuildup,
  ClutterLevel,
  HasYoungChildren,
  FlooringType,
} from './types';

/* ─── Option definitions ─── */

export interface IntakeOption<T extends string> {
  value: T;
  label: string;
  score: number;
}

export const lastProfessionalCleanOptions: IntakeOption<LastProfessionalClean>[] = [
  { value: 'within-month', label: 'Within the last month', score: 0 },
  { value: '1-3-months', label: '1–3 months ago', score: 0 },
  { value: '3-6-months', label: '3–6 months ago', score: 1 },
  { value: '6-12-months', label: '6–12 months ago', score: 2 },
  { value: 'over-year', label: 'Over a year ago', score: 3 },
  { value: 'never', label: 'Never', score: 4 },
];

export const petSituationOptions: IntakeOption<PetSituation>[] = [
  { value: 'no-pets', label: 'No pets', score: 0 },
  { value: '1-pet-non-shedding', label: '1 pet (non-shedding)', score: 0 },
  { value: '1-pet-shedding', label: '1 pet (shedding)', score: 1 },
  { value: '2-pets', label: '2 pets', score: 2 },
  { value: '3-plus-pets', label: '3+ pets', score: 3 },
];

export const visibleBuildupOptions: IntakeOption<VisibleBuildup>[] = [
  { value: 'no-buildup', label: 'No, surfaces are generally maintained', score: 0 },
  { value: 'some-areas', label: 'Some areas (1–2 rooms)', score: 1 },
  { value: 'multiple-areas', label: 'Yes, multiple areas', score: 2 },
];

export const clutterLevelOptions: IntakeOption<ClutterLevel>[] = [
  { value: 'minimal', label: 'Minimal — surfaces are mostly clear', score: 0 },
  { value: 'moderate', label: 'Moderate — some items on counters and floors', score: 1 },
  { value: 'heavy', label: 'Heavy — most surfaces have items that need to be moved', score: 2 },
];

export const hasYoungChildrenOptions: IntakeOption<HasYoungChildren>[] = [
  { value: 'no', label: 'No', score: 0 },
  { value: 'yes', label: 'Yes', score: 1 },
];

export const flooringTypeOptions: IntakeOption<FlooringType>[] = [
  { value: 'hard-surface', label: 'Mostly hard surface (hardwood, tile, vinyl)', score: 0 },
  { value: 'mixed', label: 'Mix of hard surface and carpet', score: 0 },
  { value: 'mostly-carpet', label: 'Mostly carpet', score: 1 },
];

/* ─── Tier config ─── */

export interface TierConfig {
  tier: ConditionTier;
  minScore: number;
  maxScore: number;
  multiplier: number;
  friendlyLabel: string;
  friendlyMessage: string;
}

export const DEFAULT_TIER_CONFIG: TierConfig[] = [
  {
    tier: 'STANDARD',
    minScore: 0,
    maxScore: 2,
    multiplier: 1.0,
    friendlyLabel: 'Standard',
    friendlyMessage: 'Your home sounds well-maintained! Standard pricing applies.',
  },
  {
    tier: 'MODERATE',
    minScore: 3,
    maxScore: 5,
    multiplier: 1.1,
    friendlyLabel: 'Moderate',
    friendlyMessage: "Got it — we'll allocate a bit of extra time for your home.",
  },
  {
    tier: 'HEAVY',
    minScore: 6,
    maxScore: 8,
    multiplier: 1.2,
    friendlyLabel: 'Heavy',
    friendlyMessage: "Thanks for being upfront! We'll make sure your cleaning professional has plenty of time to do a thorough job.",
  },
  {
    tier: 'EXTREME',
    minScore: 9,
    maxScore: 13,
    multiplier: 1.35,
    friendlyLabel: 'Intensive',
    friendlyMessage: "Your home needs some serious love — we'll price this to make sure your cleaning professional can do it right, not rushed.",
  },
];

/* ─── Score lookups ─── */

const scoreMap: Record<string, Record<string, number>> = {
  lastProfessionalClean: Object.fromEntries(lastProfessionalCleanOptions.map((o) => [o.value, o.score])),
  petSituation: Object.fromEntries(petSituationOptions.map((o) => [o.value, o.score])),
  visibleBuildup: Object.fromEntries(visibleBuildupOptions.map((o) => [o.value, o.score])),
  clutterLevel: Object.fromEntries(clutterLevelOptions.map((o) => [o.value, o.score])),
  hasYoungChildren: Object.fromEntries(hasYoungChildrenOptions.map((o) => [o.value, o.score])),
  flooringType: Object.fromEntries(flooringTypeOptions.map((o) => [o.value, o.score])),
};

const labelMap: Record<string, Record<string, string>> = {
  lastProfessionalClean: Object.fromEntries(lastProfessionalCleanOptions.map((o) => [o.value, o.label])),
  petSituation: Object.fromEntries(petSituationOptions.map((o) => [o.value, o.label])),
  visibleBuildup: Object.fromEntries(visibleBuildupOptions.map((o) => [o.value, o.label])),
  clutterLevel: Object.fromEntries(clutterLevelOptions.map((o) => [o.value, o.label])),
  hasYoungChildren: Object.fromEntries(hasYoungChildrenOptions.map((o) => [o.value, o.label])),
  flooringType: Object.fromEntries(flooringTypeOptions.map((o) => [o.value, o.label])),
};

/* ─── Functions ─── */

const INTAKE_FIELDS = [
  'lastProfessionalClean',
  'petSituation',
  'visibleBuildup',
  'clutterLevel',
  'hasYoungChildren',
  'flooringType',
] as const;

/** Returns total intake score, or null if any answer is missing. */
export function calculateIntakeScore(answers: IntakeAnswers): number | null {
  let total = 0;
  for (const field of INTAKE_FIELDS) {
    const val = answers[field];
    if (!val) return null;
    const fieldScore = scoreMap[field]?.[val];
    if (fieldScore == null) return null;
    total += fieldScore;
  }
  return total;
}

/** Returns the matching tier config for a given score. */
export function getTierFromScore(score: number, tierConfig?: TierConfig[]): TierConfig {
  const tiers = tierConfig ?? DEFAULT_TIER_CONFIG;
  for (const tier of tiers) {
    if (score >= tier.minScore && score <= tier.maxScore) return tier;
  }
  // Fallback to last tier if score exceeds all ranges
  return tiers[tiers.length - 1];
}

/** Returns true if the customer has any pets. */
export function hasPets(answers: IntakeAnswers): boolean {
  return answers.petSituation !== '' && answers.petSituation !== 'no-pets';
}

/** Builds a summary string for operator dispatch notes. */
export function buildIntakeSummary(answers: IntakeAnswers): string {
  const parts: string[] = [];
  for (const field of INTAKE_FIELDS) {
    const val = answers[field];
    if (!val) continue;
    const label = labelMap[field]?.[val] ?? val;
    const fieldLabel =
      field === 'lastProfessionalClean' ? 'Last pro clean' :
      field === 'petSituation' ? 'Pets' :
      field === 'visibleBuildup' ? 'Buildup' :
      field === 'clutterLevel' ? 'Clutter' :
      field === 'hasYoungChildren' ? 'Young children' :
      'Flooring';
    parts.push(`${fieldLabel}: ${label}`);
  }
  return parts.join(' | ');
}
