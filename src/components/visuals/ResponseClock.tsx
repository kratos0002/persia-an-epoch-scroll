import React from 'react';
import { motion } from 'framer-motion';

const PAKISTAN_GREEN = 'hsl(150, 60%, 35%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';
const BUNKER = 'hsl(200, 25%, 6%)';
const SAFFRON = 'hsl(25, 80%, 50%)';
const SURFACE = 'hsl(200, 20%, 10%)';

const PROLIFERATION = [
  { name: 'Libya', angle: -35, distance: 115, status: 'Dismantled 2003' },
  { name: 'Iran', angle: 15, distance: 108, status: 'Threshold state' },
  { name: 'North Korea', angle: 65, distance: 120, status: 'Tested 2006' },
];

/* ─── Step 0: 1971 War Loss — East Bengal gone ─────────────────────── */
const Step0Loss = () => (
  <svg viewBox="0 0 320 260" className="w-full max-w-[340px] h-auto mx-auto">
    {/* Pakistan outline — simplified left-side shape */}
    <motion.path
      d="M 100 60 L 160 55 L 175 80 L 165 130 L 140 160 L 105 155 L 90 120 Z"
      fill="hsl(150, 40%, 15%)"
      stroke={PAKISTAN_GREEN}
      strokeWidth={1.2}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    />
    <motion.text
      x={132} y={112}
      textAnchor="middle"
      fill={PAKISTAN_GREEN}
      fontSize={7}
      fontFamily="var(--font-body)"
      fontWeight={600}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      West Pakistan
    </motion.text>

    {/* East Bengal / Bangladesh — separated */}
    <motion.path
      d="M 220 100 L 255 95 L 265 120 L 255 148 L 225 152 L 210 130 Z"
      fill="hsl(0, 40%, 18%)"
      stroke={SAFFRON}
      strokeWidth={1.2}
      strokeDasharray="4 3"
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 18 }}
      transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    />
    <motion.text
      x={238} y={124}
      textAnchor="middle"
      fill={SAFFRON}
      fontSize={6.5}
      fontFamily="var(--font-body)"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.0 }}
    >
      East Bengal
    </motion.text>
    <motion.text
      x={238} y={133}
      textAnchor="middle"
      fill={SAFFRON}
      fontSize={5.5}
      fontFamily="var(--font-body)"
    >
      (lost 1971)
    </motion.text>

    {/* Fracture line between them */}
    <motion.line
      x1={195} y1={90}
      x2={200} y2={165}
      stroke={SAFFRON}
      strokeWidth={1}
      strokeDasharray="3 4"
      opacity={0.4}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.4 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    />

    {/* Bhutto label */}
    <motion.text
      x={160} y={198}
      textAnchor="middle"
      fill={LIGHT}
      fontSize={8.5}
      fontFamily="var(--font-display)"
      fontWeight={900}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6 }}
    >
      Bhutto's Decision · 1972
    </motion.text>
    <motion.text
      x={160} y={212}
      textAnchor="middle"
      fill={STEEL}
      fontSize={6.5}
      fontFamily="var(--font-body)"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8 }}
    >
      Half the country gone. We will get the bomb.
    </motion.text>

    {/* Determination arrow — upward from Pakistan shape */}
    <motion.path
      d="M 132 148 L 132 175 M 127 170 L 132 175 L 137 170"
      fill="none"
      stroke={PAKISTAN_GREEN}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.8 }}
      transition={{ duration: 0.7, delay: 2.0 }}
    />
  </svg>
);

