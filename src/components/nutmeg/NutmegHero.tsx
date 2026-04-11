import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NM } from './nutmegTheme';
import { VOCSeal } from './VOCSeal';
import { NutmegCompassRose } from './NutmegCompassRose';

export const NutmegHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

  return (
    <section id="nutmeg-hero" ref={ref} className="relative h-[130vh]">
      <div
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(145deg, ${NM.TIMBER} 0%, hsl(20, 28%, 16%) 40%, hsl(18, 22%, 12%) 100%)`,
        }}
      >
        {/* Leather grain texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Embossed border frame */}
        <div
          className="absolute inset-8 md:inset-16 pointer-events-none rounded-sm"
          style={{
            border: `2px solid ${NM.GOLD}25`,
            boxShadow: `inset 0 0 60px ${NM.TIMBER}44, 0 0 40px ${NM.TIMBER}22`,
          }}
        />

        {/* Inner decorative border */}
        <div
          className="absolute inset-12 md:inset-20 pointer-events-none rounded-sm"
          style={{
            border: `1px solid ${NM.GOLD}15`,
          }}
        />

        {/* Compass rose - top left */}
        <div className="absolute top-16 left-16 md:top-24 md:left-24 pointer-events-none">
          <NutmegCompassRose size={140} color={NM.GOLD} />
        </div>

        {/* VOC seal watermark */}
        <div className="absolute bottom-20 right-16 md:bottom-28 md:right-28 pointer-events-none opacity-30">
          <VOCSeal size={100} color={NM.GOLD} />
        </div>

        {/* Title content */}
        <motion.div className="relative z-10 text-center px-6 max-w-3xl" style={{ opacity: titleOpacity, y: titleY }}>
          <motion.p
            className="text-[10px] tracking-[0.5em] uppercase font-body font-semibold mb-8"
            style={{ color: NM.GOLD }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Essay XI · A Captain's Log
          </motion.p>

          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6"
            style={{ color: NM.CREAM }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            The Spice That<br />
            <em className="italic" style={{ color: NM.AMBER }}>Built Empires</em>
          </motion.h1>

          <motion.div
            className="w-24 h-px mx-auto mb-6"
            style={{ background: NM.GOLD }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />

          <motion.p
            className="font-body text-lg md:text-xl max-w-lg mx-auto leading-relaxed italic"
            style={{ color: `${NM.CREAM}aa` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            One seed. Ten thousand dead. And a trade that shaped the modern world.
          </motion.p>
        </motion.div>

        {/* Scroll prompt */}
        <motion.div
          className="absolute bottom-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-body" style={{ color: NM.CREAM }}>
            Open the log
          </span>
          <motion.div
            className="w-px h-8 origin-top"
            style={{ background: NM.GOLD }}
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};
