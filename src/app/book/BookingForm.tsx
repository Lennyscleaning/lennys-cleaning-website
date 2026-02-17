'use client';

import { useState, useMemo } from 'react';
import type { BookingFormData, ServiceType, Bedrooms, Bathrooms, Condition } from './lib/types';
import { calculatePrice } from './lib/pricing';
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
  'Contact',
  'Review',
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
        data.sqft !== '' &&
        data.condition !== '' &&
        data.pets !== null
      );
    case 3:
      return true;
    case 4:
      return data.date !== '' && data.timeSlot !== '';
    case 5:
      return (
        data.name.trim() !== '' &&
        data.email.trim() !== '' &&
        data.phone.trim() !== '' &&
        data.address.trim() !== '' &&
        data.zip.trim() !== ''
      );
    case 6:
      return true;
    default:
      return false;
  }
}

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BookingFormData>(initialData);

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
      return calculatePrice({
        serviceType: data.serviceType as ServiceType,
        bedrooms: data.bedrooms as Bedrooms,
        bathrooms: data.bathrooms as Bathrooms,
        condition: data.condition as Condition,
        pets: data.pets ?? false,
        addons: data.addons,
      });
    }
    return null;
  }, [data.serviceType, data.bedrooms, data.bathrooms, data.condition, data.pets, data.addons]);

  const canContinue = isStepValid(step, data);

  const handleNext = () => {
    if (step === 6) {
      // Submit
      console.log('Booking submitted:', {
        ...data,
        addons: Array.from(data.addons),
        estimatedTotal: price?.total ?? null,
      });
      setStep(7);
      return;
    }
    setStep((s) => Math.min(s + 1, 7));
  };

  const handleBack = () => {
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
      {step === 5 && <Step5ContactInfo data={data} onChange={handleChange} />}
      {step === 6 && <Step6Review data={data} price={price} />}
      {step === 7 && <Step7Confirmation data={data} />}

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
            disabled={!canContinue}
            className="btn-primary text-sm px-8 py-3 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {step === 6 ? 'Submit booking' : 'Continue'}
          </button>
        </div>
      )}
    </div>
  );
}
