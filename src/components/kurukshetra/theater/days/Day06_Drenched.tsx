import React from 'react';
import { motion } from 'framer-motion';
import { DayShell, DayComponentProps } from './DayShell';
import { PHASE_ATMOSPHERE, DAY_HIGHLIGHTS } from '../theaterConstants';

const hi = DAY_HIGHLIGHTS[6];

/** Day 6 — "The Field Was Drenched"
 *  Full-bleed. Heavy vignette. Drip-like particles fall from top.
 *  Sparse typography — "The field was drenched" is the only large text. */
export const Day06_Drenched = (props: DayComponentProps) => {
  const atmo = PHASE_ATMOSPHERE[props.phase];

  // Generate drip particles
  const drips = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    delay: Math.random() * 4,
    duration: 2.5 + Math.random() * 2,
    size: 2 + Math.random() * 3,
    opacity: 0.15 + Math.random() * 0.25,
  }));

  return (
    <DayShell {...props} bgOverride={`linear-gradient(to bottom, ${atmo.bgFrom}, hsl(355 20% 8%), hsl(355 25% 5%))`} image="/kurukshetra/HErfL6uXMAAiUBh.jpeg">
      {/* Heavy vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: `radial-gradient(ellipse at center, transparent 20%, ${atmo.bgFrom}cc 70%, ${atmo.bgFrom} 100%)`,
        }}
      />

      {/* Drip particles */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
        {drips.map(d => (
          <motion.div
            key={d.id}
            className="absolute rounded-full"
            style={{
              left: `${d.x}%`,
              width: d.size,
              height: d.size * 2,
              background: `hsl(355 40% 30% / ${d.opacity})`,
              borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%',
            }}
            initial={{ top: -10, opacity: 0 }}
            animate={{
              top: ['0%', '100%'],
              opacity: [0, d.opacity, d.opacity, 0],
            }}
            transition={{
              duration: d.duration,
              delay: d.delay,
              repeat: Infinity,
              ease: 'easeIn',
            }}
          />
        ))}
      </div>

      {/* Content — sparse, centered */}
      <div className="h-full flex flex-col items-center justify-center text-center px-8 relative z-[2]">
        <motion.span
          className="font-display text-[10px] tracking-[0.5em] uppercase mb-6"
          style={{ color: atmo.textMuted }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Day Six
        </motion.span>

        <motion.span
          className="font-display text-7xl md:text-9xl font-bold leading-none mb-8"
          style={{ color: atmo.accent }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.3, duration: 1.5 }}
        >
          6
        </motion.span>

        {/* The only large text */}
        <motion.h3
          className="font-display text-3xl md:text-6xl tracking-[0.04em] mb-6"
          style={{ color: atmo.textPrimary }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.2 }}
        >
          The field was drenched.
        </motion.h3>

        <motion.p
          className="font-body text-sm md:text-base leading-relaxed max-w-md"
          style={{ color: atmo.textMuted }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          The formations mirrored and inverted. Both sides traded staggering casualties.
        </motion.p>
      </div>
    </DayShell>
  );
};
