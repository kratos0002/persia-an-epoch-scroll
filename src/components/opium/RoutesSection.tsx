import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { OpiumSectionShell } from './OpiumSectionShell';
import { TRIANGLE_NODES } from './opiumData';

export const RoutesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <OpiumSectionShell id="opium-routes" eyebrow="Monsoons, clippers & plausible deniability" title="Routes & Smuggling" variant="stained">
      <div ref={ref} className="space-y-10">
        <p className="max-w-3xl font-body text-lg leading-relaxed text-ledger-stain/80">
          The physical movement of goods was governed by monsoon winds and the strategic necessity of "plausible deniability." The EIC did not carry opium on its own ships — it sold at auction in Calcutta to "country traders," private merchant firms who handled the illegal last mile.
        </p>

        {/* Trade triangle SVG */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative mx-auto max-w-2xl"
        >
          <svg viewBox="0 0 600 500" className="w-full" style={{ fontFamily: "'Playfair Display', serif" }}>
            {/* Triangle */}
            <motion.polygon
              points="300,60 80,420 520,420"
              fill="none"
              stroke="hsl(var(--ledger-rule))"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5 }}
            />

            {/* Legs with labels */}
            {[
              { x1: 300, y1: 60, x2: 80, y2: 420, label: 'Silver →', color: 'var(--ledger-silver)', lx: 150, ly: 220 },
              { x1: 80, y1: 420, x2: 520, y2: 420, label: 'Opium →', color: 'var(--ledger-resin)', lx: 300, ly: 455 },
              { x1: 520, y1: 420, x2: 300, y2: 60, label: '← Tea', color: 'var(--ledger-tea)', lx: 445, ly: 220 },
            ].map((leg, i) => (
              <motion.text
                key={i}
                x={leg.lx}
                y={leg.ly}
                textAnchor="middle"
                fill={`hsl(${leg.color})`}
                fontSize="13"
                fontWeight="600"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1 + i * 0.3 }}
              >
                {leg.label}
              </motion.text>
            ))}

            {/* Nodes */}
            {TRIANGLE_NODES.slice(0, 3).map((node, i) => {
              const positions = [{ x: 300, y: 42 }, { x: 55, y: 440 }, { x: 545, y: 440 }];
              const pos = positions[i];
              return (
                <g key={node.id}>
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r="8"
                    fill="hsl(var(--ledger-cream))"
                    stroke="hsl(var(--ledger-ink))"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.2 }}
                  />
                  <text x={pos.x} y={pos.y - 16} textAnchor="middle" fill="hsl(var(--ledger-ink))" fontSize="14" fontWeight="700">
                    {node.label}
                  </text>
                </g>
              );
            })}

            {/* Lintin marker */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 2 }}
            >
              <circle cx="480" cy="400" r="5" fill="hsl(var(--ledger-wax))" />
              <text x="480" y="390" textAnchor="middle" fill="hsl(var(--ledger-wax))" fontSize="10" fontWeight="600">
                Lintin Is.
              </text>
              <line x1="480" y1="405" x2="520" y2="420" stroke="hsl(var(--ledger-wax) / 0.4)" strokeWidth="1" strokeDasharray="4 3" />
            </motion.g>
          </svg>
        </motion.div>

        <p className="max-w-3xl font-body text-lg leading-relaxed text-ledger-stain/80">
          At <strong className="text-ledger-wax font-semibold">Lintin Island</strong> in the Pearl River Delta, receiving ships served as "floating warehouses." Chinese smugglers operating "fast crabs" — rowing boats with 30–50 oars — ferried the drug inland, bribing naval officials along the way. This arrangement let the EIC claim it merely sold a "legal agricultural product" in Calcutta.
        </p>
      </div>
    </OpiumSectionShell>
  );
};
