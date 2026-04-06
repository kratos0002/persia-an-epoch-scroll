import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { DayShell, DayComponentProps } from './DayShell';
import { PHASE_ATMOSPHERE, DAY_HIGHLIGHTS } from '../theaterConstants';

const hi = DAY_HIGHLIGHTS[3];

/** Day 3 — "The Crescent"
 *  Full-screen crescent formation — the Ardha Chandra sweeps across
 *  the viewport as a massive arc of warrior dots. Bhima & Ghatotkacha
 *  charge through the center toward Duryodhana who collapses.
 *  Garuda formation faintly visible on the opposing side. */
export const Day03_Crescent = (props: DayComponentProps) => {
  const atmo = PHASE_ATMOSPHERE[props.phase];

  // Pandava crescent — warrior dots along the arc
  const warriors = useMemo(() =>
    Array.from({ length: 55 }, (_, i) => {
      const t = i / 54;
      const angle = Math.PI * 0.12 + t * Math.PI * 0.76;
      const radiusX = 43;
      const radiusY = 28;
      const cx = 50 + Math.cos(angle) * radiusX;
      const cy = 52 - Math.sin(angle) * radiusY;
      const size = 0.6 + Math.random() * 0.6;
      return { id: i, cx, cy, size, delay: t * 1.4 };
    }),
  []);

  // Garuda (Kaurava) formation dots — a V-shape behind the crescent
  const garudaDots = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => {
      const t = i / 23;
      const side = t < 0.5 ? -1 : 1;
      const progress = t < 0.5 ? t * 2 : (t - 0.5) * 2;
      const cx = 50 + side * (5 + progress * 20);
      const cy = 18 + progress * 18;
      const size = 0.5 + Math.random() * 0.4;
      return { id: i, cx, cy, size, delay: 0.8 + progress * 0.6 };
    }),
  []);

  // Flanking dots — warriors enveloping from the crescent tips
  const flankDots = useMemo(() =>
    Array.from({ length: 10 }, (_, i) => {
      const fromLeft = i < 5;
      return {
        id: i,
        startX: fromLeft ? 8 + i * 2 : 90 - (i - 5) * 2,
        startY: 56 + Math.random() * 4,
        endX: 50 + (fromLeft ? -8 : 8) + (Math.random() - 0.5) * 10,
        endY: 68 + Math.random() * 4,
        delay: 3 + i * 0.12,
      };
    }),
  []);

  return (
    <DayShell {...props}>
      {/* Full-screen formation SVG */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          {/* Crescent arc lines — multiple sweeping arcs */}
          {[0, 1, 2].map((ring) => (
            <motion.path
              key={`arc-${ring}`}
              d={`M${7 + ring * 5},${54 + ring * 2} Q50,${16 + ring * 7} ${93 - ring * 5},${54 + ring * 2}`}
              fill="none"
              stroke={atmo.accent}
              strokeWidth={1.2 - ring * 0.3}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.25 - ring * 0.06 }}
              transition={{ duration: 2, delay: 0.3 + ring * 0.4, ease: 'easeOut' }}
            />
          ))}

          {/* Garuda V-shape — faint opposing formation */}
          <motion.path
            d="M50,12 L28,38 M50,12 L72,38"
            fill="none"
            stroke={atmo.accent}
            strokeWidth={0.6}
            strokeLinecap="round"
            strokeDasharray="2 3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.12 }}
            transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
          />
          {garudaDots.map((d) => (
            <motion.circle
              key={`g-${d.id}`}
              cx={d.cx} cy={d.cy} r={d.size}
              fill={atmo.accent}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ delay: d.delay, duration: 0.4 }}
            />
          ))}

          {/* Pandava warrior dots along the crescent */}
          {warriors.map((w) => (
            <motion.circle
              key={`w-${w.id}`}
              cx={w.cx} cy={w.cy} r={w.size}
              fill={atmo.accent}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.65, 0.45], scale: 1 }}
              transition={{ delay: 0.5 + w.delay, duration: 0.5 }}
            />
          ))}

          {/* === BHIMA — large dot charging toward Duryodhana === */}
          <motion.circle
            cx={42} cy={66}
            r={3}
            fill={atmo.accent}
            initial={{ cx: 42, cy: 30, opacity: 0 }}
            animate={{ cx: 42, cy: [30, 66], opacity: [0, 1] }}
            transition={{ delay: 2, duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          />
          <motion.text
            x={42} y={73}
            textAnchor="middle"
            fill={atmo.accent}
            fontSize="2.2"
            letterSpacing="0.2em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 3.2, duration: 0.6 }}
          >
            BHIMA
          </motion.text>

          {/* === GHATOTKACHA — beside Bhima, slightly behind === */}
          <motion.circle
            cx={54} cy={64}
            r={2.5}
            fill={atmo.accent}
            initial={{ cx: 54, cy: 28, opacity: 0 }}
            animate={{ cx: 54, cy: [28, 64], opacity: [0, 0.85] }}
            transition={{ delay: 2.2, duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          />
          <motion.text
            x={54} y={60}
            textAnchor="middle"
            fill={atmo.accent}
            fontSize="1.6"
            letterSpacing="0.15em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 3.4, duration: 0.6 }}
          >
            GHATOTKACHA
          </motion.text>

          {/* === DURYODHANA — target, collapses === */}
          <motion.circle
            cx={48} cy={76}
            r={2.5}
            fill="none"
            stroke="hsl(355 70% 55%)"
            strokeWidth={0.8}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0.8, 0.15] }}
            transition={{ delay: 2, duration: 3.5, times: [0, 0.15, 0.5, 1] }}
          />
          <motion.text
            x={48} y={83}
            textAnchor="middle"
            fill="hsl(355 70% 55%)"
            fontSize="1.8"
            letterSpacing="0.15em"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 0.7, 0.25], y: [0, 0, 3] }}
            transition={{ delay: 3.8, duration: 2.5, times: [0, 0.3, 1] }}
          >
            DURYODHANA
          </motion.text>

          {/* Impact flash — Bhima's arrow strikes */}
          <motion.circle
            cx={48} cy={74}
            r={0}
            fill="hsl(355 70% 55% / 0.3)"
            initial={{ r: 0, opacity: 0 }}
            animate={{ r: [0, 8, 0], opacity: [0, 0.4, 0] }}
            transition={{ delay: 3.3, duration: 0.8 }}
          />

          {/* Flanking dots — enveloping from the crescent wings */}
          {flankDots.map((f) => (
            <motion.circle
              key={`fl-${f.id}`}
              r={0.8}
              fill={atmo.accent}
              initial={{ cx: f.startX, cy: f.startY, opacity: 0 }}
              animate={{
                cx: [f.startX, f.endX],
                cy: [f.startY, f.endY],
                opacity: [0, 0.5, 0.25],
              }}
              transition={{ delay: f.delay, duration: 1.5, ease: 'easeInOut' }}
            />
          ))}

          {/* Formation labels */}
          <motion.text
            x={50} y={8}
            textAnchor="middle"
            fill={atmo.textMuted}
            fontSize="1.5"
            letterSpacing="0.2em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            GARUDA
          </motion.text>
          <motion.text
            x={50} y={96}
            textAnchor="middle"
            fill={atmo.textMuted}
            fontSize="2"
            letterSpacing="0.3em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            ARDHA CHANDRA · अर्धचन्द्र
          </motion.text>
        </svg>
      </div>

      {/* Text overlay — bottom left */}
      <div className="absolute bottom-16 left-8 md:left-16 lg:left-24 z-10 max-w-lg">
        <motion.div
          className="flex items-baseline gap-4 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="font-display text-5xl md:text-7xl font-bold leading-none" style={{ color: atmo.accent }}>
            3
          </span>
          <span className="font-display text-[10px] md:text-xs tracking-[0.25em] uppercase" style={{ color: atmo.textMuted }}>
            Bhishma commands
          </span>
        </motion.div>

        <motion.h3
          className="font-display text-2xl md:text-4xl tracking-[0.04em] mb-3"
          style={{ color: atmo.textPrimary }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {hi.title}
        </motion.h3>

        <motion.p
          className="font-body text-sm md:text-base leading-relaxed"
          style={{ color: atmo.textPrimary }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          The crescent enveloped the flanks. Bhima and Ghatotkacha
          attacked Duryodhana directly — the Kaurava prince fainted
          and was pulled from the field.
        </motion.p>
      </div>
    </DayShell>
  );
};
