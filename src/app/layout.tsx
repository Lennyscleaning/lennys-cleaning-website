import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "Lenny's Cleaning — Tacoma, WA",
  description:
    "Lenny's Cleaning matches you with vetted, local cleaning professionals in Tacoma. Flat-rate pricing, satisfaction guaranteed. Book your cleaning today.",
  openGraph: {
    title: "Lenny's Cleaning — Tacoma, WA",
    description:
      "Lenny's Cleaning matches you with vetted, local cleaning professionals in Tacoma. Flat-rate pricing, satisfaction guaranteed. Book your cleaning today.",
    type: 'website',
    url: 'https://lennyscleaning.com',
    siteName: "Lenny's Cleaning",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lenny's Cleaning — Tacoma, WA",
    description:
      "Lenny's Cleaning matches you with vetted, local cleaning professionals in Tacoma. Flat-rate pricing, satisfaction guaranteed. Book your cleaning today.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-warm-white font-body">
        <main>{children}</main>
      </body>
    </html>
  );
}
