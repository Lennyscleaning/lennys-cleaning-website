import Reveal from '@/components/ui/Reveal';
import FaqAccordion from '@/components/ui/FaqAccordion';

export default function FaqPage() {
  const faqItems = [
    {
      question: 'How long does a cleaning take?',
      answer: 'Standard cleanings typically take 2-3 hours depending on home size and condition. We\'ll provide an estimate when you book.'
    },
    {
      question: 'What\'s included in a cleaning?',
      answer: 'All cleanings include dusting, vacuuming, mopping, bathroom cleaning, kitchen cleaning, and trash removal. Check our services page for details on add-ons.'
    },
    {
      question: 'Can I choose my operator?',
      answer: 'After your first cleaning, you can request the same operator for recurring cleanings. We\'ll do our best to accommodate.'
    },
    {
      question: 'What if I\'m not satisfied?',
      answer: 'We offer a 100% satisfaction guarantee. If you\'re not happy, we\'ll send someone back to fix it at no charge.'
    },
    {
      question: 'How far in advance do I need to book?',
      answer: 'We recommend booking at least 48 hours in advance, but we also offer same-week bookings when available.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, Apple Pay, and Google Pay through our secure payment system.'
    },
    {
      question: 'Can you clean my move-out?',
      answer: 'Yes! We offer specialized move-out cleaning. These typically take longer and are priced accordingly. Book a move-out cleaning for details.'
    },
    {
      question: 'Do you use eco-friendly products?',
      answer: 'We offer eco-friendly cleaning as a service option. Our green operators use plant-based, non-toxic products that are safe for kids and pets.'
    }
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 px-6 bg-warm-white relative">
        <div className="absolute top-0 right-0 w-2/5 h-full bg-cream opacity-60" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
        <div className="container-site relative z-10">
          <div className="max-w-2xl">
            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6 text-forest-green">Frequently asked questions</h1>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-white">
        <div className="container-site max-w-3xl">
          <Reveal delay={0.1}>
            <FaqAccordion items={faqItems} />
          </Reveal>
        </div>
      </section>
    </>
  );
}