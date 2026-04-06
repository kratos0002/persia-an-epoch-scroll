import React from 'react';
import { motion } from 'framer-motion';
import { DayShell, DayComponentProps } from './DayShell';
import { PHASE_ATMOSPHERE, DAY_HIGHLIGHTS } from '../theaterConstants';

const hi = DAY_HIGHLIGHTS[2];

/** Day 2 — "The Duel of Love"
 *  Split-screen — Arjuna painting left, Bhishma painting right.
 *  Gold pulsing divider. Arrows cross. Text overlay at bottom. */
const IMG_TEXT = {
  primary: 'hsl(38 20% 95%)',
  muted: 'hsl(38 20% 95% / 0.6)',
};

export const Day02_DuelOfLove = (props: DayComponentProps) => {
  const atmo = PHASE_ATMOSPHERE[props.phase];

  return (
    <DayShell {...props}>
      <div className="h-full flex relative">
        {/* Left — Arjuna side with painting */}
        <div className="flex-1 relative overflow-hidden">
          {/* Arjuna painting */}
          <img
            src="/kurukshetra/HErffZRW4AAuOMX.jpeg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          {/* Scrim — darker on right edge for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, hsl(0 0% 0% / 0.2) 0%, hsl(0 0% 0% / 0.5) 70%, hsl(0 0% 0% / 0.7) 100%)',
            }}
          />
          {/* Name overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-end pr-8 md:pr-16 z-10">
            <motion.div
              className="text-right"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <span
                className="font-display text-[10px] md:text-xs tracking-[0.4em] uppercase block mb-2"
                style={{ color: IMG_TEXT.muted }}
              >
                The Son
              </span>
              <span
                className="font-display text-4xl md:text-7xl font-bold tracking-[0.04em]"
                style={{ color: atmo.accent }}
              >
                Arjuna
              </span>
            </motion.div>

            {/* Arrows flying right */}
            <div className="mt-8 relative w-40 h-12 overflow-hidden">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={`ar-${i}`}
                  className="absolute h-px top-1/2"
                  style={{
                    width: 60,
                    background: `linear-gradient(to right, transparent, ${atmo.accent}, transparent)`,
                  }}
                  initial={{ x: -80, opacity: 0 }}
                  animate={{ x: [-80, 160], opacity: [0, 0.7, 0] }}
                  transition={{
                    duration: 2,
                    delay: 1.5 + i * 0.6,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Center divider — gold pulsing line */}
        <motion.div
          className="w-px self-stretch my-24 md:my-32 shrink-0 z-10"
          style={{ background: atmo.accent }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Right — Bhishma side with painting */}
        <div className="flex-1 relative overflow-hidden">
          {/* Bhishma painting */}
          <img
            src="/kurukshetra/HErfiSsbIAAvdlK.jpeg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          {/* Scrim — darker on left edge */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to left, hsl(0 0% 0% / 0.2) 0%, hsl(0 0% 0% / 0.5) 70%, hsl(0 0% 0% / 0.7) 100%)',
            }}
          />
          {/* Name overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-start pl-8 md:pl-16 z-10">
            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <span
                className="font-display text-[10px] md:text-xs tracking-[0.4em] uppercase block mb-2"
                style={{ color: IMG_TEXT.muted }}
              >
                The Grandfather
              </span>
              <span
                className="font-display text-4xl md:text-7xl font-bold tracking-[0.04em]"
                style={{ color: atmo.accent }}
              >
                Bhishma
              </span>
            </motion.div>

            {/* Arrows flying left */}
            <div className="mt-8 relative w-40 h-12 overflow-hidden">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={`bl-${i}`}
                  className="absolute h-px top-1/2 right-0"
                  style={{
                    width: 60,
                    background: `linear-gradient(to left, transparent, ${atmo.accent}, transparent)`,
                  }}
                  initial={{ x: 80, opacity: 0 }}
                  animate={{ x: [80, -160], opacity: [0, 0.7, 0] }}
                  transition={{
                    duration: 2,
                    delay: 1.8 + i * 0.6,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Center text overlay — bottom */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-28 pointer-events-none z-10">
          <motion.p
            className="font-display text-[10px] tracking-[0.4em] uppercase mb-3"
            style={{ color: IMG_TEXT.muted }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Day 2
          </motion.p>
          <motion.h3
            className="font-display text-2xl md:text-4xl tracking-[0.04em] mb-4"
            style={{ color: IMG_TEXT.primary }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            {hi.title}
          </motion.h3>
          <motion.p
            className="font-body text-sm md:text-base italic max-w-md text-center"
            style={{ color: IMG_TEXT.muted }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
          >
            <em>Bound by love and duty</em> — the duel was fierce but inconclusive.
          </motion.p>
        </div>
      </div>
    </DayShell>
  );
};
