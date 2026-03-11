import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { InteractiveMap } from '@/components/visuals/InteractiveMap';
import { EraTransition } from '@/components/visuals/EraTransition';

const MAHAYANA = '350 50% 45%';

export const MahayanaSection = () => (
  <section id="mahayana" style={{ '--era-primary': MAHAYANA } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => (
        <div className="relative w-full h-full">
          <InteractiveMap
            empire="none"
            center={
              activeStep === 0 ? [34, 72] :
              activeStep === 1 ? [37, 94] :
              [35, 120]
            }
            zoom={activeStep === 0 ? 5 : activeStep === 1 ? 4 : 4}
            highlightCities={
              activeStep === 0 ? ['Gandhara', 'Nalanda'] :
              activeStep === 1 ? ['Gandhara', 'Dunhuang', "Chang'an"] :
              ['Nara', 'Kyoto', "Chang'an"]
            }
            showCities
          />
        </div>
      )}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-body" style={{ color: `hsl(${MAHAYANA} / 0.5)` }}>~200 CE · The Silk Road</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4" style={{ color: `hsl(${MAHAYANA})` }}>The Northern Path</h2>
          <p className="font-body text-base leading-relaxed text-foreground/70">
            In Gandhara — where Greek sculptors had once carved for Alexander's generals — artisans created the first images of the Buddha, blending Hellenistic art with Indian devotion. From here, Mahayana Buddhism traveled the Silk Road.
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-xl font-bold mb-3" style={{ color: `hsl(${MAHAYANA})` }}>The Silk Road Transmission</h3>
          <p className="font-body text-base leading-relaxed text-foreground/70">
            Monks and merchants carried sutras through oasis cities like Dunhuang, where they carved the Mogao Caves — 492 grottoes filled with Buddhist art spanning a thousand years. By the time Buddhism reached Chang'an, it was already transforming.
          </p>
        </div>,
        <div key={2}>
          <h3 className="font-display text-xl font-bold mb-3" style={{ color: `hsl(${MAHAYANA})` }}>East Asia</h3>
          <p className="font-body text-base leading-relaxed text-foreground/70 mb-3">
            China made Buddhism its own. Korean monks brought it to Japan in the 6th century, where it fused with Shinto aesthetics. The Japanese capital of Nara was built around its great temple. Buddhism became as East Asian as it was Indian.
          </p>
          <p className="font-body text-sm italic text-foreground/40">
            "The bodhisattva ideal transformed Buddhism from a path of withdrawal into a religion of compassion."
          </p>
        </div>,
      ]}
    />
    <EraTransition fromColor={MAHAYANA} toColor="270 45% 45%" year="~700 CE" label="The Diamond Path" />
  </section>
);
