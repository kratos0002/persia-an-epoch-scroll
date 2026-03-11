import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { HistoricalImage, HistoricalMap } from '@/components/visuals/HistoricalImage';
import { SectionDivider, PersianPattern } from '@/components/visuals/PersianPattern';

export const SafavidSection = () => (
  <section id="safavid" className="relative">
    <StickyScroll
      graphic={(activeStep) => (
        <div className="w-full h-full flex items-center justify-center p-4 md:p-8 relative">
          <PersianPattern variant="hexagonal" opacity={0.03} color="hsl(215,65%,35%)" />
          {activeStep <= 1 ? (
            <img
              src="/images/maps/safavid-empire.png"
              alt="Safavid Empire territory"
              className="max-w-full max-h-full object-contain rounded-lg opacity-90"
            />
          ) : (
            <img
              src="/images/isfahan-aerial.jpg"
              alt="Naqsh-e Jahan Square, Isfahan"
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          )}
        </div>
      )}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase text-persian-blue/70 mb-3">1501–1736 CE · Reunification</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient-blue">The Safavid Empire</span>
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed font-body">
            Shah Ismail I, a 14-year-old warrior-poet, conquered Tabriz and
            declared Shi'a Islam the state religion. For the first time since the
            Sassanids, Iran was unified under a single native dynasty. A new
            Persian identity was born.
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-xl font-bold mb-3 text-persian-blue/80">Isfahan: Half the World</h3>
          <p className="text-foreground/80 leading-relaxed font-body">
            Shah Abbas I transformed Isfahan into one of the most beautiful cities
            on Earth. The Naqsh-e Jahan Square — the world's second largest — was
            ringed with mosques, palaces, and bazaars of staggering beauty.
            Visitors coined the Persian proverb: <em className="text-persian-blue/70">"Isfahan nesf-e jahān ast"</em> —
            Isfahan is half the world.
          </p>
        </div>,
        <div key={2}>
          <h3 className="font-display text-xl font-bold mb-3 text-persian-blue/80">Art & Commerce</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            The Safavids presided over a cultural renaissance: Persian miniature
            painting reached its zenith, carpet weaving became a royal art,
            and Isfahan's bazaars traded with Venice, London, and the Mughal court.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <AnimatedCounter end={10} suffix="M" label="Population" className="text-left" />
            <AnimatedCounter end={235} suffix="" label="Years of dynasty" className="text-left" />
          </div>
        </div>,
      ]}
    />

    {/* Gallery */}
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-20">
      <RevealOnScroll className="text-center mb-12">
        <h3 className="font-display text-2xl md:text-3xl font-bold text-persian-blue/80">Safavid Masterworks</h3>
      </RevealOnScroll>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RevealOnScroll>
          <HistoricalImage
            src="/images/isfahan-square.jpg"
            alt="Naqsh-e Jahan Square, Isfahan"
            caption="Naqsh-e Jahan Square"
            credit="Wikimedia Commons"
            aspectRatio="3/4"
          />
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <HistoricalImage
            src="/images/isfahan-aerial.jpg"
            alt="Aerial view of Naqsh-e Jahan Square"
            caption="Isfahan from above"
            credit="Wikimedia Commons"
            aspectRatio="3/4"
          />
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <HistoricalImage
            src="/images/shahnameh.jpg"
            alt="Shahnameh illuminated manuscript from the Safavid period"
            caption="Safavid-era Shahnameh"
            credit="Wikimedia Commons"
            aspectRatio="3/4"
          />
        </RevealOnScroll>
      </div>

      {/* Qajar transition */}
      <RevealOnScroll className="mt-20 max-w-2xl mx-auto text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground/50 mb-4">1736–1905 · Transition</p>
        <h3 className="font-display text-2xl font-bold text-foreground/60 mb-4">The Interregnum</h3>
        <p className="text-foreground/50 font-body leading-relaxed">
          The Afsharid warlord Nader Shah briefly restored imperial glory,
          sacking Delhi and seizing the Peacock Throne. But after his assassination,
          Iran fractured again. The Qajar dynasty reunified the country but
          presided over decline — losing territory to Russia and Britain,
          signing humiliating treaties, and watching the great game play
          out on Persian soil. The stage was set for revolution.
        </p>
      </RevealOnScroll>
    </div>
    <SectionDivider />
  </section>
);
