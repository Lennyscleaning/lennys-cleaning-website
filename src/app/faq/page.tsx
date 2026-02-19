import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import FaqAccordion from '@/components/FaqAccordion';

/* ─── SEO ─── */
export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    'Answers to common questions about booking, pricing, services, and working with Lenny\'s Cleaning in Tacoma.',
  openGraph: {
    title: "Frequently Asked Questions | Lenny's Cleaning — Tacoma, WA",
    description:
      'Answers to common questions about booking, pricing, services, and working with Lenny\'s Cleaning in Tacoma.',
  },
};

/* ─── Data ─── */
const categories = [
  {
    heading: 'Booking & scheduling',
    items: [
      {
        question: 'How do I book a cleaning?',
        answer:
          'Visit our booking page, select your service type, enter your home details, pick a date and time, and confirm. The whole process takes about 60 seconds. You\'ll receive a confirmation immediately.',
      },
      {
        question: 'Can I reschedule or cancel?',
        answer:
          'You can reschedule or cancel up to 24 hours before your appointment at no charge. Cancellations within 24 hours may be subject to a cancellation fee.',
      },
      {
        question: 'How far in advance should I book?',
        answer:
          'We recommend booking at least 48 hours in advance for the best availability. Same-day and next-day bookings may be available depending on operator schedules.',
      },
      {
        question: 'Do I need to be home during the cleaning?',
        answer:
          'No — many customers provide entry instructions (lockbox, garage code, etc.) and go about their day. We just need a way to access your home.',
      },
    ],
  },
  {
    heading: 'Pricing & payment',
    items: [
      {
        question: 'How is pricing determined?',
        answer:
          'Pricing is based on your home size (bedrooms/bathrooms), service type, and any add-ons you select. You\'ll see your exact price before booking — no hourly estimates that balloon.',
      },
      {
        question: 'Do I need a membership or subscription?',
        answer:
          'Never. Every booking is standalone. Want to rebook weekly? Great — you\'ll save with our recurring rates. Want to book once and come back in six months? That works too. No subscriptions, no commitments, no cancellation fees.',
      },
      {
        question: 'Will my price change after I book?',
        answer:
          'The price you see at booking is the price you pay. The only exception is if your cleaning professional arrives and the home condition is significantly different from what was described — and even then, they\'ll contact you for approval before any adjustment.',
      },
      {
        question: 'Are there any hidden fees?',
        answer:
          'No. Your quote includes everything. No travel fees, no supply fees, no platform fees added at checkout. Tips are optional and go 100% to your cleaning professional.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit and debit cards. Payment is processed securely through Stripe after your cleaning is complete.',
      },
      {
        question: 'Do you offer discounts for recurring cleanings?',
        answer:
          'Yes. Weekly cleanings save 15%, biweekly save 10%, and monthly save 5% off the standard rate.',
      },
    ],
  },
  {
    heading: 'Services',
    items: [
      {
        question: 'What\'s the difference between standard and deep cleaning?',
        answer:
          'A standard cleaning covers routine maintenance — surfaces, floors, bathrooms, kitchen. A deep cleaning adds inside appliances, baseboards, interior windows, and detailed scrubbing. We recommend a deep clean for first-time customers.',
      },
      {
        question: 'What\'s included in a standard cleaning?',
        answer:
          'Kitchen (countertops, stovetop, sink, cabinet fronts, floor), bathrooms (toilet, shower/tub, sink, mirrors, floor), bedrooms (dusting, beds, floors), living areas (dusting, vacuuming), plus light baseboards, switches, and door handles throughout.',
      },
      {
        question: 'Do you provide cleaning supplies?',
        answer:
          'Our cleaning professionals bring their own supplies and equipment. If you prefer specific products (especially eco-friendly options), just let us know when booking.',
      },
    ],
  },
  {
    heading: 'Our professionals',
    items: [
      {
        question: 'Are your cleaners background-checked?',
        answer:
          'Yes. Every cleaning professional on our platform passes a comprehensive background check before they can accept any bookings.',
      },
      {
        question: 'Will I get the same cleaner each time?',
        answer:
          'For recurring bookings, we prioritize matching you with the same professional each visit. Consistency is important to us.',
      },
      {
        question: 'How much do your cleaning professionals earn?',
        answer:
          'Our professionals earn $34–56/hr — 2–3x the industry average. We believe better pay attracts better talent, which means a better clean for you.',
      },
    ],
  },
  {
    heading: 'Policies',
    items: [
      {
        question: 'What if I\'m not satisfied with my cleaning?',
        answer:
          'Contact us within 24 hours and we\'ll send someone back to make it right at no additional charge. Your satisfaction is guaranteed.',
      },
      {
        question: 'What\'s your cancellation policy?',
        answer:
          'Free cancellation up to 24 hours before your scheduled cleaning. Late cancellations may incur a fee to fairly compensate the professional who reserved that time for you.',
      },
    ],
  },
];

/* ─── All Q&A pairs for JSON-LD ─── */
const allItems = categories.flatMap((c) => c.items);

/* ─── JSON-LD ─── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: allItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

/* ─── PAGE ─── */
export default function FaqPage() {
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
            <p className="overline mb-3">FAQ</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display font-semibold text-charcoal leading-[1.1] tracking-tight mb-5 text-[clamp(36px,5vw,58px)]">
              Frequently asked questions
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-[19px] text-charcoal-light leading-relaxed max-w-[560px] mx-auto">
              Everything you need to know about booking, pricing, and working with Lenny&apos;s.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ══════ FAQ CATEGORIES ══════ */}
      <section className="py-24 px-6">
        <div className="max-w-[700px] mx-auto space-y-16">
          {categories.map((category, i) => (
            <Reveal key={category.heading} delay={i * 80}>
              <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight mb-6 text-[clamp(22px,3vw,32px)]">
                {category.heading}
              </h2>
              <FaqAccordion items={category.items} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════ BOTTOM CTA ══════ */}
      <section className="bg-forest py-24 px-6 text-center">
        <div className="max-w-[600px] mx-auto">
          <Reveal>
            <h2 className="font-display font-medium text-warm-white leading-[1.15] mb-4 text-[clamp(28px,4vw,44px)]">
              Still have questions?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-lg text-warm-white/80 leading-relaxed mb-3">
              Call us at{' '}
              <a href="tel:+12536003355" className="text-warm-white underline underline-offset-2">
                (253) 600-3355
              </a>
            </p>
            <p className="font-body text-lg text-warm-white/80 leading-relaxed mb-9">
              or email{' '}
              <a href="mailto:hello@lennyscleaning.com" className="text-warm-white underline underline-offset-2">
                hello@lennyscleaning.com
              </a>
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
