import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { BranchingTree } from '@/components/visuals/BranchingTree';
import { EraTransition } from '@/components/visuals/EraTransition';

const SAFFRON = '30 65% 45%';

export const FirstSplitSection = () => (
  <section id="first-split" style={{ '--era-primary': SAFFRON } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse at center, hsl(${SAFFRON} / 0.04) 0%, transparent 70%)`
          }} />
          <BranchingTree
            activePhase={activeStep >= 2 ? 1 : 0}
            highlightBranch={activeStep === 2 ? 'theravada' : activeStep === 3 ? 'mahayana' : undefined}
          />
        </div>
      )}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-body" style={{ color: `hsl(${SAFFRON} / 0.5)` }}>~100 CE</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4" style={{ color: `hsl(${SAFFRON})` }}>The First Split</h2>
          <p className="font-body text-base leading-relaxed text-foreground/70">
            For centuries after the Buddha's death, monks debated what he truly meant. Was enlightenment only for monks who withdrew from the world? Or could anyone — a merchant, a mother, a king — achieve it?
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-xl font-bold mb-3" style={{ color: `hsl(${SAFFRON})` }}>Two Visions</h3>
          <p className="font-body text-base leading-relaxed text-foreground/70">
            The <strong>Sthavira</strong> ("Elders") held firm to the original monastic discipline. The <strong>Mahāsāṃghika</strong> ("Great Assembly") argued the dharma was for everyone. This theological rift would eventually harden into two great vehicles: Theravada and Mahayana.
          </p>
        </div>,
        <div key={2}>
          <h3 className="font-display text-xl font-bold mb-3" style={{ color: 'hsl(35, 75%, 50%)' }}>Theravada — "The Way of the Elders"</h3>
          <p className="font-body text-base leading-relaxed text-foreground/70">
            The conservative path: the Buddha was a man, not a god. Enlightenment comes through personal effort, monastic discipline, and meditation. The Pali Canon — the oldest complete Buddhist scripture — is their foundation.
          </p>
        </div>,
        <div key={3}>
          <h3 className="font-display text-xl font-bold mb-3" style={{ color: 'hsl(350, 50%, 45%)' }}>Mahāyāna — "The Great Vehicle"</h3>
          <p className="font-body text-base leading-relaxed text-foreground/70 mb-3">
            The expansive path: the ideal is the <em>bodhisattva</em> — one who postpones their own nirvana to help all beings. New sutras appeared, Buddhas and celestial beings multiplied, and the dharma became cosmic in scope.
          </p>
          <p className="font-body text-sm italic text-foreground/40">
            This was not a hostile schism — both paths continued to share monasteries for centuries.
          </p>
        </div>,
      ]}
    />
    <EraTransition fromColor={SAFFRON} toColor="35 75% 50%" year="~300 CE" label="The Southern Path" />
  </section>
);
