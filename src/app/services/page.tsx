import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Cleaning services for every need in Tacoma. Recurring, deep, move-out, Airbnb, and eco-friendly cleaning.'
};

export default function ServicesPage() {
  const services = [
    {
      name: 'Recurring Cleaning',
      slug: 'recurring-cleaning',
      description: 'Weekly or monthly cleanings to keep your home fresh and ready.',
      features: ['Flexible scheduling', 'Same operator each time', 'Customizable checklist']
    },
    {
      name: 'Deep Cleaning',
      slug: 'deep-cleaning',
      description: 'Thorough top-to-bottom cleaning that covers everything.',
      features: ['Baseboards and trim', 'Inside appliances', 'Window sills & frames']
    },
    {
      name: 'Move-out Cleaning',
      slug: 'move-out-cleaning',
      description: 'Professional cleaning for rental moves. Get your deposit back.',
      features: ['Landlord-approved', 'Deposit protection', 'Detailed checklist']
    },
    {
      name: 'Airbnb Cleaning',
      slug: 'airbnb-cleaning',
      description: 'Fast turnovers between guests. Same-day booking available.',
      features: ['Quick turnaround', 'Linen changes', 'Guest-ready standards']
    },
    {
      name: 'Eco-Friendly Cleaning',
      slug: 'eco-friendly',
      description: 'Non-toxic, plant-based cleaning safe for families and pets.',
      features: ['Non-toxic products', 'Pet-safe', 'Family-friendly']
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
              <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6 text-forest-green">Our services</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">Professional cleaning tailored to your needs. Fair pricing. Professional service.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 bg-white">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1}>
                <Link href={`/services/${service.slug}`}>
                  <div className="bg-warm-white p-10 rounded-lg border-2 border-transparent hover:border-terracotta transition-all cursor-pointer h-full flex flex-col">
                    <h3 className="text-2xl font-display font-bold mb-3 text-forest-green">{service.name}</h3>
                    <p className="text-gray-700 mb-6 flex-grow">{service.description}</p>
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, j) => (
                        <div key={j} className="flex items-center gap-2 text-gray-600">
                          <span className="text-terracotta font-bold">•</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <span className="text-terracotta font-bold">Learn more →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Lenny's */}
      <section className="py-24 px-6 bg-gradient-to-br from-forest-green to-emerald-900 text-white">
        <div className="container-site">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center">Why choose Lenny's?</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: 'Fair pay = Quality work',
                description: 'We pay operators 75% commission. That means better people, better service.'
              },
              {
                title: 'No hidden fees',
                description: 'What you see is what you pay. Transparent pricing. No surprises.'
              },
              {
                title: 'Satisfaction guarantee',
                description: 'Not happy? We\'ll come back and fix it at no cost.'
              }
            ].map((item, i) => (
              <Reveal key={i} delay={0.2 + i * 0.1}>
                <div className="text-center">
                  <h3 className="text-xl font-display font-bold mb-3">{item.title}</h3>
                  <p className="text-white text-opacity-90">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}