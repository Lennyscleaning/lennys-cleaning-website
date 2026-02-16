import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Header />

      <section className="bg-warm-white py-16 md:py-24 px-5 md:px-6 min-h-[60vh] flex items-center">
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="font-display text-5xl md:text-6xl text-forest mb-6">
            This page wandered off
          </h1>
          <p className="font-body text-lg text-charcoal max-w-[640px] mx-auto mb-12">
            We couldn't find what you're looking for — but we can still help you find a great cleaning professional.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-terra text-warm-white px-8 py-3 rounded-lg font-body font-medium hover:opacity-90 transition"
            >
              Take me home →
            </Link>
            <Link
              href="/#services"
              className="inline-block border-2 border-terra text-terra px-8 py-3 rounded-lg font-body font-medium hover:bg-terra hover:text-warm-white transition"
            >
              Browse our services →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
