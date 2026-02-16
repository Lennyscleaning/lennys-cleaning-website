import Link from "next/link";
import Reveal from "@/components/Reveal";
import TrustBar from "@/components/TrustBar";
import FaqAccordion from "@/components/FaqAccordion";
import {
  tokens,
  fonts,
  sectionPad,
  sectionPadCream,
  h2Style,
  bodyStyle,
  overlineStyle,
} from "@/components/tokens";

/* ─── Metadata ─── */
export const metadata = {
  title: "Eco-Friendly House Cleaning | Lenny's Cleaning — Tacoma, WA",
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

/* ─── Icons ─── */
const arrowIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

const checkCircleFill = (
  <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 18, height: 18, flexShrink: 0, marginTop: 2 }}>
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" />
  </svg>
);

const xCircleFill = (
  <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 18, height: 18, flexShrink: 0, marginTop: 2 }}>
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.7 7.3a1 1 0 00-1.4 1.4L8.6 10l-1.3 1.3a1 1 0 101.4 1.4L10 11.4l1.3 1.3a1 1 0 001.4-1.4L11.4 10l1.3-1.3a1 1 0 00-1.4-1.4L10 8.6 8.7 7.3z" />
  </svg>
);

const stepArrowIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ─── CTA Button Styles ─── */
const ctaPrimary: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  background: tokens.terracotta,
  color: tokens.warmWhite,
  padding: "14px 32px",
  borderRadius: "6px",
  fontFamily: fonts.body,
  fontWeight: 600,
  fontSize: "16px",
  textDecoration: "none",
  letterSpacing: "0.03em",
  transition: "all 200ms cubic-bezier(0.16,1,0.3,1)",
};

const ctaWhite: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  background: tokens.warmWhite,
  color: tokens.forestGreen,
  padding: "14px 32px",
  borderRadius: "6px",
  fontFamily: fonts.body,
  fontWeight: 600,
  fontSize: "16px",
  textDecoration: "none",
  letterSpacing: "0.03em",
  transition: "all 200ms cubic-bezier(0.16,1,0.3,1)",
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
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    title: "Families with young children",
    desc: "Kids touch everything and put things in their mouths. Non-toxic products mean one less thing to worry about after the cleaning is done.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .137 1.217 1.5 3 2.5 4.5 1.086 1.628 3.268 3.5 5 3.5s3.914-1.872 5-3.5c1-1.5 2.363-3.283 2.5-4.5.113-.994-1.177-6.53-4-7C11.577 2.679 10 3.782 10 5.172z" />
      </svg>
    ),
    title: "Homes with pets",
    desc: "Dogs and cats walk on freshly cleaned floors and groom themselves. Plant-based products are safe for paws, fur, and the occasional curious lick.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 32, height: 32, color: "rgba(253,250,246,0.6)" }}>
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L7 18" /><path d="M17 8l4-1-1-4" />
      </svg>
    ),
    title: "Plant-based formulas",
    desc: "Derived from coconut, corn, and other renewable sources",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 32, height: 32, color: "rgba(253,250,246,0.6)" }}>
        <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    title: "Biodegradable",
    desc: "Breaks down safely — nothing harmful down the drain",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 32, height: 32, color: "rgba(253,250,246,0.6)" }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Safe for everyone",
    desc: "Kids, pets, and people with sensitivities",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 32, height: 32, color: "rgba(253,250,246,0.6)" }}>
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: "Same thorough clean",
    desc: "Green products, zero compromise on results",
  },
];

const faqs = [
  {
    q: "Do eco-friendly products clean as well as conventional ones?",
    a: "Yes. Modern plant-based cleaning products have come a long way. They handle grease, soap scum, and everyday grime effectively. For extremely heavy buildup — think years of oven grease — conventional products may have an edge, but for regular and recurring cleaning, the results are equal.",
  },
  {
    q: "What brands do you use?",
    a: "We use a curated selection of professional-grade, plant-based products. The specific brands may vary as we evaluate options, but every product we use meets our standards for effectiveness, safety, and biodegradability. If you have specific product preferences or allergies, let us know when you book.",
  },
  {
    q: "Can I add eco products to a recurring plan?",
    a: "recurring-link" as const,
  },
  {
    q: "Is the $10 charge per room or per visit?",
    a: "Per visit. The flat $10 covers eco-friendly products for your entire home, regardless of how many rooms are included in your cleaning. It covers the higher cost of sourcing quality plant-based products.",
  },
  {
    q: "Can I request fragrance-free products?",
    a: "Yes. When you add eco-friendly products during booking, you can note a preference for fragrance-free options. Our specialists carry both essential oil-scented and unscented alternatives. Add your preference in the special instructions field.",
  },
];

