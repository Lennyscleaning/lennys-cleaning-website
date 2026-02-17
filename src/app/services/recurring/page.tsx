'use client';

import { useState } from 'react';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import TrustBar from '@/components/TrustBar';
import FaqAccordion from '@/components/FaqAccordion';

// Metadata should be exported from a layout.tsx or a separate metadata file
// since this is a client component ('use client').
// title: "Recurring House Cleaning | Lenny's Cleaning — Tacoma, WA"
// description: "Save up to 30% with recurring house cleaning in Tacoma. Weekly, biweekly, or monthly plans with the same vetted professional every visit. Cancel or change anytime."

/* ─── Icons ─── */
const arrowIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

const checkCircle = (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px] text-forest shrink-0 mt-0.5">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" />
  </svg>
);

/* ─── Savings Calculator Data ─── */
const stdPrices: Record<string, Record<number, number>> = {
  onetime:  { 1: 125, 2: 155, 3: 165, 4: 220, 5: 275 },
  biweekly: { 1: 100, 2: 124, 3: 157, 4: 176, 5: 220 },
  weekly:   { 1: 88,  2: 109, 3: 138, 4: 155, 5: 193 },
  monthly:  { 1: 113, 2: 140, 3: 149, 4: 198, 5: 248 },
};
const visitsPerYear: Record<string, number> = { weekly: 52, biweekly: 26, monthly: 12 };

/* ─── FAQ Data ─── */
const faqs = [
  {
    question: 'Is there a contract or commitment?',
    answer:
      "No contract. You can cancel your recurring plan at any time with no penalties. Individual visits require 24 hours' notice to avoid a late cancellation fee, but the plan itself has no minimum commitment.",
  },
  {
    question: 'Can I request the same professional every time?',
    answer:
      "That's the plan. Lenny's prioritizes matching recurring customers with the same specialist every visit. Consistency matters — both for your comfort and for the quality of the clean. If your regular specialist is unavailable, we'll let you know in advance.",
  },
  {
    question: "What's the difference between the first visit and recurring visits?",
    answer:
      "Your first visit is an Initial Clean — slightly more thorough since we're seeing your home for the first time. This establishes a baseline. After that, your recurring rate drops because each subsequent clean maintains the standard rather than building from scratch.",
  },
  {
    question: 'How do I skip or reschedule a visit?',
    answer:
      "You can skip or reschedule via text or through your booking dashboard. Free with 24+ hours' notice. Changes made within 24 hours of your scheduled cleaning may be subject to a late change fee.",
  },
  {
    question: 'Can I add extras to individual visits?',
    answer:
      "Yes. You can add any of our add-on services — inside oven, inside fridge, baseboards, and more — to a specific visit without changing your recurring plan. See all add-ons and prices on our pricing page.",
  },
];

/* ─── Benefits Data ─── */
const benefits = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Your specialist knows your home',
    desc: 'The same professional every visit means they learn your preferences, remember your notes, and clean more efficiently over time.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'Less buildup, faster cleans',
    desc: 'Regular visits prevent grime from accumulating. Each clean takes less time and produces better results because your home never falls behind.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    title: "A home that's always ready",
    desc: 'No more scrambling before guests arrive or dreading the weekend chore list. Your home stays guest-ready on autopilot.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    title: 'Priority scheduling',
    desc: "Recurring customers get first pick of time windows. Your preferred day and time stays reserved — no competing with one-time bookings.",
  },
];

/* ─── Steps Data ─── */
const steps = [
  {
    num: '1',
    title: 'Book your first clean',
    desc: "Choose your service, home size, and preferred frequency. You'll see your recurring rate and your Initial Clean price — both upfront, before you commit.",
  },
  {
    num: '2',
    title: 'We match you with a specialist',
    desc: "Lenny's pairs you with a cleaning professional based on your home's needs and your location. After your first visit, they're your regular specialist.",
  },
  {
    num: '3',
    title: 'Your plan runs on autopilot',
    desc: "Your specialist arrives on your scheduled day, cleans to our standards, and payment processes automatically. Skip, reschedule, or cancel a visit anytime with 24 hours' notice.",
  },
];

/* ─── Flexibility Cards Data ─── */
const flexCards = [
  {
    title: 'Skip a visit',
    desc: "Going on vacation or just don't need it this week? Skip any visit with 24 hours' notice — no fees, no hassle.",
  },
  {
    title: 'Reschedule freely',
    desc: "Move your cleaning to a different day the same week. Free with 24+ hours' notice. Changes within 24 hours may carry a small fee.",
  },
  {
    title: 'Change your frequency',
    desc: 'Switch from weekly to biweekly, or biweekly to monthly — whenever you want. Your per-visit rate adjusts automatically.',
  },
];

