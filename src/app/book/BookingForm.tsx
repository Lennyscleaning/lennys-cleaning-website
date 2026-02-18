'use client';

import { useState, useMemo, useEffect } from 'react';
import type { BookingFormData, ServiceType, Bedrooms, Bathrooms, Condition } from './lib/types';
import { calculatePrice, type PricingConfig } from './lib/pricing';
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
  condition: '',
  pets: null,
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
};

function isStepValid(step: number, data: BookingFormData): boolean {
  switch (step) {
    case 1:
      return data.serviceType !== '';
    case 2:
      return (
        data.bedrooms !== null &&
        data.bathrooms !== null &&
        data.condition !== '' &&
        data.pets !== null
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
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Fetch live pricing on mount — static data is used until this resolves
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
        };
      }) => {
        const addonPrices: Record<string, number> = {};
        const addonNames: Record<string, string> = {};
        for (const addon of apiData.addOns) {
          addonPrices[addon.key] = addon.price;
          addonNames[addon.key] = addon.name;
        }
        const condMults: Record<string, number> = {};
        for (const cond of apiData.conditions) {
          condMults[cond.key] = cond.multiplier;
        }
        setPricingConfig({
          basePrices: apiData.basePrices,
          addonPrices,
          addonNames,
          conditionMultipliers: condMults,
          taxRate: apiData.platformConfig.defaultSalesTaxRate ?? undefined,
          bathroomSurcharge: apiData.platformConfig.extraBathroomSurcharge ?? undefined,
        });
      })
      .catch(() => {
        // Static fallback — no action needed
      });
  }, []);

  const handleChange = (updates: Partial<BookingFormData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const price = useMemo(() => {
    if (
      data.serviceType &&
      data.bedrooms &&
      data.bathrooms &&
      data.condition
    ) {
      return calculatePrice(
        {
          serviceType: data.serviceType as ServiceType,
          bedrooms: data.bedrooms as Bedrooms,
          bathrooms: data.bathrooms as Bathrooms,
          condition: data.condition as Condition,
          pets: data.pets ?? false,
          addons: data.addons,
        },
        pricingConfig ?? undefined,
      );
    }
    return null;
  }, [data.serviceType, data.bedrooms, data.bathrooms, data.condition, data.pets, data.addons, pricingConfig]);

  const canContinue = isStepValid(step, data);

  const handleNext = async () => {
    if (step === 6) {
      setSubmitting(true);
      setSubmitError('');
      try {
        const res = await fetch('/api/book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            addons: Array.from(data.addons),
            subtotal: price?.subtotal ?? null,
            taxRate: price?.taxRate ?? null,
            taxAmount: price?.taxAmount ?? null,
            total: price?.total ?? null,
          }),
        });
        if (!res.ok) throw new Error();
        setStep(7);
      } catch {
        setSubmitError('Something went wrong. Please call us at (253) 600-3355.');
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
      {step === 1 && <Step1ServiceType data={data} onChange={handleChange} />}
      {step === 2 && <Step2HomeDetails data={data} onChange={handleChange} />}
      {step === 3 && <Step3Addons data={data} onChange={handleChange} />}
      {step === 4 && <Step4Schedule data={data} onChange={handleChange} />}
      {step === 5 && <Step6Review data={data} price={price} />}
      {step === 6 && <Step5ContactInfo data={data} onChange={handleChange} />}
      {step === 7 && <Step7Confirmation data={data} price={price} />}

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
