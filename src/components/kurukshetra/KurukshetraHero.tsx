import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import krishnaImg from '@/assets/krishna-sarathi.jpeg';

/**
 * Hero — "The Bindu"
 * Layered reveal: geometric yantra visible on load → Krishna charioteer
 * emerges on scroll as the cosmic narrows to the human drama.
 */
export const KurukshetraHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Yantra: visible on load, expands and fades as image emerges
  const yantraScale = useTransform(scrollYProgress, [0, 0.6], [0.6, 2.2]);
  const yantraOpacity = useTransform(scrollYProgress, [0, 0.12, 0.35, 0.55], [0.25, 0.4, 0.25, 0]);

  // Krishna image: begins appearing early, holds strong, fades at very end
  const imageOpacity = useTransform(scrollYProgress, [0.15, 0.4, 0.8, 1], [0, 1, 1, 0]);
  const imageScale = useTransform(scrollYProgress, [0.15, 0.55], [1.08, 1]);

  // Title: visible from the start, holds, fades with image
  const titleOpacity = useTransform(scrollYProgress, [0, 0.08, 0.55, 0.75], [0.9, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.8], [0, -50]);

  // Subtitle: slight delay
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.12, 0.5, 0.68], [0, 1, 1, 0]);

  // Devanagari watermark
  const watermarkOpacity = useTransform(scrollYProgress, [0.05, 0.25, 0.5], [0, 0.07, 0.03]);

  // Vignette darkens as image appears
  const vignetteOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 0.55]);


  const cx = 200, cy = 200;

  // ── Yantra geometry ──
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
    <section id="kuru-hero" ref={ref} className="relative h-[140vh] overflow-hidden">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-kuru-dust">

        {/* Grain texture */}
        <div className="kuru-grain absolute inset-0 pointer-events-none z-[5]" />

        {/* Krishna charioteer — emerges on scroll */}
        <motion.div
          className="absolute inset-0 z-[1]"
          style={{ opacity: imageOpacity, scale: imageScale }}
        >
          <img
            src={krishnaImg}
            alt="Krishna as charioteer at Kurukshetra"
            className="h-full w-full object-cover"
            style={{ objectPosition: 'center center' }}
          />
          {/* Edge blend — minimal, lets the painting breathe */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                linear-gradient(to bottom, transparent 88%, hsl(35 28% 82%) 100%),
                linear-gradient(to right, hsl(35 28% 82% / 0.15) 0%, transparent 5%, transparent 95%, hsl(35 28% 82% / 0.15) 100%)
              `,
            }}
          />
        </motion.div>

        {/* Vignette — frames the image, doesn't overpower */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            opacity: vignetteOpacity,
            background: 'radial-gradient(ellipse at center, transparent 40%, hsl(25 18% 10% / 0.4) 100%)',
          }}
        />

        {/* Yantra SVG — visible on load, expands and dissolves */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-[3]"
          style={{ scale: yantraScale, opacity: yantraOpacity }}
        >
          <svg viewBox="0 0 400 400" className="w-[min(90vw,90vh)] h-[min(90vw,90vh)]">
            {yantraElements}
          </svg>
        </motion.div>

        {/* Radial glow behind yantra */}
        <div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{ background: 'radial-gradient(circle at center, hsl(var(--kuru-gold) / 0.06), transparent 50%)' }}
        />

        {/* Devanagari watermark */}
        <motion.span
          className="absolute font-devanagari text-[2.5rem] md:text-[4rem] text-kuru-gold tracking-wider select-none pointer-events-none z-[4]"
          style={{ opacity: watermarkOpacity, top: '12%' }}
        >
          धर्मक्षेत्रे कुरुक्षेत्रे
        </motion.span>

        {/* Title block — visible immediately */}
        <motion.div className="relative z-[6] text-center px-6" style={{ opacity: titleOpacity, y: titleY }}>
          <motion.p
            className="font-body text-xs md:text-sm tracking-[0.4em] uppercase text-kuru-ash mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            An Epoch Scroll
          </motion.p>
          <motion.h1
            className="font-display text-6xl md:text-9xl font-bold tracking-[0.08em] text-kuru-kohl uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1.2 }}
            style={{
              textShadow: '0 2px 30px hsl(35 28% 82% / 0.8)',
            }}
          >
            Kurukshetra
          </motion.h1>
          <motion.p
            className="mt-3 font-body text-lg md:text-2xl text-kuru-clay tracking-wide italic"
            style={{ opacity: subtitleOpacity }}
          >
            Eighteen Days at the End of an Age
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[6]"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        >
          <span className="font-body text-[10px] tracking-[0.35em] uppercase text-kuru-ash/70">Scroll</span>
          <svg width="18" height="18" viewBox="0 0 20 20" className="text-kuru-ash/50">
            <path d="M4,7 L10,13 L16,7" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};
