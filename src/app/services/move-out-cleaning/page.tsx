import type { Metadata } from 'next';
import Reveal from '@/components/ui/Reveal';
import TrustBar from '@/components/ui/TrustBar';
import FaqAccordion from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Move-out cleaning',
  description: 'Professional move-out cleaning for rentals in Tacoma. We\'ll make sure you get your deposit back.'
};

const faqItems = [
  {
    question: 'When should I schedule move-out cleaning?',
    answer: 'We recommend scheduling within 24 hours of moving out. We\'ll work around your moving timeline.'
  },
  {
    question: 'How much does move-out cleaning cost?',
    answer: 'Pricing depends on home size and condition. We\'ll give you a quote when you book. Typically $250-600.'
  },
  {
    question: 'What\'s included?',
    answer: 'Complete deep clean including appliances, baseboards, carpet steam cleaning (if needed), windows, and detailed touch-ups for inspection readiness.'
  },
  {
    question: 'Will this help me get my deposit back?',
    answer: 'Our move-out cleaning is designed to meet landlord and property manager standards. Many of our customers report getting their full deposit back.'
  },
  {
    question: 'Can you clean after I\'ve moved furniture?',
    answer: 'Yes! In fact, we prefer it. We can clean the entire space thoroughly without obstacles.'
  },
  {
    question: 'Do you offer guarantees?',
    answer: 'We stand behind our work with a satisfaction guarantee. If your landlord isn\'t happy, we\'ll fix it at no cost.'
  }
];

export default function MoveOutCleaningPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 px-6 bg-warm-white relative">
        <div className="absolute top-0 right-0 w-2/5 h-full bg-cream opacity-60" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
        <div className="container-site relative z-10">
          <div className="max-w-2xl">
            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6 text-forest-green">Move-out cleaning</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">Get your deposit back. We\'ll handle the deep clean so you don\'t have to.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 px-6 bg-white">
        <div className="container-site">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center text-forest-green">Why hire a professional</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: 'Save time',
                description: 'Cleaning takes hours. Focus on your move instead. We\'ll handle the rest.'
              },
              {
                title: 'Landlord approval',
                description: 'Our cleaners know what landlords and property managers look for. We hit their standards.'
              },
              {
                title: 'Keep your deposit',
                description: 'A thorough professional clean often means getting your full deposit back.'
              }
            ].map((item, i) => (
              <Reveal key={i} delay={0.2 + i * 0.1}>
                <div className="bg-warm-white p-8 rounded-lg text-center">
                  <h3 className="text-xl font-display font-bold mb-3 text-forest-green">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What We Clean */}
      <section className="py-24 px-6 bg-gradient-to-br from-forest-green to-emerald-900 text-white">
        <div className="container-site">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center">What\'s included</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <Reveal delay={0.2}>
              <div>
                <h3 className="text-2xl font-display font-bold mb-6">Every room</h3>
                <ul className="space-y-3">
                  {[
                    'Walls and baseboards wiped',
                    'Light fixtures cleaned',
                    'Ceiling fans dusted',
                    'Doors and frames cleaned',
                    'Closets swept and wiped'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-terracotta font-bold mt-1">✓</span>
                      <span className="text-white text-opacity-90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div>
                <h3 className="text-2xl font-display font-bold mb-6">Specialized areas</h3>
                <ul className="space-y-3">
                  {[
                    'Oven interior deep cleaned',
                    'Refrigerator interior cleaned',
                    'Cabinets inside and out',
                    'Shower/tub grout cleaned',
                    'Carpet steam cleaned (if needed)'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-terracotta font-bold mt-1">✓</span>
                      <span className="text-white text-opacity-90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Process */}
      <section className="py-24 px-6 bg-white">
        <div className="container-site">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center text-forest-green">How it works</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'Get a quote', desc: 'Tell us your home size and move-out date. We\'ll give you a price.' },
              { num: '2', title: 'Schedule cleaning', desc: 'Pick a date that works. We\'ll be there right when you need us.' },
              { num: '3', title: 'We clean', desc: 'Professional deep clean. Landlord-approved. No deposit worries.' }
            ].map((item, i) => (
              <Reveal key={i} delay={0.2 + i * 0.1}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-terracotta rounded-full mb-4 font-display font-bold text-2xl">
                    {item.num}
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              </Reveal>
            ))}
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