import React from 'react';
import { motion } from 'framer-motion';

export const SurfaceSection: React.FC = () => (
  <section id="surface" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'hsl(200, 15%, 75%)' }}>
    {/* City skyline silhouette */}
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
      <svg viewBox="0 0 1200 300" className="w-full h-auto" preserveAspectRatio="xMidYMax meet">
        {/* Minarets and domes */}
        <path d="M0,300 L0,200 L50,200 L50,180 L55,120 L57,180 L60,180 L60,200 L120,200 L140,160 Q160,130 180,160 L200,200 L250,200 L250,180 L255,100 L257,180 L260,180 L260,200 L350,200 L370,170 Q400,140 430,170 L450,200 L500,200 L510,150 Q530,120 550,150 L560,200 L650,200 L650,180 L655,90 L657,180 L660,180 L660,200 L750,200 L770,160 Q800,130 830,160 L850,200 L950,200 L960,170 Q980,140 1000,170 L1010,200 L1050,200 L1050,180 L1055,110 L1057,180 L1060,180 L1060,200 L1200,200 L1200,300 Z" fill="hsl(200, 12%, 35%)" opacity="0.6" />
        <path d="M0,300 L0,230 L100,230 L120,210 Q140,190 160,210 L180,230 L300,230 L320,200 Q340,180 360,200 L380,230 L500,230 L520,210 Q540,190 560,210 L580,230 L700,230 L720,200 Q740,180 760,200 L780,230 L900,230 L920,210 Q940,195 960,210 L980,230 L1200,230 L1200,300 Z" fill="hsl(200, 10%, 28%)" opacity="0.8" />
      </svg>
    </div>

    {/* Grain overlay */}
    <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat', backgroundSize: '128px',
    }} />

    <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
      <motion.p
        className="text-[10px] tracking-[0.4em] uppercase font-body font-semibold mb-6"
        style={{ color: 'hsl(200, 10%, 40%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        An Archaeological Dig Through Time
      </motion.p>

      <motion.h1
        className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8"
        style={{ color: 'hsl(200, 15%, 15%)' }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Constantinople
      </motion.h1>

      <motion.p
        className="font-display text-xl md:text-2xl italic mb-6"
        style={{ color: 'hsl(200, 10%, 35%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        The City of Layers
      </motion.p>

      <motion.p
        className="font-body text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-12"
        style={{ color: 'hsl(200, 10%, 40%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
      >
        15 million people live above 2,700 years of buried civilizations.
        Greek, Roman, Byzantine, Crusader, Ottoman — each built on the bones of the last.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold" style={{ color: 'hsl(25, 30%, 40%)' }}>
          Scroll to dig
        </span>
        <motion.span
          className="text-2xl"
          style={{ color: 'hsl(25, 30%, 45%)' }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          ⛏
        </motion.span>
      </motion.div>
    </div>
  </section>
);
