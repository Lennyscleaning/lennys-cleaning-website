import type { BookingFormData, ServiceType } from '../lib/types';

const services: { value: ServiceType; label: string; desc: string }[] = [
  { value: 'standard', label: 'Standard cleaning', desc: 'Regular maintenance for a tidy home' },
  { value: 'deep', label: 'Deep cleaning', desc: 'Top-to-bottom scrub for every surface' },
  { value: 'move', label: 'Move-in / move-out', desc: 'Get your home spotless for the transition' },
  { value: 'airbnb', label: 'Airbnb turnover', desc: 'Quick turnaround between guests' },
  { value: 'post-construction', label: 'Post-construction', desc: 'Dust and debris removal after renovations' },
];

interface Props {
  data: BookingFormData;
  onChange: (updates: Partial<BookingFormData>) => void;
  startingPrices?: Record<string, number>;
}

export default function Step1ServiceType({ data, onChange, startingPrices }: Props) {
  return (
    <div>
      <h2 className="font-display font-semibold text-2xl text-charcoal mb-2">
        What type of cleaning do you need?
      </h2>
      <p className="font-body text-[15px] text-charcoal-light mb-6">
        Select the service that best fits your needs.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map((s) => {
          const selected = data.serviceType === s.value;
          const price = startingPrices?.[s.value];
          return (
            <button
              key={s.value}
              type="button"
              onClick={() => onChange({ serviceType: s.value })}
              className={`text-left rounded-md border-2 px-5 py-4 transition-all duration-200 ${
                selected
                  ? 'ring-2 ring-forest bg-cream border-forest'
                  : 'border-cream-dark bg-warm-white hover:border-forest/30'
              }`}
            >
              <span className="block font-body font-semibold text-[15px] text-charcoal">
                {s.label}
              </span>
              <span className="block font-body text-sm text-charcoal-light mt-0.5">
                {price ? <><span className="text-forest font-medium">From ${price}</span> &middot; </> : null}
                {s.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* Reassurance */}
      <p className="flex items-center justify-center gap-1.5 font-body text-xs text-charcoal-light/70 text-center mt-5">
        <svg className="w-3.5 h-3.5 text-forest shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
        Your exact price depends on home size and extras — you&apos;ll see the full breakdown before you book.
      </p>
    </div>
  );
}
