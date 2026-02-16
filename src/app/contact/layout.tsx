import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact us',
  description: 'Have a question? Reach out to the Lenny\'s Cleaning team. We\'re here to help.'
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}