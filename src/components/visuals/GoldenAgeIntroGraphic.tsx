import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * "Persians lit the world" — constellation of knowledge visual.
 * Each city glows in a distinct Persian color: lapis, turquoise,
 * emerald, ruby, gold. Dark background = the Dark Ages.
 */

interface KnowledgeNode {
  city: string;
  x: number;
  y: number;
  /** Persian palette — each city its own jewel tone */
  color: { core: string; glow: string; text: string };
  delay: number;
}

const nodes: KnowledgeNode[] = [
  {
    city: 'Baghdad',
    x: 300,
    y: 225,
    delay: 0.5,
    color: {
      core: 'hsl(45, 85%, 62%)',   // Gold
      glow: 'hsl(45, 80%, 55%)',
      text: 'hsl(45, 70%, 72%)',
    },
  },
  {
    city: 'Isfahan',
    x: 450,
    y: 270,
    delay: 1.0,
    color: {
      core: 'hsl(340, 70%, 58%)',   // Ruby
      glow: 'hsl(340, 60%, 50%)',
      text: 'hsl(340, 55%, 72%)',
    },
  },
  {
    city: 'Nishapur',
    x: 570,
    y: 195,
    delay: 1.5,
    color: {
      core: 'hsl(175, 65%, 48%)',   // Turquoise
      glow: 'hsl(175, 55%, 42%)',
      text: 'hsl(175, 50%, 65%)',
    },
  },
  {
    city: 'Samarkand',
    x: 660,
    y: 150,
    delay: 1.8,
    color: {
      core: 'hsl(225, 70%, 60%)',   // Lapis
      glow: 'hsl(225, 60%, 52%)',
      text: 'hsl(225, 55%, 72%)',
    },
  },
  {
    city: 'Merv',
    x: 540,
    y: 245,
    delay: 1.3,
    color: {
      core: 'hsl(155, 60%, 45%)',   // Emerald
      glow: 'hsl(155, 50%, 38%)',
      text: 'hsl(155, 45%, 62%)',
    },
  },
];

/** Connecting arcs between cities */
const connections: [number, number][] = [
  [0, 1],
  [1, 4],
  [4, 2],
  [2, 3],
  [0, 4],
];

export const GoldenAgeIntroGraphic = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div
      ref={ref}
      className="relative h-full w-full flex items-center justify-center overflow-hidden"
      style={{ background: 'hsl(225, 22%, 7%)' }}
    >
      {/* Multi-color ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse at 33% 50%, hsl(45, 50%, 14%, 0.35) 0%, transparent 40%)',
            'radial-gradient(ellipse at 55% 55%, hsl(340, 40%, 12%, 0.25) 0%, transparent 35%)',
            'radial-gradient(ellipse at 70% 40%, hsl(225, 40%, 14%, 0.25) 0%, transparent 35%)',
          ].join(', '),
        }}
      />

      <svg
        viewBox="0 0 900 450"
        className="relative w-full max-w-[850px] max-h-[75vh]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Per-city glow filters with colored tint */}
          {nodes.map((node, i) => (
            <filter key={`filter-${i}`} id={`ga-glow-${i}`} x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
          <radialGradient id="ga-bg" cx="48%" cy="50%" r="55%">
            <stop offset="0%" stopColor="hsl(225, 18%, 10%)" />
            <stop offset="100%" stopColor="hsl(225, 22%, 7%)" />
          </radialGradient>
        </defs>

        <rect width="900" height="450" fill="url(#ga-bg)" />

        {/* Connection lines — gradient between city colors */}
        {connections.map(([a, b], i) => {
          const na = nodes[a];
          const nb = nodes[b];
          // Midpoint color blend
          return (
            <motion.line
              key={`conn-${i}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="hsl(220, 20%, 40%)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.25 } : {}}
              transition={{ duration: 1.5, delay: 2.2 + i * 0.25, ease: 'easeOut' }}
            />
          );
        })}

        {/* City nodes + discipline rays */}
        {nodes.map((node, ni) => (
          <g key={node.city}>
            {/* Large outer glow — colored */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={28}
              fill={node.color.glow}
              filter={`url(#ga-glow-${ni})`}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 0.35, scale: 1 } : {}}
              transition={{ duration: 1.4, delay: node.delay + 0.6, type: 'spring' }}
            />
            {/* Inner ring */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={10}
              fill="none"
              stroke={node.color.core}
              strokeWidth="1"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 0.5, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: node.delay + 0.8, type: 'spring' }}
            />
            {/* Core dot */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={5}
              fill={node.color.core}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: node.delay + 0.8, type: 'spring' }}
            />
            {/* City name */}
            <motion.text
              x={node.x}
              y={node.y - 20}
              textAnchor="middle"
              fill={node.color.text}
              fontSize="12"
              fontFamily="var(--font-display)"
              fontWeight="700"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: node.delay + 1.2 }}
            >
              {node.city}
            </motion.text>

            {/* Pulse ring — colored */}
            {inView && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={5}
                fill="none"
                stroke={node.color.core}
                strokeWidth="1.2"
                animate={{ r: [5, 40], opacity: [0.5, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: node.delay + 3 + ni * 0.6,
                  ease: 'easeOut',
                }}
              />
            )}
          </g>
        ))}
      </svg>

      {/* Bottom caption */}
      <motion.p
        className="absolute bottom-[8%] left-0 right-0 text-center font-body text-xs tracking-[0.25em] uppercase text-foreground/45"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 4.5, duration: 1.5 }}
      >
        Five cities — four centuries — the light of the world
      </motion.p>
    </div>
  );
};
