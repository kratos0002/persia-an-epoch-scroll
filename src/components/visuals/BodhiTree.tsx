import React from 'react';
import { motion } from 'framer-motion';

interface BodhiTreeProps {
  activeStep: number; // 0–3 maps to the 4 scroll steps
  className?: string;
}

const SAFFRON = 'hsl(30, 65%, 45%)';
const GOLD = 'hsl(43, 70%, 55%)';
const LEAF = 'hsl(30, 55%, 40%)';

const EASE = [0.22, 1, 0.36, 1] as const;

// Trunk path: grows from ground up to canopy fork
const TRUNK = 'M 250 480 Q 250 400 248 340 Q 246 280 250 220';

// Main branches radiating from the crown
const BRANCHES = [
  'M 250 220 Q 230 180 200 150',   // left-upper
  'M 250 220 Q 270 180 300 150',   // right-upper
  'M 250 220 Q 220 200 180 190',   // left-mid
  'M 250 220 Q 280 200 320 190',   // right-mid
  'M 250 220 Q 240 170 235 130',   // center-left
  'M 250 220 Q 260 170 265 130',   // center-right
];

// Leaf cluster positions (cx, cy, rx, ry)
const LEAF_CLUSTERS = [
  { cx: 200, cy: 140, rx: 35, ry: 25 },
  { cx: 300, cy: 140, rx: 35, ry: 25 },
  { cx: 180, cy: 180, rx: 30, ry: 20 },
  { cx: 320, cy: 180, rx: 30, ry: 20 },
  { cx: 235, cy: 115, rx: 30, ry: 22 },
  { cx: 265, cy: 115, rx: 30, ry: 22 },
  { cx: 250, cy: 100, rx: 25, ry: 18 },
];

// Root paths spreading underground
const ROOTS = [
  'M 250 480 Q 230 500 200 510',
  'M 250 480 Q 270 500 300 510',
  'M 250 480 Q 240 495 220 515',
  'M 250 480 Q 260 495 280 515',
];

// Four Noble Truths radiating rings — labels at cardinal positions
const TRUTH_RINGS = [
  { r: 40, label: 'Dukkha', lx: 300, ly: 460 },       // right
  { r: 55, label: 'Samudaya', lx: 250, ly: 520 },      // bottom
  { r: 70, label: 'Nirodha', lx: 168, ly: 460 },       // left
  { r: 85, label: 'Magga', lx: 250, ly: 400 },         // top
];

// Eightfold Path — larger wheel centered on the tree crown
const WHEEL_CX = 250;
const WHEEL_CY = 220;
const WHEEL_R = 70;
const SPOKE_INNER = 16;

const EIGHTFOLD = [
  'Right View', 'Right Intention', 'Right Speech', 'Right Action',
  'Right Livelihood', 'Right Effort', 'Right Mindfulness', 'Right Concentration',
];

const SPOKES = EIGHTFOLD.map((_label, i) => {
  const angle = (i * 45 - 90) * (Math.PI / 180);
  return {
    x1: WHEEL_CX + Math.cos(angle) * SPOKE_INNER,
    y1: WHEEL_CY + Math.sin(angle) * SPOKE_INNER,
    x2: WHEEL_CX + Math.cos(angle) * WHEEL_R,
    y2: WHEEL_CY + Math.sin(angle) * WHEEL_R,
  };
});

// Grove trees (step 4) — smaller silhouettes flanking the main tree
const GROVE_TREES = [
  { x: 100, scale: 0.35, delay: 0.2 },
  { x: 400, scale: 0.35, delay: 0.3 },
  { x: 60, scale: 0.25, delay: 0.5 },
  { x: 440, scale: 0.25, delay: 0.6 },
];

