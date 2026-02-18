import type { BookingFormData, ServiceType } from '../lib/types';
import type { PriceBreakdown } from '../lib/pricing';
import { hasPets } from '../lib/intake-scoring';

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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-cream-dark last:border-0">
      <span className="font-body text-sm text-charcoal-light">{label}</span>
      <span className="font-body text-sm font-medium text-charcoal text-right">{value}</span>
    </div>
  );
}

export default function Step6Review({ data, price }: Props) {
  return (
    <div>
      <h2 className="font-display font-semibold text-2xl text-charcoal mb-2">
        Review your booking
      </h2>
      <p className="font-body text-[15px] text-charcoal-light mb-6">
        Make sure everything looks right before submitting.
      </p>

      <div className="space-y-6">
        {/* Service details */}
        <div className="bg-cream/50 rounded-md p-5">
          <h3 className="font-body font-semibold text-sm text-charcoal mb-3 uppercase tracking-wide">
            Service details
          </h3>
          <Row label="Service" value={data.serviceType ? serviceLabels[data.serviceType as ServiceType] : ''} />
          <Row label="Bedrooms" value={String(data.bedrooms)} />
          <Row label="Bathrooms" value={String(data.bathrooms)} />
          <Row label="Square footage" value={data.sqft} />
          <Row label="Condition" value={price?.conditionFriendlyLabel ?? ''} />
          <Row label="Pets" value={hasPets(data.intake) ? 'Yes' : 'No'} />
        </div>

        {/* Add-ons */}
        {data.addons.size > 0 && (
          <div className="bg-cream/50 rounded-md p-5">
            <h3 className="font-body font-semibold text-sm text-charcoal mb-3 uppercase tracking-wide">
              Add-ons
            </h3>
            {price?.addonItems.map((item) => (
              <Row key={item.label} label={item.label} value={`$${item.price}`} />
            ))}
          </div>
        )}

        {/* Schedule */}
        <div className="bg-cream/50 rounded-md p-5">
          <h3 className="font-body font-semibold text-sm text-charcoal mb-3 uppercase tracking-wide">
            Schedule
          </h3>
          <Row label="Date" value={data.date} />
          <Row label="Time" value={data.timeSlot} />
        </div>

        {/* Contact */}
        <div className="bg-cream/50 rounded-md p-5">
          <h3 className="font-body font-semibold text-sm text-charcoal mb-3 uppercase tracking-wide">
            Contact info
          </h3>
          <Row label="Name" value={data.name} />
          <Row label="Email" value={data.email} />
          <Row label="Phone" value={data.phone} />
          <Row label="Address" value={`${data.address}, ${data.city} ${data.zip}`} />
          {data.instructions && <Row label="Instructions" value={data.instructions} />}
        </div>

        {/* Price breakdown */}
        {price && (
          <div className="bg-forest/5 rounded-md p-5">
            <h3 className="font-body font-semibold text-sm text-charcoal mb-3 uppercase tracking-wide">
              Price breakdown
            </h3>
            <Row label="Base price" value={`$${price.base.toFixed(2)}`} />
            {price.bathroomSurcharge > 0 && (
              <Row label="Extra bathroom surcharge" value={`$${price.bathroomSurcharge.toFixed(2)}`} />
            )}
            {price.conditionMultiplier !== 1 && (
              <Row label={`Condition adjustment: ${price.conditionFriendlyLabel}`} value={`×${price.conditionMultiplier}`} />
            )}
            {price.petsSurcharge > 0 && (
              <Row label="Pets surcharge" value={`$${price.petsSurcharge.toFixed(2)}`} />
            )}
            {price.firstVisitPremium > 0 && (
              <div className="flex justify-between py-2 border-b border-cream-dark">
                <span className="font-body text-sm text-charcoal-light group relative">
                  First Visit Assessment
                  <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-charcoal-light/15 text-[10px] font-semibold text-charcoal-light cursor-help" title="One-time fee for your first cleaning. This covers extra time for your cleaner to learn your home's layout and preferences. It won't apply to future bookings.">?</span>
                </span>
                <span className="font-body text-sm font-medium text-charcoal text-right">${price.firstVisitPremium.toFixed(2)}</span>
              </div>
            )}
            {price.addonsTotal > 0 && (
              <Row label="Add-ons total" value={`$${price.addonsTotal.toFixed(2)}`} />
            )}
            <div className="border-t border-forest/20 mt-2 pt-2">
              <Row label="Subtotal" value={`$${price.subtotal.toFixed(2)}`} />
              <Row label={`Sales tax (${(price.taxRate * 100).toFixed(1)}%)`} value={`$${price.taxAmount.toFixed(2)}`} />
            </div>
            <div className="flex justify-between pt-3 mt-2 border-t-2 border-forest/20">
              <span className="font-body font-semibold text-charcoal">Estimated total</span>
              <span className="font-display font-semibold text-xl text-forest">${price.total.toFixed(2)}</span>
            </div>
            <p className="font-body text-xs text-charcoal-light mt-2">
              Final price confirmed within 2 hours of booking.
            </p>
            <p className="flex items-center gap-1.5 font-body text-xs text-charcoal-light/70 mt-2">
              <svg className="w-3.5 h-3.5 text-forest shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              This is your total. No surprise fees at the door.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
