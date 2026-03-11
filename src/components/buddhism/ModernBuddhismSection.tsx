import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { InteractiveMap } from '@/components/visuals/InteractiveMap';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { EraTransition } from '@/components/visuals/EraTransition';

const SAFFRON = '30 65% 45%';

export const ModernBuddhismSection = () => (
  <section id="modern-buddhism" style={{ '--era-primary': SAFFRON } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => (
        <div className="relative w-full h-full">
          <InteractiveMap
            empire="none"
            center={[30, 90]}
            zoom={3}
            showCities
            highlightCities={
              activeStep === 0 ? ['Lhasa', 'Kyoto', 'Bagan', 'Anuradhapura'] :
              activeStep === 1 ? ['Kyoto', 'Nara', "Chang'an", 'Lhasa'] :
              undefined
            }
          />
          {activeStep >= 2 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-lg px-6 py-4 border border-border/30">
              <p className="text-xs tracking-[0.2em] uppercase font-body mb-1" style={{ color: `hsl(${SAFFRON} / 0.6)` }}>Practitioners worldwide</p>
              <AnimatedCounter end={500000000} suffix="+" className="font-display text-3xl font-bold" />
            </div>
          )}
        </div>
      )}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-body" style={{ color: `hsl(${SAFFRON} / 0.5)` }}>19th–21st Century</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4" style={{ color: `hsl(${SAFFRON})` }}>Modern Buddhism</h2>
          <p className="font-body text-base leading-relaxed text-foreground/70">
            In the 19th century, European scholars "rediscovered" Buddhism through Pali and Sanskrit texts. Theosophy, Beat poets, and the counterculture brought Eastern philosophy into Western consciousness. The Dalai Lama's exile in 1959 made Tibetan Buddhism a global cause.
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-xl font-bold mb-3" style={{ color: `hsl(${SAFFRON})` }}>The Mindfulness Revolution</h3>
          <p className="font-body text-base leading-relaxed text-foreground/70">
            Jon Kabat-Zinn stripped Buddhist meditation of its religious framing and called it "mindfulness-based stress reduction." It entered hospitals, schools, Silicon Valley, and the military. Buddhism's most practical gift to the West was repackaged as secular science.
          </p>
        </div>,
        <div key={2}>
          <h3 className="font-display text-xl font-bold mb-3" style={{ color: `hsl(${SAFFRON})` }}>500 Million and Growing</h3>
          <p className="font-body text-base leading-relaxed text-foreground/70 mb-3">
            Today, Buddhism is the world's fourth-largest religion. From meditation apps to temple cities, from neuroscience labs studying monks' brains to ancient forest monasteries in Thailand — the teaching adapts while its core remains unchanged.
          </p>
          <p className="font-body text-sm italic text-foreground/40">
            "In the end, the Buddha offered not a religion but a technology of mind."
          </p>
        </div>,
      ]}
    />
    <EraTransition fromColor={SAFFRON} toColor="43 70% 55%" year="" label="Epilogue" />
  </section>
);
