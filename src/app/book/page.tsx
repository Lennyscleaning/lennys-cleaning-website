import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: "Book a Cleaning | Lenny's Cleaning — Tacoma, WA",
  description: "Book your cleaning appointment with Lenny's Cleaning. Coming soon.",
};

export default function BookingPage() {
  return (
    <>
      <Header />

      <section className="bg-warm-white py-16 md:py-24 px-5 md:px-6 min-h-[60vh] flex items-center">
        <div className="max-w-[1200px] mx-auto max-w-[640px]">
          <Reveal>
            <h1 className="font-display text-4xl md:text-5xl text-forest mb-6">
              Book a cleaning
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-lg text-charcoal mb-8">
              Our booking system is coming soon. In the meantime, reach out to us at{' '}
              <a
                href="mailto:hello@lennyscleaning.com"
                className="text-terra font-medium hover:opacity-80 transition"
              >
                hello@lennyscleaning.com
              </a>
              {' '}or call{' '}
              <a
                href="tel:+12535550100"
                className="text-terra font-medium hover:opacity-80 transition"
              >
                (253) 555-0100
              </a>
              {' '}to book your cleaning.
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
