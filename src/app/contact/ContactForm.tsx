'use client';

import { useState } from 'react';

// TODO: Integrate with Formspree (or similar) for actual form submission

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

  if (submitted) {
    return (
      <div className="bg-warm-white rounded-md p-10 text-center">
        <p className="font-display font-medium text-xl text-charcoal mb-2">
          Message sent
        </p>
        <p className="font-body text-[15px] text-charcoal-light">
          We&apos;ll get back to you within 24 hours during business hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: Submit to Formspree or similar service
        setSubmitted(true);
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

      <button
        type="submit"
        className="btn-primary w-full text-base px-8 py-4"
      >
        Send message
      </button>

      <p className="font-body text-sm text-charcoal-light text-center">
        We typically respond within 24 hours during business hours.
      </p>
    </form>
  );
}
