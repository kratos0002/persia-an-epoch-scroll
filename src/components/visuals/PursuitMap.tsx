import React from 'react';
import { motion } from 'framer-motion';

const BURNT = 'hsl(15, 75%, 50%)';
const GOLD = 'hsl(40, 60%, 55%)';
const SMOKE = 'hsl(40, 25%, 75%)';

interface City {
  x: number;
  y: number;
  label: string;
  destroyed?: boolean;
}

const CITIES: City[] = [
  { x: 150, y: 180, label: 'Samarkand', destroyed: true },
  { x: 280, y: 220, label: 'Bukhara', destroyed: true },
  { x: 420, y: 260, label: 'Balkh', destroyed: true },
  { x: 540, y: 350, label: 'Kabul' },
  { x: 620, y: 430, label: 'Khyber Pass' },
  { x: 740, y: 520, label: 'Punjab' },
  { x: 820, y: 600, label: 'Indus River' },
];

const ROUTE_PATH = 'M150 180 C200 200 250 210 280 220 C320 240 380 250 420 260 C470 290 510 320 540 350 C570 380 600 410 620 430 C660 470 700 500 740 520 C780 560 800 580 820 600';

const BurningCity = ({ x, y, label, destroyed, visible }: City & { visible: boolean }) => (
  <g>
    {/* City marker */}
    <motion.circle
      cx={x} cy={y} r={destroyed ? 8 : 6}
      fill={destroyed && visible ? BURNT : GOLD}
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    />
    {/* Destruction glow */}
    {destroyed && visible && (
      <>
        <motion.circle
          cx={x} cy={y} r={18}
          fill="none"
          stroke={BURNT}
          strokeWidth={1.5}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.2, 1.5] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
        {/* Flame particles */}
        {[0, 1, 2].map(j => (
          <motion.circle
            key={j}
            cx={x + (j - 1) * 6}
            cy={y - 8}
            r={2}
            fill={BURNT}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 0.8, 0], y: [0, -15, -25] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: j * 0.3, repeatDelay: 0.5 }}
          />
        ))}
      </>
    )}
    {/* Label */}
    <motion.text
      x={x}
      y={y - 18}
      textAnchor="middle"
      fill={destroyed && visible ? BURNT : SMOKE}
      fontSize="13"
      fontFamily="'Cormorant Garamond', serif"
      fontWeight={600}
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 0.9 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {label}
    </motion.text>
  </g>
);

const CliffScene = ({ visible }: { visible: boolean }) => (
  <g>
    {/* Cliff edge */}
    <motion.path
      d="M760 560 L820 600 L820 700 L780 700 L760 620 Z"
      fill="hsl(25, 15%, 18%)"
      stroke="hsl(25, 20%, 30%)"
      strokeWidth={1}
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    />
    {/* River */}
    <motion.path
      d="M830 580 Q860 620 840 700"
      fill="none"
      stroke="hsl(200, 40%, 40%)"
      strokeWidth={12}
      strokeLinecap="round"
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 0.5 } : {}}
      transition={{ duration: 0.8 }}
    />
    {/* Falling figure silhouette */}
    {visible && (
      <motion.g
        initial={{ opacity: 0, y: -20, x: 0 }}
        animate={{ opacity: [0, 1, 1, 0.3], y: [-20, 0, 40, 90], x: [0, 5, 15, 25] }}
        transition={{ duration: 2.5, ease: 'easeIn', repeat: Infinity, repeatDelay: 3 }}
      >
        {/* Simple figure */}
        <circle cx={810} cy={590} r={4} fill={GOLD} />
        <line x1={810} y1={594} x2={810} y2={610} stroke={GOLD} strokeWidth={2} />
        <line x1={805} y1={600} x2={815} y2={600} stroke={GOLD} strokeWidth={1.5} />
        {/* Shield on back */}
        <ellipse cx={814} cy={602} rx={4} ry={6} fill="none" stroke={GOLD} strokeWidth={1} />
      </motion.g>
    )}
  </g>
);

export const PursuitMap = ({ step }: { step: number }) => (
  <div className="w-full h-full flex items-center justify-center" style={{ background: 'hsl(220, 25%, 6%)' }}>
    <svg viewBox="0 0 1000 800" className="w-full h-full max-w-5xl" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="pursuit-terrain" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(25, 15%, 16%)" />
          <stop offset="100%" stopColor="hsl(220, 20%, 8%)" />
        </linearGradient>
        <filter id="pursuit-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Mountain ridges */}
      <path d="M0 400 L80 320 L160 360 L240 280 L320 330 L400 250 L480 300 L560 340 L640 380 L700 420 L800 500 L900 560 L1000 600 L1000 800 L0 800 Z"
        fill="url(#pursuit-terrain)" opacity="0.7" />
      <path d="M0 450 L100 380 L200 410 L300 340 L400 300 L500 350 L600 400 L700 450 L800 530 L1000 650 L1000 800 L0 800 Z"
        fill="hsl(220, 20%, 10%)" opacity="0.5" />

      {/* Hindu Kush label */}
      <text x={480} y={280} textAnchor="middle" fill="hsl(40, 20%, 35%)" fontSize="16" fontFamily="'Cormorant Garamond', serif" letterSpacing="6" opacity="0.6">
        HINDU KUSH
      </text>

      {/* Route path — draws progressively by step */}
      <motion.path
        d={ROUTE_PATH}
        fill="none"
        stroke={BURNT}
        strokeWidth={2.5}
        strokeDasharray="6 4"
        filter="url(#pursuit-glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: step === 0 ? 0.35 : step === 1 ? 0.7 : 1,
          opacity: 1,
        }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />

      {/* Cities — appear based on step */}
      {CITIES.map((city, i) => {
        const showAt = i < 3 ? 0 : i < 5 ? 1 : 2;
        return <BurningCity key={i} {...city} visible={step >= showAt} />;
      })}

      {/* Cliff scene — step 2 only */}
      <CliffScene visible={step >= 2} />

      {/* Genghis watching marker — step 2 */}
      {step >= 2 && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <circle cx={770} cy={555} r={5} fill={GOLD} />
          <text x={770} y={545} textAnchor="middle" fill={GOLD} fontSize="11" fontFamily="'Cormorant Garamond', serif" fontStyle="italic">
            Genghis
          </text>
        </motion.g>
      )}

      {/* Direction arrow */}
      <motion.text
        x={500} y={750}
        textAnchor="middle"
        fill="hsl(40, 20%, 30%)"
        fontSize="12"
        fontFamily="'Cormorant Garamond', serif"
        letterSpacing="4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
      >
        SAMARKAND → INDUS
      </motion.text>
    </svg>
  </div>
);
