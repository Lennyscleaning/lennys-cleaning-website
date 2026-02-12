# Lenny's Cleaning Website

A modern, SEO-first Next.js website for Lenny's Cleaning professional residential cleaning services in Tacoma, WA.

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Font:** Inter (Google Fonts)
- **Deployment:** Ready for Vercel

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   ├── services/           # Services pages
│   ├── pricing/            # Pricing page
│   ├── book/               # Booking page
│   ├── about/              # About page
│   └── contact/            # Contact page
├── components/
│   └── ui/                 # Reusable UI components
│       ├── Header.tsx      # Navigation header
│       └── Footer.tsx      # Footer
└── lib/
    └── constants.ts        # Brand colors, company info
```

## Brand Colors

- **Forest Green:** #2D5016 (Primary)
- **Terracotta:** #C45D3E (Accent)
- **Warm White:** #FAF8F5 (Background)
- **Charcoal:** #2C2C2C (Text)
- **Soft Gold:** #D4A84B (Highlight)

## Getting Started

### Prerequisites

- Node.js 18+ or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Lennyscleaning/lennys-cleaning-website.git
cd lennys-cleaning-website

# Install dependencies
npm install

# Create environment variables
cp .env.example .env.local
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Build for Production

```bash
npm run build
npm start
```

## SEO Features

- Structured metadata for all pages
- Open Graph tags for social sharing
- Mobile-responsive design
- Fast performance optimized
- Semantic HTML structure

## Pages

- **Home** (`/`) - Landing page with hero section
- **Services** (`/services`) - Overview of cleaning services
  - Deep Cleaning (`/services/deep-cleaning`)
  - Move-Out Cleaning (`/services/move-out-cleaning`)
  - Recurring Cleaning (`/services/recurring-cleaning`)
- **Pricing** (`/pricing`) - Service pricing information
- **Book** (`/book`) - Booking/quote request form
- **About** (`/about`) - Company information
- **Contact** (`/contact`) - Contact form and information

## Development Guidelines

- Use TypeScript for type safety
- Follow Tailwind CSS utility classes
- Maintain brand color consistency
- Keep pages SEO-optimized with proper metadata
- Use the `@/*` path alias for imports

## Deployment

This project is optimized for Vercel deployment:

1. Push your changes to the main branch
2. Connect the repository to Vercel
3. Vercel will automatically build and deploy

## License

All rights reserved © Lenny's Cleaning
