import type {
  BookingFormData,
  Bedrooms,
  Bathrooms,
  SqftRange,
  Condition,
} from '../lib/types';

const bedroomOptions: Bedrooms[] = [1, 2, 3, 4, 5, 6];
const bathroomOptions: Bathrooms[] = [1, 1.5, 2, 2.5, 3, 3.5, 4];
const sqftOptions: { value: SqftRange; label: string }[] = [
  { value: '<1000', label: 'Under 1,000 sq ft' },
  { value: '1000-1500', label: '1,000 – 1,500 sq ft' },
  { value: '1500-2000', label: '1,500 – 2,000 sq ft' },
  { value: '2000-2500', label: '2,000 – 2,500 sq ft' },
  { value: '2500-3000', label: '2,500 – 3,000 sq ft' },
  { value: '3000+', label: '3,000+ sq ft' },
];
const conditionOptions: { value: Condition; label: string; desc: string }[] = [
  { value: 'normal', label: 'Normal', desc: 'Regularly maintained' },
  { value: 'lived-in', label: 'Lived-in', desc: 'Needs some extra attention' },
  { value: 'heavy', label: 'Heavy', desc: 'Hasn\'t been cleaned in a while' },
];

interface Props {
  data: BookingFormData;
  onChange: (updates: Partial<BookingFormData>) => void;
}

function PillGroup<T extends string | number>({
  label,
  options,
  value,
  onSelect,
  format,
}: {
  label: string;
  options: T[];
  value: T | null;
  onSelect: (v: T) => void;
  format?: (v: T) => string;
}) {
  return (
    <div>
      <span className="block font-body text-sm font-medium text-charcoal mb-2">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <button
              key={String(opt)}
              type="button"
              onClick={() => onSelect(opt)}
              className={`px-4 py-2 rounded-md font-body text-sm font-medium transition-all duration-200 ${
                selected
                  ? 'bg-forest text-warm-white'
                  : 'bg-cream text-charcoal hover:bg-cream-dark'
              }`}
            >
              {format ? format(opt) : String(opt)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Step2HomeDetails({ data, onChange }: Props) {
  return (
    <div>
      <h2 className="font-display font-semibold text-2xl text-charcoal mb-2">
        Tell us about your home
      </h2>
      <p className="font-body text-[15px] text-charcoal-light mb-6">
        This helps us provide an accurate estimate.
      </p>
      <div className="space-y-6">
        <PillGroup
          label="Bedrooms"
          options={bedroomOptions}
          value={data.bedrooms}
          onSelect={(v) => onChange({ bedrooms: v })}
        />

        <PillGroup
          label="Bathrooms"
          options={bathroomOptions}
          value={data.bathrooms}
          onSelect={(v) => onChange({ bathrooms: v })}
          format={(v) => String(v)}
        />

        <div>
          <label htmlFor="sqft" className="block font-body text-sm font-medium text-charcoal mb-2">
            Square footage
          </label>
          <select
            id="sqft"
            value={data.sqft}
            onChange={(e) => onChange({ sqft: e.target.value as SqftRange })}
            className="w-full bg-warm-white border border-cream-dark rounded-sm px-4 py-3 font-body text-[15px] text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors duration-200 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%232C2C2C%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10"
          >
            <option value="" disabled>
              Select square footage
            </option>
            {sqftOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="block font-body text-sm font-medium text-charcoal mb-2">
            Home condition
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {conditionOptions.map((opt) => {
              const selected = data.condition === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange({ condition: opt.value })}
                  className={`text-left rounded-md border-2 px-4 py-3 transition-all duration-200 ${
                    selected
                      ? 'ring-2 ring-forest bg-cream border-forest'
                      : 'border-cream-dark bg-warm-white hover:border-forest/30'
                  }`}
                >
                  <span className="block font-body font-semibold text-sm text-charcoal">
                    {opt.label}
                  </span>
                  <span className="block font-body text-xs text-charcoal-light mt-0.5">
                    {opt.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <span className="block font-body text-sm font-medium text-charcoal mb-2">
            Do you have pets?
          </span>
          <div className="flex gap-3">
            {([true, false] as const).map((val) => {
              const selected = data.pets === val;
              return (
                <button
                  key={String(val)}
                  type="button"
                  onClick={() => onChange({ pets: val })}
                  className={`px-6 py-2 rounded-md font-body text-sm font-medium transition-all duration-200 ${
                    selected
                      ? 'bg-forest text-warm-white'
                      : 'bg-cream text-charcoal hover:bg-cream-dark'
                  }`}
                >
                  {val ? 'Yes' : 'No'}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
