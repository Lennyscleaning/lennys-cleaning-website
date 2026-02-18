# Lenny's Cleaning Website

## Project
Residential cleaning marketplace launching in Tacoma, WA. Built with Next.js 14+ (App Router), Tailwind CSS, deployed on Vercel.

## Branches
- `main` — production (not yet launched)
- `preview` — active development, deploys to Vercel preview

## Design System
- **Colors:** forest green #2D5A3D, terracotta #C4704B (CTAs ONLY), warm white #FDFAF6 (page bg, never #FFFFFF), charcoal #2C2C2C (text, never #000000), cream #F5F0E8 (alternating sections)
- **Fonts:** Fraunces (headlines ONLY), Satoshi (everything else). Both loaded in globals.css.
- **Terracotta rule:** ONLY for CTA buttons and interactive highlights. Never backgrounds or decorative elements.

## Key Data
- Phone: (253) 600-3355
- Email: hello@lennyscleaning.com
- Pricing: Standard from $85, Deep from $150, Move-in/out from $175, Airbnb from $125
- All pricing data centralized in src/lib/pricing-data.ts — never hardcode prices in pages
- Operator pay: $28-48/hr, 75/25 split (operator/platform)

## Copy Rules
- "Your home" not "your house"
- "Cleaning professionals" or "specialists" not "cleaners" or "maids"
- "Book a cleaning" not "Schedule a service"
- Sentence case on all headlines. Never Title Case.
- One exclamation mark max per page
- No fake stats (no "500+ customers" or "4.9 stars" — we haven't launched)

## Images
Located at public/images/lennys-website-images/
- img-hero.webp — Homepage hero
- img-open.webp — Standard cleaning card
- img-bath.webp — Deep cleaning card
- img-bed.webp — Move-in/out card
- img-detail.webp — Photo break sections
- img-living2.webp — About page

## Tech Notes
- All components use default exports
- 'use client' only when useState/useEffect/event handlers are needed
- No @apply with custom Tailwind theme classes in @layer components — use raw CSS with var()
- Reveal component delay prop takes milliseconds, not decimal seconds
- No unused TypeScript variables (breaks build)

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build (test before pushing)
- `git push origin preview` — triggers Vercel preview deployment

## Sentry Observability (ALWAYS follow these)
- Import Sentry: `import * as Sentry from "@sentry/nextjs"`
- Every try/catch block must use `Sentry.captureException(error)` — never just console.error
- Every API route must wrap its main logic in `Sentry.startSpan` with meaningful `op` and `name`
- Use structured logging: `const { logger } = Sentry` with logger.info, logger.warn, logger.error
- Use `logger.fmt` for template literals in logs
- Add relevant attributes to spans (userId, bookingId, endpoint, etc.)
- Log every critical event: booking created, SMS sent, payment captured, dispatch assigned, error occurred

## Event Logging
- Every API route and workflow must write to the event_log Airtable table for critical actions
- Event types: BOOKING_CREATED, SMS_SENT, PAYMENT_CAPTURED, DISPATCH_ASSIGNED, ERROR

## Environment
- Airtable base: appPoJJ6PW9RWYLaq
- Always check Airtable schema before writing API routes — never assume field names
- Deploy target: Vercel project "lennys-cleaning" (NOT lennys-cleaning-website)
