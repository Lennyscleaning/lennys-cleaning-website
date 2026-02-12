import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | Lenny\'s Cleaning',
  description: 'Transparent pricing for professional cleaning services in Tacoma, WA. See our rates and get a free quote.',
  openGraph: {
    title: 'Pricing | Lenny\'s Cleaning',
    description: 'Transparent pricing for professional cleaning services in Tacoma, WA'
  }
};

export default function PricingPage() {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-forest-green mb-6">Pricing</h1>
        <p className="text-xl text-charcoal/80 mb-12">
          Transparent, competitive pricing for all our cleaning services. Get a free quote today.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Pricing Cards */}
          <div className="bg-warm-white border-2 border-forest-green rounded-lg p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold text-forest-green mb-4">Deep Cleaning</h3>
            <p className="text-charcoal/70 mb-6">Comprehensive single-visit cleaning</p>
            <p className="text-3xl font-bold text-terracotta mb-6">Starting at<br />${250}</p>
            <button className="w-full bg-terracotta hover:bg-terracotta/90 text-warm-white font-bold py-2 px-4 rounded-lg transition-colors">
              Get Quote
            </button>
          </div>

          <div className="bg-warm-white border-2 border-forest-green rounded-lg p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold text-forest-green mb-4">Move-Out Cleaning</h3>
            <p className="text-charcoal/70 mb-6">Complete move-out deep clean</p>
            <p className="text-3xl font-bold text-terracotta mb-6">Starting at<br />${350}</p>
            <button className="w-full bg-terracotta hover:bg-terracotta/90 text-warm-white font-bold py-2 px-4 rounded-lg transition-colors">
              Get Quote
            </button>
          </div>

          <div className="bg-warm-white border-2 border-forest-green rounded-lg p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold text-forest-green mb-4">Recurring Service</h3>
            <p className="text-charcoal/70 mb-6">Monthly maintenance plans</p>
            <p className="text-3xl font-bold text-terracotta mb-6">Starting at<br />${150}/mo</p>
            <button className="w-full bg-terracotta hover:bg-terracotta/90 text-warm-white font-bold py-2 px-4 rounded-lg transition-colors">
              Get Quote
            </button>
          </div>
        </div>

        <section className="bg-warm-white border-2 border-forest-green rounded-lg p-8">
          <h2 className="text-2xl font-bold text-forest-green mb-4">Factors That May Affect Pricing</h2>
          <ul className="space-y-2 text-charcoal text-lg">
            <li>• Square footage of your home</li>
            <li>• Current condition and level of cleanliness</li>
            <li>• Special requests or additional services</li>
            <li>• Distance from our service area</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
