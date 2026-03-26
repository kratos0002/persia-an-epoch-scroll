import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FACTORY_STEPS } from '../opiumData';

const STEP_ICONS: Record<number, React.ReactNode> = {
  1: <><rect x="2" y="6" width="16" height="12" rx="1" stroke="currentColor" fill="none" strokeWidth="1.5" /><line x1="6" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="1" /><line x1="6" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="1" /></>,
  2: <><circle cx="10" cy="10" r="7" stroke="currentColor" fill="none" strokeWidth="1.5" /><path d="M7 10 Q10 6 13 10 Q10 14 7 10" stroke="currentColor" fill="none" strokeWidth="1" /></>,
  3: <><circle cx="10" cy="10" r="6" stroke="currentColor" fill="none" strokeWidth="1.5" /><circle cx="10" cy="10" r="3" stroke="currentColor" fill="currentColor" fillOpacity="0.2" strokeWidth="1" /></>,
  4: <><rect x="3" y="4" width="14" height="14" rx="1" stroke="currentColor" fill="none" strokeWidth="1.5" /><line x1="3" y1="8" x2="17" y2="8" stroke="currentColor" strokeWidth="0.8" /><line x1="3" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="0.8" /><line x1="3" y1="16" x2="17" y2="16" stroke="currentColor" strokeWidth="0.8" /></>,
  5: <><rect x="3" y="6" width="14" height="10" rx="1" stroke="currentColor" fill="none" strokeWidth="1.5" /><line x1="3" y1="6" x2="10" y2="2" stroke="currentColor" strokeWidth="1" /><line x1="17" y1="6" x2="10" y2="2" stroke="currentColor" strokeWidth="1" /></>,
};

export const FactoryBlueprint = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="relative mx-auto max-w-3xl">
      {/* Blueprint frame */}
      <div className="overflow-hidden border-2 border-ledger-resin/20 bg-ledger-cream/90">
        <div className="border-b border-ledger-resin/15 bg-ledger-resin/5 px-5 py-3">
          <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-ledger-resin/70">
            ✦ Cross-Section — Ghazipur Opium Factory — c. 1850 ✦
          </p>
        </div>

        {/* Process flow */}
        <div className="relative px-6 py-8">
          {/* Connecting line */}
          <motion.div
            className="absolute left-1/2 top-8 bottom-8 w-px -translate-x-1/2 md:left-12 md:top-12 md:bottom-12"
            style={{ background: `hsl(var(--ledger-resin) / 0.2)` }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5 }}
          />

          <div className="space-y-0">
            {FACTORY_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.25, duration: 0.6 }}
                className="group relative flex gap-5 py-5"
              >
                {/* Step icon */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded border text-ledger-resin"
                    style={{
                      background: `hsl(var(--ledger-cream))`,
                      borderColor: `hsl(var(--ledger-resin) / ${0.15 + i * 0.1})`,
                      boxShadow: `0 0 ${8 + i * 4}px hsl(var(--ledger-resin) / ${0.03 + i * 0.02})`,
                    }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <svg viewBox="0 0 20 20" className="h-6 w-6">
                      {STEP_ICONS[step.step]}
                    </svg>
                  </motion.div>
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-ledger-resin font-body text-[0.55rem] font-bold text-ledger-cream">
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h4 className="font-display text-base font-bold text-ledger-ink">{step.name}</h4>
                  <p className="mt-1 font-body text-sm leading-relaxed text-ledger-stain/70">{step.desc}</p>

                  {/* Stain intensity bar */}
                  <motion.div
                    className="mt-3 h-1 origin-left rounded-full"
                    style={{ background: `hsl(var(--ledger-resin) / ${0.1 + i * 0.12})` }}
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.25, duration: 0.8 }}
                  />
                </div>

                {/* Arrow connector */}
                {i < FACTORY_STEPS.length - 1 && (
                  <motion.div
                    className="absolute bottom-0 left-7 text-ledger-resin/30"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + i * 0.25 }}
                  >
                    ↓
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Output marker */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2 }}
            className="mt-4 border-t-2 border-ledger-resin/20 pt-4 text-center"
          >
            <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-ledger-resin/60">Output</p>
            <p className="mt-1 font-display text-2xl font-bold text-ledger-resin">100,000 chests/year</p>
            <p className="mt-0.5 font-body text-xs text-ledger-stain/50">by the late 1870s — 15% of British India's revenue</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
