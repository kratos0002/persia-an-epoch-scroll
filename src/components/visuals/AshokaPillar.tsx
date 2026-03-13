import React from 'react';
import { motion } from 'framer-motion';

interface AshokaPillarProps {
  activeStep: number; // 0 = pillar rises, 1 = edict rings emanate
  className?: string;
}

const SAFFRON = 'hsl(30, 65%, 45%)';
const GOLD = 'hsl(43, 70%, 55%)';
const CRIMSON = 'hsl(0, 50%, 32%)';
const STONE = 'hsl(30, 20%, 50%)';

const EASE = [0.22, 1, 0.36, 1] as const;

// Pillar shaft — tall vertical with slight taper
const SHAFT_LEFT = 'M 232 410 L 234 180';
const SHAFT_RIGHT = 'M 268 410 L 266 180';

// Decorative bands across the shaft
const BANDS = [
  'M 233 260 L 267 260',
  'M 233 320 L 267 320',
  'M 233 380 L 267 380',
];

// Pedestal (inverted trapezoid base)
const PEDESTAL = 'M 218 440 L 220 410 L 280 410 L 282 440 Z';

// Abacus (flat platform under the capital)
const ABACUS = 'M 226 180 L 274 180 L 274 170 L 226 170 Z';

// Lion capital — simplified silhouette suggesting four lions
const CAPITAL_PATHS = [
  // Left lion body
  'M 230 170 Q 225 155 228 140 Q 232 128 240 125',
  // Right lion body
  'M 270 170 Q 275 155 272 140 Q 268 128 260 125',
  // Central merge / mane
  'M 240 125 Q 245 118 250 115 Q 255 118 260 125',
  // Left ear
  'M 232 132 Q 228 122 234 120',
  // Right ear
  'M 268 132 Q 272 122 266 120',
];

// Mini dharma wheel on the abacus face
const WHEEL_CX = 250;
const WHEEL_CY = 175;
const WHEEL_R = 7;
const WHEEL_SPOKES = 8;

const spokeLines = Array.from({ length: WHEEL_SPOKES }, (_, i) => {
  const angle = (i * (360 / WHEEL_SPOKES) - 90) * (Math.PI / 180);
  return {
    x1: WHEEL_CX + Math.cos(angle) * 2,
    y1: WHEEL_CY + Math.sin(angle) * 2,
    x2: WHEEL_CX + Math.cos(angle) * WHEEL_R,
    y2: WHEEL_CY + Math.sin(angle) * WHEEL_R,
  };
});

// Edict rings — concentric ripples from the pillar center
const RING_CY = 300;
const EDICT_RINGS = [
  { r: 50 },
  { r: 75 },
  { r: 100 },
  { r: 130 },
  { r: 165 },
];

// Actual Ashoka edict quotes positioned at cardinal points around the 100-radius ring
const EDICT_QUOTES = [
  { text: '"All men are my children"', angle: -60, r: 108, size: 9 },
  { text: '"Dharma is good"', angle: 30, r: 82, size: 10 },
  { text: '"No living being shall be slaughtered"', angle: 150, r: 140, size: 8.5 },
  { text: '"I have had banyan trees planted"', angle: -150, r: 140, size: 8.5 },
];

