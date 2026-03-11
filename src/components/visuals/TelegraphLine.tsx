import React from 'react';
import { motion } from 'framer-motion';

const WIRE = 'hsl(200, 60%, 55%)';
const AMBER = 'hsl(30, 85%, 50%)';

/**
 * SVG hero visual: a telegraph wire with a traveling spark (left)
 * vs a spreading flame glow (right). Split-screen concept.
 */
export const TelegraphLine = () => {
  return (
    <div className="relative w-full h-full flex">
      {/* Left: Telegraph wire + spark */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 400 200" className="w-full h-full max-h-[300px]" preserveAspectRatio="xMidYMid meet">
          {/* Telegraph poles */}
          {[60, 140, 220, 300].map((x) => (
            <g key={x}>
              <line x1={x} y1={70} x2={x} y2={140} stroke="hsl(200, 30%, 35%)" strokeWidth="2" />
              <line x1={x - 8} y1={72} x2={x + 8} y2={72} stroke="hsl(200, 30%, 35%)" strokeWidth="1.5" />
            </g>
          ))}

          {/* Wire */}
          <path
            d="M 60 72 Q 100 65 140 72 Q 180 79 220 72 Q 260 65 300 72"
            fill="none"
            stroke={WIRE}
            strokeWidth="1.5"
            opacity={0.6}
          />

          {/* Traveling spark */}
          <motion.circle
            r="4"
            fill={WIRE}
            filter="url(#sparkGlow)"
            animate={{
              cx: [60, 140, 220, 300],
              cy: [72, 72, 72, 72],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Station dots */}
          {[60, 140, 220, 300].map((x) => (
            <rect key={x} x={x - 3} y={69} width="6" height="6" fill={WIRE} opacity={0.8} rx="1" />
          ))}

          <defs>
            <filter id="sparkGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Label */}
          <text x="180" y="170" textAnchor="middle" fill={WIRE} fontSize="10" fontFamily="'Source Sans 3', system-ui" opacity={0.6} letterSpacing="0.15em">
            THE SIGNAL
          </text>
        </svg>
      </div>

      {/* Divider */}
      <div className="w-px bg-gradient-to-b from-transparent via-[hsl(220,10%,30%)] to-transparent" />

      {/* Right: Fire / rebellion spread */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 400 200" className="w-full h-full max-h-[300px]" preserveAspectRatio="xMidYMid meet">
          {/* Pulsing fire circles */}
          {[
            { cx: 200, cy: 100, delay: 0 },
            { cx: 150, cy: 85, delay: 0.6 },
            { cx: 260, cy: 110, delay: 1.2 },
            { cx: 180, cy: 130, delay: 0.9 },
            { cx: 240, cy: 75, delay: 1.5 },
          ].map((dot, i) => (
            <React.Fragment key={i}>
              <motion.circle
                cx={dot.cx}
                cy={dot.cy}
                fill={AMBER}
                opacity={0.15}
                animate={{ r: [8, 30, 8], opacity: [0.2, 0.05, 0.2] }}
                transition={{ duration: 3, delay: dot.delay, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.circle
                cx={dot.cx}
                cy={dot.cy}
                r="3"
                fill={AMBER}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, delay: dot.delay, repeat: Infinity }}
              />
            </React.Fragment>
          ))}

          {/* Connecting lines (social network) */}
          {[
            [200, 100, 150, 85],
            [200, 100, 260, 110],
            [200, 100, 180, 130],
            [150, 85, 240, 75],
            [260, 110, 180, 130],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={AMBER} strokeWidth="0.5" opacity={0.2} />
          ))}

          <text x="200" y="180" textAnchor="middle" fill={AMBER} fontSize="10" fontFamily="'Source Sans 3', system-ui" opacity={0.6} letterSpacing="0.15em">
            THE FIRE
          </text>
        </svg>
      </div>
    </div>
  );
};
