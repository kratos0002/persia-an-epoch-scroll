import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { BL, PARTITION_TIMELINE, POWER_COLORS, type PartitionEvent } from '@/components/visuals/berlinMapData';

/* ── The Partition Timelapse: scroll-driven timeline ───────────────── */

export const PartitionTimelapse = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  // Map scroll to year range 1830–1914
  const currentYear = useTransform(scrollYProgress, [0, 1], [1830, 1914]);

  return (
    <section id="partition-timelapse" ref={sectionRef} className="relative" style={{ background: BL.VELLUM, height: `${PARTITION_TIMELINE.length * 60 + 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Survey grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(to right, ${BL.GRID_BLUE}06 1px, transparent 1px), linear-gradient(to bottom, ${BL.GRID_BLUE}06 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        <div className="max-w-6xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Year counter + progress */}
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-3" style={{ color: BL.BRASS }}>
              1881 – 1914
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: BL.INK }}>
              The Partition
            </h2>
            <p className="font-body text-sm leading-relaxed mb-8" style={{ color: BL.MUTED }}>
              In thirty years, European control of Africa grew from roughly 10% to 90% of the continent.
              Scroll to watch the partition unfold.
            </p>

            {/* Year display */}
            <motion.div className="font-display text-7xl md:text-8xl font-black mb-6" style={{ color: BL.RED_WAX }}>
              <motion.span>{currentYear}</motion.span>
            </motion.div>

            {/* Progress bar showing % controlled */}
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: BL.PAPER_DARK }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(to right, ${BL.BRASS}, ${BL.RED_WAX})`,
                  width: useTransform(scrollYProgress, [0, 1], ['10%', '90%']),
                }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-mono text-xs" style={{ color: BL.MUTED }}>10%</span>
              <span className="font-mono text-xs" style={{ color: BL.MUTED }}>90% of Africa colonized</span>
            </div>
          </div>

          {/* Right: Event cards that appear based on scroll */}
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
            {PARTITION_TIMELINE.map((event, i) => (
              <TimelineEventCard key={`${event.year}-${event.territory}`} event={event} index={i} scrollProgress={scrollYProgress} totalEvents={PARTITION_TIMELINE.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineEventCard = ({ event, index, scrollProgress, totalEvents }: {
  event: PartitionEvent;
  index: number;
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  totalEvents: number;
}) => {
  const threshold = index / totalEvents;
  const opacity = useTransform(scrollProgress, [Math.max(0, threshold - 0.05), threshold], [0, 1]);
  const y = useTransform(scrollProgress, [Math.max(0, threshold - 0.05), threshold], [20, 0]);
  const powerColor = POWER_COLORS[event.power] || BL.MUTED;

  return (
    <motion.div
      className="p-4 rounded-lg"
      style={{
        opacity,
        y,
        background: BL.VELLUM,
        border: `1px solid ${BL.BRASS}33`,
        boxShadow: `0 1px 4px ${BL.INK}08`,
      }}
    >
      <div className="flex items-center gap-3 mb-1">
        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: powerColor }} />
        <span className="font-mono text-xs font-bold" style={{ color: BL.INK }}>{event.year}</span>
        <span className="text-[9px] tracking-[0.1em] uppercase font-body font-semibold px-2 py-0.5 rounded-full" style={{ background: `${powerColor}22`, color: powerColor }}>
          {event.power}
        </span>
      </div>
      <h4 className="font-display text-sm font-bold" style={{ color: BL.INK }}>{event.territory}</h4>
      <p className="font-body text-xs mt-1" style={{ color: BL.MUTED }}>{event.description}</p>
    </motion.div>
  );
};
