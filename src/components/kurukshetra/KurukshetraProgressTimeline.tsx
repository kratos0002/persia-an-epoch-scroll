import React from 'react';
import { motion } from 'framer-motion';
import { KURUKSHETRA_SECTIONS, SECTION_PHASE } from './kurukshetraData';
import { cn } from '@/lib/utils';

interface Props {
  activeSection: string;
  globalProgress: number;
}

const phaseColor = (id: string) => {
  const p = SECTION_PHASE[id] ?? 1;
  if (p === 1) return 'hsl(var(--kuru-gold))';
  if (p === 2) return 'hsl(var(--kuru-bronze))';
  if (p === 3) return 'hsl(var(--kuru-red))';
  return 'hsl(var(--kuru-ash))';
};

export const KurukshetraProgressTimeline = ({ activeSection, globalProgress }: Props) => {
  const activeIndex = KURUKSHETRA_SECTIONS.findIndex((s) => s.id === activeSection);
  const current = KURUKSHETRA_SECTIONS[activeIndex] ?? KURUKSHETRA_SECTIONS[0];

  return (
    <div className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 lg:flex flex-col items-end gap-0">
      <motion.div
        className="absolute -left-36 text-right font-display text-xs tracking-[0.1em]"
        style={{
          top: `${(activeIndex / Math.max(KURUKSHETRA_SECTIONS.length - 1, 1)) * 100}%`,
          color: phaseColor(current.id),
        }}
        layout
      >
        {current.label}
      </motion.div>

      <div className="flex flex-col items-center gap-2">
        {KURUKSHETRA_SECTIONS.map((section, i) => {
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
                className={cn('block rounded-full transition-all duration-500', isActive ? 'h-3 w-3' : isPast ? 'h-2 w-2' : 'h-1.5 w-1.5')}
                style={{
                  background: isActive ? phaseColor(section.id) : isPast ? 'hsl(var(--kuru-clay))' : 'hsl(var(--kuru-bronze) / 0.3)',
                  boxShadow: isActive ? `0 0 10px ${phaseColor(section.id)}` : 'none',
                }}
              />
              <span className="absolute right-5 whitespace-nowrap text-[10px] font-body text-kuru-kohl/0 transition-opacity group-hover:text-kuru-kohl/60">
                {section.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="absolute left-1/2 top-0 bottom-0 -z-10 w-px -translate-x-1/2 bg-kuru-bronze/15">
        <motion.div
          className="w-full origin-top"
          style={{
            height: `${globalProgress * 100}%`,
            background: 'linear-gradient(180deg, hsl(var(--kuru-gold)), hsl(var(--kuru-red)), hsl(var(--kuru-ash)))',
          }}
        />
      </div>
    </div>
  );
};
