import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { OpiumSectionShell } from './OpiumSectionShell';
import { COMMUTATION_DATA } from './opiumData';

export const CommutationSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const { before, after } = COMMUTATION_DATA;

  return (
    <OpiumSectionShell id="opium-commutation" eyebrow="1784 — The turning point" title="The Commutation Act" variant="clean">
      <div ref={ref} className="space-y-10">
        <p className="max-w-3xl font-body text-lg leading-relaxed text-ledger-stain/80">
          Prior to 1784, tea was taxed at a staggering <strong className="text-ledger-ink font-semibold">119%</strong>, incentivizing massive smuggling. Prime Minister William Pitt the Younger slashed the duty to <strong className="text-ledger-tea font-semibold">12.5%</strong> — eliminating smuggling but transforming tea into an inelastic staple of the British working class.
        </p>

        {/* Before / After ledger comparison */}
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { label: 'Before the Act', data: before, accent: 'text-ledger-silver' },
            { label: 'After the Act', data: after, accent: 'text-ledger-tea' },
          ].map((col, ci) => (
            <motion.div
              key={col.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.2 }}
              className="overflow-hidden border border-ledger-rule/40"
            >
              <div className="border-b border-ledger-rule/30 bg-ledger-highlight px-5 py-3">
                <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-ledger-stain/60">{col.label}</span>
              </div>
              <div className="bg-ledger-cream/80 p-5 space-y-4">
                <div>
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-ledger-stain/50">Tax Rate</p>
                  <p className={`font-display text-3xl font-bold ${col.accent}`}>{col.data.taxRate}%</p>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-ledger-stain/50">EIC Tea Imports (decade, M lbs)</p>
                  <p className="font-display text-2xl font-bold text-ledger-ink">{col.data.teaImports}</p>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-ledger-stain/50">Foreign Competitor Imports (M lbs)</p>
                  <p className="font-display text-2xl font-bold text-ledger-ink">{col.data.foreignImports}</p>
                </div>
                {'revenue' in col.data && (
                  <div>
                    <p className="font-body text-xs uppercase tracking-[0.2em] text-ledger-stain/50">Government Revenue (by 1800)</p>
                    <p className="font-display text-xl font-bold text-ledger-tea">{(col.data as any).revenue}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <p className="max-w-3xl font-body text-lg leading-relaxed text-ledger-stain/80">
          By 1800, tea duties provided nearly <strong className="text-ledger-ink font-semibold">28%</strong> of all British customs revenue. The government could not afford a disruption — yet the escalating deficit demanded an alternative to silver. The EIC's solution: leverage its monopoly over Bengal's opium to create a self-sustaining triangular trade.
        </p>
      </div>
    </OpiumSectionShell>
  );
};