export const AshokaPillar = ({ activeStep, className }: AshokaPillarProps) => {
  const isPillar = activeStep >= 0;
  const isEdicts = activeStep >= 1;

  return (
    <div className={`w-full h-full flex items-center justify-center ${className ?? ''}`}>
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full max-w-[500px] max-h-[500px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="pillar-glow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="pillar-crimson-glow">
            <feGaussianBlur stdDeviation="16" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="pillar-soft-glow">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="pillar-stone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.9" />
            <stop offset="100%" stopColor={STONE} stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* ── Crimson base glow (Kalinga) → fades to saffron ── */}
        <motion.circle
          cx={250}
          cy={440}
          r={70}
          fill={CRIMSON}
          filter="url(#pillar-crimson-glow)"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: isPillar && !isEdicts ? 0.2 : 0,
            scale: isPillar ? 1 : 0.5,
          }}
          transition={{ duration: 2, delay: 1.2, ease: EASE }}
        />
        <motion.circle
          cx={250}
          cy={440}
          r={70}
          fill={SAFFRON}
          filter="url(#pillar-crimson-glow)"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: isPillar && !isEdicts ? 0.12 : isEdicts ? 0.06 : 0,
            scale: isPillar ? 1.1 : 0.5,
          }}
          transition={{ duration: 2.5, delay: 2.5, ease: EASE }}
        />

        {/* ── Pedestal ── */}
        <motion.path
          d={PEDESTAL}
          fill="none"
          stroke={SAFFRON}
          strokeWidth={2}
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: isPillar ? 1 : 0,
            opacity: isPillar ? (isEdicts ? 0.3 : 0.8) : 0,
          }}
          transition={{ duration: 1, ease: EASE }}
        />

        {/* ── Shaft — two vertical lines ── */}
        <motion.path
          d={SHAFT_LEFT}
          fill="none"
          stroke="url(#pillar-stone)"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: isPillar ? 1 : 0,
            opacity: isPillar ? (isEdicts ? 0.25 : 0.9) : 0,
          }}
          transition={{ duration: 1.5, delay: 0.3, ease: EASE }}
        />
        <motion.path
          d={SHAFT_RIGHT}
          fill="none"
          stroke="url(#pillar-stone)"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: isPillar ? 1 : 0,
            opacity: isPillar ? (isEdicts ? 0.25 : 0.9) : 0,
          }}
          transition={{ duration: 1.5, delay: 0.3, ease: EASE }}
        />

        {/* ── Shaft fill (subtle) ── */}
        <motion.rect
          x={234}
          y={180}
          width={32}
          height={230}
          fill={SAFFRON}
          rx={2}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{
            scaleY: isPillar ? 1 : 0,
            opacity: isPillar ? (isEdicts ? 0.03 : 0.06) : 0,
          }}
          style={{ transformOrigin: '250px 410px' }}
          transition={{ duration: 1.5, delay: 0.3, ease: EASE }}
        />

        {/* ── Decorative bands ── */}
        {BANDS.map((d, i) => (
          <motion.path
            key={`band-${i}`}
            d={d}
            fill="none"
            stroke={GOLD}
            strokeWidth={1.2}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: isPillar ? 1 : 0,
              opacity: isPillar ? (isEdicts ? 0.15 : 0.5) : 0,
            }}
            transition={{ duration: 0.6, delay: 0.9 + i * 0.12, ease: EASE }}
          />
        ))}

        {/* ── Abacus platform ── */}
        <motion.path
          d={ABACUS}
          fill="none"
          stroke={GOLD}
          strokeWidth={1.5}
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: isPillar ? 1 : 0,
            opacity: isPillar ? (isEdicts ? 0.2 : 0.7) : 0,
          }}
          transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
        />

        {/* ── Lion capital silhouette ── */}
        {CAPITAL_PATHS.map((d, i) => (
          <motion.path
            key={`capital-${i}`}
            d={d}
            fill="none"
            stroke={GOLD}
            strokeWidth={2}
            strokeLinecap="round"
            filter="url(#pillar-glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: isPillar ? 1 : 0,
              opacity: isPillar ? (isEdicts ? 0.2 : 0.85) : 0,
            }}
            transition={{ duration: 0.8, delay: 1.4 + i * 0.1, ease: EASE }}
          />
        ))}

        {/* ── Mini dharma wheel on abacus ── */}
        <motion.circle
          cx={WHEEL_CX}
          cy={WHEEL_CY}
          r={WHEEL_R}
          fill="none"
          stroke={GOLD}
          strokeWidth={1}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isPillar ? 1 : 0,
            opacity: isPillar ? (isEdicts ? 0.15 : 0.6) : 0,
          }}
          transition={{ duration: 0.6, delay: 1.8, ease: EASE }}
        />
        {spokeLines.map((s, i) => (
          <motion.line
            key={`mini-spoke-${i}`}
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
            stroke={GOLD}
            strokeWidth={0.8}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: isPillar ? 1 : 0,
              opacity: isPillar ? (isEdicts ? 0.15 : 0.5) : 0,
            }}
            transition={{ duration: 0.4, delay: 1.9 + i * 0.04, ease: EASE }}
          />
        ))}

        {/* ── Step 1: Edict rings — concentric ripples from the shaft center ── */}
        {EDICT_RINGS.map((ring, i) => (
          <motion.circle
            key={`ring-${i}`}
            cx={250}
            cy={RING_CY}
            r={ring.r}
            fill="none"
            stroke={GOLD}
            strokeWidth={0.7}
            strokeDasharray="6 4"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isEdicts ? 1 : 0,
              opacity: isEdicts ? 0.35 - i * 0.04 : 0,
            }}
            transition={{ duration: 0.9, delay: i * 0.18, ease: EASE }}
          />
        ))}

        {/* ── Edict text quotes along the rings ── */}
        {EDICT_QUOTES.map((quote, i) => {
          const rad = (quote.angle - 90) * (Math.PI / 180);
          const tx = 250 + Math.cos(rad) * quote.r;
          const ty = RING_CY + Math.sin(rad) * quote.r;
          return (
            <motion.text
              key={`edict-${i}`}
              x={tx}
              y={ty}
              fill={GOLD}
              fontSize={quote.size}
              fontFamily="'Playfair Display', Georgia, serif"
              fontStyle="italic"
              textAnchor="middle"
              dominantBaseline="middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: isEdicts ? 0.7 : 0 }}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.2 }}
            >
              {quote.text}
            </motion.text>
          );
        })}

        {/* ── Pulsing ambient glow when edicts are visible ── */}
        {isEdicts && (
          <motion.circle
            cx={250}
            cy={RING_CY}
            r={140}
            fill={GOLD}
            filter="url(#pillar-soft-glow)"
            animate={{
              opacity: [0.02, 0.06, 0.02],
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </svg>
    </div>
  );
};
