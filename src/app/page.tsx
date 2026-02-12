import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Lenny's Cleaning | Home",
  description: "Professional residential cleaning services in Tacoma, WA. Expert cleaners ready to transform your home."
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-forest-green to-forest-green/80 text-warm-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Lenny's Cleaning
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-warm-white/90">
            Professional Residential Cleaning in Tacoma, WA
          </p>
          <p className="text-lg mb-12 text-warm-white/80">
            Your home deserves to shine. We're here to make it happen.
          </p>
          <button className="bg-terracotta hover:bg-terracotta/90 text-warm-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
            Get Started
          </button>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-warm-white border-2 border-forest-green rounded-lg p-12">
            <div className="inline-block bg-soft-gold text-charcoal px-4 py-2 rounded-full font-semibold mb-6">
              Coming Soon
            </div>
            <h2 className="text-3xl font-bold text-forest-green mb-4">
              Website Under Construction
            </h2>
            <p className="text-lg text-charcoal mb-8">
              We're building something amazing. Our professional cleaning services page is coming very soon.
            </p>
            <p className="text-charcoal/70 mb-6">
              In the meantime, contact us directly to book your cleaning service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-forest-green hover:bg-forest-green/90 text-warm-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Contact Us
              </a>
              <a
                href="/services"
                className="bg-terracotta hover:bg-terracotta/90 text-warm-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
