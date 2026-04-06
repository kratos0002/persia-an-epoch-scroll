import React from 'react';
import { motion } from 'framer-motion';
import { VYUHA_SHAPES, WarPhase } from '../kurukshetraData';
import { PHASE_ATMOSPHERE } from './theaterConstants';

interface VyuhaFormationProps {
  vyuhaName: string;
  phase: WarPhase;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_MAP = {
  sm: 'w-24 h-24',
  md: 'w-48 h-48 md:w-56 md:h-56',
  lg: 'w-64 h-64 md:w-80 md:h-80',
};

export const VyuhaFormation = ({ vyuhaName, phase, size = 'md' }: VyuhaFormationProps) => {
  const shape = VYUHA_SHAPES[vyuhaName];
  const atmo = PHASE_ATMOSPHERE[phase];

  if (!shape) {
    // Fallback for formations not in VYUHA_SHAPES
    return (
      <div className={`${SIZE_MAP[size]} flex items-center justify-center`}>
        <div className="text-center">
          <div
            className="font-display text-lg tracking-[0.15em] uppercase"
            style={{ color: atmo.accent }}
          >
            {vyuhaName}
          </div>
          <div className="mt-2 w-12 h-px mx-auto" style={{ background: atmo.borderColor }} />
        </div>
      </div>
    );
  }

  const degradation = phase === 1 ? 0 : phase === 2 ? 0.3 : phase === 3 ? 0.7 : 1;
  const strokeOpacity = 1 - degradation * 0.4;

  return (
    <div className={`${SIZE_MAP[size]} relative flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        {shape.paths.map((d, i) => (
          <motion.path
            key={`${vyuhaName}-${i}`}
            d={d}
            fill="none"
            stroke={atmo.accent}
            strokeWidth={0.8 - degradation * 0.3}
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: strokeOpacity }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: i * 0.15, ease: 'easeOut' }}
            style={{
              strokeDasharray: degradation > 0.5 ? '6 3' : 'none',
              transform: degradation > 0
                ? `translate(${Math.sin(i * 7) * degradation * 3}px, ${Math.cos(i * 11) * degradation * 3}px)`
                : 'none',
            }}
          />
        ))}
        {/* Center bindu */}
        <circle
          cx={50} cy={50}
          r={degradation > 0.7 ? 0.5 : 2}
          fill={atmo.accent}
          opacity={strokeOpacity}
        />
      </svg>

      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-full"
        style={{
          background: `radial-gradient(circle, ${atmo.accent}10, transparent 70%)`,
        }}
      />

      {/* Formation label */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
        <span
          className="font-display text-[10px] tracking-[0.2em] uppercase"
          style={{ color: `${atmo.accent}` }}
        >
          {shape.name}
        </span>
        <span className="block font-devanagari text-[10px] mt-0.5" style={{ color: atmo.textMuted }}>
          {shape.sanskrit}
        </span>
      </div>
    </div>
  );
};
