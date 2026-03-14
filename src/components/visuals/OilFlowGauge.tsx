import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedCounter } from './AnimatedCounter';

const AMBER = 'hsl(35, 80%, 50%)';
const SMOKE = 'hsl(210, 15%, 40%)';
const OIL = 'hsl(0, 0%, 12%)';

export const OilFlowGauge = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.5'],
  });
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={ref} className="py-10 rounded-xl" style={{
      background: 'hsl(215, 40%, 6%)',
      border: '1px solid hsla(35, 80%, 50%, 0.1)',
    }}>
      <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-4 text-center" style={{ color: SMOKE }}>
        Daily oil flow through the Strait of Hormuz
      </p>
      <div className="text-center mb-4">
        <span className="font-display text-5xl md:text-6xl font-black" style={{ color: AMBER }}>
          <AnimatedCounter end={21} duration={1500} />M
        </span>
        <span className="font-body text-sm ml-2" style={{ color: SMOKE }}>barrels / day</span>
      </div>

      {/* Pipeline bar */}
      <div className="mx-6 h-4 rounded-full overflow-hidden relative" style={{ background: OIL }}>
        <motion.div
          className="h-full rounded-full"
          style={{
            width,
            background: `linear-gradient(90deg, ${OIL}, ${AMBER})`,
          }}
        />
        {/* Flow pattern */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <motion.div
            className="h-full w-[200%]"
            style={{
              background: `repeating-linear-gradient(90deg, transparent, transparent 12px, hsla(35, 80%, 50%, 0.15) 12px, hsla(35, 80%, 50%, 0.15) 14px)`,
            }}
            animate={{ x: [0, -28] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>

      <p className="text-[10px] font-body text-center mt-3" style={{ color: SMOKE }}>
        ≈ 21% of global petroleum consumption
      </p>
    </div>
  );
};
