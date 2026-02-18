import Link from 'next/link';
import Reveal from '@/components/Reveal';
import TrustBar from '@/components/TrustBar';
import { fetchPricingData } from '@/lib/fetch-pricing';

interface NearbyArea {
  name: string;
  slug: string;
}

interface CityPageProps {
  cityName: string;
  citySlug: string;
  nearbyAreas: NearbyArea[];
}

const valueProps = [
  {
    title: 'Flat-rate pricing',
    body: 'Know your exact cost before we arrive. No hourly estimates that balloon.',
    icon: (
      <svg className="w-7 h-7 text-forest shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
      </svg>
    ),
  },
  {
    title: 'Background-checked pros',
    body: 'Every cleaning professional passes a comprehensive background check.',
    icon: (
      <svg className="w-7 h-7 text-forest shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: 'Satisfaction guaranteed',
    body: "Not happy? We'll send someone back to make it right — free of charge.",
    icon: (
      <svg className="w-7 h-7 text-forest shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
];

const steps = [
  {
    num: '01',
    title: 'Book in 60 seconds',
    body: 'Pick your service, enter your home details, and choose a time that works for you.',
  },
  {
    num: '02',
    title: 'We match you with a pro',
    body: 'A background-checked, local cleaning professional is assigned based on your location and needs.',
  },
  {
    num: '03',
    title: 'Enjoy your clean home',
    body: 'Your professional arrives on time, does a thorough job, and your satisfaction is guaranteed.',
  },
];

const grainSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`;

export default async function CityPageTemplate({ cityName, citySlug, nearbyAreas }: CityPageProps) {
  const pricingData = await fetchPricingData();
  const services = pricingData.cityServiceCards;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: "Lenny's Cleaning",
    telephone: '+12536003355',
    email: 'hello@lennyscleaning.com',
    url: `https://lennyscleaning.com/house-cleaning-${citySlug}`,
    areaServed: {
      '@type': 'City',
      name: cityName,
      addressRegion: 'WA',
    },
    openingHours: 'Mo-Sa 08:00-18:00',
    priceRange: '$$',
  };

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
            <p className="overline mb-3">{cityName.toUpperCase()} CLEANING</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display font-semibold text-charcoal leading-[1.1] tracking-tight mb-5 text-[clamp(36px,5vw,58px)]">
              House cleaning in {cityName}
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-[19px] text-charcoal-light leading-relaxed max-w-[560px] mx-auto mb-9">
              Lenny&apos;s Cleaning matches you with vetted, local cleaning professionals in {cityName} — at a flat rate, with no surprises.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <Link href="/book" className="btn-primary text-base px-8 py-4">
              Book a cleaning
            </Link>
          </Reveal>
        </div>
      </header>

      {/* ══════ TRUST BAR ══════ */}
      <TrustBar />

      {/* ══════ SERVICES AVAILABLE ══════ */}
      <section className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">OUR SERVICES</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-14 text-[clamp(28px,4vw,44px)]">
              Services available in {cityName}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
            {services.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 100}>
                <Link href={svc.href} className="block bg-cream rounded-md p-7 h-full hover:shadow-md transition-shadow duration-200">
                  <h3 className="font-display font-medium text-xl text-charcoal leading-tight mb-2">
                    {svc.title}
                  </h3>
                  <p className="font-body text-sm font-semibold text-forest mb-3">{svc.price}</p>
                  <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                    {svc.desc}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <p className="font-body text-sm text-charcoal-light text-center mt-8 max-w-[560px] mx-auto">
              First-time customers: a one-time First Visit Assessment (15%) applies to your first booking. This gives your cleaning specialist extra time to learn your home. All future bookings are at the listed rate.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════ WHY HOMEOWNERS CHOOSE LENNY'S ══════ */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">WHY LENNY&apos;S</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-14 text-[clamp(28px,4vw,44px)]">
              Why {cityName} homeowners choose Lenny&apos;s
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
            {valueProps.map((card, i) => (
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

      {/* ══════ NEARBY SERVICE AREAS ══════ */}
      <section className="py-24 px-6">
        <div className="max-w-[700px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">SERVICE AREAS</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-10 text-[clamp(28px,4vw,44px)]">
              Nearby service areas
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-wrap justify-center gap-3">
              {nearbyAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/house-cleaning-${area.slug}`}
                  className="font-body text-sm font-medium text-forest bg-cream rounded-full px-5 py-2.5 hover:bg-forest hover:text-warm-white transition-colors duration-200"
                >
                  {area.name}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ HOW IT WORKS ══════ */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[1000px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">HOW IT WORKS</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-14 text-[clamp(28px,4vw,44px)]">
              A better clean in 3 easy steps
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 100}>
                <div className="text-center">
                  <span className="font-display font-semibold text-[40px] text-forest/20 leading-none block mb-3">
                    {step.num}
                  </span>
                  <h3 className="font-display font-medium text-xl text-charcoal leading-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
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
              Ready for a spotless home in {cityName}?
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
