import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ERAS = [
  { label: '1700', level: 85, color: 'var(--ledger-silver)' },
  { label: '1760', level: 70, color: 'var(--ledger-silver)' },
  { label: '1785', level: 50, color: 'var(--ledger-tea)' },
  { label: '1810', level: 30, color: 'var(--ledger-tea)' },
  { label: '1830', level: 10, color: 'var(--ledger-resin)' },
  { label: '1839', level: 3, color: 'var(--ledger-wax)' },
];

export const BullionThermometer = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="mx-auto max-w-xs">
      <p className="mb-3 text-center font-body text-xs font-semibold uppercase tracking-[0.3em] text-ledger-stain/50">
        British Silver Reserves
      </p>
      <div className="relative mx-auto h-72 w-16 overflow-hidden rounded-full border-2 border-ledger-rule/50 bg-ledger-highlight">
        {/* Fill */}
        <motion.div
          className="absolute inset-x-0 bottom-0 rounded-b-full"
          style={{
            background: `linear-gradient(180deg, hsl(var(--ledger-silver) / 0.6), hsl(var(--ledger-silver)))`,
          }}
          initial={{ height: '85%' }}
          animate={inView ? { height: '3%' } : { height: '85%' }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />

        {/* Notch marks */}
        {[20, 40, 60, 80].map(pct => (
          <div
            key={pct}
            className="absolute right-0 h-px w-3 bg-ledger-rule/40"
            style={{ bottom: `${pct}%` }}
          />
        ))}
      </div>

      {/* Era labels */}
      <div className="mt-4 flex justify-between font-body text-[0.6rem] text-ledger-stain/50">
        {ERAS.filter((_, i) => i % 2 === 0).map(era => (
          <span key={era.label}>{era.label}</span>
        ))}
      </div>
      <p className="mt-2 text-center font-body text-xs italic text-ledger-wax/70">
        Bullion famine by 1830s
      </p>
    </div>
  );
};
