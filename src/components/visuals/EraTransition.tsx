import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EraTransitionProps {
  fromColor: string; // HSL values like "43 85% 55%"
  toColor: string;
  label?: string;
  year?: string;
  className?: string;
}

export const EraTransition = ({ fromColor, toColor, label, year, className }: EraTransitionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  return (
    <div ref={ref} className={cn("relative h-[60vh] flex items-center justify-center overflow-hidden", className)}>
      {/* Gradient wash from one era to next */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, hsl(${fromColor} / 0.12) 0%, hsl(${toColor} / 0.25) 50%, hsl(${toColor} / 0.08) 100%)`,
        }}
      />

      {/* Horizontal line */}
      <motion.div
        className="absolute left-0 right-0 top-1/2 h-px"
        style={{
          opacity,
          background: `linear-gradient(90deg, transparent 0%, hsl(${toColor} / 0.7) 50%, transparent 100%)`,
        }}
      />

      {/* Year + label */}
      {(label || year) && (
        <motion.div className="relative z-10 text-center" style={{ opacity }}>
          {year && (
            <p
              className="text-xs tracking-[0.4em] uppercase mb-2 font-body"
              style={{ color: `hsl(${toColor} / 0.9)` }}
            >
              {year}
            </p>
          )}
          {label && (
            <p
              className="font-display text-lg md:text-xl font-semibold"
              style={{ color: `hsl(${toColor})` }}
            >
              {label}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};

/** Color definitions for each era */
export const ERA_COLORS = {
  achaemenid: "43 85% 55%",
  alexander: "270 40% 50%",
  parthian: "350 60% 45%",
  sassanid: "350 55% 40%",
  islamic: "160 45% 38%",
  goldenAge: "160 50% 35%",
  mongol: "25 70% 50%",
  safavid: "215 65% 45%",
  modern: "220 15% 50%",
  epilogue: "43 85% 55%",
} as const;
