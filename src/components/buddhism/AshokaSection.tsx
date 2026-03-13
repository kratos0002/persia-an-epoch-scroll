import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { AshokaPillar } from '@/components/visuals/AshokaPillar';
import { InteractiveMap } from '@/components/visuals/InteractiveMap';
import { EraTransition } from '@/components/visuals/EraTransition';
import { AnimatePresence, motion } from 'framer-motion';

const SAFFRON = '30 65% 45%';

const MISSIONARY_CITIES = ['Pataliputra', 'Anuradhapura', 'Gandhara', 'Sarnath'];

const ASHOKA_ANNOTATIONS = [
  { name: 'Pataliputra', label: 'Pataliputra — Imperial Capital', direction: 'top' as const },
  { name: 'Anuradhapura', label: 'Anuradhapura — Mahinda\'s Mission', direction: 'bottom' as const },
  { name: 'Gandhara', label: 'Gandhara — Northwest Mission', direction: 'left' as const },
  { name: 'Sarnath', label: 'Sarnath — Dharma Pillar', direction: 'right' as const },
];

export const AshokaSection = () => (
  <section id="ashoka" style={{ '--era-primary': SAFFRON } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => (
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            {activeStep < 2 ? (
              <motion.div
                key="ashoka-pillar"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute inset-0" style={{
                  background: `radial-gradient(ellipse at center, hsl(${SAFFRON} / 0.05) 0%, transparent 70%)`
                }} />
                <AshokaPillar activeStep={activeStep} />
              </motion.div>
            ) : (
              <motion.div
                key="missionary-map"
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <InteractiveMap
                  empire="buddhism"
                  center={[22, 82]}
                  zoom={4}
                  highlightCities={MISSIONARY_CITIES}
                  annotatedCities={ASHOKA_ANNOTATIONS}
                  showCities
                />
              </motion.div>
            )}
          </AnimatePresence>
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
