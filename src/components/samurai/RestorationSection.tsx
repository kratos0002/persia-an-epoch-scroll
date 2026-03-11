import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ClassPyramid } from '@/components/visuals/ClassPyramid';

const INK = 'hsl(25, 20%, 12%)';
const FADED = 'hsl(30, 10%, 60%)';
const VERMILLION = 'hsl(5, 75%, 50%)';
const PAPER_ALT = 'hsl(38, 22%, 93%)';

export const RestorationSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Destabilize the pyramid as user scrolls through this section
  const destabilize = useTransform(scrollYProgress, [0.2, 0.7], [0, 0.85]);

  return (
    <section id="restoration" ref={ref} className="relative py-32 px-6" style={{ background: PAPER_ALT }}>
      <div className="max-w-4xl mx-auto">
        <motion.p
          className="font-display text-6xl md:text-8xl font-black mb-2"
          style={{ color: 'hsl(30, 10%, 85%)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          1868
        </motion.p>

        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold mb-4"
          style={{ color: INK }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          The Restoration
        </motion.h2>

        <motion.p
          className="font-body text-lg leading-relaxed max-w-2xl mb-6"
          style={{ color: FADED }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          The Meiji Restoration was not a revolution of the people — it was a coup by samurai 
          against samurai. Domains from Satsuma, Chōshū, Tosa, and Hizen overthrew the Shōgun 
          and restored the Emperor as sovereign.
        </motion.p>

        <motion.p
          className="font-body text-lg leading-relaxed max-w-2xl mb-16"
          style={{ color: FADED }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
        >
          But the reformers immediately turned on their own class. To build a modern nation-state, 
          the feudal hierarchy had to be dismantled — and they knew it.
        </motion.p>

        {/* Destabilizing pyramid */}
        <motion.div>
          <ClassPyramid destabilize={destabilize.get()} />
        </motion.div>

        {/* Use a motion value subscriber to update */}
        <DestabilizingPyramidWrapper scrollYProgress={scrollYProgress} />

        <motion.p
          className="font-body text-sm text-center mt-10 tracking-[0.15em] uppercase"
          style={{ color: VERMILLION }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Scroll to watch the hierarchy collapse
        </motion.p>
      </div>
    </section>
  );
};

/** Wrapper that subscribes to scroll progress for the pyramid */
const DestabilizingPyramidWrapper = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const destabilize = useTransform(scrollYProgress, [0.2, 0.7], [0, 0.85]);
  const [val, setVal] = React.useState(0);

  React.useEffect(() => {
    return destabilize.on('change', setVal);
  }, [destabilize]);

  return (
    <div className="mt-[-200px]">
      <ClassPyramid destabilize={val} />
    </div>
  );
};
