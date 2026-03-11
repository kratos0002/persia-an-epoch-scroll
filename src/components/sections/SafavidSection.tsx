import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { InteractiveMap } from '@/components/visuals/InteractiveMap';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { HistoricalImage } from '@/components/visuals/HistoricalImage';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { EraTransition, ERA_COLORS } from '@/components/visuals/EraTransition';

export const SafavidSection = () => (
  <section id="safavid" style={{ '--era-primary': ERA_COLORS.safavid } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) =>
        activeStep < 3 ? (
          <InteractiveMap
            empire="safavid"
            showCities
            highlightCities={
              activeStep === 0
                ? ['Tabriz', 'Isfahan']
                : activeStep === 1
                ? ['Isfahan', 'Tabriz', 'Baghdad']
                : ['Isfahan']
            }
            center={activeStep === 2 ? [32.65, 51.68] as [number, number] : undefined}
            zoom={activeStep === 2 ? 7 : undefined}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <img
              src="/images/isfahan-square.jpg"
              alt="Naqsh-e Jahan Square, Isfahan"
              className="max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        )
      }
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(215,65%,45%,0.7)] mb-4">1501 CE</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            <span className="text-[hsl(215,65%,55%)]">The Safavid Empire</span>
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed font-body mb-4">
            Iran is reborn — this time, Shia.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            Shah Ismail I unified Iran under Twelver Shi'ism, creating the national identity that endures today.
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(215,65%,50%,0.85)]">Shah Abbas the Great</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            Moved the capital to Isfahan.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            Built it into one of the most beautiful cities on Earth. "Isfahan is half the world," the saying went.
          </p>
        </div>,
        <div key={2}>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(215,65%,50%,0.85)]">Naqsh-e Jahan</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-6">
            The second-largest square in the world. UNESCO World Heritage Site.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <AnimatedCounter end={512} suffix="m" label="Square length" />
            <AnimatedCounter end={1602} suffix="" label="Year completed" />
          </div>
        </div>,
        <div key={3}>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(215,65%,50%,0.85)]">Art & Architecture</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            Persian miniature painting reached its zenith.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            Tile mosaic, carpet weaving, calligraphy — every surface became a canvas.
          </p>
        </div>,
      ]}
    />

    {/* Gallery section */}
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      <RevealOnScroll>
        <div className="grid md:grid-cols-2 gap-8">
          <HistoricalImage
            src="/images/isfahan-aerial.jpg"
            alt="Isfahan from above"
            caption="Isfahan: Half the World"
          />
          <HistoricalImage
            src="/images/isfahan-square.jpg"
            alt="Naqsh-e Jahan Square"
            caption="Naqsh-e Jahan Square at dusk"
          />
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-foreground/30 mb-4">1722–1905</p>
          <h3 className="font-display text-2xl font-bold text-foreground/60 mb-4">The Interregnum</h3>
          <p className="text-foreground/50 font-body leading-relaxed">
            After the Safavids fell, Iran passed through the hands of the Afsharids, Zands, and Qajars —
            a turbulent period that set the stage for the modern era.
          </p>
        </div>
      </RevealOnScroll>
    </div>

    <EraTransition
      fromColor={ERA_COLORS.safavid}
      toColor={ERA_COLORS.modern}
      year="1905 CE"
      label="The Modern Age"
    />
  </section>
);
