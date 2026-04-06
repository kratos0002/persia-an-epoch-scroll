import React from 'react';
import { motion } from 'framer-motion';
import { DayShell, DayComponentProps } from './DayShell';
import { PHASE_ATMOSPHERE, DAY_HIGHLIGHTS } from '../theaterConstants';

const hi = DAY_HIGHLIGHTS[8];

/** Day 8 — "Next Generation Falls"
 *  Family tree fragment — Arjuna → Iravan, with strike-through.
 *  The genealogy is the design. Minimal prose. */
export const Day08_NextGeneration = (props: DayComponentProps) => {
  const atmo = PHASE_ATMOSPHERE[props.phase];

  return (
    <DayShell {...props}>
      <div className="h-full flex flex-col items-center justify-center px-8">
        {/* Day label */}
        <motion.div
          className="flex items-baseline gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="font-display text-5xl md:text-7xl font-bold" style={{ color: atmo.accent }}>8</span>
          <span className="font-display text-[10px] tracking-[0.3em] uppercase" style={{ color: atmo.textMuted }}>
            {hi.title}
          </span>
        </motion.div>

        {/* Genealogy tree */}
        <div className="relative flex flex-col items-center">
          {/* Father — Arjuna */}
          <motion.div
            className="text-center mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <span className="font-display text-2xl md:text-4xl tracking-[0.06em]" style={{ color: atmo.textPrimary }}>
              Arjuna
            </span>
            <span className="block font-display text-[10px] tracking-[0.3em] uppercase mt-1" style={{ color: atmo.textMuted }}>
              Father · Third Pandava
            </span>
          </motion.div>

          {/* Connecting line */}
          <motion.svg
            viewBox="0 0 4 80"
            className="w-1 h-20 my-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.line
              x1="2" y1="0" x2="2" y2="80"
              stroke={atmo.accent}
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            />
          </motion.svg>

          {/* Son — Iravan */}
          <motion.div
            className="text-center relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <span className="font-display text-3xl md:text-5xl tracking-[0.06em]" style={{ color: atmo.textPrimary }}>
              Iravan
            </span>
            <span className="block font-display text-[10px] tracking-[0.3em] uppercase mt-1" style={{ color: atmo.textMuted }}>
              Son · Slain by Alambusha
            </span>

            {/* Red strike-through */}
            <motion.div
              className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2"
              style={{ background: 'hsl(355 70% 55%)' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.2, duration: 0.6, ease: 'easeOut' }}
            />
          </motion.div>

          {/* Branch withers — opacity fade */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 3, duration: 1.5 }}
          >
            <svg viewBox="0 0 100 40" className="w-24 h-10 mx-auto">
              <motion.path
                d="M50,0 L30,40 M50,0 L50,40 M50,0 L70,40"
                fill="none"
                stroke={atmo.accent}
                strokeWidth="0.5"
                initial={{ opacity: 0.4 }}
                animate={{ opacity: [0.4, 0.1] }}
                transition={{ delay: 3, duration: 2 }}
              />
            </svg>
            <span className="font-body text-[10px] tracking-[0.15em]" style={{ color: atmo.textMuted }}>
              The branch ends here
            </span>
          </motion.div>
        </div>

        {/* Key line */}
        <motion.p
          className="font-body text-base md:text-lg italic text-center max-w-md mt-12"
          style={{ color: atmo.textPrimary }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 1 }}
        >
          The first of the next generation to die.
        </motion.p>

        {/* Other casualties */}
        <motion.div
          className="flex gap-6 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 3.8, duration: 0.8 }}
        >
          <span className="font-display text-sm tracking-[0.1em]" style={{ color: 'hsl(355 70% 55% / 0.6)' }}>
            5 Shakuni brothers †
          </span>
        </motion.div>
      </div>
    </DayShell>
  );
};
