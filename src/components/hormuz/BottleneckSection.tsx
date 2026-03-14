import React from 'react';
import { motion } from 'framer-motion';
import { OilFlowGauge } from '@/components/visuals/OilFlowGauge';
import { StraitZoomMap } from '@/components/visuals/StraitZoomMap';

const NAVY = 'hsl(215, 45%, 8%)';
const TEAL = 'hsl(195, 55%, 35%)';
const AMBER = 'hsl(35, 80%, 50%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';

export const BottleneckSection = () => {
  return (
    <section id="bottleneck" className="relative" style={{ background: NAVY }}>
      {/* Opening — Oil flow gauge as hero visual */}
      <div className="relative h-screen flex flex-col items-center justify-center px-6">
        {/* Background glow */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 30% at 50% 50%, hsla(35, 80%, 50%, 0.04), transparent)' }} />

        <motion.div
          className="relative z-10 w-full max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4 text-center" style={{ color: AMBER }}>
            Today — The 21-Mile Bottleneck
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-black leading-[0.95] mb-10 text-center" style={{ color: PARCHMENT }}>
            One fifth of the world's <span style={{ color: AMBER }}>oil.</span>
          </h2>

          <OilFlowGauge />
        </motion.div>
      </div>

      {/* The strait zoom map — the signature visual */}
      <StraitZoomMap />

      {/* Brief floating context after the map */}
      <div className="relative h-screen flex items-center justify-center px-8">
        <motion.div
          className="max-w-md p-8 rounded-xl backdrop-blur-md text-center"
          style={{ background: 'hsla(215, 45%, 8%, 0.8)', border: `1px solid hsla(195, 55%, 35%, 0.1)` }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-sm leading-relaxed mb-4" style={{ color: SMOKE }}>
            The US Fifth Fleet is permanently stationed in Bahrain.
            Iran's Revolutionary Guard operates fast attack boats in the strait.
          </p>
          <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
            Both sides know: close Hormuz, even briefly,
            and the global economy <strong style={{ color: TEAL }}>shudders</strong>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
