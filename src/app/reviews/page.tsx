import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';

/* ─── SEO ─── */
export const metadata: Metadata = {
  title: "Reviews | Lenny's Cleaning — Tacoma, WA",
  description:
    "Read honest reviews from Tacoma homeowners about Lenny's Cleaning. Background-checked professionals, flat-rate pricing, satisfaction guaranteed.",
  openGraph: {
    title: "Reviews | Lenny's Cleaning — Tacoma, WA",
    description:
      "Read honest reviews from Tacoma homeowners about Lenny's Cleaning. Background-checked professionals, flat-rate pricing, satisfaction guaranteed.",
  },
};

/* ─── Inline SVG icons ─── */
const icons = {
  shield: (
    <svg className="w-7 h-7 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  dollar: (
    <svg className="w-7 h-7 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M16 8h-2a3 3 0 100 6h0a3 3 0 010 6H8M12 2v2M12 20v2" />
    </svg>
  ),
  thumbsUp: (
    <svg className="w-7 h-7 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
      <path d="M7 11V4a2 2 0 012-2h0a2 2 0 012 2v3h4.27a2 2 0 012 2.18l-.9 7A2 2 0 0114.4 22H7" />
    </svg>
  ),
};

/* ─── Data ─── */
const trustCards = [
  {
    icon: icons.shield,
    title: 'Every pro is vetted',
    body: 'Background-checked, experienced, and held to our quality standards.',
  },
  {
    icon: icons.dollar,
    title: 'You pay less, they earn more',
    body: 'Our professionals earn $34–56/hr because better pay means better work.',
  },
  {
    icon: icons.thumbsUp,
    title: 'Satisfaction guaranteed',
    body: "Not happy? We'll send someone back to make it right — free.",
  },
];

const steps = [
  {
    num: '1',
    title: 'You book a cleaning',
    body: 'Pick your service, schedule a time, and confirm.',
  },
  {
    num: '2',
    title: 'We follow up',
    body: 'After every clean, we send a quick satisfaction check. Your honest feedback helps us improve.',
  },
  {
    num: '3',
    title: 'Reviews appear here',
    body: 'Real reviews from real customers. No editing, no filtering, no fake 5-stars.',
  },
];

/* ─── PAGE ─── */
export default function ReviewsPage() {
  return (
    <>
      {/* ══════ HERO ══════ */}
      <header className="bg-warm-white pt-[120px] pb-20 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <Reveal>
            <p className="overline mb-3">REVIEWS</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display font-semibold text-charcoal leading-[1.1] tracking-tight mb-5 text-[clamp(36px,5vw,58px)]">
              Honest reviews from real customers
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-[19px] text-charcoal-light leading-relaxed max-w-[560px] mx-auto">
              We&apos;re earning our reviews the old-fashioned way — one spotless home at a time. As a new service, we don&apos;t have reviews yet. But here&apos;s what we promise.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ══════ TRUST CARDS ══════ */}
      <section className="py-24 px-6">
        <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 80}>
              <div className="bg-cream rounded-md p-7 h-full text-center">
                <div className="flex justify-center mb-4">{card.icon}</div>
                <h3 className="font-display font-medium text-xl text-charcoal leading-tight mb-2">
                  {card.title}
                </h3>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                  {card.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════ HOW REVIEWS WORK ══════ */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[700px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">HOW IT WORKS</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-14 text-[clamp(28px,4vw,44px)]">
              How reviews work
            </h2>
          </Reveal>
          <div className="space-y-10">
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 80}>
                <div className="flex gap-5">
                  <span className="shrink-0 w-10 h-10 rounded-full bg-forest text-warm-white font-body font-semibold text-base flex items-center justify-center">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="font-display font-medium text-lg text-charcoal leading-tight mb-1">
                      {step.title}
                    </h3>
                    <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FOUNDING CUSTOMER CTA ══════ */}
      <section className="bg-forest bg-[url('/images/grain.png')] bg-repeat py-24 px-6 text-center">
        <div className="max-w-[600px] mx-auto">
          <Reveal>
            <h2 className="font-display font-medium text-warm-white leading-[1.15] mb-4 text-[clamp(28px,4vw,44px)]">
              Be one of our first customers
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-lg text-warm-white/80 leading-relaxed mb-9">
              Early customers shape the Lenny&apos;s experience. Book today and help us build something worth talking about.
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
