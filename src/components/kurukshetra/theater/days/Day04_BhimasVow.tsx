import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DayShell, DayComponentProps } from './DayShell';
import { PHASE_ATMOSPHERE, DAY_HIGHLIGHTS } from '../theaterConstants';

const hi = DAY_HIGHLIGHTS[4];

const IMG_TEXT = {
  primary: 'hsl(38 20% 95%)',
  muted: 'hsl(38 20% 95% / 0.6)',
};

/** Day 4 — "Bhima's Vow Begins"
 *  Bhima painting on the left, massive counter 0→8 on the right.
 *  Each count triggers a red flash. The mace falls. */
export const Day04_BhimasVow = (props: DayComponentProps) => {
  const atmo = PHASE_ATMOSPHERE[props.phase];
  const [count, setCount] = useState(0);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (count >= 8) return;
    const timer = setTimeout(() => {
      setCount(c => c + 1);
      setFlash(true);
      setTimeout(() => setFlash(false), 150);
    }, 800 + count * 120);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <DayShell {...props}>
      {/* Red flash overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div
            className="absolute inset-0 z-[5] pointer-events-none"
            style={{ background: 'hsl(355 70% 40% / 0.15)' }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <div className="h-full flex relative">
        {/* Left — Bhima painting */}
        <div className="w-[45%] md:w-[40%] relative overflow-hidden">
          <img
            src="/kurukshetra/CDN_WELL_581792i-001.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          {/* Scrim — darkens right edge for blending */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, hsl(0 0% 0% / 0.1) 0%, hsl(0 0% 0% / 0.35) 60%, hsl(0 0% 0% / 0.65) 100%)',
            }}
          />
          {/* Bottom scrim for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, hsl(0 0% 0% / 0.6) 0%, hsl(0 0% 0% / 0.1) 40%, transparent 60%)',
            }}
          />

          {/* Text overlay on painting */}
          <div className="absolute bottom-12 left-6 md:left-12 z-10 max-w-xs">
            <motion.div
              className="flex items-baseline gap-3 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="font-display text-5xl md:text-7xl font-bold leading-none" style={{ color: atmo.accent }}>
                4
              </span>
              <span className="font-display text-[9px] md:text-[10px] tracking-[0.25em] uppercase" style={{ color: IMG_TEXT.muted }}>
                Bhishma commands
              </span>
            </motion.div>

            <motion.h3
              className="font-display text-xl md:text-3xl tracking-[0.04em] mb-2"
              style={{ color: IMG_TEXT.primary }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {hi.title}
            </motion.h3>

            <motion.p
              className="font-body text-xs md:text-sm leading-relaxed"
              style={{ color: IMG_TEXT.muted }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              The Mandala could not hold against Bhima&rsquo;s wrath.
              The Pandava horn formation pierced deep into the Kaurava center.
            </motion.p>
          </div>
        </div>

        {/* Right — massive counter */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-12">
          <motion.span
            className="font-display text-[10rem] md:text-[16rem] font-bold leading-none block"
            style={{ color: 'hsl(355 70% 55%)' }}
            animate={flash ? { x: [0, -5, 5, -3, 0] } : {}}
            transition={{ duration: 0.15 }}
          >
            {count}
          </motion.span>

          <motion.span
            className="font-display text-[10px] md:text-xs tracking-[0.3em] uppercase block mt-2"
            style={{ color: atmo.textMuted }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Brothers fallen
          </motion.span>

          {/* Vow context — appears after count finishes */}
          <motion.p
            className="font-body text-xs md:text-sm italic text-center max-w-xs mt-8"
            style={{ color: atmo.textMuted }}
            initial={{ opacity: 0 }}
            animate={{ opacity: count >= 8 ? 0.6 : 0 }}
            transition={{ duration: 1 }}
          >
            Duryodhana had one hundred brothers. Bhima had sworn to kill them all.
          </motion.p>

          {/* Formation labels — subtle */}
          <motion.div
            className="flex items-center gap-4 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <span className="font-display text-[9px] tracking-[0.2em] uppercase" style={{ color: atmo.textMuted }}>
              Mandala
            </span>
            <span className="font-display text-[9px] tracking-[0.3em]" style={{ color: atmo.borderColor }}>
              vs
            </span>
            <span className="font-display text-[9px] tracking-[0.2em] uppercase" style={{ color: atmo.textMuted }}>
              Sringataka
            </span>
          </motion.div>
        </div>
      </div>
    </DayShell>
  );
};