export const BodhiTree = ({ activeStep, className }: BodhiTreeProps) => {
  const isBloom = activeStep >= 0;
  const isTruths = activeStep >= 1;
  const isPath = activeStep >= 2;
  const isGrove = activeStep >= 3;

  return (
    <div className={`w-full h-full flex items-center justify-center ${className ?? ''}`}>
      <svg
        viewBox="0 0 500 540"
        className="w-full h-full max-w-[500px] max-h-[520px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="bodhi-glow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="bodhi-leaf-glow">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Roots ── */}
        {ROOTS.map((d, i) => (
          <motion.path
            key={`root-${i}`}
            d={d}
            fill="none"
            stroke={SAFFRON}
            strokeWidth={1.5}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: isBloom ? 1 : 0,
              opacity: isBloom ? 0.4 : 0,
            }}
            transition={{ duration: 1.2, delay: 0.8 + i * 0.1, ease: EASE }}
          />
        ))}

        {/* ── Trunk ── */}
        <motion.path
          d={TRUNK}
          fill="none"
          stroke={SAFFRON}
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: isBloom ? 1 : 0,
            opacity: isBloom ? 1 : 0,
          }}
          transition={{ duration: 1.5, ease: EASE }}
        />

        {/* ── Branches (dim when wheel appears) ── */}
        {BRANCHES.map((d, i) => (
          <motion.path
            key={`branch-${i}`}
            d={d}
            fill="none"
            stroke={SAFFRON}
            strokeWidth={2}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: isBloom ? 1 : 0,
              opacity: isBloom && !isPath ? 0.8 : isPath ? 0.2 : 0,
            }}
            transition={{ duration: isPath ? 0.6 : 1, delay: isPath ? 0 : 0.6 + i * 0.08, ease: EASE }}
          />
        ))}

        {/* ── Leaf canopy (fades when wheel appears) ── */}
        {LEAF_CLUSTERS.map((leaf, i) => (
          <motion.ellipse
            key={`leaf-${i}`}
            cx={leaf.cx}
            cy={leaf.cy}
            rx={leaf.rx}
            ry={leaf.ry}
            fill={LEAF}
            filter="url(#bodhi-leaf-glow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isBloom ? 1 : 0,
              opacity: isBloom && !isPath ? 0.25 : isPath ? 0.08 : 0,
            }}
            transition={{ duration: isPath ? 0.6 : 1, delay: isPath ? 0 : 1.0 + i * 0.1, ease: EASE }}
          />
        ))}

        {/* ── Dawn glow beneath the tree (awakening moment, fades on path step) ── */}
        <motion.circle
          cx={250}
          cy={460}
          r={50}
          fill={GOLD}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isBloom ? 1 : 0,
            opacity: isBloom && !isPath ? 0.15 : 0,
          }}
          transition={{ duration: isPath ? 0.6 : 1.5, delay: isPath ? 0 : 1.5, ease: EASE }}
          filter="url(#bodhi-glow)"
        />

        {/* ── Seated figure silhouette (fades on path step) ── */}
        <motion.ellipse
          cx={250}
          cy={472}
          rx={14}
          ry={8}
          fill={SAFFRON}
          initial={{ opacity: 0 }}
          animate={{ opacity: isBloom && !isPath ? 0.5 : 0 }}
          transition={{ duration: 0.8, delay: isPath ? 0 : 1.8 }}
        />
        <motion.circle
          cx={250}
          cy={458}
          r={6}
          fill={SAFFRON}
          initial={{ opacity: 0 }}
          animate={{ opacity: isBloom && !isPath ? 0.5 : 0 }}
          transition={{ duration: 0.8, delay: isPath ? 0 : 1.9 }}
        />

        {/* ── Step 2: Four Noble Truths — concentric rings (fade out on step 3) ── */}
        {TRUTH_RINGS.map((ring, i) => (
          <React.Fragment key={`truth-${i}`}>
            <motion.circle
              cx={250}
              cy={460}
              r={ring.r}
              fill="none"
              stroke={GOLD}
              strokeWidth={0.8}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isTruths ? 1 : 0,
                opacity: isTruths && !isPath ? 0.4 : 0,
              }}
              transition={{ duration: 0.8, delay: isPath ? 0 : i * 0.2, ease: EASE }}
            />
            <motion.text
              x={ring.lx}
              y={ring.ly}
              fill={GOLD}
              fontSize={13}
              fontFamily="'Playfair Display', Georgia, serif"
              fontStyle="italic"
              textAnchor="middle"
              dominantBaseline="middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: isTruths && !isPath ? 1 : 0 }}
              transition={{ duration: 0.5, delay: isPath ? 0 : 0.6 + i * 0.15 }}
            >
              {ring.label}
            </motion.text>
          </React.Fragment>
        ))}

        {/* ── Step 3: Eightfold Path — large labeled wheel at the crown ── */}
        {/* Outer rim */}
        <motion.circle
          cx={WHEEL_CX}
          cy={WHEEL_CY}
          r={WHEEL_R}
          fill="none"
          stroke={GOLD}
          strokeWidth={1.5}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isPath ? 1 : 0,
            opacity: isPath ? 0.8 : 0,
          }}
          transition={{ duration: 0.8, ease: EASE }}
        />
        {/* Inner rim */}
        <motion.circle
          cx={WHEEL_CX}
          cy={WHEEL_CY}
          r={SPOKE_INNER}
          fill="none"
          stroke={GOLD}
          strokeWidth={1}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isPath ? 1 : 0,
            opacity: isPath ? 0.5 : 0,
          }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        />
        {/* Spokes */}
        {SPOKES.map((s, i) => (
          <motion.line
            key={`spoke-${i}`}
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
            stroke={GOLD}
            strokeWidth={1.5}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: isPath ? 1 : 0,
              opacity: isPath ? 0.8 : 0,
            }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: EASE }}
          />
        ))}
        {/* Center hub */}
        <motion.circle
          cx={WHEEL_CX}
          cy={WHEEL_CY}
          r={6}
          fill={GOLD}
          initial={{ scale: 0 }}
          animate={{ scale: isPath ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.8, ease: EASE }}
          filter={isPath ? 'url(#bodhi-glow)' : undefined}
        />

        {/* ── Step 4: Grove — smaller trees spreading outward ── */}
        {GROVE_TREES.map((tree, i) => (
          <motion.g
            key={`grove-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: isGrove ? 0.5 : 0,
              scale: isGrove ? tree.scale : 0,
            }}
            transition={{ duration: 1, delay: tree.delay, ease: EASE }}
            style={{ transformOrigin: `${tree.x}px 480px` }}
          >
            {/* Mini trunk */}
            <line
              x1={tree.x}
              y1={480}
              x2={tree.x}
              y2={340}
              stroke={SAFFRON}
              strokeWidth={2}
              strokeLinecap="round"
            />
            {/* Mini canopy */}
            <ellipse
              cx={tree.x}
              cy={320}
              rx={25}
              ry={20}
              fill={LEAF}
              opacity={0.3}
            />
            {/* Mini canopy top */}
            <ellipse
              cx={tree.x}
              cy={300}
              rx={18}
              ry={15}
              fill={LEAF}
              opacity={0.2}
            />
          </motion.g>
        ))}

        {/* ── Pulsing glow when fully revealed ── */}
        {isGrove && (
          <motion.circle
            cx={250}
            cy={300}
            r={120}
            fill={GOLD}
            animate={{
              opacity: [0.03, 0.08, 0.03],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            filter="url(#bodhi-leaf-glow)"
          />
        )}
      </svg>
    </div>
  );
};
