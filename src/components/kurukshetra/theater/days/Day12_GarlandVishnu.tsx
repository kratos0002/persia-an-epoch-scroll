import React from 'react';
import { motion } from 'framer-motion';
import { DayShell, DayComponentProps } from './DayShell';
import { PHASE_ATMOSPHERE, DAY_HIGHLIGHTS } from '../theaterConstants';

const hi = DAY_HIGHLIGHTS[12];

/** Day 12 — "The Garland of Vishnu"
 *  Vertical center column — missile descends, morphs into garland.
 *  Golden streak transforms into petals. Violence → grace. */
export const Day12_GarlandVishnu = (props: DayComponentProps) => {
  const atmo = PHASE_ATMOSPHERE[props.phase];

  // Petal paths for the garland (arranged in a semicircular garland shape)
  const petals = Array.from({ length: 12 }, (_, i) => {
    const angle = -60 + (i / 11) * 120;
    const rad = angle * Math.PI / 180;
    const cx = 200 + Math.cos(rad) * 80;
    const cy = 200 + Math.sin(rad) * 30;
    return { cx, cy, angle: angle + 90 };
  });

  return (
    <DayShell {...props}>
      <div className="h-full flex flex-col items-center justify-center text-center px-8">
        {/* Day label */}
        <motion.div
          className="flex items-baseline gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="font-display text-5xl md:text-7xl font-bold" style={{ color: atmo.accent }}>12</span>
          <span className="font-display text-[10px] tracking-[0.3em] uppercase" style={{ color: atmo.textMuted }}>
            {hi.title}
          </span>
        </motion.div>

        {/* Central visual — missile to garland */}
        <div className="relative w-80 h-80 md:w-96 md:h-96 mb-8">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {/* The descending missile */}
            <motion.line
              x1="200" y1="0" x2="200" y2="200"
              stroke="hsl(42 85% 58%)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, delay: 0.5, times: [0, 0.5, 1] }}
            />

            {/* Impact flash */}
            <motion.circle
              cx="200" cy="200" r="30"
              fill="none"
              stroke="hsl(42 85% 58%)"
              strokeWidth="2"
              initial={{ r: 0, opacity: 0 }}
              animate={{ r: [0, 40, 60], opacity: [0, 0.8, 0] }}
              transition={{ delay: 1.8, duration: 1 }}
            />

            {/* Garland petals — bloom after impact */}
            {petals.map((p, i) => (
              <motion.ellipse
                key={i}
                cx={p.cx}
                cy={p.cy}
                rx="8"
                ry="12"
                fill="none"
                stroke="hsl(42 85% 58% / 0.6)"
                strokeWidth="1"
                transform={`rotate(${p.angle} ${p.cx} ${p.cy})`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: [0, 0.8] }}
                transition={{ delay: 2.5 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
              />
            ))}

            {/* Center — Krishna's chest point */}
            <motion.circle
              cx="200" cy="200" r="6"
              fill="hsl(42 85% 58%)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8] }}
              transition={{ delay: 2.5, duration: 0.5 }}
            />

            {/* Garland string connecting petals */}
            <motion.path
              d={`M${petals[0].cx},${petals[0].cy} ${petals.map(p => `Q${p.cx + 5},${p.cy + 15} ${p.cx},${p.cy}`).join(' ')}`}
              fill="none"
              stroke="hsl(100 30% 50% / 0.3)"
              strokeWidth="0.8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ delay: 3, duration: 1.5 }}
            />
          </svg>
        </div>

        {/* Key text */}
        <motion.p
          className="font-body text-lg md:text-xl leading-relaxed max-w-lg italic"
          style={{ color: atmo.textPrimary }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 1 }}
        >
          Transformed into a garland.
        </motion.p>

        <motion.p
          className="font-body text-sm md:text-base max-w-md mt-4"
          style={{ color: atmo.textMuted }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2, duration: 1 }}
        >
          Krishna received the Vaishnavastra upon his own chest, where it became flowers.
        </motion.p>

        {/* Casualty */}
        <motion.span
          className="font-display text-sm tracking-[0.1em] mt-6"
          style={{ color: 'hsl(355 70% 55% / 0.7)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.8 }}
        >
          Bhagadatta †
        </motion.span>
      </div>
    </DayShell>
  );
};
