import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { InteractiveMap } from '@/components/visuals/InteractiveMap';
import { EraTransition } from '@/components/visuals/EraTransition';

const SAFFRON = '30 65% 45%';

export const AshokaSection = () => (
  <section id="ashoka" style={{ '--era-primary': SAFFRON } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => (
        <div className="relative w-full h-full">
          <InteractiveMap
            empire="none"
            center={activeStep >= 2 ? [22, 82] : [25, 84]}
            zoom={activeStep >= 2 ? 4 : 5}
            highlightCities={
              activeStep === 0 ? ['Pataliputra'] :
              activeStep === 1 ? ['Pataliputra', 'Sarnath', 'Bodh Gaya', 'Nalanda'] :
              ['Pataliputra', 'Anuradhapura', 'Gandhara', 'Sarnath']
            }
            showCities
          />
        </div>
      )}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-body" style={{ color: `hsl(${SAFFRON} / 0.5)` }}>268 BCE · Pataliputra</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4" style={{ color: `hsl(${SAFFRON})` }}>Ashoka the Great</h2>
          <p className="font-body text-base leading-relaxed text-foreground/70">
            Emperor Ashoka of the Maurya dynasty conquered most of the Indian subcontinent through brutal warfare. After the carnage of Kalinga — where 100,000 died — he was consumed by remorse. He converted to Buddhism and vowed to rule by <em>dharma</em> alone.
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-xl font-bold mb-3" style={{ color: `hsl(${SAFFRON})` }}>The Edicts</h3>
          <p className="font-body text-base leading-relaxed text-foreground/70">
            Ashoka carved his principles into rock pillars across the empire — the first written records of Buddhist ideals. He built hospitals, planted trees along roads, and established the first animal welfare laws in recorded history.
          </p>
        </div>,
        <div key={2}>
          <h3 className="font-display text-xl font-bold mb-3" style={{ color: `hsl(${SAFFRON})` }}>The Missionaries</h3>
          <p className="font-body text-base leading-relaxed text-foreground/70 mb-3">
            He sent monks in every direction: his son Mahinda carried the teaching to Sri Lanka. Others went to Central Asia, Southeast Asia, and the Hellenistic kingdoms of the Mediterranean. Buddhism was no longer an Indian religion — it was a world movement.
          </p>
          <p className="font-body text-sm italic text-foreground/40">
            Without Ashoka, Buddhism might have remained a regional Indian sect.
          </p>
        </div>,
      ]}
    />
    <EraTransition fromColor={SAFFRON} toColor={SAFFRON} year="~100 CE" label="The Great Divide" />
  </section>
);
