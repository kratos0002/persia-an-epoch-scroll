import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ERAS } from '@/data/eras';

const EraMarker = ({
  era,
  index,
  progress,
  total,
}: {
  era: (typeof ERAS)[number];
  index: number;
  progress: ReturnType<typeof useTransform<number>>;
  total: number;
}) => {
  const threshold = index / total;
  const markerOpacity = useTransform(progress, [Math.max(0, threshold - 0.04), threshold + 0.02], [0, 1]);
  const markerY = useTransform(progress, [Math.max(0, threshold - 0.04), threshold + 0.02], [12, 0]);
  const isTop = index % 2 === 0;

  return (
    <div className="flex flex-col items-center relative" style={{ minWidth: 0, flex: '1 1 0%' }}>
      {/* Content — alternating top/bottom */}
      <motion.div
        className={`absolute flex flex-col items-center ${isTop ? 'bottom-[calc(100%+16px)]' : 'top-[calc(100%+16px)]'}`}
        style={{ opacity: markerOpacity, y: markerY }}
      >
        {isTop ? (
          <>
            <span className="text-[10px] md:text-xs font-body tracking-wider whitespace-nowrap" style={{ color: 'hsl(38, 20%, 55%)' }}>
              {era.teaser}
            </span>
            <span className="font-display text-sm md:text-base font-bold mt-0.5 whitespace-nowrap" style={{ color: era.color }}>
              {era.label}
            </span>
            <span className="text-[9px] md:text-[10px] font-body tracking-[0.15em] uppercase mt-0.5 whitespace-nowrap" style={{ color: 'hsl(43, 85%, 55%, 0.4)' }}>
              {era.date}
            </span>
          </>
        ) : (
          <>
            <span className="text-[9px] md:text-[10px] font-body tracking-[0.15em] uppercase mb-0.5 whitespace-nowrap" style={{ color: 'hsl(43, 85%, 55%, 0.4)' }}>
              {era.date}
            </span>
            <span className="font-display text-sm md:text-base font-bold mb-0.5 whitespace-nowrap" style={{ color: era.color }}>
              {era.label}
            </span>
            <span className="text-[10px] md:text-xs font-body tracking-wider whitespace-nowrap" style={{ color: 'hsl(38, 20%, 55%)' }}>
              {era.teaser}
            </span>
          </>
        )}
      </motion.div>

      {/* Dot */}
      <motion.div
        className="relative z-10 rounded-full"
        style={{
          opacity: markerOpacity,
          width: 10,
          height: 10,
          backgroundColor: era.color,
          boxShadow: `0 0 12px ${era.color}`,
        }}
      />
    </div>
  );
};

export const PrologueSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Map scroll to timeline fill (0 to 1)
  const timelineProgress = useTransform(scrollYProgress, [0.08, 0.55], [0, 1]);
  const fillWidth = useTransform(timelineProgress, [0, 1], ['0%', '100%']);

  // Intro text fade
  const introOpacity = useTransform(scrollYProgress, [0.02, 0.1], [0, 1]);
  const introY = useTransform(scrollYProgress, [0.02, 0.1], [40, 0]);

  // Transition text at end
  const outroOpacity = useTransform(scrollYProgress, [0.58, 0.68], [0, 1]);

  return (
    <section ref={ref} className="relative py-12 md:py-16" style={{ minHeight: '300vh' }}>
      {/* Background continuity */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to bottom, hsl(220, 20%, 7%) 0%, hsl(225, 25%, 9%) 50%, hsl(220, 20%, 7%) 100%)',
      }} />

      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Intro prose */}
        <motion.div
          className="relative z-10 text-center max-w-2xl mx-auto px-6 mb-16 md:mb-20"
          style={{ opacity: introOpacity, y: introY }}
        >
          <p className="font-body text-lg md:text-xl leading-relaxed" style={{ color: 'hsl(38, 20%, 80%)' }}>
            Most empires rise, rule, and vanish. Persia rose, fell, rose again — conquered, absorbed its conquerors,
            and emerged speaking a new language but carrying the same soul.
          </p>
          <p className="font-body text-sm mt-4 tracking-wide" style={{ color: 'hsl(43, 85%, 55%, 0.4)' }}>
            Eleven chapters. Twenty-five centuries. One thread.
          </p>
        </motion.div>

        {/* Horizontal timeline */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-8 md:px-12">
          {/* The line track */}
          <div className="relative flex items-center" style={{ height: 10 }}>
            {/* Background track */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px" style={{ background: 'hsl(43, 85%, 55%, 0.12)' }} />

            {/* Filled track */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 left-0 h-[2px] rounded-full"
              style={{
                width: fillWidth,
                background: 'linear-gradient(90deg, hsl(43, 90%, 62%) 0%, hsl(358, 70%, 60%) 40%, hsl(220, 70%, 62%) 70%, hsl(180, 45%, 55%) 100%)',
                boxShadow: '0 0 20px hsl(43, 85%, 55%, 0.3)',
              }}
            />

            {/* Era markers */}
            <div className="relative flex w-full justify-between items-center">
              {ERAS.map((era, i) => (
                <EraMarker key={era.label} era={era} index={i} progress={timelineProgress} total={ERAS.length} />
              ))}
            </div>
          </div>
        </div>

        {/* Transition line */}
        <motion.p
          className="relative z-10 font-body text-base md:text-lg mt-16 md:mt-20 text-center px-6 italic"
          style={{ opacity: outroOpacity, color: 'hsl(38, 20%, 70%)' }}
        >
          It begins with a man who had no empire — and an idea no one had tried before.
        </motion.p>
      </div>
    </section>
  );
};
