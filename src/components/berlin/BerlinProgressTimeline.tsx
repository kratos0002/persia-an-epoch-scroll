import React from 'react';
import { motion } from 'framer-motion';
import { BERLIN_SECTIONS } from '@/hooks/useBerlinScrollSpy';
import { BL } from '@/components/visuals/berlinMapData';
import { cn } from '@/lib/utils';

interface BerlinProgressTimelineProps {
  activeSection: string;
  globalProgress: number;
}

/* ── Empty Chair SVG (recurring motif) ─────────────── */
const EmptyChairIcon = ({ size = 14, color = BL.RED_WAX }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M6 20V14M18 20V14" />
    <path d="M5 14h14" />
    <path d="M6 14V8a1 1 0 011-1h10a1 1 0 011 1v6" />
    <path d="M8 7V5" />
    <path d="M16 7V5" />
  </svg>
);

export const BerlinProgressTimeline = ({ activeSection, globalProgress }: BerlinProgressTimelineProps) => {
  const activeIndex = BERLIN_SECTIONS.findIndex(s => s.id === activeSection);
  const currentSection = BERLIN_SECTIONS[activeIndex];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-0">
      <motion.div
        className="absolute -left-16 font-display text-sm whitespace-nowrap"
        style={{
          top: `${(activeIndex / (BERLIN_SECTIONS.length - 1)) * 100}%`,
          color: BL.RED_WAX,
        }}
        layout
      >
        {currentSection?.year}
      </motion.div>

      <div className="flex flex-col items-center gap-1">
        {BERLIN_SECTIONS.map((section, i) => {
          const isActive = section.id === activeSection;
          const isPast = i < activeIndex;
          return (
            <button
              key={section.id}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative flex items-center"
              aria-label={section.label}
            >
              {isActive ? (
                <EmptyChairIcon size={14} color={BL.RED_WAX} />
              ) : (
                <span
                  className={cn(
                    'block rounded-full transition-all duration-500',
                    isPast ? 'w-2 h-2' : 'w-1.5 h-1.5'
                  )}
                  style={{
                    background: isPast ? BL.BRASS : BL.GRID_BLUE,
                    opacity: isPast ? 0.8 : 0.4,
                  }}
                />
              )}
              <span
                className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap font-body"
                style={{ color: BL.MUTED }}
              >
                {section.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px -z-10" style={{ background: BL.GRID_BLUE, opacity: 0.2 }}>
        <motion.div
          className="w-full origin-top"
          style={{
            height: `${globalProgress * 100}%`,
            background: `linear-gradient(to bottom, ${BL.GRID_BLUE}, ${BL.RED_WAX})`,
            opacity: 0.5,
          }}
        />
      </div>
    </div>
  );
};
