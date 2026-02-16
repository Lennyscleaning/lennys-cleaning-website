import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a cleaning',
  description: 'Schedule your next cleaning with Lenny\'s and experience the difference. Fair pricing, reliable service, satisfaction guaranteed.'
};

export default function BookPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 px-6 bg-warm-white relative">
        <div className="absolute top-0 right-0 w-2/5 h-full bg-cream opacity-60" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
        <div className="container-site relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6 text-forest-green">Schedule your cleaning</h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">Book in minutes. We\'ll confirm your operator within 24 hours.</p>
          </div>
        </div>
      </section>

      {/* Cal.com Embed (Future) */}
      <section className="py-24 px-6 bg-white">
        <div className="container-site">
          <div className="max-w-2xl mx-auto bg-warm-white p-12 rounded-xl border-2 border-dashed border-gray-300 text-center">
            <p className="text-gray-600 mb-4">Booking widget coming soon</p>
            <p className="text-sm text-gray-500">Cal.com integration in progress. Email eric@flowbotics.xyz to schedule early.</p>
          </div>
        </div>
      </section>
    </>
  );
}