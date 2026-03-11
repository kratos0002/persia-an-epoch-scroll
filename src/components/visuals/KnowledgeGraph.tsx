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
  // Phase 0 — Greek sources (left)
  { id: 'aristotle', label: 'Aristotle', x: 80, y: 120, phase: 0, category: 'greek' },
  { id: 'euclid', label: 'Euclid', x: 60, y: 240, phase: 0, category: 'greek' },
  { id: 'galen', label: 'Galen', x: 100, y: 360, phase: 0, category: 'greek' },
  { id: 'ptolemy', label: 'Ptolemy', x: 70, y: 480, phase: 0, category: 'greek' },
  // Phase 1 — Translators (center-left)
  { id: 'hunayn', label: 'Hunayn ibn Ishaq', x: 320, y: 180, phase: 1, category: 'translator' },
  { id: 'thabit', label: 'Thabit ibn Qurra', x: 300, y: 340, phase: 1, category: 'translator' },
  { id: 'mamun', label: "Al-Ma'mun", x: 340, y: 500, phase: 1, category: 'translator' },
  // Phase 2 — Arabic works (center-right)
  { id: 'khwarizmi', label: 'al-Khwārizmī', x: 560, y: 140, phase: 2, category: 'arabic' },
  { id: 'kindi', label: 'al-Kindī', x: 540, y: 270, phase: 2, category: 'arabic' },
  { id: 'haytham', label: 'Ibn al-Haytham', x: 580, y: 400, phase: 2, category: 'arabic' },
  { id: 'razi', label: 'al-Rāzī', x: 550, y: 520, phase: 2, category: 'arabic' },
  // Phase 3 — European (right)
  { id: 'fibonacci', label: 'Fibonacci', x: 780, y: 180, phase: 3, category: 'european' },
  { id: 'bacon', label: 'Roger Bacon', x: 800, y: 340, phase: 3, category: 'european' },
  { id: 'copernicus', label: 'Copernicus', x: 770, y: 480, phase: 3, category: 'european' },
];

const EDGES: KnowledgeEdge[] = [
  // Phase 1 edges: Greek → Translators
  { from: 'aristotle', to: 'hunayn', phase: 1 },
  { from: 'euclid', to: 'thabit', phase: 1 },
  { from: 'galen', to: 'hunayn', phase: 1 },
  { from: 'ptolemy', to: 'thabit', phase: 1 },
  { from: 'ptolemy', to: 'mamun', phase: 1 },
  // Phase 2 edges: Translators → Arabic scholars
  { from: 'hunayn', to: 'kindi', phase: 2 },
  { from: 'hunayn', to: 'razi', phase: 2 },
  { from: 'thabit', to: 'khwarizmi', phase: 2 },
  { from: 'thabit', to: 'haytham', phase: 2 },
  { from: 'mamun', to: 'khwarizmi', phase: 2 },
  // Phase 3 edges: Arabic → European
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

interface KnowledgeGraphProps {
  activePhase: number;
  progress: number;
  isDestroyed?: boolean;
  className?: string;
}

export const KnowledgeGraph = ({ activePhase, progress, isDestroyed = false, className }: KnowledgeGraphProps) => {
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
        {/* Background glow */}
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
        {activePhase >= 0 && (
          <motion.text x="80" y="60" textAnchor="middle" fill="hsl(43, 85%, 55%)" opacity={0.4} fontSize="11" fontFamily="'Cormorant Garamond', serif" letterSpacing="0.15em"
            initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 0.8 }}>
            GREEK SOURCES
          </motion.text>
        )}
        {activePhase >= 1 && (
          <motion.text x="320" y="60" textAnchor="middle" fill="hsl(170, 45%, 45%)" opacity={0.4} fontSize="11" fontFamily="'Cormorant Garamond', serif" letterSpacing="0.15em"
            initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 0.8 }}>
            TRANSLATORS
          </motion.text>
        )}
        {activePhase >= 2 && (
          <motion.text x="560" y="60" textAnchor="middle" fill="hsl(170, 55%, 35%)" opacity={0.4} fontSize="11" fontFamily="'Cormorant Garamond', serif" letterSpacing="0.15em"
            initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 0.8 }}>
            ARABIC SCHOLARS
          </motion.text>
        )}
        {activePhase >= 3 && (
          <motion.text x="780" y="60" textAnchor="middle" fill="hsl(215, 55%, 50%)" opacity={0.4} fontSize="11" fontFamily="'Cormorant Garamond', serif" letterSpacing="0.15em"
            initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 0.8 }}>
            EUROPE
          </motion.text>
        )}

        {/* Edges */}
        <AnimatePresence>
          {visibleEdges.map(edge => {
            const from = nodeMap[edge.from];
            const to = nodeMap[edge.to];
            if (!from || !to) return null;
            const color = CATEGORY_COLORS[to.category].fill;
            return (
              <motion.line
                key={`${edge.from}-${edge.to}`}
                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke={color}
                strokeWidth={isDestroyed ? 0.5 : 1.2}
                strokeOpacity={isDestroyed ? 0.1 : 0.3}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: isDestroyed ? 0.05 : 1,
                  x1: isDestroyed ? from.x + (Math.random() - 0.5) * 60 : from.x,
                  y1: isDestroyed ? from.y + (Math.random() - 0.5) * 60 : from.y,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            );
          })}
        </AnimatePresence>

        {/* Nodes */}
        <AnimatePresence>
          {visibleNodes.map(node => {
            const colors = CATEGORY_COLORS[node.category];
            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: isDestroyed ? 0.15 : 1,
                  scale: isDestroyed ? 0.5 : 1,
                  x: isDestroyed ? (Math.random() - 0.5) * 80 : 0,
                  y: isDestroyed ? (Math.random() - 0.5) * 80 : 0,
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Glow */}
                <circle cx={node.x} cy={node.y} r={14} fill={colors.glow} opacity={0.15} filter="url(#kg-blur)" />
                {/* Node */}
                <circle cx={node.x} cy={node.y} r={6} fill={colors.fill} opacity={0.9} />
                <circle cx={node.x} cy={node.y} r={6} fill="none" stroke={colors.fill} strokeWidth={1} opacity={0.4} />
                {/* Label */}
                <text
                  x={node.x}
                  y={node.y + 20}
                  textAnchor="middle"
                  fill={colors.fill}
                  fontSize="10"
                  fontFamily="'Cormorant Garamond', serif"
                  opacity={0.8}
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
