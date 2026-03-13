import React from 'react';
import { motion } from 'framer-motion';

const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';
const DRAGON_RED = 'hsl(0, 70%, 45%)';

const NATIONS = [
  { name: 'USA', fissionYear: 1945, fusionYear: 1952, months: 87, color: 'hsl(140, 70%, 45%)' },
  { name: 'USSR', fissionYear: 1949, fusionYear: 1953, months: 45, color: 'hsl(0, 70%, 50%)' },
  { name: 'UK', fissionYear: 1952, fusionYear: 1957, months: 60, color: 'hsl(210, 50%, 40%)' },
  { name: 'China', fissionYear: 1964, fusionYear: 1967, months: 32, color: DRAGON_RED },
];

const MAX_MONTHS = 87;

interface Props {
  activeStep: number;
}

export const FissionFusionRace = ({ activeStep }: Props) => {
  // Step 0: Show USA only
  // Step 1: Show USSR
  // Step 2: Show UK + China, China highlighted
  // Step 3: All visible, China lane glows

  const visibleCount = activeStep === 0 ? 1 : activeStep === 1 ? 2 : 4;

  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <div className="w-full max-w-[480px]">
        <p className="text-[9px] tracking-[0.3em] uppercase font-body text-center mb-8" style={{ color: STEEL }}>
          Fission → Fusion: Months Between First Tests
        </p>

        <div className="space-y-5">
          {NATIONS.slice(0, visibleCount).map((nation, i) => {
            const barWidth = (nation.months / MAX_MONTHS) * 100;
            const isChina = nation.name === 'China';
            const isActive = i === visibleCount - 1;

            return (
              <motion.div
                key={nation.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <span
                    className="text-xs font-body font-semibold w-12"
                    style={{ color: nation.color }}
                  >
                    {nation.name}
                  </span>
                  <span className="text-[10px] font-body" style={{ color: STEEL }}>
                    {nation.fissionYear} → {nation.fusionYear}
                  </span>
                </div>

                <div className="relative h-6 rounded-sm overflow-hidden" style={{ background: 'hsl(200, 20%, 10%)' }}>
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-sm"
                    style={{
                      background: isChina
                        ? `linear-gradient(90deg, ${nation.color}, ${nation.color}cc)`
                        : nation.color,
                      opacity: isChina ? 1 : 0.5,
                    }}
                    initial={{ width: '0%' }}
                    animate={{ width: `${barWidth}%` }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />

                  {/* Month label inside bar */}
                  <motion.span
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-display font-bold"
                    style={{ color: isChina ? LIGHT : STEEL }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    {nation.months} months
                  </motion.span>

                  {/* China pulse */}
                  {isChina && isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-sm"
                      style={{ border: `1px solid ${DRAGON_RED}` }}
                      animate={{ opacity: [0.6, 0.1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {activeStep >= 2 && (
          <motion.p
            className="text-center mt-8 font-display text-sm font-bold"
            style={{ color: DRAGON_RED }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Fastest fission-to-fusion sprint in history
          </motion.p>
        )}
      </div>
    </div>
  );
};
