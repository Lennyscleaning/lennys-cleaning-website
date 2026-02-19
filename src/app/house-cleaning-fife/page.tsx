import type { Metadata } from 'next';
import CityPageTemplate from '@/components/CityPageTemplate';

export const metadata: Metadata = {
  title: "House Cleaning in Fife",
  description:
    'Professional house cleaning in Fife, WA. Background-checked cleaners, flat-rate pricing, and a satisfaction guarantee. Book online in 60 seconds.',
  openGraph: {
    title: "House Cleaning in Fife | Lenny's Cleaning",
    description:
      'Professional house cleaning in Fife, WA. Background-checked cleaners, flat-rate pricing, and a satisfaction guarantee. Book online in 60 seconds.',
  },
};

const nearbyAreas = [
  { name: 'Tacoma', slug: 'tacoma' },
  { name: 'Lakewood', slug: 'lakewood' },
  { name: 'Puyallup', slug: 'puyallup' },
  { name: 'University Place', slug: 'university-place' },
  { name: 'Spanaway', slug: 'spanaway' },
  { name: 'Bonney Lake', slug: 'bonney-lake' },
  { name: 'Gig Harbor', slug: 'gig-harbor' },
];

export default function FifePage() {
  return <CityPageTemplate cityName="Fife" citySlug="fife" nearbyAreas={nearbyAreas} />;
}
