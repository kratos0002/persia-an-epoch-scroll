import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * The Still Point — Bhagavad Gita.
 * Scroll-driven verse reveal. Large golden yantra on indigo.
 */

const VERSES = [
  { devanagari: 'कर्मण्येवाधिकारस्ते', english: 'You have a right to perform your prescribed duties,' },
  { devanagari: 'मा फलेषु कदाचन ।', english: 'but you are not entitled to the fruits of your actions.' },
  { devanagari: 'मा कर्मफलहेतुर्भूर्', english: 'Never consider yourself to be the cause of the results,' },
  { devanagari: 'मा ते सङ्गोऽस्त्वकर्मणि ॥', english: 'and never be attached to inaction.' },
];

export const GitaSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const yantraOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.03, 0.35, 0.35, 0.05]);
  const yantraScale = useTransform(scrollYProgress, [0, 0.5], [0.7, 1]);

  const cx = 200, cy = 200;

  return (
    <section id="kuru-gita" ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center bg-kuru-indigo overflow-hidden">
        {/* Large golden yantra — dominant background */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: yantraOpacity, scale: yantraScale }}
        >
          <svg viewBox="0 0 400 400" className="w-[90vh] h-[90vh]">
            {/* Bhupura (outer squares) */}
            {[180, 155, 130, 105].map((s, i) => (
              <rect key={`sq-${i}`} x={cx - s} y={cy - s} width={s * 2} height={s * 2}
                fill="none" stroke="hsl(var(--kuru-gold))" strokeWidth={0.6 - i * 0.1}
                transform={`rotate(${i % 2 ? 45 : 0}, ${cx}, ${cy})`} />
            ))}

            {/* Sri Yantra triangles */}
            {[100, 80, 60].map((r, i) => {
              const up = [0, 120, 240].map(a => {
                const rad = ((a - 90) * Math.PI) / 180;
                return `${cx + Math.cos(rad) * r},${cy + Math.sin(rad) * r}`;
              }).join(' ');
              const down = [60, 180, 300].map(a => {
                const rad = ((a - 90) * Math.PI) / 180;
                return `${cx + Math.cos(rad) * r},${cy + Math.sin(rad) * r}`;
              }).join(' ');
              return (
                <React.Fragment key={`tri-${i}`}>
                  <polygon points={up} fill="none" stroke="hsl(var(--kuru-gold))" strokeWidth={0.5} />
                  <polygon points={down} fill="none" stroke="hsl(var(--kuru-gold))" strokeWidth={0.45} />
                </React.Fragment>
              );
            })}

            {/* Lotus petals */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i / 16) * Math.PI * 2;
              const innerR = 30;
              const outerR = 48;
              const spread = Math.PI / 32;
              const tipX = cx + Math.cos(angle) * outerR;
              const tipY = cy + Math.sin(angle) * outerR;
              const lX = cx + Math.cos(angle - spread) * innerR;
              const lY = cy + Math.sin(angle - spread) * innerR;
              const rX = cx + Math.cos(angle + spread) * innerR;
              const rY = cy + Math.sin(angle + spread) * innerR;
              return (
                <path key={`petal-${i}`}
                  d={`M${cx},${cy} L${lX},${lY} Q${tipX},${tipY} ${rX},${rY} Z`}
                  fill="none" stroke="hsl(var(--kuru-gold))" strokeWidth={0.3} />
              );
            })}

            {/* Bindu */}
            <circle cx={cx} cy={cy} r={5} fill="hsl(var(--kuru-gold))" />
          </svg>
        </motion.div>

        {/* Verse reveal */}
        <div className="relative z-10 max-w-2xl px-6 text-center space-y-8">
          {VERSES.map((v, i) => {
            const start = 0.1 + i * 0.18;
            const end = start + 0.12;
            return (
              <VerseLineScroll key={i} verse={v} scrollProgress={scrollYProgress} start={start} end={end} />
            );
          })}

          {/* Citation */}
          <CitationScroll scrollProgress={scrollYProgress} />
        </div>

        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, hsl(var(--kuru-gold) / 0.04), transparent 60%)' }}
        />
      </div>
    </section>
  );
};

/* ── Helpers ── */
const VerseLineScroll = ({ verse, scrollProgress, start, end }: {
  verse: { devanagari: string; english: string };
  scrollProgress: any;
  start: number;
  end: number;
}) => {
  const opacity = useTransform(scrollProgress, [start, end, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [start, end], [30, 0]);

  return (
    <motion.div style={{ opacity, y }}>
      <p className="font-devanagari text-lg md:text-2xl text-kuru-gold/50 mb-1">
        {verse.devanagari}
      </p>
      <p className="font-body text-lg md:text-xl text-kuru-conch/85 italic leading-relaxed">
        {verse.english}
      </p>
    </motion.div>
  );
};

const CitationScroll = ({ scrollProgress }: { scrollProgress: any }) => {
  const opacity = useTransform(scrollProgress, [0.82, 0.9], [0, 1]);
  return (
    <motion.div style={{ opacity }} className="pt-6">
      <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-kuru-gold/30 to-transparent mb-4" />
      <p className="font-display text-sm tracking-[0.2em] uppercase text-kuru-gold/40">
        Bhagavad Gita · 2.47
      </p>
      <p className="mt-6 font-body text-base text-kuru-conch/50 leading-relaxed max-w-lg mx-auto">
        On the field of Kurukshetra, between two armies drawn for annihilation, Arjuna laid down his bow.
        What followed was the most consequential philosophical dialogue in Indian thought.
        This is the last moment of perfect stillness before the yantra fractures.
      </p>
    </motion.div>
  );
};
