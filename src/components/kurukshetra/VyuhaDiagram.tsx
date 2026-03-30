import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { VYUHA_SHAPES } from './kurukshetraData';
import { WarPhase } from './kurukshetraData';

interface VyuhaDiagramProps {
  name: string;
  side: 'kaurava' | 'pandava';
  phase: WarPhase;
  size?: number;
}

export const VyuhaDiagram = ({ name, side, phase, size = 120 }: VyuhaDiagramProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const shape = VYUHA_SHAPES[name];

  if (!shape) return null;

  const crack = phase === 1 ? 0 : phase === 2 ? 0.3 : phase === 3 ? 0.7 : 1;
  const strokeColor = side === 'pandava'
    ? 'hsl(var(--kuru-gold))'
    : 'hsl(var(--kuru-red))';

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 100 100" width={size} height={size} className="overflow-visible">
        {shape.paths.map((d, i) => {
          // Determine if it's a polygon, rect, line, or path
          const isLine = d.includes('L') && !d.includes('Q') && !d.includes('C') && d.split(' ').length === 2;
          return (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke={strokeColor}
              strokeWidth={0.8}
              strokeLinejoin="round"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? {
                pathLength: 1,
                opacity: 1 - crack * 0.3,
              } : {}}
              transition={{ duration: 1.2, delay: i * 0.15, ease: 'easeOut' }}
              style={{
                strokeDasharray: crack > 0.5 ? '6 3' : 'none',
                transform: crack > 0 ? `translate(${Math.sin(i * 7) * crack * 1.5}px, ${Math.cos(i * 11) * crack * 1.5}px)` : 'none',
              }}
            />
          );
        })}
      </svg>
      <div className="text-center">
        <span className="font-display text-xs tracking-[0.15em] uppercase" style={{ color: strokeColor }}>
          {shape.name}
        </span>
        <span className="block font-devanagari text-[10px] text-kuru-ash mt-0.5">{shape.sanskrit}</span>
      </div>
    </div>
  );
};
