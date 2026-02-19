import type { Metadata } from 'next';
import CityPageTemplate from '@/components/CityPageTemplate';

export const metadata: Metadata = {
  title: "House Cleaning in Tacoma",
  description:
    'Professional house cleaning in Tacoma, WA. Background-checked cleaners, flat-rate pricing, and a satisfaction guarantee. Book online in 60 seconds.',
  openGraph: {
    title: "House Cleaning in Tacoma | Lenny's Cleaning",
    description:
      'Professional house cleaning in Tacoma, WA. Background-checked cleaners, flat-rate pricing, and a satisfaction guarantee. Book online in 60 seconds.',
  },
};

const nearbyAreas = [
  { name: 'Lakewood', slug: 'lakewood' },
  { name: 'Puyallup', slug: 'puyallup' },
  { name: 'University Place', slug: 'university-place' },
  { name: 'Fife', slug: 'fife' },
  { name: 'Spanaway', slug: 'spanaway' },
  { name: 'Bonney Lake', slug: 'bonney-lake' },
  { name: 'Gig Harbor', slug: 'gig-harbor' },
];

export default function TacomaPage() {
  return <CityPageTemplate cityName="Tacoma" citySlug="tacoma" nearbyAreas={nearbyAreas} />;
}
