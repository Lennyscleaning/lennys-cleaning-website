import type { Metadata } from 'next';
import Reveal from '@/components/ui/Reveal';
import TrustBar from '@/components/ui/TrustBar';
import FaqAccordion from '@/components/ui/FaqAccordion';
import {
  EcoHero,
  EcoComparison,
  EcoAudience,
  EcoHowToAdd,
  EcoPromise,
  faqItems
} from '@/components/eco/EcoFriendlyContent';

export const metadata: Metadata = {
  title: 'Eco-friendly cleaning',
  description: 'Non-toxic, plant-based cleaning for families and pets. Professional service with eco-friendly products in Tacoma.'
};

export default function EcoFriendlyPage() {
  return (
    <>
      <EcoHero />
      <EcoPromise />
      <EcoComparison />
      <TrustBar />
      <EcoAudience />
      <EcoHowToAdd />
      <section className="py-24 px-6 bg-white">
        <div className="container-site max-w-3xl">
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center text-forest-green">Your questions answered</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <FaqAccordion items={faqItems} />
          </Reveal>
        </div>
      </section>
    </>
  );
}