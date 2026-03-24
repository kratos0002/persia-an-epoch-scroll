import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { OpiumSectionShell } from './OpiumSectionShell';
import { FACTORY_STEPS } from './opiumData';

export const FactoriesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <OpiumSectionShell id="opium-factories" eyebrow="Patna & Ghazipur" title="The Industrialization of Opium" variant="stained">
      <div ref={ref} className="space-y-10">
        <p className="max-w-3xl font-body text-lg leading-relaxed text-ledger-stain/80">
          Following the acquisition of the <em>Diwani</em> in Bengal in 1765, the EIC seized control of opium production. Over <strong className="text-ledger-resin font-semibold">1.5 million</strong> peasant cultivators in the Ganges plains were tethered to the state through an advance system — cash paid upfront to ensure the monopoly.
        </p>

        {/* Factory process as blueprint steps */}
        <div className="relative ledger-margin-left space-y-0">
          {FACTORY_STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.12 }}
              className="relative border-b border-ledger-rule/25 py-5 last:border-b-0"
            >
              {/* Step number marker */}
              <div
                className="absolute -left-[2.55rem] top-5 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  background: `hsl(var(--ledger-resin) / ${0.1 + i * 0.08})`,
                  color: 'hsl(var(--ledger-resin))',
                  border: '1px solid hsl(var(--ledger-resin) / 0.3)',
                }}
              >
                {step.step}
              </div>

              <h3 className="font-display text-lg font-bold text-ledger-ink">{step.name}</h3>
              <p className="mt-1 font-body text-base leading-relaxed text-ledger-stain/75">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <p className="max-w-3xl font-body text-lg leading-relaxed text-ledger-stain/80">
          By the late 1870s, the system produced over <strong className="text-ledger-resin font-semibold">100,000 chests annually</strong>, with revenue providing roughly 15% of total income for British India. The precision of the manufacturing process — quality control, standardized weights, branded product — was applied with the same rigour as any Victorian industrial operation.
        </p>
      </div>
    </OpiumSectionShell>
  );
};
