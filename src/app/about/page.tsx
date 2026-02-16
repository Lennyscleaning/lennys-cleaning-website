import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: "About Lenny's Cleaning | Tacoma, WA",
  description: "Lenny's Cleaning is a Tacoma-based cleaning marketplace that pays professionals more, charges fair prices, and backs every job with a satisfaction guarantee.",
};

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-warm-white py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <h1 className="font-display text-4xl md:text-5xl text-forest mb-4">
              A local cleaning company built on doing things differently
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Origin Story */}
      <section className="bg-cream py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-[1200px] mx-auto max-w-[640px]">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl text-forest mb-8">
              The story behind Lenny's
            </h2>
          </Reveal>

          <div className="space-y-6 font-body text-charcoal">
            <Reveal delay={50}>
              <p>
                Lenny's started with a simple observation: the cleaning industry treats its workers as disposable and its customers as transactions. We thought both deserved better.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <p>
                Most platforms pay cleaning professionals $16-24 per hour and pocket the rest. Lenny's flips that model. Our professionals earn $30-48 per hour — enough to make this a career, not a gig. Better pay means better talent, lower turnover, and a noticeably better clean for your home.
              </p>
            </Reveal>

            <Reveal delay={150}>
              <p>
                The name \"Lenny\" comes from founder Eric Lenhardt's nickname from his time in the Army. The values behind it — reliability, integrity, taking care of your people — aren't a branding exercise. They're how we run the business.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Operator-First Model */}
      <section className="bg-warm-white py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-[1200px] mx-auto max-w-[640px]">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl text-forest mb-8">
              When we invest in our professionals, you get a better clean
            </h2>
          </Reveal>

          <div className="space-y-6 font-body text-charcoal">
            <Reveal delay={50}>
              <p>
                Every cleaning professional in our network is background-checked, insured, and vetted through a multi-step onboarding process. But vetting is just the start.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <p>
                We pay well above market rate because we believe the person cleaning your home should be treated — and compensated — like the skilled professional they are. The result: our specialists show up on time, take pride in their work, and stick around. Less turnover means more consistency for you.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Tacoma Focus */}
      <section className="bg-cream py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-[1200px] mx-auto max-w-[640px]">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl text-forest mb-8">
              Local to Tacoma
            </h2>
          </Reveal>

          <div className="space-y-6 font-body text-charcoal">
            <Reveal delay={50}>
              <p>
                We're rooted in Tacoma. Our professionals are your neighbors. The money you spend stays local — it goes directly to people in our community, not to a distant corporate headquarters.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <p>
                As we grow, we're planning to expand into other essential services under the Lenny's Home Services umbrella. But we'll always stay focused on the same principle: treat people fairly, charge honest prices, and do great work.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-forest py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-6">
              Ready to experience the difference?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <Link
              href="/book"
              className="inline-block bg-terra text-warm-white px-8 py-3 rounded-lg font-body font-medium hover:opacity-90 transition"
            >
              Book a cleaning
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
