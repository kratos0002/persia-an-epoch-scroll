import React from 'react';
import { motion } from 'framer-motion';
import { RAMAYANA_SECTIONS } from '@/hooks/useRamayanaScrollSpy';
import { RM, PHASES } from '@/components/visuals/ramayanaMapData';

interface RamayanaProgressTimelineProps {
  activeSection: string;
  globalProgress: number;
}

export const RamayanaProgressTimeline = ({ activeSection, globalProgress }: RamayanaProgressTimelineProps) => {
  const activeIndex = RAMAYANA_SECTIONS.findIndex(s => s.id === activeSection);

  // Group sections by phase
  let lastPhase = '';

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-0" style={{ height: '55vh' }}>
      {/* Phase labels + dots */}
      <div className="flex flex-col items-center h-full relative">
        {RAMAYANA_SECTIONS.map((section, i) => {
          const isActive = section.id === activeSection;
          const isPast = i < activeIndex;
          const showPhase = section.phase && section.phase !== lastPhase;
          if (section.phase) lastPhase = section.phase;

          return (
            <button
              key={section.id}
              className="group relative flex items-center justify-center"
              style={{ flex: 1 }}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
            >
              {showPhase && (
                <span
                  className="absolute -left-3 text-[7px] tracking-[0.1em] uppercase font-body font-semibold whitespace-nowrap origin-bottom-left -rotate-90"
                  style={{ color: RM.SAFFRON, opacity: isActive ? 0.7 : 0.3 }}
                >
                  {section.phase}
                </span>
              )}
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: isActive ? 8 : 4,
                  height: isActive ? 8 : 4,
                  background: isActive ? RM.SAFFRON : isPast ? RM.SAFFRON : 'hsl(215, 20%, 25%)',
                  opacity: isActive ? 1 : isPast ? 0.4 : 0.2,
                  boxShadow: isActive ? `0 0 8px ${RM.SAFFRON}` : 'none',
                }}
              />
              <span
                className="absolute right-5 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-body whitespace-nowrap pointer-events-none"
                style={{ color: RM.SANDSTONE }}
              >
                {section.label}
              </span>
            </button>
          );
        })}

        {/* Progress line */}
        <div className="absolute left-1/2 -translate-x-1/2 w-px top-0 bottom-0 pointer-events-none -z-10" style={{ background: 'hsl(215, 20%, 16%)' }}>
          <motion.div
            className="w-full origin-top"
            style={{
              height: `${globalProgress * 100}%`,
              background: `linear-gradient(to bottom, ${RM.SAFFRON}, ${RM.GOLD})`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
