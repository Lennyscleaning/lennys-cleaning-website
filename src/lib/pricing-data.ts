/* ─── Centralized Pricing Data ───
   Single source of truth for all prices across the site.
   Import from here — never hardcode prices in page files.
   ─────────────────────────────────────────────────────── */

/* ─── Base prices (one-time) ─── */
export const standardPricing = [
  { config: '1 bedroom / 1 bath', price: '$85' },
  { config: '2 bedrooms / 1 bath', price: '$120' },
  { config: '3 bedrooms / 2 baths', price: '$165' },
  { config: '4 bedrooms / 2.5 baths', price: '$210' },
  { config: '5 bedrooms / 3 baths', price: '$255' },
  { config: '6 bedrooms / 3.5 baths', price: '$300' },
];

export const deepPricing = [
  { config: '1 bedroom / 1 bath', price: '$150' },
  { config: '2 bedrooms / 1 bath', price: '$220' },
  { config: '3 bedrooms / 2 baths', price: '$295' },
  { config: '4 bedrooms / 2.5 baths', price: '$380' },
  { config: '5 bedrooms / 3 baths', price: '$460' },
  { config: '6 bedrooms / 3.5 baths', price: '$540' },
];

export const movePricing = [
  { config: '1 bedroom / 1 bath', price: '$175' },
  { config: '2 bedrooms / 1 bath', price: '$225' },
  { config: '3 bedrooms / 2 baths', price: '$325' },
  { config: '4 bedrooms / 2.5 baths', price: '$400' },
  { config: '5 bedrooms / 3 baths', price: '$475' },
  { config: '6 bedrooms / 3.5 baths', price: '$550' },
];

export const airbnbPricing = [
  { config: '1 bedroom / 1 bath', price: '$125' },
  { config: '2 bedrooms / 1 bath', price: '$155' },
  { config: '3 bedrooms / 2 baths', price: '$195' },
  { config: '4 bedrooms / 2.5 baths', price: '$250' },
  { config: '5 bedrooms / 3 baths', price: '$300' },
  { config: '6 bedrooms / 3.5 baths', price: '$350' },
];

export const postConstructionPricing = [
  { config: '1 bedroom / 1 bath', price: '$250' },
  { config: '2 bedrooms / 1 bath', price: '$320' },
  { config: '3 bedrooms / 2 baths', price: '$390' },
  { config: '4 bedrooms / 2.5 baths', price: '$480' },
  { config: '5 bedrooms / 3 baths', price: '$570' },
  { config: '6 bedrooms / 3.5 baths', price: '$660' },
];

/* ─── Starting-at prices (for cards, heroes, SEO) ─── */
export const startingPrices = {
  standard: '$85',
  deep: '$150',
  move: '$175',
  airbnb: '$125',
  postConstruction: '$250',
};

/* ─── Recurring pricing (3BR base as display example) ─── */
export const recurringPricing = {
  base: 165, // 3BR standard one-time
  weekly: { price: '$140', savings: '~15%' },
  biweekly: { price: '$152', savings: '~8%' },
  monthly: { price: '$157', savings: '~5%' },
};

/* ─── Add-ons ─── */
export const addons = [
  { name: 'Inside oven', price: '$35' },
  { name: 'Inside fridge', price: '$30' },
  { name: 'Inside cabinets', price: '$30' },
  { name: 'Windows interior', price: '$35' },
  { name: 'Laundry (wash, dry, fold)', price: '$15' },
  { name: 'Dishes', price: '$10' },
  { name: 'Baseboards', price: '$20' },
  { name: 'Wall spot clean', price: '$15' },
  { name: 'Garage sweep', price: '$25' },
  { name: 'Patio / deck', price: '$30' },
  { name: 'Green cleaning products', price: '$10' },
  { name: 'Same-day service', price: '$50' },
  { name: 'Early morning', price: '$15' },
  { name: 'Weekend', price: '$20' },
];

/* ─── Pricing page: service comparison ─── */
export const serviceComparison = [
  {
    name: 'Standard cleaning',
    price: startingPrices.standard,
    note: 'Regular maintenance',
    href: '/services/standard',
  },
  {
    name: 'Deep cleaning',
    price: startingPrices.deep,
    note: 'Top-to-bottom detail',
    href: '/services/deep',
  },
  {
    name: 'Move-in / move-out',
    price: startingPrices.move,
    note: 'Get your deposit back',
    href: '/services/move',
  },
  {
    name: 'Airbnb turnover',
    price: startingPrices.airbnb,
    note: 'Guest-ready every time',
    href: '/services/airbnb',
  },
  {
    name: 'Recurring plans',
    price: `From ${recurringPricing.weekly.price}/visit`,
    note: 'Save up to 15%',
    href: '/services/recurring',
  },
];

/* ─── Pricing page: size ranges ─── */
export const sizeRanges = [
  { size: '1 bedroom', range: '$85–$175' },
  { size: '2 bedrooms', range: '$120–$225' },
  { size: '3 bedrooms', range: '$165–$325' },
  { size: '4 bedrooms', range: '$210–$400' },
  { size: '5 bedrooms', range: '$255–$570' },
  { size: '6 bedrooms', range: '$300–$660' },
];

/* ─── City page: service cards ─── */
export const cityServiceCards = [
  {
    title: 'Standard cleaning',
    price: `Starting at ${startingPrices.standard}`,
    href: '/services/standard',
    desc: 'Regular maintenance cleaning for your home — kitchens, bathrooms, floors, and surfaces.',
  },
  {
    title: 'Deep cleaning',
    price: `Starting at ${startingPrices.deep}`,
    href: '/services/deep',
    desc: 'A thorough, top-to-bottom clean including inside appliances, baseboards, and detail work.',
  },
  {
    title: 'Move-out cleaning',
    price: `Starting at ${startingPrices.move}`,
    href: '/services/move',
    desc: 'Get your deposit back with a comprehensive clean designed for move-in and move-out transitions.',
  },
];
