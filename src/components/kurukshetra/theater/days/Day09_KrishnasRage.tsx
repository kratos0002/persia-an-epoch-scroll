import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DayShell, DayComponentProps } from './DayShell';
import { PHASE_ATMOSPHERE, DAY_HIGHLIGHTS } from '../theaterConstants';

const hi = DAY_HIGHLIGHTS[9];

/** Day 9 — "Krishna's Rage"
 *  Explosive center. Sudarshana Chakra spinning then freezing.
 *  "STOP" moment when it freezes. Tension then release. */
export const Day09_KrishnasRage = (props: DayComponentProps) => {
  const atmo = PHASE_ATMOSPHERE[props.phase];
  const [phase, setPhase] = useState<'spinning' | 'stopped'>('spinning');

  useEffect(() => {
    const timer = setTimeout(() => setPhase('stopped'), 3500);
    return () => clearTimeout(timer);
  }, []);

  const isStopped = phase === 'stopped';

  return (
    <DayShell {...props}>
      {/* Radial glow that intensifies then dims */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: `radial-gradient(circle at center, ${atmo.accent}15, transparent 60%)` }}
        animate={{
          opacity: isStopped ? 0.3 : [0.3, 0.8, 0.3],
        }}
        transition={isStopped ? { duration: 1 } : { duration: 1.5, repeat: Infinity }}
      />

      <div className="h-full flex flex-col items-center justify-center text-center px-8">
        {/* Day label */}
        <motion.div
          className="flex items-baseline gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="font-display text-5xl md:text-7xl font-bold" style={{ color: atmo.accent }}>9</span>
          <span className="font-display text-[10px] tracking-[0.3em] uppercase" style={{ color: atmo.textMuted }}>
            {hi.title}
          </span>
        </motion.div>

        {/* Sudarshana Chakra */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8">
          <motion.svg
            viewBox="0 0 200 200"
            className="w-full h-full"
            animate={{ rotate: isStopped ? 0 : 360 }}
            transition={isStopped
              ? { duration: 0.3, ease: 'easeOut' }
              : { duration: 2, repeat: Infinity, ease: 'linear' }
            }
          >
            {/* Outer ring */}
            <circle cx="100" cy="100" r="90" fill="none" stroke={atmo.accent} strokeWidth="1.5" opacity="0.5" />
            {/* Blade spokes — 12 */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30) * Math.PI / 180;
              const x1 = 100 + Math.cos(angle) * 40;
              const y1 = 100 + Math.sin(angle) * 40;
              const x2 = 100 + Math.cos(angle) * 88;
              const y2 = 100 + Math.sin(angle) * 88;
              return (
                <line
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={atmo.accent}
                  strokeWidth="1.2"
                  opacity="0.6"
                />
              );
            })}
            {/* Inner ring */}
            <circle cx="100" cy="100" r="38" fill="none" stroke={atmo.accent} strokeWidth="1" opacity="0.4" />
            {/* Center bindu */}
            <circle cx="100" cy="100" r="6" fill={atmo.accent} opacity="0.7" />
          </motion.svg>

          {/* Glow pulse */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow: `0 0 40px ${atmo.accent}40, 0 0 80px ${atmo.accent}20`,
            }}
            animate={{
              opacity: isStopped ? 0.2 : [0.3, 0.8, 0.3],
            }}
            transition={isStopped ? { duration: 0.5 } : { duration: 0.8, repeat: Infinity }}
          />
        </div>

        {/* STOP text — appears when chakra freezes */}
        <AnimatePresence>
          {isStopped && (
            <>
              <motion.h3
                className="font-display text-5xl md:text-8xl font-bold tracking-[0.1em]"
                style={{ color: atmo.textPrimary }}
                initial={{ opacity: 0, scale: 1.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                STOP.
              </motion.h3>

              <motion.p
                className="font-body text-sm md:text-base italic max-w-md mt-6"
                style={{ color: atmo.textMuted }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                Arjuna fell at Krishna's feet. The Sudarshana Chakra returned to rest.
              </motion.p>

              <motion.p
                className="font-body text-base md:text-lg max-w-lg mt-4"
                style={{ color: atmo.textPrimary }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                {hi.highlight}
              </motion.p>
            </>
          )}
        </AnimatePresence>
      </div>
    </DayShell>
  );
};
