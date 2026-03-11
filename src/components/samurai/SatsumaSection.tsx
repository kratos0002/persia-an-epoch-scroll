import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const INK = 'hsl(25, 20%, 12%)';
const VERMILLION = 'hsl(5, 75%, 50%)';

const useCounter = (end: number, duration = 2000, trigger = false) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const start = Date.now();
    const timer = setInterval(() => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setVal(Math.floor(end * (1 - Math.pow(1 - p, 3))));
      if (p >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, end, duration]);
  return val;
};

export const SatsumaSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const rebels = useCounter(30000, 2000, inView);
  const conscripts = useCounter(300000, 2500, inView);

  return (
    <section
      id="satsuma"
      ref={ref}
      className="relative py-32 px-6 min-h-screen flex items-center"
      style={{ background: INK }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          className="font-display text-[100px] md:text-[180px] font-black leading-none"
          style={{ color: 'hsl(40, 25%, 95%)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.08 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          1877
        </motion.p>

        <motion.h2
          className="font-display text-4xl md:text-5xl font-bold -mt-16 md:-mt-20 relative z-10 mb-10"
          style={{ color: 'hsl(40, 25%, 92%)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          The Last Stand
        </motion.h2>

        {/* Counter comparison */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12">
          <div>
            <p
              className="font-display text-5xl md:text-7xl font-black tabular-nums"
              style={{ color: VERMILLION }}
            >
              {rebels.toLocaleString()}
            </p>
            <p className="font-body text-sm mt-2" style={{ color: 'hsl(40, 20%, 55%)' }}>
              Samurai rebels
            </p>
          </div>

          <p className="font-display text-3xl" style={{ color: 'hsl(40, 20%, 35%)' }}>vs.</p>

          <div>
            <p
              className="font-display text-5xl md:text-7xl font-black tabular-nums"
              style={{ color: 'hsl(40, 25%, 92%)' }}
            >
              {conscripts.toLocaleString()}
            </p>
            <p className="font-body text-sm mt-2" style={{ color: 'hsl(40, 20%, 55%)' }}>
              Conscript soldiers
            </p>
          </div>
        </div>

        <motion.p
          className="font-body text-lg md:text-xl leading-relaxed max-w-xl mx-auto"
          style={{ color: 'hsl(40, 20%, 60%)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Saigō Takamori led the last samurai revolt. His warriors — the finest swordsmen in Japan — 
          were cut down by peasant conscripts with Gatling guns. The Satsuma Rebellion lasted 
          eight months. It was the last war the samurai would ever fight.
        </motion.p>

        <motion.p
          className="font-body text-base mt-8 max-w-md mx-auto"
          style={{ color: 'hsl(40, 20%, 45%)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          The class that had ruled Japan for 700 years didn't end with a last stand. 
          The last stand was merely the punctuation. The sentence had already been written — 
          in ledgers, bonds, and government memos.
        </motion.p>
      </div>
    </section>
  );
};
