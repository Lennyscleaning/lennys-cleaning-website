import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Join our team',
  description: 'Become a cleaning operator with Lenny\'s and earn 75% of booking revenue. Flexible hours, 1099 contract, fair pay.'
};

export default function JoinTeamPage() {
  const benefits = [
    {
      title: 'Fair pay',
      description: 'You keep 75% of every booking. No hidden fees. No complicated commission structures.'
    },
    {
      title: 'Flexible schedule',
      description: 'Work when you want. Decline bookings that don\'t fit your schedule. Build your own business.'
    },
    {
      title: 'Steady bookings',
      description: 'We handle marketing and customer acquisition. You focus on quality work and building a loyal client base.'
    },
    {
      title: 'Growth opportunity',
      description: 'Start as an operator, scale to manage a team, or build your own cleaning empire.'
    },
    {
      title: 'Support & training',
      description: 'Access to training resources, best practices, and a community of professional cleaners.'
    },
    {
      title: '1099 contractor',
      description: 'Full independence. You\'re your own boss. We handle the technology, you handle the work.'
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
              <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6 text-forest-green">Join Lenny\'s</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">Build your cleaning business with fair pay, steady bookings, and complete flexibility.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6 bg-white">
        <div className="container-site">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center text-forest-green">Why work with us?</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <Reveal key={i} delay={0.2 + i * 0.1}>
                <div className="bg-warm-white p-8 rounded-lg h-full">
                  <h3 className="text-xl font-display font-bold mb-3 text-forest-green">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-24 px-6 bg-gradient-to-br from-forest-green to-emerald-900 text-white">
        <div className="container-site">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center">Requirements</h2>
          </Reveal>
          <div className="max-w-3xl mx-auto">
            <ul className="space-y-4 text-lg">
              <Reveal delay={0.2}>
                <li className="flex items-start gap-4">
                  <span className="text-terracotta font-bold mt-1">✓</span>
                  <span>18+ years old</span>
                </li>
              </Reveal>
              <Reveal delay={0.3}>
                <li className="flex items-start gap-4">
                  <span className="text-terracotta font-bold mt-1">✓</span>
                  <span>Valid driver\'s license & reliable transportation</span>
                </li>
              </Reveal>
              <Reveal delay={0.4}>
                <li className="flex items-start gap-4">
                  <span className="text-terracotta font-bold mt-1">✓</span>
                  <span>Background check clearance</span>
                </li>
              </Reveal>
              <Reveal delay={0.5}>
                <li className="flex items-start gap-4">
                  <span className="text-terracotta font-bold mt-1">✓</span>
                  <span>Reliable phone & internet connection</span>
                </li>
              </Reveal>
              <Reveal delay={0.6}>
                <li className="flex items-start gap-4">
                  <span className="text-terracotta font-bold mt-1">✓</span>
                  <span>Professional attitude & attention to detail</span>
                </li>
              </Reveal>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-warm-white">
        <div className="container-site text-center">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-forest-green">Ready to get started?</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">Apply now and join hundreds of professional cleaners earning fair pay with Lenny\'s.</p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link href="mailto:eric@flowbotics.xyz?subject=Operator%20Application" className="inline-block px-8 py-4 bg-forest-green text-white font-display font-bold rounded-lg hover:bg-emerald-900 transition-colors">
              Apply now
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}