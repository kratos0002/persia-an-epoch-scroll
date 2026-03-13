import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * "Not Erasure — Absorption" visual.
 * A Sassanid territory outline dissolves while Persian city-nodes
 * persist, glow, and connect — showing cultural survival beneath
 * political conquest. Used for Islamic Conquest step 3.
 */

interface CityNode {
  name: string;
  role: string;
  x: number;
  y: number;
  /** Delay before this node lights up */
  delay: number;
}

const cities: CityNode[] = [
  { name: 'Baghdad', role: 'Administration', x: 340, y: 240, delay: 0.8 },
  { name: 'Isfahan', role: 'Architecture', x: 480, y: 260, delay: 1.4 },
  { name: 'Samarkand', role: 'Scholarship', x: 650, y: 160, delay: 2.0 },
  { name: 'Merv', role: 'Translation', x: 580, y: 195, delay: 1.7 },
  { name: 'Ctesiphon', role: 'Legacy', x: 370, y: 255, delay: 1.1 },
];

/** Connection lines between cities — Persian intellectual network */
const connections: [number, number][] = [
  [0, 4], // Baghdad ↔ Ctesiphon
  [0, 1], // Baghdad ↔ Isfahan
  [1, 3], // Isfahan ↔ Merv
  [3, 2], // Merv ↔ Samarkand
  [0, 3], // Baghdad ↔ Merv
];

/** Simplified Sassanid territory outline */
const sassanidPath =
  'M280,180 Q300,140 380,120 Q480,100 600,110 Q700,125 720,170 Q740,220 720,280 Q690,330 600,350 Q480,370 380,350 Q300,330 280,290 Q260,240 280,180 Z';

/** Islamic territory — slightly larger, shifted west */
const islamicPath =
  'M240,170 Q270,120 370,100 Q490,80 640,95 Q740,110 760,165 Q780,230 750,300 Q710,360 600,380 Q460,400 340,375 Q260,350 240,300 Q220,240 240,170 Z';

export const AbsorptionGraphic = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div
      ref={ref}
      className="relative h-full w-full flex items-center justify-center overflow-hidden"
      style={{ background: 'hsl(220, 18%, 8%)' }}
    >
      <svg
        viewBox="0 0 900 450"
        className="w-full max-w-[850px] max-h-[75vh]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="absorption-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="absorption-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(220, 15%, 11%)" />
            <stop offset="100%" stopColor="hsl(220, 18%, 8%)" />
          </radialGradient>
        </defs>

        <rect width="900" height="450" fill="url(#absorption-bg)" />

        {/* Sassanid territory — fading out */}
        <motion.path
          d={sassanidPath}
          fill="hsl(350, 25%, 15%)"
          fillOpacity={0.15}
          stroke="hsl(350, 30%, 35%)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          initial={{ opacity: 0.8 }}
          animate={inView ? { opacity: 0.12 } : {}}
          transition={{ duration: 3, delay: 0.5, ease: 'easeOut' }}
        />

        {/* Islamic territory — emerging */}
        <motion.path
          d={islamicPath}
          fill="hsl(160, 35%, 15%)"
          fillOpacity={0}
          stroke="hsl(160, 40%, 40%)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0, fillOpacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.6, fillOpacity: 0.08 } : {}}
          transition={{ duration: 2.5, delay: 1.5, ease: 'easeOut' }}
        />

        {/* Connection lines — Persian network lights up */}
        {connections.map(([a, b], i) => {
          const ca = cities[a];
          const cb = cities[b];
          return (
            <motion.line
              key={`conn-${i}`}
              x1={ca.x}
              y1={ca.y}
              x2={cb.x}
              y2={cb.y}
              stroke="hsl(160, 40%, 45%)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.25 } : {}}
              transition={{ duration: 1.2, delay: 2.5 + i * 0.3, ease: 'easeOut' }}
            />
          );
        })}

        {/* City nodes — persist and glow */}
        {cities.map((city, i) => (
          <g key={city.name}>
            {/* Glow ring */}
            <motion.circle
              cx={city.x}
              cy={city.y}
              r={16}
              fill="none"
              stroke="hsl(160, 45%, 50%)"
              strokeWidth="1"
              filter="url(#node-glow)"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 0.4, scale: 1 } : {}}
              transition={{ duration: 1, delay: city.delay + 1.5 }}
            />
            {/* Core dot */}
            <motion.circle
              cx={city.x}
              cy={city.y}
              r={5}
              fill="hsl(160, 50%, 55%)"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: city.delay + 1.5, type: 'spring' }}
            />
            {/* City name */}
            <motion.text
              x={city.x}
              y={city.y - 24}
              textAnchor="middle"
              fill="hsl(160, 40%, 60%)"
              fontSize="11"
              fontFamily="var(--font-display)"
              fontWeight="600"
              initial={{ opacity: 0, y: city.y - 18 }}
              animate={inView ? { opacity: 0.9, y: city.y - 24 } : {}}
              transition={{ duration: 0.8, delay: city.delay + 1.8 }}
            >
              {city.name}
            </motion.text>
            {/* Role label */}
            <motion.text
              x={city.x}
              y={city.y + 28}
              textAnchor="middle"
              fill="hsl(160, 30%, 45%)"
              fontSize="9"
              fontFamily="var(--font-body)"
              letterSpacing="0.12em"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.6 } : {}}
              transition={{ duration: 0.8, delay: city.delay + 2.2 }}
            >
              {city.role.toUpperCase()}
            </motion.text>
          </g>
        ))}

        {/* Pulse animation on Baghdad — the new center */}
        {inView && (
          <motion.circle
            cx={cities[0].x}
            cy={cities[0].y}
            r={5}
            fill="none"
            stroke="hsl(160, 50%, 55%)"
            strokeWidth="1.5"
            animate={{ r: [5, 28], opacity: [0.6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 4, ease: 'easeOut' }}
          />
        )}
      </svg>

      {/* Bottom caption */}
      <motion.p
        className="absolute bottom-[8%] left-0 right-0 text-center font-body text-xs tracking-[0.25em] uppercase text-foreground/40"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 4, duration: 1.5 }}
      >
        The empire fell — the civilization didn't
      </motion.p>
    </div>
  );
};
