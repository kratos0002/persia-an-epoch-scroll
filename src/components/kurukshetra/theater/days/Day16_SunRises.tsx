import React from 'react';
import { motion } from 'framer-motion';
import { DayShell, DayComponentProps } from './DayShell';
import { PHASE_ATMOSPHERE, DAY_HIGHLIGHTS } from '../theaterConstants';

const hi = DAY_HIGHLIGHTS[16];

const BROTHERS = [
  { name: 'Nakula', title: 'Fourth Pandava' },
  { name: 'Sahadeva', title: 'Fifth Pandava' },
  { name: 'Yudhishthira', title: 'The Dharma King' },
];

/** Day 16 — "The Sun Rises"
 *  Three columns — one for each brother Karna spared.
 *  Defeated → SPARED with golden pulse. The only warmth in Phase IV. */
export const Day16_SunRises = (props: DayComponentProps) => {
  const atmo = PHASE_ATMOSPHERE[props.phase];

  return (
    <DayShell {...props}>
      <div className="h-full flex flex-col items-center justify-center px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="flex items-baseline gap-3 justify-center mb-2">
            <span className="font-display text-5xl md:text-7xl font-bold" style={{ color: atmo.accent }}>16</span>
            <span className="font-display text-[10px] tracking-[0.3em] uppercase" style={{ color: atmo.textMuted }}>
              {hi.title}
            </span>
          </div>
          <span className="font-display text-[10px] tracking-[0.3em] uppercase" style={{ color: atmo.textMuted }}>
            Karna commands
          </span>
        </motion.div>

        {/* Three columns */}
        <div className="flex gap-8 md:gap-16 items-stretch">
          {BROTHERS.map((brother, i) => (
            <motion.div
              key={brother.name}
              className="flex flex-col items-center text-center w-32 md:w-44"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.6, duration: 0.8 }}
            >
              {/* Silhouette placeholder */}
              <div className="relative mb-4">
                <svg viewBox="0 0 60 80" className="w-12 h-16 md:w-16 md:h-20">
                  <circle cx="30" cy="18" r="12" fill="none" stroke={atmo.textMuted} strokeWidth="0.8" opacity="0.3" />
                  <path d="M15,35 Q30,28 45,35 L42,75 L18,75 Z" fill="none" stroke={atmo.textMuted} strokeWidth="0.8" opacity="0.3" />
                </svg>
                {/* Golden pulse behind */}
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, hsl(42 85% 58% / 0.15), transparent 70%)' }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 1, 0.5], scale: [0.5, 1.5, 1.2] }}
                  transition={{ delay: 1.5 + i * 0.6, duration: 1.5 }}
                />
              </div>

              {/* Name */}
              <span className="font-display text-lg md:text-2xl tracking-[0.04em] mb-1" style={{ color: atmo.textPrimary }}>
                {brother.name}
              </span>
              <span className="font-display text-[9px] tracking-[0.2em] uppercase mb-4" style={{ color: atmo.textMuted }}>
                {brother.title}
              </span>

              {/* Status progression */}
              <motion.span
                className="font-display text-xs tracking-[0.15em] uppercase"
                style={{ color: 'hsl(355 70% 55% / 0.6)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0.3] }}
                transition={{ delay: 1.2 + i * 0.6, duration: 1.5, times: [0, 0.4, 1] }}
              >
                Defeated
              </motion.span>
              <motion.span
                className="font-display text-sm md:text-base tracking-[0.2em] uppercase font-bold mt-2"
                style={{ color: 'hsl(42 85% 58%)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + i * 0.6, duration: 0.6 }}
              >
                Spared
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Karna's secret */}
        <motion.div
          className="text-center mt-12 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1.5 }}
        >
          <div className="h-px w-24 mx-auto mb-4" style={{ background: `linear-gradient(to right, transparent, hsl(42 85% 58% / 0.3), transparent)` }} />
          <p className="font-body text-sm md:text-base italic" style={{ color: atmo.textMuted }}>
            He honored a secret promise to their mother — that she would always have five sons.
          </p>
          <p className="font-body text-xs mt-3" style={{ color: 'hsl(42 85% 58% / 0.5)' }}>
            The greatest Kaurava warrior was a Pandava by blood.
          </p>
        </motion.div>
      </div>
    </DayShell>
  );
};
