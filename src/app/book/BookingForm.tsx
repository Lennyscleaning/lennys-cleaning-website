'use client';

import { useState, useMemo, useEffect } from 'react';
import type { BookingFormData, ServiceType, Bedrooms, Bathrooms, AddonKey } from './lib/types';
import { calculatePrice, type PricingConfig } from './lib/pricing';
import {
  calculateIntakeScore,
  calculateAirbnbIntakeScore,
  calculatePostConstructionIntakeScore,
  airbnbHasPets,
  getAirbnbAutoAddons,
  getPostConstructionAutoAddons,
  type TierConfig,
} from './lib/intake-scoring';
import Step1ServiceType from './steps/Step1ServiceType';
import Step2HomeDetails from './steps/Step2HomeDetails';
import Step3Addons from './steps/Step3Addons';
import Step4Schedule from './steps/Step4Schedule';
import Step5ContactInfo from './steps/Step5ContactInfo';
import Step6Review from './steps/Step6Review';
import Step7Confirmation from './steps/Step7Confirmation';

const STEP_LABELS = [
  'Service',
  'Home',
  'Extras',
  'Schedule',
  'Review',
  'Contact',
];

const initialData: BookingFormData = {
  serviceType: '',
  bedrooms: null,
  bathrooms: null,
  sqft: '',
  intake: {
    lastProfessionalClean: '',
    petSituation: '',
    visibleBuildup: '',
    clutterLevel: '',
    hasYoungChildren: '',
    flooringType: '',
  },
  airbnbIntake: {
    guestCount: '',
    postCheckoutCondition: '',
    petsAllowed: '',
    bathroomCount: '',
    linenChange: '',
    sameDayTurnaround: '',
  },
  postConstructionIntake: {
    constructionType: '',
    dustDebrisLevel: '',
    paintAdhesiveResidue: '',
    bathroomCount: '',
    windowsCleaning: '',
    deadlineUrgency: '',
  },
  addons: new Set(),
  date: '',
  timeSlot: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  zip: '',
  instructions: '',
  smsConsent: false,
};

