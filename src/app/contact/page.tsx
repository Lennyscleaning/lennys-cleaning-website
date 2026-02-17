import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import ContactForm from './ContactForm';

/* ─── SEO ─── */
export const metadata: Metadata = {
  title: "Contact Us | Lenny's Cleaning — Tacoma, WA",
  description:
    "Get in touch with Lenny's Cleaning. Call, email, or send us a message. Serving Tacoma, Lakewood, Puyallup, University Place, and the South Sound.",
  openGraph: {
    title: "Contact Us | Lenny's Cleaning — Tacoma, WA",
    description:
      "Get in touch with Lenny's Cleaning. Call, email, or send us a message. Serving Tacoma, Lakewood, Puyallup, University Place, and the South Sound.",
  },
};

/* ─── Data ─── */
const serviceAreas = [
  'Tacoma',
  'Lakewood',
  'Puyallup',
  'University Place',
  'Fife',
  'Spanaway',
  'Bonney Lake',
  'Gig Harbor',
];

/* ─── Inline SVG icons ─── */
const icons = {
  phone: (
    <svg className="w-7 h-7 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  email: (
    <svg className="w-7 h-7 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  ),
  book: (
    <svg className="w-7 h-7 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
    </svg>
  ),
};

/* ─── JSON-LD ─── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: "Lenny's Cleaning",
  telephone: '+12536003355',
  email: 'hello@lennyscleaning.com',
  url: 'https://lennyscleaning.com',
  areaServed: serviceAreas.map((city) => ({
    '@type': 'City',
    name: city,
    addressRegion: 'WA',
  })),
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
};

/* ─── PAGE ─── */
export default function ContactPage() {
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
            <p className="overline mb-3">CONTACT</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display font-semibold text-charcoal leading-[1.1] tracking-tight mb-5 text-[clamp(36px,5vw,58px)]">
              Get in touch
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-[19px] text-charcoal-light leading-relaxed max-w-[560px] mx-auto">
              Have a question, need to make a change, or just want to say hi? We&apos;re here to help.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ══════ CONTACT METHODS ══════ */}
      <section className="py-24 px-6">
        <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <Reveal>
            <a
              href="tel:+12536003355"
              className="bg-cream rounded-md p-7 text-center h-full flex flex-col items-center hover:shadow-md transition-shadow duration-200"
            >
              <div className="mb-4">{icons.phone}</div>
              <p className="font-body text-lg font-semibold text-charcoal mb-1">(253) 600-3355</p>
              <p className="font-body text-[15px] text-charcoal-light">Mon–Sat, 8am–6pm</p>
            </a>
          </Reveal>
          <Reveal delay={80}>
            <a
              href="mailto:hello@lennyscleaning.com"
              className="bg-cream rounded-md p-7 text-center h-full flex flex-col items-center hover:shadow-md transition-shadow duration-200"
            >
              <div className="mb-4">{icons.email}</div>
              <p className="font-body text-lg font-semibold text-charcoal mb-1">hello@lennyscleaning.com</p>
              <p className="font-body text-[15px] text-charcoal-light">We respond within 24 hours</p>
            </a>
          </Reveal>
          <Reveal delay={160}>
            <Link
              href="/book"
              className="bg-cream rounded-md p-7 text-center h-full flex flex-col items-center hover:shadow-md transition-shadow duration-200"
            >
              <div className="mb-4">{icons.book}</div>
              <p className="font-body text-lg font-semibold text-charcoal mb-1">Book online</p>
              <p className="font-body text-[15px] text-charcoal-light">Get a quote in 60 seconds</p>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════ CONTACT FORM ══════ */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[600px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">SEND A MESSAGE</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-12 text-[clamp(28px,4vw,44px)]">
              How can we help?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* ══════ SERVICE AREAS ══════ */}
      <section className="py-24 px-6">
        <div className="max-w-[700px] mx-auto text-center">
          <Reveal>
            <p className="overline mb-3">SERVICE AREAS</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight mb-4 text-[clamp(28px,4vw,44px)]">
              Where we serve
            </h2>
            <p className="font-body text-[17px] text-charcoal-light leading-relaxed max-w-[560px] mx-auto mb-10">
              Lenny&apos;s Cleaning proudly serves Tacoma and the surrounding South Sound communities.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-wrap justify-center gap-3">
              {serviceAreas.map((city) => (
                <span
                  key={city}
                  className="bg-cream font-body text-[15px] font-medium text-charcoal px-5 py-2.5 rounded-full"
                >
                  {city}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ HOURS ══════ */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[500px] mx-auto text-center">
          <Reveal>
            <p className="overline mb-3">HOURS</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight mb-8 text-[clamp(28px,4vw,44px)]">
              Business hours
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-3">
              <p className="font-body text-[17px] text-charcoal leading-relaxed">
                <span className="font-semibold">Monday–Saturday:</span> 8:00 AM – 6:00 PM
              </p>
              <p className="font-body text-[17px] text-charcoal leading-relaxed">
                <span className="font-semibold">Sunday:</span> Closed
              </p>
              <p className="font-body text-[15px] text-charcoal-light leading-relaxed mt-5">
                Bookings available 7 days a week online
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ BOTTOM CTA ══════ */}
      <section className="bg-forest py-24 px-6 text-center">
        <div className="max-w-[600px] mx-auto">
          <Reveal>
            <h2 className="font-display font-medium text-warm-white leading-[1.15] mb-4 text-[clamp(28px,4vw,44px)]">
              Ready to book?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-lg text-warm-white/80 leading-relaxed mb-9">
              Skip the back and forth — book your cleaning online in about 60 seconds.
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
