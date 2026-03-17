import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BL, POWER_COLORS } from '@/components/visuals/berlinMapData';

/* ── Africa outline path (more detailed) ───────────────────────────── */
const AFRICA_PATH = "M400 55 Q415 60 430 75 Q445 80 455 95 Q470 100 480 120 Q495 115 510 130 Q520 125 530 140 Q535 150 540 170 Q545 165 555 180 Q558 190 560 210 Q565 215 565 235 Q570 245 568 260 Q572 270 570 290 Q575 300 572 320 Q570 335 565 350 Q560 365 555 380 Q548 395 540 410 Q530 425 520 440 Q510 455 505 470 Q498 480 490 495 Q485 510 475 525 Q470 535 460 550 Q455 560 445 575 Q440 585 430 600 Q425 610 415 625 Q410 638 400 650 Q392 660 385 665 Q375 668 365 660 Q355 650 345 635 Q335 620 325 600 Q315 580 305 560 Q295 540 285 515 Q275 495 268 475 Q260 455 255 435 Q248 415 245 395 Q240 375 238 355 Q232 335 235 315 Q238 295 242 280 Q248 260 255 245 Q262 230 270 218 Q278 205 288 195 Q298 185 310 178 Q322 170 335 162 Q348 155 360 145 Q372 132 382 118 Q390 100 395 80 Q398 68 400 55 Z";

/* ── Partition lines representing the actual geometric borders ─────── */
const PARTITION_LINES = [
  { x1: 235, y1: 280, x2: 565, y2: 280, color: POWER_COLORS.france, label: 'Saharan boundaries' },
  { x1: 490, y1: 130, x2: 490, y2: 410, color: POWER_COLORS.britain, label: 'East African split' },
  { x1: 280, y1: 380, x2: 530, y2: 200, color: POWER_COLORS.germany, label: 'German territories' },
  { x1: 310, y1: 500, x2: 480, y2: 500, color: POWER_COLORS.belgium, label: 'Congo basin' },
  { x1: 370, y1: 150, x2: 550, y2: 330, color: POWER_COLORS.italy, label: 'Italian claims' },
];

export const BerlinHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section id="berlin-hero" ref={ref} className="relative h-[200vh]" style={{ background: BL.PRUSSIAN }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Survey grid background */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(to right, ${BL.GRID_BLUE}08 1px, transparent 1px), linear-gradient(to bottom, ${BL.GRID_BLUE}08 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        {/* Africa silhouette with multiple partition lines */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg viewBox="0 0 800 720" className="w-[70vmin] h-[70vmin]">
            {/* Africa shape — visible */}
            <motion.path
              d={AFRICA_PATH}
              fill={BL.GRID_BLUE}
              fillOpacity={0.12}
              stroke={BL.GRID_BLUE}
              strokeWidth="1"
              strokeOpacity={0.15}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, ease: 'easeOut' }}
            />

            {/* Multiple partition lines — draw sequentially */}
            {PARTITION_LINES.map((line, i) => (
              <motion.line
                key={i}
                x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                stroke={line.color}
                strokeWidth="2"
                strokeOpacity={0.7}
                strokeDasharray="8,6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1.5 + i * 0.6, ease: 'easeInOut' }}
              />
            ))}

            {/* Red "wax" dots at intersections */}
            {PARTITION_LINES.map((line, i) => {
              const cx = (line.x1 + line.x2) / 2;
              const cy = (line.y1 + line.y2) / 2;
              return (
                <motion.circle
                  key={`dot-${i}`}
                  cx={cx} cy={cy} r="4"
                  fill={BL.RED_WAX}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.8, scale: 1 }}
                  transition={{ duration: 0.4, delay: 2.5 + i * 0.6 }}
                />
              );
            })}
          </svg>
        </div>

        <div className="relative z-10 text-center max-w-4xl">
          <motion.p
            style={{ opacity: subtitleOpacity }}
            className="text-xs tracking-[0.35em] uppercase mb-6 font-body font-semibold"
          >
            <span style={{ color: BL.GRID_BLUE }}>November 1884</span>
            <span style={{ color: BL.MUTED }}> · </span>
            <span style={{ color: BL.BRASS }}>Berlin</span>
          </motion.p>

          <motion.h1
            style={{ opacity: titleOpacity }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8"
          >
            <span style={{ color: BL.VELLUM }}>The Architecture</span>
            <br />
            <span style={{ color: BL.MUTED }} className="text-3xl md:text-5xl lg:text-6xl font-normal italic">of</span>
            <br />
            <span style={{ color: BL.RED_WAX }}>Partition</span>
          </motion.h1>

          <motion.p
            style={{ opacity: subtitleOpacity }}
            className="font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            <span style={{ color: BL.GRID_BLUE }}>
              Fourteen nations sat around a table in Berlin. No African was invited.
              They drew lines on a map of a continent they had never surveyed —
              and those lines still draw blood today.
            </span>
          </motion.p>
        </div>

        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-12 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-body" style={{ color: BL.MUTED }}>
            Scroll to begin
          </span>
          <motion.div
            className="w-px h-8 origin-top"
            style={{ background: BL.MUTED }}
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};
