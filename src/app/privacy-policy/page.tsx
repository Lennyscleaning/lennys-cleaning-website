import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: "Privacy Policy | Lenny's Cleaning",
  description:
    "Privacy policy for Lenny's Cleaning. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <header className="bg-warm-white pt-[120px] pb-16 px-6">
        <div className="max-w-[700px] mx-auto">
          <Reveal>
            <p className="overline mb-3">LEGAL</p>
            <h1 className="font-display font-semibold text-charcoal leading-[1.1] tracking-tight mb-4 text-[clamp(36px,5vw,58px)]">
              Privacy policy
            </h1>
            <p className="font-body text-sm text-charcoal-light">
              Last updated: February 17, 2026
            </p>
          </Reveal>
        </div>
      </header>

      <section className="py-16 px-6">
        <div className="max-w-[700px] mx-auto prose-legal">
          <Reveal>
            <div className="space-y-10">

              <div>
                <h2 className="font-display font-medium text-xl text-charcoal mb-3">1. Who we are</h2>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                  Lenny&apos;s Cleaning (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the website lennyscleaning.com and provides residential cleaning services in the Tacoma, Washington area. For privacy-related questions, contact us at{' '}
                  <a href="mailto:eric@lennyscleaning.com" className="text-forest hover:text-forest-dark transition-colors">eric@lennyscleaning.com</a> or{' '}
                  <a href="tel:+12536003355" className="text-forest hover:text-forest-dark transition-colors">(253) 600-3355</a>.
                </p>
              </div>

              <div>
                <h2 className="font-display font-medium text-xl text-charcoal mb-3">2. Information we collect</h2>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed mb-3">
                  When you use our services, we may collect the following personal information:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 font-body text-[15px] text-charcoal-light leading-relaxed">
                  <li>Name, email address, and phone number</li>
                  <li>Home address and service location details</li>
                  <li>Payment information (processed securely through Stripe — we never store your full card number)</li>
                  <li>Booking details including service type, date, time, and special instructions</li>
                  <li>Communications between you and our team</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display font-medium text-xl text-charcoal mb-3">3. How we use your information</h2>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed mb-3">
                  We use your personal information to:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 font-body text-[15px] text-charcoal-light leading-relaxed">
                  <li>Provide and coordinate cleaning services</li>
                  <li>Communicate about your bookings, including confirmations and updates</li>
                  <li>Send SMS booking confirmations and reminders (with your opt-in consent)</li>
                  <li>Process payments through Stripe</li>
                  <li>Improve our services and website experience</li>
                  <li>Respond to your questions and support requests</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display font-medium text-xl text-charcoal mb-3">4. Third-party services</h2>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed mb-3">
                  We share your information with the following third-party services, only as necessary to operate our business:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 font-body text-[15px] text-charcoal-light leading-relaxed">
                  <li><strong>Stripe</strong> — payment processing. Stripe&apos;s privacy policy governs how they handle your payment data.</li>
                  <li><strong>Twilio</strong> — SMS notifications and booking confirmations.</li>
                  <li><strong>Google Analytics (GA4)</strong> — anonymous website usage analytics (measurement ID: G-TM4CXFN5M4). No personally identifiable information is shared with Google.</li>
                  <li><strong>Airtable</strong> — customer relationship management and booking records.</li>
                </ul>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed mt-3">
                  We do not sell your personal information to any third party.
                </p>
              </div>

              <div>
                <h2 className="font-display font-medium text-xl text-charcoal mb-3">5. Cookies</h2>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                  Our website uses essential cookies required for site functionality and Google Analytics cookies to understand how visitors use our site. We do not use advertising or tracking cookies. You can disable cookies in your browser settings, though some site features may not work properly.
                </p>
              </div>

              <div>
                <h2 className="font-display font-medium text-xl text-charcoal mb-3">6. SMS communications</h2>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                  During the booking process, you may opt in to receive SMS notifications about your cleaning appointments. These messages include booking confirmations, reminders, and updates from your cleaning professional. Message and data rates may apply. You can opt out at any time by replying STOP to any message. For help, reply HELP or contact us at{' '}
                  <a href="mailto:eric@lennyscleaning.com" className="text-forest hover:text-forest-dark transition-colors">eric@lennyscleaning.com</a>.
                </p>
              </div>

              <div>
                <h2 className="font-display font-medium text-xl text-charcoal mb-3">7. Data retention</h2>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                  We retain your personal information for as long as your account is active or as needed to provide services to you. If you request deletion of your data, we will remove your personal information within 30 days, except where we are required by law to retain certain records.
                </p>
              </div>

              <div>
                <h2 className="font-display font-medium text-xl text-charcoal mb-3">8. Your rights</h2>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed mb-3">
                  You have the right to:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 font-body text-[15px] text-charcoal-light leading-relaxed">
                  <li>Request access to the personal data we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal data</li>
                  <li>Opt out of SMS communications at any time</li>
                </ul>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed mt-3">
                  To exercise any of these rights, email us at{' '}
                  <a href="mailto:eric@lennyscleaning.com" className="text-forest hover:text-forest-dark transition-colors">eric@lennyscleaning.com</a>.
                </p>
              </div>

              <div>
                <h2 className="font-display font-medium text-xl text-charcoal mb-3">9. Washington state residents</h2>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                  We comply with the Washington My Health My Data Act and the Washington Privacy Act. Washington residents have additional rights regarding their personal data, including the right to know what data is collected, the right to delete personal data, and the right to opt out of the sale of personal data. We do not sell personal data. To exercise your rights, contact us at{' '}
                  <a href="mailto:eric@lennyscleaning.com" className="text-forest hover:text-forest-dark transition-colors">eric@lennyscleaning.com</a>.
                </p>
              </div>

              <div>
                <h2 className="font-display font-medium text-xl text-charcoal mb-3">10. Changes to this policy</h2>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                  We may update this privacy policy from time to time. We will notify you of any material changes by posting the updated policy on this page and updating the &ldquo;Last updated&rdquo; date. Your continued use of our services after any changes constitutes acceptance of the updated policy.
                </p>
              </div>

              <div className="border-t border-cream-dark pt-8">
                <p className="font-body text-sm text-charcoal-light">
                  Questions about this policy? Contact us at{' '}
                  <a href="mailto:eric@lennyscleaning.com" className="text-forest hover:text-forest-dark transition-colors">eric@lennyscleaning.com</a>{' '}
                  or call <a href="tel:+12536003355" className="text-forest hover:text-forest-dark transition-colors">(253) 600-3355</a>.
                </p>
              </div>

            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
