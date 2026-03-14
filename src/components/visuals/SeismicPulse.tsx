import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SAFFRON = 'hsl(25, 80%, 50%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';
const SAND = 'hsl(35, 40%, 65%)';
const BUNKER = 'hsl(200, 25%, 6%)';
const THREAT_RED = 'hsl(0, 60%, 45%)';

interface Props {
  activeStep: number;
}

/* ─── Step 0: India outline + Nehru duality ─────────────────────────────── */
const Step0 = () => (
  <motion.g key="step0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
    {/* Simplified India silhouette — stylised polygon */}
    <motion.path
      d="M200,30 L228,45 L245,70 L248,100 L240,130 L252,155 L248,180
         L235,205 L215,230 L200,245 L185,230 L165,205 L152,180 L148,155
         L160,130 L152,100 L155,70 L172,45 Z"
      fill="none"
      stroke={SAFFRON}
      strokeWidth={1.5}
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.55 }}
      transition={{ duration: 1.8, ease: 'easeInOut' }}
    />

    {/* Nehru quote — left side */}
    <motion.text
      x={60}
      y={100}
      textAnchor="middle"
      fill={LIGHT}
      fontSize={8.5}
      fontFamily="var(--font-body)"
      fontStyle="italic"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
      "a sin against
    </motion.text>
    <motion.text
      x={60}
      y={114}
      textAnchor="middle"
      fill={LIGHT}
      fontSize={8.5}
      fontFamily="var(--font-body)"
      fontStyle="italic"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.3 }}
    >
      humanity"
    </motion.text>
    <motion.text
      x={60}
      y={128}
      textAnchor="middle"
      fill={STEEL}
      fontSize={6.5}
      fontFamily="var(--font-body)"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4 }}
    >
      — Nehru on the bomb
    </motion.text>

    {/* Divider arrow — duality */}
    <motion.line
      x1={108}
      y1={138}
      x2={148}
      y2={138}
      stroke={STEEL}
      strokeWidth={0.6}
      strokeDasharray="3 3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ delay: 1.6 }}
    />

    {/* Atom symbol — peaceful side */}
    <motion.circle cx={130} cy={170} r={6} fill="none" stroke={SAFFRON} strokeWidth={1} initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 1.8 }} />
    <motion.ellipse cx={130} cy={170} rx={12} ry={5} fill="none" stroke={SAFFRON} strokeWidth={0.8} initial={{ opacity: 0, rotate: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1.8 }} />
    <motion.ellipse cx={130} cy={170} rx={12} ry={5} fill="none" stroke={SAFFRON} strokeWidth={0.8} style={{ transformOrigin: '130px 170px', transform: 'rotate(60deg)' }} initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1.9 }} />
    <motion.ellipse cx={130} cy={170} rx={12} ry={5} fill="none" stroke={SAFFRON} strokeWidth={0.8} style={{ transformOrigin: '130px 170px', transform: 'rotate(120deg)' }} initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 2 }} />
    <motion.text x={130} y={193} textAnchor="middle" fill={STEEL} fontSize={6} fontFamily="var(--font-body)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1 }}>
      Atomic Energy Act · 1948
    </motion.text>

    {/* VS label */}
    <motion.text
      x={200}
      y={175}
      textAnchor="middle"
      fill={STEEL}
      fontSize={7}
      fontFamily="var(--font-body)"
      fontWeight={600}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ delay: 2.2 }}
    >
      vs.
    </motion.text>

    {/* Mushroom icon — weapon side */}
    <motion.path
      d="M270,178 Q270,155 258,148 Q253,142 270,138 Q287,142 282,148 Q270,155 270,178"
      fill="none"
      stroke={STEEL}
      strokeWidth={1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.45 }}
      transition={{ delay: 2.3 }}
    />
    <motion.text x={270} y={193} textAnchor="middle" fill={STEEL} fontSize={6} fontFamily="var(--font-body)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}>
      Weapons program
    </motion.text>
  </motion.g>
);

