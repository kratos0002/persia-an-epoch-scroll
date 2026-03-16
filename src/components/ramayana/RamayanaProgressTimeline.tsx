import React from 'react';
import { motion } from 'framer-motion';
import { RAMAYANA_SECTIONS } from '@/hooks/useRamayanaScrollSpy';
import { RM } from '@/components/visuals/ramayanaMapData';

interface RamayanaProgressTimelineProps {
  activeSection: string;
  globalProgress: number;
}

export const RamayanaProgressTimeline = ({ activeSection, globalProgress }: RamayanaProgressTimelineProps) => {
  const activeIndex = RAMAYANA_SECTIONS.findIndex(s => s.id === activeSection);
  let lastPhase = '';

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-0" style={{ height: '55vh' }}>
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
                  style={{ color: RM.VERMILLION, opacity: isActive ? 0.8 : 0.35 }}
                >
                  {section.phase}
                </span>
              )}
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: isActive ? 8 : 4,
                  height: isActive ? 8 : 4,
                  background: isActive ? RM.VERMILLION : isPast ? RM.OCHRE : RM.PARCHMENT_DK,
                  opacity: isActive ? 1 : isPast ? 0.6 : 0.3,
                  boxShadow: isActive ? `0 0 8px ${RM.VERMILLION}` : 'none',
                  border: isActive ? `1px solid ${RM.GOLD_LEAF}` : 'none',
                }}
              />
              <span
                className="absolute right-5 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-body whitespace-nowrap pointer-events-none"
                style={{ color: RM.INK }}
              >
                {section.label}
              </span>
            </button>
          );
        })}

        {/* Progress line */}
        <div className="absolute left-1/2 -translate-x-1/2 w-px top-0 bottom-0 pointer-events-none -z-10" style={{ background: RM.PARCHMENT_DK }}>
          <motion.div
            className="w-full origin-top"
            style={{
              height: `${globalProgress * 100}%`,
              background: `linear-gradient(to bottom, ${RM.VERMILLION}, ${RM.GOLD_LEAF})`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
