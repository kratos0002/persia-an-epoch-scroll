import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const SPOKES = [
  'Right View',
  'Right Intention',
  'Right Speech',
  'Right Action',
  'Right Livelihood',
  'Right Effort',
  'Right Mindfulness',
  'Right Concentration',
];

const SAFFRON = 'hsl(30, 65%, 45%)';
const GOLD = 'hsl(43, 70%, 55%)';
const CX = 200;
const CY = 200;
const OUTER_R = 160;
const INNER_R = 30;

interface DharmaWheelProps {
  activeStep: number; // 0-7, how many spokes revealed
  className?: string;
}

export const DharmaWheel = ({ activeStep, className }: DharmaWheelProps) => {
  const rimProgress = Math.min(activeStep / 8, 1);
  const allRevealed = activeStep >= 8;
  const circumference = 2 * Math.PI * OUTER_R;

  return (
    <div className={cn('w-full h-full flex items-center justify-center', className)}>
      <svg viewBox="0 0 400 400" className="w-full h-full max-w-[400px] max-h-[400px]" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="wheel-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Outer rim */}
        <motion.circle
          cx={CX} cy={CY} r={OUTER_R}
          fill="none"
          stroke={SAFFRON}
          strokeWidth={2}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - rimProgress)}
          opacity={0.6}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Spokes */}
        {SPOKES.map((label, i) => {
          const angle = (i * Math.PI * 2) / 8 - Math.PI / 2;
          const x2 = CX + Math.cos(angle) * (OUTER_R - 10);
          const y2 = CY + Math.sin(angle) * (OUTER_R - 10);
          const x1 = CX + Math.cos(angle) * INNER_R;
          const y1 = CY + Math.sin(angle) * INNER_R;
          const labelR = OUTER_R + 18;
          const lx = CX + Math.cos(angle) * labelR;
          const ly = CY + Math.sin(angle) * labelR;
          const isVisible = i < activeStep;

          return (
            <g key={i}>
              <motion.line
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={SAFFRON}
                strokeWidth={2}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: isVisible ? 1 : 0, opacity: isVisible ? 0.8 : 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.text
                x={lx} y={ly}
                fill={SAFFRON}
                fontSize="9"
                fontFamily="'Playfair Display', Georgia, serif"
                textAnchor="middle"
                dominantBaseline="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 0.75 : 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {label}
              </motion.text>
              {/* Dot at end */}
              <motion.circle
                cx={x2} cy={y2} r={3}
                fill={GOLD}
                initial={{ scale: 0 }}
                animate={{ scale: isVisible ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              />
            </g>
          );
        })}

        {/* Center hub */}
        <motion.circle
          cx={CX} cy={CY} r={INNER_R}
          fill="none"
          stroke={GOLD}
          strokeWidth={2}
          opacity={0.5}
        />
        <motion.circle
          cx={CX} cy={CY} r={8}
          fill={GOLD}
          animate={{
            opacity: allRevealed ? [0.6, 1, 0.6] : 0.4,
            scale: allRevealed ? [1, 1.2, 1] : 1,
          }}
          transition={{ duration: 2, repeat: allRevealed ? Infinity : 0, ease: 'easeInOut' }}
          filter={allRevealed ? 'url(#wheel-glow)' : undefined}
        />
      </svg>
    </div>
  );
};
