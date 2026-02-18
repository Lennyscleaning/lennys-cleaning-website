import type { BookingFormData } from '../lib/types';
import { inputBase } from '../lib/types';

interface Props {
  data: BookingFormData;
  onChange: (updates: Partial<BookingFormData>) => void;
}

export default function Step5ContactInfo({ data, onChange }: Props) {
  return (
    <div>
      <h2 className="font-display font-semibold text-2xl text-charcoal mb-2">
        Your contact info
      </h2>
      <p className="font-body text-[15px] text-charcoal-light mb-6">
        We&apos;ll use this to confirm your booking.
      </p>
      <div className="space-y-4">
        <div>
          <label htmlFor="book-name" className="block font-body text-sm font-medium text-charcoal mb-1.5">
            Name
          </label>
          <input
            type="text"
            id="book-name"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className={inputBase}
            placeholder="Your name"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="book-email" className="block font-body text-sm font-medium text-charcoal mb-1.5">
              Email
            </label>
            <input
              type="email"
              id="book-email"
              value={data.email}
              onChange={(e) => onChange({ email: e.target.value })}
              className={inputBase}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="book-phone" className="block font-body text-sm font-medium text-charcoal mb-1.5">
              Phone
            </label>
            <input
              type="tel"
              id="book-phone"
              value={data.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              className={inputBase}
              placeholder="(253) 555-0123"
            />
          </div>
        </div>

        <div>
          <label htmlFor="book-address" className="block font-body text-sm font-medium text-charcoal mb-1.5">
            Street address
          </label>
          <input
            type="text"
            id="book-address"
            value={data.address}
            onChange={(e) => onChange({ address: e.target.value })}
            className={inputBase}
            placeholder="123 Main St"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="book-city" className="block font-body text-sm font-medium text-charcoal mb-1.5">
              City
            </label>
            <input
              type="text"
              id="book-city"
              value={data.city}
              onChange={(e) => onChange({ city: e.target.value })}
              className={inputBase}
              placeholder="Tacoma"
            />
          </div>
          <div>
            <label htmlFor="book-zip" className="block font-body text-sm font-medium text-charcoal mb-1.5">
              Zip code
            </label>
            <input
              type="text"
              id="book-zip"
              value={data.zip}
              onChange={(e) => onChange({ zip: e.target.value })}
              className={inputBase}
              placeholder="98402"
            />
          </div>
        </div>

        <div>
          <label htmlFor="book-instructions" className="block font-body text-sm font-medium text-charcoal mb-1.5">
            Special instructions <span className="text-charcoal-light font-normal">(optional)</span>
          </label>
          <textarea
            id="book-instructions"
            value={data.instructions}
            onChange={(e) => onChange({ instructions: e.target.value })}
            rows={3}
            className={`${inputBase} resize-y`}
            placeholder="Gate code, parking info, focus areas, etc."
          />
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.smsConsent}
              onChange={(e) => onChange({ smsConsent: e.target.checked })}
              className="mt-1 h-4 w-4 rounded border-cream-dark text-forest focus:ring-forest/30 shrink-0"
            />
            <span className="font-body text-xs text-charcoal-light leading-relaxed">
              I consent to receive SMS text messages from Lenny&apos;s Cleaning at the number
              provided, including booking confirmations, appointment reminders, and service
              updates. Consent is not a condition of purchase. Msg &amp; data rates may apply.
              Msg frequency varies. Unsubscribe at any time by replying STOP.
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
