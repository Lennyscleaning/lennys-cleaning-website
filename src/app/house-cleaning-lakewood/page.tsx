import type { Metadata } from 'next';
import CityPageTemplate from '@/components/CityPageTemplate';

export const metadata: Metadata = {
  title: "House Cleaning in Lakewood",
  description:
    'Professional house cleaning in Lakewood, WA. Background-checked cleaners, flat-rate pricing, and a satisfaction guarantee. Book online in 60 seconds.',
  openGraph: {
    title: "House Cleaning in Lakewood | Lenny's Cleaning",
    description:
      'Professional house cleaning in Lakewood, WA. Background-checked cleaners, flat-rate pricing, and a satisfaction guarantee. Book online in 60 seconds.',
  },
};

const nearbyAreas = [
  { name: 'Tacoma', slug: 'tacoma' },
  { name: 'Puyallup', slug: 'puyallup' },
  { name: 'University Place', slug: 'university-place' },
  { name: 'Fife', slug: 'fife' },
  { name: 'Spanaway', slug: 'spanaway' },
  { name: 'Bonney Lake', slug: 'bonney-lake' },
  { name: 'Gig Harbor', slug: 'gig-harbor' },
];

export default function LakewoodPage() {
  return <CityPageTemplate cityName="Lakewood" citySlug="lakewood" nearbyAreas={nearbyAreas} />;
}
