import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import FaqAccordion from '@/components/FaqAccordion';

export const metadata: Metadata = {
  title: "Standard House Cleaning | Lenny's Cleaning — Tacoma, WA",
  description: "Book a standard house cleaning in Tacoma starting at $150. Vetted professionals, flat-rate pricing, no surprises. See what's included.",
};

const inclusions = [
  {
    room: 'Kitchen',
    tasks: 'Counters and stovetop wiped, sink scrubbed, appliance exteriors cleaned, floor swept and mopped',
  },
  {
    room: 'Bathrooms',
    tasks: 'Toilet, shower, and tub scrubbed, mirrors and fixtures polished, counters wiped, floor mopped',
  },
  {
    room: 'Bedrooms',
    tasks: 'Bed made, surfaces dusted, floors vacuumed, mirrors and glass cleaned',
  },
  {
    room: 'Living areas',
    tasks: 'Surfaces dusted, floors vacuumed and mopped, furniture wiped, trash emptied',
  },
  {
    room: 'Throughout',
    tasks: 'Baseboards spot-wiped, light switches sanitized, cobwebs removed, doors wiped',
  },
];

const faqItems = [
  {
    question: 'How long does a standard cleaning take?',
    answer: 'Most standard cleanings take 2-3 hours, depending on the size of your home. You\'ll see an estimated duration when you book, and your professional will stay until the job is done — never rushed.',
  },
  {
    question: 'What\'s the difference between a standard clean and a deep clean?',
    answer: 'A standard clean covers regular maintenance — surfaces, floors, kitchens, and bathrooms. A deep clean goes further: inside appliances, detailed baseboards, light fixtures, and areas that don\'t get attention every week. If it\'s been a while, we recommend starting with a deep clean.',
  },
  {
    question: 'Can I request the same professional each time?',
    answer: 'Yes. When you book recurring service, Lenny\'s prioritizes matching you with the same specialist. Consistency matters — both for your comfort and for the quality of the clean.',
  },
  {
    question: 'What if I need to reschedule?',
    answer: 'Reschedule for free anytime with 24 hours\' notice. Changes made within 24 hours of your booking may be subject to a late fee. You can manage your booking online or via text.',
  },
  {
    question: 'Do I need to be home during the cleaning?',
    answer: 'Not at all. Many of our customers provide entry instructions and go about their day. We\'ll text you when your specialist arrives and when they\'re done.',
  },
];

export default function StandardCleaningPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-warm-white py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <h1 className="font-display text-4xl md:text-5xl text-forest mb-4">
              Standard house cleaning in Tacoma
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-lg text-charcoal max-w-[640px] mb-8">
              Regular maintenance cleaning that keeps your home fresh, healthy, and guest-ready — every visit.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link
              href="/book?service=standard"
              className="inline-block bg-terra text-warm-white px-8 py-3 rounded-lg font-body font-medium hover:opacity-90 transition"
            >
              Book a standard clean
            </Link>
          </Reveal>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-cream py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl text-forest mb-12">
              What's included
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            {inclusions.map((item, index) => (
              <Reveal key={item.room} delay={50 * index}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center">
                    <span className="text-forest font-display text-lg">✓</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-forest mb-2">
                      {item.room}
                    </h3>
                    <p className="font-body text-charcoal">
                      {item.tasks}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-warm-white py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-[1200px] mx-auto max-w-[640px]">
          <Reveal>
            <h3 className="font-display text-2xl text-forest mb-4">
              Transparent, flat-rate pricing
            </h3>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-charcoal">
              Your price depends on the size and condition of your home. We provide a transparent quote before you book — no surprises, no hidden fees. Standard cleanings start at $150.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl text-forest mb-12">
              Questions?
            </h2>
          </Reveal>
          <div className="max-w-[640px]">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-forest py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-6">
              Ready for a cleaner home?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <Link
              href="/book?service=standard"
              className="inline-block bg-terra text-warm-white px-8 py-3 rounded-lg font-body font-medium hover:opacity-90 transition"
            >
              Book a standard clean
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
