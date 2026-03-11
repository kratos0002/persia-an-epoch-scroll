import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { InteractiveMap } from '@/components/visuals/InteractiveMap';
import { EraTransition } from '@/components/visuals/EraTransition';

const THERAVADA = '35 75% 50%';

export const TheravadaSection = () => (
  <section id="theravada" style={{ '--era-primary': THERAVADA } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => (
        <div className="relative w-full h-full">
          <InteractiveMap
            empire="none"
            center={
              activeStep === 0 ? [8.5, 80.5] :
              activeStep === 1 ? [18, 96] :
              [15, 100]
            }
            zoom={activeStep === 0 ? 6 : activeStep === 1 ? 5 : 4}
            highlightCities={
              activeStep === 0 ? ['Anuradhapura', 'Kandy'] :
              activeStep === 1 ? ['Bagan', 'Ayutthaya'] :
              ['Anuradhapura', 'Bagan', 'Ayutthaya', 'Angkor', 'Luang Prabang']
            }
            showCities
          />
        </div>
      )}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-body" style={{ color: `hsl(${THERAVADA} / 0.5)` }}>~250 BCE · Sri Lanka</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4" style={{ color: `hsl(${THERAVADA})` }}>The Southern Path</h2>
          <p className="font-body text-base leading-relaxed text-foreground/70">
            Ashoka's son Mahinda brought the dharma to Sri Lanka. King Devanampiya Tissa converted, and the island became the fortress of Theravada Buddhism — the keeper of the original Pali texts when they were lost everywhere else.
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-xl font-bold mb-3" style={{ color: `hsl(${THERAVADA})` }}>The Golden Lands</h3>
          <p className="font-body text-base leading-relaxed text-foreground/70">
            From Sri Lanka, monks carried the teaching to Myanmar, where King Anawrahta built the temple city of Bagan. Thailand embraced it under the Sukhothai kingdom. The saffron-robed monk became the defining image of Southeast Asian spirituality.
          </p>
        </div>,
        <div key={2}>
          <h3 className="font-display text-xl font-bold mb-3" style={{ color: `hsl(${THERAVADA})` }}>A Living Tradition</h3>
          <p className="font-body text-base leading-relaxed text-foreground/70 mb-3">
            Today, Theravada remains the dominant tradition in Sri Lanka, Myanmar, Thailand, Cambodia, and Laos. Over 150 million practitioners maintain a tradition remarkably close to the Buddha's original instructions — 2,500 years later.
          </p>
          <p className="font-body text-sm italic text-foreground/40">
            Theravada's strength was its conservatism — by changing little, it preserved much.
          </p>
        </div>,
      ]}
    />
    <EraTransition fromColor={THERAVADA} toColor="350 50% 45%" year="~200 CE" label="The Northern Path" />
  </section>
);
