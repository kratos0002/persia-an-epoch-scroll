import React from 'react';
import { motion } from 'framer-motion';

const BURNT = 'hsl(15, 75%, 50%)';
const DIM = 'hsl(40, 20%, 25%)';

/* Three overlapping spy network circles over a city grid */
export const SurveillanceGraphic = () => {
  // City grid nodes
  const grid: [number, number][] = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 8; col++) {
      grid.push([80 + col * 55, 120 + row * 55]);
    }
  }

  // Three spy ring centers
  const rings = [
    { cx: 200, cy: 250, r: 130, label: 'Barids', delay: 0 },
    { cx: 320, cy: 220, r: 120, label: 'Munhiyans', delay: 0.3 },
    { cx: 260, cy: 340, r: 110, label: 'Market Spies', delay: 0.6 },
  ];

  // "Eye" nodes — random subset of grid
  const eyeIndices = [3, 7, 12, 18, 22, 27, 31, 35, 40, 44];

  return (
    <div className="w-full flex justify-center my-8">
      <svg viewBox="0 0 550 480" className="w-full max-w-lg" preserveAspectRatio="xMidYMid meet">
        <rect width="550" height="480" fill="hsl(220, 25%, 6%)" rx={8} />

        {/* Title */}
        <text x={275} y={50} textAnchor="middle" fill={BURNT} fontSize="13" fontFamily="'Cormorant Garamond', serif" letterSpacing="4" opacity={0.7}>
          SURVEILLANCE STATE
        </text>

        {/* Grid lines */}
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.line key={`v${i}`}
            x1={80 + i * 55} y1={100} x2={80 + i * 55} y2={430}
            stroke={DIM} strokeWidth={0.5}
            initial={{ opacity: 0 }} animate={{ opacity: 0.3 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.line key={`h${i}`}
            x1={60} y1={120 + i * 55} x2={500} y2={120 + i * 55}
            stroke={DIM} strokeWidth={0.5}
            initial={{ opacity: 0 }} animate={{ opacity: 0.3 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          />
        ))}

        {/* Grid nodes */}
        {grid.map(([x, y], i) => (
          <motion.circle key={i}
            cx={x} cy={y} r={2}
            fill="hsl(40, 20%, 35%)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.3 + i * 0.01, duration: 0.3 }}
          />
        ))}

        {/* Spy ring circles */}
        {rings.map((ring, i) => (
          <motion.g key={i}>
            <motion.circle
              cx={ring.cx} cy={ring.cy} r={ring.r}
              fill="none" stroke={BURNT} strokeWidth={1.5} strokeDasharray="8 4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.4 }}
              transition={{ delay: ring.delay + 0.5, duration: 1, type: 'spring' }}
            />
            <motion.text
              x={ring.cx} y={ring.cy - ring.r - 8}
              textAnchor="middle" fill={BURNT} fontSize="9" fontFamily="'Cormorant Garamond', serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: ring.delay + 1, duration: 0.5 }}
            >
              {ring.label}
            </motion.text>
          </motion.g>
        ))}

        {/* "Eye" / watcher nodes at key positions */}
        {eyeIndices.map((idx) => {
          if (idx >= grid.length) return null;
          const [x, y] = grid[idx];
          return (
            <motion.g key={`eye-${idx}`}>
              <motion.circle
                cx={x} cy={y} r={8}
                fill={BURNT} opacity={0}
                animate={{ opacity: [0, 0.2, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.15 }}
              />
              <motion.circle
                cx={x} cy={y} r={4}
                fill={BURNT}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.8, scale: 1 }}
                transition={{ delay: 1 + idx * 0.08, duration: 0.4 }}
              />
              {/* Eye shape */}
              <motion.ellipse
                cx={x} cy={y} rx={6} ry={3}
                fill="none" stroke={BURNT} strokeWidth={1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1.2 + idx * 0.08, duration: 0.4 }}
              />
            </motion.g>
          );
        })}

        {/* Connecting lines between eye nodes */}
        {eyeIndices.slice(0, -1).map((idx, i) => {
          const nextIdx = eyeIndices[i + 1];
          if (idx >= grid.length || nextIdx >= grid.length) return null;
          const [x1, y1] = grid[idx];
          const [x2, y2] = grid[nextIdx];
          return (
            <motion.line key={`conn-${i}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={BURNT} strokeWidth={0.8} strokeDasharray="3 3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              transition={{ delay: 1.5 + i * 0.1, duration: 0.5 }}
            />
          );
        })}
      </svg>
    </div>
  );
};
