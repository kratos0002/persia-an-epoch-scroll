import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DRAGON_RED = 'hsl(0, 70%, 45%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';
const DIM = 'hsl(200, 10%, 18%)';
const SOVIET_RED = 'hsl(0, 70%, 50%)';

/* ── Step 0: Sino-Soviet Split ──────────────────────────── */
const SinoSovietSplit = () => (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
    {/* Soviet side — left */}
    <motion.g initial={{ x: 0 }} animate={{ x: -8 }} transition={{ delay: 1.5, duration: 1.2 }}>
      {/* Soviet star */}
      <motion.polygon
        points="100,100 106,118 125,118 110,130 116,148 100,136 84,148 90,130 75,118 94,118"
        fill={SOVIET_RED} opacity={0.7}
        initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.3 }}
      />
      <text x={100} y={170} textAnchor="middle" fill={SOVIET_RED} fontSize={10} fontFamily="var(--font-display)" fontWeight={700}>
        USSR
      </text>
      <text x={100} y={184} textAnchor="middle" fill={STEEL} fontSize={6.5} fontFamily="var(--font-body)">
        Research reactor
      </text>
      <text x={100} y={195} textAnchor="middle" fill={STEEL} fontSize={6.5} fontFamily="var(--font-body)">
        Enrichment tech
      </text>
      <text x={100} y={206} textAnchor="middle" fill={STEEL} fontSize={6.5} fontFamily="var(--font-body)">
        Bomb design
      </text>
    </motion.g>

    {/* Connection — breaking */}
    <motion.line
      x1={145} y1={125} x2={255} y2={125}
      stroke={STEEL} strokeWidth={1.5} strokeDasharray="6 4"
      initial={{ pathLength: 1, opacity: 0.5 }}
      animate={{ pathLength: 0, opacity: 0 }}
      transition={{ delay: 1.5, duration: 1.2 }}
    />

    {/* Break point — X mark */}
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      style={{ transformOrigin: '200px 125px' }}
    >
      <line x1={190} y1={115} x2={210} y2={135} stroke={DRAGON_RED} strokeWidth={2.5} strokeLinecap="round" />
      <line x1={210} y1={115} x2={190} y2={135} stroke={DRAGON_RED} strokeWidth={2.5} strokeLinecap="round" />
    </motion.g>

    {/* China side — right */}
    <motion.g initial={{ x: 0 }} animate={{ x: 8 }} transition={{ delay: 1.5, duration: 1.2 }}>
      {/* Five-pointed star */}
      <motion.polygon
        points="300,100 306,118 325,118 310,130 316,148 300,136 284,148 290,130 275,118 294,118"
        fill={DRAGON_RED} opacity={0.8}
        initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 0.5 }}
      />
      <text x={300} y={170} textAnchor="middle" fill={DRAGON_RED} fontSize={10} fontFamily="var(--font-display)" fontWeight={700}>
        CHINA
      </text>
      <text x={300} y={184} textAnchor="middle" fill={STEEL} fontSize={6.5} fontFamily="var(--font-body)">
        On its own
      </text>
    </motion.g>

    {/* Year label */}
    <motion.text
      x={200} y={160} textAnchor="middle" fill={LIGHT} fontSize={14}
      fontFamily="var(--font-display)" fontWeight={800}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
    >
      1959
    </motion.text>

    {/* Bottom text */}
    <motion.text
      x={200} y={260} textAnchor="middle" fill={STEEL} fontSize={7}
      fontFamily="var(--font-body)" fontStyle="italic"
      initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 2.5 }}
    >
      Soviet advisers packed up their blueprints and went home.
    </motion.text>
  </motion.g>
);

