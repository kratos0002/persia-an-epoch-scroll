import React from 'react';
import { motion } from 'framer-motion';
import { NUCLEAR_SECTIONS } from '@/hooks/useNuclearScrollSpy';
import { cn } from '@/lib/utils';

const GEIGER = 'hsl(140, 70%, 45%)';
const URANIUM = 'hsl(45, 80%, 55%)';

interface Props {
  activeSection: string;
  globalProgress: number;
}

export const NuclearProgressTimeline = ({ activeSection, globalProgress }: Props) => {
  const activeIndex = NUCLEAR_SECTIONS.findIndex(s => s.id === activeSection);
  const current = NUCLEAR_SECTIONS[activeIndex];

  // Count nations revealed so far (sections with a nation field that are past or active)
  const nationsRevealed = NUCLEAR_SECTIONS
    .filter((s, i) => i <= activeIndex && s.nation)
    .length;

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-0">
      {/* Year label */}
      <motion.div
        className="absolute -left-20 font-display text-sm whitespace-nowrap"
        style={{
          top: `${(activeIndex / (NUCLEAR_SECTIONS.length - 1)) * 100}%`,
          color: GEIGER,
          opacity: 0.7,
        }}
        layout
      >
        {current?.year}
      </motion.div>

      {/* Nation counter */}
      {nationsRevealed > 0 && (
        <motion.div
          className="absolute -left-20 bottom-0 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
        >
          <div className="font-display text-lg font-bold" style={{ color: URANIUM }}>
            {nationsRevealed}
          </div>
          <div className="text-[8px] tracking-[0.2em] uppercase font-body" style={{ color: 'hsl(200, 10%, 45%)' }}>
            nations
          </div>
        </motion.div>
      )}

      <div className="flex flex-col items-center gap-1">
        {NUCLEAR_SECTIONS.map((section, i) => {
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
                    ? 'w-3 h-3 shadow-[0_0_12px_rgba(34,197,94,0.4)]'
                    : isPast
                    ? 'w-2 h-2 opacity-50'
                    : 'w-1.5 h-1.5 opacity-30'
                )}
                style={{
                  background: isActive ? GEIGER : isPast ? GEIGER : 'hsl(200, 10%, 35%)',
                }}
              />
              <span
                className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap font-body"
                style={{ color: 'hsl(200, 10%, 65%)' }}
              >
                {section.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px -z-10" style={{ background: 'hsl(200, 15%, 15%)' }}>
        <motion.div
          className="w-full origin-top"
          style={{
            height: `${globalProgress * 100}%`,
            background: `linear-gradient(to bottom, ${GEIGER}, ${URANIUM})`,
            opacity: 0.5,
          }}
        />
      </div>
    </div>
  );
};
