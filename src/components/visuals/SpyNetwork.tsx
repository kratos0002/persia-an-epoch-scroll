import React from 'react';
import { motion } from 'framer-motion';

const RED = 'hsl(0, 70%, 50%)';
const GEIGER = 'hsl(140, 70%, 45%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';

const SPIES = [
  { id: 'fuchs', name: 'Klaus Fuchs', x: 200, y: 120, role: 'Physicist', revealStep: 0 },
  { id: 'hall', name: 'Ted Hall', x: 200, y: 200, role: 'Youngest scientist', revealStep: 1 },
  { id: 'rosenbergs', name: 'Rosenbergs', x: 200, y: 280, role: 'Couriers', revealStep: 2 },
];

interface Props {
  activeStep: number;
}

export const SpyNetwork = ({ activeStep }: Props) => {
  // Step 0: Fuchs revealed
  // Step 1: Hall revealed
  // Step 2: Rosenbergs + full network
  // Step 3: Timeline compression visual

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 400 400" className="w-full max-w-[500px] h-auto">
        {/* Source: Los Alamos */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <rect x={20} y={160} width={80} height={80} rx={4} fill="none" stroke={GEIGER} strokeWidth={1.5} opacity={0.6} />
          <text x={60} y={195} textAnchor="middle" fill={GEIGER} fontSize={8} fontFamily="var(--font-body)" fontWeight={600}>
            LOS ALAMOS
          </text>
          <text x={60} y={210} textAnchor="middle" fill={STEEL} fontSize={6} fontFamily="var(--font-body)">
            Top Secret
          </text>

          {/* Document icon */}
          <rect x={48} y={218} width={24} height={16} rx={1} fill="none" stroke={GEIGER} strokeWidth={0.8} opacity={0.5} />
          <line x1={52} y1={224} x2={68} y2={224} stroke={GEIGER} strokeWidth={0.5} opacity={0.4} />
          <line x1={52} y1={228} x2={64} y2={228} stroke={GEIGER} strokeWidth={0.5} opacity={0.4} />
        </motion.g>

        {/* Destination: Moscow */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: activeStep >= 0 ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <rect x={300} y={160} width={80} height={80} rx={4} fill="none" stroke={RED} strokeWidth={1.5} opacity={0.6} />
          <text x={340} y={195} textAnchor="middle" fill={RED} fontSize={8} fontFamily="var(--font-body)" fontWeight={600}>
            MOSCOW
          </text>
          <text x={340} y={210} textAnchor="middle" fill={STEEL} fontSize={6} fontFamily="var(--font-body)">
            KB-11
          </text>

          {/* Star icon */}
          <motion.polygon
            points="340,220 342,226 348,226 343,230 345,236 340,232 335,236 337,230 332,226 338,226"
            fill={RED}
            opacity={0.5}
          />
        </motion.g>

        {/* Spy nodes */}
        {SPIES.map((spy, i) => (
          <motion.g
            key={spy.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: activeStep >= spy.revealStep ? 1 : 0,
              scale: activeStep >= spy.revealStep ? 1 : 0,
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Connection line from Los Alamos */}
            <motion.line
              x1={100}
              y1={200}
              x2={spy.x}
              y2={spy.y}
              stroke={GEIGER}
              strokeWidth={0.8}
              strokeDasharray="4 3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: activeStep >= spy.revealStep ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              opacity={0.4}
            />

            {/* Connection line to Moscow */}
            <motion.line
              x1={spy.x}
              y1={spy.y}
              x2={300}
              y2={200}
              stroke={RED}
              strokeWidth={0.8}
              strokeDasharray="4 3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: activeStep >= spy.revealStep ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              opacity={0.4}
            />

            {/* Spy node */}
            <circle cx={spy.x} cy={spy.y} r={16} fill="hsl(200, 25%, 10%)" stroke={LIGHT} strokeWidth={1} />

            {/* Pulse ring */}
            {activeStep === spy.revealStep && (
              <motion.circle
                cx={spy.x}
                cy={spy.y}
                r={16}
                fill="none"
                stroke={RED}
                strokeWidth={1.5}
                animate={{ r: [16, 30], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
            )}

            {/* Name label */}
            <text
              x={spy.x + 22}
              y={spy.y - 4}
              fill={LIGHT}
              fontSize={7}
              fontFamily="var(--font-body)"
              fontWeight={600}
            >
              {spy.name}
            </text>
            <text
              x={spy.x + 22}
              y={spy.y + 6}
              fill={STEEL}
              fontSize={5.5}
              fontFamily="var(--font-body)"
            >
              {spy.role}
            </text>
          </motion.g>
        ))}

        {/* Flowing document particles */}
        {activeStep >= 0 && SPIES.filter(s => activeStep >= s.revealStep).map((spy, si) => (
          [0, 1, 2].map(pi => (
            <motion.rect
              key={`doc-${spy.id}-${pi}`}
              width={4}
              height={3}
              rx={0.5}
              fill={pi % 2 === 0 ? GEIGER : RED}
              opacity={0.6}
              animate={{
                x: [100, spy.x, 300],
                y: [200, spy.y, 200],
              }}
              transition={{
                duration: 4,
                delay: pi * 1.3 + si * 0.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))
        ))}

        {/* Timeline compression (step 3) */}
        {activeStep >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Expected timeline */}
            <rect x={80} y={340} width={240} height={6} rx={3} fill="hsl(200, 15%, 15%)" />
            <text x={80} y={336} fill={STEEL} fontSize={6} fontFamily="var(--font-body)">
              Expected: ~10 years
            </text>
            <motion.rect
              x={80}
              y={340}
              height={6}
              rx={3}
              fill={STEEL}
              initial={{ width: 0 }}
              animate={{ width: 240 }}
              transition={{ duration: 1.5 }}
              opacity={0.3}
            />

            {/* Actual timeline */}
            <rect x={80} y={365} width={240} height={6} rx={3} fill="hsl(200, 15%, 15%)" />
            <text x={80} y={361} fill={RED} fontSize={6} fontFamily="var(--font-body)" fontWeight={600}>
              Actual: 4 years (espionage)
            </text>
            <motion.rect
              x={80}
              y={365}
              height={6}
              rx={3}
              fill={RED}
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.g>
        )}
      </svg>
    </div>
  );
};
