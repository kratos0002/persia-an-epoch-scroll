import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ClassPyramid } from '@/components/visuals/ClassPyramid';

const INK = 'hsl(25, 20%, 12%)';
const FADED = 'hsl(30, 10%, 60%)';
const PAPER_ALT = 'hsl(38, 22%, 93%)';

export const FrozenSocietySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const pyramidOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  return (
    <section id="frozen-society" ref={ref} className="relative py-32 px-6" style={{ background: PAPER_ALT }}>
      <div className="max-w-4xl mx-auto">
        {/* Date stamp */}
        <motion.p
          className="font-display text-6xl md:text-8xl font-black mb-2"
          style={{ color: 'hsl(30, 10%, 85%)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          1603
        </motion.p>

        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold mb-4"
          style={{ color: INK }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          The Frozen Society
        </motion.h2>

        <motion.p
          className="font-body text-lg leading-relaxed max-w-2xl mb-12"
          style={{ color: FADED }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Tokugawa Ieyasu unified Japan and froze it. For 260 years, every person knew their place.
          You were born into your class and you died in it. The social hierarchy was not a ladder — 
          it was a cage with no doors.
        </motion.p>

        {/* Class Pyramid */}
        <motion.div style={{ opacity: pyramidOpacity }}>
          <ClassPyramid destabilize={0} />
        </motion.div>

        <motion.div
          className="mt-16 grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-6 rounded-sm" style={{ background: 'hsl(40, 25%, 95%)', border: '1px solid hsl(30, 15%, 85%)' }}>
            <p className="font-display text-sm font-bold mb-2" style={{ color: INK }}>The Paradox of the Samurai</p>
            <p className="font-body text-sm leading-relaxed" style={{ color: FADED }}>
              Warriors in a time of peace. Sword-bearers with no wars to fight. By the 1700s, most samurai 
              were bureaucrats, teachers, or simply idle — collecting rice stipends for service they never rendered. 
              The stipend was their identity, their purpose, and eventually their prison.
            </p>
          </div>
          <div className="p-6 rounded-sm" style={{ background: 'hsl(40, 25%, 95%)', border: '1px solid hsl(30, 15%, 85%)' }}>
            <p className="font-display text-sm font-bold mb-2" style={{ color: INK }}>The Numbers</p>
            <p className="font-body text-sm leading-relaxed" style={{ color: FADED }}>
              Samurai comprised roughly 6–7% of the population — about 2 million people including families.
              They consumed 25–30% of the national rice harvest. A class defined not by what they did, 
              but by what they were entitled to receive.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