/* ─── Step 1: China threat — 1962 border + 1964 mushroom ────────────────── */
const Step1 = () => (
  <motion.g key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
    {/* India outline faint */}
    <path
      d="M190,140 L208,140 L218,155 L215,175 L200,195 L185,175 L182,155 Z"
      fill="none"
      stroke={SAFFRON}
      strokeWidth={1}
      opacity={0.3}
      strokeLinejoin="round"
    />
    <text x={200} y={208} textAnchor="middle" fill={SAFFRON} fontSize={6.5} fontFamily="var(--font-body)" opacity={0.5}>India</text>

    {/* China label — north */}
    <motion.text
      x={200}
      y={52}
      textAnchor="middle"
      fill={THREAT_RED}
      fontSize={9}
      fontFamily="var(--font-body)"
      fontWeight={700}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 52 }}
      transition={{ delay: 0.3, duration: 0.7 }}
    >
      CHINA
    </motion.text>

    {/* 1962 border line */}
    <motion.line
      x1={140}
      y1={118}
      x2={260}
      y2={118}
      stroke={THREAT_RED}
      strokeWidth={1.2}
      strokeDasharray="5 3"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 0.75 }}
      style={{ transformOrigin: '200px 118px' }}
      transition={{ delay: 0.6, duration: 0.8 }}
    />
    <motion.text
      x={200}
      y={112}
      textAnchor="middle"
      fill={THREAT_RED}
      fontSize={6.5}
      fontFamily="var(--font-body)"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      transition={{ delay: 1.2 }}
    >
      1962 border war — India humiliated
    </motion.text>

    {/* Mushroom cloud icon — China 1964 test, north of border */}
    <motion.g
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ transformOrigin: '200px 80px' }}
      transition={{ delay: 1.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Stem */}
      <rect x={196} y={82} width={8} height={22} rx={2} fill={THREAT_RED} opacity={0.7} />
      {/* Cap */}
      <ellipse cx={200} cy={80} rx={22} ry={11} fill={THREAT_RED} opacity={0.6} />
      <ellipse cx={200} cy={76} rx={15} ry={8} fill="hsl(0, 60%, 55%)" opacity={0.7} />
    </motion.g>

    <motion.text
      x={200}
      y={75}
      textAnchor="middle"
      fill={LIGHT}
      fontSize={7}
      fontFamily="var(--font-body)"
      fontWeight={600}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2 }}
    >
      October 16, 1964
    </motion.text>
    <motion.text
      x={200}
      y={85}
      textAnchor="middle"
      fill={LIGHT}
      fontSize={6}
      fontFamily="var(--font-body)"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.3 }}
    >
      China tests its bomb
    </motion.text>

    {/* Arrow — threat pointing south toward India */}
    <motion.path
      d="M200,106 L200,128"
      stroke={THREAT_RED}
      strokeWidth={1.5}
      fill="none"
      markerEnd="url(#arrowThreat)"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.8 }}
      transition={{ delay: 2.5, duration: 0.5 }}
    />
    <defs>
      <marker id="arrowThreat" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill={THREAT_RED} />
      </marker>
    </defs>

    {/* Bhabha note */}
    <motion.text
      x={200}
      y={225}
      textAnchor="middle"
      fill={STEEL}
      fontSize={6.5}
      fontFamily="var(--font-body)"
      fontStyle="italic"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.8 }}
    >
      Homi Bhabha pushes for a weapons test
    </motion.text>
  </motion.g>
);

