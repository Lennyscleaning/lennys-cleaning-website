import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: "How It Works | Lenny's Cleaning — Tacoma, WA",
  description: "Book a home cleaning in Tacoma in three easy steps. Tell us about your home, get matched with a vetted professional, and enjoy the results.",
};

export default function HowItWorksPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-warm-white py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <h1 className="font-display text-4xl md:text-5xl text-forest mb-4">
              How home cleaning works with Lenny's
            </h1>
          </Reveal>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="bg-cream py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Reveal delay={0}>
              <div>
                <div className="w-12 h-12 rounded-full bg-forest text-warm-white flex items-center justify-center font-display text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="font-display text-xl text-forest mb-3">
                  Tell us about your home
                </h3>
                <p className="font-body text-charcoal">
                  Select your cleaning type, provide your address, choose your date and time, and let us know about any special instructions. We'll give you a transparent price immediately.
                </p>
              </div>
            </Reveal>

            {/* Step 2 */}
            <Reveal delay={100}>
              <div>
                <div className="w-12 h-12 rounded-full bg-forest text-warm-white flex items-center justify-center font-display text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="font-display text-xl text-forest mb-3">
                  Get matched with a specialist
                </h3>
                <p className="font-body text-charcoal">
                  We match you with a vetted, background-checked cleaning professional. You'll receive their name, photo, and a confirmation with your appointment details.
                </p>
              </div>
            </Reveal>

            {/* Step 3 */}
            <Reveal delay={200}>
              <div>
                <div className="w-12 h-12 rounded-full bg-forest text-warm-white flex items-center justify-center font-display text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="font-display text-xl text-forest mb-3">
                  Enjoy your clean home
                </h3>
                <p className="font-body text-charcoal">
                  Your specialist arrives on time, completes the job to our quality standards, and you're done. Rate your experience and book your next cleaning.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="bg-warm-white py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl text-forest mb-12">
              What to expect
            </h2>
          </Reveal>

          <div className="space-y-12 max-w-[640px]">
            {/* Before */}
            <Reveal delay={50}>
              <div>
                <h3 className="font-display text-xl text-forest mb-3">
                  Before your cleaning
                </h3>
                <p className="font-body text-charcoal">
                  You'll receive a confirmation with your specialist's name, photo, and arrival window. We'll send a reminder 24 hours before and a heads-up 2 hours before they arrive. If you have special instructions — alarm codes, pet notes, preferred products — add them to your booking.
                </p>
              </div>
            </Reveal>

            {/* Day of */}
            <Reveal delay={100}>
              <div>
                <h3 className="font-display text-xl text-forest mb-3">
                  Day of
                </h3>
                <p className="font-body text-charcoal">
                  Your specialist arrives within your selected window, introduces themselves (or lets themselves in per your instructions), and follows a room-by-room checklist. They'll reach out if anything about your home doesn't match the booking details.
                </p>
              </div>
            </Reveal>

            {/* After */}
            <Reveal delay={150}>
              <div>
                <h3 className="font-display text-xl text-forest mb-3">
                  After your cleaning
                </h3>
                <p className="font-body text-charcoal">
                  You'll get a text within an hour asking how things went. Rate your experience, leave feedback, and if anything's not right, let us know — we'll make it right. Payment is processed automatically after the job is complete.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="bg-cream py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-[1200px] mx-auto max-w-[640px]">
          <Reveal>
            <h2 className="font-display text-2xl text-forest mb-6">
              Quality standards
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-charcoal mb-6">
              Every cleaning professional in our network is background-checked, insured, and vetted through a multi-step onboarding process. We invest in our specialists because we know it directly impacts the quality of your clean.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p className="font-body text-charcoal">
              Our specialists earn well above market rate, which means they're committed to doing excellent work and maintaining their reputation. Less turnover, more consistency, and a better experience for you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Satisfaction Guarantee */}
      <section className="bg-warm-white py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-[1200px] mx-auto max-w-[640px]">
          <Reveal>
            <h2 className="font-display text-2xl text-forest mb-6">
              Satisfaction guarantee
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-charcoal">
              If something's missed, we'll send a specialist back — on us. Your satisfaction is our priority, and we stand behind every cleaning we deliver.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-forest py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-6">
              Ready to get started?
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
