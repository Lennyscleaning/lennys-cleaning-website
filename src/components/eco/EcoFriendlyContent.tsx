'use client';

import Reveal from '@/components/ui/Reveal';
import TrustBar from '@/components/ui/TrustBar';

export function EcoHero() {
  return (
    <section className="pt-32 pb-24 px-6 bg-warm-white relative">
      <div className="absolute top-0 right-0 w-2/5 h-full bg-cream opacity-60" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
      <div className="container-site relative z-10">
        <div className="max-w-2xl">
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6 text-forest-green">Eco-friendly cleaning</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">Professional cleaning with plant-based products. Safe for your family. Better for the planet.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function EcoPromise() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="container-site">
        <Reveal delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center text-forest-green">Our eco promise</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: 'Plant-based products',
              description: 'No harsh chemicals. No artificial scents. Just effective, natural cleaning.'
            },
            {
              title: 'Safe for kids and pets',
              description: 'No toxins. No fumes. Your family can play on clean floors within minutes.'
            },
            {
              title: 'Better for the earth',
              description: 'Biodegradable products that break down naturally without harming ecosystems.'
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
  );
}

export function EcoComparison() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-forest-green to-emerald-900 text-white">
      <div className="container-site">
        <Reveal delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center">Traditional vs. Eco-friendly</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <Reveal delay={0.2}>
            <div>
              <h3 className="text-2xl font-display font-bold mb-6 text-red-300">Traditional cleaning</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-red-300 font-bold">✗</span>
                  <span>Harsh chemical fumes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-300 font-bold">✗</span>
                  <span>Harmful to pets and kids</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-300 font-bold">✗</span>
                  <span>Pollutes water systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-300 font-bold">✗</span>
                  <span>Health risks for cleaners</span>
                </li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div>
              <h3 className="text-2xl font-display font-bold mb-6 text-green-300">Eco-friendly cleaning</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-300 font-bold">✓</span>
                  <span>Fresh, natural scents</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-300 font-bold">✓</span>
                  <span>Safe for your family</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-300 font-bold">✓</span>
                  <span>Protects the environment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-300 font-bold">✓</span>
                  <span>Safer for cleaners too</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function EcoAudience() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="container-site">
        <Reveal delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center text-forest-green">Perfect for</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              emoji: '👶',
              title: 'Families with kids',
              description: 'Peace of mind knowing no toxic chemicals are in your home.'
            },
            {
              emoji: '🐾',
              title: 'Pet owners',
              description: 'Safe for cats, dogs, and other pets. No harmful residue.'
            },
            {
              emoji: '🌍',
              title: 'Eco-conscious people',
              description: 'Make a difference with every cleaning appointment.'
            },
            {
              emoji: '❤️',
              title: 'Health-focused homes',
              description: 'Reduce allergens and chemical exposure naturally.'
            }
          ].map((item, i) => (
            <Reveal key={i} delay={0.2 + i * 0.1}>
              <div className="bg-warm-white p-8 rounded-lg">
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-display font-bold mb-3 text-forest-green">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EcoHowToAdd() {
  return (
    <section className="py-24 px-6 bg-warm-white">
      <div className="container-site max-w-3xl">
        <Reveal delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center text-forest-green">Adding eco-friendly service</h2>
        </Reveal>
        <div className="bg-white p-8 rounded-lg border-l-4 border-terracotta">
          <p className="text-gray-700 mb-4">When booking a recurring or one-time cleaning, simply select "Eco-friendly products" as an option. Our green operators will use 100% plant-based, non-toxic products throughout your home.</p>
          <p className="text-gray-700 mb-4"><strong>No extra cost</strong> - Eco-friendly cleaning is priced the same as traditional cleaning.</p>
          <p className="text-gray-700"><strong>Same quality</strong> - You get the same professional clean with products that are better for your home and the planet.</p>
        </div>
      </div>
    </section>
  );
}

export const faqItems = [
  {
    question: 'Are plant-based products as effective as chemicals?',
    answer: 'Yes! Modern eco-friendly products are highly effective. They clean just as well without the harmful side effects.'
  },
  {
    question: 'Will the house smell different?',
    answer: 'You\'ll notice a fresh, natural scent instead of strong chemical smells. Many customers prefer it!'
  },
  {
    question: 'What brands do you use?',
    answer: 'We use leading eco-friendly brands like Branch Basics, Ecos, and Seventh Generation. All certified non-toxic.'
  },
  {
    question: 'Is eco-friendly cleaning more expensive?',
    answer: 'Nope! Eco-friendly service costs the same as traditional cleaning. Better for your home, better for the planet, same price.'
  },
  {
    question: 'Are the products pet and kid safe?',
    answer: 'Absolutely. No harsh chemicals means your family and pets are safe to be in the home immediately after cleaning.'
  }
];