import React from 'react';
import { motion } from 'framer-motion';
import { SHAKTI_SECTIONS } from '@/components/visuals/shaktiPeethData';
import { cn } from '@/lib/utils';

interface ShaktiProgressTimelineProps {
  activeSection: string;
  globalProgress: number;
}

export const ShaktiProgressTimeline = ({ activeSection, globalProgress }: ShaktiProgressTimelineProps) => {
  const activeIndex = SHAKTI_SECTIONS.findIndex((section) => section.id === activeSection);
  const current = SHAKTI_SECTIONS[activeIndex] ?? SHAKTI_SECTIONS[0];

  return (
    <div className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 lg:flex flex-col items-end gap-0">
      <motion.div
        className="absolute -left-40 text-right font-display text-sm text-shakti-gold"
        style={{ top: `${(activeIndex / Math.max(SHAKTI_SECTIONS.length - 1, 1)) * 100}%` }}
        layout
      >
        {current.label}
      </motion.div>

      <div className="flex flex-col items-center gap-2">
        {SHAKTI_SECTIONS.map((section, index) => {
          const isActive = section.id === activeSection;
          const isPast = index < activeIndex;
          return (
            <button
              key={section.id}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative flex items-center"
              aria-label={section.label}
            >
              <span
                className={cn('block rounded-full transition-all duration-500', isActive ? 'h-3.5 w-3.5' : isPast ? 'h-2.5 w-2.5' : 'h-2 w-2')}
                style={{ background: isActive ? 'hsl(var(--shakti-gold))' : isPast ? 'hsl(var(--shakti-vermilion))' : 'hsl(var(--shakti-line) / 0.45)', boxShadow: isActive ? '0 0 18px hsl(var(--shakti-gold) / 0.65)' : 'none' }}
              />
              <span className="absolute right-6 whitespace-nowrap text-xs font-body text-shakti-ink/0 transition-opacity group-hover:text-shakti-ink/70 lg:group-hover:text-shakti-ink/70">
                {section.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="absolute left-1/2 top-0 bottom-0 -z-10 w-px -translate-x-1/2 bg-shakti-line/15">
        <motion.div className="w-full origin-top bg-[linear-gradient(180deg,hsl(var(--shakti-gold)),hsl(var(--shakti-vermilion)))]" style={{ height: `${globalProgress * 100}%` }} />
      </div>
    </div>
  );
};