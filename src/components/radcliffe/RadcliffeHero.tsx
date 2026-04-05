import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Geographically accurate outlines derived from Natural Earth data
// Scaled to fit viewBox="0 0 400 500"

const INDIA_PATH =
  "M215.6 162.8L200.4 154.9L189.2 147.7L183.5 135.1L190.8 136.7L189.8 130.8" +
  "L184.4 124.8L182.9 115.5L169.3 102.0L162.6 111.7L152.3 113.5L137.1 110.6" +
  "L133.6 115.7L139.4 125.7L144.6 133.5L153.6 139.1L147.0 145.7L148.8 153.8" +
  "L141.7 165.1L138.0 176.8L129.9 188.9L118.4 188.0L109.6 199.8L116.7 205.0" +
  "L119.1 213.9L125.4 219.6L128.6 229.5L107.0 229.5L101.3 237.1L114.0 246.8" +
  "L117.5 251.3L113.1 255.4L127.5 269.2L134.7 270.7L148.4 263.8L151.4 274.5" +
  "L152.9 288.5L157.4 303.0L163.9 325.2L174.3 341.0L176.6 348.0L180.2 362.4" +
  "L186.3 373.4L190.3 378.8L194.8 390.3L200.4 406.3L210.2 417.1L214.2 413.8" +
  "L217.3 405.9L226.3 402.7L223.0 398.9L227.0 390.3L232.2 389.7L230.9 370.3" +
  "L234.3 359.3L233.1 349.8L229.7 335.1L231.8 326.2L236.3 325.7L245.0 321.6" +
  "L249.6 318.7L249.1 313.5L258.1 305.9L264.7 298.7L274.3 285.2L287.6 277.7" +
  "L291.9 270.9L290.3 262.2L302.1 259.9L308.8 260.1L309.7 255.8L306.8 246.4" +
  "L302.1 237.8L302.9 230.9L296.2 227.9L297.6 223.7L303.2 219.4L294.9 213.3" +
  "L297.1 205.6L305.7 210.4L310.6 211.2L312.7 219.1L322.5 220.7L331.4 220.5" +
  "L337.6 222.5L334.7 232.0L330.4 232.7L328.4 239.2L334.7 245.1L335.0 238.0" +
  "L337.7 237.8L345.8 255.9L350.1 253.2L348.5 248.4L350.1 244.6L348.5 232.7" +
  "L356.8 235.3L359.5 225.9L359.0 220.3L362.7 210.6L361.1 204.1L372.1 196.2" +
  "L379.5 198.2L377.1 191.2L380.0 189.0L378.4 184.7L367.4 183.1L369.6 178.3" +
  "L363.3 171.2L357.5 175.9L348.7 173.2L339.2 180.4L332.2 189.0L324.6 190.5" +
  "L329.5 194.1L330.2 201.1L322.3 201.4L313.8 200.7L308.1 202.5L298.2 198.0" +
  "L297.6 195.9L294.9 186.7L289.6 189.2L289.7 194.1L292.4 201.4L292.2 205.9" +
  "L284.0 206.1L271.7 203.4L264.0 202.3L257.2 196.6L243.5 195.0L229.7 188.7" +
  "L219.2 183.1L209.0 178.6L210.6 168.0L215.6 162.8Z";

const PAKISTAN_PATH =
  "M169.3 102.0L152.3 97.3L147.1 88.3L138.7 82.9L133.6 84.2L129.3 86.4" +
  "L118.9 87.8L109.4 90.1L105.1 95.2L108.5 100.2L111.0 106.0L107.4 110.8" +
  "L108.8 115.3L107.2 119.5L98.0 119.1L103.4 126.6L98.0 129.5L95.3 136.4" +
  "L97.3 143.2L94.3 146.4L90.5 145.3L83.3 147.0L82.9 150.0L75.7 150.0" +
  "L71.6 156.5L73.0 166.2L61.2 170.9L54.3 170.0L52.7 172.5L46.8 171.1" +
  "L37.3 172.7L20.0 166.9L25.8 172.9L30.8 179.9L40.9 184.7L42.7 195.0" +
  "L47.5 196.8L49.1 202.0L35.8 207.9L33.7 221.2L47.3 219.6L63.3 219.4" +
  "L81.1 217.3L90.0 225.9L93.7 234.2L101.3 237.1L107.0 229.5L128.6 229.5" +
  "L125.4 219.6L119.1 213.9L116.7 205.0L109.6 199.8L118.4 188.0L129.9 188.9" +
  "L138.0 176.8L141.7 165.1L148.8 153.8L147.0 145.7L153.6 139.1L144.6 133.5" +
  "L139.4 125.7L133.6 115.7L137.1 110.6L152.3 113.5L162.6 111.7L169.3 102.0Z";

