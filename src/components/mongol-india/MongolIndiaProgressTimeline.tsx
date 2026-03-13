import React from 'react';
import { motion } from 'framer-motion';
import { MONGOL_INDIA_SECTIONS } from '@/hooks/useMongolIndiaScrollSpy';
import { cn } from '@/lib/utils';

const BURNT = 'hsl(15, 75%, 50%)';
const MONGOL_ORANGE = 'hsl(25, 70%, 50%)';

interface Props {
  activeSection: string;
  globalProgress: number;
}

export const MongolIndiaProgressTimeline = ({ activeSection, globalProgress }: Props) => {
  const activeIndex = MONGOL_INDIA_SECTIONS.findIndex(s => s.id === activeSection);
  const current = MONGOL_INDIA_SECTIONS[activeIndex];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-0">
      <motion.div
        className="absolute -left-20 font-display text-sm whitespace-nowrap"
        style={{
          top: `${(activeIndex / (MONGOL_INDIA_SECTIONS.length - 1)) * 100}%`,
          color: BURNT,
          opacity: 0.7,
        }}
        layout
      >
        {current?.year}
      </motion.div>

      <div className="flex flex-col items-center gap-1">
        {MONGOL_INDIA_SECTIONS.map((section, i) => {
          const isActive = section.id === activeSection;
          const isPast = i < activeIndex;
          return (
            <button
              key={section.id}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative flex items-center"
              aria-label={section.label}
            >
              <span
                className={cn(
                  'block rounded-full transition-all duration-500',
                  isActive
                    ? 'w-3 h-3 shadow-[0_0_12px_rgba(204,85,34,0.5)]'
                    : isPast
                    ? 'w-2 h-2 opacity-50'
                    : 'w-1.5 h-1.5 opacity-30'
                )}
                style={{
                  background: isActive ? BURNT : isPast ? BURNT : 'hsl(220, 10%, 55%)',
                }}
              />
              <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap font-body"
                style={{ color: 'hsl(40, 25%, 70%)' }}
              >
                {section.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px -z-10" style={{ background: 'hsl(220, 15%, 20%)' }}>
        <motion.div
          className="w-full origin-top"
          style={{
            height: `${globalProgress * 100}%`,
            background: `linear-gradient(to bottom, ${MONGOL_ORANGE}, ${BURNT})`,
          }}
        />
      </div>
    </div>
  );
};
