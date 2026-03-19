import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PAKISTAN_GREEN = 'hsl(150, 60%, 35%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';
const SAFFRON = 'hsl(25, 80%, 50%)';
const SURFACE = 'hsl(200, 20%, 10%)';

const PROLIFERATION = [
  { name: 'Libya', angle: -35, distance: 140, status: 'Dismantled 2003' },
  { name: 'Iran', angle: 15, distance: 135, status: 'Threshold state' },
  { name: 'North Korea', angle: 65, distance: 145, status: 'Tested 2006' },
];

/* ─── Step 0: 1971 — Half the country gone ────────────────────────── */
const Step0Loss = () => (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
    {/* Large year watermark */}
    <motion.text
      x={200} y={120} textAnchor="middle" fill={PAKISTAN_GREEN} fontSize={80}
      fontFamily="var(--font-display)" fontWeight={900}
      initial={{ opacity: 0 }} animate={{ opacity: 0.06 }} transition={{ duration: 1 }}
    >
      1971
    </motion.text>

    {/* The loss */}
    <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
      <text x={200} y={45} textAnchor="middle" fill={STEEL} fontSize={7} fontFamily="var(--font-body)" letterSpacing={3}>
        THE WAR
      </text>
      <text x={200} y={80} textAnchor="middle" fill={LIGHT} fontSize={18} fontFamily="var(--font-display)" fontWeight={800}>
        Half the country
      </text>
      <text x={200} y={108} textAnchor="middle" fill={SAFFRON} fontSize={18} fontFamily="var(--font-display)" fontWeight={800}>
        gone
      </text>
    </motion.g>

    {/* What was lost */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
      <line x1={80} y1={135} x2={320} y2={135} stroke={STEEL} strokeWidth={0.4} opacity={0.2} />

      <text x={140} y={165} textAnchor="middle" fill={STEEL} fontSize={7} fontFamily="var(--font-body)" opacity={0.6}>
        East Pakistan → Bangladesh
      </text>
      <text x={140} y={180} textAnchor="middle" fill={SAFFRON} fontSize={10} fontFamily="var(--font-display)" fontWeight={700}>
        56% of population
      </text>

      <text x={280} y={165} textAnchor="middle" fill={STEEL} fontSize={7} fontFamily="var(--font-body)" opacity={0.6}>
        Military defeat
      </text>
      <text x={280} y={180} textAnchor="middle" fill={SAFFRON} fontSize={10} fontFamily="var(--font-display)" fontWeight={700}>
        93,000 POWs
      </text>
    </motion.g>

    {/* Bhutto's response */}
    <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }}>
      <line x1={80} y1={205} x2={320} y2={205} stroke={PAKISTAN_GREEN} strokeWidth={0.4} opacity={0.3} />

      <text x={200} y={230} textAnchor="middle" fill={STEEL} fontSize={6} fontFamily="var(--font-body)" letterSpacing={2}>
        BHUTTO'S DECISION · MULTAN · 1972
      </text>
      <text x={200} y={255} textAnchor="middle" fill={PAKISTAN_GREEN} fontSize={14} fontFamily="var(--font-display)" fontWeight={800}>
        "We will get one of our own."
      </text>
    </motion.g>
  </motion.g>
);

