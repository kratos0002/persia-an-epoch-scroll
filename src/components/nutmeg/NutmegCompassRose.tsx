import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NM } from './nutmegTheme';

interface NutmegCompassRoseProps {
  size?: number;
  color?: string;
  className?: string;
}

export const NutmegCompassRose = ({ size = 100, color = NM.TIMBER, className = '' }: NutmegCompassRoseProps) => {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const r = size / 2;

  const points16 = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i * 22.5 * Math.PI) / 180 - Math.PI / 2;
    const isCardinal = i % 4 === 0;
    const isOrdinal = i % 4 === 2;
    const outerR = isCardinal ? r * 0.85 : isOrdinal ? r * 0.55 : r * 0.35;
    return `${r + outerR * Math.cos(angle)},${r + outerR * Math.sin(angle)}`;
  });

  return (
    <motion.div className={`inline-block ${className}`} style={{ rotate }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ opacity: 0.12 }}>
        <polygon points={points16.join(' ')} fill="none" stroke={color} strokeWidth={1} />
        <circle cx={r} cy={r} r={r * 0.25} fill="none" stroke={color} strokeWidth={0.5} />
        <circle cx={r} cy={r} r={r * 0.06} fill={color} />
        {/* Rhumb lines */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180 - Math.PI / 2;
          return (
            <line
              key={i}
              x1={r}
              y1={r}
              x2={r + r * 0.9 * Math.cos(angle)}
              y2={r + r * 0.9 * Math.sin(angle)}
              stroke={color}
              strokeWidth={i % 4 === 0 ? 0.8 : 0.3}
            />
          );
        })}
        {/* Cardinal labels */}
        {['N', 'E', 'S', 'W'].map((label, i) => {
          const angle = (i * 90 * Math.PI) / 180 - Math.PI / 2;
          return (
            <text
              key={label}
              x={r + r * 0.95 * Math.cos(angle)}
              y={r + r * 0.95 * Math.sin(angle) + 3}
              textAnchor="middle"
              fill={color}
              fontSize={size * 0.08}
              fontFamily="'Playfair Display', serif"
              fontWeight="700"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </motion.div>
  );
};

// Divider compass rose — static, centered
export const CompassDivider = ({ className = '' }: { className?: string }) => (
  <div className={`flex items-center justify-center gap-6 my-16 ${className}`}>
    <div className="flex-1 h-px" style={{ background: `${NM.TIMBER}22` }} />
    <NutmegCompassRose size={60} />
    <div className="flex-1 h-px" style={{ background: `${NM.TIMBER}22` }} />
  </div>
);