/* ─── Step 1: Centrifuge theft URENCO → Pakistan ───────────────────── */
const Step1Theft = () => {
  const nodes = [
    { id: 'urenco', label: 'URENCO', sub: 'Netherlands', cx: 68, cy: 120, color: STEEL },
    { id: 'khan', label: 'A.Q. Khan', sub: 'metallurgist', cx: 160, cy: 120, color: PAKISTAN_GREEN },
    { id: 'kahuta', label: 'Kahuta', sub: 'Pakistan', cx: 252, cy: 120, color: PAKISTAN_GREEN },
  ];

  return (
    <svg viewBox="0 0 320 240" className="w-full max-w-[340px] h-auto mx-auto">
      <motion.text
        x={160} y={30}
        textAnchor="middle"
        fill={STEEL}
        fontSize={7}
        fontFamily="var(--font-body)"
        letterSpacing="0.2em"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.1 }}
      >
        CENTRIFUGE DESIGNS · 1975
      </motion.text>

      {/* Flow arrows between nodes */}
      {[
        { x1: 100, y1: 120, x2: 128, y2: 120, delay: 0.5 },
        { x1: 192, y1: 120, x2: 220, y2: 120, delay: 1.2 },
      ].map((arrow, i) => (
        <motion.g key={i}>
          <motion.line
            x1={arrow.x1} y1={arrow.y1} x2={arrow.x2} y2={arrow.y2}
            stroke={PAKISTAN_GREEN}
            strokeWidth={1.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 0.6, delay: arrow.delay }}
          />
          {/* arrowhead */}
          <motion.path
            d={`M ${arrow.x2 - 5} ${arrow.y2 - 4} L ${arrow.x2} ${arrow.y2} L ${arrow.x2 - 5} ${arrow.y2 + 4}`}
            fill="none"
            stroke={PAKISTAN_GREEN}
            strokeWidth={1.5}
            strokeLinejoin="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: arrow.delay + 0.5 }}
          />
          {/* travelling particle */}
          <motion.circle
            r={2.5}
            fill={PAKISTAN_GREEN}
            animate={{ cx: [arrow.x1, arrow.x2], cy: [arrow.y1, arrow.y2] }}
            transition={{ duration: 1.4, delay: arrow.delay + 0.3, repeat: Infinity, ease: 'linear' }}
            opacity={0.9}
          />
        </motion.g>
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <motion.g key={n.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.3 + 0.1, duration: 0.6 }}>
          <circle cx={n.cx} cy={n.cy} r={30} fill={SURFACE} stroke={n.color} strokeWidth={1.2} />
          <text x={n.cx} y={n.cy - 3} textAnchor="middle" fill={LIGHT} fontSize={6.5} fontFamily="var(--font-body)" fontWeight={600}>
            {n.label}
          </text>
          <text x={n.cx} y={n.cy + 8} textAnchor="middle" fill={STEEL} fontSize={5.5} fontFamily="var(--font-body)">
            {n.sub}
          </text>
        </motion.g>
      ))}

      {/* "Stolen" badge overlaying the URENCO→Khan arrow */}
      <motion.g initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9, type: 'spring' }}>
        <rect x={108} y={100} width={32} height={12} rx={3} fill="hsl(0, 60%, 25%)" />
        <text x={124} y={109} textAnchor="middle" fill="hsl(0, 70%, 70%)" fontSize={5.5} fontFamily="var(--font-body)" fontWeight={600}>
          STOLEN
        </text>
      </motion.g>

      {/* Centrifuge icon — simplified schematic */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.5 }}>
        <ellipse cx={160} cy={185} rx={18} ry={7} fill="none" stroke={PAKISTAN_GREEN} strokeWidth={0.8} />
        <line x1={160} y1={178} x2={160} y2={200} stroke={PAKISTAN_GREEN} strokeWidth={0.8} />
        <ellipse cx={160} cy={200} rx={18} ry={7} fill="none" stroke={PAKISTAN_GREEN} strokeWidth={0.8} />
        <text x={160} y={217} textAnchor="middle" fill={STEEL} fontSize={5.5} fontFamily="var(--font-body)">
          gas centrifuge · uranium enrichment
        </text>
      </motion.g>
    </svg>
  );
};

/* ─── Step 2: 17-day countdown clock ───────────────────────────────── */
const Step2Countdown = () => (
  <svg viewBox="0 0 300 300" className="w-full max-w-[300px] h-auto mx-auto">
    {/* Clock face */}
    <circle cx={150} cy={150} r={122} fill="none" stroke={STEEL} strokeWidth={0.4} opacity={0.25} />
    <circle cx={150} cy={150} r={115} fill="none" stroke={STEEL} strokeWidth={0.25} opacity={0.12} />

    {/* Day markers (17 segments) */}
    {Array.from({ length: 17 }, (_, i) => {
      const angle = (i / 17) * 360 - 90;
      const rad = (angle * Math.PI) / 180;
      const x1 = 150 + Math.cos(rad) * 108;
      const y1 = 150 + Math.sin(rad) * 108;
      const x2 = 150 + Math.cos(rad) * 121;
      const y2 = 150 + Math.sin(rad) * 121;
      const tx = 150 + Math.cos(rad) * 97;
      const ty = 150 + Math.sin(rad) * 97;

      return (
        <motion.g key={i}>
          <motion.line
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={PAKISTAN_GREEN}
            strokeWidth={i === 16 ? 3 : 1.5}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === 16 ? 1 : 0.55 }}
            transition={{ delay: i * 0.07 }}
          />
          <motion.text
            x={tx} y={ty + 2}
            textAnchor="middle"
            fill={i === 16 ? LIGHT : STEEL}
            fontSize={5}
            fontFamily="var(--font-body)"
            fontWeight={i === 16 ? 700 : 400}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === 16 ? 1 : 0.45 }}
            transition={{ delay: i * 0.07 }}
          >
            {i + 1}
          </motion.text>
        </motion.g>
      );
    })}

    {/* Sweep hand */}
    <motion.line
      x1={150} y1={150} x2={150} y2={38}
      stroke={PAKISTAN_GREEN}
      strokeWidth={2}
      strokeLinecap="round"
      style={{ transformOrigin: '150px 150px' }}
      initial={{ rotate: 0, opacity: 0 }}
      animate={{ rotate: 360, opacity: 1 }}
      transition={{ duration: 2.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    />
    <circle cx={150} cy={150} r={3.5} fill={PAKISTAN_GREEN} />

    {/* India test label */}
    <motion.text x={150} y={128} textAnchor="middle" fill={SAFFRON} fontSize={6.5} fontFamily="var(--font-body)" initial={{ opacity: 0 }} animate={{ opacity: 0.85 }} transition={{ delay: 0.2 }}>
      India tests · May 11, 1998
    </motion.text>

    {/* Pakistan response */}
    <motion.text x={150} y={172} textAnchor="middle" fill={PAKISTAN_GREEN} fontSize={6.5} fontFamily="var(--font-body)" fontWeight={600} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2 }}>
      Pakistan responds · May 28
    </motion.text>

    {/* 17 days label */}
    <motion.text
      x={150} y={200}
      textAnchor="middle"
      fill={LIGHT}
      fontSize={26}
      fontFamily="var(--font-display)"
      fontWeight={900}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 3.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: '150px 195px' }}
    >
      17 DAYS
    </motion.text>

    {/* Chagai label */}
    <motion.text x={150} y={215} textAnchor="middle" fill={STEEL} fontSize={6} fontFamily="var(--font-body)" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 3.9 }}>
      Chagai mountain, Balochistan — 5 devices
    </motion.text>
  </svg>
);

