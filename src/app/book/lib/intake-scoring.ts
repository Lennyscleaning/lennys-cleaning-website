import type {
  IntakeAnswers,
  AirbnbIntakeAnswers,
  PostConstructionIntakeAnswers,
  ConditionTier,
  LastProfessionalClean,
  PetSituation,
  VisibleBuildup,
  ClutterLevel,
  HasYoungChildren,
  FlooringType,
  AirbnbGuestCount,
  AirbnbPostCheckoutCondition,
  AirbnbPetsAllowed,
  AirbnbBathroomCount,
  AirbnbLinenChange,
  AirbnbSameDayTurnaround,
  PostConstructionType,
  DustDebrisLevel,
  PaintAdhesiveResidue,
  PostConstructionBathrooms,
  WindowsCleaning,
  DeadlineUrgency,
  AddonKey,
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
    multiplier: 1.25,
    friendlyLabel: 'Heavy',
    friendlyMessage: "Thanks for being upfront! We'll make sure your cleaning professional has plenty of time to do a thorough job.",
  },
  {
    tier: 'EXTREME',
    minScore: 9,
    maxScore: 13,
    multiplier: 1.5,
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

/* ═══════════════════════════════════════════════
   Airbnb intake questions & scoring
   ═══════════════════════════════════════════════ */

export const airbnbGuestCountOptions: IntakeOption<AirbnbGuestCount>[] = [
  { value: '1-2', label: '1–2 guests', score: 0 },
  { value: '3-4', label: '3–4 guests', score: 1 },
  { value: '5-6', label: '5–6 guests', score: 2 },
  { value: '7-plus', label: '7+ guests', score: 3 },
];

export const airbnbPostCheckoutConditionOptions: IntakeOption<AirbnbPostCheckoutCondition>[] = [
  { value: 'tidy', label: 'Tidy — guests were neat', score: 0 },
  { value: 'average', label: 'Average — normal wear', score: 1 },
  { value: 'messy', label: 'Messy — needs extra attention', score: 2 },
  { value: 'trashed', label: 'Trashed — party or heavy use', score: 3 },
];

export const airbnbPetsAllowedOptions: IntakeOption<AirbnbPetsAllowed>[] = [
  { value: 'no', label: 'No pets allowed', score: 0 },
  { value: 'yes', label: 'Yes, pets allowed', score: 2 },
];

export const airbnbBathroomCountOptions: IntakeOption<AirbnbBathroomCount>[] = [
  { value: '1', label: '1 bathroom', score: 0 },
  { value: '2', label: '2 bathrooms', score: 1 },
  { value: '3', label: '3 bathrooms', score: 2 },
  { value: '4-plus', label: '4+ bathrooms', score: 3 },
];

export const airbnbLinenChangeOptions: IntakeOption<AirbnbLinenChange>[] = [
  { value: 'no', label: 'No', score: 0 },
  { value: 'yes', label: 'Yes', score: 1 },
];

export const airbnbSameDayTurnaroundOptions: IntakeOption<AirbnbSameDayTurnaround>[] = [
  { value: 'no', label: 'No', score: 0 },
  { value: 'yes', label: 'Yes', score: 1 },
];

/* ─── Airbnb score lookups ─── */

const airbnbScoreMap: Record<string, Record<string, number>> = {
  guestCount: Object.fromEntries(airbnbGuestCountOptions.map((o) => [o.value, o.score])),
  postCheckoutCondition: Object.fromEntries(airbnbPostCheckoutConditionOptions.map((o) => [o.value, o.score])),
  petsAllowed: Object.fromEntries(airbnbPetsAllowedOptions.map((o) => [o.value, o.score])),
  bathroomCount: Object.fromEntries(airbnbBathroomCountOptions.map((o) => [o.value, o.score])),
  linenChange: Object.fromEntries(airbnbLinenChangeOptions.map((o) => [o.value, o.score])),
  sameDayTurnaround: Object.fromEntries(airbnbSameDayTurnaroundOptions.map((o) => [o.value, o.score])),
};

const AIRBNB_INTAKE_FIELDS = [
  'guestCount',
  'postCheckoutCondition',
  'petsAllowed',
  'bathroomCount',
  'linenChange',
  'sameDayTurnaround',
] as const;

/** Returns total Airbnb intake score, or null if any answer is missing. */
export function calculateAirbnbIntakeScore(answers: AirbnbIntakeAnswers): number | null {
  let total = 0;
  for (const field of AIRBNB_INTAKE_FIELDS) {
    const val = answers[field];
    if (!val) return null;
    const fieldScore = airbnbScoreMap[field]?.[val];
    if (fieldScore == null) return null;
    total += fieldScore;
  }
  return total;
}

/** Returns true if the Airbnb rental allows pets. */
export function airbnbHasPets(answers: AirbnbIntakeAnswers): boolean {
  return answers.petsAllowed === 'yes';
}

/** Returns add-on keys that should be auto-selected based on Airbnb intake answers. */
export function getAirbnbAutoAddons(answers: AirbnbIntakeAnswers): Set<AddonKey> {
  const addons = new Set<AddonKey>();
  if (answers.linenChange === 'yes') addons.add('laundry');
  if (answers.sameDayTurnaround === 'yes') addons.add('same-day');
  return addons;
}

/* ═══════════════════════════════════════════════
   Post-construction intake questions & scoring
   ═══════════════════════════════════════════════ */

export const constructionTypeOptions: IntakeOption<PostConstructionType>[] = [
  { value: 'minor-remodel', label: 'Minor remodel (one room)', score: 0 },
  { value: 'kitchen-bath', label: 'Kitchen or bath renovation', score: 1 },
  { value: 'major-remodel', label: 'Major remodel (multiple rooms)', score: 2 },
  { value: 'full-gut', label: 'Full gut renovation or new build', score: 3 },
];

export const dustDebrisLevelOptions: IntakeOption<DustDebrisLevel>[] = [
  { value: 'light', label: 'Light dust only', score: 0 },
  { value: 'moderate-dust', label: 'Moderate — visible on surfaces', score: 1 },
  { value: 'heavy-dust', label: 'Heavy — construction film on everything', score: 2 },
  { value: 'extreme-debris', label: 'Extreme — debris, dust, adhesive residue', score: 3 },
];

export const paintAdhesiveResidueOptions: IntakeOption<PaintAdhesiveResidue>[] = [
  { value: 'none', label: 'No', score: 0 },
  { value: 'few-spots', label: 'A few spots', score: 1 },
  { value: 'multiple-areas', label: 'Yes, in multiple areas', score: 2 },
];

export const postConstructionBathroomOptions: IntakeOption<PostConstructionBathrooms>[] = [
  { value: '1', label: '1 bathroom', score: 0 },
  { value: '2', label: '2 bathrooms', score: 1 },
  { value: '3', label: '3 bathrooms', score: 2 },
  { value: '4-plus', label: '4+ bathrooms', score: 3 },
];

export const windowsCleaningOptions: IntakeOption<WindowsCleaning>[] = [
  { value: 'no', label: 'No', score: 0 },
  { value: 'yes', label: 'Yes', score: 1 },
];

export const deadlineUrgencyOptions: IntakeOption<DeadlineUrgency>[] = [
  { value: 'no-rush', label: 'No rush', score: 0 },
  { value: 'within-week', label: 'Within a week', score: 1 },
  { value: 'within-48hrs', label: 'Within 48 hours', score: 2 },
];

/* ─── Post-construction score lookups ─── */

const postConstructionScoreMap: Record<string, Record<string, number>> = {
  constructionType: Object.fromEntries(constructionTypeOptions.map((o) => [o.value, o.score])),
  dustDebrisLevel: Object.fromEntries(dustDebrisLevelOptions.map((o) => [o.value, o.score])),
  paintAdhesiveResidue: Object.fromEntries(paintAdhesiveResidueOptions.map((o) => [o.value, o.score])),
  bathroomCount: Object.fromEntries(postConstructionBathroomOptions.map((o) => [o.value, o.score])),
  windowsCleaning: Object.fromEntries(windowsCleaningOptions.map((o) => [o.value, o.score])),
  deadlineUrgency: Object.fromEntries(deadlineUrgencyOptions.map((o) => [o.value, o.score])),
};

const POST_CONSTRUCTION_FIELDS = [
  'constructionType',
  'dustDebrisLevel',
  'paintAdhesiveResidue',
  'bathroomCount',
  'windowsCleaning',
  'deadlineUrgency',
] as const;

/** Returns total post-construction intake score, or null if any answer is missing. */
export function calculatePostConstructionIntakeScore(answers: PostConstructionIntakeAnswers): number | null {
  let total = 0;
  for (const field of POST_CONSTRUCTION_FIELDS) {
    const val = answers[field];
    if (!val) return null;
    const fieldScore = postConstructionScoreMap[field]?.[val];
    if (fieldScore == null) return null;
    total += fieldScore;
  }
  return total;
}

/** Returns add-on keys that should be auto-selected based on post-construction intake. */
export function getPostConstructionAutoAddons(answers: PostConstructionIntakeAnswers): Set<AddonKey> {
  const addons = new Set<AddonKey>();
  if (answers.windowsCleaning === 'yes') addons.add('windows');
  return addons;
}

/* ═══════════════════════════════════════════════
   Structured question definitions per service type
   ═══════════════════════════════════════════════ */

export interface IntakeQuestionDef {
  field: string;
  label: string;
  options: IntakeOption<string>[];
}

export const RESIDENTIAL_INTAKE_QUESTIONS: IntakeQuestionDef[] = [
  { field: 'lastProfessionalClean', label: 'When was your home last professionally cleaned?', options: lastProfessionalCleanOptions },
  { field: 'petSituation', label: 'Do you have pets?', options: petSituationOptions },
  { field: 'visibleBuildup', label: 'Are there areas with visible buildup?', options: visibleBuildupOptions },
  { field: 'clutterLevel', label: 'How would you describe the clutter level?', options: clutterLevelOptions },
  { field: 'hasYoungChildren', label: 'Do you have children under 10?', options: hasYoungChildrenOptions },
  { field: 'flooringType', label: "What's your primary flooring?", options: flooringTypeOptions },
];

export const AIRBNB_INTAKE_QUESTIONS: IntakeQuestionDef[] = [
  { field: 'guestCount', label: 'How many guests typically stay?', options: airbnbGuestCountOptions },
  { field: 'postCheckoutCondition', label: 'How would you describe the typical post-checkout condition?', options: airbnbPostCheckoutConditionOptions },
  { field: 'petsAllowed', label: 'Are pets allowed in the listing?', options: airbnbPetsAllowedOptions },
  { field: 'bathroomCount', label: 'How many bathrooms?', options: airbnbBathroomCountOptions },
  { field: 'linenChange', label: 'Do you need linens washed and changed?', options: airbnbLinenChangeOptions },
  { field: 'sameDayTurnaround', label: 'Same-day turnaround needed?', options: airbnbSameDayTurnaroundOptions },
];

export const POST_CONSTRUCTION_INTAKE_QUESTIONS: IntakeQuestionDef[] = [
  { field: 'constructionType', label: 'What type of construction was done?', options: constructionTypeOptions },
  { field: 'dustDebrisLevel', label: 'How much dust and debris is present?', options: dustDebrisLevelOptions },
  { field: 'paintAdhesiveResidue', label: 'Are there paint splatters, adhesive, or sticker residue to remove?', options: paintAdhesiveResidueOptions },
  { field: 'bathroomCount', label: 'How many bathrooms?', options: postConstructionBathroomOptions },
  { field: 'windowsCleaning', label: 'Do windows need interior cleaning?', options: windowsCleaningOptions },
  { field: 'deadlineUrgency', label: 'Is there a deadline (e.g., move-in date, inspection)?', options: deadlineUrgencyOptions },
];

/** Returns the right question set for a given service type. */
export function getQuestionsForServiceType(serviceType: string): IntakeQuestionDef[] {
  switch (serviceType) {
    case 'airbnb':
      return AIRBNB_INTAKE_QUESTIONS;
    case 'post-construction':
      return POST_CONSTRUCTION_INTAKE_QUESTIONS;
    default:
      return RESIDENTIAL_INTAKE_QUESTIONS;
  }
}