/* ─── Step 2: Pokhran 1974 — underground detonation, 12 kt ─────────────── */
const Step2 = () => (
  <motion.g key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
    {/* Desert surface */}
    <motion.path
      d="M20,130 Q70,125 120,128 Q170,132 220,126 Q270,130 320,127 Q360,131 390,128"
      fill="none"
      stroke={SAND}
      strokeWidth={1.5}
      opacity={0.55}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1 }}
    />
    <text x={12} y={122} fill={SAND} fontSize={5.5} fontFamily="var(--font-body)" opacity={0.65}>Thar Desert — Pokhran, Rajasthan</text>

    {/* Underground depth layers */}
    {[148, 165, 182].map(y => (
      <line key={y} x1={20} y1={y} x2={390} y2={y} stroke={STEEL} strokeWidth={0.3} opacity={0.12} strokeDasharray="5 4" />
    ))}

    {/* Depth marker */}
    <motion.line x1={70} y1={130} x2={70} y2={175} stroke={STEEL} strokeWidth={0.5} strokeDasharray="2 2"
      initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 0.8 }} />
    <motion.text x={55} y={155} fill={STEEL} fontSize={5.5} fontFamily="var(--font-body)"
      initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.9 }}>~107 m</motion.text>
    <motion.text x={55} y={163} fill={STEEL} fontSize={5.5} fontFamily="var(--font-body)"
      initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 1 }}>depth</motion.text>

    {/* Blast cavity */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
      <motion.circle cx={200} cy={172} fill={SAFFRON}
        initial={{ r: 0 }} animate={{ r: 10 }}
        transition={{ duration: 0.5, delay: 0.8 }} />
      <motion.circle cx={200} cy={172} fill="hsl(45, 100%, 85%)"
        initial={{ r: 0 }} animate={{ r: 4 }}
        transition={{ duration: 0.3, delay: 1 }} />
    </motion.g>

    {/* Seismic rings */}
    {[0, 1, 2, 3, 4].map(i => (
      <motion.circle
        key={`w-${i}`}
        cx={200}
        cy={172}
        fill="none"
        stroke={SAFFRON}
        strokeWidth={0.9}
        initial={{ r: 10, opacity: 0 }}
        animate={{ r: [10, 65 + i * 18], opacity: [0.6, 0] }}
        transition={{ duration: 2.8, delay: 1.2 + i * 0.28, repeat: Infinity, ease: 'easeOut' }}
      />
    ))}

    {/* 12 kt label */}
    <motion.text x={200} y={212} textAnchor="middle" fill={SAFFRON} fontSize={8} fontFamily="var(--font-body)" fontWeight={600}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
      Smiling Buddha · 12 kt
    </motion.text>
    <motion.text x={200} y={224} textAnchor="middle" fill={STEEL} fontSize={6} fontFamily="var(--font-body)"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>
      May 18, 1974
    </motion.text>

    {/* "Peaceful nuclear explosion" quote */}
    <motion.text x={200} y={242} textAnchor="middle" fill={STEEL} fontSize={5.5} fontFamily="var(--font-body)" fontStyle="italic"
      initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 2 }}>
      Official designation: "peaceful nuclear explosion"
    </motion.text>

    {/* Seismic readout line */}
    <motion.path
      d="M20,100 L60,100 L70,88 L80,112 L90,82 L100,118 L110,92 L120,108 L140,100 L390,100"
      fill="none"
      stroke={SAFFRON}
      strokeWidth={0.8}
      opacity={0}
      animate={{ opacity: [0, 0.5, 0.5] }}
      transition={{ delay: 1.8, duration: 0.6, times: [0, 0.3, 1] }}
    />
    <motion.text x={12} y={96} fill={STEEL} fontSize={5} fontFamily="var(--font-body)"
      initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 2.2 }}>seismograph</motion.text>
  </motion.g>
);

/* ─── Step 3: Operation Shakti 1998 — 5 detonation markers ─────────────── */
const SHAKTI_SITES = [
  { cx: 160, cy: 168, delay: 0.6, label: 'Shakti-I', kt: '45 kt', y: 185 },
  { cx: 195, cy: 172, delay: 1.0, label: 'Shakti-II', kt: '~12 kt', y: 189 },
  { cx: 228, cy: 168, delay: 1.4, label: 'Shakti-III', kt: '0.3 kt', y: 185 },
  { cx: 185, cy: 158, delay: 1.8, label: 'Shakti-IV', kt: '0.5 kt', y: 175 },
  { cx: 215, cy: 158, delay: 2.2, label: 'Shakti-V', kt: '0.2 kt', y: 175 },
];

