import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedChestCounterProps {
  target: number;
  duration?: number;
  label?: string;
}

export const AnimatedChestCounter = ({ target, duration = 3, label }: AnimatedChestCounterProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const end = start + duration * 1000;

    const tick = () => {
      const now = Date.now();
      const progress = Math.min((now - start) / (duration * 1000), 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return (
    <div ref={ref} className="text-center">
      <motion.p
        className="font-display text-6xl font-bold tabular-nums text-ledger-wax md:text-7xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        {count.toLocaleString()}
      </motion.p>
      {label && (
        <p className="mt-1 font-body text-sm text-ledger-stain/60">{label}</p>
      )}
    </div>
  );
};
