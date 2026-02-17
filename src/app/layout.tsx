import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const GA_ID = 'G-TM4CXFN5M4';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Lenny's Cleaning — Tacoma, WA",
    default: "Lenny's Cleaning — Tacoma, WA",
  },
  description:
    'Tacoma house cleaning you can count on. Vetted professionals, flat-rate pricing, satisfaction guaranteed. Book online in minutes.',
  keywords:
    'house cleaning tacoma, residential cleaning, maid service tacoma, cleaning service near me, professional house cleaning',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lennyscleaning.com',
    siteName: "Lenny's Cleaning",
    title: "Lenny's Cleaning — Tacoma, WA",
    description:
      'Vetted cleaning professionals, flat-rate pricing, satisfaction guaranteed. Book a cleaning in Tacoma today.',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lenny's Cleaning — Tacoma, WA",
    description:
      'Vetted cleaning professionals, flat-rate pricing, satisfaction guaranteed. Book a cleaning in Tacoma today.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
      <body className="bg-warm-white text-charcoal font-body antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}