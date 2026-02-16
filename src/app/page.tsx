import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import TrustBar from '@/components/TrustBar';

export const metadata = {
  title: "Lenny's Cleaning — Professional House Cleaning in Tacoma, WA",
  description:
    "Lenny's Cleaning matches you with vetted, local cleaning professionals in Tacoma. Flat-rate pricing, satisfaction guaranteed. Book your cleaning today.",
};

export default function Home() {
  return (
    <>
      <Header />

      {/* Section 1: Hero */}
      <section className="bg-warm-white">
        <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-center md:gap-12">
              <div className="md:w-3/5">
                <h1 className="font-display font-semibold text-4xl md:text-5xl mb-6 text-charcoal leading-tight">
                  Tacoma house cleaning you can count on
                </h1>
                <p className="font-body font-normal text-lg md:text-xl mb-8 text-charcoal-light max-w-[480px] leading-relaxed">
                  Lenny's matches you with vetted, local cleaning professionals — at a flat rate, with no surprises.
                </p>
                <Link href="/book" className="btn-primary inline-block">
                  Book a cleaning
                </Link>
              </div>
              <div className="hidden md:block md:w-2/5" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 2: Trust Bar */}
      <section className="bg-cream">
        <TrustBar />
      </section>

      {/* Section 3: How It Works */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <p className="font-body font-semibold text-xs md:text-sm uppercase tracking-[0.1em] text-forest mb-4">
                How it works
              </p>
              <h2 className="font-display font-medium text-3xl md:text-4xl text-charcoal">
                Three steps to a cleaner home
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {/* Step 1 */}
            <Reveal>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-forest text-warm-white font-display font-semibold text-xl mb-4">
                  1
                </div>
                <h3 className="font-display font-medium text-2xl text-charcoal mb-3">
                  Tell us about your home
                </h3>
                <p className="font-body font-normal text-base text-charcoal-light leading-relaxed">
                  Answer a few quick questions — bedrooms, bathrooms, and how you'd like things cleaned. You'll see your flat-rate price instantly.
                </p>
              </div>
            </Reveal>

            {/* Step 2 */}
            <Reveal delay={100}>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-forest text-warm-white font-display font-semibold text-xl mb-4">
                  2
                </div>
                <h3 className="font-display font-medium text-2xl text-charcoal mb-3">
                  We match you with a specialist
                </h3>
                <p className="font-body font-normal text-base text-charcoal-light leading-relaxed">
                  Lenny's pairs you with a vetted cleaning professional based on your home's needs, your location, and their track record.
                </p>
              </div>
            </Reveal>

            {/* Step 3 */}
            <Reveal delay={200}>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-forest text-warm-white font-display font-semibold text-xl mb-4">
                  3
                </div>
                <h3 className="font-display font-medium text-2xl text-charcoal mb-3">
                  Enjoy your clean home
                </h3>
                <p className="font-body font-normal text-base text-charcoal-light leading-relaxed">
                  Your specialist arrives on time, cleans to our standards, and you only pay when the job is done. It's that simple.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 4: Services */}
      <section className="bg-warm-white">
        <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
          <Reveal>
            <div className="mb-12 md:mb-16">
              <h2 className="font-display font-medium text-3xl md:text-4xl text-charcoal">
                Services tailored to your home
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Standard Clean Card */}
            <Reveal>
              <Link href="/services/standard">
                <div className="bg-cream rounded-md p-6 md:p-8 transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-medium text-2xl text-charcoal mb-3">
                      Standard clean
                    </h3>
                    <p className="font-body font-normal text-base text-charcoal-light mb-6 leading-relaxed">
                      Regular maintenance cleaning for homes that stay on top of things. Kitchens, bathrooms, floors, and living spaces — refreshed and ready.
                    </p>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-lg text-charcoal mb-3">
                      Starting at $150
                    </p>
                    <p className="font-body font-medium text-base text-terra hover:text-terra-dark transition-colors">
                      Learn more →
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* Deep Clean Card */}
            <Reveal delay={100}>
              <Link href="/services/deep">
                <div className="bg-cream rounded-md p-6 md:p-8 transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-medium text-2xl text-charcoal mb-3">
                      Deep clean
                    </h3>
                    <p className="font-body font-normal text-base text-charcoal-light mb-6 leading-relaxed">
                      A thorough, top-to-bottom clean for homes that need extra attention. Inside appliances, baseboards, light fixtures — every detail handled.
                    </p>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-lg text-charcoal mb-3">
                      Starting at $250
                    </p>
                    <p className="font-body font-medium text-base text-terra hover:text-terra-dark transition-colors">
                      Learn more →
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* Move-in / Move-out Card */}
            <Reveal delay={200}>
              <Link href="/services/move">
                <div className="bg-cream rounded-md p-6 md:p-8 transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-medium text-2xl text-charcoal mb-3">
                      Move-in / move-out clean
                    </h3>
                    <p className="font-body font-normal text-base text-charcoal-light mb-6 leading-relaxed">
                      Transition cleaning for moves, lease turnovers, and fresh starts. We leave the space spotless for whoever comes next.
                    </p>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-lg text-charcoal mb-3">
                      Starting at $300
                    </p>
                    <p className="font-body font-medium text-base text-terra hover:text-terra-dark transition-colors">
                      Learn more →
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 5: The Lenny's Difference */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
          <Reveal>
            <div className="mb-12 md:mb-16">
              <h2 className="font-display font-medium text-3xl md:text-4xl text-charcoal">
                Why Tacoma homeowners choose Lenny's
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Prop 1 */}
            <Reveal>
              <div className="max-w-[640px]">
                <h3 className="font-display font-medium text-2xl text-charcoal mb-4">
                  We pay our professionals more — and you can tell
                </h3>
                <p className="font-body font-normal text-base md:text-lg text-charcoal-light leading-relaxed">
                  Most platforms pay cleaning professionals $16-24 per hour. Ours earn $30-48. Better pay attracts better talent, reduces turnover, and means the person cleaning your home actually wants to be there.
                </p>
              </div>
            </Reveal>

            {/* Prop 2 */}
            <Reveal delay={100}>
              <div className="max-w-[640px]">
                <h3 className="font-display font-medium text-2xl text-charcoal mb-4">
                  Your price is your price
                </h3>
                <p className="font-body font-normal text-base md:text-lg text-charcoal-light leading-relaxed">
                  No hourly estimates that balloon. No \"we'll let you know when we get there.\" Lenny's gives you a flat rate before you book, with a line-item breakdown of exactly what you're paying for.
                </p>
              </div>
            </Reveal>

            {/* Prop 3 */}
            <Reveal delay={200}>
              <div className="max-w-[640px]">
                <h3 className="font-display font-medium text-2xl text-charcoal mb-4">
                  If it's not right, we make it right
                </h3>
                <p className="font-body font-normal text-base md:text-lg text-charcoal-light leading-relaxed">
                  Every cleaning is backed by our satisfaction guarantee. If something's missed, we'll send a specialist back — on us. No arguments, no fine print.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 6: Service Area */}
      <section className="bg-warm-white">
        <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
          <Reveal>
            <div className="mb-10 md:mb-12">
              <h2 className="font-display font-medium text-3xl md:text-4xl text-charcoal mb-4">
                Proudly serving Tacoma and surrounding communities
              </h2>
              <p className="font-body font-normal text-lg text-charcoal-light max-w-[640px]">
                Lenny's Cleaning serves homes across Tacoma — from the Stadium District to South Tacoma, University Place to Lakewood, and everywhere in between.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap gap-3">
              {[
                'Stadium District',
                'North End',
                'Hilltop',
                'Lincoln District',
                'South Tacoma',
                'Eastside',
                'West End',
                'McKinley Hill',
                'Proctor',
                'Old Town',
                'Ruston',
                'University Place',
                'Lakewood',
                'Fircrest',
                'Joint Base Lewis-McChord area',
              ].map((neighborhood) => (
                <span
                  key={neighborhood}
                  className="inline-block px-4 py-2 bg-cream text-charcoal rounded-full font-body font-medium text-sm"
                >
                  {neighborhood}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 7: Final CTA */}
      <section className="bg-forest text-warm-white">
        <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
          <Reveal>
            <div className="text-center">
              <h2 className="font-display font-medium text-3xl md:text-4xl mb-4">
                Your home deserves Lenny's
              </h2>
              <p className="font-body font-normal text-lg md:text-xl mb-8 text-cream max-w-[640px] mx-auto leading-relaxed">
                Book your first cleaning today and see the difference a vetted, well-paid professional makes.
              </p>
              <Link href="/book" className="btn-primary inline-block">
                Book a cleaning
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
