import React from 'react';
import { motion } from 'framer-motion';
import { MOSCOW_MARCH } from './napoleonData';

const RED = 'hsl(0, 65%, 48%)';
const GOLD = 'hsl(43, 70%, 50%)';
const SMOKE = 'hsl(220, 8%, 35%)';

interface ArmyRibbonProps {
  progress: number; // 0-1
}

export const ArmyRibbon = ({ progress }: ArmyRibbonProps) => {
  const maxWidth = 120; // max ribbon height in px representing 685k
  const points = MOSCOW_MARCH.points;

  // Build path — the ribbon is a mirrored area chart
  // x = horizontal position, width = army size
  const visibleCount = Math.max(1, Math.floor(progress * points.length) + 1);
  const visiblePoints = points.slice(0, Math.min(visibleCount, points.length));

  // Moscow is at index 5 — the advance; after that is retreat
  const moscowIndex = 5;

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <svg viewBox="-10 -10 120 180" className="w-full" preserveAspectRatio="xMidYMid meet">
        {/* Background line */}
        <line x1="0" y1="80" x2="100" y2="80" stroke={SMOKE} strokeWidth="0.3" strokeDasharray="2,2" />

        {/* The ribbon — advance (gold) */}
        {visiblePoints.map((pt, i) => {
          if (i >= visiblePoints.length - 1) return null;
          const next = visiblePoints[i + 1];
          const w1 = (pt.size / MOSCOW_MARCH.start) * maxWidth;
          const w2 = (next.size / MOSCOW_MARCH.start) * maxWidth;
          const isRetreat = i >= moscowIndex;
          const color = isRetreat ? RED : GOLD;

          return (
            <motion.polygon
              key={i}
              points={`
                ${pt.x},${80 - w1 / 2}
                ${next.x},${80 - w2 / 2}
                ${next.x},${80 + w2 / 2}
                ${pt.x},${80 + w1 / 2}
              `}
              fill={color}
              opacity={0.7}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            />
          );
        })}

        {/* City labels */}
        {visiblePoints.map((pt, i) => (
          <motion.g
            key={`label-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <circle cx={pt.x} cy={80} r="1.2" fill={i >= moscowIndex ? RED : GOLD} />
            <text
              x={pt.x}
              y={80 + (pt.size / MOSCOW_MARCH.start) * maxWidth / 2 + 10}
              fill={SMOKE}
              fontSize="3.5"
              textAnchor="middle"
              fontFamily="serif"
            >
              {pt.label}
            </text>
            <text
              x={pt.x}
              y={80 - (pt.size / MOSCOW_MARCH.start) * maxWidth / 2 - 4}
              fill={i >= moscowIndex ? RED : GOLD}
              fontSize="3"
              textAnchor="middle"
              fontFamily="sans-serif"
              fontWeight="bold"
            >
              {(pt.size / 1000).toFixed(0)}k
            </text>
          </motion.g>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm" style={{ background: GOLD, opacity: 0.7 }} />
          <span className="text-xs font-body" style={{ color: SMOKE }}>Advance</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm" style={{ background: RED, opacity: 0.7 }} />
          <span className="text-xs font-body" style={{ color: SMOKE }}>Retreat</span>
        </div>
      </div>
    </div>
  );
};
