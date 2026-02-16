import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Lenny's Cleaning — Tacoma, WA",
  description:
    'Tacoma house cleaning you can count on. Vetted professionals, flat-rate pricing, satisfaction guaranteed. Book online in minutes.',
};

export default function Home() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-5">
      <div className="text-center max-w-lg">
        <p className="overline mb-4">Coming soon</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-forest mb-4 leading-tight">
          Tacoma house cleaning you can count on
        </h1>
        <p className="text-lg text-charcoal-light leading-relaxed">
          The homepage is on its way. Foundation scaffolding is live — header, footer, and design system are ready for review.
        </p>
      </div>
    </div>
  );
}