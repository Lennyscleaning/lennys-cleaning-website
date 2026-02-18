import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import FaqAccordion from '@/components/FaqAccordion';
import TrustBar from '@/components/TrustBar';
import { fetchPricingData } from '@/lib/fetch-pricing';

/* ─── SEO ─── */
export const metadata: Metadata = {
  title: 'Move-In/Out Cleaning',
  description:
    'Book move-in or move-out cleaning in Tacoma starting at $175. Get your deposit back or start fresh with vetted cleaning professionals.',
  openGraph: {
    title: "Move-In/Out Cleaning | Lenny's Cleaning — Tacoma, WA",
    description:
      'Book move-in or move-out cleaning in Tacoma starting at $175. Get your deposit back or start fresh with vetted cleaning professionals.',
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
  closets: (
    <svg className="w-7 h-7 text-forest shrink-0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="2" width="18" height="20" rx="2" />
      <path d="M12 2v20M9 12h2M13 12h2" />
    </svg>
  ),
  floors: (
    <svg className="w-7 h-7 text-forest shrink-0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 12h18M12 3v18" />
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
    items: 'Counters and stovetop degreased, sink deep-scrubbed, inside oven cleaned, inside refrigerator wiped, inside dishwasher detailed, backsplash scrubbed, cabinet faces wiped, floor swept and mopped',
  },
  {
    icon: icons.bathroom,
    title: 'Bathrooms',
    items: 'Toilet sanitized inside and out, shower and tub deep-scrubbed, grout lines cleaned, mirrors and fixtures polished, inside medicine cabinet wiped, counters detailed, exhaust fan dusted, floor mopped',
  },
  {
    icon: icons.closets,
    title: 'Closets and storage',
    items: 'All closet interiors wiped down, shelves dusted, closet rods cleaned, linen closets detailed, pantry shelves wiped, storage areas swept and mopped',
  },
  {
    icon: icons.floors,
    title: 'All flooring',
    items: 'Every floor surface vacuumed or swept, hard floors mopped, carpet edges vacuumed, floor corners and baseboards detailed, transition strips cleaned',
  },
  {
    icon: icons.appliance,
    title: 'Inside all appliances',
    items: 'Oven, refrigerator, dishwasher, and microwave cleaned inside — all included at no extra charge. We leave the kitchen move-in ready.',
  },
  {
    icon: icons.detail,
    title: 'Detail work',
    items: 'Baseboards fully wiped, light fixtures and ceiling fans dusted, all light switches and outlets sanitized, window sills cleaned, door frames and hinges detailed, vents and registers dusted',
  },
];

const faqs = [
  {
    question: 'Will this help me get my security deposit back?',
    answer: "That's the goal. A move-out clean covers everything landlords and property managers check during inspections — inside appliances, closet interiors, baseboards, fixtures, and every floor surface. We clean to the standard most leases require.",
  },
  {
    question: "Can I book a move-in clean for a place I'm moving into?",
    answer: "This service works for both move-in and move-out. Whether you're leaving a space spotless or starting fresh in a new one, the scope is the same — a complete, top-to-bottom clean of every room.",
  },
  {
    question: 'How long does a move-in/out clean take?',
    answer: "Most move-in/out cleans take 3–6 hours depending on the size and condition of the home. Empty homes are faster to clean than furnished ones. You'll see an estimated duration when you book.",
  },
  {
    question: 'Does the home need to be empty?',
    answer: "It doesn't need to be completely empty, but the more cleared out it is, the more thorough we can be — especially with floors, closets, and behind appliances. If furniture is still in place, we'll clean around it.",
  },
  {
    question: 'What if my landlord has a specific checklist?',
    answer: "Add any special requirements in the notes when you book, or share the checklist with your specialist when they arrive. We're happy to prioritize the items your landlord cares about most.",
  },
  {
    question: 'Can I book this for a rental property I manage?',
    answer: 'Yes — we work with individual homeowners, renters, and property managers. If you manage multiple units, reach out to us directly and we can set up a recurring arrangement.',
  },
];

/* ─── JSON-LD ─── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Move-In/Out Cleaning Service',
  provider: {
    '@type': 'LocalBusiness',
    name: "Lenny's Cleaning",
    telephone: '+12536003355',
    areaServed: { '@type': 'City', name: 'Tacoma', addressRegion: 'WA' },
  },
  description:
    'Transition cleaning for moves, lease turnovers, and fresh starts in Tacoma. Inside appliances, closets, baseboards — every surface inspected and cleaned.',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '175',
    priceSpecification: { '@type': 'UnitPriceSpecification', unitText: 'starting at' },
  },
};

/* ─── PAGE ─── */
export default async function MoveOutCleaningPage() {
  const pricingData = await fetchPricingData();
  const pricing = pricingData.movePricing;
  const moveAddons = pricingData.addons;

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
            <p className="overline mb-3">MOVE-IN / MOVE-OUT</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display font-semibold text-charcoal leading-[1.1] tracking-tight mb-5 text-[clamp(36px,5vw,58px)]">
              Move-in and move-out cleaning in Tacoma
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-[19px] text-charcoal-light leading-relaxed max-w-[560px] mx-auto mb-9">
              Transition cleaning for moves, lease turnovers, and fresh starts. We leave the space ready for whoever comes next.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <Link href="/book" className="btn-primary text-base px-8 py-4">
              Book a move-in/out clean
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
              Move-ready, top to bottom
            </h2>
            <p className="font-body text-[17px] text-charcoal-light leading-relaxed text-center max-w-[560px] mx-auto mb-14">
              A move-in/out clean covers every surface a landlord, property manager, or new owner will inspect — including inside all appliances and closets.
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
              Your price depends on the size of the home and a few details about its condition. You&apos;ll see your exact price before you book — no estimates, no surprises.
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[900px] mx-auto">
            {moveAddons.map((a, i) => (
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
              Inside oven, inside refrigerator, baseboards, and closet interiors are already included in every move-in/out clean.
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
              Leave it spotless — or start fresh
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-lg text-warm-white/80 leading-relaxed mb-9">
              Book today and take the stress out of your move.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-8 py-4 bg-warm-white text-forest font-body font-semibold text-base tracking-wide rounded-sm hover:shadow-hover hover:-translate-y-px transition-all duration-200"
            >
              Book a move-in/out clean
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
