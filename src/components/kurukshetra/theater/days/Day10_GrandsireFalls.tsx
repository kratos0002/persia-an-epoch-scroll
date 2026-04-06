import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { DayShell, DayComponentProps } from './DayShell';
import { PHASE_ATMOSPHERE, DAY_HIGHLIGHTS } from '../theaterConstants';

const hi = DAY_HIGHLIGHTS[10];

/** Day 10 — "The Grandsire Falls" ★ PIVOTAL
 *  Full-viewport cinematic. Rain of arrows accumulating into a bed.
 *  Bhishma's name fades from gold to grey. Background cracks. */
export const Day10_GrandsireFalls = (props: DayComponentProps) => {
  const atmo = PHASE_ATMOSPHERE[props.phase];

  // Generate arrow rain
  const arrows = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      delay: Math.random() * 3,
      duration: 1 + Math.random() * 1.5,
      rotation: -80 + Math.random() * 20,
      length: 15 + Math.random() * 20,
    })),
  []);

  return (
    <DayShell {...props} image="/kurukshetra/HErfiSsbIAAvdlK.jpeg">
      {/* Arrow rain */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {arrows.map(a => (
          <motion.div
            key={a.id}
            className="absolute"
            style={{
              left: `${a.x}%`,
              width: 1.5,
              height: a.length,
              background: `linear-gradient(to bottom, ${atmo.accent}80, ${atmo.accent}20)`,
              transform: `rotate(${a.rotation}deg)`,
              transformOrigin: 'top center',
            }}
            initial={{ top: '-5%', opacity: 0 }}
            animate={{
              top: ['0%', '55%'],
              opacity: [0, 0.6, 0.6, 0.2],
            }}
            transition={{
              duration: a.duration,
              delay: a.delay,
              ease: [0.4, 0, 0.6, 1],
            }}
          />
        ))}

        {/* Accumulated arrows — the bed of shafts */}
        <motion.div
          className="absolute bottom-[35%] left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 2 }}
        >
          <svg viewBox="0 0 400 60" className="w-64 md:w-96 h-auto">
            {Array.from({ length: 40 }).map((_, i) => {
              const x = i * 10 + Math.random() * 5;
              const angle = -75 + Math.random() * 30;
              return (
                <line
                  key={i}
                  x1={x} y1={60}
                  x2={x + Math.cos(angle * Math.PI / 180) * 40}
                  y2={60 + Math.sin(angle * Math.PI / 180) * 40}
                  stroke={atmo.accent}
                  strokeWidth="0.8"
                  opacity={0.3 + Math.random() * 0.3}
                />
              );
            })}
          </svg>
        </motion.div>
      </div>

      {/* Content — centered */}
      <div className="h-full flex flex-col items-center justify-center text-center px-8 relative z-[2]">
        {/* Day label */}
        <motion.span
          className="font-display text-[10px] tracking-[0.5em] uppercase mb-4"
          style={{ color: atmo.textMuted }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Day Ten
        </motion.span>

        {/* Shikhandi shield */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <svg viewBox="0 0 60 60" className="w-10 h-10">
            <circle cx="30" cy="30" r="25" fill="none" stroke={atmo.accent} strokeWidth="1" opacity="0.4" />
            <circle cx="30" cy="30" r="15" fill="none" stroke={atmo.accent} strokeWidth="0.5" opacity="0.3" />
            <text x="30" y="34" textAnchor="middle" fill={atmo.textMuted} fontSize="8" fontFamily="inherit">शि</text>
          </svg>
          <span className="font-display text-[9px] tracking-[0.2em] uppercase block mt-1" style={{ color: atmo.textMuted }}>
            Shikhandi
          </span>
        </motion.div>

        {/* Bhishma — name fading from gold to grey */}
        <motion.h2
          className="font-display text-6xl md:text-[8rem] font-bold tracking-[0.06em] mb-4"
          initial={{ color: 'hsl(42 85% 58%)' }}
          animate={{ color: ['hsl(42 85% 58%)', 'hsl(42 85% 58%)', 'hsl(30 5% 45%)'] }}
          transition={{ duration: 5, delay: 2, times: [0, 0.4, 1] }}
        >
          Bhishma
        </motion.h2>

        {/* The key line — given space to breathe */}
        <motion.p
          className="font-body text-lg md:text-2xl leading-relaxed max-w-2xl italic"
          style={{ color: atmo.textPrimary }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 1.2 }}
        >
          He fell upon a bed of shafts, his body not touching the ground.
        </motion.p>

        {/* Crack effect — background splits */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[4]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 2 }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <motion.path
              d="M48,0 L50,15 L47,30 L52,45 L49,55 L53,70 L48,85 L50,100"
              fill="none"
              stroke="hsl(355 70% 55% / 0.3)"
              strokeWidth="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 5, duration: 2, ease: 'easeOut' }}
            />
            <motion.path
              d="M0,48 L20,50 L35,47 L50,52 L65,49 L80,53 L100,50"
              fill="none"
              stroke="hsl(355 70% 55% / 0.2)"
              strokeWidth="0.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 5.5, duration: 1.5, ease: 'easeOut' }}
            />
          </svg>
        </motion.div>

        {/* Phase transition hint */}
        <motion.p
          className="font-display text-[10px] tracking-[0.4em] uppercase mt-8"
          style={{ color: 'hsl(355 70% 55% / 0.6)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6, duration: 1.5 }}
        >
          The first commander was down. The first phase was over.
        </motion.p>
      </div>
    </DayShell>
  );
};
