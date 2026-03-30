import React from 'react';
import { motion } from 'framer-motion';
import { DAY_JOURNAL } from './kurukshetraData';

interface DayNotchStripProps {
  activeSection: string;
  globalProgress: number;
}

/**
 * 18-day cosmic clock fixed to the left edge.
 * Notches fill red as the reader scrolls. Cracks after Day 13.
 */
export const DayNotchStrip = ({ activeSection, globalProgress }: DayNotchStripProps) => {
  // Determine which "day" we're roughly at based on scroll progress
  // The day sections span roughly 30-70% of the page
  const dayProgress = Math.max(0, Math.min(1, (globalProgress - 0.15) / 0.55));
  const currentDay = Math.ceil(dayProgress * 18);

  return (
    <div className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 lg:flex flex-col items-center">
      {/* Vertical bar with notches */}
      <div className="relative flex flex-col gap-[3px]">
        {DAY_JOURNAL.map((entry) => {
          const isPast = entry.day <= currentDay;
          const isCracked = entry.day >= 13;
          const isActive = entry.day === currentDay;

          return (
            <div key={entry.day} className="relative flex items-center gap-1.5">
              {/* Day label on hover */}
              <div className="group flex items-center">
                <motion.div
                  className="relative"
                  style={{
                    width: isActive ? 18 : 10,
                    height: isActive ? 5 : 3,
                  }}
                  layout
                >
                  <div
                    className="w-full h-full rounded-[1px] transition-colors duration-500"
                    style={{
                      background: isPast
                        ? 'hsl(var(--kuru-red))'
                        : 'hsl(var(--kuru-bronze) / 0.3)',
                      boxShadow: isActive ? '0 0 8px hsl(var(--kuru-red) / 0.6)' : 'none',
                    }}
                  />
                  {/* Crack line after Day 13 */}
                  {isCracked && isPast && (
                    <div className="absolute -right-0.5 top-1/2 w-2 h-[1px] -translate-y-1/2 bg-kuru-red/40 rotate-[30deg]" />
                  )}
                </motion.div>
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-display tracking-wider text-kuru-kohl/60 whitespace-nowrap">
                  Day {entry.day}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active day label */}
      {currentDay > 0 && currentDay <= 18 && (
        <motion.div
          className="mt-2 font-display text-[10px] tracking-[0.25em] uppercase text-kuru-red/70"
          key={currentDay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Day {currentDay}
        </motion.div>
      )}
    </div>
  );
};
