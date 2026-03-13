import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';

const BURNT = 'hsl(15, 75%, 50%)';

export const IndusSection = () => (
  <section id="mi-indus" className="relative py-24 md:py-32 px-6">
    <div className="max-w-3xl mx-auto">
      <RevealOnScroll>
        <p className="text-xs tracking-[0.3em] uppercase font-body font-semibold mb-4" style={{ color: BURNT, opacity: 0.6 }}>
          1221 · The Pursuit
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-8" style={{ color: 'hsl(40, 25%, 90%)' }}>
          Genghis at the Indus
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={0.15}>
        <p className="font-body text-lg md:text-xl leading-relaxed mb-8" style={{ color: 'hsl(40, 25%, 75%)' }}>
          Jalal ad-Din Mangburni, the last prince of the Khwarezmian Empire, fled south.
          Behind him, Genghis Khan's armies had destroyed Samarkand, Bukhara, Balkh —
          every great city of Central Asia reduced to ash. There was nowhere left to run
          except across the Hindu Kush, into the unknown heat of the Indian subcontinent.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.25}>
        <div className="bg-card/60 backdrop-blur-lg rounded-lg border border-[hsl(15,75%,50%,0.15)] p-6 md:p-8 mb-8">
          <p className="font-body text-lg leading-relaxed mb-4" style={{ color: 'hsl(40, 25%, 80%)' }}>
            At the Battle of the Indus, cornered on the riverbank, Jalal ad-Din reportedly
            hurled himself from a cliff into the rapids — still in armor, shield on his back.
            Genghis, watching from the bluff, is said to have pointed at the falling prince
            and told his sons: <em className="italic" style={{ color: BURNT }}>"That is the kind of son a father should have."</em>
          </p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.35}>
        <p className="font-body text-lg md:text-xl leading-relaxed mb-8" style={{ color: 'hsl(40, 25%, 75%)' }}>
          Genghis sent reconnaissance forces into the Punjab. They found jungles, monsoon
          heat, rivers that flooded without warning, and terrain utterly unlike the steppes.
          The Mongol horses — bred for the cold grasslands of Central Asia — suffered.
          The reconnaissance reported back: this land would resist them.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.45}>
        <p className="font-body text-xl md:text-2xl font-display font-semibold text-center my-12" style={{ color: BURNT }}>
          Genghis turned back. But the Mongols would remember the road to India.
        </p>
      </RevealOnScroll>
    </div>
  </section>
);
