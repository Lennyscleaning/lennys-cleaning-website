import type { Metadata } from 'next';
import { fetchPricingData } from '@/lib/fetch-pricing';
import RecurringClient from './RecurringClient';

/* ─── SEO ─── */
export const metadata: Metadata = {
  title: "Recurring House Cleaning | Lenny's Cleaning — Tacoma, WA",
  description:
    'Save up to 30% with recurring house cleaning in Tacoma. Weekly, biweekly, or monthly plans with the same vetted professional every visit. Cancel or change anytime.',
  openGraph: {
    title: "Recurring House Cleaning | Lenny's Cleaning — Tacoma, WA",
    description:
      'Save up to 30% with recurring house cleaning in Tacoma. Weekly, biweekly, or monthly plans with the same vetted professional every visit.',
  },
};

/* ─── PAGE (server component — fetches pricing and passes to client) ─── */
export default async function RecurringCleaningPage() {
  const pricingData = await fetchPricingData();

  return (
    <RecurringClient
      recurringPrices={pricingData.recurringPrices}
      displayBedrooms={pricingData.recurringDisplayBedrooms}
    />
  );
}
