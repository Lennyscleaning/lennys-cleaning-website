'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/* ─── Nav data ─── */
const servicesLinks = [
  { label: 'Standard cleaning', href: '/services/standard' },
  { label: 'Deep cleaning', href: '/services/deep' },
  { label: 'Move-in / move-out', href: '/services/move' },
  { label: 'Airbnb & vacation rental', href: '/services/airbnb' },
  { label: 'Recurring plans', href: '/services/recurring' },
  { label: "What's included", href: '/services/whats-included' },
];

const areasLinks = [
  { label: 'Tacoma', href: '/house-cleaning-tacoma' },
  { label: 'Lakewood', href: '/house-cleaning-lakewood' },
  { label: 'Puyallup', href: '/house-cleaning-puyallup' },
  { label: 'University Place', href: '/house-cleaning-university-place' },
  { label: 'Fife', href: '/house-cleaning-fife' },
  { label: 'Spanaway', href: '/house-cleaning-spanaway' },
  { label: 'Bonney Lake', href: '/house-cleaning-bonney-lake' },
  { label: 'Gig Harbor', href: '/house-cleaning-gig-harbor' },
];

/* ─── Dropdown component ─── */
function Dropdown({
  label,
  links,
  open,
  onToggle,
  onClose,
}: {
  label: string;
  links: { label: string; href: string }[];
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-[15px] font-medium text-charcoal transition-colors duration-200 hover:text-forest"
        aria-expanded={open}
      >
        {label}
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-3 w-56 bg-warm-white rounded-md shadow-lg border border-cream-dark py-2 z-50">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block px-4 py-2.5 text-sm font-medium text-charcoal hover:bg-cream hover:text-forest transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Mobile nav overlay ─── */
function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-warm-white flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-cream-dark">
        <Link href="/" onClick={onClose} className="font-display text-xl font-semibold text-forest">
          Lenny&apos;s Cleaning
        </Link>
        <button onClick={onClose} aria-label="Close menu" className="p-2 -mr-2 text-charcoal">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-5 py-6">
        <ul className="space-y-1">
          {/* Services accordion */}
          <li>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center justify-between w-full py-3 text-base font-medium text-charcoal"
            >
              Services
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {servicesOpen && (
              <ul className="pl-4 pb-2 space-y-1">
                {servicesLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block py-2 text-sm text-charcoal-light hover:text-forest transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <Link href="/pricing" onClick={onClose} className="block py-3 text-base font-medium text-charcoal">
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={onClose} className="block py-3 text-base font-medium text-charcoal">
              About
            </Link>
          </li>

          {/* Service Areas accordion */}
          <li>
            <button
              onClick={() => setAreasOpen(!areasOpen)}
              className="flex items-center justify-between w-full py-3 text-base font-medium text-charcoal"
            >
              Service areas
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${areasOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {areasOpen && (
              <ul className="pl-4 pb-2 space-y-1">
                {areasLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block py-2 text-sm text-charcoal-light hover:text-forest transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <Link href="/join-our-team" onClick={onClose} className="block py-3 text-base font-medium text-charcoal">
              Join our team
            </Link>
          </li>
        </ul>
      </nav>

      {/* Bottom bar */}
      <div className="px-5 py-6 border-t border-cream-dark space-y-4">
        <Link href="/book" onClick={onClose} className="btn-primary w-full text-center">
          Book a cleaning
        </Link>
        <a
          href="tel:+12536003355"
          className="block text-center text-sm font-medium text-charcoal-light"
        >
          (253) 600-3355
        </a>
      </div>
    </div>
  );
}

/* ─── Main Header ─── */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    handleScroll(); // Check initial position
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-warm-white/95 backdrop-blur-md shadow-md'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex items-center justify-between h-[72px] max-w-[1200px] px-5 xl:px-0">
          {/* Logo */}
          <Link href="/" className="font-display text-xl font-semibold text-forest shrink-0">
            Lenny&apos;s Cleaning
          </Link>

          {/* Desktop nav — hidden below 768px */}
          <div className="hidden md:flex items-center gap-7">
            <Dropdown
              label="Services"
              links={servicesLinks}
              open={openDropdown === 'services'}
              onToggle={() => setOpenDropdown(openDropdown === 'services' ? null : 'services')}
              onClose={() => setOpenDropdown(null)}
            />
            <Link
              href="/pricing"
              className="text-[15px] font-medium text-charcoal transition-colors duration-200 hover:text-forest"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-[15px] font-medium text-charcoal transition-colors duration-200 hover:text-forest"
            >
              About
            </Link>
            <Dropdown
              label="Service areas"
              links={areasLinks}
              open={openDropdown === 'areas'}
              onToggle={() => setOpenDropdown(openDropdown === 'areas' ? null : 'areas')}
              onClose={() => setOpenDropdown(null)}
            />
            <Link
              href="/join-our-team"
              className="text-[15px] font-medium text-charcoal transition-colors duration-200 hover:text-forest"
            >
              Join our team
            </Link>
          </div>

          {/* Desktop right — phone + CTA */}
          <div className="hidden md:flex items-center gap-5 shrink-0">
            <a
              href="tel:+12536003355"
              className="text-sm font-medium text-gray-m transition-colors duration-200 hover:text-forest"
            >
              (253) 600-3355
            </a>
            <Link href="/book" className="btn-primary">
              Book a cleaning
            </Link>
          </div>

          {/* Mobile right — phone icon + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <a
              href="tel:+12536003355"
              aria-label="Call us"
              className="p-2 text-forest"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="p-2 -mr-2 text-charcoal"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}