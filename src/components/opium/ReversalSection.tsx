import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { OpiumSectionShell } from './OpiumSectionShell';
import { BalanceScale } from './visuals/BalanceScale';

export const ReversalSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <OpiumSectionShell id="opium-reversal" eyebrow="1819 — The tipping point" title="The Reversal of Flow" variant="corrupted">
      <div ref={ref} className="space-y-10">
        <p className="max-w-3xl font-body text-lg leading-relaxed text-ledger-stain/80">
          The year <strong className="text-ledger-resin font-semibold">1819</strong> is widely cited as the point at which the trade balance tipped. For the first time, the value of opium smuggled into China exceeded the value of tea exported. Silver began to flow <em>out</em> of China.
        </p>

        {/* Animated balance scale */}
        <BalanceScale />

        <p className="max-w-3xl font-body text-lg leading-relaxed text-ledger-stain/80">
          The social impact was catastrophic. By the 1830s, an estimated <strong className="text-ledger-resin font-semibold">10% of the Chinese population</strong> was addicted. The silver outflow caused a sharp appreciation of silver relative to copper cash — the currency of the peasantry — effectively <strong className="text-ledger-wax font-semibold">doubling the tax burden on the poor</strong> and leading to the "Daoguang Depression."
        </p>
      </div>
    </OpiumSectionShell>
  );
};
