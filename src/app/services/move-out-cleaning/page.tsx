import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Move-Out Cleaning | Lenny\'s Cleaning',
  description: 'Professional move-out cleaning services in Tacoma, WA. Get your security deposit back with our thorough cleaning.',
  openGraph: {
    title: 'Move-Out Cleaning | Lenny\'s Cleaning',
    description: 'Professional move-out cleaning services in Tacoma, WA'
  }
};

export default function MoveOutCleaningPage() {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-forest-green mb-6">Move-Out Cleaning</h1>
        <p className="text-xl text-charcoal/80 mb-8">
          Professional move-out cleaning to help you get your security deposit back and leave your old home spotless.
        </p>

        <section className="bg-warm-white border-2 border-forest-green rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-forest-green mb-4">Why Choose Our Move-Out Service</h2>
          <ul className="space-y-3 text-charcoal">
            <li className="flex items-start">
              <span className="text-terracotta font-bold mr-3">✓</span>
              <span>Landlord-approved cleaning standards</span>
            </li>
            <li className="flex items-start">
              <span className="text-terracotta font-bold mr-3">✓</span>
              <span>Carpet and upholstery cleaning</span>
            </li>
            <li className="flex items-start">
              <span className="text-terracotta font-bold mr-3">✓</span>
              <span>Professional equipment provided</span>
            </li>
            <li className="flex items-start">
              <span className="text-terracotta font-bold mr-3">✓</span>
              <span>Flexible scheduling around move dates</span>
            </li>
          </ul>
        </section>

        <button className="bg-terracotta hover:bg-terracotta/90 text-warm-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
          Schedule Move-Out Cleaning
        </button>
      </div>
    </div>
  );
}
