import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deep Cleaning | Lenny\'s Cleaning',
  description: 'Comprehensive deep cleaning services for your Tacoma home. Professional, thorough, and reliable.',
  openGraph: {
    title: 'Deep Cleaning | Lenny\'s Cleaning',
    description: 'Comprehensive deep cleaning services for your Tacoma home'
  }
};

export default function DeepCleaningPage() {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-forest-green mb-6">Deep Cleaning</h1>
        <p className="text-xl text-charcoal/80 mb-8">
          Our comprehensive deep cleaning service goes beyond regular maintenance to transform your entire home.
        </p>

        <section className="bg-warm-white border-2 border-forest-green rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-forest-green mb-4">What's Included</h2>
          <ul className="space-y-3 text-charcoal">
            <li className="flex items-start">
              <span className="text-terracotta font-bold mr-3">✓</span>
              <span>Complete home sanitization</span>
            </li>
            <li className="flex items-start">
              <span className="text-terracotta font-bold mr-3">✓</span>
              <span>Detailed room-by-room cleaning</span>
            </li>
            <li className="flex items-start">
              <span className="text-terracotta font-bold mr-3">✓</span>
              <span>Professional equipment and supplies</span>
            </li>
            <li className="flex items-start">
              <span className="text-terracotta font-bold mr-3">✓</span>
              <span>Attention to detail on every surface</span>
            </li>
          </ul>
        </section>

        <button className="bg-terracotta hover:bg-terracotta/90 text-warm-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
          Book Deep Cleaning
        </button>
      </div>
    </div>
  );
}
