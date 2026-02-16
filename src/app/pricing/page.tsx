import type { Metadata } from 'next';
import Reveal from '@/components/ui/Reveal';
import PricingCalculator from '@/components/pricing/PricingCalculator';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for Lenny\'s Cleaning services in Tacoma. No hidden fees. No surprises.'
};

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 px-6 bg-warm-white relative">
        <div className="absolute top-0 right-0 w-2/5 h-full bg-cream opacity-60" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
        <div className="container-site relative z-10">
          <div className="max-w-2xl">
            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6 text-forest-green">Simple, transparent pricing</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">No hidden fees. No surprise charges. What you see is what you pay.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-24 px-6 bg-white">
        <div className="container-site max-w-3xl">
          <Reveal delay={0.1}>
            <PricingCalculator />
          </Reveal>
        </div>
      </section>
    </>
  );
}