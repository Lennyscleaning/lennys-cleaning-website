import type { BookingFormData, ServiceType } from '../lib/types';

const serviceLabels: Record<ServiceType, string> = {
  standard: 'Standard cleaning',
  deep: 'Deep cleaning',
  move: 'Move-in / move-out',
  airbnb: 'Airbnb turnover',
  'post-construction': 'Post-construction',
};

interface Props {
  data: BookingFormData;
}

export default function Step7Confirmation({ data }: Props) {
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
        Booking submitted
      </h2>
      <p className="font-body text-[15px] text-charcoal-light mb-8 max-w-sm mx-auto">
        We&apos;ll confirm your booking and final price within 2 hours during business hours.
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
        </div>
      </div>

      <p className="font-body text-[15px] text-charcoal-light mb-2">
        Questions? Give us a call:
      </p>
      <a
        href="tel:+12536003355"
        className="font-body text-lg font-semibold text-forest hover:text-forest-dark transition-colors duration-200"
      >
        (253) 600-3355
      </a>
    </div>
  );
}
