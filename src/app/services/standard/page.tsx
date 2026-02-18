import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import FaqAccordion from '@/components/FaqAccordion';
import TrustBar from '@/components/TrustBar';
import { fetchPricingData } from '@/lib/fetch-pricing';

/* ─── SEO ─── */
export const metadata: Metadata = {
  title: "Standard House Cleaning in Tacoma | Lenny's Cleaning",
  description:
    'Book routine residential cleaning in Tacoma starting at $85. Kitchens, bathrooms, bedrooms, and living areas — every room, every visit. Flat-rate pricing, vetted professionals.',
  openGraph: {
    title: "Standard House Cleaning in Tacoma | Lenny's Cleaning — Tacoma, WA",
    description:
      'Book routine residential cleaning in Tacoma starting at $85. Kitchens, bathrooms, bedrooms, and living areas — every room, every visit.',
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
  throughout: (
    <svg className="w-7 h-7 text-forest shrink-0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

/* ─── Data ─── */
const inclusions = [
  {
    icon: icons.kitchen,
    title: 'Kitchen',
    items: 'Countertops wiped and sanitized, stovetop exterior cleaned, sink scrubbed, cabinet fronts wiped, appliance exteriors wiped, backsplash spot-cleaned, floor swept and mopped',
  },
  {
    icon: icons.bathroom,
    title: 'Bathrooms',
    items: 'Toilet sanitized inside and out, shower and tub scrubbed, sink and vanity cleaned, mirrors polished, fixtures wiped, floor mopped',
  },
  {
    icon: icons.bedroom,
    title: 'Bedrooms',
    items: 'All surfaces dusted and wiped, beds made, mirrors and glass cleaned, floors vacuumed and mopped, trash emptied',
  },
  {
    icon: icons.living,
    title: 'Living areas',
    items: 'All surfaces dusted, furniture spot-cleaned, floors vacuumed and mopped, cushions straightened, trash emptied',
  },
  {
    icon: icons.throughout,
    title: 'Throughout your home',
    items: 'Baseboards lightly dusted, light switches and door handles sanitized, cobwebs removed, trash collected and taken out, general tidying of each room',
  },
];

const faqs = [
  {
    question: 'What does a standard cleaning include?',
    answer: 'A standard cleaning covers every room in your home — kitchens, bathrooms, bedrooms, and living areas. We wipe surfaces, scrub sinks and toilets, make beds, dust, vacuum, mop floors, and take out trash. It\'s a thorough maintenance clean designed to keep your home consistently fresh.',
  },
  {
    question: 'How long does a standard cleaning take?',
    answer: 'Most standard cleanings take 1–3 hours depending on the size of your home and its current condition. A 2-bedroom home typically takes about 1.5–2 hours. Your specialist stays until the job is done — never rushed.',
  },
  {
    question: 'How is pricing determined?',
    answer: 'Your price is based on the number of bedrooms and bathrooms in your home, plus a few details about its condition. You\'ll see your exact, flat-rate price before you book — no hourly rates, no estimates, no surprises.',
  },
  {
    question: "What's the difference between standard and deep cleaning?",
    answer: "A standard clean covers regular maintenance — surfaces, floors, kitchens, and bathrooms. A deep clean goes further: inside appliances, detailed baseboards, light fixtures, ceiling fans, behind furniture, and areas that don't get attention every week. If it's been more than three months since your last professional cleaning, we recommend starting with a deep clean.",
  },
  {
    question: 'Do I need to be home during the cleaning?',
    answer: "No — most customers aren't home during the cleaning. You can leave a key, provide a door code, or use a lockbox. Your specialist will lock up when they're done. If you prefer to be home, that's perfectly fine too.",
  },
];

/* ─── JSON-LD ─── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Standard House Cleaning Service',
  provider: {
    '@type': 'LocalBusiness',
    name: "Lenny's Cleaning",
    telephone: '+12536003355',
    areaServed: { '@type': 'City', name: 'Tacoma', addressRegion: 'WA' },
  },
  description:
    'Routine residential cleaning for homes in Tacoma. Kitchens, bathrooms, bedrooms, and living areas — every room, every visit. Flat-rate pricing, vetted professionals.',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '85',
    priceSpecification: { '@type': 'UnitPriceSpecification', unitText: 'starting at' },
  },
};

/* ─── PAGE ─── */
export default async function StandardCleaningPage() {
  const pricingData = await fetchPricingData();
  const pricing = pricingData.standardPricing;
  const standardAddons = pricingData.addons;

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
            <p className="overline mb-3">STANDARD CLEANING</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display font-semibold text-charcoal leading-[1.1] tracking-tight mb-5 text-[clamp(36px,5vw,58px)]">
              Standard house cleaning in Tacoma
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-[19px] text-charcoal-light leading-relaxed max-w-[560px] mx-auto mb-9">
              A thorough, top-to-bottom clean for your entire home — at a flat rate with no surprises.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <Link href="/book" className="btn-primary text-base px-8 py-4">
              Book a standard cleaning
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
              Every room, every visit
            </h2>
            <p className="font-body text-[17px] text-charcoal-light leading-relaxed text-center max-w-[560px] mx-auto mb-14">
              A standard clean covers everything your home needs to stay fresh and well-maintained — kitchens, bathrooms, bedrooms, and living areas.
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

      {/* ══════ NOT INCLUDED ══════ */}
      <section className="px-6 pb-24">
        <div className="max-w-[800px] mx-auto">
          <Reveal>
            <div className="bg-cream rounded-md p-7">
              <h3 className="font-display font-medium text-lg text-charcoal mb-3">
                Looking for something more thorough?
              </h3>
              <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                A standard clean does not include inside appliances, inside cabinets, interior windows, or deep scrubbing of grout and baseboards. For a full top-to-bottom reset, check out our{' '}
                <Link href="/services/deep" className="text-forest font-medium hover:text-forest-dark transition-colors">
                  deep cleaning service
                </Link>
                .
              </p>
            </div>
          </Reveal>
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
              Exact pricing based on your home size and condition. Get your quote in 60 seconds.
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
            {standardAddons.map((a, i) => (
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
              Your home, expertly cleaned
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-lg text-warm-white/80 leading-relaxed mb-9">
              Book a standard cleaning in under two minutes. Flat-rate pricing, vetted professionals, satisfaction guaranteed.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-8 py-4 bg-warm-white text-forest font-body font-semibold text-base tracking-wide rounded-sm hover:shadow-hover hover:-translate-y-px transition-all duration-200"
            >
              Book a standard cleaning
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
