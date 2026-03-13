import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Branch {
  id: string;
  label: string;
  path: string;
  color: string;
  phase: number;
  labelPos: { x: number; y: number };
}

const SAFFRON = 'hsl(30, 65%, 45%)';
const GOLD = 'hsl(43, 70%, 55%)';
const THERAVADA = 'hsl(35, 75%, 50%)';
const MAHAYANA = 'hsl(350, 50%, 45%)';
const VAJRAYANA = 'hsl(270, 45%, 45%)';
const ZEN = 'hsl(150, 25%, 35%)';
const PURE_LAND = 'hsl(43, 70%, 55%)';
const NICHIREN = 'hsl(15, 55%, 50%)';
const TIBETAN = 'hsl(270, 55%, 55%)';

const BRANCHES: Branch[] = [
  // Phase 0: Trunk
  { id: 'trunk', label: '', path: 'M 250 480 Q 250 400 250 300 Q 250 260 250 220', color: SAFFRON, phase: 0, labelPos: { x: 0, y: 0 } },
  // Phase 1: First split
  { id: 'theravada', label: 'Theravada', path: 'M 250 220 Q 230 180 180 140 Q 150 120 120 100', color: THERAVADA, phase: 1, labelPos: { x: 85, y: 88 } },
  { id: 'mahayana', label: 'Mahāyāna', path: 'M 250 220 Q 270 180 320 140 Q 350 120 380 100', color: MAHAYANA, phase: 1, labelPos: { x: 390, y: 88 } },
  // Phase 2: Vajrayana from Mahayana
  { id: 'vajrayana', label: 'Vajrayāna', path: 'M 320 140 Q 340 110 350 80 Q 355 55 345 35', color: VAJRAYANA, phase: 2, labelPos: { x: 355, y: 25 } },
  // Phase 3: Sub-branches
  { id: 'zen', label: 'Zen / Chán', path: 'M 380 100 Q 400 75 420 55', color: ZEN, phase: 3, labelPos: { x: 425, y: 45 } },
  { id: 'pureland', label: 'Pure Land', path: 'M 380 100 Q 395 85 415 80', color: PURE_LAND, phase: 3, labelPos: { x: 420, y: 72 } },
  { id: 'nichiren', label: 'Nichiren', path: 'M 380 100 Q 410 95 435 105', color: NICHIREN, phase: 3, labelPos: { x: 440, y: 100 } },
  { id: 'tibetan-schools', label: 'Tibetan Schools', path: 'M 345 35 Q 330 25 315 20', color: TIBETAN, phase: 3, labelPos: { x: 270, y: 18 } },
];

// Root node
const ROOT = { x: 250, y: 480, label: 'Siddhārtha', color: GOLD };

interface BranchingTreeProps {
  activePhase: number;
  highlightBranch?: string;
  progress?: number;
  className?: string;
}

export const BranchingTree = ({ activePhase, highlightBranch, progress = 1, className }: BranchingTreeProps) => {
  const visibleBranches = useMemo(
    () => BRANCHES.filter(b => b.phase <= activePhase),
    [activePhase]
  );

  return (
    <div className={cn('w-full h-full flex items-center justify-center', className)}>
      <svg viewBox="0 0 500 520" className="w-full h-full max-w-[500px] max-h-[520px]" preserveAspectRatio="xMidYMid meet">
        {/* Glow defs */}
        <defs>
          {BRANCHES.map(b => (
            <filter key={b.id} id={`glow-${b.id}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          ))}
        </defs>

        {/* Branches */}
        {visibleBranches.map(branch => {
          const isHighlighted = !highlightBranch || highlightBranch === branch.id;
          const opacity = highlightBranch ? (isHighlighted ? 1 : 0.15) : 1;
          const isNewPhase = branch.phase === activePhase;

          return (
            <g key={branch.id}>
              {/* Glow layer */}
              <motion.path
                d={branch.path}
                fill="none"
                stroke={branch.color}
                strokeWidth={branch.id === 'trunk' ? 5 : 3}
                strokeLinecap="round"
                opacity={opacity * 0.3}
                filter={isHighlighted && highlightBranch ? `url(#glow-${branch.id})` : undefined}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress }}
                transition={{ duration: isNewPhase ? 1.5 : 0, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* Main path */}
              <motion.path
                d={branch.path}
                fill="none"
                stroke={branch.color}
                strokeWidth={branch.id === 'trunk' ? 3 : 2}
                strokeLinecap="round"
                opacity={opacity}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress }}
                transition={{ duration: isNewPhase ? 1.5 : 0, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* Label */}
              {branch.label && (
                <motion.text
                  x={branch.labelPos.x}
                  y={branch.labelPos.y}
                  fill={branch.color}
                  fontSize="11"
                  fontFamily="'Playfair Display', Georgia, serif"
                  fontWeight="600"
                  opacity={opacity}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: opacity * progress }}
                  transition={{ duration: 0.6, delay: isNewPhase ? 1.2 : 0 }}
                >
                  {branch.label}
                </motion.text>
              )}
            </g>
          );
        })}

        {/* Root node */}
        <motion.circle
          cx={ROOT.x} cy={ROOT.y} r={6}
          fill={ROOT.color}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <text x={ROOT.x} y={ROOT.y + 18} fill={ROOT.color} fontSize="10" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif">
          {ROOT.label}
        </text>

        {/* Node dots at branch ends */}
        {visibleBranches.filter(b => b.label).map(branch => {
          const isHighlighted = !highlightBranch || highlightBranch === branch.id;
          return (
            <motion.circle
              key={`node-${branch.id}`}
              cx={branch.labelPos.x - (branch.labelPos.x > 250 ? 8 : -8)}
              cy={branch.labelPos.y + 4}
              r={4}
              fill={branch.color}
              opacity={highlightBranch ? (isHighlighted ? 1 : 0.15) : 1}
              initial={{ scale: 0 }}
              animate={{ scale: progress }}
              transition={{ duration: 0.4, delay: branch.phase === activePhase ? 1.0 : 0 }}
            />
          );
        })}
      </svg>
    </div>
  );
};
