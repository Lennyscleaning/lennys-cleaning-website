import type { Metadata } from 'next';
import CityPageTemplate from '@/components/CityPageTemplate';

export const metadata: Metadata = {
  title: "House Cleaning in Spanaway",
  description:
    'Professional house cleaning in Spanaway, WA. Background-checked cleaners, flat-rate pricing, and a satisfaction guarantee. Book online in 60 seconds.',
  openGraph: {
    title: "House Cleaning in Spanaway | Lenny's Cleaning",
    description:
      'Professional house cleaning in Spanaway, WA. Background-checked cleaners, flat-rate pricing, and a satisfaction guarantee. Book online in 60 seconds.',
  },
};

const nearbyAreas = [
  { name: 'Tacoma', slug: 'tacoma' },
  { name: 'Lakewood', slug: 'lakewood' },
  { name: 'Puyallup', slug: 'puyallup' },
  { name: 'University Place', slug: 'university-place' },
  { name: 'Fife', slug: 'fife' },
  { name: 'Bonney Lake', slug: 'bonney-lake' },
  { name: 'Gig Harbor', slug: 'gig-harbor' },
];

export default function SpanawayPage() {
  return <CityPageTemplate cityName="Spanaway" citySlug="spanaway" nearbyAreas={nearbyAreas} />;
}
