import React from 'react';
import { motion } from 'framer-motion';
import { DayShell, DayComponentProps } from './DayShell';
import { PHASE_ATMOSPHERE, DAY_HIGHLIGHTS } from '../theaterConstants';
import { DHARMA_RULES } from '../../kurukshetraData';

const hi = DAY_HIGHLIGHTS[13];
const violation = DHARMA_RULES.find(r => r.day === 13);

const SIX_WARRIORS = ['Drona', 'Karna', 'Kripa', 'Ashwatthama', 'Kritavarma', 'Shakuni'];

/** Day 13 — "The Wheel That Would Not Open" ★ PIVOTAL
 *  CONCENTRIC. Chakra Vyuha as massive rings filling viewport.
 *  Abhimanyu's path pierces inward but cannot exit.
 *  Six warrior names close in. Entire panel slowly rotates. */
export const Day13_ChakraVyuha = (props: DayComponentProps) => {
  const atmo = PHASE_ATMOSPHERE[props.phase];

  const rings = [
    { r: 42, delay: 0.3, width: 1.2 },
    { r: 35, delay: 0.6, width: 1 },
    { r: 28, delay: 0.9, width: 0.9 },
    { r: 21, delay: 1.2, width: 0.8 },
    { r: 14, delay: 1.5, width: 0.7 },
    { r: 7, delay: 1.8, width: 0.6 },
  ];

  return (
    <DayShell {...props} image="/kurukshetra/HErfJSwbwAAcBwn.jpeg">
      {/* Entire panel subtle rotation */}
      <motion.div
        className="h-full w-full"
        animate={{ rotate: [0, 1.5, -0.5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="h-full flex flex-col items-center justify-center text-center px-8 relative">
          {/* Concentric rings — the Chakra Vyuha */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-[80vmin] h-[80vmin] max-w-[600px] max-h-[600px]">
              {/* Rings drawing one by one, outermost first */}
              {rings.map((ring, i) => (
                <motion.circle
                  key={i}
                  cx="50" cy="50" r={ring.r}
                  fill="none"
                  stroke={atmo.accent}
                  strokeWidth={ring.width}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.4 - i * 0.04 }}
                  transition={{ duration: 1.5, delay: ring.delay, ease: 'easeOut' }}
                />
              ))}

              {/* Spinning animation on inner rings */}
              {rings.slice(3).map((ring, i) => (
                <motion.circle
                  key={`spin-${i}`}
                  cx="50" cy="50" r={ring.r}
                  fill="none"
                  stroke={atmo.accent}
                  strokeWidth={ring.width * 0.5}
                  strokeDasharray="3 8"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15 - i * 3, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '50px 50px' }}
                  opacity={0.2}
                />
              ))}

              {/* Abhimanyu's path — piercing inward */}
              <motion.path
                d="M50,8 L50,14 L48,21 L50,28 L49,35 L50,42 L50,50"
                fill="none"
                stroke="hsl(42 85% 58%)"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ duration: 3, delay: 2.5, ease: 'easeInOut' }}
              />

              {/* Path cannot exit — red X at center */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5, duration: 0.5 }}
              >
                <line x1="47" y1="47" x2="53" y2="53" stroke="hsl(355 70% 55%)" strokeWidth="1.5" />
                <line x1="53" y1="47" x2="47" y2="53" stroke="hsl(355 70% 55%)" strokeWidth="1.5" />
              </motion.g>
            </svg>
          </div>

          {/* Six warrior names — positioned around the outside */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {SIX_WARRIORS.map((name, i) => {
              const angle = (i * 60 - 90) * Math.PI / 180;
              const radius = 42;
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;
              return (
                <motion.span
                  key={name}
                  className="absolute font-display text-[10px] md:text-xs tracking-[0.15em] uppercase"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                    color: 'hsl(355 70% 55% / 0.7)',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 4 + i * 0.3, duration: 0.6 }}
                >
                  {name}
                </motion.span>
              );
            })}
          </div>

          {/* Center content — on top of rings */}
          <div className="relative z-10">
            {/* "Sixteen years old" — larger than the day number */}
            <motion.span
              className="font-display text-6xl md:text-[8rem] font-bold leading-none block"
              style={{ color: atmo.textPrimary }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 1 }}
            >
              16
            </motion.span>
            <motion.span
              className="font-display text-xs md:text-sm tracking-[0.3em] uppercase block mt-2"
              style={{ color: atmo.textMuted }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 0.8 }}
            >
              years old
            </motion.span>

            <motion.h3
              className="font-display text-2xl md:text-3xl tracking-[0.04em] mt-6 mb-3"
              style={{ color: atmo.textPrimary }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.5, duration: 0.8 }}
            >
              Abhimanyu
            </motion.h3>

            <motion.p
              className="font-body text-sm md:text-base max-w-sm mx-auto"
              style={{ color: atmo.textMuted }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5.2, duration: 1 }}
            >
              He knew how to enter the wheel. He did not know how to leave.
            </motion.p>
          </div>

          {/* Dharma violation — heavy emphasis */}
          {violation && (
            <motion.div
              className="absolute bottom-20 left-1/2 -translate-x-1/2 max-w-md"
              style={{ borderLeft: `3px solid hsl(355 70% 55%)` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 6, duration: 1 }}
            >
              <div className="pl-4">
                <p className="font-display text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: 'hsl(355 70% 55%)' }}>
                  Dharma Shattered
                </p>
                <p className="font-body text-sm italic" style={{ color: atmo.textMuted }}>
                  {violation.violation}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </DayShell>
  );
};
