import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const DestructionPit = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="mx-auto max-w-md">
      <p className="mb-3 text-center font-body text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-ledger-stain/40">
        ✦ Cross-Section — Humen Stone Pit ✦
      </p>
      <svg viewBox="0 0 400 250" className="w-full" style={{ fontFamily: "'Playfair Display', serif" }}>
        {/* Ground surface */}
        <motion.line
          x1="30" y1="80" x2="370" y2="80"
          stroke="hsl(var(--ledger-stain) / 0.4)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1 }}
        />
        <text x="200" y="70" textAnchor="middle" fill="hsl(var(--ledger-stain) / 0.4)" fontSize="8" letterSpacing="0.3em">GROUND LEVEL</text>

        {/* Pit walls */}
        <motion.path
          d="M 80 80 L 60 200 Q 200 230 340 200 L 320 80"
          fill="hsl(var(--ledger-stain) / 0.08)"
          stroke="hsl(var(--ledger-stain) / 0.3)"
          strokeWidth="1.5"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        />

        {/* Sea water level */}
        <motion.path
          d="M 70 140 Q 130 134 200 140 Q 270 146 330 140"
          fill="none"
          stroke="hsl(var(--ledger-silver) / 0.4)"
          strokeWidth="1"
          strokeDasharray="6 4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.6 } : {}}
          transition={{ delay: 1 }}
        />
        <text x="355" y="143" fill="hsl(var(--ledger-silver) / 0.5)" fontSize="7" fontStyle="italic">Sea water</text>

        {/* Opium dissolving — animated bubbles */}
        {inView && [
          { cx: 140, cy: 170, delay: 1.5 },
          { cx: 200, cy: 180, delay: 1.8 },
          { cx: 260, cy: 175, delay: 2.1 },
          { cx: 170, cy: 190, delay: 2.4 },
          { cx: 230, cy: 185, delay: 2.7 },
        ].map((b, i) => (
          <motion.circle
            key={i}
            cx={b.cx} cy={b.cy} r="4"
            fill="hsl(var(--ledger-resin) / 0.3)"
            initial={{ opacity: 0, r: 2 }}
            animate={{ opacity: [0, 0.6, 0], r: [2, 6, 8], cy: b.cy - 20 }}
            transition={{ delay: b.delay, duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        ))}

        {/* Labels */}
        <motion.g initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.5 }}>
          <text x="90" y="120" fill="hsl(var(--ledger-resin) / 0.6)" fontSize="7" fontWeight="600">Salt</text>
          <text x="280" y="120" fill="hsl(var(--ledger-resin) / 0.6)" fontSize="7" fontWeight="600">Quicklime</text>
          <text x="200" y="210" textAnchor="middle" fill="hsl(var(--ledger-resin))" fontSize="8" fontWeight="700">Opium dissolved</text>
        </motion.g>

        {/* Outflow to Pearl River */}
        <motion.g initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 2.5 }}>
          <path d="M 340 200 Q 360 210 380 215 L 400 220" fill="none" stroke="hsl(var(--ledger-silver) / 0.3)" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="385" y="235" fill="hsl(var(--ledger-silver) / 0.5)" fontSize="7" fontStyle="italic">→ Pearl River</text>
          <text x="385" y="245" fill="hsl(var(--ledger-silver) / 0.4)" fontSize="6">(at low tide)</text>
        </motion.g>
      </svg>
    </div>
  );
};
