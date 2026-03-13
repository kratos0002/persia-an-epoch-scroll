import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ERAS } from '@/data/eras';

interface EraWaypointProps {
  /** Index of the NEXT era the reader is about to enter (0-10) */
  activeIndex: number;
  /** Transition heading shown above the timeline */
  label: string;
  /** Optional year override (defaults to the active era's date) */
  year?: string;
  /** When true, shows all eras as completed (final transition to Epilogue) */
  isEpilogue?: boolean;
  className?: string;
}

export const EraWaypoint = ({
  activeIndex,
  label,
  year,
  isEpilogue = false,
  className,
}: EraWaypointProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  const activeEra = ERAS[Math.min(activeIndex, ERAS.length - 1)];
  const displayYear = year ?? activeEra.date;
  const fillPercent = isEpilogue
    ? 100
    : (activeIndex / (ERAS.length - 1)) * 100;

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex h-[60vh] items-center justify-center overflow-hidden',
        className,
      )}
    >
      {/* Subtle background wash */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, ${activeEra.color.replace(')', ', 0.08)')} 0%, transparent 70%)`,
        }}
      />

      <motion.div className="relative z-10 w-full text-center" style={{ opacity }}>
        {/* Year */}
        {displayYear && (
          <p
            className="mb-2 font-body text-xs tracking-[0.4em] uppercase"
            style={{ color: activeEra.color.replace(')', ', 0.7)') }}
          >
            {displayYear}
          </p>
        )}

        {/* Label */}
        <p
          className="font-display text-lg font-semibold md:text-xl"
          style={{ color: activeEra.color }}
        >
          {label}
        </p>

        {/* Compact timeline */}
        <div className="mx-auto mt-8 w-full max-w-md px-6">
          {/* Track */}
          <div className="relative flex items-center" style={{ height: 10 }}>
            {/* Background track */}
            <div
              className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
              style={{ background: 'hsl(43, 85%, 55%, 0.1)' }}
            />

            {/* Filled track */}
            <div
              className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full"
              style={{
                width: `${fillPercent}%`,
                background: `linear-gradient(90deg, ${ERAS[0].color} 0%, ${activeEra.color} 100%)`,
                boxShadow: `0 0 16px ${activeEra.color.replace(')', ', 0.25)')}`,
              }}
            />

            {/* Era dots */}
            <div className="relative flex w-full items-center justify-between">
              {ERAS.map((era, i) => {
                const isActive = !isEpilogue && i === activeIndex;
                const isCompleted = isEpilogue || i < activeIndex;

                return (
                  <div key={era.label} className="relative flex flex-col items-center">
                    {/* Dot */}
                    <div
                      className="rounded-full transition-all duration-500"
                      style={{
                        width: isActive ? 10 : isCompleted ? 6 : 4,
                        height: isActive ? 10 : isCompleted ? 6 : 4,
                        backgroundColor: isActive
                          ? era.color
                          : isCompleted
                            ? era.color.replace(')', ', 0.4)')
                            : 'rgba(255, 255, 255, 0.1)',
                        boxShadow: isActive
                          ? `0 0 12px ${era.color}, 0 0 4px ${era.color}`
                          : 'none',
                      }}
                    />

                    {/* Label for active dot only */}
                    {isActive && (
                      <span
                        className="absolute top-5 whitespace-nowrap font-display text-[11px] font-bold"
                        style={{ color: era.color }}
                      >
                        {era.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
