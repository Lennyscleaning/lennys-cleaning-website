import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-forest-green text-white">
      <div className="container-site px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-display font-bold mb-4 text-lg">Company</h4>
            <ul className="space-y-2 text-white text-opacity-80">
              <li><Link href="/about" className="hover:text-white transition-colors">About us</Link></li>
              <li><Link href="/join-our-team" className="hover:text-white transition-colors">Join our team</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold mb-4 text-lg">Services</h4>
            <ul className="space-y-2 text-white text-opacity-80">
              <li><Link href="/services/recurring-cleaning" className="hover:text-white transition-colors">Recurring</Link></li>
              <li><Link href="/services/deep-cleaning" className="hover:text-white transition-colors">Deep Clean</Link></li>
              <li><Link href="/services/move-out-cleaning" className="hover:text-white transition-colors">Move-out</Link></li>
              <li><Link href="/services/airbnb-cleaning" className="hover:text-white transition-colors">Airbnb</Link></li>
              <li><Link href="/services/eco-friendly" className="hover:text-white transition-colors">Eco-friendly</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold mb-4 text-lg">Customer</h4>
            <ul className="space-y-2 text-white text-opacity-80">
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/reviews" className="hover:text-white transition-colors">Reviews</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/book" className="hover:text-white transition-colors">Book now</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold mb-4 text-lg">Contact</h4>
            <ul className="space-y-2 text-white text-opacity-80">
              <li><a href="mailto:eric@flowbotics.xyz" className="hover:text-white transition-colors">eric@flowbotics.xyz</a></li>
              <li><a href="tel:+12535551234" className="hover:text-white transition-colors">(253) 555-1234</a></li>
              <li className="pt-2">Based in Tacoma, WA</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white border-opacity-20 pt-8">
          <p className="text-center text-white text-opacity-70 text-sm">© 2025 Lenny's Cleaning. All rights reserved. | <Link href="#" className="hover:text-white transition-colors">Privacy</Link> | <Link href="#" className="hover:text-white transition-colors">Terms</Link></p>
        </div>
      </div>
    </footer>
  );
}