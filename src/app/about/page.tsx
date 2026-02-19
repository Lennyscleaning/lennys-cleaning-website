import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import TrustBar from '@/components/TrustBar';

/* ─── SEO ─── */
export const metadata: Metadata = {
  title: "About Us",
  description:
    "Lenny's Cleaning was founded on a simple idea: homeowners deserve better pricing, and cleaning professionals deserve better pay. Meet the team behind Tacoma's trusted cleaning marketplace.",
  openGraph: {
    title: "About Lenny's Cleaning | Tacoma, WA",
    description:
      "Lenny's Cleaning was founded on a simple idea: homeowners deserve better pricing, and cleaning professionals deserve better pay. Meet the team behind Tacoma's trusted cleaning marketplace.",
  },
};

/* ─── Data ─── */
const beliefs = [
  {
    title: 'Operators are partners, not commodities',
    body: 'Our cleaning professionals earn $34–56/hr — 2–3x the industry average. We pay weekly, we pay transparently, and we never cut corners on the people doing the work.',
  },
  {
    title: 'Technology replaces overhead, not people',
    body: 'Automation handles booking, dispatch, payments, and quality tracking. That means lower costs for you without sacrificing the human touch where it matters.',
  },
  {
    title: 'Transparency builds trust',
    body: "Flat-rate pricing. No hidden fees. Background-checked professionals. We tell you exactly what you'll pay and exactly who's coming to your home.",
  },
];

const stats = [
  { value: '$34–56/hr', label: 'operator earnings' },
  { value: '70–78%', label: 'of every job goes to the professional' },
  { value: '100%', label: 'background-checked team' },
  { value: 'Flat rate', label: 'no hourly surprises' },
];

const serviceAreas = [
  'Tacoma',
  'Lakewood',
  'Puyallup',
  'University Place',
  'Fife',
  'Bonney Lake',
  'Gig Harbor',
  'Spanaway',
];

const grainSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`;

/* ─── PAGE ─── */
export default function AboutPage() {
  return (
    <>
      {/* ══════ HERO ══════ */}
      <header className="bg-warm-white pt-[120px] pb-20 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <Reveal>
            <p className="overline mb-3">ABOUT US</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display font-semibold text-charcoal leading-[1.1] tracking-tight mb-5 text-[clamp(36px,5vw,58px)]">
              A better deal for everyone
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-[19px] text-charcoal-light leading-relaxed max-w-[560px] mx-auto">
              Lenny&apos;s Cleaning was built on a simple idea: if you cut the overhead, you can charge homeowners less and pay cleaning professionals more. So that&apos;s exactly what we did.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ══════ TRUST BAR ══════ */}
      <TrustBar />

      {/* ══════ THE ORIGIN STORY ══════ */}
      <section className="py-24 px-6">
        <div className="max-w-[700px] mx-auto">
          <Reveal>
            <p className="overline mb-3">OUR STORY</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight mb-6 text-[clamp(28px,4vw,44px)]">
              How an Army nickname became a cleaning company
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-[17px] text-charcoal-light leading-relaxed">
              The name &ldquo;Lenny&rdquo; started as a nickname Eric picked up during his time in the Army. Years later, when he set out to build a cleaning marketplace that actually worked for both sides — homeowners and professionals — the name stuck. Lenny&apos;s Cleaning launched in Tacoma in 2026 with a straightforward mission: use technology to eliminate the overhead that drives up prices and drives down wages.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════ WHAT WE BELIEVE ══════ */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">WHAT WE BELIEVE</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-14 text-[clamp(28px,4vw,44px)]">
              Built on three principles
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
            {beliefs.map((card, i) => (
              <Reveal key={card.title} delay={i * 100}>
                <div className="bg-warm-white rounded-md p-7 h-full">
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

      {/* ══════ BY THE NUMBERS ══════ */}
      <section className="relative py-24 px-6 bg-forest overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: grainSvg }}
        />
        <div className="relative z-10 max-w-[1000px] mx-auto">
          <Reveal>
            <p className="font-body font-semibold text-[0.6875rem] uppercase tracking-[0.1em] text-warm-white/50 text-center mb-3">
              BY THE NUMBERS
            </p>
            <h2 className="font-display font-medium text-warm-white leading-[1.15] tracking-tight text-center mb-14 text-[clamp(28px,4vw,44px)]">
              Where the money goes
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 100}>
                <div className="text-center">
                  <p className="font-display font-semibold text-[clamp(28px,4vw,42px)] text-warm-white leading-tight mb-2">
                    {stat.value}
                  </p>
                  <p className="font-body text-sm text-warm-white/70 leading-snug">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ SERVING THE SOUTH SOUND ══════ */}
      <section className="py-24 px-6">
        <div className="max-w-[700px] mx-auto">
          <Reveal>
            <p className="overline mb-3">SERVICE AREA</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight mb-6 text-[clamp(28px,4vw,44px)]">
              Proudly serving Tacoma and the South Sound
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-[17px] text-charcoal-light leading-relaxed mb-10">
              We started in Tacoma because it&apos;s home. We&apos;re expanding across the South Sound — Lakewood, Puyallup, University Place, and beyond — because every community deserves access to reliable, fairly priced cleaning services.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="flex flex-wrap gap-3">
              {serviceAreas.map((city) => (
                <Link
                  key={city}
                  href={`/house-cleaning-${city.toLowerCase().replace(/\s+/g, '-')}`}
                  className="font-body text-sm font-medium text-forest bg-cream rounded-full px-5 py-2.5 hover:bg-forest hover:text-warm-white transition-colors duration-200"
                >
                  {city}
                </Link>
              ))}
            </div>
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
              Ready for a better clean?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-lg text-warm-white/80 leading-relaxed mb-9">
              Whether you need a spotless home or a rewarding career, we&apos;d love to hear from you.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center px-8 py-4 bg-warm-white text-forest font-body font-semibold text-base tracking-wide rounded-sm hover:shadow-hover hover:-translate-y-px transition-all duration-200"
              >
                Book a cleaning
              </Link>
              <Link
                href="/join-our-team"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-warm-white/60 text-warm-white font-body font-semibold text-base tracking-wide rounded-sm hover:bg-warm-white/10 transition-all duration-200"
              >
                Join our team
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
