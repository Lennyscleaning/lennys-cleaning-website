import type { Metadata } from 'next';
import CityPageTemplate from '@/components/CityPageTemplate';

export const metadata: Metadata = {
  title: "House Cleaning in Bonney Lake",
  description:
    'Professional house cleaning in Bonney Lake, WA. Background-checked cleaners, flat-rate pricing, and a satisfaction guarantee. Book online in 60 seconds.',
  openGraph: {
    title: "House Cleaning in Bonney Lake | Lenny's Cleaning",
    description:
      'Professional house cleaning in Bonney Lake, WA. Background-checked cleaners, flat-rate pricing, and a satisfaction guarantee. Book online in 60 seconds.',
  },
};

const nearbyAreas = [
  { name: 'Tacoma', slug: 'tacoma' },
  { name: 'Lakewood', slug: 'lakewood' },
  { name: 'Puyallup', slug: 'puyallup' },
  { name: 'University Place', slug: 'university-place' },
  { name: 'Fife', slug: 'fife' },
  { name: 'Spanaway', slug: 'spanaway' },
  { name: 'Gig Harbor', slug: 'gig-harbor' },
];

export default function BonneyLakePage() {
  return <CityPageTemplate cityName="Bonney Lake" citySlug="bonney-lake" nearbyAreas={nearbyAreas} />;
}
