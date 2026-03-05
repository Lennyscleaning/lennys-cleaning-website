'use client';

import { useState } from 'react';

const inputBase =
  'w-full bg-warm-white border border-cream-dark rounded-sm px-4 py-3 font-body text-[15px] text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors duration-200';

export default function OperatorApplyForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('/api/waitlist/operator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          phone: data.get('phone'),
          yearsOfExperience: data.get('yearsOfExperience'),
          hasOwnEquipment: data.get('hasOwnEquipment') === 'yes',
          availability: data.get('availability'),
          notes: data.get('notes'),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Something went wrong.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-warm-white rounded-md p-10 text-center max-w-[640px] mx-auto">
        <h3 className="font-display font-semibold text-[clamp(22px,3.5vw,32px)] text-forest leading-[1.2] mb-5">
          You just applied for the best-paying cleaning job in Tacoma.
        </h3>
        <div className="font-body text-[15px] text-charcoal-light leading-relaxed text-left space-y-4 mb-8">
          <p>
            We&apos;re not live yet — but we wanted you to know what you just signed up for.
          </p>
          <p>
            Lenny&apos;s pays operators $28–$48/hour, with same-week direct deposit and full
            schedule control. The industry standard is $13–$18. We built this platform
            specifically so that the people doing the work get paid like it matters — because
            it does.
          </p>
          <p>
            You&apos;re in our founding operator pool. That means when we launch, you&apos;ll be
            first to be contacted, and founding operators lock in our best payout rate
            permanently.
          </p>
          <p>
            We&apos;ll reach out directly when we&apos;re ready to onboard. Sit tight — this
            one&apos;s worth waiting for.
          </p>
        </div>
        <p className="font-body text-sm text-charcoal-light/70 mb-6">
          Questions? Email us at{' '}
          <a
            href="mailto:eric@lennyscleaning.com"
            className="text-forest underline underline-offset-4 hover:text-forest-dark transition-colors"
          >
            eric@lennyscleaning.com
          </a>
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-2 bg-forest text-warm-white font-body font-medium text-base px-8 py-4 rounded-sm hover:bg-forest-dark transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          I&apos;m in — let me know when you&apos;re ready
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-[560px] mx-auto">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-sm px-4 py-3 font-body text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block font-body text-sm font-medium text-charcoal mb-1.5">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className={inputBase}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-body text-sm font-medium text-charcoal mb-1.5">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={inputBase}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block font-body text-sm font-medium text-charcoal mb-1.5">
          Phone <span className="text-charcoal-light font-normal">(optional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className={inputBase}
          placeholder="(253) 555-0123"
        />
      </div>

      <div>
        <label htmlFor="yearsOfExperience" className="block font-body text-sm font-medium text-charcoal mb-1.5">
          Years of cleaning experience
        </label>
        <select
          id="yearsOfExperience"
          name="yearsOfExperience"
          required
          className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%232C2C2C%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10`}
          defaultValue=""
        >
          <option value="" disabled>Select experience level</option>
          <option value="Less than 1 year">Less than 1 year</option>
          <option value="1-2 years">1-2 years</option>
          <option value="3-5 years">3-5 years</option>
          <option value="5+ years">5+ years</option>
        </select>
      </div>

      <div>
        <label htmlFor="hasOwnEquipment" className="block font-body text-sm font-medium text-charcoal mb-1.5">
          Do you have your own cleaning supplies?
        </label>
        <select
          id="hasOwnEquipment"
          name="hasOwnEquipment"
          required
          className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%232C2C2C%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10`}
          defaultValue=""
        >
          <option value="" disabled>Select one</option>
          <option value="yes">Yes</option>
          <option value="no">No, but I can get them</option>
        </select>
      </div>

      <div>
        <label htmlFor="availability" className="block font-body text-sm font-medium text-charcoal mb-1.5">
          When are you typically available?
        </label>
        <select
          id="availability"
          name="availability"
          required
          className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%232C2C2C%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10`}
          defaultValue=""
        >
          <option value="" disabled>Select availability</option>
          <option value="Weekdays only">Weekdays only</option>
          <option value="Weekends only">Weekends only</option>
          <option value="Both weekdays and weekends">Both weekdays and weekends</option>
          <option value="Flexible">Flexible</option>
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="block font-body text-sm font-medium text-charcoal mb-1.5">
          Anything else we should know? <span className="text-charcoal-light font-normal">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className={`${inputBase} resize-y`}
          placeholder="Tell us about yourself, your experience, or any questions you have."
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full text-base px-8 py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'Submitting...' : 'Apply now'}
      </button>

      <p className="font-body text-sm text-charcoal-light text-center">
        Takes less than 2 minutes. No commitment required.
      </p>
    </form>
  );
}
