import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "Lenny's Cleaning | Professional Residential Cleaning in Tacoma, WA",
  description: 'Expert residential cleaning services in Tacoma, Washington. Deep cleaning, move-out cleaning, and recurring maintenance plans.',
  keywords: 'cleaning services, Tacoma, residential cleaning, house cleaning, deep cleaning',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lennyscleaning.com',
    title: "Lenny's Cleaning | Professional Residential Cleaning",
    description: 'Expert residential cleaning services in Tacoma, Washington',
    siteName: "Lenny's Cleaning"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-warm-white text-charcoal font-sans antialiased`}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
