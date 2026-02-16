import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import FaqAccordion from '@/components/FaqAccordion';

export const metadata: Metadata = {
  title: "Deep Cleaning Service | Lenny's Cleaning — Tacoma, WA",
  description: "Book a deep cleaning in Tacoma starting at $250. Inside appliances, baseboards, light fixtures — every detail handled by vetted professionals.",
};

const deepAdditions = [
  {
    room: 'Kitchen',
    tasks: 'Inside oven and microwave, inside refrigerator, cabinet fronts detailed',
  },
  {
    room: 'Bathrooms',
    tasks: 'Grout scrubbed, exhaust fan cleaned, inside cabinets wiped',
  },
  {
    room: 'Throughout',
    tasks: 'All baseboards detailed, ceiling fans and light fixtures cleaned, window sills and tracks, behind furniture, door frames wiped',
  },
];

const faqItems = [
  {
    question: 'How long does a deep cleaning take?',
    answer: 'Deep cleanings typically take 4-6 hours depending on the size and condition of your home. Your specialist takes the time needed to address every detail.',
  },
  {
    question: 'How often should I get a deep clean?',
    answer: 'We recommend a deep clean every 3-6 months, or as a first cleaning before switching to regular standard maintenance. It\'s the best way to reset your home.',
  },
  {
    question: 'What if my home needs more than a deep clean?',
    answer: 'If your home has special circumstances — post-renovation dust, heavy pet buildup, or hasn\'t been cleaned in over a year — let us know in your booking. We\'ll adjust your quote accordingly.',
  },
  {
    question: 'Can I add a deep clean to my recurring plan?',
    answer: 'Absolutely. Many customers book a deep clean as their first visit, then switch to standard cleanings on a recurring schedule. Your recurring rate will reflect the standard clean price.',
  },
];

export default function DeepCleaningPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-warm-white py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <h1 className="font-display text-4xl md:text-5xl text-forest mb-4">
              Deep cleaning service in Tacoma
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-lg text-charcoal max-w-[640px] mb-8">
              A thorough, top-to-bottom clean for homes that need more than maintenance. Every corner, every surface, every detail.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link
              href="/book?service=deep"
              className="inline-block bg-terra text-warm-white px-8 py-3 rounded-lg font-body font-medium hover:opacity-90 transition"
            >
              Book a deep clean
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

          {/* Standard Inclusions Header */}
          <Reveal delay={50}>
            <h3 className="font-display text-xl text-forest mb-6">
              Everything in a standard clean, plus:
            </h3>
          </Reveal>

          {/* Deep Clean Additions */}
          <div className="grid md:grid-cols-2 gap-8">
            {deepAdditions.map((item, index) => (
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
              Your price depends on the size and condition of your home. We provide a transparent quote before you book — no surprises, no hidden fees. Deep cleanings start at $250.
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
              href="/book?service=deep"
              className="inline-block bg-terra text-warm-white px-8 py-3 rounded-lg font-body font-medium hover:opacity-90 transition"
            >
              Book a deep clean
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
