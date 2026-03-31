import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Hero — "The Bindu"
 * Enhanced: larger yantra, stronger parallax, more dramatic opening.
 */
export const KurukshetraHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const yantraScale = useTransform(scrollYProgress, [0, 0.6], [0.15, 1.2]);
  const yantraOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5], [0.05, 0.45, 0.55]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.5, 0.7], [0, 1, 1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.5, 0.7], [0, 1, 1, 0]);
  const watermarkOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 0.08]);
  const titleY = useTransform(scrollYProgress, [0.5, 0.8], [0, -60]);

  const cx = 200, cy = 200;

  // Generate rich yantra
  const yantraElements: React.ReactNode[] = [];

  // Bhupura squares
  [185, 160, 135, 110, 85].forEach((s, i) => {
    yantraElements.push(
      <motion.rect
        key={`sq-${i}`}
        x={cx - s} y={cy - s} width={s * 2} height={s * 2}
        fill="none" stroke="hsl(var(--kuru-gold))" strokeWidth={0.7 - i * 0.1}
        transform={`rotate(${i % 2 ? 45 : 0}, ${cx}, ${cy})`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2 + i * 0.4, ease: 'easeOut' }}
      />
    );
  });

  // Interlocking triangles
  [95, 75, 55, 35].forEach((r, i) => {
    const up = [0, 120, 240].map(a => {
      const rad = ((a - 90) * Math.PI) / 180;
      return `${cx + Math.cos(rad) * r},${cy + Math.sin(rad) * r}`;
    }).join(' ');
    const down = [60, 180, 300].map(a => {
      const rad = ((a - 90) * Math.PI) / 180;
      return `${cx + Math.cos(rad) * r},${cy + Math.sin(rad) * r}`;
    }).join(' ');
    yantraElements.push(
      <motion.polygon key={`tri-up-${i}`} points={up} fill="none"
        stroke="hsl(var(--kuru-gold))" strokeWidth={0.5}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.2 + i * 0.25, duration: 1 }} />,
      <motion.polygon key={`tri-dn-${i}`} points={down} fill="none"
        stroke="hsl(var(--kuru-gold))" strokeWidth={0.4}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.4 + i * 0.25, duration: 1 }} />
    );
  });

  // Lotus petals (16)
  for (let a = 0; a < 360; a += 22.5) {
    const rad = (a * Math.PI) / 180;
    const innerR = 28;
    const outerR = 50;
    const spread = Math.PI / 40;
    const tipX = cx + Math.cos(rad) * outerR;
    const tipY = cy + Math.sin(rad) * outerR;
    const lX = cx + Math.cos(rad - spread) * innerR;
    const lY = cy + Math.sin(rad - spread) * innerR;
    const rX = cx + Math.cos(rad + spread) * innerR;
    const rY = cy + Math.sin(rad + spread) * innerR;
    yantraElements.push(
      <motion.path
        key={`petal-${a}`}
        d={`M${cx},${cy} L${lX},${lY} Q${tipX},${tipY} ${rX},${rY} Z`}
        fill="none" stroke="hsl(var(--kuru-gold))" strokeWidth={0.3}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 2.5 + a * 0.003 }}
      />
    );
  }

  // Concentric circles
  [15, 22, 50, 70].forEach((r, i) => {
    yantraElements.push(
      <motion.circle key={`ring-${i}`} cx={cx} cy={cy} r={r}
        fill="none" stroke="hsl(var(--kuru-gold))" strokeWidth={0.25}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 1.8 + i * 0.2, duration: 1 }}
        style={{ transformOrigin: `${cx}px ${cy}px` }} />
    );
  });

  // Central bindu
  yantraElements.push(
    <motion.circle key="bindu" cx={cx} cy={cy} r={5}
      fill="hsl(var(--kuru-gold))"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3, duration: 1.5, type: 'spring' }} />
  );

  return (
    <section id="kuru-hero" ref={ref} className="relative h-[250vh] overflow-hidden">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-kuru-dust">
        {/* Grain */}
        <div className="kuru-grain absolute inset-0 pointer-events-none" />

        {/* Yantra SVG — now much larger */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ scale: yantraScale, opacity: yantraOpacity }}
        >
          <svg viewBox="0 0 400 400" className="w-[min(100vw,100vh)] h-[min(100vw,100vh)]">
            {yantraElements}
          </svg>
        </motion.div>

        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, hsl(var(--kuru-gold) / 0.04), transparent 50%)' }} />

        {/* Devanagari watermark */}
        <motion.span
          className="absolute font-devanagari text-[3rem] md:text-[5rem] text-kuru-gold tracking-wider select-none pointer-events-none"
          style={{ opacity: watermarkOpacity, top: '15%' }}
        >
          धर्मक्षेत्रे कुरुक्षेत्रे
        </motion.span>

        {/* Title */}
        <motion.div className="relative z-10 text-center px-6" style={{ opacity: titleOpacity, y: titleY }}>
          <h1 className="font-display text-6xl md:text-9xl font-bold tracking-[0.1em] text-kuru-kohl uppercase">
            Kurukshetra
          </h1>
          <motion.p
            className="mt-4 font-body text-xl md:text-2xl text-kuru-clay tracking-wide"
            style={{ opacity: subtitleOpacity }}
          >
            Eighteen Days at the End of an Age
          </motion.p>
        </motion.div>

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
