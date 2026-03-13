import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PAKISTAN_GREEN = 'hsl(150, 60%, 35%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';
const SAFFRON = 'hsl(25, 80%, 50%)';

const PROLIFERATION = [
  { name: 'Libya', angle: -30, distance: 110, status: 'Dismantled 2003' },
  { name: 'Iran', angle: 30, distance: 100, status: 'Threshold state' },
  { name: 'North Korea', angle: 80, distance: 120, status: 'Tested 2006' },
];

export const ResponseClock = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="w-full max-w-xl mx-auto my-16 space-y-12">
      {/* Countdown clock */}
      <svg viewBox="0 0 300 300" className="w-full max-w-[280px] h-auto mx-auto">
        {/* Clock face */}
        <circle cx={150} cy={150} r={120} fill="none" stroke={STEEL} strokeWidth={0.5} opacity={0.3} />
        <circle cx={150} cy={150} r={115} fill="none" stroke={STEEL} strokeWidth={0.3} opacity={0.15} />

        {/* Day markers (17 segments) */}
        {Array.from({ length: 17 }, (_, i) => {
          const angle = (i / 17) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const x1 = 150 + Math.cos(rad) * 108;
          const y1 = 150 + Math.sin(rad) * 108;
          const x2 = 150 + Math.cos(rad) * 120;
          const y2 = 150 + Math.sin(rad) * 120;
          const tx = 150 + Math.cos(rad) * 98;
          const ty = 150 + Math.sin(rad) * 98;

          return (
            <motion.g key={i}>
              <motion.line
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={PAKISTAN_GREEN}
                strokeWidth={1.5}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 0.6 } : {}}
                transition={{ delay: i * 0.08 }}
              />
              <motion.text
                x={tx} y={ty + 2}
                textAnchor="middle"
                fill={STEEL}
                fontSize={5}
                fontFamily="var(--font-body)"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 0.5 } : {}}
                transition={{ delay: i * 0.08 }}
              >
                {i + 1}
              </motion.text>
            </motion.g>
          );
        })}

        {/* Sweep hand */}
        <motion.line
          x1={150}
          y1={150}
          x2={150}
          y2={40}
          stroke={PAKISTAN_GREEN}
          strokeWidth={2}
          strokeLinecap="round"
          style={{ transformOrigin: '150px 150px' }}
          initial={{ rotate: 0, opacity: 0 }}
          animate={inView ? { rotate: 360, opacity: 1 } : {}}
          transition={{ duration: 3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Center dot */}
        <circle cx={150} cy={150} r={3} fill={PAKISTAN_GREEN} />

        {/* India test date */}
        <motion.text
          x={150} y={130}
          textAnchor="middle"
          fill={SAFFRON}
          fontSize={6}
          fontFamily="var(--font-body)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.7 } : {}}
          transition={{ delay: 0.3 }}
        >
          India tests: May 11
        </motion.text>

        {/* Pakistan response */}
        <motion.text
          x={150} y={170}
          textAnchor="middle"
          fill={PAKISTAN_GREEN}
          fontSize={6}
          fontFamily="var(--font-body)"
          fontWeight={600}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 3.5 }}
        >
          Pakistan responds: May 28
        </motion.text>

        {/* 17 days label */}
        <motion.text
          x={150} y={195}
          textAnchor="middle"
          fill={LIGHT}
          fontSize={22}
          fontFamily="var(--font-display)"
          fontWeight={900}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 3.8, duration: 0.5 }}
        >
          17 DAYS
        </motion.text>
      </svg>

      {/* Proliferation network */}
      <div>
        <p className="text-[9px] tracking-[0.3em] uppercase font-body text-center mb-4" style={{ color: STEEL }}>
          A.Q. Khan Proliferation Network
        </p>
        <svg viewBox="0 0 300 160" className="w-full max-w-[360px] h-auto mx-auto">
          {/* Pakistan center node */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 4.5 }}
          >
            <circle cx={150} cy={80} r={18} fill="hsl(200, 25%, 10%)" stroke={PAKISTAN_GREEN} strokeWidth={1.5} />
            <text x={150} y={78} textAnchor="middle" fill={PAKISTAN_GREEN} fontSize={5.5} fontFamily="var(--font-body)" fontWeight={600}>
              Pakistan
            </text>
            <text x={150} y={87} textAnchor="middle" fill={STEEL} fontSize={4.5} fontFamily="var(--font-body)">
              A.Q. Khan
            </text>
          </motion.g>

          {/* Target nations */}
          {PROLIFERATION.map((target, i) => {
            const rad = (target.angle * Math.PI) / 180;
            const tx = 150 + Math.cos(rad) * target.distance;
            const ty = 80 + Math.sin(rad) * target.distance * 0.6;

            return (
              <motion.g
                key={target.name}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 5 + i * 0.3 }}
              >
                {/* Connection line */}
                <motion.line
                  x1={150} y1={80}
                  x2={tx} y2={ty}
                  stroke={PAKISTAN_GREEN}
                  strokeWidth={0.8}
                  strokeDasharray="3 3"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1, delay: 5 + i * 0.3 }}
                  opacity={0.5}
                />

                {/* Target node */}
                <circle cx={tx} cy={ty} r={12} fill="hsl(200, 25%, 10%)" stroke={STEEL} strokeWidth={0.8} />
                <text x={tx} y={ty - 2} textAnchor="middle" fill={LIGHT} fontSize={5} fontFamily="var(--font-body)" fontWeight={600}>
                  {target.name}
                </text>
                <text x={tx} y={ty + 6} textAnchor="middle" fill={STEEL} fontSize={3.8} fontFamily="var(--font-body)">
                  {target.status}
                </text>

                {/* Flowing particle */}
                <motion.circle
                  r={1.5}
                  fill={PAKISTAN_GREEN}
                  animate={{
                    cx: [150, tx],
                    cy: [80, ty],
                  }}
                  transition={{
                    duration: 2,
                    delay: 5.5 + i * 0.3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  opacity={0.6}
                />
              </motion.g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
