import type {
  BookingFormData,
  Bedrooms,
  Bathrooms,
  SqftRange,
  IntakeAnswers,
  AirbnbIntakeAnswers,
  PostConstructionIntakeAnswers,
  ServiceType,
} from '../lib/types';
import {
  lastProfessionalCleanOptions,
  petSituationOptions,
  visibleBuildupOptions,
  clutterLevelOptions,
  hasYoungChildrenOptions,
  flooringTypeOptions,
  airbnbGuestCountOptions,
  airbnbPostCheckoutConditionOptions,
  airbnbPetsAllowedOptions,
  airbnbBathroomCountOptions,
  airbnbLinenChangeOptions,
  airbnbSameDayTurnaroundOptions,
  constructionTypeOptions,
  dustDebrisLevelOptions,
  paintAdhesiveResidueOptions,
  postConstructionBathroomOptions,
  windowsCleaningOptions,
  deadlineUrgencyOptions,
  calculateIntakeScore,
  calculateAirbnbIntakeScore,
  calculatePostConstructionIntakeScore,
  getTierFromScore,
  type IntakeOption,
} from '../lib/intake-scoring';

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

interface Props {
  data: BookingFormData;
  onChange: (updates: Partial<BookingFormData>) => void;
  serviceType: ServiceType | '';
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

function IntakeSelect<T extends string>({
  label,
  options,
  value,
  onSelect,
}: {
  label: string;
  options: IntakeOption<T>[];
  value: T | '';
  onSelect: (v: T) => void;
}) {
  return (
    <div>
      <span className="block font-body text-sm font-medium text-charcoal mb-2">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              className={`px-4 py-2 rounded-md font-body text-sm font-medium transition-all duration-200 text-left ${
                selected
                  ? 'bg-forest text-warm-white'
                  : 'bg-cream text-charcoal hover:bg-cream-dark'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Step2HomeDetails({ data, onChange, serviceType }: Props) {
  const isAirbnb = serviceType === 'airbnb';
  const isPostConstruction = serviceType === 'post-construction';

  const handleIntakeChange = <K extends keyof IntakeAnswers>(field: K, value: IntakeAnswers[K]) => {
    onChange({ intake: { ...data.intake, [field]: value } });
  };

  const handleAirbnbIntakeChange = <K extends keyof AirbnbIntakeAnswers>(field: K, value: AirbnbIntakeAnswers[K]) => {
    onChange({ airbnbIntake: { ...data.airbnbIntake, [field]: value } });
  };

  const handlePostConstructionIntakeChange = <K extends keyof PostConstructionIntakeAnswers>(field: K, value: PostConstructionIntakeAnswers[K]) => {
    onChange({ postConstructionIntake: { ...data.postConstructionIntake, [field]: value } });
  };

  const score = isAirbnb
    ? calculateAirbnbIntakeScore(data.airbnbIntake)
    : isPostConstruction
      ? calculatePostConstructionIntakeScore(data.postConstructionIntake)
      : calculateIntakeScore(data.intake);
  const tier = score !== null ? getTierFromScore(score) : null;

  return (
    <div>
      <h2 className="font-display font-semibold text-2xl text-charcoal mb-2">
        {isAirbnb ? 'Tell us about your rental' : isPostConstruction ? 'Tell us about the project' : 'Tell us about your home'}
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

        {/* Intake questions — Airbnb-specific or residential */}
        <div className="border-t border-cream-dark pt-6">
          <h3 className="font-body font-semibold text-base text-charcoal mb-1">
            {isAirbnb ? 'Tell us about the turnover' : isPostConstruction ? 'Tell us about the construction' : 'Help us give you an accurate quote'}
          </h3>
          <p className="font-body text-sm text-charcoal-light mb-6">
            {isAirbnb
              ? 'These help us scope the turnaround correctly.'
              : isPostConstruction
                ? 'These help us scope the post-construction cleanup correctly.'
                : 'These help us match you with the right cleaning professional.'}
          </p>

          {isPostConstruction ? (
            <div className="space-y-6">
              <IntakeSelect
                label="What type of construction was done?"
                options={constructionTypeOptions}
                value={data.postConstructionIntake.constructionType}
                onSelect={(v) => handlePostConstructionIntakeChange('constructionType', v)}
              />

              <IntakeSelect
                label="How much dust and debris is present?"
                options={dustDebrisLevelOptions}
                value={data.postConstructionIntake.dustDebrisLevel}
                onSelect={(v) => handlePostConstructionIntakeChange('dustDebrisLevel', v)}
              />

              <IntakeSelect
                label="Are there paint splatters, adhesive, or sticker residue to remove?"
                options={paintAdhesiveResidueOptions}
                value={data.postConstructionIntake.paintAdhesiveResidue}
                onSelect={(v) => handlePostConstructionIntakeChange('paintAdhesiveResidue', v)}
              />

              <IntakeSelect
                label="How many bathrooms?"
                options={postConstructionBathroomOptions}
                value={data.postConstructionIntake.bathroomCount}
                onSelect={(v) => handlePostConstructionIntakeChange('bathroomCount', v)}
              />

              <IntakeSelect
                label="Do windows need interior cleaning?"
                options={windowsCleaningOptions}
                value={data.postConstructionIntake.windowsCleaning}
                onSelect={(v) => handlePostConstructionIntakeChange('windowsCleaning', v)}
              />

              <IntakeSelect
                label="Is there a deadline (e.g., move-in date, inspection)?"
                options={deadlineUrgencyOptions}
                value={data.postConstructionIntake.deadlineUrgency}
                onSelect={(v) => handlePostConstructionIntakeChange('deadlineUrgency', v)}
              />
            </div>
          ) : isAirbnb ? (
            <div className="space-y-6">
              <IntakeSelect
                label="How many guests stayed?"
                options={airbnbGuestCountOptions}
                value={data.airbnbIntake.guestCount}
                onSelect={(v) => handleAirbnbIntakeChange('guestCount', v)}
              />

              <IntakeSelect
                label="Post-checkout condition?"
                options={airbnbPostCheckoutConditionOptions}
                value={data.airbnbIntake.postCheckoutCondition}
                onSelect={(v) => handleAirbnbIntakeChange('postCheckoutCondition', v)}
              />

              <IntakeSelect
                label="Are pets allowed in the rental?"
                options={airbnbPetsAllowedOptions}
                value={data.airbnbIntake.petsAllowed}
                onSelect={(v) => handleAirbnbIntakeChange('petsAllowed', v)}
              />

              <IntakeSelect
                label="How many bathrooms need cleaning?"
                options={airbnbBathroomCountOptions}
                value={data.airbnbIntake.bathroomCount}
                onSelect={(v) => handleAirbnbIntakeChange('bathroomCount', v)}
              />

              <IntakeSelect
                label="Do linens need to be washed and changed?"
                options={airbnbLinenChangeOptions}
                value={data.airbnbIntake.linenChange}
                onSelect={(v) => handleAirbnbIntakeChange('linenChange', v)}
              />

              <IntakeSelect
                label="Is this a same-day turnaround?"
                options={airbnbSameDayTurnaroundOptions}
                value={data.airbnbIntake.sameDayTurnaround}
                onSelect={(v) => handleAirbnbIntakeChange('sameDayTurnaround', v)}
              />
            </div>
          ) : (
            <div className="space-y-6">
              <IntakeSelect
                label="When was your home last professionally cleaned?"
                options={lastProfessionalCleanOptions}
                value={data.intake.lastProfessionalClean}
                onSelect={(v) => handleIntakeChange('lastProfessionalClean', v)}
              />

              <IntakeSelect
                label="Do you have pets?"
                options={petSituationOptions}
                value={data.intake.petSituation}
                onSelect={(v) => handleIntakeChange('petSituation', v)}
              />

              <IntakeSelect
                label="Are there areas with visible buildup?"
                options={visibleBuildupOptions}
                value={data.intake.visibleBuildup}
                onSelect={(v) => handleIntakeChange('visibleBuildup', v)}
              />

              <IntakeSelect
                label="How would you describe the clutter level?"
                options={clutterLevelOptions}
                value={data.intake.clutterLevel}
                onSelect={(v) => handleIntakeChange('clutterLevel', v)}
              />

              <IntakeSelect
                label="Do you have children under 10?"
                options={hasYoungChildrenOptions}
                value={data.intake.hasYoungChildren}
                onSelect={(v) => handleIntakeChange('hasYoungChildren', v)}
              />

              <IntakeSelect
                label="What's your primary flooring?"
                options={flooringTypeOptions}
                value={data.intake.flooringType}
                onSelect={(v) => handleIntakeChange('flooringType', v)}
              />
            </div>
          )}

          {tier && (
            <div className="mt-6 bg-forest/5 rounded-md px-4 py-3">
              <p className="font-body text-sm text-charcoal">
                {tier.friendlyMessage}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
