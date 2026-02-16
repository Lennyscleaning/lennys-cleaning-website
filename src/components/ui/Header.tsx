'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container-site px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-2xl text-forest-green">
          Lenny's
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/about" className="font-body text-gray-700 hover:text-forest-green transition-colors">About</Link>
          <Link href="/services" className="font-body text-gray-700 hover:text-forest-green transition-colors">Services</Link>
          <Link href="/pricing" className="font-body text-gray-700 hover:text-forest-green transition-colors">Pricing</Link>
          <Link href="/reviews" className="font-body text-gray-700 hover:text-forest-green transition-colors">Reviews</Link>
          <Link href="/faq" className="font-body text-gray-700 hover:text-forest-green transition-colors">FAQ</Link>
          <Link href="/book" className="px-6 py-2 bg-forest-green text-white font-display font-bold rounded-lg hover:bg-emerald-900 transition-colors">
            Book
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-forest-green"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-warm-white border-t border-gray-200 p-6 space-y-4">
          <Link href="/about" className="block font-body text-gray-700 hover:text-forest-green">
            About
          </Link>
          <Link href="/services" className="block font-body text-gray-700 hover:text-forest-green">
            Services
          </Link>
          <Link href="/pricing" className="block font-body text-gray-700 hover:text-forest-green">
            Pricing
          </Link>
          <Link href="/reviews" className="block font-body text-gray-700 hover:text-forest-green">
            Reviews
          </Link>
          <Link href="/faq" className="block font-body text-gray-700 hover:text-forest-green">
            FAQ
          </Link>
          <Link href="/book" className="block px-6 py-2 bg-forest-green text-white font-display font-bold rounded-lg hover:bg-emerald-900 transition-colors text-center">
            Book
          </Link>
        </nav>
      )}
    </header>
  );
}