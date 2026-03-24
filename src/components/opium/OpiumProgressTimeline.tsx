import React from 'react';
import { motion } from 'framer-motion';
import { OPIUM_SECTIONS } from '@/components/opium/opiumData';
import { cn } from '@/lib/utils';

interface OpiumProgressTimelineProps {
  activeSection: string;
  globalProgress: number;
}

/* Phase color: tea (amber) → silver (grey) → resin (brown) */
const phaseColor = (id: string) => {
  if (['opium-hero', 'opium-silver-drain', 'opium-commutation'].includes(id)) return 'hsl(var(--ledger-tea))';
  if (['opium-factories', 'opium-routes'].includes(id)) return 'hsl(var(--ledger-silver))';
  return 'hsl(var(--ledger-resin))';
};

export const OpiumProgressTimeline = ({ activeSection, globalProgress }: OpiumProgressTimelineProps) => {
  const activeIndex = OPIUM_SECTIONS.findIndex((s) => s.id === activeSection);
  const current = OPIUM_SECTIONS[activeIndex] ?? OPIUM_SECTIONS[0];

  return (
    <div className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 lg:flex flex-col items-end gap-0">
      <motion.div
        className="absolute -left-40 text-right font-display text-sm"
        style={{ top: `${(activeIndex / Math.max(OPIUM_SECTIONS.length - 1, 1)) * 100}%`, color: phaseColor(current.id) }}
        layout
      >
        {current.label}
      </motion.div>

      <div className="flex flex-col items-center gap-2">
        {OPIUM_SECTIONS.map((section, index) => {
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
                style={{
                  background: isActive ? phaseColor(section.id) : isPast ? 'hsl(var(--ledger-stain))' : 'hsl(var(--ledger-rule) / 0.5)',
                  boxShadow: isActive ? `0 0 14px ${phaseColor(section.id)}` : 'none',
                }}
              />
              <span className="absolute right-6 whitespace-nowrap text-xs font-body text-ledger-ink/0 transition-opacity group-hover:text-ledger-ink/70">
                {section.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="absolute left-1/2 top-0 bottom-0 -z-10 w-px -translate-x-1/2 bg-ledger-rule/25">
        <motion.div className="w-full origin-top bg-[linear-gradient(180deg,hsl(var(--ledger-tea)),hsl(var(--ledger-resin)))]" style={{ height: `${globalProgress * 100}%` }} />
      </div>
    </div>
  );
};
