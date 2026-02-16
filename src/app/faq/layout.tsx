import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Lenny\'s Cleaning. Learn about our service, pricing, and what to expect.'
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}