import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import FaqAccordion from '@/components/FaqAccordion';
import TrustBar from '@/components/TrustBar';
import { fetchPricingData } from '@/lib/fetch-pricing';

/* ─── SEO ─── */
export const metadata: Metadata = {
  title: "House Cleaning Prices in Tacoma | Lenny's Cleaning",
  description:
    'Transparent, flat-rate house cleaning prices in Tacoma. Standard from $85, deep cleaning from $150, move-out from $175. See your exact price before you book.',
  openGraph: {
    title: "House Cleaning Prices in Tacoma | Lenny's Cleaning — Tacoma, WA",
    description:
      'Transparent, flat-rate house cleaning prices in Tacoma. Know exactly what you\'ll pay before we arrive.',
  },
};

const recurringDiscounts = [
  { frequency: 'Weekly', discount: '~15% off', note: 'Best value — lowest per-visit rate' },
  { frequency: 'Biweekly', discount: '~5–8% off', note: 'Most popular — great balance of savings and frequency' },
  { frequency: 'Monthly', discount: '~3–5% off', note: 'Light savings with consistent care' },
];

const faqs = [
  {
    question: 'How is pricing determined?',
    answer: 'Your price is based on the number of bedrooms and bathrooms, the type of cleaning, and a few details about your home\'s condition. You\'ll see your exact, flat-rate price before you book — no hourly rates, no estimates, no surprises after the fact.',
  },
  {
    question: 'Are there any hidden fees?',
    answer: 'No. The price you see at booking is the price you pay. If your specialist arrives and the home needs significantly more work than described, they\'ll contact you before starting any additional work — and you\'ll approve any changes before being charged.',
  },
  {
    question: 'What if my home needs extra work?',
    answer: 'If your home hasn\'t been professionally cleaned in a while, we may recommend starting with a deep clean to establish a baseline. After that, standard or recurring cleans maintain the results at a lower price point.',
  },
  {
    question: 'Do you offer discounts for recurring cleanings?',
    answer: 'Yes. Weekly customers save ~15% per visit, biweekly saves ~5–8%, and monthly saves ~3–5% — compared to one-time standard cleaning rates. Plus you get the same specialist every visit and priority scheduling.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit and debit cards. Payment is processed after your cleaning is complete. For recurring plans, your card is charged automatically after each visit.',
  },
];

