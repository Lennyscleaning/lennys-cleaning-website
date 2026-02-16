'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-terracotta transition-colors"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 flex items-center justify-between bg-warm-white hover:bg-gray-100 transition-colors"
          >
            <span className="font-display font-bold text-left text-forest-green">{item.question}</span>
            <span
              className={`text-terracotta font-bold text-xl transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            >
              ▼
            </span>
          </button>
          {openIndex === index && (
            <div className="px-6 py-4 bg-white text-gray-700 border-t-2 border-gray-200">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}