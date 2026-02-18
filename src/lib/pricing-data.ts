/* ─── Centralized Pricing Data ───
   Single source of truth for all prices across the site.
   Import from here — never hardcode prices in page files.
   ─────────────────────────────────────────────────────── */

/* ─── Tax rate ─── */
export const TAX_RATE = 0.102; // 10.2% Tacoma default — will eventually come from Airtable by zip

/* ─── Raw price matrices (numeric, used by booking form calculator) ─── */
export const basePriceMatrix: Record<string, Record<number, number>> = {
  standard:            { 1: 95,  2: 130, 3: 180, 4: 230, 5: 255, 6: 290 },
  deep:                { 1: 170, 2: 245, 3: 330, 4: 425, 5: 475, 6: 530 },
  move:                { 1: 195, 2: 250, 3: 360, 4: 440, 5: 525, 6: 605 },
  airbnb:              { 1: 95,  2: 125, 3: 155, 4: 195, 5: 215, 6: 235 },
  'post-construction': { 1: 250, 2: 320, 3: 390, 4: 480, 5: 570, 6: 660 },
};

export const addonPriceMap: Record<string, number> = {
  oven: 35,
  fridge: 30,
  cabinets: 30,
  windows: 35,
  laundry: 15,
  dishes: 10,
  baseboards: 20,
  'wall-spot': 15,
  garage: 25,
  patio: 30,
  'green-products': 10,
  'same-day': 50,
  'early-morning': 15,
  weekend: 20,
};

/* ─── Bedroom config labels ─── */
const bedroomConfigs: [number, string][] = [
  [1, '1 bedroom / 1 bath'],
  [2, '2 bedrooms / 1 bath'],
  [3, '3 bedrooms / 2 baths'],
  [4, '4 bedrooms / 2.5 baths'],
  [5, '5 bedrooms / 3 baths'],
  [6, '6 bedrooms / 3.5 baths'],
];

function formatPricingTable(serviceKey: string) {
  return bedroomConfigs.map(([beds, config]) => ({
    config,
    price: `$${basePriceMatrix[serviceKey][beds]}`,
  }));
}

/* ─── Base prices (formatted for display pages) ─── */
export const standardPricing = formatPricingTable('standard');
export const deepPricing = formatPricingTable('deep');
export const movePricing = formatPricingTable('move');
export const airbnbPricing = formatPricingTable('airbnb');
export const postConstructionPricing = formatPricingTable('post-construction');

/* ─── Starting-at prices (for cards, heroes, SEO) ─── */
export const startingPrices = {
  standard: `$${basePriceMatrix.standard[1]}`,
  deep: `$${basePriceMatrix.deep[1]}`,
  move: `$${basePriceMatrix.move[1]}`,
  airbnb: `$${basePriceMatrix.airbnb[1]}`,
  postConstruction: `$${basePriceMatrix['post-construction'][1]}`,
};

/* ─── Recurring pricing (3BR base as display example) ─── */
export const recurringPricing = {
  base: basePriceMatrix.standard[3],
  weekly: { price: '$155', savings: '~15%' },
  biweekly: { price: '$175', savings: '~3%' },
  monthly: { price: '$180', savings: '~0%' },
};

/* ─── Add-ons (formatted for display pages) ─── */
export const addons = [
  { name: 'Inside oven', price: `$${addonPriceMap.oven}` },
  { name: 'Inside fridge', price: `$${addonPriceMap.fridge}` },
  { name: 'Inside cabinets', price: `$${addonPriceMap.cabinets}` },
  { name: 'Windows interior', price: `$${addonPriceMap.windows}` },
  { name: 'Laundry (wash, dry, fold)', price: `$${addonPriceMap.laundry}` },
  { name: 'Dishes', price: `$${addonPriceMap.dishes}` },
  { name: 'Baseboards', price: `$${addonPriceMap.baseboards}` },
  { name: 'Wall spot clean', price: `$${addonPriceMap['wall-spot']}` },
  { name: 'Garage sweep', price: `$${addonPriceMap.garage}` },
  { name: 'Patio / deck', price: `$${addonPriceMap.patio}` },
  { name: 'Green cleaning products', price: `$${addonPriceMap['green-products']}` },
  { name: 'Same-day service', price: `$${addonPriceMap['same-day']}` },
  { name: 'Early morning', price: `$${addonPriceMap['early-morning']}` },
  { name: 'Weekend', price: `$${addonPriceMap.weekend}` },
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
  { size: '1 bedroom', range: '$95\u2013$250' },
  { size: '2 bedrooms', range: '$125\u2013$320' },
  { size: '3 bedrooms', range: '$155\u2013$390' },
  { size: '4 bedrooms', range: '$195\u2013$480' },
  { size: '5 bedrooms', range: '$215\u2013$570' },
  { size: '6 bedrooms', range: '$235\u2013$660' },
];

/* ─── City page: service cards ─── */
export const cityServiceCards = [
  {
    title: 'Standard cleaning',
    price: `Starting at ${startingPrices.standard}`,
    href: '/services/standard',
    desc: 'Regular maintenance cleaning for your home \u2014 kitchens, bathrooms, floors, and surfaces.',
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
