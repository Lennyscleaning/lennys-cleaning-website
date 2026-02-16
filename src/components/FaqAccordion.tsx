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

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-0">
      {items.map((item, index) => (
        <div
          key={index}
          className={`border-b border-gray-l ${index === 0 ? 'border-t' : ''}`}
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full text-left py-5 px-6 md:px-8 flex items-center justify-between hover:bg-cream hover:bg-opacity-30 transition-colors"
          >
            <span className="font-body font-medium text-base md:text-lg text-charcoal">
              {item.question}
            </span>
            <div
              className={`flex-shrink-0 ml-4 transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            >
              <svg
                className="w-5 h-5 text-forest"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </button>

          {/* Collapsible Answer */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <p className="px-6 md:px-8 pb-5 font-body text-base text-charcoal-light leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
