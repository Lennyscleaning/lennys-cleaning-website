import Link from 'next/link';

const quickLinks = [
  { label: 'Standard clean', href: '/services/standard' },
  { label: 'Deep clean', href: '/services/deep' },
  { label: 'Move-in / move-out clean', href: '/services/move' },
  { label: "What's included", href: '/services/whats-included' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'About', href: '/about' },
];

export default function Footer() {
  return (
    <footer className="bg-forest text-warm-white">
      <div className="mx-auto max-w-[1200px] px-5 xl:px-0 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Column 1 — Brand */}
          <div>
            <p className="font-display text-xl font-semibold text-warm-white mb-3">
              Lenny&apos;s Cleaning
            </p>
            <p className="text-warm-white/80 text-[15px] leading-relaxed mb-1">
              A clean home, every time.
            </p>
            <p className="text-warm-white/60 text-sm">
              Washington&apos;s trusted cleaning marketplace.
            </p>
          </div>

          {/* Column 2 — Quick links */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-warm-white/50 mb-4">
              Quick links
            </p>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-warm-white/80 hover:text-warm-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-warm-white/50 mb-4">
              Contact
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:hello@lennyscleaning.com"
                  className="text-[15px] text-warm-white/80 hover:text-warm-white transition-colors duration-200"
                >
                  hello@lennyscleaning.com
                </a>
              </li>
              <li className="pt-1">
                <p className="text-sm text-warm-white/60">
                  Serving Tacoma and surrounding communities
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-warm-white/10">
        <div className="mx-auto max-w-[1200px] px-5 xl:px-0 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-warm-white/40">
          <p>&copy; 2026 Lenny&apos;s Cleaning, a Lenny&apos;s Home Services brand. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-warm-white/60 transition-colors duration-200">
              Privacy policy
            </Link>
            <span className="text-warm-white/20">&middot;</span>
            <Link href="/terms-of-service" className="hover:text-warm-white/60 transition-colors duration-200">
              Terms of service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}