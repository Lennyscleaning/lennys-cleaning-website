import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Now | Lenny\'s Cleaning',
  description: 'Schedule your cleaning service with Lenny\'s Cleaning in Tacoma, WA. Quick and easy booking.',
  openGraph: {
    title: 'Book Now | Lenny\'s Cleaning',
    description: 'Schedule your cleaning service with Lenny\'s Cleaning in Tacoma, WA'
  }
};

export default function BookPage() {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-forest-green mb-6">Book Your Cleaning</h1>
        <p className="text-xl text-charcoal/80 mb-12">
          Schedule a cleaning service or request a free quote. We'll get back to you within 24 hours.
        </p>

        <div className="bg-warm-white border-2 border-forest-green rounded-lg p-8 mb-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-charcoal mb-2">
                Full Name *
              </label>
              <input
                type="text"
                className="w-full border border-charcoal/30 rounded px-4 py-2 focus:outline-none focus:border-forest-green"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-charcoal mb-2">
                Email Address *
              </label>
              <input
                type="email"
                className="w-full border border-charcoal/30 rounded px-4 py-2 focus:outline-none focus:border-forest-green"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-charcoal mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                className="w-full border border-charcoal/30 rounded px-4 py-2 focus:outline-none focus:border-forest-green"
                placeholder="(253) XXX-XXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-charcoal mb-2">
                Service Type *
              </label>
              <select className="w-full border border-charcoal/30 rounded px-4 py-2 focus:outline-none focus:border-forest-green">
                <option>Select a service</option>
                <option>Deep Cleaning</option>
                <option>Move-Out Cleaning</option>
                <option>Recurring Cleaning</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-charcoal mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                className="w-full border border-charcoal/30 rounded px-4 py-2 focus:outline-none focus:border-forest-green"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-charcoal mb-2">
                Additional Notes
              </label>
              <textarea
                className="w-full border border-charcoal/30 rounded px-4 py-2 focus:outline-none focus:border-forest-green"
                placeholder="Tell us about your cleaning needs"
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-terracotta hover:bg-terracotta/90 text-warm-white font-bold py-3 px-6 rounded-lg transition-colors text-lg"
            >
              Request Quote
            </button>
          </form>
        </div>

        <p className="text-center text-charcoal/70">
          We'll review your request and contact you within 24 business hours.
        </p>
      </div>
    </div>
  );
}
