import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BrushTitleProps {
  text: string;
  className?: string;
  /** 0-1 progress override; if not given, uses self-scroll */
  progress?: number;
}

/**
 * SVG brush-stroke title that draws via stroke-dashoffset.
 * Uses a thick, hand-drawn look with the ink-paper palette.
 */
export const BrushTitle = ({ text, className, progress: externalProgress }: BrushTitleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'start 0.3'],
  });

  const drawProgress = externalProgress !== undefined
    ? externalProgress
    : undefined;

  // For the SVG text stroke animation
  const pathLength = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <svg
        viewBox={`0 0 ${text.length * 52} 80`}
        className="w-full max-w-4xl h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Shadow / filled text (visible after draw) */}
        <motion.text
          x="50%"
          y="55"
          textAnchor="middle"
          className="font-display"
          style={{
            fontSize: '60px',
            fontWeight: 900,
            fontStyle: 'italic',
            fill: 'hsl(25, 20%, 12%)',
            opacity: useTransform(scrollYProgress, [0.6, 1], [0, 1]),
          }}
        >
          {text}
        </motion.text>

        {/* Stroke-drawn text */}
        <motion.text
          x="50%"
          y="55"
          textAnchor="middle"
          className="font-display"
          style={{
            fontSize: '60px',
            fontWeight: 900,
            fontStyle: 'italic',
            fill: 'none',
            stroke: 'hsl(25, 20%, 12%)',
            strokeWidth: 1.5,
            strokeDasharray: 1,
            strokeDashoffset: drawProgress !== undefined ? 1 - drawProgress : pathLength,
          }}
          pathLength={1}
        >
          {text}
        </motion.text>
      </svg>
    </div>
  );
};
