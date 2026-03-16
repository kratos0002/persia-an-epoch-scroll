import React from 'react';
import { motion } from 'framer-motion';
import { RAMAYANA_SECTIONS } from '@/hooks/useRamayanaScrollSpy';
import { cn } from '@/lib/utils';
import { RM } from '@/components/visuals/ramayanaMapData';

interface RamayanaProgressTimelineProps {
  activeSection: string;
  globalProgress: number;
}

export const RamayanaProgressTimeline = ({ activeSection, globalProgress }: RamayanaProgressTimelineProps) => {
  const activeIndex = RAMAYANA_SECTIONS.findIndex(s => s.id === activeSection);
  const current = RAMAYANA_SECTIONS[activeIndex] || RAMAYANA_SECTIONS[0];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-0" style={{ height: '45vh' }}>
      {current.year && (
        <motion.div
          className="absolute -left-14 text-[9px] tracking-[0.12em] font-body font-semibold whitespace-nowrap"
          style={{
            color: RM.SAFFRON,
            top: `${(activeIndex / (RAMAYANA_SECTIONS.length - 1)) * 100}%`,
            transform: 'translateY(-50%)',
          }}
          key={current.year}
          initial={{ opacity: 0, x: 4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {current.year}
        </motion.div>
      )}

      {RAMAYANA_SECTIONS.map((section, i) => {
        const isActive = section.id === activeSection;
        const isPast = i < activeIndex;
        return (
          <button
            key={section.id}
            className="group relative flex items-center justify-center"
            style={{ flex: 1 }}
            onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div
              className={cn('w-2 h-2 rounded-full transition-all duration-300', isActive && 'scale-150')}
              style={{
                background: isActive ? RM.SAFFRON : isPast ? RM.SAFFRON : 'hsl(215, 20%, 25%)',
                opacity: isActive ? 1 : isPast ? 0.5 : 0.3,
                boxShadow: isActive ? `0 0 8px ${RM.SAFFRON}` : 'none',
              }}
            />
            <span
              className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-body whitespace-nowrap pointer-events-none"
              style={{ color: RM.SANDSTONE }}
            >
              {section.label}
            </span>
          </button>
        );
      })}

      <div className="absolute left-1/2 -translate-x-1/2 w-px top-0 bottom-0 pointer-events-none" style={{ background: 'hsl(215, 20%, 18%)' }}>
        <motion.div
          className="w-full origin-top"
          style={{
            height: `${globalProgress * 100}%`,
            background: `linear-gradient(to bottom, ${RM.SAFFRON}, ${RM.GOLD})`,
          }}
        />
      </div>
    </div>
  );
};
