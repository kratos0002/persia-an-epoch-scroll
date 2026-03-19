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

/* ─── Step 0: Nehru's Paradox — typographic split ─────────────────────── */
const Step0 = () => (
  <motion.g key="step0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
    {/* Center dividing line */}
    <motion.line
      x1={200} y1={30} x2={200} y2={230}
      stroke={SAFFRON} strokeWidth={0.5} opacity={0.3}
      initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      style={{ transformOrigin: '200px 130px' }}
    />

    {/* LEFT — The Voice of Disarmament */}
    <motion.g initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
      <text x={100} y={50} textAnchor="middle" fill={STEEL} fontSize={6} fontFamily="var(--font-body)" letterSpacing={2}>
        THE VOICE
      </text>
      <text x={100} y={90} textAnchor="middle" fill={LIGHT} fontSize={13} fontFamily="var(--font-display)" fontStyle="italic" fontWeight={600}>
        "A sin against
      </text>
      <text x={100} y={112} textAnchor="middle" fill={LIGHT} fontSize={13} fontFamily="var(--font-display)" fontStyle="italic" fontWeight={600}>
        humanity"
      </text>
      <text x={100} y={135} textAnchor="middle" fill={STEEL} fontSize={7} fontFamily="var(--font-body)">
        — Jawaharlal Nehru
      </text>
      <text x={100} y={165} textAnchor="middle" fill={STEEL} fontSize={7} fontFamily="var(--font-body)" opacity={0.6}>
        Champion of global
      </text>
      <text x={100} y={178} textAnchor="middle" fill={STEEL} fontSize={7} fontFamily="var(--font-body)" opacity={0.6}>
        nuclear disarmament
      </text>
    </motion.g>

    {/* RIGHT — The Act */}
    <motion.g initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.8 }}>
      <text x={300} y={50} textAnchor="middle" fill={STEEL} fontSize={6} fontFamily="var(--font-body)" letterSpacing={2}>
        THE ACT
      </text>
      <text x={300} y={90} textAnchor="middle" fill={SAFFRON} fontSize={32} fontFamily="var(--font-display)" fontWeight={900}>
        1948
      </text>
      <text x={300} y={112} textAnchor="middle" fill={LIGHT} fontSize={8} fontFamily="var(--font-body)" fontWeight={600}>
        Nuclear research program
      </text>
      <text x={300} y={126} textAnchor="middle" fill={LIGHT} fontSize={8} fontFamily="var(--font-body)" fontWeight={600}>
        established
      </text>
      <text x={300} y={155} textAnchor="middle" fill={STEEL} fontSize={7} fontFamily="var(--font-body)" opacity={0.6}>
        One year after
      </text>
      <text x={300} y={168} textAnchor="middle" fill={STEEL} fontSize={7} fontFamily="var(--font-body)" opacity={0.6}>
        independence
      </text>
    </motion.g>

    {/* Bottom — the punchline */}
    <motion.line x1={80} y1={218} x2={320} y2={218} stroke={SAFFRON} strokeWidth={0.4} opacity={0.2}
      initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.6, duration: 0.8 }}
      style={{ transformOrigin: '200px 218px' }}
    />
    <motion.text
      x={200} y={245} textAnchor="middle" fill={LIGHT} fontSize={8}
      fontFamily="var(--font-body)" fontStyle="italic"
      initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 2 }}
    >
      Two sides of the same coin
    </motion.text>
  </motion.g>
);