/* ─── JSON-LD ─── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'House Cleaning Services',
  provider: {
    '@type': 'LocalBusiness',
    name: "Lenny's Cleaning",
    telephone: '+12536003355',
    areaServed: { '@type': 'City', name: 'Tacoma', addressRegion: 'WA' },
  },
  description:
    'Transparent, flat-rate house cleaning prices in Tacoma. Standard, deep, move-out, Airbnb turnover, and recurring plans.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '85',
    highPrice: '450',
  },
};

/* ─── PAGE ─── */
export default async function PricingPage() {
  const pricingData = await fetchPricingData();
  const services = pricingData.serviceComparison;
  const sizeRanges = pricingData.sizeRanges;
  const addons = pricingData.addons;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ══════ HERO ══════ */}
      <header className="bg-warm-white pt-[120px] pb-20 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <Reveal>
            <p className="overline mb-3">PRICING</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display font-semibold text-charcoal leading-[1.1] tracking-tight mb-5 text-[clamp(36px,5vw,58px)]">
              Transparent pricing. No surprises.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-[19px] text-charcoal-light leading-relaxed max-w-[560px] mx-auto mb-9">
              Flat-rate pricing based on your home size — not hourly estimates that balloon. Know exactly what you&apos;ll pay before we arrive.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <Link href="/book" className="btn-primary text-base px-8 py-4">
              Get your instant quote
            </Link>
          </Reveal>
        </div>
      </header>

      {/* ══════ TRUST BAR ══════ */}
      <TrustBar />

      {/* ══════ SERVICE COMPARISON ══════ */}
      <section className="py-24 px-6">
        <div className="max-w-[1000px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">COMPARE SERVICES</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-4 text-[clamp(28px,4vw,44px)]">
              Find the right clean for your home
            </h2>
            <p className="font-body text-[17px] text-charcoal-light leading-relaxed text-center max-w-[560px] mx-auto mb-14">
              Every service includes vetted professionals, flat-rate pricing, and a satisfaction guarantee.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="bg-warm-white rounded-md overflow-hidden shadow-md">
              {/* Table header */}
              <div className="hidden md:grid md:grid-cols-4 gap-4 px-7 py-4 bg-forest text-warm-white">
                <span className="font-body text-sm font-semibold uppercase tracking-wider">Service</span>
                <span className="font-body text-sm font-semibold uppercase tracking-wider">Starting at</span>
                <span className="font-body text-sm font-semibold uppercase tracking-wider">Best for</span>
                <span className="font-body text-sm font-semibold uppercase tracking-wider text-right">Details</span>
              </div>
              {/* Table rows */}
              {services.map((service, i) => (
                <div
                  key={service.name}
                  className={`grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 px-7 py-5 ${
                    i < services.length - 1 ? 'border-b border-cream' : ''
                  }`}
                >
                  <span className="font-body text-base font-semibold text-charcoal">{service.name}</span>
                  <span className="font-display text-lg font-semibold text-forest">{service.price}</span>
                  <span className="font-body text-[15px] text-charcoal-light">{service.note}</span>
                  <span className="md:text-right">
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-1 text-forest font-medium text-[15px] hover:text-forest-dark transition-colors"
                    >
                      Learn more
                      <span aria-hidden="true"> →</span>
                    </Link>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-[15px] text-charcoal-light text-center mt-6">
              What you see is what you pay. No memberships, no contracts, no hidden charges.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════ PRICING BY HOME SIZE ══════ */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[800px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">BY HOME SIZE</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-4 text-[clamp(28px,4vw,44px)]">
              Pricing by home size
            </h2>
            <p className="font-body text-[17px] text-charcoal-light leading-relaxed text-center max-w-[560px] mx-auto mb-12">
              Ranges cover standard through deep cleaning. Your exact price depends on the service type and your home&apos;s condition.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="bg-warm-white rounded-md overflow-hidden shadow-md">
              {sizeRanges.map((row, i) => (
                <div
                  key={row.size}
                  className={`flex justify-between items-center px-7 py-[18px] ${
                    i < sizeRanges.length - 1 ? 'border-b border-cream' : ''
                  }`}
                >
                  <span className="font-body text-base text-charcoal">{row.size}</span>
                  <span className="font-body text-lg font-semibold text-forest">{row.range}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ ADD-ONS ══════ */}
      <section className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">ADD-ONS</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-3 text-[clamp(28px,4vw,44px)]">
              Customize your clean
            </h2>
            <p className="font-body text-[17px] text-charcoal-light leading-relaxed text-center max-w-[480px] mx-auto mb-12">
              Add any of these to your booking for extra attention where it matters most.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-[700px] mx-auto">
            {addons.map((a, i) => (
              <Reveal key={a.name} delay={i * 50}>
                <div className="bg-cream rounded-lg px-5 py-[18px] flex justify-between items-center">
                  <span className="font-body text-[15px] font-medium text-charcoal">{a.name}</span>
                  <span className="font-body text-[15px] font-semibold text-forest whitespace-nowrap ml-3">
                    {a.price}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FIRST VISIT NOTE ══════ */}
      <div className="max-w-[800px] mx-auto px-6 -mt-14 mb-14">
        <Reveal>
          <p className="font-body text-sm text-charcoal-light leading-relaxed text-center">
            First-time customers: a one-time First Visit Assessment (15%) applies to your first booking. This gives your cleaning specialist extra time to learn your home. All future bookings are at the listed rate.
          </p>
        </Reveal>
      </div>

      {/* ══════ HOW PRICING WORKS ══════ */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">HOW IT WORKS</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-14 text-[clamp(28px,4vw,44px)]">
              Your price in three steps
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-10 md:gap-8 max-w-[960px] mx-auto">
            <Reveal delay={0}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-forest text-warm-white flex items-center justify-center font-body font-bold text-lg mx-auto mb-5">
                  1
                </div>
                <h3 className="font-display font-medium text-xl md:text-2xl mb-3">
                  Tell us about your home
                </h3>
                <p className="text-charcoal-light leading-relaxed text-[0.9375rem] md:text-base">
                  Bedrooms, bathrooms, condition, and the type of cleaning you need. Takes about 60 seconds.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-forest text-warm-white flex items-center justify-center font-body font-bold text-lg mx-auto mb-5">
                  2
                </div>
                <h3 className="font-display font-medium text-xl md:text-2xl mb-3">
                  Get an instant quote
                </h3>
                <p className="text-charcoal-light leading-relaxed text-[0.9375rem] md:text-base">
                  See your flat-rate price with a full breakdown — no hourly estimates, no guesswork, no waiting for a callback.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-forest text-warm-white flex items-center justify-center font-body font-bold text-lg mx-auto mb-5">
                  3
                </div>
                <h3 className="font-display font-medium text-xl md:text-2xl mb-3">
                  Book with confidence
                </h3>
                <p className="text-charcoal-light leading-relaxed text-[0.9375rem] md:text-base">
                  Your price is locked in. No surprises on cleaning day. Pay after the job is done.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════ RECURRING DISCOUNT CALLOUT ══════ */}
      <section className="py-24 px-6">
        <div className="max-w-[1000px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">SAVE WITH RECURRING</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-4 text-[clamp(28px,4vw,44px)]">
              Clean regularly, pay less every visit
            </h2>
            <p className="font-body text-[17px] text-charcoal-light leading-relaxed text-center max-w-[560px] mx-auto mb-12">
              Lock in a lower rate with a recurring plan. Same specialist every visit, priority scheduling, and the flexibility to skip or cancel anytime.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
            {recurringDiscounts.map((plan, i) => (
              <Reveal key={plan.frequency} delay={i * 100}>
                <div className="bg-cream rounded-md p-7 text-center h-full flex flex-col">
                  <h3 className="font-display font-medium text-xl text-charcoal mb-2">
                    {plan.frequency}
                  </h3>
                  <p className="font-display font-semibold text-2xl text-forest mb-3">
                    {plan.discount}
                  </p>
                  <p className="font-body text-[15px] text-charcoal-light leading-relaxed flex-1">
                    {plan.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <div className="text-center mt-10">
              <Link
                href="/services/recurring"
                className="inline-flex items-center gap-1.5 text-forest font-semibold text-[0.9375rem] hover:text-forest-dark transition-colors"
              >
                Learn more about recurring plans
                <span aria-hidden="true"> →</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ FAQ ══════ */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[700px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">COMMON QUESTIONS</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-12 text-[clamp(28px,4vw,44px)]">
              Frequently asked questions
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* ══════ BOTTOM CTA ══════ */}
      <section className="relative bg-forest py-24 px-6 text-center overflow-hidden">
        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 max-w-[600px] mx-auto">
          <Reveal>
            <h2 className="font-display font-medium text-warm-white leading-[1.15] mb-4 text-[clamp(28px,4vw,44px)]">
              See your price in 60 seconds
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-lg text-warm-white/80 leading-relaxed mb-9">
              Tell us about your home and get an instant, flat-rate quote. No phone calls, no waiting, no surprises.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-8 py-4 bg-warm-white text-forest font-body font-semibold text-base tracking-wide rounded-sm hover:shadow-hover hover:-translate-y-px transition-all duration-200"
            >
              Get your instant quote
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
