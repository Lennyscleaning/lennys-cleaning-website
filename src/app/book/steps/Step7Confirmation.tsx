import type { BookingFormData, ServiceType } from '../lib/types';
import type { PriceBreakdown } from '../lib/pricing';

const serviceLabels: Record<ServiceType, string> = {
  standard: 'Standard cleaning',
  deep: 'Deep cleaning',
  move: 'Move-in / move-out',
  airbnb: 'Airbnb turnover',
  'post-construction': 'Post-construction',
};

interface Props {
  data: BookingFormData;
  price: PriceBreakdown | null;
}

export default function Step7Confirmation({ data, price }: Props) {
  return (
    <div className="text-center py-6">
      {/* Checkmark icon */}
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-forest/10 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-forest"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      <h2 className="font-display font-semibold text-2xl text-charcoal mb-3">
        Booking request submitted
      </h2>
      <p className="font-body text-[15px] text-charcoal-light mb-8 max-w-sm mx-auto">
        We&apos;ll confirm your booking within 2 hours. You&apos;ll receive a text
        at {data.phone || 'your number on file'}.
      </p>

      {/* Summary card */}
      <div className="bg-cream/50 rounded-md p-5 text-left max-w-sm mx-auto mb-8">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-body text-sm text-charcoal-light">Service</span>
            <span className="font-body text-sm font-medium text-charcoal">
              {data.serviceType ? serviceLabels[data.serviceType as ServiceType] : ''}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-body text-sm text-charcoal-light">Date</span>
            <span className="font-body text-sm font-medium text-charcoal">{data.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-body text-sm text-charcoal-light">Time</span>
            <span className="font-body text-sm font-medium text-charcoal">{data.timeSlot}</span>
          </div>
          {price && (
            <>
              {price.firstVisitPremium > 0 && (
                <div className="flex justify-between pt-2 mt-2 border-t border-cream-dark">
                  <span className="font-body text-sm text-charcoal-light">First Visit Assessment</span>
                  <span className="font-body text-sm font-medium text-charcoal">${price.firstVisitPremium.toFixed(2)}</span>
                </div>
              )}
              <div className={`flex justify-between ${price.firstVisitPremium > 0 ? 'pt-1' : 'pt-2 mt-2 border-t border-cream-dark'}`}>
                <span className="font-body text-sm font-semibold text-charcoal">Estimated total</span>
                <span className="font-body text-sm font-semibold text-forest">${price.total.toFixed(2)}</span>
              </div>
              {price.firstVisitPremium > 0 && (
                <p className="font-body text-xs text-charcoal-light mt-2">
                  Your cleaning specialist earns more on first visits to give your home the extra attention it deserves.
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <p className="font-body text-[15px] text-charcoal-light mb-1">
        Questions? Call{' '}
        <a
          href="tel:+12536003355"
          className="font-semibold text-forest hover:text-forest-dark transition-colors duration-200"
        >
          (253) 600-3355
        </a>
      </p>
      <p className="font-body text-[15px] text-charcoal-light">
        or email{' '}
        <a
          href="mailto:hello@lennyscleaning.com"
          className="font-semibold text-forest hover:text-forest-dark transition-colors duration-200"
        >
          hello@lennyscleaning.com
        </a>
      </p>
    </div>
  );
}
