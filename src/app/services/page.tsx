import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/lib/constants';

export const metadata: Metadata = {
  title: "Services | Lenny's Cleaning",
  description: 'Professional cleaning services in Tacoma, WA. Deep cleaning, move-out cleaning, and recurring maintenance plans.',
  openGraph: {
    title: "Services | Lenny's Cleaning",
    description: 'Professional cleaning services in Tacoma, WA'
  }
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-forest-green mb-6">Our Services</h1>
        <p className="text-xl text-charcoal/80 mb-12">
          Professional cleaning solutions tailored to your home's needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <Link key={service.id} href={service.path}>
              <div className="bg-warm-white border-2 border-forest-green rounded-lg p-8 hover:shadow-lg hover:border-terracotta transition-all cursor-pointer h-full">
                <h2 className="text-2xl font-bold text-forest-green mb-4">
                  {service.name}
                </h2>
                <p className="text-charcoal/70 mb-6">
                  {service.description}
                </p>
                <span className="text-terracotta font-bold">Learn more →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