/* ── Step 1: Project 596 — Alone ──────────────────────────── */
const Project596 = () => (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
    {/* Large "596" — defiant, monumental */}
    <motion.text
      x={200} y={145} textAnchor="middle" fill={DRAGON_RED} fontSize={72}
      fontFamily="var(--font-display)" fontWeight={900}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.15, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      596
    </motion.text>

    {/* Project label over it */}
    <motion.text
      x={200} y={120} textAnchor="middle" fill={LIGHT} fontSize={9}
      fontFamily="var(--font-body)" letterSpacing={4}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
    >
      PROJECT
    </motion.text>
    <motion.text
      x={200} y={148} textAnchor="middle" fill={DRAGON_RED} fontSize={28}
      fontFamily="var(--font-display)" fontWeight={900}
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
    >
      596
    </motion.text>
    <motion.text
      x={200} y={168} textAnchor="middle" fill={STEEL} fontSize={7}
      fontFamily="var(--font-body)"
      initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 1.3 }}
    >
      Named for the month of Soviet withdrawal
    </motion.text>

    {/* Conditions list */}
    {[
      { label: 'Underfunded', y: 200 },
      { label: 'Politically persecuted', y: 216 },
      { label: 'Isolated', y: 232 },
    ].map((item, i) => (
      <motion.g key={item.label}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 + i * 0.15 }}
      >
        <line x1={150} y1={item.y - 3} x2={156} y2={item.y - 3} stroke={DRAGON_RED} strokeWidth={1} />
        <text x={162} y={item.y} fill={STEEL} fontSize={7} fontFamily="var(--font-body)">
          {item.label}
        </text>
      </motion.g>
    ))}

    <motion.text
      x={200} y={264} textAnchor="middle" fill={LIGHT} fontSize={8}
      fontFamily="var(--font-body)" fontWeight={600}
      initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 2 }}
    >
      But they had the physics — and they had the will.
    </motion.text>
  </motion.g>
);

/* ── Step 2: Lop Nur Detonation ───────────────────────────── */
const LopNurTest = () => (
  <motion.g>
    {/* Desert ground */}
    <motion.rect x={0} y={210} width={400} height={90} fill="hsl(35, 25%, 10%)"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} />

    {/* Sky */}
    <motion.rect x={0} y={0} width={400} height={210} fill="hsl(200, 25%, 6%)"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} />

    {/* Core flash */}
    <motion.circle cx={200} cy={200} fill="hsl(45, 100%, 85%)"
      initial={{ r: 0, opacity: 0 }}
      animate={{ r: 18, opacity: [0, 1, 0.4] }}
      transition={{ delay: 0.8, duration: 0.5 }}
    />

    {/* Fireball */}
    <motion.circle cx={200} cy={190} fill={`${DRAGON_RED}35`} stroke={DRAGON_RED} strokeWidth={0.5}
      initial={{ r: 0 }} animate={{ r: 22 }} transition={{ delay: 1, duration: 0.8 }} />

    {/* Mushroom stem */}
    <motion.path
      d="M194,205 Q192,180 190,155 Q188,130 192,115 Q196,105 200,100 Q204,105 208,115 Q212,130 210,155 Q208,180 206,205"
      fill={`${DRAGON_RED}25`} stroke={DRAGON_RED} strokeWidth={0.7}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ delay: 1.2, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: '200px 205px' }}
    />

    {/* Mushroom cap */}
    <motion.ellipse cx={200} cy={95} fill={`${DRAGON_RED}30`} stroke={DRAGON_RED} strokeWidth={0.8}
      initial={{ rx: 0, ry: 0, opacity: 0 }}
      animate={{ rx: 55, ry: 22, opacity: 1 }}
      transition={{ delay: 2, duration: 1, ease: 'easeOut' }}
    />
    <motion.ellipse cx={200} cy={98} fill={`${DRAGON_RED}15`}
      initial={{ rx: 0, ry: 0 }} animate={{ rx: 36, ry: 14 }}
      transition={{ delay: 2.3, duration: 0.8 }}
    />

    {/* Ground shockwaves */}
    {[1, 2, 3].map(i => (
      <motion.ellipse key={`shock-${i}`} cx={200} cy={210}
        fill="none" stroke="hsl(45, 80%, 80%)" strokeWidth={0.6}
        initial={{ rx: 8, ry: 2, opacity: 0.6 }}
        animate={{ rx: 190, ry: 12, opacity: 0 }}
        transition={{ duration: 3, delay: 1 + i * 0.7, repeat: Infinity, ease: 'easeOut' }}
      />
    ))}

    {/* Data */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}>
      <text x={200} y={242} textAnchor="middle" fill={STEEL} fontSize={6.5}
        fontFamily="monospace" letterSpacing={2}>
        LOP NUR TEST SITE · XINJIANG
      </text>
      <text x={200} y={262} textAnchor="middle" fill={DRAGON_RED} fontSize={16}
        fontFamily="var(--font-display)" fontWeight={900}>
        22 kilotons
      </text>
      <text x={200} y={278} textAnchor="middle" fill={STEEL} fontSize={6.5}
        fontFamily="var(--font-body)">
        October 16, 1964 — Fifth nuclear power
      </text>
    </motion.g>
  </motion.g>
);

