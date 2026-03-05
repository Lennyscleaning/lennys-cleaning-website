import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';

/* ─── SEO ─── */
export const metadata: Metadata = {
  title: "What's Included in Each Cleaning",
  description:
    "See exactly what's included in every Lenny's Cleaning service — standard, deep, move-in/out, Airbnb turnover, and post-construction. No surprises, just a clean home.",
  openGraph: {
    title: "What's Included in Each Cleaning | Lenny's Cleaning — Tacoma, WA",
    description:
      "See exactly what's included in every Lenny's Cleaning service. No surprises, just a clean home.",
  },
};

/* ─── Data ─── */
const services = [
  {
    name: 'Standard cleaning',
    included: [
      'Dust all surfaces',
      'Vacuum all floors',
      'Mop hard floors',
      'Clean kitchen counters and sink',
      'Clean stovetop exterior',
      'Clean microwave exterior',
      'Clean all bathrooms (toilet, shower, tub, sink, mirrors)',
      'Empty trash cans',
      'Wipe light switches and door handles',
      'Make beds (linens left out)',
    ],
    notIncluded: [
      'Inside oven',
      'Inside fridge',
      'Inside cabinets',
      'Interior windows',
      'Laundry',
      'Dishes',
      'Baseboards',
      'Walls',
      'Garage',
      'Patio / deck',
    ],
    addonsNote: true,
  },
  {
    name: 'Deep cleaning',
    preamble: 'Everything in Standard plus:',
    included: [
      'Baseboards',
      'Light fixtures',
      'Behind and under furniture',
      'Detailed kitchen appliance exteriors',
      'Ceiling fan blades',
      'Door frames and trim',
      'Vent covers',
      'Cabinet fronts wiped',
    ],
    notIncluded: [
      'Inside oven',
      'Inside fridge',
      'Inside cabinets',
      'Interior windows',
      'Laundry',
      'Dishes',
      'Garage',
      'Patio / deck',
    ],
    addonsNote: true,
  },
  {
    name: 'Move-in / move-out',
    preamble: 'Everything in Deep plus:',
    included: [
      'Inside oven',
      'Inside fridge',
      'Inside cabinets',
      'Interior windows',
      'Baseboards detail clean',
      'Wall spot cleaning',
      'Light switch and outlet covers',
      'Closet shelves and rods',
    ],
    notIncluded: [
      'Laundry',
      'Dishes',
      'Garage',
      'Patio / deck',
      'Carpet shampooing',
      'Exterior windows',
    ],
  },
  {
    name: 'Airbnb turnover',
    preamble: 'Everything in Standard plus:',
    included: [
      'Restock supplies check',
      'Linen change (linens provided by host)',
      'Check for damages',
      'Lockbox / access reset',
      'Quick staging per host instructions',
    ],
    notIncluded: [
      'Deep cleaning tasks',
      'Laundry beyond linens',
      'Shopping for supplies',
      'Interior windows',
      'Garage',
    ],
  },
  {
    name: 'Post-construction',
    preamble: 'Everything in Deep plus:',
    included: [
      'Dust removal from all surfaces including ceilings',
      'Window sill and track cleaning',
      'Interior window cleaning',
      'Construction adhesive / sticker removal',
      'Cabinet interior wipe-down',
      'Vent and register cleaning',
      'Light fixture detail cleaning',
      'Final detail pass',
    ],
    notIncluded: [
      'Exterior cleaning',
      'Paint touch-up',
      'Debris / material hauling',
      'Carpet installation cleaning',
      'Exterior windows',
    ],
  },
];

/* ─── PAGE ─── */
export default function WhatsIncludedPage() {
  return (
    <section className="bg-warm-white pt-[120px] pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Reveal>
          <h1 className="font-display font-semibold text-charcoal leading-[1.1] tracking-tight mb-4 text-[clamp(32px,5vw,48px)]">
            What&apos;s included in each cleaning
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="font-body text-lg text-charcoal-light leading-relaxed mb-16 max-w-2xl">
            Every service builds on the last. Here&apos;s exactly what you get — and what&apos;s available as an add-on.
          </p>
        </Reveal>

        {/* Service sections */}
        <div className="space-y-16">
          {services.map((service, idx) => (
            <Reveal key={service.name} delay={idx === 0 ? 150 : 0}>
              <div>
                <h2 className="font-display font-semibold text-2xl text-charcoal mb-6">
                  {service.name}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Included column */}
                  <div className="bg-forest/5 rounded-md p-6">
                    <h3 className="font-body font-semibold text-sm text-forest mb-4 uppercase tracking-wide">
                      Included
                    </h3>
                    {service.preamble && (
                      <p className="font-body text-sm text-forest/80 italic mb-3">
                        {service.preamble}
                      </p>
                    )}
                    <ul className="space-y-2">
                      {service.included.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <svg
                            className="w-4 h-4 text-forest shrink-0 mt-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          <span className="font-body text-sm text-charcoal">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Not included column */}
                  <div className="bg-cream/60 rounded-md p-6">
                    <h3 className="font-body font-semibold text-sm text-charcoal-light mb-4 uppercase tracking-wide">
                      Not included
                    </h3>
                    <ul className="space-y-2">
                      {service.notIncluded.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <svg
                            className="w-4 h-4 text-gray-m shrink-0 mt-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                          <span className="font-body text-sm text-charcoal-light">{item}</span>
                        </li>
                      ))}
                    </ul>
                    {service.addonsNote && (
                      <p className="font-body text-xs text-charcoal-light/70 mt-4">
                        These are available as{' '}
                        <Link href="/book" className="text-forest hover:text-forest-dark underline underline-offset-2">
                          add-ons during booking
                        </Link>
                        .
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal>
          <div className="mt-20 text-center">
            <Link href="/book" className="btn-primary text-base px-10 py-4">
              Book a cleaning
            </Link>
            <p className="font-body text-sm text-charcoal-light mt-4">
              Need something not listed? Add it on during booking or email us at{' '}
              <a
                href="mailto:hello@lennyscleaning.com"
                className="text-forest hover:text-forest-dark font-medium"
              >
                hello@lennyscleaning.com
              </a>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
