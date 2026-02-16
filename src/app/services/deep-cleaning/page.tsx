import type { Metadata } from 'next';
import Reveal from '@/components/ui/Reveal';
import TrustBar from '@/components/ui/TrustBar';
import FaqAccordion from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Deep Cleaning',
  description: 'Thorough top-to-bottom deep cleaning for your entire home in Tacoma. Professional cleaners. Satisfaction guaranteed.'
};

const faqItems = [
  {
    question: 'How long does a deep clean take?',
    answer: 'Typically 4-6 hours depending on home size and current condition. We\'ll give you an estimate when you book.'
  },
  {
    question: 'What\'s included that\'s different from regular cleaning?',
    answer: 'Deep clean includes baseboards, ceiling fans, inside cabinets, oven interior, refrigerator coils, and more detailed work on every surface.'
  },
  {
    question: 'How often should I deep clean?',
    answer: 'We recommend deep cleaning 2-4 times per year, combined with regular maintenance cleanings in between.'
  },
  {
    question: 'Can you move furniture?',
    answer: 'Yes! We can move lightweight furniture to clean behind and underneath. Ask your operator about heavier items.'
  }
];

export default function DeepCleaningPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 px-6 bg-warm-white relative">
        <div className="absolute top-0 right-0 w-2/5 h-full bg-cream opacity-60" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
        <div className="container-site relative z-10">
          <div className="max-w-2xl">
            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6 text-forest-green">Deep Cleaning</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">Thorough, top-to-bottom cleaning that refreshes your entire home.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 px-6 bg-white">
        <div className="container-site">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center text-forest-green">What\'s included</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              {
                category: 'Kitchen',
                items: ['Interior oven cleaning', 'Inside refrigerator', 'Inside cabinets', 'Baseboards', 'Light fixtures']
              },
              {
                category: 'Bathrooms',
                items: ['Grout cleaning', 'Ceiling cleaning', 'Behind toilet', 'Inside cabinets', 'Light fixtures']
              },
              {
                category: 'Living Areas',
                items: ['Ceiling fans', 'Baseboards', 'Window sills', 'Door frames', 'Light fixtures']
              },
              {
                category: 'Bedrooms',
                items: ['Behind nightstands', 'Under beds', 'Baseboards', 'Ceiling fans', 'Light fixtures']
              }
            ].map((section, i) => (
              <Reveal key={i} delay={0.2 + i * 0.1}>
                <div className="bg-warm-white p-8 rounded-lg">
                  <h3 className="text-2xl font-display font-bold mb-4 text-forest-green">{section.category}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-gray-700">
                        <span className="text-terracotta">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* When to Deep Clean */}
      <section className="py-24 px-6 bg-gradient-to-br from-forest-green to-emerald-900 text-white">
        <div className="container-site max-w-3xl">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center">When to schedule a deep clean</h2>
          </Reveal>
          <div className="space-y-4">
            {[
              'Seasonal refresh (spring, fall)',
              'After major events or gatherings',
              'Before holiday entertaining',
              'When returning from extended travel',
              'To complement regular recurring cleanings'
            ].map((reason, i) => (
              <Reveal key={i} delay={0.2 + i * 0.05}>
                <div className="flex items-start gap-4 p-4 bg-white bg-opacity-10 rounded-lg">
                  <span className="text-terracotta font-bold mt-1">✓</span>
                  <span className="text-lg">{reason}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-white">
        <div className="container-site max-w-3xl">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center text-forest-green">Frequently asked questions</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <FaqAccordion items={faqItems} />
          </Reveal>
        </div>
      </section>
    </>
  );
}