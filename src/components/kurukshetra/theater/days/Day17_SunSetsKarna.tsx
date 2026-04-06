import React from 'react';
import { motion } from 'framer-motion';
import { DayShell, DayComponentProps } from './DayShell';
import { PHASE_ATMOSPHERE, DAY_HIGHLIGHTS } from '../theaterConstants';
import { DHARMA_RULES } from '../../kurukshetraData';

const hi = DAY_HIGHLIGHTS[17];
const violation = DHARMA_RULES.find(r => r.day === 17);

/** Day 17 — "The Sun Sets on Karna" ★ PIVOTAL
 *  Chariot wheel sinking on one side, archer drawing on the other.
 *  Setting sun descends throughout. "Strike now." in massive text. */
export const Day17_SunSetsKarna = (props: DayComponentProps) => {
  const atmo = PHASE_ATMOSPHERE[props.phase];

  return (
    <DayShell {...props} image="/kurukshetra/HErfqdrWkAAOjKP.jpeg">
      {/* Setting sun — golden circle descending */}
      <motion.div
        className="absolute right-[15%] w-20 h-20 md:w-32 md:h-32 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, hsl(30 80% 50% / 0.3), hsl(30 80% 50% / 0.1), transparent 70%)',
          boxShadow: '0 0 60px hsl(30 80% 50% / 0.2)',
        }}
        initial={{ top: '10%' }}
        animate={{ top: ['10%', '55%'] }}
        transition={{ duration: 8, ease: 'easeIn' }}
      />

      {/* Horizon line */}
      <div
        className="absolute left-0 right-0 top-[60%] h-px pointer-events-none z-0"
        style={{ background: `linear-gradient(to right, transparent 10%, hsl(30 40% 30% / 0.3) 50%, transparent 90%)` }}
      />

      <div className="h-full flex items-center relative z-[2]">
        {/* Left — sinking chariot wheel */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.svg
            viewBox="0 0 120 120"
            className="w-32 h-32 md:w-48 md:h-48"
            initial={{ y: 0 }}
            animate={{ y: [0, 30, 50] }}
            transition={{ duration: 6, delay: 1, ease: 'easeIn' }}
          >
            {/* Wheel */}
            <circle cx="60" cy="60" r="45" fill="none" stroke={atmo.textMuted} strokeWidth="2" opacity="0.4" />
            <circle cx="60" cy="60" r="8" fill="none" stroke={atmo.textMuted} strokeWidth="1.5" opacity="0.3" />
            {/* Spokes */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 45) * Math.PI / 180;
              return (
                <line
                  key={i}
                  x1={60 + Math.cos(angle) * 10}
                  y1={60 + Math.sin(angle) * 10}
                  x2={60 + Math.cos(angle) * 43}
                  y2={60 + Math.sin(angle) * 43}
                  stroke={atmo.textMuted}
                  strokeWidth="1"
                  opacity="0.3"
                />
              );
            })}
            {/* Earth/mud at bottom */}
            <motion.rect
              x="0" y="90" width="120" height="30"
              fill={atmo.bgFrom}
              initial={{ y: 110 }}
              animate={{ y: [110, 85] }}
              transition={{ duration: 6, delay: 1, ease: 'easeIn' }}
            />
          </motion.svg>

          <motion.span
            className="font-display text-xs tracking-[0.2em] uppercase mt-4"
            style={{ color: atmo.textMuted }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 2, duration: 1 }}
          >
            The wheel sinks
          </motion.span>
        </div>

        {/* Center — the command */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          {/* Day number */}
          <motion.span
            className="font-display text-5xl md:text-7xl font-bold mb-4"
            style={{ color: `${atmo.accent}30` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            17
          </motion.span>

          {/* Krishna's voice */}
          <motion.p
            className="font-body text-sm italic mb-2"
            style={{ color: atmo.textMuted }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
          >
            Remember Abhimanyu.
          </motion.p>

          {/* STRIKE NOW — the largest text */}
          <motion.h2
            className="font-display text-5xl md:text-8xl lg:text-[7rem] font-bold tracking-[0.06em] uppercase"
            style={{ color: atmo.textPrimary }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 4.5, duration: 0.5 }}
          >
            Strike now.
          </motion.h2>

          {/* Karna dissolves */}
          <motion.span
            className="font-display text-3xl md:text-5xl tracking-[0.06em] mt-6"
            style={{ color: atmo.accent }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0.8, 0] }}
            transition={{ delay: 5.5, duration: 3, times: [0, 0.2, 0.6, 1] }}
          >
            Karna
          </motion.span>
        </div>

        {/* Right — arrow drawn */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.svg
            viewBox="0 0 100 200"
            className="w-16 h-32 md:w-20 md:h-40"
          >
            {/* Bow */}
            <motion.path
              d="M30,20 Q80,100 30,180"
              fill="none"
              stroke={atmo.textMuted}
              strokeWidth="2"
              opacity="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 2, duration: 1.5 }}
            />
            {/* Bowstring drawn */}
            <motion.line
              x1="30" y1="20" x2="30" y2="180"
              stroke={atmo.textMuted}
              strokeWidth="0.8"
              opacity="0.3"
            />
            {/* Arrow */}
            <motion.line
              x1="30" y1="100" x2="-20" y2="100"
              stroke="hsl(42 85% 58%)"
              strokeWidth="1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0], x2: [-20, -20, -200] }}
              transition={{ delay: 5, duration: 1, times: [0, 0.3, 1] }}
            />
          </motion.svg>
        </div>
      </div>

      {/* Casualties + violation at bottom */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center z-[3]">
        <motion.div
          className="flex gap-6 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 7, duration: 1 }}
        >
          <span className="font-display text-sm tracking-[0.1em]" style={{ color: 'hsl(355 70% 55% / 0.6)' }}>Karna †</span>
          <span className="font-display text-sm tracking-[0.1em]" style={{ color: 'hsl(355 70% 55% / 0.6)' }}>Duhshasana †</span>
        </motion.div>

        {violation && (
          <motion.p
            className="font-body text-xs italic"
            style={{ color: 'hsl(355 70% 55% / 0.4)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 7.5, duration: 1 }}
          >
            {violation.violation}
          </motion.p>
        )}
      </div>
    </DayShell>
  );
};
