import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { CoalitionBoard } from '@/components/visuals/CoalitionBoard';

const RED = 'hsl(0, 65%, 48%)';
const PARCHMENT = 'hsl(45, 30%, 88%)';
const SMOKE = 'hsl(220, 8%, 35%)';
const MIDNIGHT = 'hsl(225, 30%, 7%)';
const EMBER = 'hsl(15, 70%, 45%)';

// Simplified Spain outline (viewBox 0 0 400 350)
const SPAIN_PATH = 'M50,80 L100,50 L160,40 L220,45 L280,30 L330,50 L370,80 L380,120 L370,160 L350,200 L330,230 L300,260 L260,280 L220,300 L180,310 L140,300 L100,280 L70,250 L50,210 L40,170 L35,130 Z';

const AMBUSH_EVENTS = [
  { x: 120, y: 100, label: 'Bailén', detail: '20,000 French surrender', delay: 1.0 },
  { x: 250, y: 80, label: 'Zaragoza', detail: 'Siege: civilians fight house-to-house', delay: 1.6 },
  { x: 80, y: 200, label: 'Badajoz', detail: 'Guerrilla stronghold', delay: 2.2 },
  { x: 300, y: 180, label: 'Valencia', detail: 'Popular uprising', delay: 2.8 },
  { x: 180, y: 250, label: 'Cádiz', detail: 'Free Spanish government holds out', delay: 3.4 },
  { x: 200, y: 140, label: 'Madrid', detail: 'Dos de Mayo uprising — civilians vs. cavalry', delay: 0.5 },
  { x: 320, y: 120, label: 'Tarragona', detail: 'Ambush corridors', delay: 2.0 },
  { x: 140, y: 170, label: 'Salamanca', detail: 'Wellington strikes', delay: 3.0 },
];

const GuerrillaVisual = () => {
  // Random ember particles inside Spain
  const embers = useMemo(() => {
    let seed = 17;
    const next = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    return Array.from({ length: 30 }, () => ({
      x: 60 + next() * 300,
      y: 50 + next() * 250,
      size: 1 + next() * 2.5,
      delay: next() * 3,
      duration: 1.5 + next() * 2,
    }));
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="relative max-w-[550px] w-full">
        <svg viewBox="0 0 400 380" className="w-full">
          <defs>
            <clipPath id="spain-clip">
              <path d={SPAIN_PATH} />
            </clipPath>
            <radialGradient id="spain-burn" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="hsl(0, 60%, 25%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(0, 40%, 12%)" stopOpacity="0.8" />
            </radialGradient>
            <filter id="ember-glow">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>

          {/* Spain outline — dark, burning */}
          <motion.path
            d={SPAIN_PATH}
            fill="url(#spain-burn)"
            stroke="hsl(0, 50%, 30%)"
            strokeWidth="1.5"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ duration: 1.5 }}
          />

          {/* Burning embers scattered across Spain */}
          <g clipPath="url(#spain-clip)">
            {embers.map((e, i) => (
              <motion.circle
                key={`ember-${i}`}
                cx={e.x} cy={e.y} r={e.size}
                fill={EMBER}
                filter="url(#ember-glow)"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.7, 0.2, 0.8, 0] }}
                transition={{
                  duration: e.duration,
                  delay: e.delay,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            ))}
          </g>

          {/* Ambush markers — pulsing red dots with labels */}
          {AMBUSH_EVENTS.map((evt) => (
            <motion.g
              key={evt.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: evt.delay, duration: 0.4 }}
            >
              {/* Pulse ring */}
              <motion.circle
                cx={evt.x} cy={evt.y} r="8"
                fill="none"
                stroke={RED}
                strokeWidth="0.5"
                initial={{ r: 3, opacity: 0.6 }}
                animate={{ r: 12, opacity: 0 }}
                transition={{ duration: 2, delay: evt.delay + 0.3, repeat: Infinity }}
              />
              {/* Dot */}
              <circle cx={evt.x} cy={evt.y} r="3" fill={RED} fillOpacity="0.8" />
              {/* City name */}
              <text
                x={evt.x} y={evt.y - 8}
                textAnchor="middle"
                fill={PARCHMENT}
                fontSize="7"
                fontFamily="'Cormorant Garamond', serif"
                fontWeight="bold"
              >
                {evt.label}
              </text>
              {/* Detail */}
              <text
                x={evt.x} y={evt.y + 14}
                textAnchor="middle"
                fill={SMOKE}
                fontSize="5.5"
                fontFamily="'Cormorant Garamond', serif"
                fontStyle="italic"
              >
                {evt.detail}
              </text>
            </motion.g>
          ))}

          {/* Title */}
          <motion.text
            x="200" y="345"
            textAnchor="middle"
            fill="hsl(220, 15%, 35%)"
            fontSize="8"
            fontFamily="'Cormorant Garamond', serif"
            letterSpacing="0.25em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1 }}
          >
            THE PENINSULAR WAR — 1808–1814
          </motion.text>
        </svg>

        {/* Stats overlay */}
        <motion.div
          className="absolute bottom-2 left-0 right-0 flex justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
        >
          {[
            { n: '300,000', label: 'French troops pinned' },
            { n: '6 years', label: 'of guerrilla war' },
            { n: '240,000', label: 'French casualties' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-display text-sm font-bold" style={{ color: RED }}>{s.n}</div>
              <div className="text-[8px] font-body" style={{ color: SMOKE }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const SpanishGraphic = ({ step }: { step: number }) => (
  <div className="relative w-full h-full">
    {/* Step 0: Guerrilla war map */}
    <motion.div
      className="absolute inset-0"
      animate={{ opacity: step === 0 ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <GuerrillaVisual />
    </motion.div>

    {/* Steps 1-2: Coalition board — Spain burns red, cracks widen */}
    <motion.div
      className="absolute inset-0"
      animate={{ opacity: step >= 1 ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <CoalitionBoard phase={step >= 2 ? 7 : 6} />
    </motion.div>
  </div>
);

const steps = [
  <div key="s1">
    <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: RED }}>
      1808 — The First Crack
    </p>
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      The Spanish Ulcer
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      Napoleon replaced Spain's king with his brother Joseph. The Spanish people responded
      not with armies but with something Napoleon had never faced: guerrilla war.
      Ambushes, sabotage, priests with muskets. An entire nation resisting.
    </p>
  </div>,
  <div key="s2">
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      The Peninsula Bleeds
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      Watch Spain on the board — it burns red and stays red. For six years,
      300,000 French troops were pinned down fighting an enemy they could defeat in battle
      but never conquer. Wellington's British forces added professional steel to Spanish fury.
    </p>
  </div>,
  <div key="s3">
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      The Cracks Widen
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      Austria tried again in 1809 — defeated at Wagram, but no longer easily.
      Russia grew restless under the Continental System. Sweden turned hostile.
      The gold is fading from the board. The red is spreading.
    </p>
  </div>,
];

export const SpanishUlcerSection = () => {
  return (
    <section id="spanish-ulcer" style={{ background: MIDNIGHT }}>
      <StickyScroll
        graphic={(step) => <SpanishGraphic step={step} />}
        steps={steps}
      />
    </section>
  );
};
