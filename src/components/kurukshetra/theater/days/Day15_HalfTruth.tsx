import React from 'react';
import { motion } from 'framer-motion';
import { DayShell, DayComponentProps } from './DayShell';
import { PHASE_ATMOSPHERE, DAY_HIGHLIGHTS } from '../theaterConstants';
import { DHARMA_RULES } from '../../kurukshetraData';

const hi = DAY_HIGHLIGHTS[15];
const violation = DHARMA_RULES.find(r => r.day === 15);

/** Day 15 — "The Half-Truth" ★ PIVOTAL
 *  Typography-dominated. The lie IS the design.
 *  Massive bold "ASHWATTHAMA IS DEAD" vs tiny whispered "(the elephant)".
 *  The bold statement cracks. Drona's weapons drop. */
export const Day15_HalfTruth = (props: DayComponentProps) => {
  const atmo = PHASE_ATMOSPHERE[props.phase];

  return (
    <DayShell {...props}>
      <div className="h-full flex flex-col items-center justify-center text-center px-8 relative">
        {/* Day number — faint */}
        <motion.span
          className="absolute top-[12%] font-display text-7xl md:text-9xl font-bold"
          style={{ color: `${atmo.textPrimary}08` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          15
        </motion.span>

        {/* The LIE — massive */}
        <div className="relative">
          <motion.h2
            className="font-display text-4xl md:text-7xl lg:text-[6rem] font-bold tracking-[0.04em] uppercase leading-tight"
            style={{ color: atmo.textPrimary }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Ashwatthama
            <br />
            is dead.
          </motion.h2>

          {/* Crack through the statement */}
          <motion.svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M45,0 L48,20 L44,40 L50,55 L46,70 L52,85 L48,100"
              fill="none"
              stroke="hsl(355 70% 55% / 0.5)"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 4, duration: 1.5, ease: 'easeOut' }}
            />
          </motion.svg>
        </div>

        {/* The TRUTH — whispered, tiny */}
        <motion.span
          className="font-body text-[10px] md:text-xs italic mt-4 tracking-wider"
          style={{ color: `${atmo.textMuted}` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4] }}
          transition={{ delay: 2.5, duration: 2 }}
        >
          (the elephant)
        </motion.span>

        {/* Drona's weapons falling */}
        <motion.div
          className="flex gap-6 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5 }}
        >
          {/* Bow */}
          <motion.svg viewBox="0 0 40 60" className="w-8 h-12">
            <motion.path
              d="M10,5 Q35,30 10,55"
              fill="none"
              stroke={atmo.accent}
              strokeWidth="1.5"
              initial={{ y: 0, opacity: 0.6 }}
              animate={{ y: [0, 40], opacity: [0.6, 0], rotate: [0, 15] }}
              transition={{ delay: 5, duration: 1.5, ease: [0.4, 0, 1, 1] }}
            />
          </motion.svg>
          {/* Arrow */}
          <motion.div
            className="w-px h-12"
            style={{ background: atmo.accent }}
            initial={{ opacity: 0.6 }}
            animate={{ y: [0, 40], opacity: [0.6, 0], rotate: [0, -10] }}
            transition={{ delay: 5.2, duration: 1.5, ease: [0.4, 0, 1, 1] }}
          />
        </motion.div>

        {/* Narrative */}
        <motion.p
          className="font-body text-sm md:text-base italic max-w-lg mt-8"
          style={{ color: atmo.textMuted }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.5, duration: 1.5 }}
        >
          Yudhishthira, who had never lied, murmured the caveat too softly to be heard.
          Drona laid down his weapons and sat in meditation on the battlefield.
        </motion.p>

        {/* Dharma violation — prominently */}
        {violation && (
          <motion.div
            className="mt-8 pl-4 max-w-md"
            style={{ borderLeft: '3px solid hsl(355 70% 55%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6.5, duration: 1 }}
          >
            <p className="font-display text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: 'hsl(355 70% 55%)' }}>
              Dharma Broken
            </p>
            <p className="font-body text-sm italic" style={{ color: atmo.textMuted }}>
              {violation.violation}
            </p>
          </motion.div>
        )}

        {/* Casualties */}
        <motion.div
          className="flex gap-6 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 7, duration: 0.8 }}
        >
          {['Drona', 'Virata', 'Drupada'].map(name => (
            <span key={name} className="font-display text-sm tracking-[0.1em]" style={{ color: 'hsl(355 70% 55% / 0.6)' }}>
              {name} †
            </span>
          ))}
        </motion.div>
      </div>
    </DayShell>
  );
};