/* ─── Step 1: China threat — the catalyst ──────────────────────────────── */
const Step1 = () => (
  <motion.g key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
    {/* Large year — the moment everything changed */}
    <motion.text
      x={200} y={55} textAnchor="middle" fill={THREAT_RED} fontSize={48}
      fontFamily="var(--font-display)" fontWeight={900}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.12, scale: 1 }}
      transition={{ duration: 1 }}
    >
      1964
    </motion.text>

    {/* China tests */}
    <motion.text
      x={200} y={50} textAnchor="middle" fill={THREAT_RED} fontSize={11}
      fontFamily="var(--font-display)" fontWeight={800}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
    >
      China tests the bomb
    </motion.text>
    <motion.text
      x={200} y={66} textAnchor="middle" fill={STEEL} fontSize={7}
      fontFamily="var(--font-body)"
      initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.7 }}
    >
      October 16 · Lop Nur · 22 kilotons
    </motion.text>

    {/* Expanding shockwave rings — threat radiating outward */}
    {[0, 1, 2, 3].map(i => (
      <motion.circle
        key={`threat-${i}`}
        cx={200} cy={42}
        fill="none" stroke={THREAT_RED} strokeWidth={0.6}
        initial={{ r: 20, opacity: 0 }}
        animate={{ r: [20, 100 + i * 30], opacity: [0.4, 0] }}
        transition={{ duration: 3, delay: 1 + i * 0.4, repeat: Infinity, ease: 'easeOut' }}
      />
    ))}

    {/* Dividing line — before/after */}
    <motion.line x1={60} y1={100} x2={340} y2={100} stroke={THREAT_RED} strokeWidth={0.5} opacity={0.25}
      initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      style={{ transformOrigin: '200px 100px' }}
    />

    {/* India's calculus — below the line */}
    <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
      <text x={200} y={125} textAnchor="middle" fill={STEEL} fontSize={6} fontFamily="var(--font-body)" letterSpacing={2}>
        INDIA'S SECURITY CALCULUS
      </text>

      {/* Timeline of escalation */}
      {[
        { year: '1962', event: 'Border war — China humiliates India', color: THREAT_RED },
        { year: '1964', event: 'China goes nuclear — India\'s neighbor is armed', color: THREAT_RED },
        { year: '1965', event: 'Bhabha pushes for weapons test', color: SAFFRON },
        { year: '1966', event: 'Bhabha dies — Ramanna carries the program forward', color: SAFFRON },
      ].map((item, i) => (
        <motion.g
          key={item.year}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8 + i * 0.25 }}
        >
          <text x={85} y={152 + i * 24} textAnchor="end" fill={item.color} fontSize={9}
            fontFamily="var(--font-display)" fontWeight={700}>
            {item.year}
          </text>
          <line x1={92} y1={148 + i * 24} x2={92} y2={155 + i * 24} stroke={item.color} strokeWidth={1} opacity={0.5} />
          <text x={100} y={153 + i * 24} fill={STEEL} fontSize={7}
            fontFamily="var(--font-body)">
            {item.event}
          </text>
        </motion.g>
      ))}
    </motion.g>

    {/* Bottom verdict */}
    <motion.text
      x={200} y={258} textAnchor="middle" fill={LIGHT} fontSize={8}
      fontFamily="var(--font-body)" fontStyle="italic"
      initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 3 }}
    >
      The security calculus changed overnight.
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
  { cx: 100, cy: 165, delay: 0.6, label: 'Shakti-I', kt: '45 kt', big: true },
  { cx: 180, cy: 170, delay: 1.0, label: 'Shakti-II', kt: '~12 kt', big: false },
  { cx: 255, cy: 165, delay: 1.4, label: 'Shakti-III', kt: '0.3 kt', big: false },
  { cx: 145, cy: 145, delay: 1.8, label: 'Shakti-IV', kt: '0.5 kt', big: false },
  { cx: 220, cy: 145, delay: 2.2, label: 'Shakti-V', kt: '0.2 kt', big: false },
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
    {SHAKTI_SITES.map((site) => (
      <motion.g key={site.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: site.delay }}>
        {/* Blast dot */}
        <motion.circle cx={site.cx} cy={site.cy} fill={SAFFRON}
          initial={{ r: 0 }} animate={{ r: site.big ? 12 : 6 }}
          transition={{ duration: 0.4, delay: site.delay + 0.1 }} />
        <motion.circle cx={site.cx} cy={site.cy} fill="hsl(45, 100%, 88%)"
          initial={{ r: 0 }} animate={{ r: site.big ? 5 : 2.5 }}
          transition={{ duration: 0.3, delay: site.delay + 0.2 }} />

        {/* Seismic rings */}
        <motion.circle cx={site.cx} cy={site.cy} fill="none" stroke={SAFFRON}
          strokeWidth={site.big ? 1.2 : 0.7}
          initial={{ r: site.big ? 12 : 6, opacity: 0 }}
          animate={{ r: [site.big ? 12 : 6, site.big ? 70 : 45], opacity: [0.55, 0] }}
          transition={{ duration: 2.5, delay: site.delay + 0.3, repeat: Infinity, ease: 'easeOut' }}
        />

        {/* Label */}
        <motion.text x={site.cx} y={site.cy + (site.big ? 26 : 20)} textAnchor="middle" fill={STEEL} fontSize={6.5} fontFamily="var(--font-body)"
          initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: site.delay + 0.5 }}>
          {site.label}
        </motion.text>
        <motion.text x={site.cx} y={site.cy + (site.big ? 38 : 31)} textAnchor="middle" fill={SAFFRON} fontSize={7.5} fontFamily="var(--font-display)" fontWeight={700}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: site.delay + 0.6 }}>
          {site.kt}
        </motion.text>
      </motion.g>
    ))}

    {/* Thermonuclear badge on Shakti-I */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
      <rect x={48} y={212} width={104} height={16} rx={3} fill="hsl(25, 80%, 22%)" stroke={SAFFRON} strokeWidth={0.6} />
      <text x={100} y={223} textAnchor="middle" fill={SAFFRON} fontSize={7} fontFamily="var(--font-body)" fontWeight={700}>
        Thermonuclear · H-bomb
      </text>
    </motion.g>

    {/* Seismic readout — chaotic for 5 simultaneous tests */}
    <motion.path
      d="M10,55 L50,55 L60,40 L70,70 L78,30 L88,80 L96,38 L106,72 L114,48 L124,65 L132,35 L142,75 L150,55 L390,55"
      fill="none"
      stroke={SAFFRON}
      strokeWidth={1}
      initial={{ opacity: 0, pathLength: 0 }}
      animate={{ opacity: 0.5, pathLength: 1 }}
      transition={{ delay: 3.2, duration: 1 }}
    />
    <motion.text x={10} y={50} fill={STEEL} fontSize={5.5} fontFamily="var(--font-body)"
      initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 4 }}>seismograph</motion.text>

    {/* No-first-use footer */}
    <motion.text x={200} y={248} textAnchor="middle" fill={STEEL} fontSize={7} fontFamily="var(--font-body)" fontStyle="italic"
      initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 4 }}>
      Declared nuclear state — no-first-use policy
    </motion.text>
    <motion.text x={200} y={262} textAnchor="middle" fill={STEEL} fontSize={6.5} fontFamily="var(--font-body)"
      initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 4.2 }}>
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
      <div className="w-full max-w-[600px]">
        <svg viewBox="0 0 400 270" className="w-full h-auto" style={{ background: 'transparent' }}>
          <AnimatePresence mode="wait">
            <StepComponent key={activeStep} />
          </AnimatePresence>
        </svg>
      </div>
    </div>
  );
};
