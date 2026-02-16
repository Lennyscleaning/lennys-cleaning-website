/* ─── Lenny's Design Tokens ─── */
export const tokens = {
  forestGreen: "#2D5A3D",
  forestGreenDark: "#1E3F2B",
  forestGreenLight: "#3A7350",
  terracotta: "#C4704B",
  terracottaDark: "#A85C3A",
  terracottaLight: "#D4876A",
  terracottaHover: "#B86340",
  warmWhite: "#FDFAF6",
  cream: "#F5F0E8",
  creamDark: "#EDE6DA",
  grayLight: "#D4CFC7",
  grayMid: "#8A8580",
  charcoal: "#2C2C2C",
  charcoalLight: "#4A4A4A",
  success: "#2D7A4F",
};

export const fonts = {
  display: "'Fraunces', Georgia, serif",
  body: "'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

/* Reusable style objects */
export const sectionPad = { padding: "96px 24px", maxWidth: "1200px", margin: "0 auto" };
export const sectionPadCream = { padding: "96px 24px", background: tokens.cream };
export const h2Style: React.CSSProperties = {
  fontFamily: fonts.display,
  fontWeight: 500,
  fontSize: "clamp(28px, 4vw, 44px)",
  color: tokens.charcoal,
  lineHeight: 1.15,
  letterSpacing: "-0.01em",
  margin: 0,
};
export const bodyStyle: React.CSSProperties = {
  fontFamily: fonts.body,
  fontSize: "17px",
  fontWeight: 400,
  color: tokens.charcoalLight,
  lineHeight: 1.6,
  letterSpacing: "0.01em",
};
export const overlineStyle: React.CSSProperties = {
  fontFamily: fonts.body,
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.1em",
  color: tokens.forestGreen,
  textTransform: "uppercase",
  marginBottom: "12px",
};
