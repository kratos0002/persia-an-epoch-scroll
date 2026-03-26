import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const NODES = [
  { id: 'london', label: 'LONDON', x: 300, y: 55, sub: 'Silver & Manufactures' },
  { id: 'calcutta', label: 'CALCUTTA', x: 65, y: 430, sub: 'Opium & Cotton' },
  { id: 'canton', label: 'CANTON', x: 535, y: 430, sub: 'Tea & Silk' },
];

const LEGS = [
  { x1: 300, y1: 80, x2: 90, y2: 410, commodity: 'SILVER', color: 'var(--ledger-silver)', midX: 160, midY: 230, rot: 55 },
  { x1: 100, y1: 445, x2: 510, y2: 445, commodity: 'OPIUM', color: 'var(--ledger-resin)', midX: 300, midY: 470, rot: 0 },
  { x1: 530, y1: 410, x2: 310, y2: 80, commodity: 'TEA', color: 'var(--ledger-tea)', midX: 445, midY: 230, rot: -55 },
];

export const TradeTriangleMap = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="relative mx-auto max-w-2xl">
      {/* Maritime chart frame */}
      <div className="ledger-document overflow-hidden">
        <p className="mb-4 text-center font-body text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-ledger-stain/40">
          ✦ Chart of the Triangular Trade — c. 1820 ✦
        </p>
        <svg viewBox="0 0 600 520" className="w-full" style={{ fontFamily: "'Playfair Display', serif" }}>
          {/* Compass rose */}
          <g transform="translate(540, 70)" opacity="0.15">
            <circle r="25" fill="none" stroke="hsl(var(--ledger-ink))" strokeWidth="0.5" />
            <line x1="0" y1="-30" x2="0" y2="30" stroke="hsl(var(--ledger-ink))" strokeWidth="0.5" />
            <line x1="-30" y1="0" x2="30" y2="0" stroke="hsl(var(--ledger-ink))" strokeWidth="0.5" />
            <text y="-32" textAnchor="middle" fontSize="8" fill="hsl(var(--ledger-ink))">N</text>
          </g>

          {/* Depth sounding dots */}
          {Array.from({ length: 20 }).map((_, i) => (
            <circle
              key={i}
              cx={80 + Math.random() * 440}
              cy={120 + Math.random() * 280}
              r="1"
              fill={`hsl(var(--ledger-rule) / ${0.15 + Math.random() * 0.15})`}
            />
          ))}

          {/* Trade legs with animated dashes */}
          {LEGS.map((leg, i) => (
            <g key={leg.commodity}>
              {/* Static line */}
              <motion.line
                x1={leg.x1} y1={leg.y1} x2={leg.x2} y2={leg.y2}
                stroke={`hsl(${leg.color} / 0.3)`}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.3 }}
              />
              {/* Animated flowing dashes */}
              <line
                x1={leg.x1} y1={leg.y1} x2={leg.x2} y2={leg.y2}
                stroke={`hsl(${leg.color})`}
                strokeWidth="2"
                strokeDasharray="8 12"
                strokeDashoffset="0"
                opacity={inView ? 0.7 : 0}
              >
                <animate attributeName="stroke-dashoffset" from="0" to="-40" dur="2s" repeatCount="indefinite" />
              </line>

              {/* Commodity label */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.2 + i * 0.3 }}
              >
                <rect
                  x={leg.midX - 30} y={leg.midY - 10}
                  width="60" height="18" rx="2"
                  fill="hsl(var(--ledger-cream))"
                  stroke={`hsl(${leg.color} / 0.3)`}
                  strokeWidth="0.5"
                />
                <text
                  x={leg.midX} y={leg.midY + 3}
                  textAnchor="middle"
                  fill={`hsl(${leg.color})`}
                  fontSize="9"
                  fontWeight="700"
                  letterSpacing="0.1em"
                >
                  {leg.commodity}
                </text>
              </motion.g>
            </g>
          ))}

          {/* City nodes */}
          {NODES.map((node, i) => (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.15, type: 'spring' }}
            >
              <circle cx={node.x} cy={node.y} r="6" fill="hsl(var(--ledger-ink))" />
              <circle cx={node.x} cy={node.y} r="3" fill="hsl(var(--ledger-cream))" />
              <text x={node.x} y={node.y - 14} textAnchor="middle" fill="hsl(var(--ledger-ink))" fontSize="13" fontWeight="700" letterSpacing="0.08em">
                {node.label}
              </text>
              <text x={node.x} y={node.y + 20} textAnchor="middle" fill="hsl(var(--ledger-stain) / 0.5)" fontSize="8" fontStyle="italic">
                {node.sub}
              </text>
            </motion.g>
          ))}

          {/* Lintin Island */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 2.5 }}
          >
            <circle cx="490" cy="400" r="4" fill="hsl(var(--ledger-wax))" opacity="0.8" />
            <circle cx="490" cy="400" r="10" fill="none" stroke="hsl(var(--ledger-wax))" strokeWidth="1" strokeDasharray="3 3" opacity="0.4">
              <animate attributeName="r" values="10;16;10" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.15;0.4" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="490" y="385" textAnchor="middle" fill="hsl(var(--ledger-wax))" fontSize="8" fontWeight="600">LINTIN IS.</text>
            <text x="490" y="420" textAnchor="middle" fill="hsl(var(--ledger-wax) / 0.5)" fontSize="7" fontStyle="italic">Smuggling Depot</text>
          </motion.g>

          {/* Monsoon arrows */}
          <defs>
            <marker id="windArrow" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
              <polygon points="0 0, 6 2, 0 4" fill="hsl(var(--ledger-rule) / 0.4)" />
            </marker>
          </defs>
          <motion.g initial={{ opacity: 0 }} animate={inView ? { opacity: 0.35 } : {}} transition={{ delay: 2 }}>
            <line x1="180" y1="350" x2="280" y2="340" stroke="hsl(var(--ledger-rule))" strokeWidth="1" markerEnd="url(#windArrow)" />
            <text x="230" y="330" textAnchor="middle" fill="hsl(var(--ledger-rule))" fontSize="7" fontStyle="italic">SW Monsoon</text>
            <line x1="400" y1="350" x2="310" y2="360" stroke="hsl(var(--ledger-rule))" strokeWidth="1" markerEnd="url(#windArrow)" />
            <text x="355" y="340" textAnchor="middle" fill="hsl(var(--ledger-rule))" fontSize="7" fontStyle="italic">NE Monsoon</text>
          </motion.g>
        </svg>
      </div>
    </div>
  );
};