function isStepValid(step: number, data: BookingFormData): boolean {
  switch (step) {
    case 1:
      return data.serviceType !== '';
    case 2:
      if (data.serviceType === 'airbnb') {
        return (
          data.bedrooms !== null &&
          data.bathrooms !== null &&
          data.airbnbIntake.guestCount !== '' &&
          data.airbnbIntake.postCheckoutCondition !== '' &&
          data.airbnbIntake.petsAllowed !== '' &&
          data.airbnbIntake.bathroomCount !== '' &&
          data.airbnbIntake.linenChange !== '' &&
          data.airbnbIntake.sameDayTurnaround !== ''
        );
      }
      if (data.serviceType === 'post-construction') {
        return (
          data.bedrooms !== null &&
          data.bathrooms !== null &&
          data.postConstructionIntake.constructionType !== '' &&
          data.postConstructionIntake.dustDebrisLevel !== '' &&
          data.postConstructionIntake.paintAdhesiveResidue !== '' &&
          data.postConstructionIntake.bathroomCount !== '' &&
          data.postConstructionIntake.windowsCleaning !== '' &&
          data.postConstructionIntake.deadlineUrgency !== ''
        );
      }
      return (
        data.bedrooms !== null &&
        data.bathrooms !== null &&
        data.intake.lastProfessionalClean !== '' &&
        data.intake.petSituation !== '' &&
        data.intake.visibleBuildup !== '' &&
        data.intake.clutterLevel !== '' &&
        data.intake.hasYoungChildren !== '' &&
        data.intake.flooringType !== ''
      );
    case 3:
      return true;
    case 4:
      return data.date !== '' && data.timeSlot !== '';
    case 5:
      return true;
    case 6:
      return (
        data.name.trim() !== '' &&
        data.email.trim() !== '' &&
        data.phone.trim() !== '' &&
        data.address.trim() !== '' &&
        data.zip.trim() !== ''
      );
    default:
      return false;
  }
}

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BookingFormData>(initialData);
  const [pricingConfig, setPricingConfig] = useState<PricingConfig | null>(null);
  const [foundingDiscountEligible, setFoundingDiscountEligible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Fetch live pricing from Airtable on mount
  useEffect(() => {
    fetch('/api/pricing')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((apiData: {
        basePrices: Record<string, Record<number, number>>;
        addOns: { key: string; name: string; price: number }[];
        conditions: { key: string; name: string; multiplier: number }[];
        platformConfig: {
          defaultSalesTaxRate: number | null;
          extraBathroomSurcharge: number | null;
          firstCleanPremium: number | null;
          tierConfig?: TierConfig[];
          petSurcharge?: number | null;
          foundingDiscountEligible?: boolean;
          foundingDiscountPercent?: number;
          foundingSlotsRemaining?: number;
        };
      }) => {
        const addonPrices: Record<string, number> = {};
        const addonNames: Record<string, string> = {};
        for (const addon of apiData.addOns) {
          addonPrices[addon.key] = addon.price;
          addonNames[addon.key] = addon.name;
        }
        setPricingConfig({
          basePrices: apiData.basePrices,
          addonPrices,
          addonNames,
          tierConfig: apiData.platformConfig.tierConfig ?? undefined,
          petSurcharge: apiData.platformConfig.petSurcharge ?? undefined,
          taxRate: apiData.platformConfig.defaultSalesTaxRate ?? undefined,
          bathroomSurcharge: apiData.platformConfig.extraBathroomSurcharge ?? undefined,
          firstCleanPremium: apiData.platformConfig.firstCleanPremium ?? undefined,
          foundingDiscountPercent: apiData.platformConfig.foundingDiscountPercent ?? undefined,
        });
        setFoundingDiscountEligible(apiData.platformConfig.foundingDiscountEligible ?? false);
      })
      .catch(() => {
        // Pricing will remain null — user sees loading state until retry
      });
  }, []);

  const handleChange = (updates: Partial<BookingFormData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const isAirbnb = data.serviceType === 'airbnb';
  const isPostConstruction = data.serviceType === 'post-construction';

  const price = useMemo(() => {
    if (!data.serviceType || !data.bedrooms || !data.bathrooms || !pricingConfig) return null;

    if (isAirbnb) {
      const airbnbScore = calculateAirbnbIntakeScore(data.airbnbIntake);
      if (airbnbScore === null) return null;
      return calculatePrice(
        {
          serviceType: data.serviceType as ServiceType,
          bedrooms: data.bedrooms as Bedrooms,
          bathrooms: data.bathrooms as Bathrooms,
          intake: data.intake,
          addons: data.addons,
          isFirstVisit: true,
          foundingDiscountEligible,
          conditionScoreOverride: airbnbScore,
          hasPetsOverride: airbnbHasPets(data.airbnbIntake),
        },
        pricingConfig,
      );
    }

    if (isPostConstruction) {
      const pcScore = calculatePostConstructionIntakeScore(data.postConstructionIntake);
      if (pcScore === null) return null;
      return calculatePrice(
        {
          serviceType: data.serviceType as ServiceType,
          bedrooms: data.bedrooms as Bedrooms,
          bathrooms: data.bathrooms as Bathrooms,
          intake: data.intake,
          addons: data.addons,
          isFirstVisit: true,
          foundingDiscountEligible,
          conditionScoreOverride: pcScore,
          hasPetsOverride: false,
        },
        pricingConfig,
      );
    }

    if (calculateIntakeScore(data.intake) === null) return null;
    return calculatePrice(
      {
        serviceType: data.serviceType as ServiceType,
        bedrooms: data.bedrooms as Bedrooms,
        bathrooms: data.bathrooms as Bathrooms,
        intake: data.intake,
        addons: data.addons,
        isFirstVisit: true,
        foundingDiscountEligible,
      },
      pricingConfig,
    );
  }, [data.serviceType, data.bedrooms, data.bathrooms, data.intake, data.airbnbIntake, data.postConstructionIntake, data.addons, pricingConfig, foundingDiscountEligible, isAirbnb, isPostConstruction]);

  // Starting prices for Step 1 cards (1-bedroom base price per service type)
  const startingPrices = useMemo(() => {
    if (!pricingConfig?.basePrices) return undefined;
    const prices: Record<string, number> = {};
    for (const [key, matrix] of Object.entries(pricingConfig.basePrices)) {
      if (matrix[1] != null) prices[key] = matrix[1];
    }
    return Object.keys(prices).length > 0 ? prices : undefined;
  }, [pricingConfig]);

  // Auto-add add-ons based on intake answers (Airbnb or post-construction)
  const autoAddedAddons = useMemo(() => {
    if (isAirbnb) return getAirbnbAutoAddons(data.airbnbIntake);
    if (isPostConstruction) return getPostConstructionAutoAddons(data.postConstructionIntake);
    return new Set<AddonKey>();
  }, [isAirbnb, isPostConstruction, data.airbnbIntake, data.postConstructionIntake]);

  useEffect(() => {
    let autoKeys: Set<AddonKey>;
    if (isAirbnb) {
      autoKeys = getAirbnbAutoAddons(data.airbnbIntake);
    } else if (isPostConstruction) {
      autoKeys = getPostConstructionAutoAddons(data.postConstructionIntake);
    } else {
      return;
    }
    if (autoKeys.size === 0) return;
    setData((prev) => {
      const next = new Set(prev.addons);
      let changed = false;
      for (const key of autoKeys) {
        if (!next.has(key)) {
          next.add(key);
          changed = true;
        }
      }
      return changed ? { ...prev, addons: next } : prev;
    });
  }, [isAirbnb, isPostConstruction, data.airbnbIntake, data.postConstructionIntake]);

  const canContinue = isStepValid(step, data);

  const handleNext = async () => {
    if (step === 6) {
      setSubmitting(true);
      setSubmitError('');
      try {
        const res = await fetch('/api/waitlist/customer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            serviceType: data.serviceType,
            bedrooms: data.bedrooms ? String(data.bedrooms) : '',
            address: [data.address, data.city, data.zip].filter(Boolean).join(', '),
            preferredDate: data.date,
            notes: [
              data.timeSlot ? `Preferred time: ${data.timeSlot}` : '',
              data.instructions || '',
            ].filter(Boolean).join(' | '),
          }),
        });
        if (!res.ok) throw new Error();
        setStep(7);
      } catch {
        setSubmitError('Something went wrong. Please email us at hello@lennyscleaning.com.');
      } finally {
        setSubmitting(false);
      }
      return;
    }
    setStep((s) => Math.min(s + 1, 7));
  };

  const handleBack = () => {
    setSubmitError('');
    setStep((s) => Math.max(s - 1, 1));
  };

  return (
    <div>
      {/* Step 1 hero + trust signals */}
      {step === 1 && (
        <div className="text-center pt-12 mb-8">
          <h1 className="font-display font-semibold text-charcoal leading-tight tracking-tight text-[clamp(24px,4vw,32px)] mb-3">
            Book your cleaning in under 2 minutes
          </h1>
          <p className="font-body text-[15px] text-charcoal-light mb-6">
            Flat-rate pricing. No hidden fees. See your exact price before you commit.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-1.5 text-xs font-medium text-charcoal-light">
              <svg className="w-4 h-4 text-forest shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Background-checked
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-charcoal-light">
              <svg className="w-4 h-4 text-forest shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
              </svg>
              Flat-rate pricing
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-charcoal-light">
              <svg className="w-4 h-4 text-forest shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
              Satisfaction guaranteed
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-charcoal-light">
              <svg className="w-4 h-4 text-forest shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              Serving Tacoma &amp; beyond
            </span>
          </div>
        </div>
      )}

      {/* Progress bar — hidden on confirmation */}
      {step <= 6 && (
        <div className="mb-8">
          {/* Step labels */}
          <div className="flex justify-between mb-2">
            {STEP_LABELS.map((label, i) => (
              <span
                key={label}
                className={`font-body text-xs font-medium transition-colors duration-200 ${
                  i + 1 <= step ? 'text-forest' : 'text-charcoal-light/50'
                }`}
              >
                {label}
              </span>
            ))}
          </div>
          {/* Track */}
          <div className="h-1.5 bg-cream-dark rounded-full overflow-hidden">
            <div
              className="h-full bg-forest rounded-full transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Step content */}
      {step === 1 && <Step1ServiceType data={data} onChange={handleChange} startingPrices={startingPrices} />}
      {step === 2 && <Step2HomeDetails data={data} onChange={handleChange} serviceType={data.serviceType} />}
      {step === 3 && (
        <Step3Addons
          data={data}
          onChange={handleChange}
          addonPrices={pricingConfig?.addonPrices}
          addonNames={pricingConfig?.addonNames}
          autoAddedAddons={autoAddedAddons}
        />
      )}
      {step === 4 && <Step4Schedule data={data} onChange={handleChange} />}
      {step === 5 && <Step6Review data={data} price={price} />}
      {step === 6 && <Step5ContactInfo data={data} onChange={handleChange} />}
      {step === 7 && <Step7Confirmation />}

      {/* Error message */}
      {submitError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="font-body text-sm text-red-700">{submitError}</p>
        </div>
      )}

      {/* Navigation buttons — hidden on confirmation */}
      {step <= 6 && (
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="btn-outline text-sm px-6 py-3"
            >
              Back
            </button>
          ) : (
            <div />
          )}
          <button
            type="button"
            onClick={handleNext}
            disabled={!canContinue || submitting}
            className="btn-primary text-sm px-8 py-3 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {submitting ? 'Submitting...' : step === 6 ? 'Submit booking' : 'Continue'}
          </button>
        </div>
      )}
    </div>
  );
}