/* ─── MAIN PAGE ─── */
export default function RecurringCleaningPage() {
  const [bedrooms, setBedrooms] = useState(3);
  const [freq, setFreq] = useState('biweekly');

  const perVisit = stdPrices[freq][bedrooms];
  const oneTimeRate = stdPrices.onetime[bedrooms];
  const visits = visitsPerYear[freq];
  const annual = perVisit * visits;
  const wouldBe = oneTimeRate * visits;
  const saved = wouldBe - annual;

  return (
    <>
      {/* ══════ HERO ══════ */}
      <header className="bg-warm-white pt-[120px] pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_20%,rgba(45,90,61,0.04)_0%,transparent_60%)]" />
        <div className="max-w-[780px] mx-auto text-center relative">
          <Reveal>
            <p className="overline mb-3">RECURRING SERVICE</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display font-semibold text-charcoal leading-[1.1] tracking-tight mb-5 text-[clamp(34px,5vw,56px)]">
              Recurring house cleaning in Tacoma — save more, stress less
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-charcoal-light leading-relaxed max-w-[560px] mx-auto mb-8 text-[clamp(16px,2vw,19px)]">
              The same vetted professional, a consistent clean every visit, and savings up to 30%. Your home stays ready without you having to think about it.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <Link href="/book" className="btn-primary text-base px-8 py-4 inline-flex items-center gap-2">
              Start your recurring plan
              {arrowIcon}
            </Link>
          </Reveal>
        </div>
      </header>

      {/* ══════ TRUST BAR ══════ */}
      <TrustBar />

      {/* ══════ PLAN CARDS ══════ */}
      <section className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">CHOOSE YOUR PLAN</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-4 text-[clamp(28px,4vw,44px)]">
              Three frequencies, one standard of care
            </h2>
            <p className="font-body text-[17px] text-charcoal-light leading-relaxed text-center max-w-[640px] mx-auto mb-12">
              Every plan includes the same thorough clean by the same specialist. The only difference is how often — and how much you save.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
              {/* Monthly */}
              <div className="bg-warm-white border-2 border-cream-dark rounded-2xl p-9 flex flex-col transition-all duration-300">
                <div className="font-display font-medium text-2xl text-charcoal mb-1">Monthly</div>
                <div className="text-sm text-gray-m mb-6">Once every 4 weeks</div>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="font-display font-semibold text-[42px] text-forest tracking-tight leading-none">$157</span>
                  <span className="text-[15px] text-gray-m font-medium">/visit</span>
                </div>
                <div className="text-[13px] text-gray-m mb-6 line-through">$165 one-time</div>
                <div className="inline-block bg-forest/10 text-forest text-[13px] font-semibold px-2.5 py-1 rounded-full mb-7 w-fit">Save ~3–5% per visit</div>
                <ul className="list-none flex-1 mb-7 p-0 space-y-3">
                  <li className="flex items-start gap-2.5 text-[15px] text-charcoal-light leading-relaxed">{checkCircle}Same specialist each visit</li>
                  <li className="flex items-start gap-2.5 text-[15px] text-charcoal-light leading-relaxed">{checkCircle}Full standard clean included</li>
                  <li className="flex items-start gap-2.5 text-[15px] text-charcoal-light leading-relaxed">{checkCircle}Skip or reschedule anytime</li>
                  <li className="flex items-start gap-2.5 text-[15px] text-charcoal-light leading-relaxed">{checkCircle}No commitment — cancel anytime</li>
                </ul>
                <Link href="/book" className="btn-outline block text-center py-3.5 px-6 text-[15px]">
                  Choose monthly
                </Link>
              </div>

              {/* Biweekly (Featured) */}
              <div className="bg-warm-white border-2 border-forest rounded-2xl p-9 relative flex flex-col shadow-lg transition-all duration-300">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-forest text-warm-white text-[11px] font-bold tracking-wider uppercase px-4 py-1 rounded-full whitespace-nowrap">
                  Most popular
                </div>
                <div className="font-display font-medium text-2xl text-charcoal mb-1">Biweekly</div>
                <div className="text-sm text-gray-m mb-6">Every 2 weeks</div>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="font-display font-semibold text-[42px] text-forest tracking-tight leading-none">$152</span>
                  <span className="text-[15px] text-gray-m font-medium">/visit</span>
                </div>
                <div className="text-[13px] text-gray-m mb-6 line-through">$165 one-time</div>
                <div className="inline-block bg-forest/10 text-forest text-[13px] font-semibold px-2.5 py-1 rounded-full mb-7 w-fit">Save ~5–8% per visit</div>
                <ul className="list-none flex-1 mb-7 p-0 space-y-3">
                  <li className="flex items-start gap-2.5 text-[15px] text-charcoal-light leading-relaxed">{checkCircle}Same specialist each visit</li>
                  <li className="flex items-start gap-2.5 text-[15px] text-charcoal-light leading-relaxed">{checkCircle}Full standard clean included</li>
                  <li className="flex items-start gap-2.5 text-[15px] text-charcoal-light leading-relaxed">{checkCircle}Priority scheduling windows</li>
                  <li className="flex items-start gap-2.5 text-[15px] text-charcoal-light leading-relaxed">{checkCircle}No commitment — cancel anytime</li>
                </ul>
                <Link href="/book" className="btn-primary block text-center py-3.5 px-6 text-[15px]">
                  Choose biweekly
                </Link>
              </div>

              {/* Weekly */}
              <div className="bg-warm-white border-2 border-cream-dark rounded-2xl p-9 flex flex-col transition-all duration-300">
                <div className="font-display font-medium text-2xl text-charcoal mb-1">Weekly</div>
                <div className="text-sm text-gray-m mb-6">Every week</div>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="font-display font-semibold text-[42px] text-forest tracking-tight leading-none">$140</span>
                  <span className="text-[15px] text-gray-m font-medium">/visit</span>
                </div>
                <div className="text-[13px] text-gray-m mb-6 line-through">$165 one-time</div>
                <div className="inline-block bg-forest/10 text-forest text-[13px] font-semibold px-2.5 py-1 rounded-full mb-7 w-fit">Save ~15% per visit</div>
                <ul className="list-none flex-1 mb-7 p-0 space-y-3">
                  <li className="flex items-start gap-2.5 text-[15px] text-charcoal-light leading-relaxed">{checkCircle}Same specialist each visit</li>
                  <li className="flex items-start gap-2.5 text-[15px] text-charcoal-light leading-relaxed">{checkCircle}Full standard clean included</li>
                  <li className="flex items-start gap-2.5 text-[15px] text-charcoal-light leading-relaxed">{checkCircle}Priority scheduling windows</li>
                  <li className="flex items-start gap-2.5 text-[15px] text-charcoal-light leading-relaxed">{checkCircle}Lowest per-visit rate</li>
                </ul>
                <Link href="/book" className="btn-outline block text-center py-3.5 px-6 text-[15px]">
                  Choose weekly
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="font-body text-sm text-gray-m text-center max-w-[600px] mx-auto leading-relaxed">
              Prices shown are for a 3BR/2BA home — Tacoma&apos;s most common configuration. Your exact rate depends on home size and condition.{' '}
              <Link href="/pricing" className="text-forest underline">
                See all prices
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════ ANNUAL SAVINGS CALCULATOR ══════ */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">THE MATH WORKS OUT</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-4 text-[clamp(28px,4vw,44px)]">
              See how much recurring saves you
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-warm-white border-2 border-cream-dark rounded-2xl max-w-[700px] mx-auto mt-12 overflow-hidden">
              <div className="px-9 pt-8">
                <h3 className="font-display font-medium text-2xl mb-1">Annual savings calculator</h3>
                <p className="text-[15px] text-charcoal-light mb-6">Select your home size and preferred frequency.</p>
              </div>
              <div className="px-9 flex gap-4 mb-7 flex-wrap">
                <div className="flex-1 min-w-[180px]">
                  <label htmlFor="sav-bedrooms" className="block text-[13px] font-semibold text-charcoal-light mb-1.5">
                    Bedrooms
                  </label>
                  <select
                    id="sav-bedrooms"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(parseInt(e.target.value))}
                    className="w-full py-3 px-4 border-[1.5px] border-cream-dark rounded-md font-body text-[15px] text-charcoal bg-warm-white cursor-pointer"
                  >
                    <option value={1}>1 bedroom</option>
                    <option value={2}>2 bedrooms</option>
                    <option value={3}>3 bedrooms</option>
                    <option value={4}>4 bedrooms</option>
                    <option value={5}>5 bedrooms</option>
                  </select>
                </div>
                <div className="flex-1 min-w-[180px]">
                  <label htmlFor="sav-freq" className="block text-[13px] font-semibold text-charcoal-light mb-1.5">
                    Frequency
                  </label>
                  <select
                    id="sav-freq"
                    value={freq}
                    onChange={(e) => setFreq(e.target.value)}
                    className="w-full py-3 px-4 border-[1.5px] border-cream-dark rounded-md font-body text-[15px] text-charcoal bg-warm-white cursor-pointer"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Biweekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
              <div className="bg-cream px-9 py-7 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="block text-xs font-semibold tracking-wider uppercase text-gray-m mb-1.5">Per visit</div>
                  <div className="font-display font-semibold text-[28px] text-forest tracking-tight">${perVisit}</div>
                </div>
                <div>
                  <div className="block text-xs font-semibold tracking-wider uppercase text-gray-m mb-1.5">Annual cost</div>
                  <div className="font-display font-semibold text-[28px] text-forest tracking-tight">${annual.toLocaleString()}</div>
                </div>
                <div>
                  <div className="block text-xs font-semibold tracking-wider uppercase text-gray-m mb-1.5">You save yearly</div>
                  <div className="font-display font-semibold text-[28px] text-forest tracking-tight">${saved.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ BENEFITS ══════ */}
      <section className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">WHY RECURRING</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-4 text-[clamp(28px,4vw,44px)]">
              More than just a discount
            </h2>
            <p className="font-body text-[17px] text-charcoal-light leading-relaxed text-center max-w-[640px] mx-auto mb-12">
              Recurring cleaning isn&apos;t just about saving money — it&apos;s about the consistency that comes from the same professional who knows your home.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-5">
                  <div className="w-[52px] h-[52px] rounded-[10px] bg-forest/[0.08] flex items-center justify-center shrink-0 text-forest">
                    {b.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-medium text-xl text-charcoal mb-1.5 leading-snug">{b.title}</h3>
                    <p className="font-body text-[15px] text-charcoal-light leading-relaxed m-0">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ HOW RECURRING WORKS ══════ */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">HOW IT WORKS</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-4 text-[clamp(28px,4vw,44px)]">
              Getting started takes three minutes
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="max-w-[640px] mx-auto mt-12">
              {steps.map((step, i) => (
                <div key={i} className={`flex gap-6 relative ${i < steps.length - 1 ? 'pb-10' : ''}`}>
                  {i < steps.length - 1 && (
                    <div className="absolute left-[23px] top-[52px] bottom-0 w-0.5 bg-cream-dark" />
                  )}
                  <div className="w-12 h-12 rounded-full bg-forest text-warm-white flex items-center justify-center font-display font-semibold text-xl shrink-0 relative z-[1]">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-display font-medium text-[22px] mb-1.5 mt-2">{step.title}</h3>
                    <p className="font-body text-[15px] text-charcoal-light leading-relaxed m-0">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ FLEXIBILITY ══════ */}
      <section className="bg-forest py-24 px-6 text-warm-white">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="overline text-terra mb-3">BUILT TO FLEX</p>
            <h2 className="font-display font-medium text-warm-white leading-[1.15] tracking-tight mb-4 text-[clamp(28px,4vw,44px)]">
              Plans that work around your life
            </h2>
            <p className="font-body text-[17px] text-warm-white/80 leading-relaxed max-w-[640px] mb-12">
              Recurring doesn&apos;t mean rigid. We built every plan with real life in mind.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {flexCards.map((card, i) => (
                <div
                  key={i}
                  className="bg-warm-white/[0.08] border border-warm-white/15 rounded-[10px] p-7 transition-all duration-300"
                >
                  <h3 className="font-display font-medium text-xl text-warm-white mb-2">{card.title}</h3>
                  <p className="font-body text-[15px] text-warm-white/75 leading-relaxed m-0">{card.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ FAQ ══════ */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[700px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">COMMON QUESTIONS</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-12 text-[clamp(28px,4vw,44px)]">
              Recurring cleaning FAQ
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* ══════ FINAL CTA ══════ */}
      <section className="bg-forest py-24 px-6 text-center">
        <div className="max-w-[600px] mx-auto">
          <Reveal>
            <h2 className="font-display font-medium text-warm-white leading-[1.15] mb-4 text-[clamp(28px,4vw,44px)]">
              Your home, consistently clean
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-lg text-warm-white/80 leading-relaxed max-w-[500px] mx-auto mb-9">
              Start a recurring plan today and let your home stay one step ahead — without you lifting a finger.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-warm-white text-forest font-body font-semibold text-base tracking-wide rounded-sm hover:shadow-hover hover:-translate-y-px transition-all duration-200"
            >
              Book a cleaning
              {arrowIcon}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
