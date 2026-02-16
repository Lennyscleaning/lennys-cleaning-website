import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About us',
  description: 'Lenny\'s Cleaning is a Tacoma-based cleaning marketplace that pays professionals more, charges fair prices, and backs every job with a satisfaction guarantee.'
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}