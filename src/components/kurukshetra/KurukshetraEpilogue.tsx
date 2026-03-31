import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Epilogue — "Ash and Memory"
 * Full-viewport shattered yantra with particle effects and heartbeat bindu.
 */
export const KurukshetraEpilogue = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const fragOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const binduOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);

  const cx = 200, cy = 200;

  // Shattered fragments
  const fragments = Array.from({ length: 18 }).map((_, i) => {
    const angle = (i / 18) * Math.PI * 2;
    const r = 60 + Math.sin(i * 7.3) * 40;
    const size = 15 + Math.sin(i * 3.1) * 10;
    const drift = 20 + Math.sin(i * 5.7) * 15;

    return {
      d: `M${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}
          L${cx + Math.cos(angle + 0.15) * (r + size)},${cy + Math.sin(angle + 0.15) * (r + size)}
          L${cx + Math.cos(angle - 0.1) * (r + size * 0.8)},${cy + Math.sin(angle - 0.1) * (r + size * 0.8)} Z`,
      driftX: Math.cos(angle) * drift,
      driftY: Math.sin(angle) * drift,
      delay: i * 0.08,
      rotation: Math.sin(i * 11) * 15,
    };
  });

  // Ember particles
  const embers = Array.from({ length: 30 }).map((_, i) => ({
    x: 50 + (Math.sin(i * 137.5) * 40),
    delay: i * 0.3,
    duration: 4 + Math.sin(i * 3) * 2,
    size: 1 + Math.sin(i * 7) * 1,
  }));

  return (
    <section
      id="kuru-epilogue"
      ref={containerRef}
      className="relative min-h-[150vh] overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(var(--kuru-dust)) 0%, hsl(30 8% 40%) 30%, hsl(25 12% 18%) 70%, hsl(20 10% 12%) 100%)',
      }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Grain */}
        <div className="absolute inset-0 kuru-grain pointer-events-none" />

        {/* Shattered yantra fragments */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: fragOpacity }}
        >
          <svg viewBox="0 0 400 400" className="w-[80vh] h-[80vh] overflow-visible">
            {fragments.map((frag, i) => (
              <motion.path
                key={i}
                d={frag.d}
                fill="none"
                stroke="hsl(var(--kuru-gold) / 0.12)"
                strokeWidth={0.5}
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 0.6, 0.3],
                  x: [0, frag.driftX],
                  y: [0, frag.driftY],
                  rotate: [0, frag.rotation],
                }}
                transition={{
                  duration: 4,
                  delay: frag.delay,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* Remnant cracks */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              return (
                <motion.line
                  key={`crack-${i}`}
                  x1={cx} y1={cy}
                  x2={cx + Math.cos(rad) * 180}
                  y2={cy + Math.sin(rad) * 180}
                  stroke="hsl(var(--kuru-red) / 0.1)"
                  strokeWidth={0.3}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, delay: 0.5 + i * 0.1 }}
                />
              );
            })}
          </svg>
        </motion.div>

        {/* Ember particles rising */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {embers.map((e, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-kuru-red/30"
              style={{
                width: e.size,
                height: e.size,
                left: `${e.x}%`,
                bottom: 0,
              }}
              animate={{
                y: [0, -window.innerHeight * 1.2],
                opacity: [0, 0.6, 0],
                x: [0, Math.sin(i * 3) * 30],
              }}
              transition={{
                duration: e.duration,
                delay: e.delay,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>

        {/* Text content */}
        <motion.div
          className="relative z-10 max-w-2xl px-6 text-center"
          style={{ opacity: textOpacity }}
        >
          <motion.p
            className="font-display text-sm tracking-[0.3em] uppercase text-kuru-red/50 mb-8"
          >
            Day 18 · Sunset
          </motion.p>

          <p className="font-body text-xl md:text-2xl text-kuru-conch/50 leading-relaxed italic">
            Of the nearly four million who marched to Kurukshetra, barely a handful survived.
            The Pandavas won a throne over a kingdom of widows.
            The Kali Yuga — the age of discord, hypocrisy, and forgetting — had begun.
            It has not ended.
          </p>

          <motion.div
            className="mt-10 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-kuru-ash/30 to-transparent"
          />

          <p className="mt-8 font-body text-sm text-kuru-conch/30 leading-relaxed max-w-lg mx-auto">
            Whether viewed as a historical conflict of the Iron Age or a metaphysical allegory
            of the internal human struggle, the Kurukshetra War remains a central pillar of the
            cultural and spiritual identity of the Indian subcontinent.
          </p>
        </motion.div>

        {/* New cycle bindu — heartbeat pulse */}
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center justify-center"
          style={{ opacity: binduOpacity }}
        >
          <motion.div
            className="w-4 h-4 rounded-full bg-kuru-gold/60"
            animate={{
              scale: [1, 1.5, 1, 1.3, 1],
              opacity: [0.6, 1, 0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute w-12 h-12 rounded-full border border-kuru-gold/20"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
          <motion.div
            className="absolute w-20 h-20 rounded-full border border-kuru-gold/10"
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.15, 0, 0.15],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 0.5,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};
