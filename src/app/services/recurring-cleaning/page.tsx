import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recurring Cleaning | Lenny\'s Cleaning',
  description: 'Regular maintenance cleaning plans in Tacoma, WA. Keep your home clean every week, bi-weekly, or monthly.',
  openGraph: {
    title: 'Recurring Cleaning | Lenny\'s Cleaning',
    description: 'Regular maintenance cleaning plans in Tacoma, WA'
  }
};

export default function RecurringCleaningPage() {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-forest-green mb-6">Recurring Cleaning</h1>
        <p className="text-xl text-charcoal/80 mb-8">
          Regular maintenance cleaning plans to keep your home consistently clean and fresh.
        </p>

        <section className="bg-warm-white border-2 border-forest-green rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-forest-green mb-4">Cleaning Frequency Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="border border-terracotta rounded p-4">
              <h3 className="font-bold text-terracotta mb-2">Weekly</h3>
              <p className="text-charcoal text-sm">Perfect for busy families</p>
            </div>
            <div className="border border-terracotta rounded p-4">
              <h3 className="font-bold text-terracotta mb-2">Bi-Weekly</h3>
              <p className="text-charcoal text-sm">Most popular option</p>
            </div>
            <div className="border border-terracotta rounded p-4">
              <h3 className="font-bold text-terracotta mb-2">Monthly</h3>
              <p className="text-charcoal text-sm">Budget-friendly choice</p>
            </div>
          </div>
        </section>

        <section className="bg-warm-white border-2 border-forest-green rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-forest-green mb-4">Benefits</h2>
          <ul className="space-y-3 text-charcoal">
            <li className="flex items-start">
              <span className="text-soft-gold font-bold mr-3">→</span>
              <span>Consistent cleanliness every time</span>
            </li>
            <li className="flex items-start">
              <span className="text-soft-gold font-bold mr-3">→</span>
              <span>Discounted rates for regular service</span>
            </li>
            <li className="flex items-start">
              <span className="text-soft-gold font-bold mr-3">→</span>
              <span>Same professional team each visit</span>
            </li>
            <li className="flex items-start">
              <span className="text-soft-gold font-bold mr-3">→</span>
              <span>Flexible scheduling and cancellations</span>
            </li>
          </ul>
        </section>

        <button className="bg-terracotta hover:bg-terracotta/90 text-warm-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
          Set Up Recurring Cleaning
        </button>
      </div>
    </div>
  );
}
