import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface WaxSealProps {
  text?: string;
  size?: number;
}

export const WaxSeal = ({ text = 'EIC', size = 64 }: WaxSealProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0, rotate: -30 }}
      animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ type: 'spring', stiffness: 150, damping: 15, delay: 0.3 }}
      className="inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 80 80" className="h-full w-full">
        {/* Wax blob */}
        <circle cx="40" cy="40" r="36" fill="hsl(var(--ledger-wax))" />
        <circle cx="40" cy="40" r="36" fill="none" stroke="hsl(var(--ledger-wax))" strokeWidth="2" opacity="0.6" />
        {/* Irregular edge */}
        <circle cx="40" cy="40" r="33" fill="none" stroke="hsl(0 67% 38% / 0.3)" strokeWidth="3" strokeDasharray="4 2 8 3" />
        {/* Inner ring */}
        <circle cx="40" cy="40" r="26" fill="none" stroke="hsl(0 67% 42%)" strokeWidth="1" opacity="0.5" />
        {/* Text */}
        <text x="40" y="45" textAnchor="middle" fill="hsl(0 67% 22%)" fontSize="14" fontWeight="700" fontFamily="'Playfair Display', serif" letterSpacing="0.1em">
          {text}
        </text>
      </svg>
    </motion.div>
  );
};
