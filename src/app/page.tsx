import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import TrustBar from '@/components/ui/TrustBar';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 px-6 bg-warm-white relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-terracotta opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-forest-green opacity-5 rounded-full blur-3xl"></div>
        <div className="container-site relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal delay={0.1}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 text-forest-green">
                  A cleaner home starts here
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                  Professional cleaning in Tacoma. Fair pricing. Reliable operators. Satisfaction guaranteed.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/book" className="inline-block px-8 py-4 bg-forest-green text-white font-display font-bold rounded-lg hover:bg-emerald-900 transition-colors text-center">
                    Book now
                  </Link>
                  <Link href="/pricing" className="inline-block px-8 py-4 border-2 border-forest-green text-forest-green font-display font-bold rounded-lg hover:bg-forest-green hover:text-white transition-colors text-center">
                    See pricing
                  </Link>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.4}>
              <div className="relative">
                <div className="absolute inset-0 bg-terracotta opacity-10 rounded-2xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-forest-green to-emerald-900 rounded-2xl p-12 text-white">
                  <h3 className="text-2xl font-display font-bold mb-6">Why choose Lenny\'s?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-terracotta font-bold">✓</span>
                      <span>Operators earn 75% commission</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-terracotta font-bold">✓</span>
                      <span>Transparent pricing, no surprises</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-terracotta font-bold">✓</span>
                      <span>Satisfaction guarantee on every job</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-terracotta font-bold">✓</span>
                      <span>Serving Tacoma and surrounding areas</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Services Preview */}
      <section className="py-24 px-6 bg-white">
        <div className="container-site">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-12 text-forest-green">
              Cleaning services for every need
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Recurring Cleaning', slug: 'recurring-cleaning', desc: 'Weekly or monthly cleanings to keep your home fresh.' },
              { name: 'Deep Cleaning', slug: 'deep-cleaning', desc: 'Thorough top-to-bottom cleaning for every surface.' },
              { name: 'Move-Out Cleaning', slug: 'move-out-cleaning', desc: 'Specialized cleaning for moves and transitions.' },
              { name: 'Airbnb Cleaning', slug: 'airbnb-cleaning', desc: 'Quick turnover cleanings between guests.' },
              { name: 'Eco-Friendly Cleaning', slug: 'eco-friendly', desc: 'Safe, plant-based products for families and pets.' },
              { name: 'More Services', slug: 'services', desc: 'See all of our specialized cleaning options.' }
            ].map((service, i) => (
              <Reveal key={i} delay={0.2 + i * 0.1}>
                <Link href={`/services/${service.slug}`}>
                  <div className="bg-warm-white p-8 rounded-lg border-2 border-transparent hover:border-terracotta transition-all cursor-pointer h-full flex flex-col">
                    <h3 className="text-xl font-display font-bold mb-2 text-forest-green">{service.name}</h3>
                    <p className="text-gray-700 flex-grow">{service.desc}</p>
                    <span className="text-terracotta font-bold mt-4">Learn more →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-gradient-to-br from-forest-green to-emerald-900 text-white">
        <div className="container-site">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-12">
              How it works
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Book online', desc: 'Choose date, time, and service in our app.' },
              { step: '2', title: 'Meet your operator', desc: 'We match you with a vetted professional.' },
              { step: '3', title: 'Get cleaned', desc: 'Relax while your home gets spotless.' },
              { step: '4', title: 'Rate & repeat', desc: 'Rate your experience. Book again anytime.' }
            ].map((item, i) => (
              <Reveal key={i} delay={0.2 + i * 0.1}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-terracotta rounded-full mb-4 font-display font-bold text-2xl">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2">{item.title}</h3>
                  <p className="text-white text-opacity-90">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white">
        <div className="container-site">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-12 text-forest-green">
              Loved by Tacoma
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah M.', quote: 'Best cleaning service I\'ve used. The operators are reliable and thorough. Highly recommend!' },
              { name: 'John D.', quote: 'Finally a platform that treats cleaners fairly. The quality shows in the work.' },
              { name: 'Lisa R.', quote: 'Love that they offer eco-friendly cleaning. My home is spotless and the planet is happy.' }
            ].map((testimonial, i) => (
              <Reveal key={i} delay={0.2 + i * 0.1}>
                <div className="bg-warm-white p-8 rounded-lg border-l-4 border-terracotta">
                  <p className="text-gray-700 mb-4 italic">\"{ testimonial.quote }\"</p>
                  <p className="font-display font-bold text-forest-green">{testimonial.name}</p>
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
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-forest-green">
              Ready to book?
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Your next clean is just a few clicks away.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link href="/book" className="inline-block px-8 py-4 bg-forest-green text-white font-display font-bold rounded-lg hover:bg-emerald-900 transition-colors">
              Book a cleaning today
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}