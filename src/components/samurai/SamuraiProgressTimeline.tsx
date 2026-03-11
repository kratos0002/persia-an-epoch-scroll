import React from 'react';
import { motion } from 'framer-motion';
import { SAMURAI_SECTIONS } from '@/hooks/useSamuraiScrollSpy';
import { cn } from '@/lib/utils';

interface SamuraiProgressTimelineProps {
  activeSection: string;
  globalProgress: number;
}

const VERMILLION = 'hsl(5, 75%, 50%)';
const INK = 'hsl(25, 20%, 12%)';
const FADED = 'hsl(30, 10%, 60%)';

export const SamuraiProgressTimeline = ({ activeSection, globalProgress }: SamuraiProgressTimelineProps) => {
  const activeIndex = SAMURAI_SECTIONS.findIndex(s => s.id === activeSection);
  const currentSection = SAMURAI_SECTIONS[activeIndex];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-0">
      {/* Year label */}
      <motion.div
        className="absolute -left-16 font-display text-sm whitespace-nowrap"
        style={{
          top: `${(activeIndex / (SAMURAI_SECTIONS.length - 1)) * 100}%`,
          color: VERMILLION,
        }}
        layout
      >
        {currentSection?.year}
      </motion.div>

      {/* Dots */}
      <div className="flex flex-col items-center gap-1">
        {SAMURAI_SECTIONS.map((section, i) => {
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
                    ? 'w-3 h-3 shadow-[0_0_12px_rgba(200,50,50,0.4)]'
                    : isPast
                    ? 'w-2 h-2'
                    : 'w-1.5 h-1.5'
                )}
                style={{
                  background: isActive ? VERMILLION : isPast ? 'hsl(5, 60%, 60%)' : 'hsl(30, 10%, 75%)',
                }}
              />
              <span
                className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap font-body"
                style={{ color: INK }}
              >
                {section.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Progress line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px -z-10" style={{ background: 'hsl(30, 15%, 85%)' }}>
        <motion.div
          className="w-full origin-top"
          style={{
            height: `${globalProgress * 100}%`,
            background: 'hsl(5, 60%, 70%)',
          }}
        />
      </div>
    </div>
  );
};
