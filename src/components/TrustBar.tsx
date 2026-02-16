import { tokens, bodyStyle } from "./tokens";

const checkIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke={tokens.forestGreen}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const defaultItems = [
  "Background-checked professionals",
  "Flat-rate pricing — no surprises",
  "Satisfaction guaranteed",
  "Proudly serving Tacoma",
];

export default function TrustBar({ items = defaultItems }: { items?: string[] }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "32px",
        padding: "28px 24px",
        borderTop: `1px solid ${tokens.grayLight}`,
        borderBottom: `1px solid ${tokens.grayLight}`,
      }}
    >
      {items.map((t, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            ...bodyStyle,
            fontSize: "14px",
            fontWeight: 500,
            color: tokens.grayMid,
          }}
        >
          {checkIcon}
          <span>{t}</span>
        </div>
      ))}
    </div>
  );
}
