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
}

export default function Step1ServiceType({ data, onChange }: Props) {
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
                {s.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
