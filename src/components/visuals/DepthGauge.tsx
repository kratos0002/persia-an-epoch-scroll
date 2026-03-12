import React from 'react';
import { motion } from 'framer-motion';
import { STRATA } from './constantinopleData';

interface DepthGaugeProps {
  activeSection: string;
  globalProgress: number;
}

export const DepthGauge: React.FC<DepthGaugeProps> = ({ activeSection, globalProgress }) => {
  const activeIndex = STRATA.findIndex(s => s.id === activeSection);
  const currentStratum = STRATA[activeIndex] || STRATA[0];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-0">
      {/* Year label */}
      <motion.div
        className="mb-3 text-center"
        key={currentStratum.year}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-[10px] tracking-[0.2em] uppercase font-body font-semibold" style={{ color: `hsl(${currentStratum.color})` }}>
          {currentStratum.year}
        </div>
        <div className="text-[9px] font-body" style={{ color: 'hsl(40 25% 55%)' }}>
          {currentStratum.depth}m deep
        </div>
      </motion.div>

      {/* Soil core column */}
      <div className="relative w-5 rounded-full overflow-hidden" style={{ height: 200, background: 'hsl(25 15% 12%)' }}>
        {/* Stratum color bands */}
        {STRATA.map((stratum, i) => {
          const bandHeight = 100 / STRATA.length;
          const isActive = i === activeIndex;
          const isPast = i <= activeIndex;
          return (
            <button
              key={stratum.id}
              className="absolute left-0 w-full transition-opacity duration-300 cursor-pointer hover:opacity-100"
              style={{
                top: `${i * bandHeight}%`,
                height: `${bandHeight}%`,
                background: `hsl(${stratum.color})`,
                opacity: isPast ? 1 : 0.25,
                boxShadow: isActive ? `0 0 8px hsl(${stratum.color} / 0.6)` : 'none',
              }}
              onClick={() => document.getElementById(stratum.id)?.scrollIntoView({ behavior: 'smooth' })}
              title={stratum.label}
            />
          );
        })}

        {/* Progress line */}
        <motion.div
          className="absolute left-0 w-full pointer-events-none"
          style={{
            top: 0,
            height: `${globalProgress * 100}%`,
            background: 'linear-gradient(180deg, hsl(40 25% 80% / 0.4) 0%, transparent 100%)',
          }}
        />

        {/* Active indicator */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
          style={{
            background: 'hsl(40 25% 90%)',
            boxShadow: '0 0 6px hsl(40 25% 90% / 0.8)',
            top: `${(activeIndex / (STRATA.length - 1)) * 100}%`,
          }}
          layout
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        />
      </div>

      {/* Depth label */}
      <div className="mt-3 text-[9px] font-body text-center" style={{ color: 'hsl(40 25% 45%)' }}>
        Depth
      </div>
    </div>
  );
};
