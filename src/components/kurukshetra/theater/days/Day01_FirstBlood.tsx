import React from 'react';
import { motion } from 'framer-motion';
import { DayShell, DayComponentProps } from './DayShell';
import { PHASE_ATMOSPHERE, DAY_HIGHLIGHTS } from '../theaterConstants';
import { VYUHA_SHAPES } from '../../kurukshetraData';

const hi = DAY_HIGHLIGHTS[1];

/** Day 1 — "First Blood"
 *  Centered, ceremonial. Opposing vyuha formations drawn from center.
 *  Conch sound-wave concentric circles. First deaths fade in at bottom. */
// Light text overrides for image-backed Phase 1 panels
const IMG_TEXT = {
  primary: 'hsl(38 20% 95%)',
  muted: 'hsl(38 20% 95% / 0.6)',
};

export const Day01_FirstBlood = (props: DayComponentProps) => {
  const atmo = PHASE_ATMOSPHERE[props.phase];
  const kauravaShape = VYUHA_SHAPES['Sarvatomukhi'] || VYUHA_SHAPES['Sarvatobhadra'];
  const pandavaShape = VYUHA_SHAPES['Vajra'];

  return (
    <DayShell {...props} image="/kurukshetra/HErfAtcawAAtqd0.jpeg">
      {/* Conch sound-wave — concentric circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{ borderColor: `${atmo.accent}` }}
            initial={{ width: 0, height: 0, opacity: 0.6 }}
            animate={{
              width: [0, 200 + i * 140],
              height: [0, 200 + i * 140],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 2.5,
              delay: 0.8 + i * 0.3,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Two opposing formations */}
      <div className="absolute inset-0 flex items-center justify-center gap-16 md:gap-32 pointer-events-none z-0 opacity-[0.12]">
        {/* Kaurava formation — left */}
        <svg viewBox="0 0 100 100" className="w-40 h-40 md:w-56 md:h-56">
          {(kauravaShape?.paths || []).map((d, i) => (
            <motion.path
              key={`k-${i}`}
              d={d}
              fill="none"
              stroke={atmo.accent}
              strokeWidth={0.8}
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 1.8, delay: 1.2 + i * 0.2, ease: 'easeOut' }}
            />
          ))}
        </svg>

        {/* Pandava formation — right */}
        <svg viewBox="0 0 100 100" className="w-40 h-40 md:w-56 md:h-56">
          {(pandavaShape?.paths || []).map((d, i) => (
            <motion.path
              key={`p-${i}`}
              d={d}
              fill="none"
              stroke={atmo.accent}
              strokeWidth={0.8}
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 1.8, delay: 1.2 + i * 0.2, ease: 'easeOut' }}
            />
          ))}
        </svg>
      </div>

      {/* Center content */}
      <div className="h-full flex flex-col items-center justify-center text-center px-6 md:px-12">
        {/* Day label */}
        <motion.span
          className="font-display text-[10px] md:text-xs tracking-[0.5em] uppercase mb-4"
          style={{ color: IMG_TEXT.muted }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Day One
        </motion.span>

        {/* Day number */}
        <motion.span
          className="font-display text-8xl md:text-[10rem] font-bold leading-none"
          style={{ color: atmo.accent }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
        >
          1
        </motion.span>

        {/* Title */}
        <motion.h3
          className="font-display text-3xl md:text-5xl tracking-[0.06em] mt-6 mb-4"
          style={{ color: IMG_TEXT.primary }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {hi.title}
        </motion.h3>

        {/* Opening line — standalone */}
        <motion.p
          className="font-body text-sm md:text-base italic mb-4 max-w-lg"
          style={{ color: IMG_TEXT.muted }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          The conches sounded at dawn.
        </motion.p>

        {/* Highlight text */}
        <motion.p
          className="font-body text-base md:text-lg leading-relaxed max-w-xl"
          style={{ color: IMG_TEXT.primary }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {hi.highlight}
        </motion.p>

        {/* Formation labels */}
        <motion.div
          className="flex items-center gap-8 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <span className="font-display text-[10px] tracking-[0.2em] uppercase" style={{ color: IMG_TEXT.muted }}>
            Sarvatomukhi
          </span>
          <span className="font-display text-[10px] tracking-[0.3em]" style={{ color: atmo.borderColor }}>
            vs
          </span>
          <span className="font-display text-[10px] tracking-[0.2em] uppercase" style={{ color: IMG_TEXT.muted }}>
            Vajra
          </span>
        </motion.div>

        {/* First casualties — names dim after appearing */}
        <motion.div
          className="flex gap-6 mt-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 1, 0.4] }}
          transition={{ delay: 2.2, duration: 2, times: [0, 0.4, 1] }}
        >
          {props.day.casualties.map((c) => (
            <span
              key={c}
              className="font-display text-sm tracking-[0.1em]"
              style={{ color: 'hsl(42 85% 58%)' }}
            >
              {c.replace(/\s*\([PK].*?\)/, '')} †
            </span>
          ))}
        </motion.div>
      </div>
    </DayShell>
  );
};
