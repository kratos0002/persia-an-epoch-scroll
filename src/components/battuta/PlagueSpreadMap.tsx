import React from 'react';
import { motion } from 'framer-motion';
import { IB, BLACK_DEATH_CITIES } from '@/components/visuals/battutaMapData';

/**
 * SVG map showing the Black Death spreading from Central Asia to the Mediterranean,
 * with ink-stain effects marking affected regions.
 */
export const PlagueSpreadMap = () => {
  // Simplified Mediterranean + Middle East coastline
  const coastline = "M 50,120 Q 80,100 120,105 L 160,95 Q 200,90 230,100 L 260,95 Q 280,88 300,92 L 340,85 Q 360,90 380,105 L 400,115 Q 390,130 370,140 L 340,135 Q 310,145 280,140 L 250,148 Q 220,155 200,150 L 170,155 Q 140,160 110,150 L 80,145 Q 60,135 50,120 Z";

  // Plague spread nodes with coordinates on the SVG
  const plagueNodes = [
    { x: 370, y: 70, label: 'Central Asia', year: '1346', delay: 0 },
    { x: 340, y: 85, label: 'Crimea', year: '1347', delay: 0.4 },
    { x: 280, y: 140, label: 'Cairo', year: '1348', delay: 0.8 },
    { x: 260, y: 120, label: 'Damascus', year: '1348', delay: 1.0 },
    { x: 200, y: 100, label: 'Constantinople', year: '1347', delay: 0.6 },
    { x: 100, y: 115, label: 'Tangier', year: '1349', delay: 1.4 },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <svg viewBox="0 0 450 200" className="w-full" style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }}>
        {/* Coastline */}
        <path d={coastline} fill="none" stroke="hsl(350, 40%, 50%)" strokeWidth={1} opacity={0.3} />

        {/* Plague spread ink stains */}
        {plagueNodes.map((node, i) => (
          <motion.circle key={i}
            cx={node.x} cy={node.y}
            r={0}
            fill="hsl(350, 55%, 35%)"
            initial={{ r: 0, opacity: 0.6 }}
            whileInView={{ r: 25, opacity: 0.12 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: node.delay, ease: 'easeOut' }}
          />
        ))}

        {/* Spread route arrows */}
        <motion.path
          d="M 370,70 Q 355,78 340,85 Q 310,95 280,140 Q 270,130 260,120"
          fill="none" stroke="hsl(350, 55%, 35%)" strokeWidth={1.5} strokeDasharray="4 3"
          opacity={0.4}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 340,85 Q 270,92 200,100 Q 150,108 100,115"
          fill="none" stroke="hsl(350, 55%, 35%)" strokeWidth={1.5} strokeDasharray="4 3"
          opacity={0.3}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
        />

        {/* City labels */}
        {plagueNodes.map((node, i) => (
          <motion.g key={`label-${i}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: node.delay + 0.3 }}
          >
            <circle cx={node.x} cy={node.y} r={3} fill="hsl(350, 55%, 35%)" opacity={0.8} />
            <text x={node.x} y={node.y - 10} textAnchor="middle"
              fill="hsl(38, 35%, 80%)" fontSize={8} fontFamily="'Cormorant Garamond', serif" fontWeight={600}>
              {node.label}
            </text>
            <text x={node.x} y={node.y + 16} textAnchor="middle"
              fill="hsl(350, 55%, 50%)" fontSize={7} fontFamily="'Cormorant Garamond', serif" fontStyle="italic">
              {node.year}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
};

/**
 * Ink tally marks — vertical strokes grouped in fives, animated to scratch onto page.
 */
export const InkTallyMarks = ({ count, label, className = '' }: { count: number; label: string; className?: string }) => {
  const groups = Math.floor(count / 5);
  const remainder = count % 5;
  const displayGroups = Math.min(groups, 8); // max 8 groups for layout

  return (
    <div className={`text-center ${className}`}>
      <div className="flex items-end justify-center gap-3 mb-3">
        {Array.from({ length: displayGroups }, (_, gi) => (
          <svg key={gi} width={32} height={36} viewBox="0 0 32 36">
            {/* 4 vertical + 1 diagonal */}
            {[0, 1, 2, 3].map(j => (
              <motion.line key={j}
                x1={4 + j * 7} y1={4} x2={4 + j * 7} y2={32}
                stroke="hsl(350, 55%, 35%)" strokeWidth={2} strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: gi * 0.15 + j * 0.05 }}
              />
            ))}
            <motion.line
              x1={0} y1={28} x2={30} y2={6}
              stroke="hsl(350, 55%, 35%)" strokeWidth={2} strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.8 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: gi * 0.15 + 0.2 }}
            />
          </svg>
        ))}
        {remainder > 0 && (
          <svg width={remainder * 7 + 2} height={36} viewBox={`0 0 ${remainder * 7 + 2} 36`}>
            {Array.from({ length: remainder }, (_, j) => (
              <motion.line key={j}
                x1={4 + j * 7} y1={4} x2={4 + j * 7} y2={32}
                stroke="hsl(350, 55%, 35%)" strokeWidth={2} strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: displayGroups * 0.15 + j * 0.05 }}
              />
            ))}
          </svg>
        )}
      </div>
      <p className="font-display text-2xl font-bold battuta-gilt" style={{ color: 'hsl(350, 55%, 50%)' }}>
        {count.toLocaleString()}
      </p>
      <p className="font-body text-xs mt-1" style={{ color: 'hsl(38, 35%, 70%)' }}>{label}</p>
    </div>
  );
};
