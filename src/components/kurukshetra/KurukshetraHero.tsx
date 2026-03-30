import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Hero — "The Bindu"
 * A sacred yantra radiates outward from a single point on scroll.
 */
export const KurukshetraHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const yantraScale = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const yantraOpacity = useTransform(scrollYProgress, [0, 0.3], [0.15, 0.5]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.6, 0.8], [0, 1, 1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.6, 0.8], [0, 1, 1, 0]);
  const watermarkOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 0.06]);

  // Yantra SVG: concentric squares, triangles, lotus petals, central bindu
  const yantraPaths = () => {
    const cx = 200, cy = 200;
    const elements: React.ReactNode[] = [];

    // Outer bhupura (square gate)
    [180, 150, 120].forEach((s, i) => {
      elements.push(
        <motion.rect
          key={`sq-${i}`}
          x={cx - s} y={cy - s} width={s * 2} height={s * 2}
          fill="none" stroke="hsl(var(--kuru-gold))" strokeWidth={0.8 - i * 0.15}
          transform={`rotate(${i % 2 === 0 ? 0 : 45}, ${cx}, ${cy})`}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 + i * 0.5, ease: 'easeOut' }}
        />
      );
    });

    // Inner triangles (Sri Yantra-inspired)
    const triSizes = [90, 70, 50];
    triSizes.forEach((r, i) => {
      const up = [0, 120, 240].map(a => {
        const rad = ((a - 90) * Math.PI) / 180;
        return `${cx + Math.cos(rad) * r},${cy + Math.sin(rad) * r}`;
      }).join(' ');
      const down = [60, 180, 300].map(a => {
        const rad = ((a - 90) * Math.PI) / 180;
        return `${cx + Math.cos(rad) * r},${cy + Math.sin(rad) * r}`;
      }).join(' ');
      elements.push(
        <motion.polygon key={`tri-up-${i}`} points={up} fill="none" stroke="hsl(var(--kuru-gold))" strokeWidth={0.6}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 + i * 0.3 }} />,
        <motion.polygon key={`tri-dn-${i}`} points={down} fill="none" stroke="hsl(var(--kuru-gold))" strokeWidth={0.5}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 + i * 0.3 }} />
      );
    });

    // Lotus petals (8)
    for (let a = 0; a < 360; a += 45) {
      const rad = (a * Math.PI) / 180;
      const px = cx + Math.cos(rad) * 35;
      const py = cy + Math.sin(rad) * 35;
      const c1x = cx + Math.cos(rad - 0.3) * 55;
      const c1y = cy + Math.sin(rad - 0.3) * 55;
      const c2x = cx + Math.cos(rad + 0.3) * 55;
      const c2y = cy + Math.sin(rad + 0.3) * 55;
      elements.push(
        <motion.path
          key={`petal-${a}`}
          d={`M${cx},${cy} Q${c1x},${c1y} ${px},${py} Q${c2x},${c2y} ${cx},${cy}`}
          fill="none" stroke="hsl(var(--kuru-gold))" strokeWidth={0.4}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 2 + a * 0.005 }}
        />
      );
    }

    // Central bindu
    elements.push(
      <motion.circle key="bindu" cx={cx} cy={cy} r={4} fill="hsl(var(--kuru-gold))"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }} />
    );

    return elements;
  };

  return (
    <section id="kuru-hero" ref={ref} className="relative h-[200vh] overflow-hidden">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-kuru-dust">
        {/* Grain overlay */}
        <div className="kuru-grain absolute inset-0 pointer-events-none" />

        {/* Yantra SVG */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ scale: yantraScale, opacity: yantraOpacity }}
        >
          <svg viewBox="0 0 400 400" className="w-[min(90vw,90vh)] h-[min(90vw,90vh)]">
            {yantraPaths()}
          </svg>
        </motion.div>

        {/* Devanagari watermark */}
        <motion.span
          className="absolute font-devanagari text-[2.5rem] md:text-[4rem] text-kuru-gold tracking-wider select-none pointer-events-none"
          style={{ opacity: watermarkOpacity, top: '18%' }}
        >
          धर्मक्षेत्रे कुरुक्षेत्रे
        </motion.span>

        {/* Title */}
        <div className="relative z-10 text-center px-6">
          <motion.h1
            className="font-display text-5xl md:text-8xl font-bold tracking-[0.08em] text-kuru-kohl uppercase"
            style={{ opacity: titleOpacity }}
          >
            Kurukshetra
          </motion.h1>
          <motion.p
            className="mt-4 font-body text-xl md:text-2xl text-kuru-clay tracking-wide"
            style={{ opacity: subtitleOpacity }}
          >
            Eighteen Days at the End of an Age
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-kuru-ash">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 20 20" className="text-kuru-ash">
            <path d="M4,7 L10,13 L16,7" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};
