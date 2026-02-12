import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Lenny\'s Cleaning',
  description: 'Learn about Lenny\'s Cleaning and our commitment to professional, reliable cleaning services in Tacoma, WA.',
  openGraph: {
    title: 'About | Lenny\'s Cleaning',
    description: 'Learn about Lenny\'s Cleaning and our commitment to professional, reliable cleaning services'
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-forest-green mb-6">About Lenny's Cleaning</h1>
        <p className="text-xl text-charcoal/80 mb-12">
          Professional residential cleaning services serving Tacoma and surrounding areas with integrity and excellence.
        </p>

        <section className="bg-warm-white border-2 border-forest-green rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-forest-green mb-4">Our Mission</h2>
          <p className="text-lg text-charcoal/80">
            To provide exceptional, professional cleaning services that exceed our clients' expectations and help them maintain healthy, clean homes.
          </p>
        </section>

        <section className="bg-warm-white border-2 border-forest-green rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-forest-green mb-4">Why Choose Us</h2>
          <ul className="space-y-4 text-charcoal">
            <li className="flex items-start">
              <span className="text-soft-gold font-bold mr-4">●</span>
              <div>
                <h3 className="font-bold mb-1">Professional Team</h3>
                <p className="text-charcoal/80">Trained, experienced cleaners dedicated to quality work</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-soft-gold font-bold mr-4">●</span>
              <div>
                <h3 className="font-bold mb-1">Reliable Service</h3>
                <p className="text-charcoal/80">Punctual, consistent, and dependable cleaning every time</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-soft-gold font-bold mr-4">●</span>
              <div>
                <h3 className="font-bold mb-1">Eco-Friendly Practices</h3>
                <p className="text-charcoal/80">Safe, sustainable cleaning methods for your family</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-soft-gold font-bold mr-4">●</span>
              <div>
                <h3 className="font-bold mb-1">Transparent Pricing</h3>
                <p className="text-charcoal/80">No hidden fees, fair rates for honest service</p>
              </div>
            </li>
          </ul>
        </section>

        <section className="bg-forest-green text-warm-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Experience the Difference?</h2>
          <p className="mb-6">Contact us today for a free quote on your cleaning needs.</p>
          <button className="bg-terracotta hover:bg-terracotta/90 text-warm-white font-bold py-2 px-6 rounded-lg transition-colors">
            Get in Touch
          </button>
        </section>
      </div>
    </div>
  );
}
