import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';

export default function AboutPage() {
  const neighborhoods = [
    'Stadium District', 'North End', 'Hilltop', 'Lincoln District',
    'South Tacoma', 'Eastside', 'West End', 'McKinley Hill',
    'Proctor', 'Old Town', 'Ruston', 'University Place',
    'Lakewood', 'Fircrest', 'JBLM area'
  ];

  const standards = [
    {
      title: 'Multi-step vetting',
      description: 'Background checks, document verification, and a trial period before any operator joins the network.'
    },
    {
      title: 'Room-by-room checklists',
      description: 'Every cleaning follows a detailed checklist so nothing gets missed, regardless of who\'s in your home.'
    },
    {
      title: 'Performance tracking',
      description: 'We monitor ratings, on-time arrivals, and customer feedback. Consistency earns tier advancement. Issues earn coaching.'
    },
    {
      title: 'Satisfaction guarantee',
      description: 'Not happy? We\'ll send someone back at no cost. Every job is backed by our commitment to getting it right.'
    }
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 px-6 bg-warm-white relative">
        <div className="absolute top-0 right-0 w-2/5 h-full bg-cream opacity-60 clip-path-diagonal" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
        <div className="container-site relative z-10">
          <div className="max-w-2xl">
            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6 text-forest-green">We\'re building something better for Tacoma</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">A cleaning marketplace that pays professionals fairly, charges customers honestly, and stands behind every job.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 px-6 bg-white">
        <div className="container-site">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center text-forest-green">The problem with cleaning marketplaces</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Operators get squeezed',
                description: 'Other platforms take 30%+ of earnings, leaving cleaners with inconsistent income and no path to grow.'
              },
              {
                title: 'Customers overpay',
                description: 'Hidden fees, surge pricing, and booking variability mean customers pay 50% more than if they booked directly.'
              },
              {
                title: 'Quality is hit-or-miss',
                description: 'Without consistent teams and real accountability, every job is a gamble. Ratings don\'t tell the full story.'
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

      {/* Our Promise */}
      <section className="py-24 px-6 bg-gradient-to-br from-forest-green to-emerald-900 text-white">
        <div className="container-site">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center">Our promise to you</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12">
            {standards.map((item, i) => (
              <Reveal key={i} delay={0.2 + i * 0.1}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-terracotta bg-opacity-20">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold mb-2">{item.title}</h3>
                    <p className="text-white text-opacity-90 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-24 px-6 bg-white">
        <div className="container-site">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center text-forest-green">Where we serve</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {neighborhoods.map((neighborhood, i) => (
              <Reveal key={i} delay={0.1 + (i % 5) * 0.05}>
                <div className="flex items-center p-4 rounded-lg bg-warm-white border-l-4 border-terracotta">
                  <span className="font-body text-gray-700">{neighborhood}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-warm-white">
        <div className="container-site text-center">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-forest-green">Ready to experience the difference?</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">Join hundreds of Tacoma families who trust Lenny\'s for a cleaner home and a clearer conscience.</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book" className="inline-block px-8 py-4 bg-forest-green text-white font-display font-bold rounded-lg hover:bg-emerald-900 transition-colors">
                Book a cleaning
              </Link>
              <Link href="/pricing" className="inline-block px-8 py-4 border-2 border-forest-green text-forest-green font-display font-bold rounded-lg hover:bg-forest-green hover:text-white transition-colors">
                See our pricing
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}