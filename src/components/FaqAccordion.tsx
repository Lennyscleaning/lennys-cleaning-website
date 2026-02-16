"use client";

import { useState, ReactNode } from "react";
import { tokens, fonts } from "./tokens";

const chevronIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

function FaqItem({ q, children }: { q: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${tokens.grayLight}`, padding: "20px 0" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          padding: 0,
          fontFamily: fonts.body,
          fontSize: "17px",
          fontWeight: 500,
          color: tokens.charcoal,
          lineHeight: 1.5,
        }}
        aria-expanded={open}
      >
        <span style={{ paddingRight: "16px" }}>{q}</span>
        <span
          style={{
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 250ms cubic-bezier(0.16,1,0.3,1)",
            color: tokens.grayMid,
          }}
        >
          {chevronIcon}
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? "300px" : "0",
          overflow: "hidden",
          transition: "max-height 350ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          style={{
            margin: 0,
            paddingTop: "12px",
            fontFamily: fonts.body,
            fontSize: "16px",
            fontWeight: 400,
            color: tokens.charcoalLight,
            lineHeight: 1.6,
            letterSpacing: "0.01em",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion({
  items,
}: {
  items: { q: string; a: ReactNode }[];
}) {
  return (
    <div>
      {items.map((faq, i) => (
        <FaqItem key={i} q={faq.q}>
          {typeof faq.a === "string" ? <p style={{ margin: 0 }}>{faq.a}</p> : faq.a}
        </FaqItem>
      ))}
    </div>
  );
}
