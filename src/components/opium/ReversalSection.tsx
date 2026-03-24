import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { OpiumSectionShell } from './OpiumSectionShell';

export const ReversalSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <OpiumSectionShell id="opium-reversal" eyebrow="1819 — The tipping point" title="The Reversal of Flow" variant="corrupted">
      <div ref={ref} className="space-y-10">
        <p className="max-w-3xl font-body text-lg leading-relaxed text-ledger-stain/80">
          The year <strong className="text-ledger-resin font-semibold">1819</strong> is widely cited as the point at which the trade balance tipped. For the first time, the value of opium smuggled into China exceeded the value of tea exported. Silver began to flow <em>out</em> of China.
        </p>

        {/* Balance scale visual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative mx-auto max-w-lg"
        >
          <svg viewBox="0 0 500 300" className="w-full" style={{ fontFamily: "'Playfair Display', serif" }}>
            {/* Fulcrum */}
            <polygon points="250,280 230,300 270,300" fill="hsl(var(--ledger-ink))" />
            <line x1="250" y1="130" x2="250" y2="280" stroke="hsl(var(--ledger-ink))" strokeWidth="3" />

            {/* Beam — tilted */}
            <motion.line
              x1="80" y1="160" x2="420" y2="100"
              stroke="hsl(var(--ledger-ink))"
              strokeWidth="3"
              initial={{ rotate: 0 }}
              animate={inView ? { rotate: 0 } : {}}
            />

            {/* Tea side (higher = lighter) */}
            <rect x="50" y="100" width="80" height="60" rx="2" fill="hsl(var(--ledger-tea) / 0.15)" stroke="hsl(var(--ledger-tea))" strokeWidth="1.5" />
            <text x="90" y="125" textAnchor="middle" fill="hsl(var(--ledger-tea))" fontSize="11" fontWeight="700">TEA</text>
            <text x="90" y="145" textAnchor="middle" fill="hsl(var(--ledger-tea) / 0.7)" fontSize="9">£ value</text>

            {/* Opium side (lower = heavier) */}
            <rect x="380" y="60" width="80" height="60" rx="2" fill="hsl(var(--ledger-resin) / 0.2)" stroke="hsl(var(--ledger-resin))" strokeWidth="1.5" />
            <text x="420" y="85" textAnchor="middle" fill="hsl(var(--ledger-resin))" fontSize="11" fontWeight="700">OPIUM</text>
            <text x="420" y="105" textAnchor="middle" fill="hsl(var(--ledger-resin) / 0.7)" fontSize="9">£ value</text>

            {/* Arrow showing silver reversal */}
            <motion.g initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.2 }}>
              <text x="250" y="50" textAnchor="middle" fill="hsl(var(--ledger-silver))" fontSize="11" fontWeight="600">
                Silver now flows: China → Britain
              </text>
              <line x1="320" y1="60" x2="180" y2="60" stroke="hsl(var(--ledger-silver))" strokeWidth="1.5" markerEnd="url(#arrowSilver)" />
              <defs>
                <marker id="arrowSilver" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="hsl(var(--ledger-silver))" />
                </marker>
              </defs>
            </motion.g>
          </svg>
        </motion.div>

        <p className="max-w-3xl font-body text-lg leading-relaxed text-ledger-stain/80">
          The social impact was catastrophic. By the 1830s, an estimated <strong className="text-ledger-resin font-semibold">10% of the Chinese population</strong> was addicted. The silver outflow caused a sharp appreciation of silver relative to copper cash — the currency of the peasantry — effectively <strong className="text-ledger-wax font-semibold">doubling the tax burden on the poor</strong> and leading to the "Daoguang Depression."
        </p>
      </div>
    </OpiumSectionShell>
  );
};
