import React from 'react';
import { motion } from 'framer-motion';

const INK = 'hsl(25, 20%, 12%)';

export const BlackShipsSection = () => {
  return (
    <section
      id="black-ships"
      className="relative py-32 px-6 min-h-screen flex items-center"
      style={{ background: INK }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Giant date */}
        <motion.p
          className="font-display text-[120px] md:text-[200px] font-black leading-none"
          style={{ color: 'hsl(40, 25%, 95%)' }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.12, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          1853
        </motion.p>

        <motion.h2
          className="font-display text-4xl md:text-5xl font-bold -mt-16 md:-mt-24 relative z-10 mb-6"
          style={{ color: 'hsl(40, 25%, 92%)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          The Black Ships
        </motion.h2>

        <motion.div
          className="w-16 h-px mx-auto mb-8"
          style={{ background: 'hsl(5, 75%, 50%)' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />

        <motion.p
          className="font-body text-lg md:text-xl leading-relaxed max-w-xl mx-auto"
          style={{ color: 'hsl(40, 20%, 65%)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          Commodore Perry's four warships anchored in Edo Bay. Their cannon could have leveled 
          the city in hours. The Shōgun's samurai — warriors who hadn't fought a real war in 250 years — 
          could do nothing.
        </motion.p>

        <motion.p
          className="font-body text-lg leading-relaxed max-w-xl mx-auto mt-6"
          style={{ color: 'hsl(40, 20%, 55%)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          In that moment, the entire feudal system — the hierarchy, the stipends, the swords — 
          was revealed as obsolete. The question was no longer <em>whether</em> it would end, 
          but <em>how</em>.
        </motion.p>

        <motion.p
          className="font-display text-sm tracking-[0.3em] uppercase mt-12"
          style={{ color: 'hsl(5, 75%, 50%)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          Fifteen years of chaos follow
        </motion.p>
      </div>
    </section>
  );
};
