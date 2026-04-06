import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DayShell, DayComponentProps } from './DayShell';
import { PHASE_ATMOSPHERE, DAY_HIGHLIGHTS } from '../theaterConstants';

const hi = DAY_HIGHLIGHTS[7];

const LEDGER_LINES = [
  { label: 'Commander', value: 'Bhishma', side: 'K' },
  { label: 'Kaurava Formation', value: 'Mandala (Circle)', side: 'K' },
  { label: 'Pandava Formation', value: 'Vajra (Thunderbolt)', side: 'P' },
  { label: 'Fallen — Sankha', value: 'Son of Virata', side: 'P', highlight: true },
  { label: 'Status', value: 'Bhishma unstoppable', side: 'K' },
  { label: 'Alliance morale', value: 'Strained', side: 'P' },
];

/** Day 7 — "The Cost Revealed"
 *  Ledger/accounting aesthetic. Typewriter-style line reveal.
 *  War as bureaucratic horror. */
export const Day07_CostRevealed = (props: DayComponentProps) => {
  const atmo = PHASE_ATMOSPHERE[props.phase];
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= LEDGER_LINES.length) return;
    const timer = setTimeout(() => setVisibleLines(v => v + 1), 600);
    return () => clearTimeout(timer);
  }, [visibleLines]);

  return (
    <DayShell {...props}>
      <div className="h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-2xl mx-auto w-full">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="flex items-baseline gap-4 mb-2">
              <span className="font-display text-5xl md:text-7xl font-bold" style={{ color: atmo.accent }}>7</span>
              <span className="font-display text-[10px] tracking-[0.3em] uppercase" style={{ color: atmo.textMuted }}>
                Day Seven — Field Dispatch
              </span>
            </div>
            <div className="h-px w-full" style={{ background: atmo.borderColor }} />
          </motion.div>

          {/* Title */}
          <motion.h3
            className="font-display text-2xl md:text-3xl tracking-[0.04em] mb-8"
            style={{ color: atmo.textPrimary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {hi.title}
          </motion.h3>

          {/* Ledger lines — typewriter reveal */}
          <div className="space-y-3">
            {LEDGER_LINES.map((line, i) => (
              <motion.div
                key={i}
                className="flex items-baseline gap-4 border-b pb-2"
                style={{
                  borderColor: line.highlight ? 'hsl(355 70% 55% / 0.3)' : atmo.borderColor,
                  opacity: i < visibleLines ? 1 : 0,
                }}
              >
                <span
                  className="font-mono text-[10px] md:text-xs tracking-[0.15em] uppercase shrink-0 w-40 md:w-48"
                  style={{ color: atmo.textMuted }}
                >
                  {line.label}
                </span>
                <span className="flex-1 font-mono text-[10px] md:text-xs tracking-wider" style={{ color: atmo.textMuted }}>
                  {'·'.repeat(20)}
                </span>
                <span
                  className="font-display text-sm md:text-base shrink-0"
                  style={{
                    color: line.highlight ? 'hsl(355 70% 55%)' : atmo.textPrimary,
                  }}
                >
                  {line.value}
                </span>
                <span
                  className="font-mono text-[9px] tracking-widest shrink-0 w-6 text-right"
                  style={{ color: line.side === 'P' ? 'hsl(42 85% 58% / 0.5)' : 'hsl(355 70% 55% / 0.5)' }}
                >
                  [{line.side}]
                </span>
              </motion.div>
            ))}
          </div>

          {/* Running tally */}
          <motion.div
            className="mt-8 pt-4 border-t flex items-center gap-6"
            style={{ borderColor: atmo.borderColor }}
            initial={{ opacity: 0 }}
            animate={{ opacity: visibleLines >= LEDGER_LINES.length ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: atmo.textMuted }}>
              Cumulative fallen
            </span>
            <span className="font-display text-lg tabular-nums" style={{ color: 'hsl(355 70% 55%)' }}>
              {props.cumulativeFallen}
            </span>
          </motion.div>

          {/* Highlight */}
          <motion.p
            className="font-body text-sm md:text-base italic mt-6 max-w-lg"
            style={{ color: atmo.textMuted }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
          >
            {hi.highlight}
          </motion.p>
        </div>
      </div>
    </DayShell>
  );
};
