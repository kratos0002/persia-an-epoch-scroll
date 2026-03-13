import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { InteractiveMap, EmpireId } from '@/components/visuals/InteractiveMap';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { QanatAnimation } from '@/components/visuals/QanatAnimation';
import { EraTransition, ERA_COLORS } from '@/components/visuals/EraTransition';

const TOTAL_STEPS = 7;
const QANAT_STEP = 3;

const stages: {
  empire: EmpireId;
  cities: string[];
  highlight: string[];
  center: [number, number];
  zoom: number;
  showTerritories?: boolean;
  routeCities?: string[];
  annotatedCities?: Array<{
    name: string;
    label: string;
    direction?: 'top' | 'right' | 'bottom' | 'left' | 'center';
    offset?: [number, number];
  }>;
  spotlight?: {
    name: string;
    eyebrow?: string;
    label: string;
    detail?: string;
    imageSrc?: string;
    imageAlt?: string;
    imagePosition?: string;
  };
}[] = [
  // Step 0 — The Provocation (Otrar)
  {
    empire: 'mongol',
    cities: ['Otrar', 'Samarkand', 'Merv', 'Baghdad', 'Isfahan', 'Tabriz'],
    highlight: ['Otrar'],
    center: [41, 66],
    zoom: 5.5,
    showTerritories: false,
    spotlight: {
      name: 'Otrar',
      eyebrow: '1219 CE',
      label: 'The Provocation',
      detail: 'Governor beheads envoys · Genghis sends a second embassy · They shave the beards',
      imageSrc: '/images/mongol-genghis.jpg',
      imageAlt: 'Genghis Khan — Yuan Dynasty imperial portrait',
      imagePosition: 'center 20%',
    },
  },
  // Step 1 — Samarkand Falls
  {
    empire: 'mongol',
    cities: ['Otrar', 'Samarkand', 'Merv', 'Baghdad', 'Isfahan', 'Tabriz'],
    highlight: ['Samarkand', 'Otrar'],
    center: [40, 66],
    zoom: 5,
    showTerritories: false,
    routeCities: ['Otrar', 'Samarkand'],
    spotlight: {
      name: 'Samarkand',
      eyebrow: '1220 CE',
      label: 'Samarkand Surrenders',
      detail: 'The city surrendered · Genghis executed the garrison anyway',
    },
  },
  // Step 2 — Merv: The Killing
  {
    empire: 'mongol',
    cities: ['Otrar', 'Samarkand', 'Merv', 'Baghdad', 'Isfahan', 'Tabriz'],
    highlight: ['Merv'],
    center: [37.5, 62],
    zoom: 5.5,
    routeCities: ['Otrar', 'Samarkand', 'Merv'],
    spotlight: {
      name: 'Merv',
      eyebrow: '1221 CE',
      label: 'The Killing',
      detail: 'Each soldier assigned 300–400 civilians · 1.3 million killed',
    },
  },
  // Step 3 — The Qanats: Civilizational Erasure (graphic overridden → QanatAnimation)
  {
    empire: 'mongol',
    cities: ['Samarkand', 'Merv', 'Isfahan', 'Baghdad', 'Tabriz'],
    highlight: ['Merv', 'Samarkand', 'Isfahan'],
    center: [35, 56],
    zoom: 4.2,
    showTerritories: true,
    routeCities: ['Otrar', 'Samarkand', 'Merv'],
    annotatedCities: [
      { name: 'Merv', label: 'Qanats destroyed', direction: 'top', offset: [0, -18] },
      { name: 'Samarkand', label: 'Canals diverted', direction: 'top', offset: [0, -18] },
    ],
  },
  // Step 4 — Baghdad Falls
  {
    empire: 'mongol',
    cities: ['Otrar', 'Samarkand', 'Merv', 'Baghdad', 'Isfahan', 'Tabriz'],
    highlight: ['Baghdad'],
    center: [33.3, 44.4],
    zoom: 5.5,
    routeCities: ['Otrar', 'Samarkand', 'Merv', 'Baghdad'],
    spotlight: {
      name: 'Baghdad',
      eyebrow: '1258 CE',
      label: 'The End',
      detail: 'Tigris ran black with ink, red with blood',
      imageSrc: '/images/mongol-baghdad-falls.jpg',
      imageAlt: 'Fall of Baghdad — Diez Albums miniature, 14th century',
      imagePosition: 'center 35%',
    },
  },
  // Step 5 — The Scale (Stats)
  {
    empire: 'mongol',
    cities: ['Otrar', 'Samarkand', 'Merv', 'Baghdad', 'Isfahan', 'Tabriz'],
    highlight: ['Otrar', 'Samarkand', 'Merv', 'Baghdad'],
    center: [35, 54],
    zoom: 4,
    showTerritories: true,
    routeCities: ['Otrar', 'Samarkand', 'Merv', 'Baghdad'],
  },
  // Step 6 — Absorption (Tabriz / Ilkhanate)
  {
    empire: 'mongol',
    cities: ['Tabriz', 'Isfahan', 'Baghdad', 'Samarkand', 'Merv'],
    highlight: ['Tabriz'],
    center: [37, 48],
    zoom: 4.5,
    showTerritories: false,
    spotlight: {
      name: 'Tabriz',
      eyebrow: '1295 CE',
      label: 'Jami\' al-Tawarikh',
      detail: 'The first world history — written by a Persian Jew for a Mongol khan',
      imageSrc: '/images/mongol-jami-al-tawarikh.jpg',
      imageAlt: 'Page from the Jami\' al-Tawarikh, Topkapi manuscript',
      imagePosition: 'center 20%',
    },
  },
];

