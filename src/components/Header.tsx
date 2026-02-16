'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 bg-warm-white ${
        isScrolled
          ? 'border-b border-gray-l backdrop-blur-[12px] shadow-md'
          : 'border-b border-gray-l border-opacity-50'
      }`}
    >
      <nav className="mx-auto max-w-[1200px] px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display text-2xl font-semibold text-forest">
          Lenny's
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#services"
            className="font-body text-sm font-medium text-charcoal hover:text-forest transition-colors"
          >
            Services
          </Link>
          <Link
            href="/how-it-works"
            className="font-body text-sm font-medium text-charcoal hover:text-forest transition-colors"
          >
            How it works
          </Link>
          <Link
            href="/about"
            className="font-body text-sm font-medium text-charcoal hover:text-forest transition-colors"
          >
            About
          </Link>
        </div>

        {/* CTA Button */}
        <Link href="/book" className="hidden md:block btn-primary">Book a cleaning</Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div
            className={`h-0.5 w-6 bg-forest transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <div
            className={`h-0.5 w-6 bg-forest transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <div
            className={`h-0.5 w-6 bg-forest transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-forest bg-opacity-95 backdrop-blur-md animate-in fade-in duration-300">
          <div className="flex flex-col gap-6 p-8 pt-12">
            <Link
              href="/#services"
              className="font-body text-lg font-medium text-warm-white hover:text-cream transition-colors reveal"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/how-it-works"
              className="font-body text-lg font-medium text-warm-white hover:text-cream transition-colors reveal"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How it works
            </Link>
            <Link
              href="/about"
              className="font-body text-lg font-medium text-warm-white hover:text-cream transition-colors reveal"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link href="/book" className="btn-primary mt-4 w-full text-center block">Book a cleaning</Link>
          </div>
        </div>
      )}
    </header>
  );
}
