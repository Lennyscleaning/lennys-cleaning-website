import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import TrustBar from '@/components/TrustBar';
import FaqAccordion from '@/components/FaqAccordion';

/* ─── SEO ─── */
export const metadata: Metadata = {
  title: "Eco-Friendly House Cleaning",
  description:
    "Eco-friendly house cleaning in Tacoma with plant-based, non-toxic products. Safe for kids, pets, and the planet. Add green cleaning to any Lenny's booking for $10.",
  openGraph: {
    title: "Eco-Friendly House Cleaning | Lenny's Cleaning — Tacoma, WA",
    description:
      "Plant-based, non-toxic cleaning for your Tacoma home. Safe for families, pets, and the Pacific Northwest we love.",
    type: "website",
    url: "https://lennyscleaning.com/eco-friendly-cleaning-tacoma-wa",
  },
  alternates: { canonical: "https://lennyscleaning.com/eco-friendly-cleaning-tacoma-wa" },
};

/* ─── Data ─── */
const weUse = [
  "Plant-derived surfactants and solvents",
  "Biodegradable formulas that break down safely",
  "Essential oil-based scents (or fragrance-free)",
  "Reusable microfiber cloths and tools",
  "Products safe enough for food-contact surfaces",
];

const weSkip = [
  "Chlorine bleach and ammonia",
  "Synthetic fragrances and dyes",
  "Phthalates and parabens",
  "Petroleum-based solvents",
  "Volatile organic compounds (VOCs)",
];

const audiences = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    title: "Families with young children",
    desc: "Kids touch everything and put things in their mouths. Non-toxic products mean one less thing to worry about after the cleaning is done.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .137 1.217 1.5 3 2.5 4.5 1.086 1.628 3.268 3.5 5 3.5s3.914-1.872 5-3.5c1-1.5 2.363-3.283 2.5-4.5.113-.994-1.177-6.53-4-7C11.577 2.679 10 3.782 10 5.172z" />
      </svg>
    ),
    title: "Homes with pets",
    desc: "Dogs and cats walk on freshly cleaned floors and groom themselves. Plant-based products are safe for paws, fur, and the occasional curious lick.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Allergy and sensitivity concerns",
    desc: "Chemical fragrances and harsh cleaners can trigger respiratory issues and skin reactions. Our eco products are formulated to minimize irritation and airborne residue.",
  },
];

const promises = [
  {
    icon: (
      <svg className="w-8 h-8 text-warm-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L7 18" /><path d="M17 8l4-1-1-4" />
      </svg>
    ),
    title: "Plant-based formulas",
    desc: "Derived from coconut, corn, and other renewable sources",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-warm-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    title: "Biodegradable",
    desc: "Breaks down safely — nothing harmful down the drain",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-warm-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Safe for everyone",
    desc: "Kids, pets, and people with sensitivities",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-warm-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: "Same thorough clean",
    desc: "Green products, zero compromise on results",
  },
];

const faqs = [
  {
    question: "Do eco-friendly products clean as well as conventional ones?",
    answer: "Yes. Modern plant-based cleaning products have come a long way. They handle grease, soap scum, and everyday grime effectively. For extremely heavy buildup — think years of oven grease — conventional products may have an edge, but for regular and recurring cleaning, the results are equal.",
  },
  {
    question: "What brands do you use?",
    answer: "We use a curated selection of professional-grade, plant-based products. The specific brands may vary as we evaluate options, but every product we use meets our standards for effectiveness, safety, and biodegradability. If you have specific product preferences or allergies, let us know when you book.",
  },
  {
    question: "Can I add eco products to a recurring plan?",
    answer: "Yes. You can add green products to every visit on your recurring plan, or just to individual visits as you prefer. The $10 charge applies per visit. Learn more about recurring plans on our recurring cleaning page.",
  },
  {
    question: "Is the $10 charge per room or per visit?",
    answer: "Per visit. The flat $10 covers eco-friendly products for your entire home, regardless of how many rooms are included in your cleaning. It covers the higher cost of sourcing quality plant-based products.",
  },
  {
    question: "Can I request fragrance-free products?",
    answer: "Yes. When you add eco-friendly products during booking, you can note a preference for fragrance-free options. Our specialists carry both essential oil-scented and unscented alternatives. Add your preference in the special instructions field.",
  },
];

