import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AstraInfo } from './kurukshetraData';

interface AstraBurstProps {
  astra: AstraInfo;
}

/** Radial mandala burst for each celestial weapon */
export const AstraBurst = ({ astra }: AstraBurstProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const cx = 50, cy = 50;
  const petals: React.ReactNode[] = [];

  for (let i = 0; i < astra.petalCount; i++) {
    const angle = (i / astra.petalCount) * 360;
    const rad = (angle * Math.PI) / 180;
    const innerR = 8;
    const outerR = 35;
    const spread = (Math.PI / astra.petalCount) * 0.8;

    const tip = { x: cx + Math.cos(rad) * outerR, y: cy + Math.sin(rad) * outerR };
    const left = { x: cx + Math.cos(rad - spread) * innerR, y: cy + Math.sin(rad - spread) * innerR };
    const right = { x: cx + Math.cos(rad + spread) * innerR, y: cy + Math.sin(rad + spread) * innerR };

    petals.push(
      <motion.path
        key={i}
        d={`M${cx},${cy} L${left.x},${left.y} Q${tip.x * 0.8 + cx * 0.2},${tip.y * 0.8 + cy * 0.2} ${tip.x},${tip.y} Q${tip.x * 0.8 + cx * 0.2},${tip.y * 0.8 + cy * 0.2} ${right.x},${right.y} Z`}
        fill={`hsl(${astra.color} / 0.08)`}
        stroke={`hsl(${astra.color})`}
        strokeWidth={0.3}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: i * 0.03, ease: 'easeOut' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
    );
  }

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg viewBox="0 0 100 100" width={140} height={140} className="overflow-visible">
          {petals}
          <motion.circle
            cx={cx} cy={cy} r={3}
            fill={`hsl(${astra.color})`}
            initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.5, type: 'spring' }}
          />
        </svg>
        {/* Pulsing glow */}
        {inView && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: `radial-gradient(circle, hsl(${astra.color} / 0.15), transparent 60%)` }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
        )}
      </div>
      <div className="text-center max-w-[160px]">
        <h4 className="font-display text-sm tracking-[0.1em] text-kuru-gold">{astra.name}</h4>
        <span className="font-devanagari text-xs text-kuru-ash block">{astra.sanskrit}</span>
        <span className="font-body text-[11px] text-kuru-kohl/60 block mt-1">{astra.deity}</span>
        <p className="font-body text-[11px] text-kuru-kohl/50 mt-1 leading-snug">{astra.effect}</p>
      </div>
    </div>
  );
};
