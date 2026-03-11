import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { InteractiveMap } from '@/components/visuals/InteractiveMap';
import { HistoricalImage } from '@/components/visuals/HistoricalImage';
import { EraTransition, ERA_COLORS } from '@/components/visuals/EraTransition';

const battles = [
  { name: 'Marathon', year: '490 BCE', persian: 25000, greek: 10000, result: 'Greek Victory' },
  { name: 'Thermopylae', year: '480 BCE', persian: 100000, greek: 7000, result: 'Persian Victory' },
  { name: 'Salamis', year: '480 BCE', persian: 800, greek: 370, result: 'Greek Victory' },
  { name: 'Plataea', year: '479 BCE', persian: 50000, greek: 40000, result: 'Greek Victory' },
];

export const PersianWarsSection = () => (
  <section id="persian-wars" style={{ '--era-primary': ERA_COLORS.achaemenid } as React.CSSProperties}>
    <div className="max-w-5xl mx-auto px-6 py-20 md:py-32">
      <RevealOnScroll>
        <p className="text-xs tracking-[0.3em] uppercase text-[hsl(43,85%,55%,0.6)] mb-4">499–449 BCE</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-gradient-gold">
          The Persian Wars
        </h2>
        <p className="text-foreground/80 text-xl leading-relaxed font-body mb-4 max-w-2xl">
          The clash that defined Western civilization's founding myth.
        </p>
        <p className="text-foreground/50 text-lg font-body max-w-2xl">
          But the story the Greeks told wasn't the whole story.
        </p>
      </RevealOnScroll>

      <div className="mt-16 grid md:grid-cols-2 gap-12 items-start">
        <RevealOnScroll delay={0.1}>
          <InteractiveMap
            empire="achaemenid"
            showCities
            highlightCities={['Athens', 'Sardis', 'Persepolis']}
            className="aspect-[4/3] rounded-lg"
          />
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <HistoricalImage
            src="/images/thermopylae.jpg"
            alt="Leonidas at Thermopylae"
            caption="The stand at Thermopylae, 480 BCE"
          />
        </RevealOnScroll>
      </div>

      {/* Battle timeline */}
      <div className="mt-20 space-y-8">
        <RevealOnScroll>
          <h3 className="font-display text-2xl font-bold text-[hsl(43,85%,55%,0.85)] mb-8">Key Battles</h3>
        </RevealOnScroll>

        {battles.map((battle, i) => (
          <RevealOnScroll key={battle.name} delay={0.1 * i}>
            <div className="flex items-center gap-6 p-4 rounded-lg bg-card/30 border border-border/20">
              <div className="text-center min-w-[80px]">
                <p className="font-display text-sm font-bold text-foreground/70">{battle.year}</p>
              </div>
              <div className="flex-1">
                <h4 className="font-display text-lg font-bold text-foreground/90 mb-1">{battle.name}</h4>
                <p className="text-sm text-foreground/50 font-body">
                  {battle.persian.toLocaleString()} Persian vs {battle.greek.toLocaleString()} Greek
                </p>
              </div>
              <span className={`text-xs tracking-wider uppercase font-body ${
                battle.result === 'Persian Victory' ? 'text-[hsl(43,85%,55%,0.7)]' : 'text-foreground/40'
              }`}>
                {battle.result}
              </span>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>

    <EraTransition
      fromColor={ERA_COLORS.achaemenid}
      toColor={ERA_COLORS.alexander}
      year="334 BCE"
      label="The Conqueror Arrives"
    />
  </section>
);
