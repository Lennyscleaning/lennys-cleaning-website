import type { Metadata } from 'next';
import { COMPANY_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact | Lenny\'s Cleaning',
  description: 'Get in touch with Lenny\'s Cleaning. Contact us for cleaning services, quotes, or inquiries in Tacoma, WA.',
  openGraph: {
    title: 'Contact | Lenny\'s Cleaning',
    description: 'Get in touch with Lenny\'s Cleaning in Tacoma, WA'
  }
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-forest-green mb-6">Contact Us</h1>
        <p className="text-xl text-charcoal/80 mb-12">
          Have questions? We'd love to hear from you. Get in touch with us today.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <div className="bg-warm-white border-2 border-forest-green rounded-lg p-8">
            <h2 className="text-2xl font-bold text-forest-green mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-charcoal mb-2">📞 Phone</h3>
                <a
                  href="tel:+12531234567"
                  className="text-terracotta hover:text-terracotta/80 text-lg"
                >
                  {COMPANY_INFO.contactPhone}
                </a>
              </div>

              <div>
                <h3 className="font-bold text-charcoal mb-2">📧 Email</h3>
                <a
                  href={`mailto:${COMPANY_INFO.contactEmail}`}
                  className="text-terracotta hover:text-terracotta/80 text-lg"
                >
                  {COMPANY_INFO.contactEmail}
                </a>
              </div>

              <div>
                <h3 className="font-bold text-charcoal mb-2">📍 Service Area</h3>
                <p className="text-charcoal/80">
                  {COMPANY_INFO.location} and surrounding areas
                </p>
              </div>

              <div>
                <h3 className="font-bold text-charcoal mb-4">Hours</h3>
                <p className="text-charcoal/80 text-sm space-y-1">
                  <div>Monday - Friday: 8am - 6pm</div>
                  <div>Saturday: 9am - 4pm</div>
                  <div>Sunday: Closed</div>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-warm-white border-2 border-forest-green rounded-lg p-8">
            <h2 className="text-2xl font-bold text-forest-green mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-charcoal mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  className="w-full border border-charcoal/30 rounded px-3 py-2 focus:outline-none focus:border-forest-green"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-charcoal mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  className="w-full border border-charcoal/30 rounded px-3 py-2 focus:outline-none focus:border-forest-green"
                  placeholder="Your email"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-charcoal mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  className="w-full border border-charcoal/30 rounded px-3 py-2 focus:outline-none focus:border-forest-green"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-charcoal mb-1">
                  Message *
                </label>
                <textarea
                  className="w-full border border-charcoal/30 rounded px-3 py-2 focus:outline-none focus:border-forest-green"
                  placeholder="Your message"
                  rows={4}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-terracotta hover:bg-terracotta/90 text-warm-white font-bold py-2 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
