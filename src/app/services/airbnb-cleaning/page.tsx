import type { Metadata } from 'next';
import Reveal from '@/components/ui/Reveal';
import TrustBar from '@/components/ui/TrustBar';
import FaqAccordion from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Airbnb Cleaning',
  description: 'Fast, reliable turnover cleaning for Airbnb hosts in Tacoma. Same-day booking available.'
};

const faqItems = [
  {
    question: 'How quickly can you clean between guests?',
    answer: 'We offer same-day cleaning for Airbnb properties. Book a 2-3 hour turnover slot and we\'ll have your place ready for the next guest.'
  },
  {
    question: 'What\'s included in Airbnb cleaning?',
    answer: 'Full deep clean: change linens, clean bathrooms, kitchens, living areas, vacuum, mop, and trash removal. All surfaces sanitized.'
  },
  {
    question: 'Can you do extra services like laundry?',
    answer: 'Yes! We offer add-ons like linen laundering, extra supplies restocking, and more. Discuss with your operator.'
  },
  {
    question: 'Do you service other rental properties?',
    answer: 'Absolutely. We clean for Vrbo, Booking.com, and independent rentals. Same professional service, every time.'
  }
];

export default function AirbnbPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 px-6 bg-warm-white relative">
        <div className="absolute top-0 right-0 w-2/5 h-full bg-cream opacity-60" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
        <div className="container-site relative z-10">
          <div className="max-w-2xl">
            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6 text-forest-green">Airbnb Cleaning</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">Quick turnovers. Professional results. Your guests will rate us 5 stars.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-24 px-6 bg-white">
        <div className="container-site">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center text-forest-green">Why hosts choose Lenny\'s</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Speed',
                description: 'Same-day booking available. We understand turnover timing is critical.'
              },
              {
                title: 'Reliability',
                description: 'Our operators show up on time, every time. Your guests won\'t be waiting.'
              },
              {
                title: 'Consistency',
                description: 'Every clean follows our detailed checklist. Quality doesn\'t vary.'
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

      {/* Trust Bar */}
      <TrustBar />

      {/* Process */}
      <section className="py-24 px-6 bg-gradient-to-br from-forest-green to-emerald-900 text-white">
        <div className="container-site">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center">How it works</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'Book online', desc: 'Choose your date and cleaning slot. Confirm in minutes.' },
              { num: '2', title: 'We clean', desc: 'Our operator arrives at your property and cleans thoroughly.' },
              { num: '3', title: 'Move in next guest', desc: 'Your property is ready. No downtime.' }
            ].map((item, i) => (
              <Reveal key={i} delay={0.2 + i * 0.1}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-terracotta rounded-full mb-4 font-display font-bold text-2xl">
                    {item.num}
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2">{item.title}</h3>
                  <p className="text-white text-opacity-90">{item.desc}</p>
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