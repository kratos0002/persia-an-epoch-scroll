import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { InteractiveMap } from '@/components/visuals/InteractiveMap';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { HistoricalImage } from '@/components/visuals/HistoricalImage';
import { EraTransition, ERA_COLORS } from '@/components/visuals/EraTransition';
import { PersianPattern } from '@/components/visuals/PersianPattern';

export const SassanidSection = () => (
  <section id="sassanid" style={{ '--era-primary': ERA_COLORS.sassanid } as React.CSSProperties}>
    {/* Hero intro */}
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <PersianPattern variant="hexagonal" opacity={0.04} color="hsl(350,55%,40%)" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      <RevealOnScroll className="relative z-10 text-center max-w-3xl mx-auto px-6">
        <p className="text-xs tracking-[0.3em] uppercase text-[hsl(350,55%,45%,0.6)] mb-4">224–651 CE</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
          <span className="text-[hsl(350,55%,50%)]">The Sassanids</span>
        </h2>
        <p className="text-foreground/70 text-xl font-body leading-relaxed mb-4">
          The last great Persian empire before Islam.
        </p>
        <p className="text-foreground/50 text-lg font-body">
          Four centuries of rivalry with Rome, artistic splendor, and Zoroastrian revival.
        </p>
      </RevealOnScroll>
    </div>

    {/* Content */}
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
      <RevealOnScroll>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <InteractiveMap
            empire="sassanid"
            showCities
            highlightCities={['Ctesiphon', 'Isfahan', 'Merv', 'Persepolis']}
            className="aspect-[4/3] rounded-lg"
          />
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-[hsl(350,55%,50%,0.85)]">Ctesiphon: Rival to Rome</h3>
            <p className="text-foreground/70 text-lg font-body leading-relaxed">
              The Sassanid capital housed the world's largest brick vault — the Taq Kasra.
            </p>
            <p className="text-foreground/50 font-body leading-relaxed">
              At its peak, the city's population rivaled Constantinople.
            </p>
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 md:order-2">
            <h3 className="font-display text-2xl font-bold text-[hsl(350,55%,50%,0.85)]">Shapur's Triumph</h3>
            <p className="text-foreground/70 text-lg font-body leading-relaxed">
              In 260 CE, Shapur I captured Roman Emperor Valerian alive.
            </p>
            <p className="text-foreground/50 font-body leading-relaxed">
              The only time in history a Roman emperor was taken prisoner. Shapur carved the moment into cliff face at Naqsh-e Rostam.
            </p>
          </div>
          <HistoricalImage
            src="/images/shapur-triumph.jpg"
            alt="Shapur I's victory relief"
            caption="Shapur I's triumph over Emperor Valerian, Naqsh-e Rostam"
            className="md:order-1"
          />
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.2}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { title: 'Zoroastrian Revival', desc: 'State religion codified and spread' },
            { title: 'Academy of Gundeshapur', desc: "World's first teaching hospital" },
            { title: 'Artistic Pinnacle', desc: 'Silverwork, textiles, and rock reliefs' },
            { title: 'Legal System', desc: 'Foundation of Islamic jurisprudence' },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-lg bg-[hsl(350,55%,40%,0.06)] border border-[hsl(350,55%,40%,0.1)]">
              <h4 className="font-display text-sm font-bold text-[hsl(350,55%,45%,0.8)] mb-2">{item.title}</h4>
              <p className="text-foreground/50 text-sm font-body">{item.desc}</p>
            </div>
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.15}>
        <div className="flex justify-center gap-8">
          <AnimatedCounter end={427} suffix=" years" label="Dynasty duration" />
          <AnimatedCounter end={30} suffix="+" label="Kings" />
        </div>
      </RevealOnScroll>
    </div>

    <EraTransition
      fromColor={ERA_COLORS.sassanid}
      toColor={ERA_COLORS.islamic}
      year="633 CE"
      label="Everything Changes"
    />
  </section>
);
