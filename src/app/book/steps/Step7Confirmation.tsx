import Link from 'next/link';

export default function Step7Confirmation() {
  return (
    <div className="py-6 max-w-lg mx-auto">
      {/* Checkmark icon */}
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-forest/10 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-forest"
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

      <h2 className="font-display font-semibold text-2xl text-charcoal mb-4 text-center">
        You&apos;re first in line. Literally.
      </h2>

      <div className="font-body text-[15px] text-charcoal-light leading-relaxed space-y-4 mb-8">
        <p>
          We know — you just went through the whole booking process, and we&apos;re not
          live yet. That&apos;s on us, and we&apos;re sorry for the friction. But here&apos;s
          what&apos;s true: Lenny&apos;s Cleaning is coming to Tacoma, and the fact that you
          made it this far tells us you&apos;re exactly who we&apos;re building this for.
        </p>
        <p>
          We&apos;re a locally-owned cleaning service launching soon, and we&apos;re doing
          things differently — flat-rate pricing, no surprise fees, and cleaners who are
          paid like professionals because they are.
        </p>
        <p>
          We saved your booking details. When we launch, you&apos;ll hear from us first —
          and we&apos;ll honor a first-clean discount as a thank-you for your patience.
        </p>
      </div>

      <p className="font-body text-sm text-charcoal-light/70 text-center mb-8">
        Questions? Email us at{' '}
        <a
          href="mailto:eric@lennyscleaning.com"
          className="font-semibold text-forest hover:text-forest-dark transition-colors duration-200"
        >
          eric@lennyscleaning.com
        </a>
        {' '}— a real person will respond.
      </p>

      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-forest text-warm-white font-body font-semibold text-base rounded-sm hover:shadow-hover hover:-translate-y-px transition-all duration-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          Got it — I&apos;ll wait for the good stuff
        </Link>
      </div>
    </div>
  );
}
