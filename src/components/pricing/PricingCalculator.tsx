'use client';

import { useState } from 'react';

const PRICE_PER_HOUR = 50;
const HOURS_BY_SIZE = {
  studio: 2,
  one: 2.5,
  two: 3,
  three: 4,
  four: 5
};

const SERVICE_MULTIPLIERS: { [key: string]: number } = {
  recurring: 0.85,
  deep: 1.0,
  moveout: 1.1,
  airbnb: 0.9,
  eco: 1.0
};

export default function PricingCalculator() {
  const [bedrooms, setBedrooms] = useState<keyof typeof HOURS_BY_SIZE>('two');
  const [service, setService] = useState<keyof typeof SERVICE_MULTIPLIERS>('recurring');

  const hours = HOURS_BY_SIZE[bedrooms];
  const multiplier = SERVICE_MULTIPLIERS[service];
  const basePrice = PRICE_PER_HOUR * hours;
  const finalPrice = Math.round(basePrice * multiplier);

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-display font-bold text-forest-green mb-4">
          Home size
        </label>
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(HOURS_BY_SIZE).map(([key, _]) => (
            <button
              key={key}
              onClick={() => setBedrooms(key as keyof typeof HOURS_BY_SIZE)}
              className={`py-3 px-2 rounded-lg font-display font-bold transition-colors ${
                bedrooms === key
                  ? 'bg-forest-green text-white'
                  : 'bg-white border-2 border-gray-300 text-forest-green hover:border-forest-green'
              }`}
            >
              {key === 'studio' ? 'Studio' : key === 'one' ? '1BR' : key === 'two' ? '2BR' : key === 'three' ? '3BR' : '4BR'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-display font-bold text-forest-green mb-4">
          Service type
        </label>
        <div className="space-y-2">
          {Object.entries(SERVICE_MULTIPLIERS).map(([key, _]) => (
            <label
              key={key}
              className="flex items-center gap-3 p-4 rounded-lg cursor-pointer border-2 transition-colors"
              style={{
                borderColor: service === key ? '#2D5016' : '#e5e7eb',
                backgroundColor: service === key ? '#FAF7F2' : 'white'
              }}
            >
              <input
                type="radio"
                name="service"
                value={key}
                checked={service === key}
                onChange={() => setService(key as keyof typeof SERVICE_MULTIPLIERS)}
                className="w-4 h-4"
              />
              <span className="font-display font-bold text-forest-green">
                {key === 'recurring' && 'Recurring'}
                {key === 'deep' && 'Deep Cleaning'}
                {key === 'moveout' && 'Move-out'}
                {key === 'airbnb' && 'Airbnb'}
                {key === 'eco' && 'Eco-friendly'}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-forest-green to-emerald-900 text-white p-8 rounded-xl">
        <p className="text-white text-opacity-90 mb-2">Estimated price for {HOURS_BY_SIZE[bedrooms]} hours:</p>
        <div className="text-5xl md:text-6xl font-display font-bold">${finalPrice}</div>
        <p className="text-white text-opacity-75 mt-4 text-sm">Final price may vary based on home condition and specific requests. Get a custom quote when you book.</p>
      </div>
    </div>
  );
}