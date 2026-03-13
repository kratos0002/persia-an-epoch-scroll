import React from 'react';
import { motion } from 'framer-motion';

const HERMIT = 'hsl(45, 70%, 50%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';

const TESTS = [
  { year: '2006', yield: 0.7, label: '< 1 kt', step: 0 },
  { year: '2009', yield: 4, label: '2-6 kt', step: 1 },
  { year: '2013', yield: 10, label: '6-16 kt', step: 1 },
  { year: '2016a', yield: 10, label: '~10 kt', step: 2 },
  { year: '2016b', yield: 20, label: '~20 kt', step: 2 },
  { year: '2017', yield: 250, label: '~250 kt', step: 3 },
];

const MAX_YIELD = 250;

interface Props {
  activeStep: number;
}

export const SeismographChart = ({ activeStep }: Props) => {
  const viewBoxW = 440;
  const viewBoxH = 320;
  const chartLeft = 50;
  const chartRight = 400;
  const chartTop = 30;
  const chartBottom = 250;
  const chartH = chartBottom - chartTop;

  const visibleTests = TESTS.filter(t => t.step <= activeStep);

  // Build seismograph path
  const buildPath = () => {
    if (visibleTests.length === 0) return '';
    const segWidth = (chartRight - chartLeft) / (TESTS.length);
    let d = `M ${chartLeft} ${chartBottom}`;

    TESTS.forEach((test, i) => {
      const x = chartLeft + (i + 0.5) * segWidth;
      const isVisible = test.step <= activeStep;

      if (isVisible) {
        // Spike up
        const spikeH = (test.yield / MAX_YIELD) * chartH * 0.9;
        const peakY = chartBottom - spikeH;
        // Sharp zigzag
        d += ` L ${x - 8} ${chartBottom}`;
        d += ` L ${x - 3} ${peakY + spikeH * 0.3}`;
        d += ` L ${x} ${peakY}`;
        d += ` L ${x + 3} ${peakY + spikeH * 0.3}`;
        d += ` L ${x + 8} ${chartBottom}`;
      } else {
        // Flat baseline noise
        d += ` L ${x} ${chartBottom}`;
      }
    });

    d += ` L ${chartRight} ${chartBottom}`;
    return d;
  };

  return (
    <div className="w-full h-full flex items-center justify-center px-2">
      <svg viewBox={`0 0 ${viewBoxW} ${viewBoxH}`} className="w-full max-w-[520px] h-auto">
        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map(pct => {
          const y = chartBottom - pct * chartH;
          return (
            <g key={pct}>
              <line x1={chartLeft} y1={y} x2={chartRight} y2={y} stroke={STEEL} strokeWidth={0.3} opacity={0.15} strokeDasharray="4 4" />
              <text x={chartLeft - 5} y={y + 3} textAnchor="end" fill={STEEL} fontSize={5} fontFamily="var(--font-body)" opacity={0.5}>
                {Math.round(pct * MAX_YIELD)} kt
              </text>
            </g>
          );
        })}

        {/* Baseline */}
        <line x1={chartLeft} y1={chartBottom} x2={chartRight} y2={chartBottom} stroke={STEEL} strokeWidth={0.5} opacity={0.3} />

        {/* Seismograph line */}
        <motion.path
          d={buildPath()}
          fill="none"
          stroke={HERMIT}
          strokeWidth={2}
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          key={activeStep}
        />

        {/* Glow behind large spikes */}
        <motion.path
          d={buildPath()}
          fill="none"
          stroke={HERMIT}
          strokeWidth={6}
          strokeLinejoin="round"
          opacity={0.15}
          filter="url(#seismo-blur)"
          key={`glow-${activeStep}`}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        {/* Year labels */}
        {TESTS.map((test, i) => {
          const segWidth = (chartRight - chartLeft) / TESTS.length;
          const x = chartLeft + (i + 0.5) * segWidth;
          const isVisible = test.step <= activeStep;
          const spikeH = (test.yield / MAX_YIELD) * chartH * 0.9;
          const peakY = chartBottom - spikeH;

          return (
            <motion.g
              key={`${test.year}-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0.2 }}
              transition={{ duration: 0.4 }}
            >
              <text
                x={x}
                y={chartBottom + 16}
                textAnchor="middle"
                fill={isVisible ? HERMIT : STEEL}
                fontSize={6}
                fontFamily="var(--font-body)"
                fontWeight={isVisible ? 600 : 400}
              >
                {test.year.replace(/[ab]$/, '')}
              </text>
              {isVisible && (
                <motion.text
                  x={x}
                  y={peakY - 8}
                  textAnchor="middle"
                  fill={LIGHT}
                  fontSize={5.5}
                  fontFamily="var(--font-body)"
                  fontWeight={600}
                  initial={{ opacity: 0, y: peakY }}
                  animate={{ opacity: 1, y: peakY - 8 }}
                  transition={{ delay: 0.5 }}
                >
                  {test.label}
                </motion.text>
              )}
            </motion.g>
          );
        })}

        {/* Title */}
        <text x={viewBoxW / 2} y={290} textAnchor="middle" fill={STEEL} fontSize={6} fontFamily="var(--font-body)" letterSpacing="0.15em">
          SEISMIC SIGNATURE OF NORTH KOREAN NUCLEAR TESTS
        </text>

        <defs>
          <filter id="seismo-blur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
