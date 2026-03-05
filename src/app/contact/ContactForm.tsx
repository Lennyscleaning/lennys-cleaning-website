'use client';

import { useState } from 'react';

const subjects = [
  'General question',
  'Booking help',
  'Feedback',
  'Partnership inquiry',
  'Other',
];

const inputBase =
  'w-full bg-warm-white border border-cream-dark rounded-sm px-4 py-3 font-body text-[15px] text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors duration-200';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  if (submitted) {
    return (
      <div className="bg-warm-white rounded-md p-10 text-center max-w-lg mx-auto">
        {/* Checkmark icon */}
        <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-forest/10 flex items-center justify-center">
          <svg
            className="w-7 h-7 text-forest"
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

        <p className="font-display font-semibold text-xl text-charcoal mb-4">
          Message received. A real human will get back to you.
        </p>

        <div className="font-body text-[15px] text-charcoal-light leading-relaxed space-y-4 mb-6 text-left">
          <p>
            We&apos;re in the final stages of launching Lenny&apos;s Cleaning in Tacoma,
            which means we&apos;re a small (but mighty) team right now. We&apos;ve got your
            message and we&apos;ll respond personally — just not quite at full speed yet.
          </p>
          <p>
            Expect to hear back from Eric directly at{' '}
            <a
              href="mailto:eric@lennyscleaning.com"
              className="font-semibold text-forest hover:text-forest-dark transition-colors duration-200"
            >
              eric@lennyscleaning.com
            </a>
            {' '}within a day or two. If it&apos;s urgent, feel free to shoot an email
            there directly and skip the queue.
          </p>
        </div>

        <p className="font-body text-sm text-charcoal-light/70 mb-6">
          Thanks for taking the time to reach out — it genuinely means a lot at this stage.
        </p>

        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setSubmitError('');
          }}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-forest text-warm-white font-body font-semibold text-base rounded-sm hover:shadow-hover hover:-translate-y-px transition-all duration-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          Got it — talk soon
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError('');

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
          const res = await fetch('/api/waitlist/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: formData.get('name'),
              email: formData.get('email'),
              phone: formData.get('phone'),
              topic: formData.get('subject'),
              message: formData.get('message'),
            }),
          });
          if (!res.ok) throw new Error();
          setSubmitted(true);
        } catch {
          setSubmitError('Something went wrong. Please email us directly at hello@lennyscleaning.com.');
        } finally {
          setSubmitting(false);
        }
      }}
      className="space-y-5"
    >
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
        <label htmlFor="subject" className="block font-body text-sm font-medium text-charcoal mb-1.5">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          required
          className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%232C2C2C%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10`}
          defaultValue=""
        >
          <option value="" disabled>
            Select a subject
          </option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block font-body text-sm font-medium text-charcoal mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputBase} resize-y`}
          placeholder="How can we help?"
        />
      </div>

      {submitError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="font-body text-sm text-red-700">{submitError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full text-base px-8 py-4 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {submitting ? 'Sending...' : 'Send message'}
      </button>

      <p className="font-body text-sm text-charcoal-light text-center">
        We typically respond within 24 hours during business hours.
      </p>
    </form>
  );
}