const Step3 = () => (
  <motion.g key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
    {/* Desert surface */}
    <path
      d="M20,130 Q90,126 160,129 Q230,133 310,128 Q360,131 390,129"
      fill="none"
      stroke={SAND}
      strokeWidth={1.2}
      opacity={0.4}
    />
    <text x={12} y={122} fill={SAND} fontSize={5.5} fontFamily="var(--font-body)" opacity={0.5}>Pokhran Test Range — May 11–13, 1998</text>

    {/* Underground layers */}
    {[148, 165, 182].map(y => (
      <line key={y} x1={20} y1={y} x2={390} y2={y} stroke={STEEL} strokeWidth={0.3} opacity={0.1} strokeDasharray="5 4" />
    ))}

    {/* 5 detonation markers */}
    {SHAKTI_SITES.map((site, i) => (
      <motion.g key={site.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: site.delay }}>
        {/* Blast dot */}
        <motion.circle cx={site.cx} cy={site.cy} fill={SAFFRON}
          initial={{ r: 0 }} animate={{ r: i === 0 ? 8 : 4 }}
          transition={{ duration: 0.4, delay: site.delay + 0.1 }} />
        <motion.circle cx={site.cx} cy={site.cy} fill="hsl(45, 100%, 88%)"
          initial={{ r: 0 }} animate={{ r: i === 0 ? 3.5 : 1.5 }}
          transition={{ duration: 0.3, delay: site.delay + 0.2 }} />

        {/* Seismic ring — only animate once for visual clarity */}
        <motion.circle cx={site.cx} cy={site.cy} fill="none" stroke={SAFFRON}
          strokeWidth={i === 0 ? 1.1 : 0.6}
          initial={{ r: i === 0 ? 8 : 4, opacity: 0 }}
          animate={{ r: [i === 0 ? 8 : 4, i === 0 ? 55 : 35], opacity: [0.55, 0] }}
          transition={{ duration: 2.5, delay: site.delay + 0.3, repeat: Infinity, ease: 'easeOut' }}
        />

        {/* Label */}
        <motion.text x={site.cx} y={site.y + 6} textAnchor="middle" fill={STEEL} fontSize={5} fontFamily="var(--font-body)"
          initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: site.delay + 0.5 }}>
          {site.label}
        </motion.text>
        <motion.text x={site.cx} y={site.y + 13} textAnchor="middle" fill={SAFFRON} fontSize={5.5} fontFamily="var(--font-body)" fontWeight={600}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: site.delay + 0.6 }}>
          {site.kt}
        </motion.text>
      </motion.g>
    ))}

    {/* Thermonuclear badge on Shakti-I */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
      <rect x={110} y={200} width={90} height={14} rx={3} fill="hsl(25, 80%, 22%)" stroke={SAFFRON} strokeWidth={0.6} />
      <text x={155} y={210} textAnchor="middle" fill={SAFFRON} fontSize={6.5} fontFamily="var(--font-body)" fontWeight={700}>
        Thermonuclear · H-bomb
      </text>
    </motion.g>

    {/* Seismic readout — more chaotic for 5 simultaneous tests */}
    <motion.path
      d="M20,60 L40,60 L48,48 L56,72 L62,38 L70,82 L76,44 L84,76 L90,52 L98,68 L106,42 L114,78 L120,60 L390,60"
      fill="none"
      stroke={SAFFRON}
      strokeWidth={0.9}
      initial={{ opacity: 0, pathLength: 0 }}
      animate={{ opacity: 0.5, pathLength: 1 }}
      transition={{ delay: 3.2, duration: 1 }}
    />
    <motion.text x={12} y={56} fill={STEEL} fontSize={5} fontFamily="var(--font-body)"
      initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 4 }}>seismograph</motion.text>

    {/* No-first-use footer */}
    <motion.text x={200} y={245} textAnchor="middle" fill={STEEL} fontSize={6} fontFamily="var(--font-body)" fontStyle="italic"
      initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 4.2 }}>
      Declared nuclear state — no-first-use policy
    </motion.text>
    <motion.text x={200} y={255} textAnchor="middle" fill={STEEL} fontSize={5.5} fontFamily="var(--font-body)"
      initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 4.4 }}>
      Never signed the NPT
    </motion.text>
  </motion.g>
);

const STEP_COMPONENTS = [Step0, Step1, Step2, Step3];

/* ─── Main export ────────────────────────────────────────────────────────── */
export const SeismicPulse = ({ activeStep }: Props) => {
  const StepComponent = STEP_COMPONENTS[activeStep] ?? Step0;

  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <div className="w-full max-w-[480px]">
        <svg viewBox="0 0 400 270" className="w-full h-auto" style={{ background: 'transparent' }}>
          <AnimatePresence mode="wait">
            <StepComponent key={activeStep} />
          </AnimatePresence>
        </svg>
      </div>
    </div>
  );
};
