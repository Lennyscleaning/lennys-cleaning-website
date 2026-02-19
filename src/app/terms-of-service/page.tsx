import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for Lenny's Cleaning. Read our terms for booking cleaning services, cancellation policy, and more.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <header className="bg-warm-white pt-[120px] pb-16 px-6">
        <div className="max-w-[700px] mx-auto">
          <Reveal>
            <p className="overline mb-3">LEGAL</p>
            <h1 className="font-display font-semibold text-charcoal leading-[1.1] tracking-tight mb-4 text-[clamp(36px,5vw,58px)]">
              Terms of service
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
                <h2 className="font-display font-medium text-xl text-charcoal mb-3">1. Overview</h2>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                  Lenny&apos;s Cleaning (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;the platform&rdquo;) operates a marketplace that connects customers with independent cleaning professionals (&ldquo;operators&rdquo;). By using our website at lennyscleaning.com or booking a cleaning service through us, you agree to these terms of service.
                </p>
              </div>

              <div>
                <h2 className="font-display font-medium text-xl text-charcoal mb-3">2. The platform</h2>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                  Lenny&apos;s Cleaning is a technology platform that facilitates connections between customers seeking cleaning services and independent cleaning professionals who provide those services. We handle booking, scheduling, payment processing, and quality assurance. The cleaning services themselves are performed by independent operators, not by Lenny&apos;s Cleaning employees.
                </p>
              </div>

              <div>
                <h2 className="font-display font-medium text-xl text-charcoal mb-3">3. Independent contractors</h2>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                  All cleaning professionals on our platform are independent contractors (1099). They are not employees of Lenny&apos;s Cleaning. Operators set their own availability, provide their own supplies, and are responsible for the quality of their work. Lenny&apos;s Cleaning provides quality standards, background checks, and a platform for booking and payments.
                </p>
              </div>

              <div>
                <h2 className="font-display font-medium text-xl text-charcoal mb-3">4. Booking and cancellation</h2>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed mb-3">
                  When you book a cleaning through our platform, you agree to the following cancellation policy:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 font-body text-[15px] text-charcoal-light leading-relaxed">
                  <li><strong>More than 24 hours before your appointment:</strong> free cancellation, full refund.</li>
                  <li><strong>Less than 24 hours before your appointment:</strong> a cancellation fee may apply to compensate the operator who reserved time for your booking.</li>
                  <li><strong>No-shows:</strong> if no one is available to provide access at the scheduled time, the full booking amount may be charged.</li>
                </ul>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed mt-3">
                  We understand things come up. If you need to reschedule, we&apos;ll always try to accommodate you at no charge when possible.
                </p>
              </div>

              <div>
                <h2 className="font-display font-medium text-xl text-charcoal mb-3">5. Payment</h2>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                  All payments are processed securely through Stripe. Payment is charged at the time of booking. You will see your exact flat-rate price before confirming your booking — no hidden fees or surprise charges. Prices may include adjustments based on home size, condition, and any selected add-on services, all of which are displayed transparently before you book.
                </p>
              </div>

              <div>
                <h2 className="font-display font-medium text-xl text-charcoal mb-3">6. Satisfaction guarantee</h2>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                  We stand behind the quality of every cleaning. If you&apos;re not satisfied with your service, contact us within 24 hours of your appointment and we will work to resolve the issue. This may include sending a professional back to address specific areas at no additional charge, issuing a partial credit, or providing a full refund at our discretion. Contact us at{' '}
                  <a href="mailto:eric@lennyscleaning.com" className="text-forest hover:text-forest-dark transition-colors">eric@lennyscleaning.com</a>{' '}
                  or <a href="tel:+12536003355" className="text-forest hover:text-forest-dark transition-colors">(253) 600-3355</a>.
                </p>
              </div>

              <div>
                <h2 className="font-display font-medium text-xl text-charcoal mb-3">7. Limitation of liability</h2>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                  Lenny&apos;s Cleaning acts as a marketplace connecting customers with independent cleaning professionals. To the fullest extent permitted by law, our liability for any claim arising from the use of our platform or services is limited to the amount you paid for the specific service giving rise to the claim. We are not liable for indirect, incidental, special, consequential, or punitive damages. Cleaning professionals carry their own liability for the services they perform.
                </p>
              </div>

              <div>
                <h2 className="font-display font-medium text-xl text-charcoal mb-3">8. Dispute resolution</h2>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                  If you have a dispute with Lenny&apos;s Cleaning, we encourage you to contact us first at{' '}
                  <a href="mailto:eric@lennyscleaning.com" className="text-forest hover:text-forest-dark transition-colors">eric@lennyscleaning.com</a>{' '}
                  so we can try to resolve it directly. If we are unable to resolve the dispute informally, any legal proceedings shall be conducted in the state or federal courts located in Pierce County, Washington.
                </p>
              </div>

              <div>
                <h2 className="font-display font-medium text-xl text-charcoal mb-3">9. Governing law</h2>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                  These terms of service are governed by and construed in accordance with the laws of the State of Washington, without regard to its conflict of law provisions.
                </p>
              </div>

              <div>
                <h2 className="font-display font-medium text-xl text-charcoal mb-3">10. Changes to these terms</h2>
                <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                  We may update these terms from time to time. We will notify you of any material changes by posting the updated terms on this page and updating the &ldquo;Last updated&rdquo; date. Your continued use of our services after any changes constitutes acceptance of the updated terms.
                </p>
              </div>

              <div className="border-t border-cream-dark pt-8">
                <p className="font-body text-sm text-charcoal-light">
                  Questions about these terms? Contact us at{' '}
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
