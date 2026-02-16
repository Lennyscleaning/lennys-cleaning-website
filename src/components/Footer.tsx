import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-forest text-warm-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Column 1: Brand */}
          <div>
            <h3 className="font-display text-2xl font-semibold mb-2">Lenny's</h3>
            <p className="font-body text-base mb-1">A clean home, every time.</p>
            <p className="font-body text-sm text-cream">
              Tacoma's trusted cleaning marketplace.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-wide mb-4">
              Services
            </h4>
            <ul className="space-y-2 font-body text-base">
              <li>
                <Link href="/services/standard" className="hover:text-cream transition-colors">
                  Standard clean
                </Link>
              </li>
              <li>
                <Link href="/services/deep" className="hover:text-cream transition-colors">
                  Deep clean
                </Link>
              </li>
              <li>
                <Link href="/services/move" className="hover:text-cream transition-colors">
                  Move-in / move-out clean
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-cream transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cream transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-wide mb-4">
              Contact
            </h4>
            <p className="font-body text-base mb-3">
              <a
                href="mailto:hello@lennyscleaning.com"
                className="hover:text-cream transition-colors"
              >
                hello@lennyscleaning.com
              </a>
            </p>
            <p className="font-body text-base mb-4">
              <a href="tel:+12535550100" className="hover:text-cream transition-colors">
                (253) 555-0100
              </a>
            </p>
            <p className="font-body text-sm text-cream">
              Serving Tacoma and surrounding communities
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-forest-light border-opacity-30">
        <div className="mx-auto max-w-[1200px] px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 font-body text-sm">
            <p className="text-cream">
              © 2026 Lenny's Cleaning, a Lenny's Home Services brand. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-cream transition-colors">
                Privacy policy
              </Link>
              <span className="text-cream">·</span>
              <Link href="#" className="hover:text-cream transition-colors">
                Terms of service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
