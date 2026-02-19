import type { Metadata } from 'next';
import BookingForm from './BookingForm';

export const metadata: Metadata = {
  title: "Book a Cleaning",
  description:
    'Book a residential cleaning in Tacoma with Lenny\'s Cleaning. Flat-rate pricing, background-checked professionals, satisfaction guaranteed.',
  openGraph: {
    title: "Book a Cleaning | Lenny's Cleaning — Tacoma, WA",
    description:
      'Book a residential cleaning in Tacoma with Lenny\'s Cleaning. Flat-rate pricing, background-checked professionals, satisfaction guaranteed.',
  },
};

export default function BookPage() {
  return (
    <section className="bg-warm-white pt-[120px] pb-24 px-6 min-h-[80vh]">
      <div className="max-w-[640px] mx-auto">
        <BookingForm />
      </div>
    </section>
  );
}