const steps = [
  { num: "1", title: "Book any cleaning", desc: "Standard, deep, or move-in/out — eco-friendly products work with every service type." },
  { num: "2", title: "Select eco products", desc: 'Toggle "Green / eco-friendly products" on the add-ons screen. It\'s $10 flat — same price regardless of home size.' },
  { num: "3", title: "Enjoy the clean", desc: "Your specialist arrives with the full green product kit. Same thorough clean, different products." },
];

/* ─── PAGE ─── */
export default function EcoFriendlyCleaningPage() {
  return (
    <>
      {/* ══════ HERO ══════ */}
      <header className="bg-warm-white pt-[120px] pb-20 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="max-w-[540px]">
            <Reveal>
              <p className="overline mb-3">ECO-FRIENDLY CLEANING</p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="font-display font-semibold text-charcoal leading-[1.1] tracking-tight mb-5 text-[clamp(34px,4.5vw,52px)]">
                Eco-friendly house cleaning in Tacoma — safe for your home and the planet
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="font-body text-[clamp(16px,1.8vw,18px)] text-charcoal-light leading-relaxed mb-8">
                Plant-based, non-toxic products that clean thoroughly without the chemical residue. Add green cleaning to any Lenny&apos;s booking — because a clean home shouldn&apos;t come at the environment&apos;s expense.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/book" className="btn-primary text-base px-8 py-4">
                  Book with eco products
                </Link>
                <span className="inline-flex items-center gap-2 text-[15px] font-medium text-gray-m">
                  Add to any booking for just <strong className="text-forest font-semibold">$10</strong>
                </span>
              </div>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <div className="flex justify-center items-center">
              <div className="w-[360px] h-[360px] rounded-full bg-gradient-to-br from-forest/[0.06] to-forest/[0.12] flex flex-col items-center justify-center relative">
                <div className="absolute inset-4 rounded-full border-[1.5px] border-dashed border-forest/20" />
                <svg className="w-20 h-20 text-forest mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L7 18" />
                  <path d="M17 8c-3 1-5.56 3.06-6 7" />
                  <path d="M20.59 7.41A12.35 12.35 0 003 4l-.36.95c3.45 3.43 5.28 8.36 4.36 13.05" />
                  <path d="M17 8l4-1-1-4" />
                </svg>
                <div className="font-display font-medium text-xl text-forest text-center leading-snug">
                  Plant-based.<br />Non-toxic.<br />Effective.
                </div>
                <div className="mt-2 font-body font-semibold text-sm text-forest-light tracking-wide">
                  +$10 per booking
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ══════ TRUST BAR ══════ */}
      <TrustBar />

      {/* ══════ WHAT WE USE vs. WHAT WE DON'T ══════ */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="overline mb-3">THE PRODUCTS</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight mb-4 text-[clamp(28px,4vw,44px)]">
              What goes into your home matters
            </h2>
            <p className="font-body text-[17px] text-charcoal-light leading-relaxed max-w-[640px] mb-12">
              Our eco-friendly option replaces conventional cleaning chemicals with plant-derived, biodegradable alternatives that are tough on grime and gentle on everything else.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Positive card */}
              <div className="bg-warm-white rounded-2xl p-9 border-[1.5px] border-forest/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-forest/10 text-forest flex items-center justify-center">
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" />
                    </svg>
                  </div>
                  <h3 className="font-display font-medium text-[22px]">What we use</h3>
                </div>
                <ul className="list-none p-0 m-0 space-y-3.5">
                  {weUse.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] text-charcoal-light leading-relaxed">
                      <svg className="w-[18px] h-[18px] shrink-0 mt-0.5 text-forest" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Negative card */}
              <div className="bg-warm-white rounded-2xl p-9 border-[1.5px] border-error/15">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-error/[0.08] text-error flex items-center justify-center">
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.7 7.3a1 1 0 00-1.4 1.4L8.6 10l-1.3 1.3a1 1 0 101.4 1.4L10 11.4l1.3 1.3a1 1 0 001.4-1.4L11.4 10l1.3-1.3a1 1 0 00-1.4-1.4L10 8.6 8.7 7.3z" />
                    </svg>
                  </div>
                  <h3 className="font-display font-medium text-[22px]">What we skip</h3>
                </div>
                <ul className="list-none p-0 m-0 space-y-3.5">
                  {weSkip.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] text-charcoal-light leading-relaxed">
                      <svg className="w-[18px] h-[18px] shrink-0 mt-0.5 text-error" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.7 7.3a1 1 0 00-1.4 1.4L8.6 10l-1.3 1.3a1 1 0 101.4 1.4L10 11.4l1.3 1.3a1 1 0 001.4-1.4L11.4 10l1.3-1.3a1 1 0 00-1.4-1.4L10 8.6 8.7 7.3z" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ WHO IT'S FOR ══════ */}
      <section className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="overline mb-3">BUILT FOR REAL LIFE</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight mb-4 text-[clamp(28px,4vw,44px)]">
              Eco-friendly cleaning is especially right for
            </h2>
            <p className="font-body text-[17px] text-charcoal-light leading-relaxed max-w-[640px] mb-12">
              Green products work great in any home — but they&apos;re a particularly smart choice if any of these apply to yours.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {audiences.map((a, i) => (
                <div
                  key={i}
                  className="bg-warm-white border-[1.5px] border-cream-dark rounded-[10px] p-8"
                >
                  <div className="w-12 h-12 rounded-md bg-forest/[0.08] flex items-center justify-center mb-5 text-forest">
                    {a.icon}
                  </div>
                  <h3 className="font-display font-medium text-xl leading-tight mb-2">{a.title}</h3>
                  <p className="font-body text-[15px] text-charcoal-light leading-relaxed m-0">{a.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ HOW TO ADD IT ══════ */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[700px] mx-auto text-center">
          <Reveal>
            <p className="overline mb-3">SIMPLE TO ADD</p>
            <h2 className="font-display font-medium text-charcoal leading-[1.15] tracking-tight text-center mb-12 text-[clamp(28px,4vw,44px)]">
              Green cleaning in three steps
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex flex-wrap items-start justify-center gap-8">
              {steps.map((step, i) => (
                <div key={i} className="flex-1 min-w-[160px] text-center">
                  <div className="w-12 h-12 rounded-full bg-forest text-warm-white inline-flex items-center justify-center font-display font-semibold text-xl mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-display font-medium text-lg mb-1.5">{step.title}</h3>
                  <p className="font-body text-sm text-charcoal-light leading-relaxed m-0">{step.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ OUR PROMISE ══════ */}
      <section className="bg-forest py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="overline text-terra mb-3">OUR PROMISE</p>
            <h2 className="font-display font-medium text-warm-white leading-[1.15] tracking-tight mb-4 text-[clamp(28px,4vw,44px)]">
              Clean home, clear conscience
            </h2>
            <p className="font-body text-[17px] text-warm-white/80 leading-relaxed max-w-[640px] mb-12">
              We chose Tacoma for a reason. The Pacific Northwest is home — and we clean it like we mean it.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {promises.map((p, i) => (
                <div key={i} className="text-center p-5">
                  <div className="mb-3">{p.icon}</div>
                  <h4 className="font-display font-medium text-[17px] text-warm-white mb-1">{p.title}</h4>
                  <p className="font-body text-[13px] text-warm-white/60 leading-relaxed m-0">{p.desc}</p>
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
              Eco-friendly cleaning FAQ
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* ══════ BOTTOM CTA ══════ */}
      <section className="bg-forest py-24 px-6 text-center">
        <div className="max-w-[600px] mx-auto">
          <Reveal>
            <h2 className="font-display font-medium text-warm-white leading-[1.15] mb-4 text-[clamp(28px,4vw,44px)]">
              A clean home that&apos;s kind to everything in it
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-lg text-warm-white/80 leading-relaxed mb-9">
              Book with eco-friendly products and enjoy a thorough clean with zero compromise — for $10 more per visit.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-8 py-4 bg-warm-white text-forest font-body font-semibold text-base tracking-wide rounded-sm hover:shadow-hover hover:-translate-y-px transition-all duration-200"
            >
              Book a cleaning
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
