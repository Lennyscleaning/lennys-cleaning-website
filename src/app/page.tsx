import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import TrustBar from '@/components/TrustBar';

/* ─── SEO Metadata ─── */
export const metadata: Metadata = {
  title: "Tacoma House Cleaning | Lenny's Cleaning — Tacoma, WA",
  description:
    'Book professional house cleaning in Tacoma starting at $125. Vetted professionals, flat-rate pricing, satisfaction guaranteed. See your price instantly.',
  openGraph: {
    title: "Tacoma House Cleaning | Lenny's Cleaning — Tacoma, WA",
    description:
      'Book professional house cleaning in Tacoma starting at $125. Vetted professionals, flat-rate pricing, satisfaction guaranteed.',
    url: 'https://lennyscleaning.com',
    siteName: "Lenny's Cleaning",
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tacoma House Cleaning | Lenny's Cleaning — Tacoma, WA",
    description:
      'Book professional house cleaning in Tacoma starting at $125. Vetted professionals, flat-rate pricing, satisfaction guaranteed.',
  },
};

/* ─── JSON-LD Structured Data ─── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: "Lenny's Cleaning",
  description: 'Professional residential cleaning service in Tacoma, WA',
  url: 'https://lennyscleaning.com',
  telephone: '+12536003355',
  email: 'hello@lennyscleaning.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tacoma',
    addressRegion: 'WA',
    addressCountry: 'US',
  },
  areaServed: [
    'Tacoma',
    'Lakewood',
    'Puyallup',
    'University Place',
    'Fife',
    'Spanaway',
    'Bonney Lake',
    'Gig Harbor',
  ],
};

/* ─── Static Data ─── */
const services = [
  {
    title: 'Standard cleaning',
    description:
      'Regular maintenance for homes that need consistent care. We handle kitchens, bathrooms, bedrooms, and living areas — every visit, every room.',
    price: '$125',
    image: '/images/lennys-website-images/img-open.webp',
    alt: 'Open-concept living room and kitchen in a Tacoma home, freshly cleaned',
    href: '/services/standard',
  },
  {
    title: 'Deep cleaning',
    description:
      "A thorough, top-to-bottom clean for homes that need extra attention. Ideal for first-time customers, seasonal refreshes, or when it's been a while.",
    price: '$200',
    image: '/images/lennys-website-images/img-bath.webp',
    alt: 'Clean bathroom with terracotta towels in a Tacoma home',
    href: '/services/deep',
    badge: 'Popular',
  },
  {
    title: 'Move-in / move-out cleaning',
    description:
      "Get every room, closet, and appliance move-ready. Whether you're welcoming new tenants or handing back the keys, we'll leave it spotless.",
    price: '$185',
    image: '/images/lennys-website-images/img-bed.webp',
    alt: 'Tidy bedroom with sage pillows in a Tacoma home ready for move-in',
    href: '/services/move',
  },
];

const valueCards = [
  {
    category: 'THE PROBLEM',
    label: 'The old model is broken',
    description:
      'Traditional cleaning companies charge premium prices, then pay their workers $16–24 an hour. The difference? Layers of overhead — dispatchers, office managers, call centers, and margins that benefit the company, not you or the person cleaning your home.',
  },
  {
    category: 'OUR APPROACH',
    label: 'Technology replaces overhead, not people',
    description:
      "Lenny's is built on automation and AI — from booking to dispatch to quality assurance. By eliminating the back-office bloat that drives up costs, we pass the savings in both directions: lower prices for you, higher pay for our professionals.",
  },
  {
    category: 'THE RESULT',
    label: 'You pay less. They earn $28–48/hr. Everyone wins.',
    description:
      "Our cleaning professionals earn 2–3x the industry average — which means less turnover, more experience, and someone who actually takes pride in the work. And you get a better clean at a better price. That's not a trade-off. That's better engineering.",
  },
];

