'use client';

import { useState } from 'react';

const MONTHLY_RATES = {
  studio: 400,
  one: 500,
  two: 600,
  three: 800,
  four: 1000
};

const FREQUENCY_DISCOUNTS = {
  weekly: 0.95,
  biweekly: 0.90,
  monthly: 0.85
};

export default function RecurringSavingsCalculator() {
  const [size, setSize] = useState<keyof typeof MONTHLY_RATES>('two');
  const [frequency, setFrequency] = useState<keyof typeof FREQUENCY_DISCOUNTS>('biweekly');

  const baseMonthlyRate = MONTHLY_RATES[size];
  const discount = FREQUENCY_DISCOUNTS[frequency];
  const discountedMonthlyRate = Math.round(baseMonthlyRate * discount);

  const getFrequencyInfo = () => {
    switch (frequency) {
      case 'weekly':
        return { cleans: 4, monthly: discountedMonthlyRate, perClean: Math.round(discountedMonthlyRate / 4), yearly: discountedMonthlyRate * 12 };
      case 'biweekly':
        return { cleans: 2, monthly: discountedMonthlyRate, perClean: Math.round(discountedMonthlyRate / 2), yearly: discountedMonthlyRate * 12 };
      case 'monthly':
        return { cleans: 1, monthly: discountedMonthlyRate, perClean: discountedMonthlyRate, yearly: discountedMonthlyRate * 12 };
    }
  };

  const info = getFrequencyInfo();
  const savingsPercent = Math.round(((1 - discount) * 100));

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-bold mb-4">Home size</label>
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(MONTHLY_RATES).map(([key, _]) => (
            <button
              key={key}
              onClick={() => setSize(key as keyof typeof MONTHLY_RATES)}
              className={`py-2 px-2 rounded font-bold transition-colors text-sm ${
                size === key
                  ? 'bg-terracotta text-white'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              {key === 'studio' ? 'Studio' : key === 'one' ? '1BR' : key === 'two' ? '2BR' : key === 'three' ? '3BR' : '4BR'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold mb-4">How often?</label>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(FREQUENCY_DISCOUNTS) as Array<keyof typeof FREQUENCY_DISCOUNTS>).map((freq) => (
            <button
              key={freq}
              onClick={() => setFrequency(freq)}
              className={`py-3 px-2 rounded font-bold transition-colors text-sm ${
                frequency === freq
                  ? 'bg-terracotta text-white'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              {freq === 'weekly' && 'Weekly'}
              {freq === 'biweekly' && 'Bi-weekly'}
              {freq === 'monthly' && 'Monthly'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white bg-opacity-15 rounded-lg p-8 space-y-6">
        <div>
          <p className="text-white text-opacity-80 text-sm mb-1">Your monthly savings</p>
          <div className="text-4xl font-bold text-white">{savingsPercent}% off</div>
          <p className="text-white text-opacity-70 text-sm mt-2">Compared to one-time cleanings</p>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-white bg-opacity-10 p-6 rounded-lg">
          <div>
            <p className="text-white text-opacity-70 text-xs">Monthly cost</p>
            <p className="text-2xl font-bold text-white">${info.monthly}</p>
          </div>
          <div>
            <p className="text-white text-opacity-70 text-xs">Yearly total</p>
            <p className="text-2xl font-bold text-white">${info.yearly}</p>
          </div>
        </div>

        <div>
          <p className="text-white text-opacity-80 text-sm mb-2">That's {info.cleans} professional cleaning{info.cleans > 1 ? 's' : ''} per month</p>
          <p className="text-white text-opacity-70 text-xs">Only ${info.perClean} per cleaning</p>
        </div>
      </div>

      <p className="text-white text-opacity-70 text-xs text-center">Pricing shown is estimated. Final cost depends on home condition and specific requests.</p>
    </div>
  );
}