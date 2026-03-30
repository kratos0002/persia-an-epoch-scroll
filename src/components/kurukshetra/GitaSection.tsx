import React from 'react';
import { motion } from 'framer-motion';

/**
 * The Still Point — Bhagavad Gita moment.
 * Perfect yantra, no scroll effects. Gold on Indigo.
 */
export const GitaSection = () => (
  <section id="kuru-gita" className="relative min-h-screen flex items-center justify-center bg-kuru-indigo overflow-hidden">
    {/* Faint yantra background — perfectly still */}
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <svg viewBox="0 0 400 400" className="w-[80vh] h-[80vh] opacity-[0.06]">
        {[180, 150, 120, 90].map((s, i) => (
          <rect key={i} x={200 - s} y={200 - s} width={s * 2} height={s * 2}
            fill="none" stroke="hsl(var(--kuru-gold))" strokeWidth={0.5}
            transform={`rotate(${i % 2 ? 45 : 0}, 200, 200)`} />
        ))}
        {[0, 120, 240].map(a => {
          const r = 100;
          const pts = [a, a + 120, a + 240].map(ang => {
            const rad = ((ang - 90) * Math.PI) / 180;
            return `${200 + Math.cos(rad) * r},${200 + Math.sin(rad) * r}`;
          }).join(' ');
          return <polygon key={a} points={pts} fill="none" stroke="hsl(var(--kuru-gold))" strokeWidth={0.4} />;
        })}
        <circle cx={200} cy={200} r={5} fill="hsl(var(--kuru-gold))" />
      </svg>
    </div>

    <div className="relative z-10 max-w-2xl px-6 text-center">
      <motion.p
        className="font-devanagari text-lg md:text-2xl text-kuru-gold/60 mb-6"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        कर्मण्येवाधिकारस्ते मा फलेषु कदाचन
      </motion.p>

      <motion.blockquote
        className="font-body text-xl md:text-2xl text-kuru-conch/90 leading-relaxed italic"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results, and never be attached to inaction."
      </motion.blockquote>

      <motion.p
        className="mt-6 font-display text-sm tracking-[0.2em] uppercase text-kuru-gold/40"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        Bhagavad Gita · 2.47
      </motion.p>

      <motion.div
        className="mt-12 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-kuru-gold/30 to-transparent"
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 1 }}
      />

      <motion.p
        className="mt-8 font-body text-base md:text-lg text-kuru-conch/60 leading-relaxed max-w-lg mx-auto"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 1.5 }}
      >
        On the field of Kurukshetra, between two armies drawn up for annihilation, Arjuna laid down his bow. What followed was the most consequential philosophical dialogue in Indian thought — a conversation between a warrior paralysed by moral crisis and a divine charioteer who answered with the architecture of duty itself. This is the last moment of perfect stillness before the yantra fractures.
      </motion.p>
    </div>
  </section>
);
