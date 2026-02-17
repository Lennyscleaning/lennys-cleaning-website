import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';

/* ─── SEO ─── */
export const metadata: Metadata = {
  title: "Book a Cleaning | Lenny's Cleaning — Tacoma, WA",
  description:
    "Book a residential cleaning in Tacoma with Lenny's Cleaning. Flat-rate pricing, background-checked professionals, satisfaction guaranteed.",
  openGraph: {
    title: "Book a Cleaning | Lenny's Cleaning — Tacoma, WA",
    description:
      "Book a residential cleaning in Tacoma with Lenny's Cleaning. Flat-rate pricing, background-checked professionals, satisfaction guaranteed.",
  },
};

/* ─── PAGE ─── */
export default function BookPage() {
  return (
    <main className="bg-warm-white pt-[120px] pb-24 px-6 min-h-[80vh] flex items-center">
      <div className="max-w-[520px] mx-auto text-center">
        <Reveal>
          <h1 className="font-display font-semibold text-charcoal leading-[1.1] tracking-tight mb-5 text-[clamp(36px,5vw,58px)]">
            Book a cleaning
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="font-body text-[19px] text-charcoal-light leading-relaxed mb-10">
            Our online booking system is coming soon. In the meantime, give us a call or send us a message to schedule your cleaning.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="space-y-4 mb-10">
            <a
              href="tel:+12536003355"
              className="flex items-center justify-center gap-3 bg-cream rounded-md px-6 py-4 hover:shadow-md transition-shadow duration-200"
            >
              <svg className="w-5 h-5 text-forest shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span className="font-body text-lg font-semibold text-charcoal">(253) 600-3355</span>
            </a>
            <a
              href="mailto:hello@lennyscleaning.com"
              className="flex items-center justify-center gap-3 bg-cream rounded-md px-6 py-4 hover:shadow-md transition-shadow duration-200"
            >
              <svg className="w-5 h-5 text-forest shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
              </svg>
              <span className="font-body text-lg font-semibold text-charcoal">hello@lennyscleaning.com</span>
            </a>
          </div>
        </Reveal>
        <Reveal delay={300}>
          <Link
            href="/services/standard"
            className="font-body text-base font-medium text-forest hover:text-forest/80 transition-colors duration-200"
          >
            Browse our services →
          </Link>
        </Reveal>
      </div>
    </main>
  );
}
