import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ClassPyramidProps {
  /** 0 = static/stable, 1 = destabilized/dissolving */
  destabilize?: number;
  className?: string;
}

const CLASSES = [
  { label: '天皇 Emperor', width: 20, color: 'hsl(43, 60%, 45%)', desc: 'Symbolic authority, no power' },
  { label: '将軍 Shōgun', width: 30, color: 'hsl(25, 20%, 25%)', desc: 'Military dictator, true ruler' },
  { label: '大名 Daimyō', width: 45, color: 'hsl(25, 20%, 32%)', desc: '~260 domain lords' },
  { label: '武士 Samurai', width: 60, color: 'hsl(5, 75%, 50%)', desc: '~6% of population, stipend-fed' },
  { label: '農 Peasants', width: 80, color: 'hsl(30, 10%, 55%)', desc: '~80% of population, taxed' },
  { label: '商 Merchants', width: 90, color: 'hsl(25, 8%, 70%)', desc: 'Lowest rank, richest class' },
];

export const ClassPyramid = ({ destabilize = 0, className }: ClassPyramidProps) => {
  return (
    <div className={cn('flex flex-col items-center gap-1.5 w-full max-w-lg mx-auto', className)}>
      {CLASSES.map((cls, i) => {
        // When destabilized, bars shake/blur/fade
        const shakeX = destabilize * (Math.sin(i * 2.5) * 20);
        const blur = destabilize * 4;
        const opacity = 1 - destabilize * (i < 3 ? 0.6 : 0.2);

        return (
          <motion.div
            key={cls.label}
            className="relative flex items-center justify-center rounded-sm overflow-hidden"
            style={{
              width: `${cls.width}%`,
              height: '44px',
              background: cls.color,
              filter: `blur(${blur}px)`,
              opacity: Math.max(opacity, 0.1),
            }}
            animate={{
              x: destabilize > 0.05 ? [0, shakeX, -shakeX * 0.6, 0] : 0,
            }}
            transition={{
              duration: 0.8,
              repeat: destabilize > 0.05 ? Infinity : 0,
              repeatType: 'mirror',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-between px-3">
              <span className="text-xs font-display font-bold text-white/90 tracking-wide truncate">
                {cls.label}
              </span>
              <span className="text-[10px] font-body text-white/60 hidden sm:block truncate ml-2">
                {cls.desc}
              </span>
            </div>
          </motion.div>
        );
      })}

      {/* Label */}
      <p className="text-[10px] tracking-[0.3em] uppercase mt-4 font-body" style={{ color: 'hsl(30, 10%, 55%)' }}>
        {destabilize > 0.5 ? 'Hierarchy Collapsing' : 'Tokugawa Social Order'}
      </p>
    </div>
  );
};
