import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import TrustBar from '@/components/TrustBar';

/* ─── SEO ─── */
export const metadata: Metadata = {
  title: "How It Works | Lenny's Cleaning — Tacoma, WA",
  description:
    "Book a cleaning in under 2 minutes. Get an instant flat-rate quote, we match you with a vetted professional, and your home gets the attention it deserves.",
  openGraph: {
    title: "How It Works | Lenny's Cleaning — Tacoma, WA",
    description:
      "Book a cleaning in under 2 minutes. Get an instant flat-rate quote, we match you with a vetted professional, and your home gets the attention it deserves.",
  },
};

/* ─── Data ─── */
const steps = [
  {
    num: '01',
    title: 'Tell us about your home',
    body: "Select your service, enter your home size and condition, and pick any add-ons. You'll get an instant flat-rate quote — no estimates, no hourly billing.",
  },
  {
    num: '02',
    title: 'We match you with a pro',
    body: 'We assign a background-checked cleaning professional based on your location, service type, and availability. For recurring bookings, you get the same person each time.',
  },
  {
    num: '03',
    title: 'Sit back and relax',
    body: "Your professional arrives within your selected time window, completes the job, and you'll get a follow-up to make sure everything is perfect. Payment processes automatically.",
  },
];

const differentiators = [
  {
    title: 'Flat-rate pricing',
    body: 'Know your exact cost upfront. No estimates, no hourly billing, no surprise charges after the job is done.',
    icon: (
      <svg className="w-7 h-7 text-forest shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
      </svg>
    ),
  },
  {
    title: 'Background-checked pros',
    body: 'Every cleaning professional on our platform is vetted, background-checked, and held to our quality standards.',
    icon: (
      <svg className="w-7 h-7 text-forest shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: 'Satisfaction guaranteed',
    body: "Not happy with your clean? Let us know within 24 hours and we'll send someone back to make it right — at no extra charge.",
    icon: (
      <svg className="w-7 h-7 text-forest shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
];

const grainSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`;

/* ─── PAGE ─── */
export default function HowItWorksPage() {
  return (
    <>
      {/* ══════ HERO ══════ */}
      <header className="bg-warm-white pt-[120px] pb-20 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <Reveal>
            <p className="overline mb-3">HOW IT WORKS</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display font-semibold text-charcoal leading-[1.1] tracking-tight mb-5 text-[clamp(36px,5vw,58px)]">
              A better clean in 3 easy steps
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-[19px] text-charcoal-light leading-relaxed max-w-[560px] mx-auto">
              From booking to a spotless home — here&apos;s how Lenny&apos;s works.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ══════ TRUST BAR ══════ */}
      <TrustBar />

      {/* ══════ 3 STEPS ══════ */}
      <section className="py-24 px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="space-y-16">
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 100}>
                <div className="flex gap-6 md:gap-10">
                  <span className="font-display font-semibold text-[56px] md:text-[72px] text-forest/15 leading-none shrink-0 -mt-2">
                    {step.num}
                  </span>
                  <div>
                    <h2 className="font-display font-medium text-charcoal leading-tight tracking-tight mb-3 text-[clamp(24px,3.5vw,32px)]">
                      {step.title}
                    </h2>
                    <p className="font-body text-[17px] text-charcoal-light leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ WHAT MAKES LENNY'S DIFFERENT ══════ */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">THE DIFFERENCE</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-14 text-[clamp(28px,4vw,44px)]">
              What makes Lenny&apos;s different
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
            {differentiators.map((card, i) => (
              <Reveal key={card.title} delay={i * 100}>
                <div className="bg-warm-white rounded-md p-7 h-full">
                  <div className="mb-4">{card.icon}</div>
                  <h3 className="font-display font-medium text-xl text-charcoal leading-tight mb-3">
                    {card.title}
                  </h3>
                  <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PRICING OVERVIEW ══════ */}
      <section className="py-24 px-6">
        <div className="max-w-[600px] mx-auto text-center">
          <Reveal>
            <p className="overline mb-3">PRICING</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight mb-4 text-[clamp(28px,4vw,44px)]">
              Simple, transparent pricing
            </h2>
            <p className="font-body text-[17px] text-charcoal-light leading-relaxed mb-8">
              Starting at $125 for a standard clean. Your exact price depends on your home size and the service you choose — you&apos;ll always see it before you book.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <Link
              href="/pricing"
              className="btn-secondary text-base px-8 py-4"
            >
              See all pricing →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════ BOTTOM CTA ══════ */}
      <section className="relative py-24 px-6 bg-forest overflow-hidden text-center">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: grainSvg }}
        />
        <div className="relative z-10 max-w-[600px] mx-auto">
          <Reveal>
            <h2 className="font-display font-medium text-warm-white leading-[1.15] mb-4 text-[clamp(28px,4vw,44px)]">
              Ready to get started?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-lg text-warm-white/80 leading-relaxed mb-9">
              Book a cleaning in under two minutes. Flat-rate pricing, vetted professionals, and a satisfaction guarantee on every visit.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-8 py-4 bg-warm-white text-forest font-body font-semibold text-base tracking-wide rounded-sm hover:shadow-hover hover:-translate-y-px transition-all duration-200"
            >
              Book a cleaning
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