/* ─── Step 1: Centrifuge theft ─────────────────────────────────────── */
const Step1Theft = () => (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
    <text x={200} y={30} textAnchor="middle" fill={STEEL} fontSize={7} fontFamily="var(--font-body)" letterSpacing={3}>
      THE THEFT · 1975
    </text>

    {/* Three-node flow: URENCO → Khan → Kahuta */}
    {[
      { label: 'URENCO', sub: 'Netherlands', cx: 70, color: STEEL },
      { label: 'A.Q. Khan', sub: 'Metallurgist', cx: 200, color: PAKISTAN_GREEN },
      { label: 'Kahuta', sub: 'Pakistan', cx: 330, color: PAKISTAN_GREEN },
    ].map((n, i) => (
      <motion.g key={n.label}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + i * 0.3 }}
      >
        <circle cx={n.cx} cy={110} r={36} fill={SURFACE} stroke={n.color} strokeWidth={1.2} />
        <text x={n.cx} y={107} textAnchor="middle" fill={LIGHT} fontSize={9} fontFamily="var(--font-display)" fontWeight={700}>
          {n.label}
        </text>
        <text x={n.cx} y={120} textAnchor="middle" fill={STEEL} fontSize={6.5} fontFamily="var(--font-body)">
          {n.sub}
        </text>
      </motion.g>
    ))}

    {/* Arrows between nodes */}
    {[
      { x1: 110, x2: 160, delay: 0.8, label: 'STOLEN' },
      { x1: 240, x2: 290, delay: 1.5, label: '' },
    ].map((a, i) => (
      <motion.g key={i}>
        <motion.line x1={a.x1} y1={110} x2={a.x2} y2={110} stroke={PAKISTAN_GREEN} strokeWidth={1.5}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: a.delay, duration: 0.6 }} />
        <motion.path d={`M${a.x2 - 5} 105 L${a.x2} 110 L${a.x2 - 5} 115`}
          fill="none" stroke={PAKISTAN_GREEN} strokeWidth={1.5} strokeLinejoin="round"
          initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: a.delay + 0.5 }} />
        {a.label && (
          <motion.g initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: a.delay + 0.2, type: 'spring' }}>
            <rect x={(a.x1 + a.x2) / 2 - 22} y={92} width={44} height={14} rx={3} fill="hsl(0, 60%, 25%)" />
            <text x={(a.x1 + a.x2) / 2} y={102} textAnchor="middle" fill="hsl(0, 70%, 70%)" fontSize={7} fontFamily="var(--font-body)" fontWeight={700}>
              {a.label}
            </text>
          </motion.g>
        )}
        {/* Travelling particle */}
        <motion.circle r={3} fill={PAKISTAN_GREEN} opacity={0.9}
          animate={{ cx: [a.x1, a.x2], cy: [110, 110] }}
          transition={{ duration: 1.4, delay: a.delay + 0.3, repeat: Infinity, ease: 'linear' }} />
      </motion.g>
    ))}

    {/* What was stolen */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
      <line x1={60} y1={165} x2={340} y2={165} stroke={STEEL} strokeWidth={0.3} opacity={0.2} />
      <text x={200} y={185} textAnchor="middle" fill={STEEL} fontSize={7} fontFamily="var(--font-body)" letterSpacing={1}>
        CENTRIFUGE DESIGNS · URANIUM ENRICHMENT TECHNOLOGY
      </text>
      <text x={200} y={210} textAnchor="middle" fill={LIGHT} fontSize={9} fontFamily="var(--font-body)" fontStyle="italic">
        The key: spin uranium hexafluoride fast enough,
      </text>
      <text x={200} y={226} textAnchor="middle" fill={LIGHT} fontSize={9} fontFamily="var(--font-body)" fontStyle="italic">
        separate the isotopes — weapons-grade material.
      </text>
    </motion.g>
  </motion.g>
);

/* ─── Step 2: 17-day countdown clock ───────────────────────────────── */
const Step2Countdown = () => (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
    {/* Clock face */}
    <circle cx={200} cy={140} r={120} fill="none" stroke={STEEL} strokeWidth={0.4} opacity={0.2} />

    {/* Day markers (17 segments) */}
    {Array.from({ length: 17 }, (_, i) => {
      const angle = (i / 17) * 360 - 90;
      const rad = (angle * Math.PI) / 180;
      const x1 = 200 + Math.cos(rad) * 106;
      const y1 = 140 + Math.sin(rad) * 106;
      const x2 = 200 + Math.cos(rad) * 119;
      const y2 = 140 + Math.sin(rad) * 119;
      const tx = 200 + Math.cos(rad) * 92;
      const ty = 140 + Math.sin(rad) * 92;

      return (
        <motion.g key={i}>
          <motion.line x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={PAKISTAN_GREEN} strokeWidth={i === 16 ? 3 : 1.5}
            initial={{ opacity: 0 }} animate={{ opacity: i === 16 ? 1 : 0.5 }}
            transition={{ delay: i * 0.06 }} />
          <motion.text x={tx} y={ty + 2} textAnchor="middle"
            fill={i === 16 ? LIGHT : STEEL}
            fontSize={i === 16 ? 8 : 6} fontFamily="var(--font-body)" fontWeight={i === 16 ? 700 : 400}
            initial={{ opacity: 0 }} animate={{ opacity: i === 16 ? 1 : 0.4 }}
            transition={{ delay: i * 0.06 }}>
            {i + 1}
          </motion.text>
        </motion.g>
      );
    })}

    {/* Sweep hand */}
    <motion.line x1={200} y1={140} x2={200} y2={28} stroke={PAKISTAN_GREEN} strokeWidth={2} strokeLinecap="round"
      style={{ transformOrigin: '200px 140px' }}
      initial={{ rotate: 0, opacity: 0 }} animate={{ rotate: 360, opacity: 1 }}
      transition={{ duration: 2.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} />
    <circle cx={200} cy={140} r={4} fill={PAKISTAN_GREEN} />

    {/* India test label — top of clock */}
    <motion.text x={200} y={120} textAnchor="middle" fill={SAFFRON} fontSize={8}
      fontFamily="var(--font-body)" initial={{ opacity: 0 }} animate={{ opacity: 0.85 }} transition={{ delay: 0.2 }}>
      India tests · May 11, 1998
    </motion.text>

    {/* Pakistan response — bottom of clock */}
    <motion.text x={200} y={158} textAnchor="middle" fill={PAKISTAN_GREEN} fontSize={8}
      fontFamily="var(--font-body)" fontWeight={600}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
      Pakistan responds · May 28
    </motion.text>

    {/* 17 DAYS */}
    <motion.text x={200} y={195} textAnchor="middle" fill={LIGHT} fontSize={32}
      fontFamily="var(--font-display)" fontWeight={900}
      initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 3.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: '200px 190px' }}>
      17 DAYS
    </motion.text>

    <motion.text x={200} y={212} textAnchor="middle" fill={STEEL} fontSize={7}
      fontFamily="var(--font-body)"
      initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 3.6 }}>
      Chagai mountain, Balochistan — 5 devices
    </motion.text>
  </motion.g>
);

