import type { Metadata } from 'next';
import Reveal from '@/components/ui/Reveal';
import TrustBar from '@/components/ui/TrustBar';
import FaqAccordion from '@/components/ui/FaqAccordion';
import RecurringSavingsCalculator from '@/components/recurring/RecurringSavingsCalculator';

export const metadata: Metadata = {
  title: 'Recurring cleaning',
  description: 'Weekly or monthly cleaning service in Tacoma. Professional cleaners. Same person every time. Fair pricing.'
};

const faqItems = [
  {
    question: 'How often should I get recurring cleaning?',
    answer: 'It depends on your home and lifestyle. Weekly works best for busy families, bi-weekly for medium needs, and monthly for lighter maintenance.'
  },
  {
    question: 'Can I change my frequency?',
    answer: 'Absolutely! Adjust your schedule anytime. No penalties, no long-term contracts.'
  },
  {
    question: 'Will I have the same operator?',
    answer: 'Yes! We match you with a professional cleaner and keep you together. Consistency = quality.'
  },
  {
    question: 'What if I need to cancel a cleaning?',
    answer: 'You can cancel or reschedule up to 48 hours in advance with no penalty.'
  },
  {
    question: 'How much do I save with recurring?',
    answer: 'Recurring cleanings come with our loyalty discount. See our calculator above for your specific savings.'
  },
  {
    question: 'Do you offer discounts for long-term?',
    answer: 'Our recurring pricing includes a discount already. The longer you go, the more consistent your home stays, and the easier each clean becomes.'
  }
];

export default function RecurringCleaningPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 px-6 bg-warm-white relative">
        <div className="absolute top-0 right-0 w-2/5 h-full bg-cream opacity-60" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
        <div className="container-site relative z-10">
          <div className="max-w-2xl">
            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6 text-forest-green">Recurring cleaning</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">Weekly or monthly cleanings so you never have to worry about a dirty home again.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6 bg-white">
        <div className="container-site">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center text-forest-green">Why go recurring?</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Always clean',
                description: 'Never come home to a mess again. Your home stays fresh and guest-ready.'
              },
              {
                title: 'Same person',
                description: 'Build a relationship with your cleaner. They learn your preferences and maintain consistency.'
              },
              {
                title: 'Better value',
                description: 'Recurring cleanings are faster and cheaper than one-time deep cleans.'
              }
            ].map((item, i) => (
              <Reveal key={i} delay={0.2 + i * 0.1}>
                <div className="bg-warm-white p-8 rounded-lg">
                  <h3 className="text-xl font-display font-bold mb-3 text-forest-green">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Savings Calculator */}
      <section className="py-24 px-6 bg-gradient-to-br from-forest-green to-emerald-900 text-white">
        <div className="container-site max-w-3xl">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center">See your savings</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <RecurringSavingsCalculator />
          </Reveal>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Customization */}
      <section className="py-24 px-6 bg-white">
        <div className="container-site">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center text-forest-green">Customize your clean</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <Reveal delay={0.2}>
              <div>
                <h3 className="text-2xl font-display font-bold mb-6 text-forest-green">Choose your frequency</h3>
                <ul className="space-y-3">
                  {[
                    'Weekly - Total freshness',
                    'Bi-weekly - Balance and savings',
                    'Monthly - Light maintenance'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <span className="text-terracotta font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div>
                <h3 className="text-2xl font-display font-bold mb-6 text-forest-green">Add-on options</h3>
                <ul className="space-y-3">
                  {[
                    'Laundry service',
                    'Carpet vacuuming',
                    'Window cleaning',
                    'Baseboards',
                    'Fridge cleaning'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <span className="text-terracotta font-bold">+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-warm-white">
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