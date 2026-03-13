import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SAFFRON = 'hsl(25, 80%, 50%)';
const SAND = 'hsl(35, 40%, 65%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';

export const SeismicPulse = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="w-full max-w-xl mx-auto my-16">
      <svg viewBox="0 0 400 260" className="w-full h-auto">
        {/* Desert surface */}
        <motion.path
          d="M0,120 Q50,115 100,118 Q150,122 200,116 Q250,120 300,117 Q350,121 400,118"
          fill="none"
          stroke={SAND}
          strokeWidth={1.5}
          opacity={0.6}
        />

        {/* Surface label */}
        <text x={10} y={112} fill={SAND} fontSize={6} fontFamily="var(--font-body)" opacity={0.7}>
          Thar Desert — Pokhran
        </text>

        {/* Underground layers */}
        {[140, 160, 180].map((y, i) => (
          <line key={y} x1={0} y1={y} x2={400} y2={y} stroke={STEEL} strokeWidth={0.3} opacity={0.15} strokeDasharray="6 4" />
        ))}

        {/* Detonation point — 1974 */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {/* Blast cavity */}
          <motion.circle
            cx={150}
            cy={170}
            fill={SAFFRON}
            initial={{ r: 0 }}
            animate={inView ? { r: 8 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
          />
          <motion.circle
            cx={150}
            cy={170}
            fill="hsl(45, 100%, 85%)"
            initial={{ r: 0 }}
            animate={inView ? { r: 3 } : {}}
            transition={{ duration: 0.3, delay: 1 }}
          />

          {/* Seismic waves */}
          {[0, 1, 2, 3, 4].map(i => (
            <motion.circle
              key={`wave1-${i}`}
              cx={150}
              cy={170}
              fill="none"
              stroke={SAFFRON}
              strokeWidth={0.8}
              initial={{ r: 8, opacity: 0 }}
              animate={inView ? { r: [8, 60 + i * 20], opacity: [0.5, 0] } : {}}
              transition={{ duration: 3, delay: 1.2 + i * 0.3, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}

          {/* Label */}
          <motion.text
            x={150}
            y={210}
            textAnchor="middle"
            fill={SAFFRON}
            fontSize={7}
            fontFamily="var(--font-body)"
            fontWeight={600}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
          >
            Smiling Buddha · 12 kt
          </motion.text>
          <motion.text
            x={150}
            y={222}
            textAnchor="middle"
            fill={STEEL}
            fontSize={5.5}
            fontFamily="var(--font-body)"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.7 }}
          >
            May 18, 1974
          </motion.text>
        </motion.g>

        {/* Detonation point — 1998 */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 2.5 }}
        >
          <motion.circle
            cx={280}
            cy={165}
            fill={SAFFRON}
            initial={{ r: 0 }}
            animate={inView ? { r: 12 } : {}}
            transition={{ duration: 0.5, delay: 3 }}
          />
          <motion.circle
            cx={280}
            cy={165}
            fill="hsl(45, 100%, 85%)"
            initial={{ r: 0 }}
            animate={inView ? { r: 5 } : {}}
            transition={{ duration: 0.3, delay: 3.2 }}
          />

          {/* Seismic waves — larger */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <motion.circle
              key={`wave2-${i}`}
              cx={280}
              cy={165}
              fill="none"
              stroke={SAFFRON}
              strokeWidth={1}
              initial={{ r: 12, opacity: 0 }}
              animate={inView ? { r: [12, 80 + i * 20], opacity: [0.6, 0] } : {}}
              transition={{ duration: 3.5, delay: 3.5 + i * 0.25, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}

          {/* Label */}
          <motion.text
            x={280}
            y={210}
            textAnchor="middle"
            fill={SAFFRON}
            fontSize={7}
            fontFamily="var(--font-body)"
            fontWeight={600}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 3.5 }}
          >
            Operation Shakti · 5 tests
          </motion.text>
          <motion.text
            x={280}
            y={222}
            textAnchor="middle"
            fill={STEEL}
            fontSize={5.5}
            fontFamily="var(--font-body)"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 3.7 }}
          >
            May 11–13, 1998
          </motion.text>
        </motion.g>

        {/* Timeline connector */}
        <motion.line
          x1={150}
          y1={230}
          x2={280}
          y2={230}
          stroke={STEEL}
          strokeWidth={0.5}
          strokeDasharray="3 3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.4 } : {}}
          transition={{ delay: 4 }}
        />
        <motion.text
          x={215}
          y={245}
          textAnchor="middle"
          fill={STEEL}
          fontSize={6}
          fontFamily="var(--font-body)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.6 } : {}}
          transition={{ delay: 4.2 }}
        >
          24 years between tests
        </motion.text>
      </svg>
    </div>
  );
};
