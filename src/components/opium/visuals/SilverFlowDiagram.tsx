import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const SilverFlowDiagram = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="mx-auto max-w-lg">
      <svg viewBox="0 0 500 200" className="w-full" style={{ fontFamily: "'Playfair Display', serif" }}>
        {/* Britain node */}
        <motion.g initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
          <rect x="10" y="70" width="100" height="60" rx="4" fill="hsl(var(--ledger-highlight))" stroke="hsl(var(--ledger-ink) / 0.2)" strokeWidth="1.5" />
          <text x="60" y="95" textAnchor="middle" fill="hsl(var(--ledger-ink))" fontSize="12" fontWeight="700">BRITAIN</text>
          <text x="60" y="115" textAnchor="middle" fill="hsl(var(--ledger-stain) / 0.5)" fontSize="8">Demand: Tea</text>
        </motion.g>

        {/* China node */}
        <motion.g initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
          <rect x="390" y="70" width="100" height="60" rx="4" fill="hsl(var(--ledger-highlight))" stroke="hsl(var(--ledger-ink) / 0.2)" strokeWidth="1.5" />
          <text x="440" y="95" textAnchor="middle" fill="hsl(var(--ledger-ink))" fontSize="12" fontWeight="700">CHINA</text>
          <text x="440" y="115" textAnchor="middle" fill="hsl(var(--ledger-stain) / 0.5)" fontSize="8">Supply: Tea</text>
        </motion.g>

        {/* Silver flow arrow */}
        <defs>
          <marker id="silverArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="hsl(var(--ledger-silver))" />
          </marker>
        </defs>

        {/* Animated silver coins flowing */}
        <motion.g initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}>
          <line x1="115" y1="90" x2="385" y2="90" stroke="hsl(var(--ledger-silver) / 0.3)" strokeWidth="2" markerEnd="url(#silverArrow)" />
          <text x="250" y="82" textAnchor="middle" fill="hsl(var(--ledger-silver))" fontSize="9" fontWeight="600" letterSpacing="0.15em">SILVER →</text>

          {/* Animated coin dots */}
          {[0, 1, 2, 3].map(i => (
            <circle key={i} r="3.5" fill="hsl(var(--ledger-silver))">
              <animateMotion dur="3s" repeatCount="indefinite" begin={`${i * 0.75}s`}>
                <mpath href="#silverPath" />
              </animateMotion>
            </circle>
          ))}
          <path id="silverPath" d="M 115 90 L 385 90" fill="none" stroke="none" />
        </motion.g>

        {/* Tea return arrow */}
        <motion.g initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.2 }}>
          <line x1="385" y1="110" x2="115" y2="110" stroke="hsl(var(--ledger-tea) / 0.3)" strokeWidth="2" markerEnd="url(#silverArrow)" />
          <text x="250" y="128" textAnchor="middle" fill="hsl(var(--ledger-tea))" fontSize="9" fontWeight="600" letterSpacing="0.15em">← TEA</text>
        </motion.g>

        {/* Deficit warning */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
        >
          <rect x="175" y="150" width="150" height="30" rx="3" fill="hsl(var(--ledger-wax) / 0.08)" stroke="hsl(var(--ledger-wax) / 0.3)" strokeWidth="1" />
          <text x="250" y="170" textAnchor="middle" fill="hsl(var(--ledger-wax))" fontSize="9" fontWeight="700">⚠ CHRONIC DEFICIT</text>
        </motion.g>
      </svg>
    </div>
  );
};
