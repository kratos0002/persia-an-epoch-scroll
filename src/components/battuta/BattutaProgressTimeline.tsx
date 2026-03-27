import React from 'react';
import { motion } from 'framer-motion';
import { BATTUTA_SECTIONS } from '@/hooks/useBattutaScrollSpy';
import { IB } from '@/components/visuals/battutaMapData';
import { cn } from '@/lib/utils';

interface BattutaProgressTimelineProps {
  activeSection: string;
  globalProgress: number;
}

/** Mini compass rose / wind rose SVG for timeline dots */
const WindRose = ({ size, active, past }: { size: number; active: boolean; past: boolean }) => {
  const color = active ? IB.SAFFRON : past ? IB.SAFFRON : 'hsl(30, 15%, 60%)';
  const points = active ? 8 : 4;
  const r = size / 2;
  const outerR = r * 0.9;
  const innerR = r * 0.35;

  const pathData = Array.from({ length: points }, (_, i) => {
    const angle = (i * 360 / points - 90) * Math.PI / 180;
    const midAngle = ((i + 0.5) * 360 / points - 90) * Math.PI / 180;
    return `L ${r + outerR * Math.cos(angle)} ${r + outerR * Math.sin(angle)} L ${r + innerR * Math.cos(midAngle)} ${r + innerR * Math.sin(midAngle)}`;
  }).join(' ');

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path d={`M ${r + outerR * Math.cos(-Math.PI / 2)} ${r + outerR * Math.sin(-Math.PI / 2)} ${pathData} Z`}
        fill={color} opacity={active ? 0.9 : past ? 0.4 : 0.25} />
      {active && <circle cx={r} cy={r} r={r * 0.2} fill={color} />}
    </svg>
  );
};

export const BattutaProgressTimeline = ({ activeSection, globalProgress }: BattutaProgressTimelineProps) => {
  const activeIndex = BATTUTA_SECTIONS.findIndex(s => s.id === activeSection);
  const current = BATTUTA_SECTIONS[activeIndex] || BATTUTA_SECTIONS[0];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-0">
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
              <WindRose size={isActive ? 14 : isPast ? 10 : 8} active={isActive} past={isPast} />
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: `0 0 12px ${IB.SAFFRON}60` }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
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
