export type ServiceType =
  | 'standard'
  | 'deep'
  | 'move'
  | 'airbnb'
  | 'post-construction';

export type Bedrooms = 1 | 2 | 3 | 4 | 5 | 6;
export type Bathrooms = 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4;
export type SqftRange = '<1000' | '1000-1500' | '1500-2000' | '2000-2500' | '2500-3000' | '3000+';
export type Condition = 'normal' | 'lived-in' | 'heavy';
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
  condition: Condition | '';
  pets: boolean | null;
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
}

export const inputBase =
  'w-full bg-warm-white border border-cream-dark rounded-sm px-4 py-3 font-body text-[15px] text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors duration-200';