const cityPills = [
  { name: 'Tacoma', href: '/tacoma' },
  { name: 'Lakewood', href: '/lakewood' },
  { name: 'Puyallup', href: '/puyallup' },
  { name: 'University Place', href: '/university-place' },
  { name: 'Fife', href: '/fife' },
  { name: 'Spanaway', href: '/spanaway' },
  { name: 'Bonney Lake', href: '/bonney-lake' },
  { name: 'Gig Harbor', href: '/gig-harbor' },
];

/* ─── Page Component ─── */
export default function HomePage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Scoped keyframes for hero entrance + Ken Burns */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes heroFadeUp {
              from { opacity: 0; transform: translateY(24px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes kenBurns {
              from { transform: scale(1); }
              to   { transform: scale(1.05); }
            }
            .hero-animate {
              opacity: 0;
              animation: heroFadeUp 0.8s var(--ease-out) forwards;
            }
            .ken-burns {
              animation: kenBurns 3s ease-in-out infinite alternate;
            }
          `,
        }}
      />

      {/* ═══════════════════════════════════════
          Section 1 — Hero
          ═══════════════════════════════════════ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background image with Ken Burns */}
        <div className="absolute inset-0 ken-burns">
          <Image
            src="/images/lennys-website-images/img-hero.webp"
            alt="Golden-hour living room with natural light streaming through windows in a Tacoma home"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 xl:px-0 py-24 md:py-32">
          <div className="max-w-[640px]">
            {/* Eyebrow */}
            <span
              className="hero-animate inline-block rounded-full bg-warm-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-forest mb-5"
              style={{ animationDelay: '200ms' }}
            >
              Now serving the South Sound
            </span>

            {/* H1 */}
            <h1
              className="hero-animate font-display font-semibold text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-[-0.02em] text-warm-white mb-5"
              style={{ animationDelay: '350ms' }}
            >
              Your home, expertly cleaned.
              <br />
              <span className="text-forest-light">Every time.</span>
            </h1>

            {/* Subtitle */}
            <p
              className="hero-animate font-body text-base md:text-lg leading-relaxed text-warm-white/90 max-w-[480px] mb-8"
              style={{ animationDelay: '500ms' }}
            >
              Lenny&apos;s matches you with vetted, local cleaning
              professionals — at a flat rate, with no surprises.
            </p>

            {/* CTAs */}
            <div
              className="hero-animate flex flex-wrap items-center gap-4 mb-6"
              style={{ animationDelay: '650ms' }}
            >
              <Link href="/book" className="btn-primary">
                Book a cleaning
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1 px-1 py-2 text-warm-white font-semibold text-[0.9375rem] tracking-[0.03em] border-b-2 border-warm-white/40 hover:border-warm-white transition-colors duration-200"
              >
                See pricing
                <span aria-hidden="true"> →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          Section 2 — Trust Bar
          ═══════════════════════════════════════ */}
      <TrustBar />

      {/* ═══════════════════════════════════════
          Section 3 — How It Works
          ═══════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-warm-white">
        <div className="mx-auto max-w-[1200px] px-5 xl:px-0">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <span className="overline block mb-3">How it works</span>
              <h2 className="font-display font-medium text-3xl md:text-[2.75rem] leading-[1.15] tracking-[-0.01em]">
                A spotless home in three simple steps
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-10 md:gap-8 max-w-[960px] mx-auto">
            {/* Step 1 */}
            <Reveal delay={0}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-forest text-warm-white flex items-center justify-center font-body font-bold text-lg mx-auto mb-5">
                  1
                </div>
                <h3 className="font-display font-medium text-xl md:text-2xl mb-3">
                  Tell us about your home
                </h3>
                <p className="text-charcoal-light leading-relaxed text-[0.9375rem] md:text-base">
                  Answer a few quick questions — bedrooms, bathrooms, and how
                  you&apos;d like it cleaned. You&apos;ll get an instant quote
                  with a transparent price breakdown.
                </p>
              </div>
            </Reveal>

            {/* Step 2 */}
            <Reveal delay={100}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-forest text-warm-white flex items-center justify-center font-body font-bold text-lg mx-auto mb-5">
                  2
                </div>
                <h3 className="font-display font-medium text-xl md:text-2xl mb-3">
                  We match your specialist
                </h3>
                <p className="text-charcoal-light leading-relaxed text-[0.9375rem] md:text-base">
                  We pair you with a vetted, background-checked cleaning
                  professional based on your location, your home&apos;s needs,
                  and availability.
                </p>
              </div>
            </Reveal>

            {/* Step 3 */}
            <Reveal delay={200}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-forest text-warm-white flex items-center justify-center font-body font-bold text-lg mx-auto mb-5">
                  3
                </div>
                <h3 className="font-display font-medium text-xl md:text-2xl mb-3">
                  Enjoy your clean home
                </h3>
                <p className="text-charcoal-light leading-relaxed text-[0.9375rem] md:text-base">
                  Come home to a place that feels brand new. Not satisfied? Let
                  us know within 24 hours and we&apos;ll make it right —
                  guaranteed.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Inline CTA */}
          <Reveal delay={300}>
            <div className="text-center mt-10">
              <Link
                href="/book"
                className="inline-flex items-center gap-1.5 text-forest font-semibold text-[0.9375rem] hover:text-forest-dark transition-colors"
              >
                Book a cleaning
                <span aria-hidden="true"> →</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          Section 4 — Photo Break
          ═══════════════════════════════════════ */}
      <section className="relative min-h-[200px] md:min-h-[300px] overflow-hidden">
        <div className="absolute inset-0 ken-burns">
          <Image
            src="/images/lennys-website-images/img-detail.webp"
            alt="Close-up of a clean counter with a vase in a Tacoma home"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        {/* Forest green gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-forest/80 to-forest/50" />
      </section>

      {/* ═══════════════════════════════════════
          Section 5 — Our Services
          ═══════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="mx-auto max-w-[1200px] px-5 xl:px-0">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <span className="overline block mb-3">Our services</span>
              <h2 className="font-display font-medium text-3xl md:text-[2.75rem] leading-[1.15] tracking-[-0.01em] mb-4">
                Cleaning tailored to your home
              </h2>
              <p className="text-charcoal-light text-base md:text-lg max-w-[540px] mx-auto leading-relaxed">
                Every home is different. Choose the service that fits — or let
                us recommend one.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 md:gap-7">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 100}>
                <div className="group bg-warm-white rounded-md shadow-sm hover:shadow-hover transition-all duration-250 ease-out hover:-translate-y-1 overflow-hidden h-full flex flex-col">
                  {/* Card image */}
                  <div className="relative h-[200px] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {service.badge && (
                      <span className="absolute top-3 left-3 bg-forest text-warm-white text-xs font-semibold px-3 py-1 rounded-full">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    <h3 className="font-display font-medium text-xl md:text-2xl mb-3">
                      {service.title}
                    </h3>
                    <p className="text-charcoal-light leading-relaxed text-[0.9375rem] mb-5 flex-1">
                      {service.description}
                    </p>
                    <p className="text-forest font-semibold text-[0.9375rem] mb-4">
                      Starting at {service.price}
                    </p>
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-1 text-forest font-medium text-[0.9375rem] hover:text-forest-dark transition-colors"
                    >
                      Learn more
                      <span aria-hidden="true"> →</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          Section 6 — The Lenny's Difference
          ═══════════════════════════════════════ */}
      <section className="grid md:grid-cols-2 md:items-center">
        {/* Left — Forest green statement */}
        <div className="relative bg-forest overflow-hidden">
          {/* Grain texture */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative z-10 px-14 md:px-[100px] lg:px-[140px] py-16 md:py-[80px]">
            <Reveal>
              <span className="font-body font-semibold text-[0.6875rem] uppercase tracking-[0.1em] text-warm-white/50 block mb-6">
                Why Lenny&apos;s
              </span>
              <p className="font-display font-normal text-[2.6rem] leading-[1.15] tracking-[-0.01em] text-warm-white">
                Lower prices <em>for you.</em>
                <br />
                Higher pay <em>for them.</em>
              </p>
              <div className="border-t border-warm-white/15 mt-6 pt-6">
                <p className="font-display font-medium text-[1.8rem] leading-[1.15] tracking-[-0.01em] text-terra">
                  = Better cleaners.
                  <br />
                  Happier customers.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right — Value cards */}
        <div className="bg-warm-white flex flex-col justify-center px-10 md:px-[60px] py-16 md:py-[80px]">
          <div className="flex flex-col">
            {valueCards.map((card, i) => (
              <Reveal key={card.label} delay={i * 100}>
                <div className={`py-6 ${i < valueCards.length - 1 ? 'border-b border-cream-dark' : ''}`}>
                  <span className="font-body font-semibold text-[0.6875rem] uppercase tracking-[0.1em] text-terra block mb-2">
                    {card.category}
                  </span>
                  <h3 className="font-display font-medium text-[1.2rem] leading-tight mb-2">
                    {card.label}
                  </h3>
                  <p className="font-body text-[0.88rem] text-charcoal-light leading-[1.65]">
                    {card.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          Section 7 — Operator Recruitment Banner
          ═══════════════════════════════════════ */}
      <Reveal>
        <section className="bg-forest py-8 md:py-12">
          <div className="mx-auto max-w-[1200px] px-5 xl:px-0 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="text-warm-white font-display font-medium text-lg md:text-xl mb-1">
                Are you a cleaning professional in the South Sound?
              </p>
              <p className="text-warm-white/80 text-sm md:text-[0.9375rem] leading-relaxed">
                Join Tacoma&apos;s highest-paying cleaning platform. Earn
                $28–48/hr, set your own schedule, and keep 75% of every job.
              </p>
            </div>
            <Link
              href="/join-our-team"
              className="btn-primary shrink-0 self-start md:self-center"
            >
              Learn more &amp; apply
            </Link>
          </div>
        </section>
      </Reveal>

      {/* ═══════════════════════════════════════
          Section 8 — Service Areas
          ═══════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="mx-auto max-w-[1200px] px-5 xl:px-0">
          <Reveal>
            <div className="text-center mb-10 md:mb-14">
              <span className="overline block mb-3">Where we clean</span>
              <h2 className="font-display font-medium text-3xl md:text-[2.75rem] leading-[1.15] tracking-[-0.01em] mb-4">
                Proudly serving the South Sound
              </h2>
              <p className="text-charcoal-light text-base md:text-lg max-w-[540px] mx-auto leading-relaxed">
                From Tacoma to Gig Harbor, Puyallup to Bonney Lake — if
                you&apos;re in the South Sound, we&apos;re in your
                neighborhood.
              </p>
            </div>
          </Reveal>

          {/* City pills */}
          <Reveal delay={100}>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {cityPills.map((city) => (
                <Link
                  key={city.name}
                  href={city.href}
                  className="rounded-full px-5 py-2.5 text-sm font-medium text-forest bg-cream-dark border border-gray-l/60 hover:bg-forest hover:text-warm-white hover:border-forest transition-all duration-200"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-center text-charcoal-light text-sm md:text-[0.9375rem]">
              Don&apos;t see your area? Call us at{' '}
              <a
                href="tel:+12536003355"
                className="text-forest font-medium hover:text-forest-dark transition-colors"
              >
                (253) 600-3355
              </a>{' '}
              — we may be closer than you think.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          Section 9 — Final CTA
          ═══════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-forest overflow-hidden">
        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 mx-auto max-w-[800px] px-5 xl:px-0 text-center">
          <Reveal>
            <h2 className="font-display font-medium text-3xl md:text-[2.75rem] lg:text-5xl leading-[1.15] tracking-[-0.01em] text-warm-white mb-5">
              Your home deserves Lenny&apos;s
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-warm-white/90 text-base md:text-lg leading-relaxed max-w-[560px] mx-auto mb-8">
              Book a cleaning in under two minutes. Flat-rate pricing,
              background-checked professionals, and a satisfaction guarantee on
              every visit.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book" className="btn-primary">
                Book a cleaning
              </Link>
              <a
                href="tel:+12536003355"
                className="text-warm-white/70 text-sm font-medium hover:text-warm-white transition-colors"
              >
                Or call us: (253) 600-3355
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
