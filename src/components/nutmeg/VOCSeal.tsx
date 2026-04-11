import React from 'react';
import { motion } from 'framer-motion';
import { NM } from './nutmegTheme';

interface VOCSealProps {
  size?: number;
  color?: string;
  cracked?: boolean;
  className?: string;
}

export const VOCSeal = ({ size = 80, color = NM.VERMILION, cracked = false, className = '' }: VOCSealProps) => {
  const r = size / 2;
  
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Wax base */}
      <circle cx={r} cy={r} r={r * 0.85} fill={color} opacity={0.15} />
      <circle cx={r} cy={r} r={r * 0.75} fill="none" stroke={color} strokeWidth={1.5} opacity={0.4} />
      <circle cx={r} cy={r} r={r * 0.65} fill="none" stroke={color} strokeWidth={0.5} opacity={0.25} />

      {/* VOC monogram */}
      <text
        x={r}
        y={r + size * 0.08}
        textAnchor="middle"
        fill={color}
        fontSize={size * 0.3}
        fontFamily="'Playfair Display', serif"
        fontWeight="900"
        opacity={0.6}
        letterSpacing="0.05em"
      >
        VOC
      </text>

      {/* Decorative dots around the edge */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 15 * Math.PI) / 180 - Math.PI / 2;
        const dotR = r * 0.78;
        return (
          <circle
            key={i}
            cx={r + dotR * Math.cos(angle)}
            cy={r + dotR * Math.sin(angle)}
            r={1}
            fill={color}
            opacity={0.2}
          />
        );
      })}

      {/* Crack lines if damaged */}
      {cracked && (
        <g opacity={0.3}>
          <line x1={r * 0.5} y1={r * 0.3} x2={r * 1.3} y2={r * 1.6} stroke={NM.CREAM} strokeWidth={1.5} />
          <line x1={r * 1.1} y1={r * 0.4} x2={r * 0.7} y2={r * 1.5} stroke={NM.CREAM} strokeWidth={1} />
        </g>
      )}
    </motion.svg>
  );
};
