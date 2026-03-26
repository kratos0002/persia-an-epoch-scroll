import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const TaxCollapseChart = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const maxRate = 119;
  const beforeH = 85; // percent of bar height
  const afterH = (12.5 / maxRate) * 85;

  return (
    <div ref={ref} className="mx-auto max-w-sm">
      <p className="mb-4 text-center font-body text-xs font-semibold uppercase tracking-[0.3em] text-ledger-stain/50">
        Tea Duty — Before & After
      </p>
      <div className="flex items-end justify-center gap-12">
        {/* Before bar */}
        <div className="flex flex-col items-center">
          <motion.div
            className="w-16 rounded-t border border-ledger-silver/30"
            style={{ background: `hsl(var(--ledger-silver) / 0.3)` }}
            initial={{ height: 0 }}
            animate={inView ? { height: `${beforeH * 2.2}px` } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          <p className="mt-2 font-display text-2xl font-bold text-ledger-silver">119%</p>
          <p className="font-body text-xs text-ledger-stain/50">Before 1784</p>
        </div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="mb-8 font-display text-xl text-ledger-stain/30"
        >
          →
        </motion.div>

        {/* After bar */}
        <div className="flex flex-col items-center">
          <motion.div
            className="w-16 rounded-t border border-ledger-tea/40"
            style={{ background: `hsl(var(--ledger-tea) / 0.4)` }}
            initial={{ height: 0 }}
            animate={inView ? { height: `${afterH * 2.2}px` } : {}}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          />
          <p className="mt-2 font-display text-2xl font-bold text-ledger-tea">12.5%</p>
          <p className="font-body text-xs text-ledger-stain/50">After 1784</p>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.8 }}
        className="mt-6 text-center font-body text-xs italic text-ledger-tea/70"
      >
        Demand surged 320% within a decade
      </motion.p>
    </div>
  );
};
