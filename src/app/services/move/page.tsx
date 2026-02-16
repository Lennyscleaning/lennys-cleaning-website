import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import FaqAccordion from '@/components/FaqAccordion';

export const metadata: Metadata = {
  title: "Move-In/Out Cleaning | Lenny's Cleaning — Tacoma, WA",
  description: "Book move-in or move-out cleaning in Tacoma starting at $300. Get your deposit back or start fresh with Lenny's vetted professionals.",
};

const moveAdditions = [
  {
    room: 'Kitchen',
    tasks: 'Inside all cabinets and drawers, inside dishwasher',
  },
  {
    room: 'Bathrooms',
    tasks: 'Inside all cabinets and drawers, medicine cabinet cleaned',
  },
  {
    room: 'Throughout',
    tasks: 'Inside all closets, garage sweep (if applicable), all window sills and tracks detailed, all light switch plates cleaned, wall spot cleaning',
  },
];

const faqItems = [
  {
    question: 'When should I schedule a move-out clean?',
    answer: 'Schedule your move-out clean for the day after your last items are removed. An empty home lets our specialist reach every surface — and gives you the best shot at getting your full deposit back.',
  },
  {
    question: 'Can I book a move-in clean before I move in?',
    answer: 'Yes. We\'ll clean the space before your belongings arrive so you\'re moving into a fresh, spotless home. Just provide access instructions when you book.',
  },
  {
    question: 'What if the previous tenant left the place in rough shape?',
    answer: 'Let us know in your booking notes. We may need to adjust the scope and pricing, but we\'ll always confirm with you before your specialist arrives.',
  },
  {
    question: 'Do you work with property managers?',
    answer: 'We do. If you manage multiple units and need regular turnover cleaning, reach out to us at hello@lennyscleaning.com to discuss volume pricing.',
  },
];

export default function MoveCleaningPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-warm-white py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <h1 className="font-display text-4xl md:text-5xl text-forest mb-4">
              Move-in and move-out cleaning in Tacoma
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-lg text-charcoal max-w-[640px] mb-8">
              Transition cleaning for moves, lease turnovers, and fresh starts. We leave the space ready for whoever comes next.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link
              href="/book?service=move"
              className="inline-block bg-terra text-warm-white px-8 py-3 rounded-lg font-body font-medium hover:opacity-90 transition"
            >
              Book a move-in/out clean
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

          {/* Header */}
          <Reveal delay={50}>
            <h3 className="font-display text-xl text-forest mb-6">
              Everything in a deep clean, plus:
            </h3>
          </Reveal>

          {/* Move-Specific Additions */}
          <div className="grid md:grid-cols-2 gap-8">
            {moveAdditions.map((item, index) => (
              <Reveal key={item.room} delay={50 * (index + 1)}>
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
              Your price depends on the size and condition of your home. We provide a transparent quote before you book — no surprises, no hidden fees. Move-in/out cleanings start at $300.
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
              href="/book?service=move"
              className="inline-block bg-terra text-warm-white px-8 py-3 rounded-lg font-body font-medium hover:opacity-90 transition"
            >
              Book a move-in/out clean
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
