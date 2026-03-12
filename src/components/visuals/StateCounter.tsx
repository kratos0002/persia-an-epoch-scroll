import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STATE_COUNTS } from './indiaStatesData';

interface StateCounterProps {
  activeSection: string;
}

export const StateCounter: React.FC<StateCounterProps> = ({ activeSection }) => {
  const data = STATE_COUNTS[activeSection] || STATE_COUNTS.patchwork;
  const [displayCount, setDisplayCount] = useState(data.states);

  useEffect(() => {
    const target = data.states;
    const start = displayCount;
    const diff = target - start;
    if (diff === 0) return;
    const steps = Math.min(Math.abs(diff), 40);
    const stepTime = 600 / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayCount(Math.round(start + diff * eased));
      if (step >= steps) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [data.states]);

  return (
    <motion.div
      className="fixed top-6 right-6 z-50 hidden md:flex flex-col items-end gap-1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="bg-card/90 backdrop-blur-md border border-border/40 rounded-lg px-5 py-3 shadow-lg">
        <div className="flex items-baseline gap-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={displayCount}
              className="font-display text-3xl font-bold"
              style={{ color: 'hsl(40, 60%, 55%)' }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              {displayCount.toLocaleString()}
            </motion.span>
          </AnimatePresence>
          <span className="text-xs text-muted-foreground font-body">states</span>
          {data.uts > 0 && (
            <>
              <span className="text-muted-foreground/40 mx-1">+</span>
              <span className="font-display text-xl font-bold" style={{ color: 'hsl(210, 45%, 55%)' }}>
                {data.uts}
              </span>
              <span className="text-xs text-muted-foreground font-body">UTs</span>
            </>
          )}
        </div>
        <motion.p
          key={data.label}
          className="text-[10px] text-muted-foreground/70 font-body mt-1 max-w-[200px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {data.label}
        </motion.p>
      </div>
    </motion.div>
  );
};
