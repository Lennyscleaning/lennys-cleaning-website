'use client';

import { useState, useRef, useEffect } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

function AccordionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-cream-dark">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-charcoal pr-4 group-hover:text-forest transition-colors duration-200">
          {item.question}
        </span>
        <span className="shrink-0 w-6 h-6 flex items-center justify-center text-charcoal-light">
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>
      <div
        style={{ height }}
        className="overflow-hidden transition-[height] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <div ref={contentRef} className="pb-5 pr-8">
          <p className="text-[15px] leading-relaxed text-charcoal-light">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y-0">
      {items.map((item, i) => (
        <AccordionRow
          key={i}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}