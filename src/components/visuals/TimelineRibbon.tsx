import React from 'react';
import { motion } from 'framer-motion';
import { TIMELINE_EVENTS } from './indiaStatesData';

interface TimelineRibbonProps {
  activeSection: string;
  globalProgress: number;
}

export const TimelineRibbon: React.FC<TimelineRibbonProps> = ({ activeSection, globalProgress }) => {
  const minYear = 1947;
  const maxYear = 2024;
  const range = maxYear - minYear;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 hidden md:block">
      <div className="mx-auto max-w-5xl px-8 pb-4">
        <div className="relative h-10 bg-card/80 backdrop-blur-md rounded-t-lg border border-b-0 border-border/30 px-4">
          {/* Track */}
          <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-px bg-border/40" />

          {/* Fill */}
          <motion.div
            className="absolute left-4 top-1/2 -translate-y-1/2 h-px origin-left"
            style={{
              width: `${globalProgress * 100}%`,
              maxWidth: 'calc(100% - 32px)',
              background: 'hsl(40, 60%, 55%)',
            }}
          />

          {/* Events */}
          {TIMELINE_EVENTS.map((event) => {
            const pct = ((event.year - minYear) / range) * 100;
            const isActive = event.section === activeSection;
            return (
              <div
                key={event.year}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${4 + (pct / 100) * 92}%` }}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive ? 'scale-150' : 'scale-100'
                  }`}
                  style={{
                    background: isActive ? 'hsl(40, 60%, 55%)' : 'hsl(220, 15%, 35%)',
                    boxShadow: isActive ? '0 0 8px hsl(40, 60%, 55%)' : 'none',
                  }}
                />
                {isActive && (
                  <motion.div
                    className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-body font-semibold tracking-wide"
                    style={{ color: 'hsl(40, 30%, 80%)' }}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {event.year} — {event.label}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
