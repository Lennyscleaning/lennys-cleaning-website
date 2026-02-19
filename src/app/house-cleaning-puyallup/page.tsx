import type { Metadata } from 'next';
import CityPageTemplate from '@/components/CityPageTemplate';

export const metadata: Metadata = {
  title: "House Cleaning in Puyallup",
  description:
    'Professional house cleaning in Puyallup, WA. Background-checked cleaners, flat-rate pricing, and a satisfaction guarantee. Book online in 60 seconds.',
  openGraph: {
    title: "House Cleaning in Puyallup | Lenny's Cleaning",
    description:
      'Professional house cleaning in Puyallup, WA. Background-checked cleaners, flat-rate pricing, and a satisfaction guarantee. Book online in 60 seconds.',
  },
};

const nearbyAreas = [
  { name: 'Tacoma', slug: 'tacoma' },
  { name: 'Lakewood', slug: 'lakewood' },
  { name: 'University Place', slug: 'university-place' },
  { name: 'Fife', slug: 'fife' },
  { name: 'Spanaway', slug: 'spanaway' },
  { name: 'Bonney Lake', slug: 'bonney-lake' },
  { name: 'Gig Harbor', slug: 'gig-harbor' },
];

export default function PuyallupPage() {
  return <CityPageTemplate cityName="Puyallup" citySlug="puyallup" nearbyAreas={nearbyAreas} />;
}
