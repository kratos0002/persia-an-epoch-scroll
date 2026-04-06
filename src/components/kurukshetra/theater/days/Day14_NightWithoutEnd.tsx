import React from 'react';
import { motion } from 'framer-motion';
import { DayShell, DayComponentProps } from './DayShell';
import { PHASE_ATMOSPHERE, DAY_HIGHLIGHTS } from '../theaterConstants';
import { DHARMA_RULES } from '../../kurukshetraData';

const hi = DAY_HIGHLIGHTS[14];
const violation = DHARMA_RULES.find(r => r.day === 14);

/** Day 14 — "Night Without End" ★ PIVOTAL
 *  Almost entirely black. Setting sun that never rises.
 *  Vasavi Shakti as a burning spear. Text emerges from darkness.
 *  Sentences appear alone, then fade — reading by firelight. */
export const Day14_NightWithoutEnd = (props: DayComponentProps) => {
  const atmo = PHASE_ATMOSPHERE[props.phase];

  // Small battle flashes in the darkness
  const flashes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    y: 20 + Math.random() * 60,
    delay: 2 + Math.random() * 8,
  }));

  const sentences = [
    'The sun set. The fighting did not stop.',
    'Ghatotkacha rampaged through the darkness.',
    'Karna had one weapon. One use. Meant for Arjuna.',
    'He spent it on the demon instead.',
  ];

  return (
    <DayShell {...props} bgOverride="linear-gradient(to bottom, hsl(240 20% 6%), hsl(0 0% 3%))" image="/kurukshetra/HErfP7abUAAlJh_.jpeg">
      {/* Sunset line that descends and extinguishes */}
      <motion.div
        className="absolute inset-x-0 h-px pointer-events-none z-[1]"
        style={{
          background: `linear-gradient(to right, transparent 20%, hsl(30 80% 45% / 0.5) 50%, transparent 80%)`,
        }}
        initial={{ top: '25%', opacity: 0.6 }}
        animate={{ top: ['25%', '55%', '60%'], opacity: [0.6, 0.3, 0] }}
        transition={{ duration: 4, delay: 0.5, ease: 'easeIn' }}
      />

      {/* Faint horizon glow */}
      <div
        className="absolute inset-x-0 top-[50%] h-32 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(25 60% 20% / 0.08), transparent 80%)',
        }}
      />

      {/* Battle flashes */}
      {flashes.map(f => (
        <motion.div
          key={f.id}
          className="absolute w-1 h-1 rounded-full pointer-events-none z-[1]"
          style={{ left: `${f.x}%`, top: `${f.y}%`, background: 'white' }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 0.15, delay: f.delay, repeat: Infinity, repeatDelay: 3 + Math.random() * 5 }}
        />
      ))}

      {/* Content — sentences appearing and fading */}
      <div className="h-full flex flex-col items-center justify-center text-center px-8 relative z-[2]">
        {/* Day number — barely visible */}
        <motion.span
          className="font-display text-7xl md:text-9xl font-bold leading-none absolute top-[15%]"
          style={{ color: 'hsl(0 0% 100% / 0.04)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 2 }}
        >
          14
        </motion.span>

        {/* Sequential sentences — each appears alone */}
        <div className="space-y-0 min-h-[200px] flex flex-col items-center justify-center">
          {sentences.map((text, i) => (
            <motion.p
              key={i}
              className="font-body text-base md:text-xl leading-relaxed max-w-lg"
              style={{ color: 'hsl(0 0% 95%)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0.3] }}
              transition={{
                duration: 3,
                delay: 1.5 + i * 2.5,
                times: [0, 0.2, 0.7, 1],
              }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* The burning spear — Vasavi Shakti */}
        <motion.div
          className="relative my-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 0.3 }}
        >
          <svg viewBox="0 0 200 20" className="w-48 md:w-64 h-auto">
            {/* Spear shaft */}
            <motion.line
              x1="20" y1="10" x2="180" y2="10"
              stroke="hsl(30 80% 50%)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 5, duration: 0.5 }}
            />
            {/* Spear head */}
            <motion.polygon
              points="180,10 195,6 195,14"
              fill="hsl(30 80% 50%)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 5.3, duration: 2 }}
            />
          </svg>
          {/* Glow around spear */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: '0 0 30px hsl(30 80% 50% / 0.3), 0 0 60px hsl(30 80% 50% / 0.1)' }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 5, duration: 2.5 }}
          />
        </motion.div>

        {/* Final line — stays */}
        <motion.p
          className="font-body text-lg md:text-2xl italic max-w-lg"
          style={{ color: 'hsl(0 0% 95%)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 7.5, duration: 1.5 }}
        >
          The weapon meant for Arjuna was gone.
        </motion.p>

        {/* Casualties */}
        <motion.div
          className="flex gap-6 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 8.5, duration: 1 }}
        >
          <span className="font-display text-sm tracking-[0.1em]" style={{ color: 'hsl(355 70% 55% / 0.6)' }}>
            Jayadratha †
          </span>
          <span className="font-display text-sm tracking-[0.1em]" style={{ color: 'hsl(42 85% 58% / 0.6)' }}>
            Ghatotkacha †
          </span>
        </motion.div>

        {/* Dharma violation */}
        {violation && (
          <motion.div
            className="mt-6 pl-4"
            style={{ borderLeft: '2px solid hsl(355 70% 55% / 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 9, duration: 1 }}
          >
            <p className="font-display text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: 'hsl(355 70% 55%)' }}>
              Dharma Broken
            </p>
            <p className="font-body text-xs italic" style={{ color: 'hsl(0 0% 95% / 0.4)' }}>
              {violation.violation}
            </p>
          </motion.div>
        )}
      </div>
    </DayShell>
  );
};
