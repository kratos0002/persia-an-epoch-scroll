import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface KnowledgeNode {
  id: string;
  label: string;
  x: number;
  y: number;
  phase: number;
  category: 'greek' | 'translator' | 'arabic' | 'european';
}

interface KnowledgeEdge {
  from: string;
  to: string;
  phase: number;
}

const NODES: KnowledgeNode[] = [
  { id: 'aristotle', label: 'Aristotle', x: 80, y: 120, phase: 0, category: 'greek' },
  { id: 'euclid', label: 'Euclid', x: 60, y: 240, phase: 0, category: 'greek' },
  { id: 'galen', label: 'Galen', x: 100, y: 360, phase: 0, category: 'greek' },
  { id: 'ptolemy', label: 'Ptolemy', x: 70, y: 480, phase: 0, category: 'greek' },
  { id: 'hunayn', label: 'Hunayn ibn Ishaq', x: 320, y: 180, phase: 1, category: 'translator' },
  { id: 'thabit', label: 'Thabit ibn Qurra', x: 300, y: 340, phase: 1, category: 'translator' },
  { id: 'mamun', label: "Al-Ma'mun", x: 340, y: 500, phase: 1, category: 'translator' },
  { id: 'khwarizmi', label: 'al-Khwārizmī', x: 560, y: 140, phase: 2, category: 'arabic' },
  { id: 'kindi', label: 'al-Kindī', x: 540, y: 270, phase: 2, category: 'arabic' },
  { id: 'haytham', label: 'Ibn al-Haytham', x: 580, y: 400, phase: 2, category: 'arabic' },
  { id: 'razi', label: 'al-Rāzī', x: 550, y: 520, phase: 2, category: 'arabic' },
  { id: 'fibonacci', label: 'Fibonacci', x: 780, y: 180, phase: 3, category: 'european' },
  { id: 'bacon', label: 'Roger Bacon', x: 800, y: 340, phase: 3, category: 'european' },
  { id: 'copernicus', label: 'Copernicus', x: 770, y: 480, phase: 3, category: 'european' },
];

const EDGES: KnowledgeEdge[] = [
  { from: 'aristotle', to: 'hunayn', phase: 1 },
  { from: 'euclid', to: 'thabit', phase: 1 },
  { from: 'galen', to: 'hunayn', phase: 1 },
  { from: 'ptolemy', to: 'thabit', phase: 1 },
  { from: 'ptolemy', to: 'mamun', phase: 1 },
  { from: 'hunayn', to: 'kindi', phase: 2 },
  { from: 'hunayn', to: 'razi', phase: 2 },
  { from: 'thabit', to: 'khwarizmi', phase: 2 },
  { from: 'thabit', to: 'haytham', phase: 2 },
  { from: 'mamun', to: 'khwarizmi', phase: 2 },
  { from: 'khwarizmi', to: 'fibonacci', phase: 3 },
  { from: 'haytham', to: 'bacon', phase: 3 },
  { from: 'kindi', to: 'bacon', phase: 3 },
  { from: 'razi', to: 'copernicus', phase: 3 },
];

const CATEGORY_COLORS = {
  greek: { fill: 'hsl(43, 85%, 55%)', glow: 'hsl(43, 85%, 55%)' },
  translator: { fill: 'hsl(170, 45%, 45%)', glow: 'hsl(170, 45%, 45%)' },
  arabic: { fill: 'hsl(170, 55%, 35%)', glow: 'hsl(170, 55%, 35%)' },
  european: { fill: 'hsl(215, 55%, 50%)', glow: 'hsl(215, 55%, 50%)' },
};

// Stable random offsets per node for destruction
const DESTRUCTION_OFFSETS = NODES.reduce((acc, n, i) => {
  const seed = i * 137.5;
  acc[n.id] = {
    dx: Math.sin(seed) * 120,
    dy: Math.cos(seed * 0.7) * 100,
    rotate: Math.sin(seed * 1.3) * 45,
  };
  return acc;
}, {} as Record<string, { dx: number; dy: number; rotate: number }>);

interface KnowledgeGraphProps {
  activePhase: number;
  progress: number;
  destructionProgress?: number;
  isDestroyed?: boolean;
  className?: string;
}

