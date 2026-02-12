import Link from 'next/link';
import { NAVIGATION } from '@/lib/constants';

export default function Header() {
  return (
    <header className="bg-forest-green text-warm-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="text-2xl font-bold text-warm-white hover:text-soft-gold transition-colors"
          >
            Lenny's Cleaning
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex gap-8">
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-warm-white hover:text-soft-gold transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <button className="bg-terracotta hover:bg-terracotta/90 text-warm-white font-bold py-2 px-6 rounded-lg transition-colors hidden md:block">
            Get Quote
          </button>

          {/* Mobile Menu Placeholder */}
          <button className="md:hidden text-warm-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
