import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { SectionDivider } from '@/components/visuals/PersianPattern';

export const ParthianSection = () => (
  <section id="parthian">
    <StickyScroll
      graphic={(activeStep) => (
        <div className="w-full h-full flex items-center justify-center p-4 md:p-8">
          <img
            src="/images/maps/parthian-empire.png"
            alt="Parthian Empire territory"
            className="max-w-full max-h-full object-contain rounded-lg opacity-90"
          />
        </div>
      )}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase text-persian-crimson/70 mb-3">247 BCE · Rebirth</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            <span className="text-persian-crimson/90">The Parthian Empire</span>
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed font-body">
            From the ashes of Seleucid rule, the Arsacid dynasty rose in the
            northeast. Arsaces I declared independence, beginning a dynasty that
            would endure for nearly five centuries — the longest-ruling dynasty
            in Persian history.
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-xl font-bold mb-3 text-persian-crimson/80">Rome's Nemesis</h3>
          <p className="text-foreground/80 leading-relaxed font-body">
            At Carrhae in 53 BCE, Parthian horse archers annihilated seven Roman
            legions under Crassus — 20,000 dead, 10,000 captured. The golden
            eagles of Rome were carried east in triumph. For 300 years, the
            Euphrates marked the boundary between the world's two superpowers.
          </p>
        </div>,
        <div key={2}>
          <h3 className="font-display text-xl font-bold mb-3 text-persian-crimson/80">The Silk Road</h3>
          <p className="text-foreground/80 leading-relaxed font-body">
            Parthia became the essential middleman of the ancient world. Chinese
            silk, Indian spices, and Roman gold all passed through Parthian
            merchants. The empire grew fabulously wealthy — not through conquest,
            but commerce. A model millennia ahead of its time.
          </p>
        </div>,
      ]}
    />
    <SectionDivider />
  </section>
);