/* ─── MAIN PAGE ─── */
export default function EcoFriendlyCleaningPage() {
  return (
    <div style={{ background: tokens.warmWhite, minHeight: "100vh" }}>
      {/* ══════ HERO ══════ */}
      <header style={{ padding: "80px 24px 72px", position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 20% 30%, rgba(45,90,61,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 60%, rgba(58,115,80,0.04) 0%, transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(196,112,75,0.02) 0%, transparent 40%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div style={{ maxWidth: "540px" }}>
            <Reveal>
              <p style={overlineStyle}>Eco-friendly cleaning</p>
            </Reveal>
            <Reveal delay={100}>
              <h1
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 600,
                  fontSize: "clamp(34px, 4.5vw, 52px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginBottom: "20px",
                  color: tokens.charcoal,
                }}
              >
                Eco-friendly house cleaning in Tacoma — safe for your home and the planet
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p style={{ ...bodyStyle, fontSize: "clamp(16px, 1.8vw, 18px)", marginBottom: "32px" }}>
                Plant-based, non-toxic products that clean thoroughly without the chemical residue. Add green cleaning to any Lenny&apos;s booking — because a clean home shouldn&apos;t come at the environment&apos;s expense.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div>
                <Link href="/book" style={ctaPrimary}>
                  Book with eco products
                  {arrowIcon}
                </Link>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    marginLeft: "16px",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: tokens.grayMid,
                  }}
                >
                  Add to any booking for just <strong style={{ color: tokens.forestGreen, fontWeight: 600 }}>$10</strong>
                </span>
              </div>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div
                style={{
                  width: "360px",
                  height: "360px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(45,90,61,0.06) 0%, rgba(58,115,80,0.12) 100%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: "16px",
                    borderRadius: "50%",
                    border: "1.5px dashed rgba(45,90,61,0.2)",
                  }}
                />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 80, height: 80, color: tokens.forestGreen, marginBottom: 16 }}>
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L7 18" />
                  <path d="M17 8c-3 1-5.56 3.06-6 7" />
                  <path d="M20.59 7.41A12.35 12.35 0 003 4l-.36.95c3.45 3.43 5.28 8.36 4.36 13.05" />
                  <path d="M17 8l4-1-1-4" />
                </svg>
                <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: "20px", color: tokens.forestGreen, textAlign: "center", lineHeight: 1.3 }}>
                  Plant-based.<br />Non-toxic.<br />Effective.
                </div>
                <div style={{ marginTop: "8px", fontFamily: fonts.body, fontWeight: 600, fontSize: "14px", color: tokens.forestGreenLight, letterSpacing: "0.04em" }}>
                  +$10 per booking
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ══════ TRUST BAR ══════ */}
      <Reveal>
        <TrustBar />
      </Reveal>

      {/* ══════ WHAT WE USE vs. WHAT WE DON'T ══════ */}
      <section style={sectionPadCream}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <p style={overlineStyle}>The products</p>
            <h2 style={{ ...h2Style, marginBottom: "16px" }}>What goes into your home matters</h2>
            <p style={{ ...bodyStyle, maxWidth: "640px", marginBottom: "48px" }}>
              Our eco-friendly option replaces conventional cleaning chemicals with plant-derived, biodegradable alternatives that are tough on grime and gentle on everything else.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
              {/* Positive card */}
              <div
                style={{
                  background: tokens.warmWhite,
                  borderRadius: "16px",
                  padding: "36px",
                  border: "1.5px solid rgba(45,90,61,0.2)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(45,122,79,0.1)", color: tokens.success }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" /></svg>
                  </div>
                  <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: "22px" }}>What we use</div>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {weUse.map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "15px", color: tokens.charcoalLight, marginBottom: "14px", lineHeight: 1.5 }}>
                      <span style={{ color: tokens.success }}>{checkCircleFill}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Negative card */}
              <div
                style={{
                  background: tokens.warmWhite,
                  borderRadius: "16px",
                  padding: "36px",
                  border: "1.5px solid rgba(196,75,75,0.15)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(196,75,75,0.08)", color: "#C44B4B" }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.7 7.3a1 1 0 00-1.4 1.4L8.6 10l-1.3 1.3a1 1 0 101.4 1.4L10 11.4l1.3 1.3a1 1 0 001.4-1.4L11.4 10l1.3-1.3a1 1 0 00-1.4-1.4L10 8.6 8.7 7.3z" /></svg>
                  </div>
                  <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: "22px" }}>What we skip</div>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {weSkip.map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "15px", color: tokens.charcoalLight, marginBottom: "14px", lineHeight: 1.5 }}>
                      <span style={{ color: "#C44B4B" }}>{xCircleFill}</span>
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
      <section style={sectionPad}>
        <Reveal>
          <p style={overlineStyle}>Built for real life</p>
          <h2 style={{ ...h2Style, marginBottom: "16px" }}>Eco-friendly cleaning is especially right for</h2>
          <p style={{ ...bodyStyle, maxWidth: "640px", marginBottom: "48px" }}>
            Green products work great in any home — but they&apos;re a particularly smart choice if any of these apply to yours.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {audiences.map((a, i) => (
              <div
                key={i}
                style={{
                  background: tokens.warmWhite,
                  border: `1.5px solid ${tokens.creamDark}`,
                  borderRadius: "10px",
                  padding: "32px",
                  transition: "all 250ms cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "6px",
                    background: "rgba(45,90,61,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    color: tokens.forestGreen,
                  }}
                >
                  {a.icon}
                </div>
                <h3 style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: "20px", marginBottom: "8px", lineHeight: 1.25 }}>{a.title}</h3>
                <p style={{ fontSize: "15px", color: tokens.charcoalLight, lineHeight: 1.6, margin: 0 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══════ HOW TO ADD IT ══════ */}
      <section style={sectionPadCream}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
              <p style={overlineStyle}>Simple to add</p>
              <h2 style={{ ...h2Style, textAlign: "center", marginBottom: "16px" }}>Green cleaning in three steps</h2>

              <div style={{ display: "flex", gap: "32px", marginTop: "48px", alignItems: "flex-start", flexWrap: "wrap", justifyContent: "center" }}>
                {[
                  { num: "1", title: "Book any cleaning", desc: "Standard, deep, or move-in/out — eco-friendly products work with every service type." },
                  { num: "2", title: "Select eco products", desc: 'Toggle \"Green / eco-friendly products\" on the add-ons screen. It\'s $10 flat — same price regardless of home size.' },
                  { num: "3", title: "Enjoy the clean", desc: "Your specialist arrives with the full green product kit. Same thorough clean, different products." },
                ].map((step, i, arr) => (
                  <div key={i} style={{ display: "contents" }}>
                    <div style={{ flex: 1, textAlign: "center", minWidth: "160px" }}>
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          background: tokens.forestGreen,
                          color: tokens.warmWhite,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: fonts.display,
                          fontWeight: 600,
                          fontSize: "20px",
                          marginBottom: "16px",
                        }}
                      >
                        {step.num}
                      </div>
                      <h3 style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: "18px", marginBottom: "6px" }}>{step.title}</h3>
                      <p style={{ fontSize: "14px", color: tokens.charcoalLight, lineHeight: 1.5, margin: 0 }}>{step.desc}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <div style={{ width: "48px", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "20px", color: tokens.grayLight }}>
                        {stepArrowIcon}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ OUR PROMISE ══════ */}
      <section style={{ background: tokens.forestGreen, color: tokens.warmWhite, padding: "96px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <p style={{ ...overlineStyle, color: tokens.terracottaLight }}>Our promise</p>
            <h2 style={{ ...h2Style, color: tokens.warmWhite, marginBottom: "16px" }}>Clean home, clear conscience</h2>
            <p style={{ ...bodyStyle, color: "rgba(253,250,246,0.8)", maxWidth: "640px", marginBottom: "48px" }}>
              We chose Tacoma for a reason. The Pacific Northwest is home — and we clean it like we mean it.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              {promises.map((p, i) => (
                <div key={i} style={{ textAlign: "center", padding: "20px" }}>
                  <div style={{ marginBottom: "12px" }}>{p.icon}</div>
                  <h4 style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: "17px", color: tokens.warmWhite, marginBottom: "4px" }}>{p.title}</h4>
                  <p style={{ fontSize: "13px", color: "rgba(253,250,246,0.6)", lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ FAQ ══════ */}
      <section style={sectionPad}>
        <div style={{ maxWidth: "740px", margin: "0 auto" }}>
          <Reveal>
            <p style={{ ...overlineStyle, textAlign: "center" }}>Common questions</p>
            <h2 style={{ ...h2Style, textAlign: "center", marginBottom: "40px" }}>Eco-friendly cleaning FAQ</h2>
          </Reveal>
          <Reveal delay={100}>
            <FaqAccordion
              items={faqs.map((faq) => ({
                q: faq.q,
                a:
                  faq.a === "recurring-link" ? (
                    <p style={{ margin: 0 }}>
                      Yes. You can add green products to every visit on your recurring plan, or just to individual visits as you prefer. The $10 charge applies per visit.{" "}
                      <Link href="/services/recurring" style={{ color: tokens.forestGreen, textDecoration: "underline", textUnderlineOffset: "2px" }}>
                        Learn more about recurring plans
                      </Link>
                      .
                    </p>
                  ) : (
                    faq.a
                  ),
              }))}
            />
          </Reveal>
        </div>
      </section>

      {/* ══════ FINAL CTA ══════ */}
      <section style={{ background: tokens.forestGreen, color: tokens.warmWhite, padding: "96px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <Reveal>
            <h2
              style={{
                fontFamily: fonts.display,
                fontWeight: 500,
                fontSize: "clamp(28px, 4vw, 44px)",
                color: tokens.warmWhite,
                lineHeight: 1.15,
                marginBottom: "16px",
              }}
            >
              A clean home that&apos;s kind to everything in it
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p style={{ fontSize: "clamp(16px, 1.8vw, 18px)", color: "rgba(253,250,246,0.8)", marginBottom: "32px", lineHeight: 1.6 }}>
              Book with eco-friendly products and enjoy a thorough clean with zero compromise — for $10 more per visit.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link href="/book" style={ctaWhite}>
              Book a cleaning
              {arrowIcon}
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
