import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { InteractiveMap } from '@/components/visuals/InteractiveMap';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { HistoricalImage } from '@/components/visuals/HistoricalImage';
import { EraTransition, ERA_COLORS } from '@/components/visuals/EraTransition';

const revolutionEvents = [
  { year: '1953', event: 'CIA-MI6 coup overthrows PM Mosaddegh' },
  { year: '1963', event: "Shah's White Revolution — rapid modernization" },
  { year: '1978', event: 'Mass protests erupt across Iran' },
  { year: '1979', event: 'Islamic Revolution — Shah flees' },
  { year: '1979', event: 'Ayatollah Khomeini returns from exile' },
];

export const ModernSection = () => (
  <section id="modern" style={{ '--era-primary': ERA_COLORS.modern } as React.CSSProperties}>
    <div className="max-w-5xl mx-auto px-6 py-20 md:py-32">
      <RevealOnScroll>
        <p className="text-xs tracking-[0.3em] uppercase text-foreground/30 mb-4">1905 – Present</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground/90">
          The Modern Era
        </h2>
        <p className="text-foreground/70 text-xl leading-relaxed font-body mb-4 max-w-2xl">
          A century of revolutions, oil, and identity.
        </p>
      </RevealOnScroll>

      <div className="mt-16 grid md:grid-cols-2 gap-12 items-start">
        <RevealOnScroll delay={0.1}>
          <InteractiveMap
            empire="modern"
            showCities
            highlightCities={['Isfahan', 'Tabriz']}
            className="aspect-[4/3] rounded-lg"
          />
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-foreground/80 mb-4">Constitutional Revolution</h3>
            <p className="text-foreground/60 text-lg font-body leading-relaxed mb-4">
              In 1906, Iran became one of the first countries in Asia to adopt a constitution.
            </p>
            <p className="text-foreground/40 font-body leading-relaxed">
              The seeds of modern democracy were planted — then repeatedly uprooted.
            </p>
          </div>
        </RevealOnScroll>
      </div>

      {/* Revolution timeline */}
      <RevealOnScroll delay={0.1} className="mt-20">
        <h3 className="font-display text-2xl font-bold text-foreground/70 mb-8">Road to Revolution</h3>
        <div className="space-y-4">
          {revolutionEvents.map((evt, i) => (
            <RevealOnScroll key={i} delay={0.06 * i}>
              <div className="flex items-center gap-5 py-3 border-b border-border/10">
                <span className="font-display text-lg font-bold text-foreground/40 min-w-[60px]">{evt.year}</span>
                <span className="text-foreground/60 font-body text-lg">{evt.event}</span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </RevealOnScroll>

      {/* Shah leaving */}
      <RevealOnScroll delay={0.1} className="mt-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <HistoricalImage
            src="/images/shah-leaving-1979.jpg"
            alt="Shah leaving Iran, 1979"
            caption="January 16, 1979 — The Shah leaves Iran for the last time"
          />
          <div className="space-y-4">
            <p className="text-foreground/70 text-lg font-body leading-relaxed">
              The Pahlavi dynasty ended not with a battle, but a departure.
            </p>
            <p className="text-foreground/50 font-body leading-relaxed">
              The Islamic Republic was declared on April 1, 1979.
            </p>
          </div>
        </div>
      </RevealOnScroll>

      {/* Modern stats */}
      <RevealOnScroll delay={0.1} className="mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <AnimatedCounter end={88} suffix="M" label="Population" />
          <AnimatedCounter end={97} suffix="%" label="Literacy rate" />
          <AnimatedCounter end={60} suffix="%" label="Under 30" />
          <AnimatedCounter end={2500} suffix="+" label="Years of history" />
        </div>
      </RevealOnScroll>
    </div>

    <EraTransition
      fromColor={ERA_COLORS.modern}
      toColor={ERA_COLORS.epilogue}
      label="The Legacy"
    />
  </section>
);
