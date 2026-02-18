import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import FaqAccordion from '@/components/FaqAccordion';
import { fetchPricingData } from '@/lib/fetch-pricing';

/* ─── SEO ─── */
export const metadata: Metadata = {
  title: 'Airbnb Turnover Cleaning',
  description:
    'Reliable Airbnb and short-term rental turnover cleaning in Tacoma starting at $125. Fresh linens, spotless spaces, and five-star guest readiness.',
  openGraph: {
    title: "Airbnb Turnover Cleaning | Lenny's Cleaning — Tacoma, WA",
    description:
      'Reliable Airbnb and short-term rental turnover cleaning in Tacoma starting at $125. Fresh linens, spotless spaces, and five-star guest readiness.',
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
  guest: (
    <svg className="w-7 h-7 text-forest shrink-0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  laundry: (
    <svg className="w-7 h-7 text-forest shrink-0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <circle cx="12" cy="13" r="5" />
      <path d="M12 8v1M6 6h.01M10 6h.01" />
    </svg>
  ),
  checklist: (
    <svg className="w-7 h-7 text-forest shrink-0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
    </svg>
  ),
};

/* ─── Data ─── */
const inclusions = [
  {
    icon: icons.kitchen,
    title: 'Kitchen',
    items: 'Counters and stovetop wiped, sink scrubbed, appliance exteriors cleaned, inside microwave cleaned, dishes checked and put away, trash emptied and relined, floor swept and mopped',
  },
  {
    icon: icons.bathroom,
    title: 'Bathrooms',
    items: 'Toilet sanitized, shower and tub scrubbed, mirrors and fixtures polished, counters wiped and restocked, fresh towels set out, floor mopped, toiletries arranged',
  },
  {
    icon: icons.bedroom,
    title: 'Bedrooms',
    items: 'Fresh linens on all beds (hospital corners), pillows fluffed and arranged, surfaces dusted, floors vacuumed, mirrors and glass cleaned, closets checked for guest items',
  },
  {
    icon: icons.guest,
    title: 'Guest readiness',
    items: 'Living areas dusted and vacuumed, throw blankets folded, remotes and guides arranged, entryway cleaned and welcoming, thermostat set to your preference',
  },
  {
    icon: icons.laundry,
    title: 'Linens and laundry',
    items: 'All used linens stripped and replaced with fresh sets, used towels swapped, laundry started if washer/dryer available on-site (add-on for full wash-dry-fold)',
  },
  {
    icon: icons.checklist,
    title: 'Host checklist',
    items: 'Photo-ready walkthrough of every room, lockbox or smart lock verified, lights and HVAC set per your instructions, any custom host notes followed',
  },
];

const faqs = [
  {
    question: 'How fast can you turn around between guests?',
    answer: "Most turnovers take 2–3 hours depending on property size. We can work within tight same-day windows — just let us know your checkout and check-in times when you book. For same-day turnovers, a $50 same-day service fee applies.",
  },
  {
    question: 'Can I set up recurring turnovers automatically?',
    answer: "Yes. Share your booking calendar and we'll schedule turnovers to match your guest checkout dates. You'll get a confirmation for each one, and your specialist will follow the same checklist every time — no need to manage each booking individually.",
  },
  {
    question: 'Will you restock supplies like toiletries and coffee?',
    answer: "We offer a restocking add-on for $15 per turnover. Provide a supply kit or leave extras in a designated spot, and your specialist will set everything out for the next guest. If supplies run low, we'll let you know.",
  },
  {
    question: 'Do you follow a specific checklist for Airbnb standards?',
    answer: "Every turnover follows a detailed room-by-room checklist designed for short-term rental expectations. If you have a custom host checklist or specific requirements from your platform, share it with us and we'll follow it to the letter.",
  },
  {
    question: 'Can I get photos of the property after each turnover?',
    answer: 'Your specialist does a photo-ready walkthrough of every room after each clean. We can send you photos on request — useful for confirming the property is guest-ready when you manage remotely.',
  },
  {
    question: 'What if a guest leaves the property in rough shape?',
    answer: "If the property needs significantly more work than a standard turnover, your specialist will contact you before starting any additional work. We'll provide a revised quote for the extra scope so there are no surprises on either end.",
  },
];

/* ─── JSON-LD ─── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Airbnb Turnover Cleaning Service',
  provider: {
    '@type': 'LocalBusiness',
    name: "Lenny's Cleaning",
    telephone: '+12536003355',
    areaServed: { '@type': 'City', name: 'Tacoma', addressRegion: 'WA' },
  },
  description:
    'Fast, reliable turnover cleaning for Airbnb and short-term rental hosts in Tacoma. Fresh linens, spotless spaces, five-star guest readiness.',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '125',
    priceSpecification: { '@type': 'UnitPriceSpecification', unitText: 'starting at' },
  },
};

/* ─── PAGE ─── */
export default async function AirbnbCleaningPage() {
  const pricingData = await fetchPricingData();
  const pricing = pricingData.airbnbPricing;
  const airbnbAddons = pricingData.addons;

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
            <p className="overline mb-3">AIRBNB &amp; SHORT-TERM RENTAL</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display font-semibold text-charcoal leading-[1.1] tracking-tight mb-5 text-[clamp(36px,5vw,58px)]">
              Airbnb turnover cleaning in Tacoma
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-[19px] text-charcoal-light leading-relaxed max-w-[560px] mx-auto mb-9">
              Fast, reliable turnover cleaning for short-term rental hosts. Fresh linens, spotless spaces, five-star reviews — every guest, every time.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <Link href="/book" className="btn-primary text-base px-8 py-4">
              Book a turnover clean
            </Link>
          </Reveal>
        </div>
      </header>

      {/* ══════ TRUST BAR ══════ */}
      <Reveal>
        <section className="bg-cream">
          <div className="mx-auto max-w-[1200px] px-5 xl:px-0 py-5">
            <div className="grid grid-cols-2 md:flex md:justify-between gap-4 md:gap-6">
              {[
                'Same-day turnovers available',
                'Consistent specialist for your property',
                'Flat-rate pricing — no surprises',
                'Calendar sync for recurring bookings',
              ].map((label) => (
                <div key={label} className="flex items-center gap-2.5">
                  <svg className="w-5 h-5 text-forest shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-charcoal-light leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════ WHAT'S INCLUDED ══════ */}
      <section className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">WHAT&apos;S INCLUDED</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-4 text-[clamp(28px,4vw,44px)]">
              Guest-ready, every turnover
            </h2>
            <p className="font-body text-[17px] text-charcoal-light leading-relaxed text-center max-w-[560px] mx-auto mb-14">
              Every turnover covers a full clean, fresh linens, and a walkthrough — so your property is photo-ready before the next guest arrives.
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
              Your turnover rate depends on the size of your property. Recurring hosts get consistent pricing and priority scheduling — no guesswork between guests.
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
              Prices shown are per-turnover rates. Same-day priority turnovers include a $50 same-day service fee. Add-ons like laundry and restocking are priced separately.
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
              Customize your turnover
            </h2>
            <p className="font-body text-[17px] text-charcoal-light leading-relaxed text-center max-w-[480px] mx-auto mb-12">
              Add any of these to your booking for extra attention where it matters most.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[900px] mx-auto">
            {airbnbAddons.map((a, i) => (
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
              Five-star reviews start with a five-star clean
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-lg text-warm-white/80 leading-relaxed mb-9">
              Book your first turnover and see the difference a reliable cleaning partner makes for your hosting business.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-8 py-4 bg-warm-white text-forest font-body font-semibold text-base tracking-wide rounded-sm hover:shadow-hover hover:-translate-y-px transition-all duration-200"
            >
              Book a turnover clean
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
