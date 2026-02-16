import type { Metadata } from 'next';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Reviews',
  description: 'See what Tacoma families are saying about Lenny\'s Cleaning service and our professional operators.'
};

export default function ReviewsPage() {
  const reviews = [
    {
      name: 'Sarah Mitchell',
      rating: 5,
      date: '2 weeks ago',
      text: 'Absolutely fantastic service! Our operator was professional, thorough, and respectful of our home. This is the cleanest our house has ever been. We\'re booking monthly now.',
      service: 'Deep Cleaning'
    },
    {
      name: 'John Davis',
      rating: 5,
      date: '1 month ago',
      text: 'Best cleaning platform I\'ve found. The commitment to paying operators fairly shows in the quality of work. Highly recommend Lenny\'s.',
      service: 'Recurring Cleaning'
    },
    {
      name: 'Lisa Rodriguez',
      rating: 5,
      date: '1 month ago',
      text: 'Love that they offer eco-friendly cleaning! Our home is spotless and we don\'t worry about harmful chemicals around our kids and pets.',
      service: 'Eco-Friendly Cleaning'
    },
    {
      name: 'Michael Chen',
      rating: 5,
      date: '1.5 months ago',
      text: 'Used Lenny\'s for move-out cleaning. They were thorough, efficient, and my landlord had no complaints. Great value.',
      service: 'Move-Out Cleaning'
    },
    {
      name: 'Jennifer Marks',
      rating: 5,
      date: '2 months ago',
      text: 'Reliable, consistent, and fair pricing. Been using Lenny\'s for 3 months now. Never had an issue. Operators are always professional.',
      service: 'Recurring Cleaning'
    },
    {
      name: 'David Thompson',
      rating: 5,
      date: '2 months ago',
      text: 'Needed a quick turnover clean for an Airbnb. They showed up on time, cleaned thoroughly, and guests left 5-star reviews. Perfect!',
      service: 'Airbnb Cleaning'
    }
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 px-6 bg-warm-white relative">
        <div className="absolute top-0 right-0 w-2/5 h-full bg-cream opacity-60" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
        <div className="container-site relative z-10">
          <div className="max-w-2xl">
            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6 text-forest-green">Loved by Tacoma</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">See what our customers are saying about their experience with Lenny\'s Cleaning.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-2xl text-yellow-400">★</span>
                  ))}
                </div>
                <span className="text-lg font-display font-bold text-forest-green">4.9 out of 5</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 px-6 bg-white">
        <div className="container-site max-w-4xl">
          <div className="grid gap-8">
            {reviews.map((review, i) => (
              <Reveal key={i} delay={0.1 + (i % 3) * 0.05}>
                <div className="bg-warm-white p-8 rounded-lg border-l-4 border-terracotta">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-display font-bold text-forest-green">{review.name}</h3>
                      <p className="text-sm text-gray-600">{review.service} • {review.date}</p>
                    </div>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-lg text-yellow-400">★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">\"{ review.text }\"</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}