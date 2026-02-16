"use client";

import { useState } from "react";
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

/* ─── Metadata (exported from a separate file for App Router if needed) ─── */
// title: "Recurring House Cleaning | Lenny's Cleaning — Tacoma, WA"
// description: "Save up to 30% with recurring house cleaning in Tacoma. Weekly, biweekly, or monthly plans with the same vetted professional every visit. Cancel or change anytime."

/* ─── Icons ─── */
const arrowIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

const checkCircle = (
  <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 18, height: 18, color: tokens.forestGreen, flexShrink: 0, marginTop: 2 }}>
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
  border: "none",
  cursor: "pointer",
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
  border: "none",
  cursor: "pointer",
};

/* ─── MAIN PAGE ─── */
export default function RecurringCleaningPage() {
  const [bedrooms, setBedrooms] = useState(3);
  const [freq, setFreq] = useState("biweekly");

  const perVisit = stdPrices[freq][bedrooms];
  const oneTimeRate = stdPrices.onetime[bedrooms];
  const visits = visitsPerYear[freq];
  const annual = perVisit * visits;
  const wouldBe = oneTimeRate * visits;
  const saved = wouldBe - annual;

  return (
    <div style={{ background: tokens.warmWhite, minHeight: "100vh" }}>
      {/* ══════ HERO ══════ */}
      <header style={{ padding: "80px 24px 72px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 20%, rgba(45,90,61,0.04) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "780px", margin: "0 auto", position: "relative" }}>
          <Reveal>
            <p style={overlineStyle}>Recurring service</p>
          </Reveal>
          <Reveal delay={100}>
            <h1
              style={{
                fontFamily: fonts.display,
                fontWeight: 600,
                fontSize: "clamp(34px, 5vw, 56px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "20px",
                color: tokens.charcoal,
              }}
            >
              Recurring house cleaning in Tacoma — save more, stress less
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p
              style={{
                ...bodyStyle,
                fontSize: "clamp(16px, 2vw, 19px)",
                maxWidth: "560px",
                margin: "0 auto 32px",
              }}
            >
              The same vetted professional, a consistent clean every visit, and savings up to 30%. Your home stays ready without you having to think about it.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <Link href="/book" style={ctaPrimary}>
              Start your recurring plan
              {arrowIcon}
            </Link>
          </Reveal>
        </div>
      </header>

      {/* ══════ TRUST BAR ══════ */}
      <Reveal>
        <TrustBar />
      </Reveal>

      {/* ══════ PLAN CARDS ══════ */}
      <section style={sectionPad}>
        <Reveal>
          <p style={overlineStyle}>Choose your plan</p>
          <h2 style={{ ...h2Style, marginBottom: "16px" }}>Three frequencies, one standard of care</h2>
          <p style={{ ...bodyStyle, maxWidth: "640px", marginBottom: "48px" }}>
            Every plan includes the same thorough clean by the same specialist. The only difference is how often — and how much you save.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "20px" }}>
            {/* Monthly */}
            <div
              style={{
                background: tokens.warmWhite,
                border: `2px solid ${tokens.creamDark}`,
                borderRadius: "16px",
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                transition: "all 300ms cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: "24px", marginBottom: "4px", color: tokens.charcoal }}>Monthly</div>
              <div style={{ fontSize: "14px", color: tokens.grayMid, marginBottom: "24px" }}>Once every 4 weeks</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "4px" }}>
                <span style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: "42px", color: tokens.forestGreen, letterSpacing: "-0.02em", lineHeight: 1 }}>$149</span>
                <span style={{ fontSize: "15px", color: tokens.grayMid, fontWeight: 500 }}>/visit</span>
              </div>
              <div style={{ fontSize: "13px", color: tokens.grayMid, marginBottom: "24px", textDecoration: "line-through" }}>$165 one-time</div>
              <div style={{ display: "inline-block", background: "rgba(45,122,79,0.1)", color: tokens.success, fontSize: "13px", fontWeight: 600, padding: "4px 10px", borderRadius: "99px", marginBottom: "28px", width: "fit-content" }}>Save 10% per visit</div>
              <ul style={{ listStyle: "none", flex: 1, marginBottom: "28px", padding: 0 }}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "15px", color: tokens.charcoalLight, marginBottom: "12px", lineHeight: 1.5 }}>{checkCircle}Same specialist each visit</li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "15px", color: tokens.charcoalLight, marginBottom: "12px", lineHeight: 1.5 }}>{checkCircle}Full standard clean included</li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "15px", color: tokens.charcoalLight, marginBottom: "12px", lineHeight: 1.5 }}>{checkCircle}Skip or reschedule anytime</li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "15px", color: tokens.charcoalLight, marginBottom: "12px", lineHeight: 1.5 }}>{checkCircle}No commitment — cancel anytime</li>
              </ul>
              <Link
                href="/book"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "14px 24px",
                  borderRadius: "6px",
                  fontWeight: 600,
                  fontSize: "15px",
                  textDecoration: "none",
                  letterSpacing: "0.03em",
                  color: tokens.forestGreen,
                  border: `1.5px solid ${tokens.forestGreen}`,
                  background: "transparent",
                  transition: "all 200ms cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                Choose monthly
              </Link>
            </div>

            {/* Biweekly (Featured) */}
            <div
              style={{
                background: tokens.warmWhite,
                border: `2px solid ${tokens.forestGreen}`,
                borderRadius: "16px",
                padding: "36px 32px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 8px 30px rgba(44,44,44,0.12)",
                transition: "all 300ms cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-14px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: tokens.forestGreen,
                  color: tokens.warmWhite,
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "5px 16px",
                  borderRadius: "99px",
                  whiteSpace: "nowrap",
                }}
              >
                Most popular
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: "24px", marginBottom: "4px", color: tokens.charcoal }}>Biweekly</div>
              <div style={{ fontSize: "14px", color: tokens.grayMid, marginBottom: "24px" }}>Every 2 weeks</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "4px" }}>
                <span style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: "42px", color: tokens.forestGreen, letterSpacing: "-0.02em", lineHeight: 1 }}>$157</span>
                <span style={{ fontSize: "15px", color: tokens.grayMid, fontWeight: 500 }}>/visit</span>
              </div>
              <div style={{ fontSize: "13px", color: tokens.grayMid, marginBottom: "24px", textDecoration: "line-through" }}>$165 one-time</div>
              <div style={{ display: "inline-block", background: "rgba(45,122,79,0.1)", color: tokens.success, fontSize: "13px", fontWeight: 600, padding: "4px 10px", borderRadius: "99px", marginBottom: "28px", width: "fit-content" }}>Save 5% per visit</div>
              <ul style={{ listStyle: "none", flex: 1, marginBottom: "28px", padding: 0 }}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "15px", color: tokens.charcoalLight, marginBottom: "12px", lineHeight: 1.5 }}>{checkCircle}Same specialist each visit</li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "15px", color: tokens.charcoalLight, marginBottom: "12px", lineHeight: 1.5 }}>{checkCircle}Full standard clean included</li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "15px", color: tokens.charcoalLight, marginBottom: "12px", lineHeight: 1.5 }}>{checkCircle}Priority scheduling windows</li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "15px", color: tokens.charcoalLight, marginBottom: "12px", lineHeight: 1.5 }}>{checkCircle}No commitment — cancel anytime</li>
              </ul>
              <Link
                href="/book"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "14px 24px",
                  borderRadius: "6px",
                  fontWeight: 600,
                  fontSize: "15px",
                  textDecoration: "none",
                  letterSpacing: "0.03em",
                  background: tokens.terracotta,
                  color: tokens.warmWhite,
                  transition: "all 200ms cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                Choose biweekly
              </Link>
            </div>

            {/* Weekly */}
            <div
              style={{
                background: tokens.warmWhite,
                border: `2px solid ${tokens.creamDark}`,
                borderRadius: "16px",
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                transition: "all 300ms cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: "24px", marginBottom: "4px", color: tokens.charcoal }}>Weekly</div>
              <div style={{ fontSize: "14px", color: tokens.grayMid, marginBottom: "24px" }}>Every week</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "4px" }}>
                <span style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: "42px", color: tokens.forestGreen, letterSpacing: "-0.02em", lineHeight: 1 }}>$138</span>
                <span style={{ fontSize: "15px", color: tokens.grayMid, fontWeight: 500 }}>/visit</span>
              </div>
              <div style={{ fontSize: "13px", color: tokens.grayMid, marginBottom: "24px", textDecoration: "line-through" }}>$165 one-time</div>
              <div style={{ display: "inline-block", background: "rgba(45,122,79,0.1)", color: tokens.success, fontSize: "13px", fontWeight: 600, padding: "4px 10px", borderRadius: "99px", marginBottom: "28px", width: "fit-content" }}>Save 16% per visit</div>
              <ul style={{ listStyle: "none", flex: 1, marginBottom: "28px", padding: 0 }}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "15px", color: tokens.charcoalLight, marginBottom: "12px", lineHeight: 1.5 }}>{checkCircle}Same specialist each visit</li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "15px", color: tokens.charcoalLight, marginBottom: "12px", lineHeight: 1.5 }}>{checkCircle}Full standard clean included</li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "15px", color: tokens.charcoalLight, marginBottom: "12px", lineHeight: 1.5 }}>{checkCircle}Priority scheduling windows</li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "15px", color: tokens.charcoalLight, marginBottom: "12px", lineHeight: 1.5 }}>{checkCircle}Lowest per-visit rate</li>
              </ul>
              <Link
                href="/book"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "14px 24px",
                  borderRadius: "6px",
                  fontWeight: 600,
                  fontSize: "15px",
                  textDecoration: "none",
                  letterSpacing: "0.03em",
                  color: tokens.forestGreen,
                  border: `1.5px solid ${tokens.forestGreen}`,
                  background: "transparent",
                  transition: "all 200ms cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                Choose weekly
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p style={{ fontSize: "14px", color: tokens.grayMid, textAlign: "center", maxWidth: "600px", margin: "0 auto", lineHeight: 1.5 }}>
            Prices shown are for a 3BR/2BA home — Tacoma&apos;s most common configuration. Your exact rate depends on home size and condition.{" "}
            <Link href="/house-cleaning-prices-tacoma-wa" style={{ color: tokens.forestGreen, textDecoration: "underline" }}>
              See all prices
            </Link>
            .
          </p>
        </Reveal>
      </section>

      {/* ══════ ANNUAL SAVINGS CALCULATOR ══════ */}
      <section style={sectionPadCream}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <p style={overlineStyle}>The math works out</p>
            <h2 style={{ ...h2Style, textAlign: "center", marginBottom: "16px" }}>See how much recurring saves you</h2>
          </Reveal>

          <Reveal delay={100}>
            <div
              style={{
                background: tokens.warmWhite,
                border: `2px solid ${tokens.creamDark}`,
                borderRadius: "16px",
                maxWidth: "700px",
                margin: "48px auto 0",
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "32px 36px 0" }}>
                <h3 style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: "24px", marginBottom: "4px" }}>Annual savings calculator</h3>
                <p style={{ fontSize: "15px", color: tokens.charcoalLight, marginBottom: "24px" }}>Select your home size and preferred frequency.</p>
              </div>
              <div style={{ padding: "0 36px", display: "flex", gap: "16px", marginBottom: "28px", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: "180px" }}>
                  <label htmlFor="sav-bedrooms" style={{ display: "block", fontSize: "13px", fontWeight: 600, color: tokens.charcoalLight, marginBottom: "6px" }}>
                    Bedrooms
                  </label>
                  <select
                    id="sav-bedrooms"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(parseInt(e.target.value))}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: `1.5px solid ${tokens.creamDark}`,
                      borderRadius: "6px",
                      fontFamily: fonts.body,
                      fontSize: "15px",
                      color: tokens.charcoal,
                      background: tokens.warmWhite,
                      cursor: "pointer",
                    }}
                  >
                    <option value={1}>1 bedroom</option>
                    <option value={2}>2 bedrooms</option>
                    <option value={3}>3 bedrooms</option>
                    <option value={4}>4 bedrooms</option>
                    <option value={5}>5 bedrooms</option>
                  </select>
                </div>
                <div style={{ flex: 1, minWidth: "180px" }}>
                  <label htmlFor="sav-freq" style={{ display: "block", fontSize: "13px", fontWeight: 600, color: tokens.charcoalLight, marginBottom: "6px" }}>
                    Frequency
                  </label>
                  <select
                    id="sav-freq"
                    value={freq}
                    onChange={(e) => setFreq(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: `1.5px solid ${tokens.creamDark}`,
                      borderRadius: "6px",
                      fontFamily: fonts.body,
                      fontSize: "15px",
                      color: tokens.charcoal,
                      background: tokens.warmWhite,
                      cursor: "pointer",
                    }}
                  >
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Biweekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
              <div
                style={{
                  background: tokens.cream,
                  padding: "28px 36px",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "24px",
                  textAlign: "center",
                }}
              >
                <div>
                  <div style={{ display: "block", fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: tokens.grayMid, marginBottom: "6px" }}>Per visit</div>
                  <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: "28px", color: tokens.forestGreen, letterSpacing: "-0.02em" }}>${perVisit}</div>
                </div>
                <div>
                  <div style={{ display: "block", fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: tokens.grayMid, marginBottom: "6px" }}>Annual cost</div>
                  <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: "28px", color: tokens.forestGreen, letterSpacing: "-0.02em" }}>${annual.toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ display: "block", fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: tokens.grayMid, marginBottom: "6px" }}>You save yearly</div>
                  <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: "28px", color: tokens.success, letterSpacing: "-0.02em" }}>${saved.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ BENEFITS ══════ */}
      <section style={sectionPad}>
        <Reveal>
          <p style={overlineStyle}>Why recurring</p>
          <h2 style={{ ...h2Style, marginBottom: "16px" }}>More than just a discount</h2>
          <p style={{ ...bodyStyle, maxWidth: "640px", marginBottom: "48px" }}>
            Recurring cleaning isn&apos;t just about saving money — it&apos;s about the consistency that comes from the same professional who knows your home.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                ),
                title: "Your specialist knows your home",
                desc: "The same professional every visit means they learn your preferences, remember your notes, and clean more efficiently over time.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M12 6v6l4 2" />
                  </svg>
                ),
                title: "Less buildup, faster cleans",
                desc: "Regular visits prevent grime from accumulating. Each clean takes less time and produces better results because your home never falls behind.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                ),
                title: "A home that's always ready",
                desc: "No more scrambling before guests arrive or dreading the weekend chore list. Your home stays guest-ready on autopilot.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                ),
                title: "Priority scheduling",
                desc: "Recurring customers get first pick of time windows. Your preferred day and time stays reserved — no competing with one-time bookings.",
              },
            ].map((b, i) => (
              <div key={i} style={{ display: "flex", gap: "20px" }}>
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "10px",
                    background: "rgba(45,90,61,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: tokens.forestGreen,
                  }}
                >
                  {b.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: "20px", marginBottom: "6px", lineHeight: 1.25 }}>{b.title}</h3>
                  <p style={{ fontSize: "15px", color: tokens.charcoalLight, lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══════ HOW RECURRING WORKS ══════ */}
      <section style={sectionPadCream}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <p style={{ ...overlineStyle, textAlign: "center" }}>How it works</p>
            <h2 style={{ ...h2Style, textAlign: "center", marginBottom: "16px" }}>Getting started takes three minutes</h2>
          </Reveal>

          <Reveal delay={100}>
            <div style={{ maxWidth: "640px", margin: "48px auto 0" }}>
              {[
                { num: "1", title: "Book your first clean", desc: "Choose your service, home size, and preferred frequency. You'll see your recurring rate and your Initial Clean price — both upfront, before you commit." },
                { num: "2", title: "We match you with a specialist", desc: "Lenny's pairs you with a cleaning professional based on your home's needs and your location. After your first visit, they're your regular specialist." },
                { num: "3", title: "Your plan runs on autopilot", desc: "Your specialist arrives on your scheduled day, cleans to our standards, and payment processes automatically. Skip, reschedule, or cancel a visit anytime with 24 hours' notice." },
              ].map((step, i, arr) => (
                <div key={i} style={{ display: "flex", gap: "24px", position: "relative", paddingBottom: i < arr.length - 1 ? "40px" : 0 }}>
                  {i < arr.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        left: "23px",
                        top: "52px",
                        bottom: 0,
                        width: "2px",
                        background: tokens.creamDark,
                      }}
                    />
                  )}
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: tokens.forestGreen,
                      color: tokens.warmWhite,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: fonts.display,
                      fontWeight: 600,
                      fontSize: "20px",
                      flexShrink: 0,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: "22px", marginBottom: "6px", marginTop: "8px" }}>{step.title}</h3>
                    <p style={{ fontSize: "15px", color: tokens.charcoalLight, lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ FLEXIBILITY ══════ */}
      <section style={{ background: tokens.forestGreen, color: tokens.warmWhite, padding: "96px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <p style={{ ...overlineStyle, color: tokens.terracottaLight }}>Built to flex</p>
            <h2 style={{ ...h2Style, color: tokens.warmWhite, marginBottom: "16px" }}>Plans that work around your life</h2>
            <p style={{ ...bodyStyle, color: "rgba(253,250,246,0.8)", maxWidth: "640px", marginBottom: "48px" }}>
              Recurring doesn&apos;t mean rigid. We built every plan with real life in mind.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              {[
                { title: "Skip a visit", desc: "Going on vacation or just don't need it this week? Skip any visit with 24 hours' notice — no fees, no hassle." },
                { title: "Reschedule freely", desc: "Move your cleaning to a different day the same week. Free with 24+ hours' notice. Changes within 24 hours may carry a small fee." },
                { title: "Change your frequency", desc: "Switch from weekly to biweekly, or biweekly to monthly — whenever you want. Your per-visit rate adjusts automatically." },
              ].map((card, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(253,250,246,0.08)",
                    border: "1px solid rgba(253,250,246,0.15)",
                    borderRadius: "10px",
                    padding: "28px",
                    transition: "all 250ms cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <h3 style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: "20px", color: tokens.warmWhite, marginBottom: "8px" }}>{card.title}</h3>
                  <p style={{ fontSize: "15px", color: "rgba(253,250,246,0.75)", lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
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
            <h2 style={{ ...h2Style, textAlign: "center", marginBottom: "40px" }}>Recurring cleaning FAQ</h2>
          </Reveal>
          <Reveal delay={100}>
            <FaqAccordion
              items={[
                {
                  q: "Is there a contract or commitment?",
                  a: "No contract. You can cancel your recurring plan at any time with no penalties. Individual visits require 24 hours' notice to avoid a late cancellation fee, but the plan itself has no minimum commitment.",
                },
                {
                  q: "Can I request the same professional every time?",
                  a: "That's the plan. Lenny's prioritizes matching recurring customers with the same specialist every visit. Consistency matters — both for your comfort and for the quality of the clean. If your regular specialist is unavailable, we'll let you know in advance.",
                },
                {
                  q: "What's the difference between the first visit and recurring visits?",
                  a: "Your first visit is an Initial Clean — slightly more thorough since we're seeing your home for the first time. This establishes a baseline. After that, your recurring rate drops because each subsequent clean maintains the standard rather than building from scratch.",
                },
                {
                  q: "How do I skip or reschedule a visit?",
                  a: "You can skip or reschedule via text or through your booking dashboard. Free with 24+ hours' notice. Changes made within 24 hours of your scheduled cleaning may be subject to a $25 late change fee.",
                },
                {
                  q: "Can I add extras to individual visits?",
                  a: (
                    <p style={{ margin: 0 }}>
                      Yes. You can add any of our add-on services — inside oven, inside fridge, baseboards, and more — to a specific visit without changing your recurring plan.{" "}
                      <Link href="/house-cleaning-prices-tacoma-wa" style={{ color: tokens.forestGreen, textDecoration: "underline", textUnderlineOffset: "2px" }}>
                        See all add-ons and prices
                      </Link>
                      .
                    </p>
                  ),
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* ══════ FINAL CTA ══════ */}
      <section style={{ background: tokens.forestGreen, padding: "96px 24px", textAlign: "center" }}>
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
              Your home, consistently clean
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p style={{ fontSize: "clamp(16px, 1.8vw, 18px)", color: "rgba(253,250,246,0.8)", maxWidth: "500px", margin: "0 auto 32px", lineHeight: 1.6 }}>
              Start a recurring plan today and let your home stay one step ahead — without you lifting a finger.
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
