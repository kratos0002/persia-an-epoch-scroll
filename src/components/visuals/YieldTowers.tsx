import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';

const TESTS = [
  { nation: 'USA', name: 'Trinity', yield: 21, year: '1945', color: 'hsl(140, 70%, 45%)' },
  { nation: 'USSR', name: 'RDS-1', yield: 22, year: '1949', color: 'hsl(0, 70%, 50%)' },
  { nation: 'UK', name: 'Hurricane', yield: 25, year: '1952', color: 'hsl(210, 50%, 40%)' },
  { nation: 'France', name: 'Gerboise Bleue', yield: 70, year: '1960', color: 'hsl(220, 60%, 50%)' },
];

const MAX_YIELD = 70;
const MAX_HEIGHT = 200;

export const YieldTowers = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="w-full max-w-xl mx-auto my-16">
      <p className="text-[9px] tracking-[0.3em] uppercase font-body text-center mb-6" style={{ color: STEEL }}>
        First Test Yields — Kilotons
      </p>
      <svg viewBox="0 0 360 280" className="w-full h-auto">
        {TESTS.map((test, i) => {
          const barHeight = (test.yield / MAX_YIELD) * MAX_HEIGHT;
          const x = 40 + i * 80;
          const y = 240 - barHeight;
          const isFrance = test.nation === 'France';

          return (
            <motion.g key={test.nation}>
              {/* Mushroom cloud shape */}
              <motion.g
                initial={{ opacity: 0, scaleY: 0 }}
                animate={inView ? { opacity: 1, scaleY: 1 } : {}}
                transition={{ duration: 1.2, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: `${x + 25}px 240px` }}
              >
                {/* Stem */}
                <rect
                  x={x + 18}
                  y={y + 20}
                  width={14}
                  height={barHeight - 20}
                  fill={test.color}
                  opacity={isFrance ? 0.9 : 0.5}
                  rx={2}
                />
                {/* Cloud head */}
                <ellipse
                  cx={x + 25}
                  cy={y + 12}
                  rx={22}
                  ry={14}
                  fill={test.color}
                  opacity={isFrance ? 0.7 : 0.35}
                />
                <ellipse
                  cx={x + 25}
                  cy={y + 6}
                  rx={16}
                  ry={10}
                  fill={test.color}
                  opacity={isFrance ? 0.5 : 0.2}
                />

                {/* France glow */}
                {isFrance && (
                  <motion.ellipse
                    cx={x + 25}
                    cy={y + 12}
                    rx={28}
                    ry={18}
                    fill="none"
                    stroke={test.color}
                    strokeWidth={1.5}
                    animate={{ opacity: [0.4, 0.1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.g>

              {/* Yield label */}
              <motion.text
                x={x + 25}
                y={y - 4}
                textAnchor="middle"
                fill={isFrance ? LIGHT : STEEL}
                fontSize={isFrance ? 11 : 9}
                fontFamily="var(--font-display)"
                fontWeight={700}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 + i * 0.2 }}
              >
                {test.yield} kt
              </motion.text>

              {/* Nation + name */}
              <text
                x={x + 25}
                y={254}
                textAnchor="middle"
                fill={test.color}
                fontSize={7}
                fontFamily="var(--font-body)"
                fontWeight={600}
              >
                {test.nation}
              </text>
              <text
                x={x + 25}
                y={264}
                textAnchor="middle"
                fill={STEEL}
                fontSize={5.5}
                fontFamily="var(--font-body)"
              >
                {test.name} · {test.year}
              </text>
            </motion.g>
          );
        })}

        {/* Baseline */}
        <line x1={30} y1={240} x2={330} y2={240} stroke={STEEL} strokeWidth={0.5} opacity={0.3} />
      </svg>
    </div>
  );
};
