import React from 'react';
import { motion } from 'framer-motion';

/**
 * Epilogue — "Ash and Memory"
 * Shattered yantra fragments in ash-grey void. Faint new cycle begins.
 */
export const KurukshetraEpilogue = () => (
  <section id="kuru-epilogue" className="relative min-h-screen flex items-center justify-center overflow-hidden"
    style={{ background: 'linear-gradient(180deg, hsl(var(--kuru-dust)) 0%, hsl(30 8% 45%) 40%, hsl(30 6% 35%) 100%)' }}
  >
    {/* Shattered yantra fragments */}
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <svg viewBox="0 0 400 400" className="w-[80vh] h-[80vh] opacity-[0.04]">
        {/* Scattered, broken geometry */}
        {[
          { d: 'M180,100 L200,80 L220,100', tx: -15, ty: 8 },
          { d: 'M150,200 L170,180 L190,200 Z', tx: 20, ty: -12 },
          { d: 'M250,150 L280,140 L270,170 Z', tx: -8, ty: 15 },
          { d: 'M120,280 L145,265 L140,295 Z', tx: 10, ty: -5 },
          { d: 'M300,250 L320,235 L310,270 Z', tx: -20, ty: 10 },
          { d: 'M200,300 L180,320 L220,320 Z', tx: 5, ty: -18 },
          { d: 'M80,150 L100,130', tx: 12, ty: 8 },
          { d: 'M320,100 L340,120', tx: -10, ty: -5 },
        ].map((frag, i) => (
          <motion.path
            key={i}
            d={frag.d}
            fill="none"
            stroke="hsl(var(--kuru-gold))"
            strokeWidth={0.5}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 1 }}
            transform={`translate(${frag.tx}, ${frag.ty})`}
          />
        ))}
      </svg>
    </div>

    <div className="relative z-10 max-w-2xl px-6 text-center">
      <motion.p
        className="font-display text-sm tracking-[0.3em] uppercase text-kuru-red/50 mb-8"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      >
        Day 18 · Sunset
      </motion.p>

      <motion.p
        className="font-body text-xl md:text-2xl text-kuru-kohl/60 leading-relaxed italic"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        Of the nearly four million who marched to Kurukshetra, barely a handful survived. The Pandavas won a throne over a kingdom of widows. The Kali Yuga — the age of discord, hypocrisy, and forgetting — had begun. It has not ended.
      </motion.p>

      <motion.div
        className="mt-10 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-kuru-ash to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 1.5 }}
      />

      <motion.p
        className="mt-8 font-body text-sm text-kuru-kohl/40 leading-relaxed max-w-lg mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5 }}
      >
        Whether viewed as a historical conflict of the Iron Age or a metaphysical allegory of the internal human struggle, the Kurukshetra War remains a central pillar of the cultural and spiritual identity of the Indian subcontinent. The enduring presence of its narrative in temple stone and royal manuscripts confirms its status as one of humanity's most profound epics.
      </motion.p>

      {/* Faint new yantra beginning — the cycle continues */}
      <motion.div
        className="mt-16 flex justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2, duration: 2 }}
      >
        <svg viewBox="0 0 100 100" width={80} height={80}>
          <circle cx={50} cy={50} r={2} fill="hsl(var(--kuru-gold))" />
          <circle cx={50} cy={50} r={15} fill="none" stroke="hsl(var(--kuru-gold))" strokeWidth={0.3} />
          <rect x={35} y={35} width={30} height={30} fill="none" stroke="hsl(var(--kuru-gold))" strokeWidth={0.2} />
        </svg>
      </motion.div>
    </div>
  </section>
);
