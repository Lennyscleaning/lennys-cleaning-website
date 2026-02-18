import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import FaqAccordion from '@/components/FaqAccordion';
import TrustBar from '@/components/TrustBar';
import { fetchPricingData } from '@/lib/fetch-pricing';

/* ─── SEO ─── */
export const metadata: Metadata = {
  title: 'Deep Cleaning Service',
  description:
    'Book a deep cleaning in Tacoma starting at $150. Inside appliances, baseboards, light fixtures — every detail handled by vetted professionals.',
  openGraph: {
    title: "Deep Cleaning Service | Lenny's Cleaning — Tacoma, WA",
    description:
      'Book a deep cleaning in Tacoma starting at $150. Inside appliances, baseboards, light fixtures — every detail handled by vetted professionals.',
  },
};

/* ─── Inline SVG icons ─── */
const icons = {
  kitchen: (
    <svg className="w-7 h-7 text-forest shrink-0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  ),
  bathroom: (
    <svg className="w-7 h-7 text-forest shrink-0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1zM6 12V5a2 2 0 012-2h1a2 2 0 012 2v1" />
      <path d="M7 20v2M17 20v2" />
    </svg>
  ),
  bedroom: (
    <svg className="w-7 h-7 text-forest shrink-0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4v16M2 8h18a2 2 0 012 2v10M2 17h20M6 8v9" />
      <path d="M6 12a2 2 0 012-2h2a2 2 0 012 2v0H6z" />
    </svg>
  ),
  living: (
    <svg className="w-7 h-7 text-forest shrink-0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 9V6a2 2 0 00-2-2H6a2 2 0 00-2 2v3M2 11v5a2 2 0 002 2h16a2 2 0 002-2v-5a2 2 0 00-4 0v2H6v-2a2 2 0 00-4 0z" />
      <path d="M4 18v2M20 18v2" />
    </svg>
  ),
  appliance: (
    <svg className="w-7 h-7 text-forest shrink-0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M4 10h16M8 6h.01M12 6h.01" />
    </svg>
  ),
  detail: (
    <svg className="w-7 h-7 text-forest shrink-0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  ),
};

/* ─── Data ─── */
const inclusions = [
  {
    icon: icons.kitchen,
    title: 'Kitchen',
    items: 'Counters and stovetop degreased, sink deep-scrubbed, inside microwave cleaned, appliance exteriors detailed, backsplash wiped, floor swept and mopped',
  },
  {
    icon: icons.bathroom,
    title: 'Bathrooms',
    items: 'Toilet sanitized inside and out, shower and tub deep-scrubbed, grout lines cleaned, mirrors and fixtures polished, counters wiped, exhaust fan dusted, floor mopped',
  },
  {
    icon: icons.bedroom,
    title: 'Bedrooms',
    items: 'Bed made, all surfaces dusted and wiped, ceiling fan blades cleaned, under-furniture vacuumed, closet floors vacuumed, mirrors and glass cleaned',
  },
  {
    icon: icons.living,
    title: 'Living areas',
    items: 'All surfaces dusted including shelves and ledges, upholstery vacuumed, behind and under furniture cleaned, floors vacuumed and mopped, trash emptied',
  },
  {
    icon: icons.appliance,
    title: 'Inside appliances',
    items: 'Inside oven cleaned, inside refrigerator wiped down, inside dishwasher detailed — included with every deep clean at no extra charge',
  },
  {
    icon: icons.detail,
    title: 'Detail work',
    items: 'Baseboards fully wiped, light fixtures dusted, door frames and hinges detailed, light switches sanitized, window sills cleaned, vents and registers dusted',
  },
];

const faqs = [
  {
    question: "What's the difference between a deep clean and a standard clean?",
    answer: "A standard clean covers regular maintenance — surfaces, floors, kitchens, and bathrooms. A deep clean goes further: inside appliances, detailed baseboards, light fixtures, ceiling fans, behind furniture, and areas that don't get attention every week. If it's been more than three months since your last professional cleaning, we recommend starting with a deep clean.",
  },
  {
    question: 'How long does a deep cleaning take?',
    answer: "Most deep cleanings take 3–5 hours depending on the size of your home and its current condition. Your specialist stays until the job is done — it's never rushed. You'll see an estimated duration when you book.",
  },
  {
    question: 'Do I need to do anything to prepare?',
    answer: "Just a bit of tidying helps your specialist focus on cleaning rather than organizing. Pick up clothes, clear countertops where you can, and secure any valuables. We'll send a short prep checklist when you book.",
  },
  {
    question: 'Can I add specific areas that need extra attention?',
    answer: "When you book, you can flag rooms that need extra work and choose from our add-on services. Your specialist can also adjust on arrival if they notice anything — they'll always check with you first before changing your quote.",
  },
  {
    question: 'Is a deep clean worth it if I already maintain my home?',
    answer: "Even well-maintained homes benefit from a deep clean once or twice a year. It reaches the spots that regular cleaning misses — inside appliances, behind furniture, grout lines, vent covers. Think of it as a reset for your home.",
  },
];

/* ─── JSON-LD ─── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Deep Cleaning Service',
  provider: {
    '@type': 'LocalBusiness',
    name: "Lenny's Cleaning",
    telephone: '+12536003355',
    areaServed: { '@type': 'City', name: 'Tacoma', addressRegion: 'WA' },
  },
  description:
    'A thorough, top-to-bottom deep clean for homes in Tacoma. Inside appliances, baseboards, light fixtures, and every detail — handled by vetted professionals.',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '150',
    priceSpecification: { '@type': 'UnitPriceSpecification', unitText: 'starting at' },
  },
};

/* ─── PAGE ─── */
export default async function DeepCleaningPage() {
  const pricingData = await fetchPricingData();
  const pricing = pricingData.deepPricing;
  const deepAddons = pricingData.addons;

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
            <p className="overline mb-3">DEEP CLEANING</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display font-semibold text-charcoal leading-[1.1] tracking-tight mb-5 text-[clamp(36px,5vw,58px)]">
              Deep cleaning service in Tacoma
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-[19px] text-charcoal-light leading-relaxed max-w-[560px] mx-auto mb-9">
              A thorough, top-to-bottom clean for homes that need more than maintenance. Every corner, every surface, every detail.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <Link href="/book" className="btn-primary text-base px-8 py-4">
              Book a deep clean
            </Link>
          </Reveal>
        </div>
      </header>

      {/* ══════ TRUST BAR ══════ */}
      <TrustBar />

      {/* ══════ WHAT'S INCLUDED ══════ */}
      <section className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">WHAT&apos;S INCLUDED</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-4 text-[clamp(28px,4vw,44px)]">
              Every detail, handled
            </h2>
            <p className="font-body text-[17px] text-charcoal-light leading-relaxed text-center max-w-[560px] mx-auto mb-14">
              A deep clean covers everything in a standard clean — plus the places that don&apos;t get attention every week.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1000px] mx-auto">
            {inclusions.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="bg-cream rounded-md p-7 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    {item.icon}
                    <h3 className="font-display font-medium text-xl text-charcoal leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                    {item.items}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PRICING ══════ */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[800px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">PRICING</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-4 text-[clamp(28px,4vw,44px)]">
              Transparent, flat-rate pricing
            </h2>
            <p className="font-body text-[17px] text-charcoal-light leading-relaxed text-center max-w-[560px] mx-auto mb-12">
              Your price depends on the size of your home and a few details about its condition. You&apos;ll see your exact price before you book — no estimates, no surprises.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="bg-warm-white rounded-md overflow-hidden shadow-md">
              {pricing.map((row, i) => (
                <div
                  key={row.config}
                  className={`flex justify-between items-center px-7 py-[18px] ${
                    i < pricing.length - 1 ? 'border-b border-cream' : ''
                  }`}
                >
                  <span className="font-body text-base text-charcoal">{row.config}</span>
                  <span className="font-body text-lg font-semibold text-forest">{row.price}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-sm text-gray-m text-center mt-5 max-w-[560px] mx-auto">
              Prices shown are base rates for homes in typical condition. Your final price may include adjustments for condition, pets, or add-on services — all shown transparently before you confirm.
            </p>
            <p className="font-body text-sm text-charcoal-light text-center mt-3 max-w-[560px] mx-auto">
              First-time customers: a one-time First Visit Assessment (15%) applies to your first booking. This gives your cleaning specialist extra time to learn your home. All future bookings are at the listed rate.
            </p>
            <p className="font-body text-[15px] text-charcoal-light text-center mt-5 max-w-[560px] mx-auto">
              What you see is what you pay. No memberships, no contracts, no hidden charges.
            </p>
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[900px] mx-auto">
            {deepAddons.map((a, i) => (
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
          <Reveal delay={200}>
            <p className="font-body text-sm text-gray-m text-center mt-5">
              Inside oven, inside refrigerator, and baseboards are already included in every deep clean.
            </p>
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
      <section className="bg-forest py-24 px-6 text-center">
        <div className="max-w-[600px] mx-auto">
          <Reveal>
            <h2 className="font-display font-medium text-warm-white leading-[1.15] mb-4 text-[clamp(28px,4vw,44px)]">
              Your home deserves a deep clean
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-lg text-warm-white/80 leading-relaxed mb-9">
              Book today and see the difference a thorough, detail-focused cleaning makes.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-8 py-4 bg-warm-white text-forest font-body font-semibold text-base tracking-wide rounded-sm hover:shadow-hover hover:-translate-y-px transition-all duration-200"
            >
              Book a deep clean
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
