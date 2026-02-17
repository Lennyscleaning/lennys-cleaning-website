import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Recurring Cleaning in Tacoma | Lenny's Cleaning",
  description:
    "Save up to 15% with recurring cleaning plans from Lenny's Cleaning. Same professional every visit, priority scheduling, flexible plans.",
  openGraph: {
    title: "Recurring Cleaning in Tacoma | Lenny's Cleaning",
    description:
      "Save up to 15% with recurring cleaning plans from Lenny's Cleaning. Same professional every visit, priority scheduling, flexible plans.",
  },
};

export default function RecurringLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
