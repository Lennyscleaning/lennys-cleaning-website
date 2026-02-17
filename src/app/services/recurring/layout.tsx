import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Recurring House Cleaning | Lenny's Cleaning — Tacoma, WA",
  description:
    'Save up to 30% with recurring house cleaning in Tacoma. Weekly, biweekly, or monthly plans with the same vetted professional every visit. Cancel or change anytime.',
  openGraph: {
    title: "Recurring House Cleaning | Lenny's Cleaning — Tacoma, WA",
    description:
      'Save up to 30% with recurring house cleaning in Tacoma. Weekly, biweekly, or monthly plans with the same vetted professional every visit. Cancel or change anytime.',
  },
};

export default function RecurringLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
