'use client';

import { useReveal } from '@/hooks/useReveal';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
}

export default function Reveal({ children, delay = 0 }: RevealProps) {
  const ref = useReveal(delay);

  return (
    <div ref={ref} className="opacity-0 translate-y-8 transition-all duration-700">
      {children}
    </div>
  );
}