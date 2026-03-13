import React from 'react';
import { motion } from 'framer-motion';
import { NUTMEG_SECTIONS } from '@/hooks/useNutmegScrollSpy';
import { cn } from '@/lib/utils';

const SPICE = 'hsl(25, 75%, 45%)';
const SAFFRON = 'hsl(35, 90%, 55%)';

interface NutmegProgressTimelineProps {
  activeSection: string;
  globalProgress: number;
}

export const NutmegProgressTimeline = ({ activeSection, globalProgress }: NutmegProgressTimelineProps) => {
  const activeIndex = NUTMEG_SECTIONS.findIndex(s => s.id === activeSection);
  const current = NUTMEG_SECTIONS[activeIndex] || NUTMEG_SECTIONS[0];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-0" style={{ height: '45vh' }}>
      {/* Year label */}
      <motion.div
        className="absolute right-6 font-display text-xs font-bold whitespace-nowrap"
        style={{ color: SPICE }}
        animate={{ top: `${(activeIndex / Math.max(NUTMEG_SECTIONS.length - 1, 1)) * 100}%` }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        {current.year || '—'}
      </motion.div>

      {/* Dots */}
      <div className="flex flex-col items-center gap-3 h-full justify-between relative">
        {NUTMEG_SECTIONS.map((section, i) => {
          const isActive = section.id === activeSection;
          const isPast = i < activeIndex;

          return (
            <button
              key={section.id}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300 relative group',
                isActive ? 'scale-150' : isPast ? 'scale-100' : 'scale-75 opacity-40'
              )}
              style={{ background: isActive ? SPICE : isPast ? SAFFRON : 'rgba(255,255,255,0.25)' }}
              aria-label={section.label}
            >
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-body whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ color: 'rgba(255,255,255,0.7)' }}>
                {section.label}
              </span>
            </button>
          );
        })}

        {/* Progress line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            className="w-full origin-top"
            style={{
              height: `${globalProgress * 100}%`,
              background: `linear-gradient(180deg, ${SAFFRON}, ${SPICE})`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
