import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Simplified undivided India silhouette
const INDIA_PATH = "M180,20 C170,25 160,35 155,50 L150,70 C145,85 140,95 130,105 L120,115 C110,125 105,135 100,150 L95,165 C90,180 85,195 80,210 L75,225 C70,240 65,255 60,270 L55,285 C50,300 50,315 55,330 L60,345 C65,360 70,375 80,385 L90,395 C100,405 110,415 120,420 L135,425 C145,428 155,430 165,432 L175,434 C185,436 195,438 205,440 L215,442 C225,440 235,438 245,434 L255,430 C265,425 275,418 285,410 L295,400 C305,388 310,375 315,360 L318,345 C320,330 322,315 320,300 L318,285 C315,270 310,255 305,240 L298,225 C292,210 285,198 278,188 L270,178 C262,168 255,160 248,152 L240,145 C232,138 225,132 218,125 L212,118 C208,112 205,105 202,95 L200,85 C198,70 195,55 190,40 L185,30 C183,25 181,22 180,20 Z";

export const RadcliffeHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const lineLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.6, 1], [1, 0]);

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
        {/* India silhouette with the line drawing itself */}
        <div className="relative w-[300px] h-[360px] mx-auto mb-12">
          <svg viewBox="40 10 280 440" className="w-full h-full">
            <path d={INDIA_PATH} fill="hsl(215 30% 62% / 0.08)" stroke="hsl(215 30% 62% / 0.2)" strokeWidth="1" />
            {/* The Radcliffe Line — drawing itself */}
            <motion.line
              x1="180" y1="50" x2="180" y2="440"
              stroke="hsl(355 70% 45%)"
              strokeWidth="1.5"
              strokeDasharray="1"
              pathLength="1"
              style={{ pathLength: lineLength, strokeDashoffset: 0 }}
            />
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
