import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { OpiumSectionShell } from './OpiumSectionShell';
import { SILVER_FLOW_DATA, SILVER_DIRECTION } from './opiumData';
import { BullionThermometer } from './visuals/BullionThermometer';

export const SilverDrainSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <OpiumSectionShell id="opium-silver-drain" eyebrow="The foundational crisis" title="The Silver Drain" variant="clean">
      <div ref={ref} className="space-y-10">
        <p className="max-w-3xl font-body text-lg leading-relaxed text-ledger-stain/80">
          Under the restrictive Canton System established in 1757, the Qing Empire limited all foreign maritime trade to Guangzhou. The primary commodity sought by Britain was tea — but China had little demand for British goods. The resulting imbalance necessitated massive silver exports: between the mid-17th and early 19th centuries, China received an estimated <strong className="text-ledger-silver font-semibold">28 million kilograms</strong> of silver from European powers.
        </p>

        {/* Two-column: table + thermometer */}
        <div className="grid gap-8 md:grid-cols-[1fr,auto]">
          {/* Silver flow ledger */}
          <div className="overflow-hidden border border-ledger-rule/40">
            <div className="flex items-center border-b border-ledger-rule/30 bg-ledger-highlight px-5 py-3">
              <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-ledger-stain/60">
                Bullion Inflow to China — By Period
              </span>
            </div>
            <div className="bg-ledger-cream/80">
              <table className="w-full font-body text-sm">
                <thead>
                  <tr className="border-b-2 border-ledger-ink/15 text-left">
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ledger-stain/60">Period</th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ledger-stain/60">Volume</th>
                    <th className="hidden px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ledger-stain/60 md:table-cell">Carrier</th>
                  </tr>
                </thead>
                <tbody>
                  {SILVER_FLOW_DATA.map((row, i) => (
                    <motion.tr
                      key={row.period}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: i * 0.12 }}
                      className="border-b border-ledger-rule/20"
                    >
                      <td className="px-5 py-2.5 font-display font-bold text-ledger-ink">{row.period}</td>
                      <td className="px-5 py-2.5 tabular-nums text-ledger-silver">
                        {row.tons ? `${(row.tons / 1000).toLocaleString()}k MT` : ('value' in row ? (row as any).value : '—')}
                      </td>
                      <td className="hidden px-5 py-2.5 text-ledger-stain/70 md:table-cell">{row.carrier}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bullion thermometer */}
          <BullionThermometer />
        </div>

        <p className="max-w-3xl font-body text-lg leading-relaxed text-ledger-stain/80">
          The problem was exacerbated by specific monetary preferences: the Qing market demanded Spanish <em>"Carolus" dollars</em>, valued for consistent weight and fineness. As these coins grew rare following Spanish American independence wars, the cost of procuring "treasure" for the tea trade skyrocketed — creating a <strong className="text-ledger-wax font-semibold">bullion famine</strong> that threatened the solvency of the East India Company.
        </p>

        {/* Silver flow direction */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SILVER_DIRECTION.map((item, i) => (
            <motion.div
              key={item.period}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="ledger-panel p-4"
            >
              <p className="font-display text-sm font-bold text-ledger-ink">{item.period}</p>
              <p className="mt-1 font-body text-xs text-ledger-stain/60">{item.context}</p>
              <p className="mt-2 font-display text-sm font-semibold text-ledger-tea">{item.dir}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </OpiumSectionShell>
  );
};
