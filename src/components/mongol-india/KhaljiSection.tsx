import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { KhaljiReformGraphic } from '@/components/visuals/KhaljiReformGraphic';

const BURNT = 'hsl(15, 75%, 50%)';

const steps = [
  <div key="s0">
    <p className="text-xs tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: BURNT, opacity: 0.6 }}>
      1296 · The Shield
    </p>
    <h2 className="font-display text-2xl md:text-3xl font-bold mb-4" style={{ color: 'hsl(40, 25%, 90%)' }}>
      Alauddin Khalji's Military Machine
    </h2>
    <p className="font-body text-base leading-relaxed" style={{ color: 'hsl(40, 25%, 80%)' }}>
      When Alauddin seized the throne in 1296, the Mongol threat was existential.
      His predecessors had barely survived wave after wave. His response was not
      heroic speeches — it was <em className="italic" style={{ color: BURNT }}>systematic military reorganization</em> on a scale India had never seen.
    </p>
  </div>,

  <div key="s1">
    <h3 className="font-display text-lg font-bold mb-2" style={{ color: BURNT }}>Standing Army</h3>
    <p className="font-body text-base leading-relaxed" style={{ color: 'hsl(40, 25%, 80%)' }}>
      Abolished the feudal levy system. Paid soldiers directly from the treasury,
      creating India's first fully professional standing army. Soldiers answered to
      the Sultan, not to local lords.
    </p>
  </div>,

  <div key="s2">
    <h3 className="font-display text-lg font-bold mb-2" style={{ color: BURNT }}>Price Controls</h3>
    <p className="font-body text-base leading-relaxed" style={{ color: 'hsl(40, 25%, 80%)' }}>
      Fixed prices of grain, cloth, horses, and cattle across the empire. Markets
      monitored by spies. Purpose: keep army costs sustainable. A horse that once
      cost 100 silver tankhas now cost 25.
    </p>
  </div>,

  <div key="s3">
    <h3 className="font-display text-lg font-bold mb-2" style={{ color: BURNT }}>Intelligence Network</h3>
    <p className="font-body text-base leading-relaxed" style={{ color: 'hsl(40, 25%, 80%)' }}>
      Created mounted intelligence officers (barids) and secret spies (munhiyans)
      stationed across the northwest frontier. The Mongols could no longer approach
      Delhi without weeks of early warning.
    </p>
  </div>,

  <div key="s4">
    <h3 className="font-display text-lg font-bold mb-2" style={{ color: BURNT }}>Frontier Fortification</h3>
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: 'hsl(40, 25%, 80%)' }}>
      Rebuilt and garrisoned every fort along the northwest frontier — from the
      Khyber Pass to Multan to Dipalpur. Permanent garrisons with enough supplies
      to withstand siege without resupply.
    </p>
    <p className="font-display text-base font-semibold" style={{ color: BURNT }}>
      The result: the most militarized state in the medieval world — built for one purpose.
    </p>
  </div>,
];

export const KhaljiSection = () => (
  <section id="mi-khalji">
    <StickyScroll
      graphic={(step) => <KhaljiReformGraphic step={step} />}
      steps={steps}
    />
  </section>
);