export const KnowledgeGraph = ({
  activePhase,
  progress,
  destructionProgress = 0,
  isDestroyed = false,
  className,
}: KnowledgeGraphProps) => {
  // Use destructionProgress if provided, else fall back to binary isDestroyed
  const dp = isDestroyed ? 1 : destructionProgress;

  const visibleNodes = useMemo(() => NODES.filter(n => n.phase <= activePhase), [activePhase]);
  const visibleEdges = useMemo(() => EDGES.filter(e => e.phase <= activePhase), [activePhase]);

  const nodeMap = useMemo(() => {
    const m: Record<string, KnowledgeNode> = {};
    NODES.forEach(n => { m[n.id] = n; });
    return m;
  }, []);

  return (
    <div className={cn("w-full h-full flex items-center justify-center", className)}>
      <svg viewBox="0 0 880 620" className="w-full h-full max-w-4xl" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="kg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(170, 40%, 30%)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="hsl(170, 40%, 30%)" stopOpacity="0" />
          </radialGradient>
          <filter id="kg-blur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <rect width="880" height="620" fill="url(#kg-glow)" />

        {/* Phase labels */}
        {[
          { label: 'GREEK SOURCES', x: 80, phase: 0, color: 'hsl(43, 85%, 55%)' },
          { label: 'TRANSLATORS', x: 320, phase: 1, color: 'hsl(170, 45%, 45%)' },
          { label: 'ARABIC SCHOLARS', x: 560, phase: 2, color: 'hsl(170, 55%, 35%)' },
          { label: 'EUROPE', x: 780, phase: 3, color: 'hsl(215, 55%, 50%)' },
        ].map(p => activePhase >= p.phase && (
          <motion.text
            key={p.label}
            x={p.x} y="60" textAnchor="middle"
            fill={p.color}
            opacity={Math.max(0.05, 0.4 * (1 - dp))}
            fontSize="11"
            fontFamily="'Cormorant Garamond', serif"
            letterSpacing="0.15em"
            initial={{ opacity: 0 }}
            animate={{ opacity: Math.max(0.05, 0.4 * (1 - dp)) }}
            transition={{ duration: 0.8 }}
          >
            {p.label}
          </motion.text>
        ))}

        {/* Edges — stroke-dashoffset drawing + destruction */}
        <AnimatePresence>
          {visibleEdges.map(edge => {
            const from = nodeMap[edge.from];
            const to = nodeMap[edge.to];
            if (!from || !to) return null;

            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const len = Math.sqrt(dx * dx + dy * dy);

            const fromOff = DESTRUCTION_OFFSETS[edge.from];
            const toOff = DESTRUCTION_OFFSETS[edge.to];

            const x1 = from.x + fromOff.dx * dp;
            const y1 = from.y + fromOff.dy * dp;
            const x2 = to.x + toOff.dx * dp;
            const y2 = to.y + toOff.dy * dp;

            const color = CATEGORY_COLORS[to.category].fill;

            return (
              <motion.line
                key={`${edge.from}-${edge.to}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={dp > 0.5 ? 'hsl(0, 60%, 50%)' : color}
                strokeWidth={Math.max(0.3, 1.2 * (1 - dp))}
                strokeOpacity={Math.max(0.02, 0.3 * (1 - dp))}
                strokeDasharray={len}
                initial={{ strokeDashoffset: len }}
                animate={{ strokeDashoffset: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            );
          })}
        </AnimatePresence>

        {/* Nodes — continuous destruction displacement */}
        <AnimatePresence>
          {visibleNodes.map(node => {
            const colors = CATEGORY_COLORS[node.category];
            const off = DESTRUCTION_OFFSETS[node.id];

            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: Math.max(0.05, 1 - dp * 0.9),
                  scale: Math.max(0.3, 1 - dp * 0.6),
                  x: off.dx * dp,
                  y: off.dy * dp,
                  rotate: off.rotate * dp,
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Glow — pulses when healthy */}
                <motion.circle
                  cx={node.x} cy={node.y} r={14}
                  fill={dp > 0.5 ? 'hsl(0, 60%, 40%)' : colors.glow}
                  opacity={0.15 * (1 - dp)}
                  filter="url(#kg-blur)"
                  animate={dp === 0 ? {
                    r: [14, 18, 14],
                    opacity: [0.15, 0.25, 0.15],
                  } : {}}
                  transition={dp === 0 ? { duration: 3, repeat: Infinity, ease: 'easeInOut' } : {}}
                />
                <circle cx={node.x} cy={node.y} r={6} fill={colors.fill} opacity={Math.max(0.1, 0.9 * (1 - dp * 0.7))} />
                <circle cx={node.x} cy={node.y} r={6} fill="none" stroke={colors.fill} strokeWidth={1} opacity={Math.max(0.05, 0.4 * (1 - dp))} />
                <text
                  x={node.x} y={node.y + 20}
                  textAnchor="middle" fill={colors.fill}
                  fontSize="10" fontFamily="'Cormorant Garamond', serif"
                  opacity={Math.max(0.05, 0.8 * (1 - dp))}
                >
                  {node.label}
                </text>
              </motion.g>
            );
          })}
        </AnimatePresence>
      </svg>
    </div>
  );
};
