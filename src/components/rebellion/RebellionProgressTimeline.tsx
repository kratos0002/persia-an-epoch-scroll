import React from 'react';
import { motion } from 'framer-motion';
import { REBELLION_SECTIONS } from '@/hooks/useRebellionScrollSpy';
import { cn } from '@/lib/utils';

const WIRE = 'hsl(200, 60%, 55%)';
const AMBER = 'hsl(30, 85%, 50%)';

interface RebellionProgressTimelineProps {
  activeSection: string;
  globalProgress: number;
}

export const RebellionProgressTimeline = ({ activeSection, globalProgress }: RebellionProgressTimelineProps) => {
  const activeIndex = REBELLION_SECTIONS.findIndex(s => s.id === activeSection);
  const currentSection = REBELLION_SECTIONS[activeIndex];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-0">
      <motion.div
        className="absolute -left-16 font-display text-sm whitespace-nowrap"
        style={{
          top: `${(activeIndex / (REBELLION_SECTIONS.length - 1)) * 100}%`,
          color: AMBER,
        }}
        layout
      >
        {currentSection?.year}
      </motion.div>

      <div className="flex flex-col items-center gap-1">
        {REBELLION_SECTIONS.map((section, i) => {
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
                    ? 'w-3 h-3 shadow-[0_0_12px_rgba(230,130,20,0.4)]'
                    : isPast
                    ? 'w-2 h-2'
                    : 'w-1.5 h-1.5'
                )}
                style={{
                  background: isActive ? AMBER : isPast ? 'hsl(30, 60%, 45%)' : 'hsl(220, 10%, 35%)',
                }}
              />
              <span
                className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap font-body"
                style={{ color: 'hsl(220, 10%, 65%)' }}
              >
                {section.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px -z-10" style={{ background: 'hsl(220, 15%, 18%)' }}>
        <motion.div
          className="w-full origin-top"
          style={{
            height: `${globalProgress * 100}%`,
            background: `linear-gradient(to bottom, ${WIRE}, ${AMBER})`,
            opacity: 0.5,
          }}
        />
      </div>
    </div>
  );
};
