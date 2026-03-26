import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const PORTS = [
  { name: 'Canton', x: 230, y: 310 },
  { name: 'Amoy', x: 280, y: 250 },
  { name: 'Fuchow', x: 310, y: 210 },
  { name: 'Ningpo', x: 340, y: 170 },
  { name: 'Shanghai', x: 365, y: 140 },
];

const HONG_KONG = { name: 'Hong Kong', x: 215, y: 320 };

export const TreatyPortsMap = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="mx-auto max-w-md">
      <svg viewBox="0 0 500 400" className="w-full" style={{ fontFamily: "'Playfair Display', serif" }}>
        {/* Simplified China coast */}
        <motion.path
          d="M 400 60 Q 380 100 370 130 Q 350 160 340 180 Q 320 210 300 240 Q 280 260 260 280 Q 240 300 220 320 Q 200 340 180 360"
          fill="none"
          stroke="hsl(var(--ledger-ink) / 0.3)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5 }}
        />

        {/* Land area hint */}
        <motion.path
          d="M 400 60 L 450 40 L 480 80 L 470 140 L 440 200 L 410 250 L 380 300 L 350 340 L 300 360 L 250 370 L 200 380 L 180 360 Q 200 340 220 320 Q 240 300 260 280 Q 280 260 300 240 Q 320 210 340 180 Q 350 160 370 130 Q 380 100 400 60"
          fill="hsl(var(--ledger-stain) / 0.05)"
          stroke="none"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        />

        {/* Sea */}
        <text x="120" y="200" fill="hsl(var(--ledger-silver) / 0.2)" fontSize="16" fontStyle="italic" letterSpacing="0.3em">
          SOUTH
        </text>
        <text x="100" y="220" fill="hsl(var(--ledger-silver) / 0.2)" fontSize="16" fontStyle="italic" letterSpacing="0.3em">
          CHINA SEA
        </text>

        {/* Treaty ports */}
        {PORTS.map((port, i) => (
          <motion.g
            key={port.name}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.5 + i * 0.2, type: 'spring' }}
          >
            <circle cx={port.x} cy={port.y} r="5" fill="hsl(var(--ledger-tea))" />
            <circle cx={port.x} cy={port.y} r="10" fill="none" stroke="hsl(var(--ledger-tea) / 0.3)" strokeWidth="1" />
            <text x={port.x - 45} y={port.y + 4} textAnchor="end" fill="hsl(var(--ledger-ink))" fontSize="10" fontWeight="600">
              {port.name}
            </text>
          </motion.g>
        ))}

        {/* Hong Kong — special marker */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 2.8, type: 'spring' }}
        >
          <circle cx={HONG_KONG.x} cy={HONG_KONG.y} r="6" fill="hsl(var(--ledger-wax))" />
          <circle cx={HONG_KONG.x} cy={HONG_KONG.y} r="12" fill="none" stroke="hsl(var(--ledger-wax) / 0.3)" strokeWidth="1.5" strokeDasharray="3 2">
            <animate attributeName="r" values="12;18;12" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
          </circle>
          <text x={HONG_KONG.x - 8} y={HONG_KONG.y + 22} fill="hsl(var(--ledger-wax))" fontSize="9" fontWeight="700" letterSpacing="0.05em">
            HONG KONG
          </text>
          <text x={HONG_KONG.x - 8} y={HONG_KONG.y + 33} fill="hsl(var(--ledger-wax) / 0.6)" fontSize="7" fontStyle="italic">
            Ceded to Britain
          </text>
        </motion.g>

        {/* Title cartouche */}
        <motion.g initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
          <rect x="20" y="20" width="160" height="45" rx="2" fill="hsl(var(--ledger-cream))" stroke="hsl(var(--ledger-rule) / 0.4)" strokeWidth="1" />
          <text x="100" y="38" textAnchor="middle" fill="hsl(var(--ledger-ink))" fontSize="8" fontWeight="700" letterSpacing="0.2em">
            TREATY PORTS
          </text>
          <text x="100" y="52" textAnchor="middle" fill="hsl(var(--ledger-stain) / 0.5)" fontSize="7" fontStyle="italic">
            Treaty of Nanking, 1842
          </text>
        </motion.g>
      </svg>
    </div>
  );
};
