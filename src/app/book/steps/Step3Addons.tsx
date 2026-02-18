import type { BookingFormData, AddonKey } from '../lib/types';
import { addonLabels } from '../lib/pricing';

const addonKeys: AddonKey[] = [
  'oven',
  'fridge',
  'cabinets',
  'windows',
  'laundry',
  'dishes',
  'baseboards',
  'wall-spot',
  'garage',
  'patio',
  'green-products',
  'same-day',
  'early-morning',
  'weekend',
];

interface Props {
  data: BookingFormData;
  onChange: (updates: Partial<BookingFormData>) => void;
  addonPrices?: Record<string, number>;
  addonNames?: Record<string, string>;
}

export default function Step3Addons({ data, onChange, addonPrices, addonNames }: Props) {
  const toggle = (key: AddonKey) => {
    const next = new Set(data.addons);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    onChange({ addons: next });
  };

  return (
    <div>
      <h2 className="font-display font-semibold text-2xl text-charcoal mb-2">
        Any extras?
      </h2>
      <p className="font-body text-[15px] text-charcoal-light mb-6">
        Add-ons are completely optional. Skip ahead if you don&apos;t need any.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {addonKeys.map((key) => {
          const checked = data.addons.has(key);
          const price = addonPrices?.[key];
          const label = addonNames?.[key] ?? addonLabels[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => toggle(key)}
              className={`flex items-center justify-between text-left rounded-md border-2 px-4 py-3 transition-all duration-200 ${
                checked
                  ? 'ring-2 ring-forest bg-cream border-forest'
                  : 'border-cream-dark bg-warm-white hover:border-forest/30'
              }`}
            >
              <span className="font-body text-sm font-medium text-charcoal">
                {label}
              </span>
              {price != null && (
                <span className="font-body text-sm text-charcoal-light ml-3 shrink-0">
                  +${price}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
