import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';

/* ─── SEO ─── */
export const metadata: Metadata = {
  title: "Join Our Team | Lenny's Cleaning — Tacoma, WA",
  description:
    "Earn $34-56/hr as an independent cleaning professional with Lenny's Cleaning in Tacoma. Keep 70-78% of every job. Set your own schedule. Apply today.",
  openGraph: {
    title: "Join Our Team | Lenny's Cleaning — Tacoma, WA",
    description:
      "Earn $34-56/hr as an independent cleaning professional with Lenny's Cleaning in Tacoma. Keep 70-78% of every job. Set your own schedule. Apply today.",
  },
};

/* ─── Data ─── */
const benefits = [
  {
    title: 'Earn $34–56/hr',
    body: 'Traditional cleaning companies pay $13–18/hr. We pay 2–3x that because our tech eliminates the overhead they spend on dispatchers, office managers, and call centers.',
  },
  {
    title: 'Keep 70–78% of every job',
    body: 'New operators keep 70%. Hit Preferred status and earn 75%. Reach Elite and keep 78%. Transparent, consistent, no hidden fees — you earn, we deposit every week.',
  },
  {
    title: 'Set your own schedule',
    body: 'Accept the jobs that work for you. Work mornings, afternoons, weekdays, weekends — whatever fits your life.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Apply online',
    body: "Fill out a quick application. We'll review your experience and run a background check.",
  },
  {
    num: '02',
    title: 'Get onboarded',
    body: "Complete our quality standards walkthrough and you're ready to accept jobs.",
  },
  {
    num: '03',
    title: 'Start earning',
    body: 'Accept bookings, do great work, get paid weekly. Build your client base and move up tiers for priority access.',
  },
];

const earnings = [
  { label: 'Customer pays', value: '$150' },
  { label: 'Your share (70%)', value: '$105' },
  { label: 'Estimated time', value: '2–2.5 hours' },
  { label: 'Your effective rate', value: '$42–52/hr' },
];

const requirements = [
  'Reliable transportation',
  'Cleaning experience (professional or personal)',
  'Smartphone for scheduling and updates',
  'Pass a background check',
  'Proof of identity and work authorization',
  'Your own basic cleaning supplies (we provide the checklist)',
];

const tiers = [
  { name: 'Onboarding', desc: 'First 5 jobs — learn the ropes' },
  { name: 'Standard', desc: 'Keep 70% — full access to bookings' },
  { name: 'Preferred', desc: 'Keep 75% — priority bookings and repeat clients' },
  { name: 'Elite', desc: 'Keep 78% — highest-value jobs and on-call premiums' },
];

const grainSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`;

/* ─── PAGE ─── */
export default function JoinOurTeamPage() {
  return (
    <>
      {/* ══════ HERO ══════ */}
      <header className="relative bg-forest overflow-hidden pt-[120px] pb-20 px-6">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: grainSvg }}
        />
        <div className="relative z-10 max-w-[800px] mx-auto text-center">
          <Reveal>
            <p className="font-body font-semibold text-[0.6875rem] uppercase tracking-[0.1em] text-warm-white/50 mb-3">
              JOIN OUR TEAM
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display font-semibold text-warm-white leading-[1.1] tracking-tight mb-5 text-[clamp(36px,5vw,58px)]">
              Earn what you&apos;re worth
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-[19px] text-warm-white/80 leading-relaxed max-w-[560px] mx-auto mb-9">
              Lenny&apos;s cleaning professionals earn $34–56/hr — 2–3x the industry average. Keep 70–78% of every job, set your own schedule, and work with a platform that actually has your back.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              Apply now
            </Link>
            <p className="font-body text-sm text-warm-white/50 mt-4">
              Takes less than 5 minutes
            </p>
          </Reveal>
        </div>
      </header>

      {/* ══════ WHY LENNY'S IS DIFFERENT ══════ */}
      <section className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">THE DIFFERENCE</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-14 text-[clamp(28px,4vw,44px)]">
              Why Lenny&apos;s is different
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
            {benefits.map((card, i) => (
              <Reveal key={card.title} delay={i * 100}>
                <div className="bg-cream rounded-md p-7 h-full">
                  <h3 className="font-display font-medium text-xl text-charcoal leading-tight mb-3">
                    {card.title}
                  </h3>
                  <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ HOW IT WORKS ══════ */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[1000px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">HOW IT WORKS</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-14 text-[clamp(28px,4vw,44px)]">
              Three steps to start earning
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 100}>
                <div className="text-center">
                  <span className="font-display font-semibold text-[40px] text-forest/20 leading-none block mb-3">
                    {step.num}
                  </span>
                  <h3 className="font-display font-medium text-xl text-charcoal leading-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-[15px] text-charcoal-light leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ EARNINGS BREAKDOWN ══════ */}
      <section className="py-24 px-6">
        <div className="max-w-[600px] mx-auto">
          <Reveal>
            <p className="overline text-center mb-3">EARNINGS</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-4 text-[clamp(28px,4vw,44px)]">
              See what you&apos;d earn
            </h2>
            <p className="font-body text-[17px] text-charcoal-light leading-relaxed text-center mb-12">
              Sample earnings for a 2BR/1BA standard clean:
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="bg-cream rounded-md overflow-hidden">
              {earnings.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex justify-between items-center px-7 py-[18px] ${
                    i < earnings.length - 1 ? 'border-b border-warm-white' : ''
                  } ${i === earnings.length - 1 ? 'bg-forest/[0.06]' : ''}`}
                >
                  <span className="font-body text-base text-charcoal">{row.label}</span>
                  <span className={`font-body text-lg font-semibold ${i === earnings.length - 1 ? 'text-forest' : 'text-charcoal'}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-sm text-gray-m text-center mt-5">
              Earnings vary by service type, home size, and condition.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════ REQUIREMENTS ══════ */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[600px] mx-auto">
          <Reveal>
            <p className="overline mb-3">REQUIREMENTS</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight mb-10 text-[clamp(28px,4vw,44px)]">
              What you need to get started
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <ul className="space-y-4">
              {requirements.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-forest shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="font-body text-[16px] text-charcoal-light leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ══════ TIER SYSTEM ══════ */}
      <section className="py-24 px-6">
        <div className="max-w-[700px] mx-auto">
          <Reveal>
            <p className="overline mb-3">OPERATOR TIERS</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight mb-4 text-[clamp(28px,4vw,44px)]">
              Grow with us
            </h2>
            <p className="font-body text-[17px] text-charcoal-light leading-relaxed mb-12">
              Our 4-tier system rewards consistency and quality. Start as a Standard operator, earn Preferred and Elite status with priority bookings, higher-value jobs, and on-call premiums.
            </p>
          </Reveal>
          <div className="flex flex-col sm:flex-row items-stretch gap-4">
            {tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 80}>
                <div className="flex-1 bg-cream rounded-md p-5 text-center relative">
                  {i < tiers.length - 1 && (
                    <svg className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-charcoal/20 z-10" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M2 1l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  <p className="font-display font-medium text-base text-charcoal mb-1">{tier.name}</p>
                  <p className="font-body text-[13px] text-charcoal-light leading-snug">{tier.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ BOTTOM CTA ══════ */}
      <section className="relative py-24 px-6 bg-forest overflow-hidden text-center">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: grainSvg }}
        />
        <div className="relative z-10 max-w-[600px] mx-auto">
          <Reveal>
            <h2 className="font-display font-medium text-warm-white leading-[1.15] mb-4 text-[clamp(28px,4vw,44px)]">
              Ready to earn what you&apos;re worth?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-lg text-warm-white/80 leading-relaxed mb-9">
              Join a growing team of cleaning professionals who are paid fairly and treated with respect.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link
              href="/contact"
              className="btn-primary text-base px-8 py-4"
            >
              Apply now
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
