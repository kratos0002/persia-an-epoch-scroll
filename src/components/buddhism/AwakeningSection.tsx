import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { BodhiTree } from '@/components/visuals/BodhiTree';
import { InteractiveMap } from '@/components/visuals/InteractiveMap';
import { EraTransition } from '@/components/visuals/EraTransition';
import { AnimatePresence, motion } from 'framer-motion';

const SAFFRON = '30 65% 45%';

// Route order: birth → enlightenment → first sermon → capital → university
const SANGHA_ROUTE = ['Lumbini', 'Bodh Gaya', 'Sarnath', 'Pataliputra', 'Nalanda'];

const SANGHA_ANNOTATIONS = [
  { name: 'Lumbini', label: 'Lumbini — Birthplace', direction: 'top' as const },
  { name: 'Bodh Gaya', label: 'Bodh Gaya — Enlightenment', direction: 'bottom' as const },
  { name: 'Sarnath', label: 'Sarnath — First Sermon', direction: 'left' as const },
  { name: 'Pataliputra', label: 'Pataliputra — Capital', direction: 'top' as const },
  { name: 'Nalanda', label: 'Nalanda — Great University', direction: 'right' as const },
];

export const AwakeningSection = () => (
  <section id="awakening" style={{ '--era-primary': SAFFRON } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => (
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            {activeStep < 3 ? (
              <motion.div
                key="bodhi-tree"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute inset-0" style={{
                  background: `radial-gradient(ellipse at center, hsl(${SAFFRON} / 0.05) 0%, transparent 70%)`
                }} />
                <BodhiTree activeStep={activeStep} />
              </motion.div>
            ) : (
              <motion.div
                key="sangha-map"
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <InteractiveMap
                  empire="buddhism"
                  center={[25.5, 84]}
                  zoom={7}
                  highlightCities={SANGHA_ROUTE}
                  routeCities={SANGHA_ROUTE}
                  annotatedCities={SANGHA_ANNOTATIONS}
                  showCities
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-body" style={{ color: `hsl(${SAFFRON} / 0.5)` }}>528 BCE · Bodh Gaya</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4" style={{ color: `hsl(${SAFFRON})` }}>The Awakening</h2>
          <p className="font-body text-base leading-relaxed text-foreground/70">
            Prince Siddhartha Gautama abandoned his palace at 29. After six years of extreme asceticism, he sat beneath a pipal tree and resolved not to rise until he understood suffering. By dawn, he was the Buddha — "the awakened one."
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-xl font-bold mb-3" style={{ color: `hsl(${SAFFRON})` }}>The Four Noble Truths</h3>
          <p className="font-body text-base leading-relaxed text-foreground/70 mb-3">
            His first teaching at Sarnath's Deer Park laid out the core diagnosis: life involves suffering (<em>dukkha</em>); suffering arises from craving; craving can cease; and the path to its cessation is the Eightfold Path.
          </p>
          <p className="font-body text-sm italic text-foreground/40">
            "I teach one thing and one thing only: suffering and the end of suffering."
          </p>
        </div>,
        <div key={2}>
          <h3 className="font-display text-xl font-bold mb-3" style={{ color: `hsl(${SAFFRON})` }}>The Eightfold Path</h3>
          <p className="font-body text-base leading-relaxed text-foreground/70 mb-3">
            Not commandments but training principles: Right View, Right Intention, Right Speech, Right Action, Right Livelihood, Right Effort, Right Mindfulness, Right Concentration.
          </p>
          <p className="font-body text-sm italic text-foreground/40">
            The wheel with eight spokes became Buddhism's most enduring symbol.
          </p>
        </div>,
        <div key={3}>
          <h3 className="font-display text-xl font-bold mb-3" style={{ color: `hsl(${SAFFRON})` }}>The Sangha</h3>
          <p className="font-body text-base leading-relaxed text-foreground/70">
            For 45 years the Buddha walked across the Gangetic plain, teaching. The community of monks and nuns — the <em>Sangha</em> — grew to thousands. His teachings were memorized, chanted, and passed mouth to mouth for centuries before being written down.
          </p>
        </div>,
      ]}
    />
    <EraTransition fromColor={SAFFRON} toColor={SAFFRON} year="268 BCE" label="The Emperor" />
  </section>
);