/* ── Step 3: Fission → Fusion Race ────────────────────────── */
const NATIONS = [
  { name: 'USA', months: 87, years: '1945 → 1952', color: 'hsl(140, 70%, 45%)' },
  { name: 'USSR', months: 45, years: '1949 → 1953', color: 'hsl(0, 70%, 50%)' },
  { name: 'UK', months: 60, years: '1952 → 1957', color: 'hsl(210, 50%, 40%)' },
  { name: 'China', months: 32, years: '1964 → 1967', color: DRAGON_RED },
];
const MAX_MONTHS = 87;

const FissionFusionTimeline = () => (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
    {/* Title */}
    <text x={200} y={30} textAnchor="middle" fill={STEEL} fontSize={6.5}
      fontFamily="var(--font-body)" letterSpacing={3}>
      FISSION → FUSION · MONTHS BETWEEN FIRST TESTS
    </text>

    {NATIONS.map((nation, i) => {
      const barWidth = (nation.months / MAX_MONTHS) * 260;
      const y = 65 + i * 62;
      const isChina = nation.name === 'China';

      return (
        <motion.g key={nation.name}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: i * 0.2 }}
        >
          {/* Nation name */}
          <text x={60} y={y} textAnchor="end" fill={isChina ? DRAGON_RED : nation.color}
            fontSize={10} fontFamily="var(--font-display)" fontWeight={700}>
            {nation.name}
          </text>
          {/* Years */}
          <text x={60} y={y + 12} textAnchor="end" fill={STEEL}
            fontSize={6} fontFamily="var(--font-body)" opacity={0.6}>
            {nation.years}
          </text>

          {/* Bar track */}
          <rect x={72} y={y - 8} width={270} height={18} rx={2} fill="hsl(200, 15%, 9%)" />

          {/* Bar fill */}
          <motion.rect
            x={72} y={y - 8} height={18} rx={2}
            fill={isChina ? DRAGON_RED : nation.color}
            opacity={isChina ? 0.9 : 0.35}
            initial={{ width: 0 }}
            animate={{ width: barWidth }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Month count */}
          <motion.text
            x={72 + barWidth + 8} y={y + 4}
            fill={isChina ? LIGHT : STEEL}
            fontSize={isChina ? 12 : 9}
            fontFamily="var(--font-display)"
            fontWeight={isChina ? 900 : 600}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 + i * 0.2 }}
          >
            {nation.months}
          </motion.text>

          {/* China glow */}
          {isChina && (
            <motion.rect
              x={72} y={y - 8} height={18} rx={2} width={barWidth}
              fill="none" stroke={DRAGON_RED} strokeWidth={1}
              animate={{ opacity: [0.6, 0.15, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.g>
      );
    })}

    {/* Verdict */}
    <motion.text
      x={200} y={295} textAnchor="middle" fill={DRAGON_RED} fontSize={9}
      fontFamily="var(--font-display)" fontWeight={700}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
    >
      Fastest fission-to-fusion sprint in history
    </motion.text>
  </motion.g>
);

/* ── Main Component ───────────────────────────────────────── */

interface Props {
  activeStep: number;
}

export const FissionFusionRace = ({ activeStep }: Props) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 400 300" className="w-full max-w-[540px] h-auto mx-auto">
        <AnimatePresence mode="wait">
          {activeStep === 0 && (
            <motion.g key="split" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <SinoSovietSplit />
            </motion.g>
          )}
          {activeStep === 1 && (
            <motion.g key="596" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <Project596 />
            </motion.g>
          )}
          {activeStep === 2 && (
            <motion.g key="lop-nur" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <LopNurTest />
            </motion.g>
          )}
          {activeStep === 3 && (
            <motion.g key="race" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <FissionFusionTimeline />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};
