import React from 'react';
import { motion } from 'framer-motion';
import { BATTUTA_SECTIONS } from '@/hooks/useBattutaScrollSpy';
import { IB } from '@/components/visuals/battutaMapData';
import { cn } from '@/lib/utils';

interface BattutaProgressTimelineProps {
  activeSection: string;
  globalProgress: number;
}

export const BattutaProgressTimeline = ({ activeSection, globalProgress }: BattutaProgressTimelineProps) => {
  const activeIndex = BATTUTA_SECTIONS.findIndex(s => s.id === activeSection);
  const current = BATTUTA_SECTIONS[activeIndex] || BATTUTA_SECTIONS[0];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-0">
      {/* Year label */}
      {current.year && (
        <motion.div
          className="absolute -left-16 font-display text-sm whitespace-nowrap font-semibold"
          style={{ top: `${(activeIndex / (BATTUTA_SECTIONS.length - 1)) * 100}%`, color: IB.SAFFRON }}
          layout
          key={current.year}
        >
          {current.year}
        </motion.div>
      )}

      <div className="flex flex-col items-center gap-1">
        {BATTUTA_SECTIONS.map((section, i) => {
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
                  ? "w-3 h-3"
                  : isPast
                  ? "w-2 h-2 opacity-50"
                  : "w-1.5 h-1.5"
              )} style={{
                background: isActive ? IB.SAFFRON : isPast ? IB.SAFFRON : 'hsl(30, 15%, 60%)',
                boxShadow: isActive ? `0 0 12px ${IB.SAFFRON}80` : 'none',
              }} />
              <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap font-body"
                style={{ color: IB.SAFFRON_DIM }}>
                {section.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px -z-10" style={{ background: `${IB.SAND}30` }}>
        <motion.div
          className="w-full origin-top"
          style={{ height: `${globalProgress * 100}%`, background: `linear-gradient(to bottom, ${IB.SAFFRON}, ${IB.HENNA})` }}
        />
      </div>
    </div>
  );
};
