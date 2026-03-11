import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { HistoricalImage } from '@/components/visuals/HistoricalImage';
import { SectionDivider } from '@/components/visuals/PersianPattern';

export const DariusSection = () => {
  const achievements = [
    {
      title: 'The Royal Road',
      desc: '2,700 km highway from Susa to Sardis. Messengers could traverse it in 7 days — a journey that took 90 days on foot.',
      stat: 2700, suffix: ' km', label: 'Royal Road length',
      image: '/images/tomb-of-cyrus.jpg',
      imageAlt: 'Tomb of Cyrus at Pasargadae',
      imageCaption: 'Tomb of Cyrus the Great at Pasargadae',
    },
    {
      title: 'The Daric',
      desc: 'The world\'s first standardized gold coin, enabling trade across three continents. A single currency for the largest empire on Earth.',
      stat: 20, suffix: ' satrapies', label: 'Provincial divisions',
      image: '/images/persepolis.jpg',
      imageAlt: 'Ruins of Persepolis',
      imageCaption: 'Palace of Xerxes at Persepolis',
    },
    {
      title: 'Postal System',
      desc: 'Herodotus wrote: "Neither snow nor rain nor heat nor darkness of night prevents these couriers." — a motto the US Postal Service adopted 2,400 years later.',
      stat: 111, suffix: '', label: 'Relay stations',
      image: null, imageAlt: '', imageCaption: '',
    },
    {
      title: 'Persepolis',
      desc: 'The ceremonial capital took 60 years to build. Its Apadana palace could hold 10,000 people. Twenty-three subject nations are carved into its staircases, each rendered with ethnographic precision.',
      stat: 125000, suffix: '', label: 'Square meters of terraces',
      image: '/images/persepolis.jpg',
      imageAlt: 'Persepolis palace ruins',
      imageCaption: 'Persepolis ruins today — UNESCO World Heritage Site',
    },
  ];

  return (
    <section id="darius" className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <RevealOnScroll className="text-center mb-16 md:mb-24">
          <p className="text-xs tracking-[0.3em] uppercase text-persian-gold/60 mb-4">518 BCE · The Builder King</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient-gold">Darius I</span>
            <br />
            <span className="text-foreground/70 text-2xl md:text-3xl font-light">& the Wonder of Persepolis</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-body leading-relaxed">
            Where Cyrus conquered, Darius organized. He transformed a vast empire
            into a functioning state — inventing infrastructure that wouldn't be
            matched for millennia.
          </p>
        </RevealOnScroll>

        {achievements.map((item, i) => (
          <RevealOnScroll key={i} delay={0.1 * i} className="mb-16 md:mb-24 last:mb-0">
            <div className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}>
              <div className="flex-1">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-persian-gold/80 mb-4">{item.title}</h3>
                <p className="text-foreground/75 text-lg leading-relaxed font-body mb-6">{item.desc}</p>
                <AnimatedCounter end={item.stat} suffix={item.suffix} label={item.label} className="text-left" />
              </div>
              <div className="flex-1 w-full">
                {item.image ? (
                  <HistoricalImage
                    src={item.image}
                    alt={item.imageAlt}
                    caption={item.imageCaption}
                    credit="Wikimedia Commons"
                    aspectRatio="4/3"
                  />
                ) : (
                  <div className="bg-gradient-to-br from-persian-gold/10 via-persian-terracotta/5 to-persian-sand/10 border border-persian-gold/10 rounded-lg flex items-center justify-center pattern-persian" style={{ aspectRatio: '4/3' }}>
                    <span className="text-muted-foreground/40 text-sm font-body">Historical illustration</span>
                  </div>
                )}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
      <SectionDivider className="mt-16" />
    </section>
  );
};
