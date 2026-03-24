import React from 'react';
import { motion } from 'framer-motion';
import { TRADE_TIMELINE } from '@/components/opium/opiumData';

export const OpiumHero = () => {
  const lastRow = TRADE_TIMELINE[TRADE_TIMELINE.length - 1];

  return (
    <section id="opium-hero" className="ledger-bg ledger-grain relative overflow-hidden px-4 pt-24 pb-20 md:px-6 md:pt-32 md:pb-28">
      {/* Ruled lines background */}
      <div className="ledger-ruled absolute inset-0 opacity-40" />

      {/* Faint trade triangle watermark */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.04]" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice">
        <polygon points="500,80 150,650 850,650" fill="none" stroke="hsl(var(--ledger-ink))" strokeWidth="2" />
        <text x="500" y="60" textAnchor="middle" fill="hsl(var(--ledger-ink))" fontSize="14" fontFamily="serif">LONDON</text>
        <text x="130" y="690" textAnchor="middle" fill="hsl(var(--ledger-ink))" fontSize="14" fontFamily="serif">CALCUTTA</text>
        <text x="870" y="690" textAnchor="middle" fill="hsl(var(--ledger-ink))" fontSize="14" fontFamily="serif">CANTON</text>
      </svg>

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="ledger-chip">1757–1842</span>
          <span className="ledger-chip">Tea · Silver · Opium</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="ledger-title text-5xl leading-[0.92] md:text-7xl lg:text-8xl"
        >
          The Mercantilist Pivot
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-5 max-w-2xl font-body text-xl leading-relaxed text-ledger-stain/80"
        >
          How the British Empire resolved its chronic silver deficit by converting Indian poppy fields into the most profitable narcotics operation in history — dressed up as bookkeeping.
        </motion.p>

        {/* Ledger-style opening data */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 overflow-hidden border border-ledger-rule/40"
        >
          <div className="flex items-center border-b border-ledger-rule/30 bg-ledger-highlight px-5 py-3">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-ledger-stain/60">
              Account Summary — East India Company China Trade
            </span>
          </div>
          <div className="ledger-ruled bg-ledger-cream/80">
            <table className="w-full font-body text-sm">
              <thead>
                <tr className="border-b-2 border-ledger-ink/15 text-left">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ledger-stain/60">Year</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ledger-stain/60">Tea (lbs)</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ledger-stain/60">Opium (chests)</th>
                  <th className="hidden px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ledger-stain/60 md:table-cell">Silver Flow</th>
                </tr>
              </thead>
              <tbody>
                {TRADE_TIMELINE.map((row, i) => (
                  <motion.tr
                    key={row.year}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                    className="border-b border-ledger-rule/20 transition-colors hover:bg-ledger-tea/5"
                  >
                    <td className="px-5 py-2.5 font-display font-bold text-ledger-ink">{row.year}</td>
                    <td className="px-5 py-2.5 tabular-nums text-ledger-tea">{(row.tea / 1_000_000).toFixed(0)}M</td>
                    <td className="px-5 py-2.5 tabular-nums text-ledger-resin">{row.opium.toLocaleString()}</td>
                    <td className="hidden px-5 py-2.5 text-ledger-silver md:table-cell">{row.silverDir}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-6 text-center font-body text-sm italic text-ledger-stain/50"
        >
          Scroll to open the ledger ↓
        </motion.p>
      </div>
    </section>
  );
};