export const MongolSection = () => (
    <section id="mongol" style={{ '--era-primary': ERA_COLORS.mongol } as React.CSSProperties}>
      <StickyScroll
        graphic={(activeStep, progress) => {
          // Step 5: Full-bleed cinematic stats
          if (activeStep === 5) {
            return (
              <div className="relative h-full w-full flex items-center justify-center bg-[hsl(220,18%,8%)]">
                <div className="grid grid-cols-2 gap-x-16 gap-y-14 md:gap-x-24 md:gap-y-20 px-8">
                  <AnimatedCounter end={90} suffix="%" label="Population lost in some cities" />
                  <AnimatedCounter end={1} suffix=".3M" label="Killed at Merv alone" />
                  <AnimatedCounter end={800} suffix=" yrs" label="To rebuild the irrigation" />
                  <AnimatedCounter end={39} suffix=" yrs" label="Otrar to Baghdad" />
                </div>
              </div>
            );
          }

          // Step 3: QanatAnimation with scroll-driven destruction
          if (activeStep === QANAT_STEP) {
            // Map overall progress to destruction within this step
            // Step 3 is roughly at progress 3/7 to 4/7 of the section
            const stepStart = QANAT_STEP / TOTAL_STEPS;
            const stepEnd = (QANAT_STEP + 1) / TOTAL_STEPS;
            const dp = Math.min(1, Math.max(0, (progress - stepStart) / (stepEnd - stepStart)));
            return (
              <div className="relative h-full w-full flex items-center justify-center bg-[hsl(220,18%,8%)]">
                <QanatAnimation destructionProgress={dp} className="w-full max-w-[90%] max-h-[80%]" />
              </div>
            );
          }

          const stage = stages[Math.min(activeStep, stages.length - 1)];
          return (
            <div className="relative h-full w-full">
              <InteractiveMap
                empire={stage.empire}
                showCities
                highlightCities={stage.highlight}
                visibleCities={stage.cities}
                center={stage.center}
                zoom={stage.zoom}
                showTerritories={stage.showTerritories}
                routeCities={stage.routeCities}
                annotatedCities={stage.annotatedCities}
                spotlightCity={stage.spotlight}
              />
            </div>
          );
        }}
        steps={[
          <div key={0}>
            <p className="text-xs tracking-[0.3em] uppercase text-[hsl(25,70%,50%,0.7)] mb-4">1219 CE</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              <span className="text-[hsl(25,70%,55%)]">The Provocation</span>
            </h2>
            <p className="text-foreground/80 text-lg leading-relaxed font-body mb-4">
              Genghis Khan sent a trade caravan to the Khwarezmian city of Otrar. The governor,
              Inalchuq, accused them of spying and executed every one.
            </p>
            <p className="text-foreground/60 leading-relaxed font-body mb-4">
              The Khan, still willing to negotiate, sent three ambassadors to demand justice.
              The Shah shaved the beards of two and beheaded the third.
            </p>
            <p className="text-foreground/50 leading-relaxed font-body">
              In Mongol culture, ambassadors were sacred. To kill one was to declare war on the entire steppe.
              Genghis Khan assembled the largest army the world had ever seen.
            </p>
          </div>,
          <div key={1}>
            <p className="text-xs tracking-[0.3em] uppercase text-[hsl(25,70%,50%,0.7)] mb-4">1220 CE</p>
            <h3 className="font-display text-xl font-bold mb-4 text-[hsl(25,70%,55%,0.85)]">Samarkand</h3>
            <p className="text-foreground/80 leading-relaxed font-body mb-4">
              The jewel of Central Asia surrendered after five days. The garrison was promised mercy.
            </p>
            <p className="text-foreground/60 leading-relaxed font-body mb-4">
              Genghis executed them anyway — every soldier who had resisted. The artisans were enslaved.
              The scholars were scattered. The population was driven from the city.
            </p>
            <p className="text-foreground/50 leading-relaxed font-body">
              The message was clear: surrender immediately, or this happens. It was a policy of
              calculated terror — and it worked.
            </p>
          </div>,
          <div key={2}>
            <p className="text-xs tracking-[0.3em] uppercase text-[hsl(25,70%,50%,0.7)] mb-4">1221 CE</p>
            <h3 className="font-display text-xl font-bold mb-4 text-[hsl(25,70%,55%,0.85)]">Merv</h3>
            <p className="text-foreground/80 leading-relaxed font-body mb-4">
              Tolui, Genghis Khan&apos;s youngest son, arrived with an army. Merv was the largest city in the world.
            </p>
            <p className="text-foreground/60 leading-relaxed font-body mb-4">
              The inhabitants were led outside the walls and divided among the soldiers.
              Each Mongol warrior was assigned 300 to 400 people to execute. The killing took days.
            </p>
            <p className="text-foreground/50 leading-relaxed font-body">
              An estimated 1.3 million people were killed — the worst single-city massacre in pre-modern history.
              Merv, which had stood for two thousand years, ceased to exist.
            </p>
          </div>,
          <div key={3}>
            <h3 className="font-display text-xl font-bold mb-4 text-[hsl(25,70%,55%,0.85)]">
              The Qanats
            </h3>
            <p className="text-foreground/80 leading-relaxed font-body mb-4">
              The Mongols did not just kill people. They killed the land.
            </p>
            <p className="text-foreground/60 leading-relaxed font-body mb-4">
              For two thousand years, Persian engineers had built qanats — underground channels that carried
              snowmelt from the mountains to the plains. These invisible rivers sustained millions of people
              across the Iranian plateau. They were the reason civilization could exist in a desert.
            </p>
            <p className="text-foreground/80 leading-relaxed font-body mb-4 text-[hsl(25,70%,55%,0.9)]">
              The Mongols destroyed them deliberately.
            </p>
            <p className="text-foreground/60 leading-relaxed font-body mb-4">
              They collapsed the tunnels. They diverted the canals. They slaughtered the engineers
              who knew how to maintain them. Fertile regions that had fed empires became desert — permanently.
            </p>
            <p className="text-foreground/50 leading-relaxed font-body font-semibold">
              The irrigation systems took 800 years to rebuild. Some regions of Iran never recovered their
              pre-Mongol population levels until the twentieth century.
            </p>
          </div>,
          <div key={4}>
            <p className="text-xs tracking-[0.3em] uppercase text-[hsl(25,70%,50%,0.7)] mb-4">1258 CE</p>
            <h3 className="font-display text-xl font-bold mb-4 text-[hsl(25,70%,55%,0.85)]">Baghdad</h3>
            <p className="text-foreground/80 leading-relaxed font-body mb-4">
              Hulagu Khan — Genghis&apos;s grandson — gave Caliph al-Musta&apos;sim a choice: open the gates, or watch his
              city disappear. The Caliph refused.
            </p>
            <p className="text-foreground/60 leading-relaxed font-body mb-4">
              The Mongols breached the walls in two weeks. The House of Wisdom was burned. Its manuscripts — centuries
              of mathematics, astronomy, medicine, philosophy — were thrown into the Tigris.
              The river ran black with ink and red with blood.
            </p>
            <p className="text-foreground/50 leading-relaxed font-body mb-6">
              Between 200,000 and one million people were killed. The Abbasid Caliphate, which had ruled the
              Islamic world for 500 years, ended. The Golden Age was over.
            </p>
            <a
              href="/wisdom"
              className="inline-flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase font-body text-[hsl(170,40%,40%)] hover:text-[hsl(170,40%,50%)] transition-colors"
            >
              The House of Wisdom — full essay
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>,
          <div key={5}>
            <h3 className="font-display text-xl font-bold mb-6 text-[hsl(25,70%,55%,0.85)]">
              The Scale
            </h3>
            <p className="text-foreground/60 leading-relaxed font-body mb-6">
              In thirty-nine years, the Mongols erased what had taken centuries to build.
              Cities that had been the largest in the world became ruins. Farmland became desert.
              Libraries became ash.
            </p>
            <blockquote className="border-l-2 border-[hsl(25,70%,50%,0.3)] pl-5 mb-2">
              <p className="text-foreground/50 text-lg font-body italic leading-relaxed">
                &quot;They came, they sapped, they burnt, they slew, they plundered, and they departed.&quot;
              </p>
            </blockquote>
            <p className="text-foreground/30 text-xs font-body pl-5">— Ata-Malik Juvayni</p>
          </div>,
          <div key={6}>
            <p className="text-xs tracking-[0.3em] uppercase text-[hsl(25,70%,50%,0.7)] mb-4">1295 CE</p>
            <h3 className="font-display text-xl font-bold mb-4 text-[hsl(25,70%,55%,0.85)]">
              But Persians Endured
            </h3>
            <p className="text-foreground/80 leading-relaxed font-body mb-4">
              Within one generation, the Mongol Ilkhanate converted to Islam. Within two, Persian was the
              administrative language of the conquerors&apos; empire.
            </p>
            <p className="text-foreground/60 leading-relaxed font-body mb-4">
              Tabriz became a center of Mongol-Persian fusion. Rashid al-Din — a Persian Jew serving a Mongol
              khan — wrote the <em>Jami&apos; al-Tawarikh</em>, the first attempt at a world history.
            </p>
            <p className="text-foreground/50 leading-relaxed font-body">
              The pattern held: Persia absorbed its conquerors again. Culture outlasted the sword.
              But the scars ran deeper this time. The desert that the Mongols made is still desert.
            </p>
          </div>,
        ]}
      />

      <EraTransition
        fromColor={ERA_COLORS.mongol}
        toColor={ERA_COLORS.safavid}
        year="1501 CE"
        label="Rebirth"
      />
    </section>
);
