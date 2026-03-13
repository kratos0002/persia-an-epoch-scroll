import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { EditionColophon } from '@/components/scroll/EditionColophon';

const BURNT = 'hsl(15, 75%, 50%)';

export const MongolIndiaEpilogue = () => (
  <section id="mi-epilogue" className="relative py-32 md:py-48 px-6 overflow-hidden">
    {/* Subtle glow */}
    <div
      className="absolute inset-0 opacity-20"
      style={{
        background: `radial-gradient(ellipse at center, ${BURNT}, transparent 70%)`,
      }}
    />

    <div className="relative max-w-3xl mx-auto text-center">
      <RevealOnScroll>
        <motion.div
          className="w-16 h-px mx-auto mb-12"
          style={{ background: BURNT }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        <h2 className="font-display text-3xl md:text-5xl font-bold mb-10 leading-tight" style={{ color: 'hsl(40, 25%, 90%)' }}>
          Baghdad fell.<br />
          <span style={{ color: BURNT }}>Delhi held.</span>
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={0.15}>
        <p className="font-body text-lg md:text-xl leading-relaxed mb-8" style={{ color: 'hsl(40, 25%, 75%)' }}>
          The difference was not fate. It was not divine intervention. It was not
          racial superiority. It was geography that bought time, a single ruler's
          ruthless preparation, and a military machine built specifically to
          counter the most effective fighting force the world had ever seen.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.25}>
        <p className="font-body text-lg md:text-xl leading-relaxed mb-8" style={{ color: 'hsl(40, 25%, 75%)' }}>
          The Abbasid Caliphate had libraries. The Song Dynasty had gunpowder.
          The Khwarezmian Empire had the largest cavalry army in Central Asia.
          None of it mattered. Delhi survived because one man looked at the problem
          as an engineering challenge and rebuilt an entire state around a single
          strategic imperative: <em className="italic" style={{ color: BURNT }}>do not let them through</em>.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.35}>
        <p className="font-display text-xl md:text-2xl font-semibold mt-16" style={{ color: BURNT }}>
          The wall held. But the builder did not survive his own creation.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.45}>
        <EditionColophon slug="mongol-india" />
      </RevealOnScroll>
    </div>
  </section>
);
