import React from 'react';
import { motion } from 'framer-motion';
import { BUDDHISM_SECTIONS } from '@/hooks/useBuddhismScrollSpy';
import { cn } from '@/lib/utils';

const SAFFRON = 'hsl(30, 65%, 45%)';

interface BuddhismProgressTimelineProps {
  activeSection: string;
  globalProgress: number;
}

export const BuddhismProgressTimeline = ({ activeSection, globalProgress }: BuddhismProgressTimelineProps) => {
  const activeIndex = BUDDHISM_SECTIONS.findIndex(s => s.id === activeSection);
  const currentSection = BUDDHISM_SECTIONS[activeIndex];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-0">
      <motion.div
        className="absolute -left-20 font-display text-sm whitespace-nowrap"
        style={{ top: `${(activeIndex / (BUDDHISM_SECTIONS.length - 1)) * 100}%`, color: SAFFRON }}
        layout
      >
        {currentSection?.year}
      </motion.div>

      <div className="flex flex-col items-center gap-1">
        {BUDDHISM_SECTIONS.map((section, i) => {
          const isActive = section.id === activeSection;
          const isPast = i < activeIndex;
          return (
            <button
              key={section.id}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative flex items-center"
              aria-label={section.label}
            >
              <span className={cn(
                "block rounded-full transition-all duration-500",
                isActive
                  ? "w-3 h-3 shadow-[0_0_12px_hsl(30,65%,45%,0.5)]"
                  : isPast
                  ? "w-2 h-2 opacity-50"
                  : "w-1.5 h-1.5 bg-muted-foreground/30"
              )} style={isActive || isPast ? { background: SAFFRON } : undefined} />
              <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap font-body" style={{ color: 'hsl(30, 65%, 45%, 0.7)' }}>
                {section.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-muted/20 -z-10">
        <motion.div
          className="w-full origin-top"
          style={{ height: `${globalProgress * 100}%`, background: 'hsl(30, 65%, 45%, 0.3)' }}
        />
      </div>
    </div>
  );
};
