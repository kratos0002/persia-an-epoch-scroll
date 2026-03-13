import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const GEIGER = 'hsl(140, 70%, 45%)';

interface WarheadCounterProps {
  nation: string;
  count: number;
  color?: string;
}

export const WarheadCounter = ({ nation, count, color = GEIGER }: WarheadCounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const duration = 1500;
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(count * eased));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, count]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl md:text-4xl font-bold" style={{ color }}>
        {display.toLocaleString()}
      </div>
      <div className="text-xs font-body mt-1" style={{ color: 'hsl(200, 10%, 50%)' }}>
        {nation}
      </div>
    </div>
  );
};
