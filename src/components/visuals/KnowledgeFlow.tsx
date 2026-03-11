import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FlowNode {
  id: string;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  color: string;
  phase: number;
}

interface FlowEdge {
  from: string;
  to: string;
  phase: number;
}

const NODES: FlowNode[] = [
  // Phase 0 — Greek
  { id: 'greek', label: 'Greek Texts', sublabel: 'Aristotle · Euclid · Galen', x: 80, y: 300, color: 'hsl(43, 85%, 55%)', phase: 0 },
  // Phase 1 — Arabic translation
  { id: 'translation', label: 'Arabic Translation', sublabel: '10,000+ texts', x: 300, y: 300, color: 'hsl(170, 45%, 45%)', phase: 1 },
  // Phase 2 — Branches
  { id: 'algebra', label: 'Algebra', x: 520, y: 120, color: 'hsl(170, 55%, 40%)', phase: 2 },
  { id: 'optics', label: 'Optics', x: 520, y: 240, color: 'hsl(200, 50%, 45%)', phase: 2 },
  { id: 'medicine', label: 'Medicine', x: 520, y: 360, color: 'hsl(150, 45%, 40%)', phase: 2 },
  { id: 'crypto', label: 'Cryptanalysis', x: 520, y: 480, color: 'hsl(280, 40%, 45%)', phase: 2 },
  // Phase 3 — Europe
  { id: 'latin', label: 'Latin Translation', sublabel: 'Toledo · Palermo', x: 700, y: 220, color: 'hsl(215, 55%, 50%)', phase: 3 },
  { id: 'renaissance', label: 'Renaissance', sublabel: 'Europe transformed', x: 700, y: 400, color: 'hsl(215, 60%, 55%)', phase: 3 },
];

const EDGES: FlowEdge[] = [
  { from: 'greek', to: 'translation', phase: 1 },
  { from: 'translation', to: 'algebra', phase: 2 },
  { from: 'translation', to: 'optics', phase: 2 },
  { from: 'translation', to: 'medicine', phase: 2 },
  { from: 'translation', to: 'crypto', phase: 2 },
  { from: 'algebra', to: 'latin', phase: 3 },
  { from: 'optics', to: 'latin', phase: 3 },
  { from: 'medicine', to: 'renaissance', phase: 3 },
  { from: 'crypto', to: 'renaissance', phase: 3 },
];

interface KnowledgeFlowProps {
  activeStep: number;
  className?: string;
}

export const KnowledgeFlow = ({ activeStep, className }: KnowledgeFlowProps) => {
  const nodeMap = React.useMemo(() => {
    const m: Record<string, FlowNode> = {};
    NODES.forEach(n => { m[n.id] = n; });
    return m;
  }, []);

  const visibleNodes = NODES.filter(n => n.phase <= activeStep);
  const visibleEdges = EDGES.filter(e => e.phase <= activeStep);

  return (
    <div className={cn("w-full h-full flex items-center justify-center", className)}>
      <svg viewBox="0 0 800 600" className="w-full h-full max-w-4xl" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="flow-glow">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <marker id="flow-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="hsl(170, 40%, 40%)" opacity="0.5" />
          </marker>
        </defs>

        {/* Background gradient */}
        <rect width="800" height="600" fill="transparent" />

        {/* Edges with stroke-dasharray animation */}
        <AnimatePresence>
          {visibleEdges.map(edge => {
            const from = nodeMap[edge.from];
            const to = nodeMap[edge.to];
            if (!from || !to) return null;

            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const len = Math.sqrt(dx * dx + dy * dy);

            return (
              <motion.line
                key={`${edge.from}-${edge.to}`}
                x1={from.x} y1={from.y}
                x2={to.x} y2={to.y}
                stroke={to.color}
                strokeWidth="1.5"
                strokeOpacity="0.4"
                markerEnd="url(#flow-arrow)"
                strokeDasharray={len}
                initial={{ strokeDashoffset: len }}
                animate={{ strokeDashoffset: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            );
          })}
        </AnimatePresence>

        {/* Nodes */}
        <AnimatePresence>
          {visibleNodes.map((node, i) => (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Glow */}
              <circle cx={node.x} cy={node.y} r={node.sublabel ? 28 : 20} fill={node.color} opacity={0.1} filter="url(#flow-glow)" />
              {/* Dot */}
              <circle cx={node.x} cy={node.y} r={node.sublabel ? 8 : 5} fill={node.color} opacity={0.9} />
              <circle cx={node.x} cy={node.y} r={node.sublabel ? 8 : 5} fill="none" stroke={node.color} strokeWidth="1" opacity={0.3} />
              {/* Label */}
              <text x={node.x} y={node.y - (node.sublabel ? 18 : 14)} textAnchor="middle" fill={node.color} fontSize="11" fontFamily="'Cormorant Garamond', serif" fontWeight="700">
                {node.label}
              </text>
              {node.sublabel && (
                <text x={node.x} y={node.y + 22} textAnchor="middle" fill={node.color} fontSize="8" fontFamily="'Cormorant Garamond', serif" opacity="0.6">
                  {node.sublabel}
                </text>
              )}
            </motion.g>
          ))}
        </AnimatePresence>

        {/* Phase labels */}
        {[
          { label: 'SOURCES', x: 80, phase: 0 },
          { label: 'TRANSLATION', x: 300, phase: 1 },
          { label: 'INNOVATION', x: 520, phase: 2 },
          { label: 'TRANSMISSION', x: 700, phase: 3 },
        ].map(p => p.phase <= activeStep && (
          <motion.text
            key={p.label}
            x={p.x} y={40}
            textAnchor="middle"
            fill="hsl(170, 40%, 40%)"
            fontSize="9"
            fontFamily="'Cormorant Garamond', serif"
            letterSpacing="0.2em"
            opacity="0.35"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ duration: 0.8 }}
          >
            {p.label}
          </motion.text>
        ))}
      </svg>
    </div>
  );
};
