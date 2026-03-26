import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { OpiumSectionShell } from './OpiumSectionShell';
import { TREATY_TERMS } from './opiumData';
import { TreatyPortsMap } from './visuals/TreatyPortsMap';
import { WaxSeal } from './visuals/WaxSeal';

export const TreatySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <OpiumSectionShell id="opium-treaty" eyebrow="1842 — The new imperial order" title="The Treaty of Nanking" variant="contract">
      <div ref={ref} className="space-y-10">
        <p className="max-w-3xl font-body text-lg leading-relaxed text-ledger-stain/80">
          The British naval expeditionary force — utilizing technologically superior steam-powered gunboats like the <em>Nemesis</em> — easily bypassed Qing coastal forts and blockaded the Grand Canal. The war concluded with the Treaty of Nanking, the first of the "Unequal Treaties."
        </p>

        {/* Treaty terms as contract document */}
        <div className="relative overflow-hidden ledger-document">
          {/* Seal */}
          <div className="absolute -top-3 -right-2">
            <WaxSeal text="EIC" size={52} />
          </div>

          <div className="border-b-2 border-ledger-ink/15 pb-4 mb-6">
            <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-ledger-ink">
              Treaty of Nanking — Principal Terms
            </p>
            <p className="mt-1 font-body text-xs text-ledger-stain/50">Signed 29 August 1842, aboard HMS Cornwallis</p>
          </div>

          {TREATY_TERMS.map((item, i) => (
            <motion.div
              key={item.term}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.12 }}
              className="flex gap-4 border-b border-ledger-rule/25 py-4 last:border-b-0"
            >
              <span className="mt-0.5 font-display text-xs font-bold text-ledger-rule tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="font-display text-base font-bold text-ledger-ink">{item.term}</p>
                <p className="mt-0.5 font-body text-sm text-ledger-stain/70">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Treaty ports map */}
        <TreatyPortsMap />

        {/* Indemnity highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1 }}
          className="mx-auto max-w-sm border border-ledger-silver/30 bg-ledger-highlight p-6 text-center"
        >
          <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-ledger-silver">Total Indemnity</p>
          <p className="mt-2 font-display text-4xl font-bold text-ledger-ink">21,000,000</p>
          <p className="font-body text-sm text-ledger-silver">silver dollars</p>
        </motion.div>

        <p className="max-w-3xl font-body text-lg leading-relaxed text-ledger-stain/80">
          The settlement did not initially legalize opium, but removed the Qing government's ability to enforce prohibition. By the mid-1840s, the illicit trade reached new heights. The British Empire had successfully transformed a consumer luxury — tea — into a tool of economic and political dominance, forever altering the trajectory of East Asian history.
        </p>
      </div>
    </OpiumSectionShell>
  );
};