// The Radcliffe Line — shared border from Kashmir south through Punjab to Sindh/Gujarat
const RADCLIFFE_LINE =
  "M169.3 102.0L162.6 111.7L152.3 113.5L137.1 110.6L133.6 115.7L139.4 125.7" +
  "L144.6 133.5L153.6 139.1L147.0 145.7L148.8 153.8L141.7 165.1L138.0 176.8" +
  "L129.9 188.9L118.4 188.0L109.6 199.8L116.7 205.0L119.1 213.9L125.4 219.6" +
  "L128.6 229.5L107.0 229.5L101.3 237.1";

// Key cities near the border
const CITIES = [
  { name: 'Lahore', x: 138, y: 140, side: 'pakistan' as const },
  { name: 'Amritsar', x: 155, y: 138, side: 'india' as const },
  { name: 'Delhi', x: 200, y: 155, side: 'india' as const },
  { name: 'Karachi', x: 68, y: 218, side: 'pakistan' as const },
  { name: 'Calcutta', x: 310, y: 212, side: 'india' as const },
];

export const RadcliffeHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const lineLength = useTransform(scrollYProgress, [0.05, 0.6], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.6, 1], [1, 0]);

  // Countries tint as line draws
  const fillOpacity = useTransform(scrollYProgress, [0.15, 0.55], [0.04, 0.14]);
  // Labels fade in after line is partly drawn
  const labelsOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 0.8]);

  return (
    <section ref={ref} className="relative min-h-[120vh] flex items-center justify-center overflow-hidden radcliffe-bg radcliffe-survey-grid radcliffe-grain">
      {/* Confidential header */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 font-survey text-[0.6rem] tracking-[0.4em] text-radcliffe-grid/60 uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Boundary Commission — Confidential
      </motion.div>

      <motion.div className="text-center relative z-10 px-4" style={{ opacity }}>
        {/* India + Pakistan map with Radcliffe Line */}
        <div className="relative w-[340px] h-[400px] md:w-[400px] md:h-[460px] mx-auto mb-10">
          <svg viewBox="0 60 400 400" className="w-full h-full">
            <defs>
              <filter id="line-glow">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Pakistan — green tint */}
            <motion.path
              d={PAKISTAN_PATH}
              fill="hsl(150 35% 35%)"
              stroke="hsl(150 25% 50% / 0.25)"
              strokeWidth="0.8"
              style={{ fillOpacity }}
            />

            {/* India — saffron tint */}
            <motion.path
              d={INDIA_PATH}
              fill="hsl(25 65% 50%)"
              stroke="hsl(25 40% 50% / 0.25)"
              strokeWidth="0.8"
              style={{ fillOpacity }}
            />

            {/* The Radcliffe Line — draws on scroll */}
            <motion.path
              d={RADCLIFFE_LINE}
              fill="none"
              stroke="hsl(355 70% 45%)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#line-glow)"
              pathLength="1"
              style={{
                pathLength: lineLength,
                strokeDasharray: 1,
                strokeDashoffset: 0,
              }}
            />

            {/* City markers + labels */}
            <motion.g style={{ opacity: labelsOpacity }}>
              {CITIES.map((city) => {
                const color = city.side === 'india'
                  ? 'hsl(25 55% 45%)'
                  : 'hsl(150 35% 40%)';
                return (
                  <g key={city.name}>
                    <circle cx={city.x} cy={city.y} r="2" fill={color} opacity="0.7" />
                    <text
                      x={city.x + 5}
                      y={city.y + 1}
                      fill={color}
                      fontSize="6"
                      fontFamily="'survey', ui-monospace, monospace"
                      fontWeight="500"
                      opacity="0.8"
                    >
                      {city.name}
                    </text>
                  </g>
                );
              })}

              {/* Country labels */}
              <text
                x="65" y="145"
                fill="hsl(150 30% 40%)"
                fontSize="9"
                fontFamily="'survey', ui-monospace, monospace"
                letterSpacing="0.2em"
                fontWeight="600"
                opacity="0.5"
              >
                PAKISTAN
              </text>
              <text
                x="230" y="280"
                fill="hsl(25 50% 45%)"
                fontSize="9"
                fontFamily="'survey', ui-monospace, monospace"
                letterSpacing="0.2em"
                fontWeight="600"
                opacity="0.5"
              >
                INDIA
              </text>
            </motion.g>
          </svg>
        </div>

        <motion.h1
          className="font-display text-5xl md:text-7xl font-bold tracking-[0.08em] text-radcliffe-ink uppercase"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          The Radcliffe Line
        </motion.h1>

        <motion.p
          className="mt-6 font-survey text-sm md:text-base tracking-[0.15em] text-radcliffe-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          36 Days to Sever a Subcontinent
        </motion.p>

        {/* 36-day calendar strip preview */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-[3px] max-w-[240px] mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              className="w-[28px] h-[28px] border border-radcliffe-grid/20 bg-radcliffe-cream/50"
            />
          ))}
        </motion.div>

        <motion.p
          className="mt-4 font-survey text-[0.6rem] tracking-[0.3em] text-radcliffe-grid/40 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          July 8 — August 13, 1947
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-[1px] h-12 bg-radcliffe-grid/30" />
      </motion.div>
    </section>
  );
};
