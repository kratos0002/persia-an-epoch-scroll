import React from 'react';
import { motion } from 'framer-motion';
import { DayShell, DayComponentProps } from './DayShell';
import { PHASE_ATMOSPHERE, DAY_HIGHLIGHTS } from '../theaterConstants';

const hi = DAY_HIGHLIGHTS[11];

/** Day 11 — "The Surgeon Takes Command"
 *  Military briefing aesthetic. Scanner line sweeps horizontally.
 *  Cold, clinical. Drona + Karna names appear in sequence. */
export const Day11_SurgeonCommands = (props: DayComponentProps) => {
  const atmo = PHASE_ATMOSPHERE[props.phase];

  return (
    <DayShell {...props}>
      {/* Scanner line */}
      <motion.div
        className="absolute h-px left-0 right-0 z-[1] pointer-events-none"
        style={{
          background: `linear-gradient(to right, transparent 20%, ${atmo.accent}60 50%, transparent 80%)`,
          top: '50%',
        }}
        animate={{ top: ['20%', '80%', '20%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="h-full flex items-center px-8 md:px-16 lg:px-24">
        {/* Left — commander portrait area */}
        <div className="flex-1 max-w-md">
          <motion.span
            className="font-display text-[10px] tracking-[0.5em] uppercase block mb-4"
            style={{ color: atmo.accent }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Command Transfer
          </motion.span>

          {/* Drona — primary */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <span className="font-display text-[10px] tracking-[0.3em] uppercase block mb-1" style={{ color: atmo.textMuted }}>
              New Commander
            </span>
            <span className="font-display text-5xl md:text-7xl font-bold tracking-tight" style={{ color: atmo.accent }}>
              Drona
            </span>
            <span className="block font-display text-xs tracking-[0.15em] mt-2" style={{ color: atmo.textMuted }}>
              Objective: Capture Yudhishthira alive
            </span>
          </motion.div>

          {/* Horizontal rule */}
          <motion.div
            className="h-px w-full mb-8"
            style={{ background: atmo.borderColor }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          />

          {/* Karna — enters roster */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <span className="font-display text-[10px] tracking-[0.3em] uppercase block mb-1" style={{ color: atmo.textMuted }}>
              Entered the Field
            </span>
            <span className="font-display text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'hsl(355 70% 55%)' }}>
              Karna
            </span>
            <span className="block font-display text-xs tracking-[0.15em] mt-2" style={{ color: atmo.textMuted }}>
              First deployment — withheld until Bhishma's fall
            </span>
          </motion.div>
        </div>

        {/* Right — tactical info */}
        <div className="flex-1 flex flex-col items-end max-w-sm">
          <motion.div
            className="text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="font-display text-8xl md:text-[10rem] font-bold leading-none block" style={{ color: `${atmo.accent}15` }}>
              11
            </span>
          </motion.div>

          <motion.div
            className="text-right mt-6 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            <div className="flex items-center justify-end gap-3">
              <span className="font-mono text-[10px] tracking-wider" style={{ color: atmo.textMuted }}>Formation</span>
              <span className="font-display text-sm" style={{ color: atmo.textPrimary }}>Shakata · शकट</span>
            </div>
            <div className="h-px" style={{ background: atmo.borderColor }} />
            <div className="flex items-center justify-end gap-3">
              <span className="font-mono text-[10px] tracking-wider" style={{ color: atmo.textMuted }}>Strategy</span>
              <span className="font-display text-sm" style={{ color: atmo.textPrimary }}>Surgical capture</span>
            </div>
          </motion.div>

          <motion.p
            className="font-body text-sm italic text-right max-w-xs mt-8"
            style={{ color: atmo.textMuted }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
          >
            {hi.highlight}
          </motion.p>
        </div>
      </div>
    </DayShell>
  );
};
