import Link from 'next/link';
import { COMPANY_INFO, NAVIGATION } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-warm-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-soft-gold mb-4">
              {COMPANY_INFO.name}
            </h3>
            <p className="text-warm-white/80 mb-4">
              {COMPANY_INFO.description}
            </p>
            <p className="text-warm-white/70">
              📍 {COMPANY_INFO.location}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-soft-gold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAVIGATION.slice(0, 3).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-warm-white/80 hover:text-soft-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-soft-gold mb-4">Contact</h4>
            <p className="text-warm-white/80 mb-2">
              📧 {COMPANY_INFO.contactEmail}
            </p>
            <p className="text-warm-white/80 mb-6">
              📞 {COMPANY_INFO.contactPhone}
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-soft-gold hover:text-terracotta transition-colors">
                Facebook
              </a>
              <a href="#" className="text-soft-gold hover:text-terracotta transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-warm-white/20 pt-8">
          <p className="text-center text-warm-white/60">
            © {currentYear} {COMPANY_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
