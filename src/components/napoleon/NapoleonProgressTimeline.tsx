import React from 'react';
import { motion } from 'framer-motion';
import { NAPOLEON_SECTIONS } from '@/hooks/useNapoleonScrollSpy';
import { cn } from '@/lib/utils';

const BLUE = 'hsl(220, 65%, 45%)';
const GOLD = 'hsl(43, 70%, 50%)';
const RED = 'hsl(0, 65%, 48%)';

interface NapoleonProgressTimelineProps {
  activeSection: string;
  globalProgress: number;
}

function getPhaseColor(index: number): string {
  if (index <= 2) return BLUE;   // Revolution
  if (index <= 5) return GOLD;   // Empire
  return RED;                     // Fall
}

export const NapoleonProgressTimeline = ({ activeSection, globalProgress }: NapoleonProgressTimelineProps) => {
  const activeIndex = NAPOLEON_SECTIONS.findIndex(s => s.id === activeSection);
  const currentSection = NAPOLEON_SECTIONS[activeIndex];
  const phaseColor = getPhaseColor(activeIndex);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-0">
      <motion.div
        className="absolute -left-16 font-display text-sm whitespace-nowrap"
        style={{
          top: `${(activeIndex / (NAPOLEON_SECTIONS.length - 1)) * 100}%`,
          color: phaseColor,
        }}
        layout
      >
        {currentSection?.year}
      </motion.div>

      <div className="flex flex-col items-center gap-1">
        {NAPOLEON_SECTIONS.map((section, i) => {
          const isActive = section.id === activeSection;
          const isPast = i < activeIndex;
          const dotColor = getPhaseColor(i);
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
                    ? 'w-3 h-3 shadow-[0_0_12px_rgba(200,170,50,0.4)]'
                    : isPast
                    ? 'w-2 h-2'
                    : 'w-1.5 h-1.5'
                )}
                style={{
                  background: isActive ? phaseColor : isPast ? dotColor : 'hsl(220, 10%, 35%)',
                  opacity: isPast ? 0.7 : 1,
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
            background: `linear-gradient(to bottom, ${BLUE}, ${GOLD}, ${RED})`,
            opacity: 0.5,
          }}
        />
      </div>
    </div>
  );
};
