import React from 'react';
import { motion } from 'framer-motion';
import { IB } from '@/components/visuals/battutaMapData';

interface PortolanCompassRoseProps {
  size?: number;
  color?: string;
  opacity?: number;
  animated?: boolean;
  className?: string;
  points?: 16 | 32;
}

/**
 * A detailed 16 or 32-point portolan compass rose with cardinal labels in Arabic.
 */
export const PortolanCompassRose = ({
  size = 240,
  color = IB.SAFFRON,
  opacity = 0.12,
  animated = false,
  className = '',
  points = 32,
}: PortolanCompassRoseProps) => {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.45;
  const midR = size * 0.32;
  const innerR = size * 0.18;
  const tinyR = size * 0.06;

  const cardinals = [
    { angle: -90, label: 'شمال', en: 'N' },  // North
    { angle: 0, label: 'شرق', en: 'E' },     // East
    { angle: 90, label: 'جنوب', en: 'S' },    // South
    { angle: 180, label: 'غرب', en: 'W' },    // West
  ];

  const rosePoints: string[] = [];
  for (let i = 0; i < points; i++) {
    const angle = (i * 360 / points - 90) * Math.PI / 180;
    const isCardinal = i % (points / 4) === 0;
    const isIntercardinal = i % (points / 8) === 0;
    const r = isCardinal ? outerR : isIntercardinal ? midR : innerR;
    rosePoints.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
    // Inner notch
    const notchAngle = ((i + 0.5) * 360 / points - 90) * Math.PI / 180;
    rosePoints.push(`${cx + tinyR * Math.cos(notchAngle)},${cy + tinyR * Math.sin(notchAngle)}`);
  }

  const content = (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} style={{ opacity }}>
      {/* Rhumb lines radiating outward */}
      {Array.from({ length: points }, (_, i) => {
        const angle = (i * 360 / points - 90) * Math.PI / 180;
        return (
          <line key={`rhumb-${i}`}
            x1={cx} y1={cy}
            x2={cx + outerR * 1.15 * Math.cos(angle)}
            y2={cy + outerR * 1.15 * Math.sin(angle)}
            stroke={color} strokeWidth={i % (points / 4) === 0 ? 1.2 : 0.3} opacity={i % (points / 4) === 0 ? 0.6 : 0.25}
          />
        );
      })}

      {/* Main rose polygon */}
      <polygon points={rosePoints.join(' ')} fill="none" stroke={color} strokeWidth={1.2} opacity={0.5} />

      {/* Concentric circles */}
      <circle cx={cx} cy={cy} r={outerR * 0.85} fill="none" stroke={color} strokeWidth={0.5} opacity={0.2} />
      <circle cx={cx} cy={cy} r={midR} fill="none" stroke={color} strokeWidth={0.8} opacity={0.3} />
      <circle cx={cx} cy={cy} r={innerR} fill="none" stroke={color} strokeWidth={0.5} opacity={0.2} />
      <circle cx={cx} cy={cy} r={tinyR} fill={color} opacity={0.3} />

      {/* Cardinal labels */}
      {cardinals.map(c => {
        const angle = c.angle * Math.PI / 180;
        const labelR = outerR * 1.08;
        const x = cx + labelR * Math.cos(angle);
        const y = cy + labelR * Math.sin(angle);
        return (
          <g key={c.en}>
            <text x={x} y={y} textAnchor="middle" dominantBaseline="central"
              fill={color} fontSize={size * 0.045} fontWeight={700} fontFamily="'Amiri', serif" opacity={0.7}>
              {c.label}
            </text>
          </g>
        );
      })}
    </svg>
  );

  if (animated) {
    return (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        style={{ width: size, height: size }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};