/* ─── Step 3: A.Q. Khan proliferation network ──────────────────────── */
const Step3Network = () => {
  const cx = 200, cy = 110;

  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <text x={200} y={25} textAnchor="middle" fill={STEEL} fontSize={7}
        fontFamily="var(--font-body)" letterSpacing={3}>
        A.Q. KHAN PROLIFERATION NETWORK
      </text>

      {/* Pakistan center */}
      <motion.g initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <circle cx={cx} cy={cy} r={32} fill={SURFACE} stroke={PAKISTAN_GREEN} strokeWidth={2} />
        <motion.circle cx={cx} cy={cy} r={32} fill="none" stroke={PAKISTAN_GREEN} strokeWidth={1}
          animate={{ r: [32, 48], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }} />
        <text x={cx} y={cy - 4} textAnchor="middle" fill={PAKISTAN_GREEN} fontSize={9}
          fontFamily="var(--font-display)" fontWeight={700}>Pakistan</text>
        <text x={cx} y={cy + 8} textAnchor="middle" fill={STEEL} fontSize={6.5}
          fontFamily="var(--font-body)">A.Q. Khan</text>
      </motion.g>

      {/* Target nations */}
      {PROLIFERATION.map((target, i) => {
        const rad = (target.angle * Math.PI) / 180;
        const tx = cx + Math.cos(rad) * target.distance;
        const ty = cy + Math.sin(rad) * target.distance * 0.7;

        return (
          <motion.g key={target.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.7 + i * 0.35 }}>
            <motion.line x1={cx} y1={cy} x2={tx} y2={ty}
              stroke={PAKISTAN_GREEN} strokeWidth={1} strokeDasharray="4 3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 0.7 + i * 0.35 }} opacity={0.4} />
            <motion.circle r={3} fill={PAKISTAN_GREEN} opacity={0.8}
              animate={{ cx: [cx, tx], cy: [cy, ty] }}
              transition={{ duration: 1.8, delay: 1.1 + i * 0.35, repeat: Infinity, ease: 'linear' }} />
            <circle cx={tx} cy={ty} r={22} fill={SURFACE} stroke={STEEL} strokeWidth={1} />
            <text x={tx} y={ty - 3} textAnchor="middle" fill={LIGHT} fontSize={8}
              fontFamily="var(--font-display)" fontWeight={600}>{target.name}</text>
            <text x={tx} y={ty + 8} textAnchor="middle" fill={STEEL} fontSize={5.5}
              fontFamily="var(--font-body)">{target.status}</text>
          </motion.g>
        );
      })}

      {/* Caption */}
      <motion.text x={200} y={260} textAnchor="middle" fill={STEEL} fontSize={7.5}
        fontFamily="var(--font-body)" fontStyle="italic"
        initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 2.2 }}>
        Pakistan's bomb was built through theft — then franchised.
      </motion.text>
    </motion.g>
  );
};

/* ─── Main export ───────────────────────────────────────────────────── */
interface Props {
  activeStep: number;
}

export const ResponseClock = ({ activeStep }: Props) => {
  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <svg viewBox="0 0 400 280" className="w-full max-w-[580px] h-auto">
        <AnimatePresence mode="wait">
          {activeStep === 0 && (
            <motion.g key="loss" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <Step0Loss />
            </motion.g>
          )}
          {activeStep === 1 && (
            <motion.g key="theft" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <Step1Theft />
            </motion.g>
          )}
          {activeStep === 2 && (
            <motion.g key="clock" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <Step2Countdown />
            </motion.g>
          )}
          {activeStep === 3 && (
            <motion.g key="network" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <Step3Network />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};
