import React from 'react';
import { motion } from 'framer-motion';
import { INDIA_SECTIONS } from '@/components/visuals/indiaStatesData';

interface IndiaProgressTimelineProps {
  activeSection: string;
  globalProgress: number;
}

export const IndiaProgressTimeline: React.FC<IndiaProgressTimelineProps> = ({ activeSection, globalProgress }) => {
  const activeIdx = INDIA_SECTIONS.findIndex(s => s.id === activeSection);

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-0">
      {/* Progress track */}
      <div className="relative w-px h-64">
        <div className="absolute inset-0 w-px bg-border/30" />
        <motion.div
          className="absolute top-0 w-px origin-top"
          style={{
            height: `${globalProgress * 100}%`,
            background: 'hsl(40, 60%, 55%)',
          }}
        />
        {/* Section dots */}
        {INDIA_SECTIONS.map((section, i) => {
          const top = (i / (INDIA_SECTIONS.length - 1)) * 100;
          const isActive = i === activeIdx;
          const isPast = i <= activeIdx;
          return (
            <button
              key={section.id}
              className="absolute -left-1.5 w-4 h-4 flex items-center justify-center group"
              style={{ top: `${top}%` }}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div
                className={`w-2 h-2 rounded-full transition-all ${isActive ? 'scale-150' : 'scale-100'}`}
                style={{
                  background: isPast ? 'hsl(40, 60%, 55%)' : 'hsl(220, 15%, 30%)',
                  boxShadow: isActive ? '0 0 8px hsl(40, 60%, 55%)' : 'none',
                }}
              />
              {/* Tooltip */}
              <div className="absolute left-6 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span className="text-[9px] font-body px-2 py-1 bg-card/90 border border-border/30 rounded" style={{ color: 'hsl(40, 25%, 75%)' }}>
                  {section.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Current year label */}
      <motion.div
        key={activeSection}
        className="mt-4 text-center"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-[10px] tracking-[0.15em] uppercase font-body font-semibold" style={{ color: 'hsl(40, 60%, 55%)' }}>
          {INDIA_SECTIONS[activeIdx]?.year || ''}
        </div>
      </motion.div>
    </div>
  );
};
