import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { PursuitMap } from '@/components/visuals/PursuitMap';

const BURNT = 'hsl(15, 75%, 50%)';

const steps = [
  <div key="s0">
    <p className="text-xs tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: BURNT, opacity: 0.6 }}>
      1221 · The Pursuit
    </p>
    <h2 className="font-display text-2xl md:text-3xl font-bold mb-4" style={{ color: 'hsl(40, 25%, 90%)' }}>
      Genghis at the Indus
    </h2>
    <p className="font-body text-base leading-relaxed" style={{ color: 'hsl(40, 25%, 80%)' }}>
      Jalal ad-Din Mangburni, the last prince of the Khwarezmian Empire, fled south.
      Behind him, Genghis Khan's armies had destroyed Samarkand, Bukhara, Balkh —
      every great city of Central Asia reduced to ash.
    </p>
  </div>,

  <div key="s1">
    <p className="font-body text-base leading-relaxed" style={{ color: 'hsl(40, 25%, 80%)' }}>
      There was nowhere left to run except across the Hindu Kush, into the unknown
      heat of the Indian subcontinent. The pursuit drove through mountain passes
      at 5,000 meters — terrain that killed horses and froze men alive.
    </p>
  </div>,

  <div key="s2">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: 'hsl(40, 25%, 80%)' }}>
      At the Battle of the Indus, cornered on the riverbank, Jalal ad-Din reportedly
      hurled himself from a cliff into the rapids — still in armor, shield on his back.
    </p>
    <p className="font-body text-base italic" style={{ color: BURNT }}>
      Genghis, watching from the bluff, told his sons: "That is the kind of son a father should have."
    </p>
  </div>,

  <div key="s3">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: 'hsl(40, 25%, 80%)' }}>
      Genghis sent reconnaissance forces into the Punjab. They found jungles, monsoon
      heat, rivers that flooded without warning, and terrain unlike the steppes.
    </p>
    <p className="font-display text-lg font-semibold" style={{ color: BURNT }}>
      Genghis turned back. But the Mongols would remember the road to India.
    </p>
  </div>,
];

export const IndusSection = () => (
  <section id="mi-indus">
    <StickyScroll
      graphic={(step) => <PursuitMap step={step} />}
      steps={steps}
    />
  </section>
);
