import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { HistoricalImage } from '@/components/visuals/HistoricalImage';
import { EraTransition, ERA_COLORS } from '@/components/visuals/EraTransition';

const achievements = [
  {
    title: 'The Royal Road',
    desc: '2,700 km from Susa to Sardis. Messages crossed the empire in 7 days — a journey of 90 on foot.',
    stat: 2700,
    suffix: ' km',
    label: 'Road length',
    image: '/images/persepolis.jpg',
    imageAlt: 'Persepolis ruins',
    imageCaption: 'Persepolis, ceremonial capital of the Achaemenid Empire',
  },
  {
    title: 'The Daric',
    desc: "History's first standardized gold coin. It made trade possible across three continents and set the template every economy since has followed.",
    stat: 8.4,
    suffix: 'g',
    label: 'Gold weight',
  },
  {
    title: 'The Postal System',
    desc: '"Nothing mortal travels so fast as these Persian messengers." — Herodotus. 111 relay stations. Fresh horses at each.',
    stat: 111,
    suffix: '',
    label: 'Relay stations',
  },
  {
    title: 'Persepolis',
    desc: 'Not a capital — a statement. 23 nations sent tribute here. Every staircase relief showed them as partners, never subjects.',
    stat: 23,
    suffix: '',
    label: 'Tribute nations',
    image: '/images/persepolis.jpg',
    imageAlt: 'Persepolis gate',
    imageCaption: 'The Gate of All Nations, Persepolis',
  },
];

export const DariusSection = () => (
  <section id="darius" style={{ '--era-primary': ERA_COLORS.achaemenid } as React.CSSProperties}>
    <div className="max-w-4xl mx-auto px-6 py-20 md:py-32">
      <RevealOnScroll>
        <p className="text-xs tracking-[0.3em] uppercase text-[hsl(43,85%,55%,0.6)] mb-4">518 BCE · Administration</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-gradient-gold">
          Darius the Great
        </h2>
        <p className="text-foreground/80 text-xl leading-relaxed font-body mb-4 max-w-2xl">
          Cyrus conquered the world. Darius made it work.
        </p>
        <p className="text-foreground/50 text-lg font-body max-w-2xl">
          He invented the infrastructure that every empire since has copied.
        </p>
      </RevealOnScroll>

      <div className="mt-20 space-y-24">
        {achievements.map((item, i) => (
          <RevealOnScroll key={item.title} delay={0.1 * i}>
            <div className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}>
              <div className="flex-1 space-y-4">
                <h3 className="font-display text-2xl font-bold text-[hsl(43,85%,55%,0.85)]">{item.title}</h3>
                <p className="text-foreground/70 text-lg leading-relaxed font-body">{item.desc}</p>
                <AnimatedCounter end={item.stat} suffix={item.suffix} label={item.label} />
              </div>
              <div className="flex-1">
                {item.image ? (
                  <HistoricalImage
                    src={item.image}
                    alt={item.imageAlt || ''}
                    caption={item.imageCaption}
                  />
                ) : (
                  <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-[hsl(43,85%,55%,0.08)] to-[hsl(43,50%,30%,0.12)] border border-[hsl(43,85%,55%,0.1)] flex items-center justify-center">
                    <p className="text-muted-foreground/30 text-sm font-body">Historical illustration</p>
                  </div>
                )}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
    <EraTransition
      fromColor={ERA_COLORS.achaemenid}
      toColor={ERA_COLORS.achaemenid}
      year="499 BCE"
      label="The Wars Begin"
    />
  </section>
);
