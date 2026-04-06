import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { DayShell, DayComponentProps } from './DayShell';
import { PHASE_ATMOSPHERE, DAY_HIGHLIGHTS } from '../theaterConstants';
import { DHARMA_RULES } from '../../kurukshetraData';

const hi = DAY_HIGHLIGHTS[18];
const violations = DHARMA_RULES.filter(r => r.day === 18);

/** Day 18 — "Ash & Silence" ★ PIVOTAL
 *  Full dissolution. Content starts structured, then falls apart.
 *  Letters fragment and drift. Only "The Kali Yuga had begun." remains solid. */
export const Day18_AshSilence = (props: DayComponentProps) => {
  const atmo = PHASE_ATMOSPHERE[props.phase];

  // Characters for the dissolving title
  const titleChars = 'ASH & SILENCE'.split('');

  // Scattered particles
  const particles = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      size: 1 + Math.random() * 3,
      delay: 4 + Math.random() * 3,
      dx: (Math.random() - 0.5) * 200,
      dy: (Math.random() - 0.5) * 200,
    })),
  []);

  return (
    <DayShell {...props} bgOverride="linear-gradient(to bottom, hsl(30 5% 10%), hsl(0 0% 6%), hsl(0 0% 4%))">
      {/* Ash particles drifting */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: `hsl(30 5% ${40 + Math.random() * 20}% / 0.3)`,
            }}
            animate={{
              x: [0, p.dx],
              y: [0, p.dy],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 6,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      <div className="h-full flex flex-col items-center justify-center text-center px-8 relative z-[2]">
        {/* Day number — starts normal, then letter-spaces apart */}
        <motion.span
          className="font-display text-7xl md:text-9xl font-bold leading-none mb-4"
          style={{ color: atmo.accent }}
          initial={{ letterSpacing: '0.04em', opacity: 0.4 }}
          animate={{
            letterSpacing: ['0.04em', '0.04em', '0.3em'],
            opacity: [0.4, 0.4, 0.15],
          }}
          transition={{ duration: 8, delay: 2, times: [0, 0.3, 1] }}
        >
          18
        </motion.span>

        {/* Title — characters fragmenting */}
        <div className="flex justify-center mb-8 overflow-visible">
          {titleChars.map((char, i) => (
            <motion.span
              key={i}
              className="font-display text-3xl md:text-5xl font-bold tracking-[0.06em] inline-block"
              style={{ color: atmo.textPrimary }}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: [0, 1, 1, 0.2],
                y: [10, 0, 0, (Math.random() - 0.5) * 40],
                x: [0, 0, 0, (Math.random() - 0.5) * 30],
                rotate: [0, 0, 0, (Math.random() - 0.5) * 15],
              }}
              transition={{
                duration: 8,
                delay: 0.5 + i * 0.05,
                times: [0, 0.15, 0.5, 1],
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>

        {/* Narrative — fades and drifts */}
        <motion.p
          className="font-body text-base md:text-lg leading-relaxed max-w-lg"
          style={{ color: atmo.textPrimary }}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: [0, 0.8, 0.8, 0.2],
            y: [10, 0, 0, -15],
            letterSpacing: ['0em', '0em', '0em', '0.1em'],
          }}
          transition={{ duration: 10, delay: 1, times: [0, 0.1, 0.5, 1] }}
        >
          Bhima struck Duryodhana's thigh. The last commander fell.
        </motion.p>

        {/* Casualties — dissolving */}
        <motion.div
          className="flex gap-6 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.6, 0.15] }}
          transition={{ duration: 8, delay: 2, times: [0, 0.1, 0.4, 1] }}
        >
          {['Shalya', 'Shakuni', 'Duryodhana'].map(name => (
            <span key={name} className="font-display text-sm tracking-[0.1em]" style={{ color: 'hsl(355 70% 55% / 0.5)' }}>
              {name} †
            </span>
          ))}
        </motion.div>

        {/* THE line that remains solid — everything else fades but this persists */}
        <motion.p
          className="font-display text-xl md:text-3xl tracking-[0.06em] mt-16"
          style={{ color: atmo.textPrimary }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 2 }}
        >
          The Kali Yuga had begun.
        </motion.p>

        {/* Dharma violations */}
        <motion.div
          className="flex gap-8 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.6, 0.2] }}
          transition={{ duration: 8, delay: 3, times: [0, 0.1, 0.4, 1] }}
        >
          {violations.map((v, i) => (
            <div key={i} className="pl-3" style={{ borderLeft: '2px solid hsl(355 70% 55% / 0.3)' }}>
              <p className="font-display text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: 'hsl(355 70% 55% / 0.5)' }}>
                Dharma {i + 5}/6
              </p>
              <p className="font-body text-[10px] italic max-w-[200px]" style={{ color: atmo.textMuted }}>
                {v.violation.slice(0, 60)}…
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </DayShell>
  );
};