/* ─── Step 3: A.Q. Khan proliferation network map ──────────────────── */
const Step3Network = () => {
  const centerX = 150;
  const centerY = 115;

  return (
    <svg viewBox="0 0 300 240" className="w-full max-w-[340px] h-auto mx-auto">
      <motion.text
        x={150} y={20}
        textAnchor="middle"
        fill={STEEL}
        fontSize={7}
        fontFamily="var(--font-body)"
        letterSpacing="0.2em"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.1 }}
      >
        A.Q. KHAN PROLIFERATION NETWORK
      </motion.text>

      {/* Pakistan center node */}
      <motion.g initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} style={{ transformOrigin: `${centerX}px ${centerY}px` }}>
        <circle cx={centerX} cy={centerY} r={22} fill={SURFACE} stroke={PAKISTAN_GREEN} strokeWidth={1.8} />
        {/* Pulse ring */}
        <motion.circle cx={centerX} cy={centerY} r={22} fill="none" stroke={PAKISTAN_GREEN} strokeWidth={1} animate={{ r: [22, 34], opacity: [0.6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }} />
        <text x={centerX} y={centerY - 4} textAnchor="middle" fill={PAKISTAN_GREEN} fontSize={6.5} fontFamily="var(--font-body)" fontWeight={700}>Pakistan</text>
        <text x={centerX} y={centerY + 6} textAnchor="middle" fill={STEEL} fontSize={5.2} fontFamily="var(--font-body)">A.Q. Khan</text>
      </motion.g>

      {/* Target nations */}
      {PROLIFERATION.map((target, i) => {
        const rad = (target.angle * Math.PI) / 180;
        const tx = centerX + Math.cos(rad) * target.distance * 0.72;
        const ty = centerY + Math.sin(rad) * target.distance * 0.58;

        return (
          <motion.g key={target.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 + i * 0.35 }}>
            {/* Dashed connection line */}
            <motion.line
              x1={centerX} y1={centerY}
              x2={tx} y2={ty}
              stroke={PAKISTAN_GREEN}
              strokeWidth={0.9}
              strokeDasharray="3.5 3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 0.7 + i * 0.35 }}
              opacity={0.5}
            />

            {/* Travelling particle */}
            <motion.circle
              r={2}
              fill={PAKISTAN_GREEN}
              opacity={0.8}
              animate={{ cx: [centerX, tx], cy: [centerY, ty] }}
              transition={{ duration: 1.8, delay: 1.1 + i * 0.35, repeat: Infinity, ease: 'linear' }}
            />

            {/* "centrifuge designs" label on line midpoint */}
            <motion.text
              x={(centerX + tx) / 2}
              y={(centerY + ty) / 2 - 5}
              textAnchor="middle"
              fill={PAKISTAN_GREEN}
              fontSize={4.5}
              fontFamily="var(--font-body)"
              opacity={0.6}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.5 + i * 0.35 }}
            >
              centrifuge designs
            </motion.text>

            {/* Target node */}
            <circle cx={tx} cy={ty} r={15} fill={SURFACE} stroke={STEEL} strokeWidth={0.9} />
            <text x={tx} y={ty - 2} textAnchor="middle" fill={LIGHT} fontSize={5.5} fontFamily="var(--font-body)" fontWeight={600}>{target.name}</text>
            <text x={tx} y={ty + 7} textAnchor="middle" fill={STEEL} fontSize={3.8} fontFamily="var(--font-body)">{target.status}</text>
          </motion.g>
        );
      })}

      {/* Caption */}
      <motion.text
        x={150} y={225}
        textAnchor="middle"
        fill={STEEL}
        fontSize={6}
        fontFamily="var(--font-body)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2.2 }}
      >
        Pakistan's bomb was built through theft — then franchised.
      </motion.text>
    </svg>
  );
};

/* ─── Main export ───────────────────────────────────────────────────── */
interface Props {
  activeStep: number;
}

export const ResponseClock = ({ activeStep }: Props) => {
  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        {activeStep === 0 && <Step0Loss />}
        {activeStep === 1 && <Step1Theft />}
        {activeStep === 2 && <Step2Countdown />}
        {activeStep === 3 && <Step3Network />}
      </div>
    </div>
  );
};
