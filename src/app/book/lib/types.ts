export type ServiceType =
  | 'standard'
  | 'deep'
  | 'move'
  | 'airbnb'
  | 'post-construction';

export type Bedrooms = 1 | 2 | 3 | 4 | 5 | 6;
export type Bathrooms = 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4;
export type SqftRange = '<1000' | '1000-1500' | '1500-2000' | '2000-2500' | '2500-3000' | '3000+';
export type LastProfessionalClean =
  | 'within-month'
  | '1-3-months'
  | '3-6-months'
  | '6-12-months'
  | 'over-year'
  | 'never';

export type PetSituation =
  | 'no-pets'
  | '1-pet-non-shedding'
  | '1-pet-shedding'
  | '2-pets'
  | '3-plus-pets';

export type VisibleBuildup =
  | 'no-buildup'
  | 'some-areas'
  | 'multiple-areas';

export type ClutterLevel =
  | 'minimal'
  | 'moderate'
  | 'heavy';

export type HasYoungChildren = 'no' | 'yes';

export type FlooringType =
  | 'hard-surface'
  | 'mixed'
  | 'mostly-carpet';

export interface IntakeAnswers {
  lastProfessionalClean: LastProfessionalClean | '';
  petSituation: PetSituation | '';
  visibleBuildup: VisibleBuildup | '';
  clutterLevel: ClutterLevel | '';
  hasYoungChildren: HasYoungChildren | '';
  flooringType: FlooringType | '';
}

/* ─── Airbnb intake types ─── */

export type AirbnbGuestCount = '1-2' | '3-4' | '5-6' | '7-plus';
export type AirbnbPostCheckoutCondition = 'tidy' | 'average' | 'messy' | 'trashed';
export type AirbnbPetsAllowed = 'no' | 'yes';
export type AirbnbBathroomCount = '1' | '2' | '3' | '4-plus';
export type AirbnbLinenChange = 'no' | 'yes';
export type AirbnbSameDayTurnaround = 'no' | 'yes';

export interface AirbnbIntakeAnswers {
  guestCount: AirbnbGuestCount | '';
  postCheckoutCondition: AirbnbPostCheckoutCondition | '';
  petsAllowed: AirbnbPetsAllowed | '';
  bathroomCount: AirbnbBathroomCount | '';
  linenChange: AirbnbLinenChange | '';
  sameDayTurnaround: AirbnbSameDayTurnaround | '';
}

/* ─── Post-construction intake types ─── */

export type PostConstructionType = 'minor-remodel' | 'kitchen-bath' | 'major-remodel' | 'full-gut';
export type DustDebrisLevel = 'light' | 'moderate-dust' | 'heavy-dust' | 'extreme-debris';
export type PaintAdhesiveResidue = 'none' | 'few-spots' | 'multiple-areas';
export type PostConstructionBathrooms = '1' | '2' | '3' | '4-plus';
export type WindowsCleaning = 'no' | 'yes';
export type DeadlineUrgency = 'no-rush' | 'within-week' | 'within-48hrs';

export interface PostConstructionIntakeAnswers {
  constructionType: PostConstructionType | '';
  dustDebrisLevel: DustDebrisLevel | '';
  paintAdhesiveResidue: PaintAdhesiveResidue | '';
  bathroomCount: PostConstructionBathrooms | '';
  windowsCleaning: WindowsCleaning | '';
  deadlineUrgency: DeadlineUrgency | '';
}

export type ConditionTier = 'STANDARD' | 'MODERATE' | 'HEAVY' | 'EXTREME';

export type TimeSlot =
  | '8:00 AM'
  | '8:30 AM'
  | '9:00 AM'
  | '9:30 AM'
  | '10:00 AM'
  | '10:30 AM'
  | '11:00 AM'
  | '11:30 AM'
  | '12:00 PM'
  | '12:30 PM'
  | '1:00 PM'
  | '1:30 PM'
  | '2:00 PM'
  | '2:30 PM'
  | '3:00 PM';

export type AddonKey =
  | 'oven'
  | 'fridge'
  | 'cabinets'
  | 'windows'
  | 'laundry'
  | 'dishes'
  | 'baseboards'
  | 'wall-spot'
  | 'garage'
  | 'patio'
  | 'green-products'
  | 'same-day'
  | 'early-morning'
  | 'weekend';

export interface BookingFormData {
  serviceType: ServiceType | '';
  bedrooms: Bedrooms | null;
  bathrooms: Bathrooms | null;
  sqft: SqftRange | '';
  intake: IntakeAnswers;
  airbnbIntake: AirbnbIntakeAnswers;
  postConstructionIntake: PostConstructionIntakeAnswers;
  addons: Set<AddonKey>;
  date: string;
  timeSlot: TimeSlot | '';
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  instructions: string;
  smsConsent: boolean;
}

export const inputBase =
  'w-full bg-warm-white border border-cream-dark rounded-sm px-4 py-3 font-body text-[15px] text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors duration-200';
