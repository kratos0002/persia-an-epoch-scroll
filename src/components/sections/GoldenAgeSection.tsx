import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { InteractiveMap, EmpireId } from '@/components/visuals/InteractiveMap';
import { GoldenAgeIntroGraphic } from '@/components/visuals/GoldenAgeIntroGraphic';
import { EraWaypoint } from '@/components/visuals/EraWaypoint';
import { ERA_COLORS } from '@/data/eras';

const stages: {
  empire: EmpireId;
  cities: string[];
  highlight: string[];
  center: [number, number];
  zoom: number;
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
  // Step 0 — Intro panoramic
  {
    empire: 'islamic',
    cities: ['Baghdad', 'Isfahan', 'Samarkand', 'Merv', 'Nishapur', 'Tus', 'Konya'],
    highlight: ['Baghdad', 'Isfahan', 'Samarkand', 'Merv'],
    center: [34, 48],
    zoom: 3.8,
  },
  // Step 1 — Al-Khwarizmi (Baghdad)
  {
    empire: 'islamic',
    cities: ['Baghdad', 'Isfahan', 'Samarkand', 'Merv', 'Nishapur', 'Tus', 'Konya'],
    highlight: ['Baghdad'],
    center: [33.3, 44.4],
    zoom: 6,
    spotlight: {
      name: 'Baghdad',
      eyebrow: '780–850 CE',
      label: 'Al-Khwarizmi',
      detail: 'House of Wisdom · Invented algebra · Gave us "algorithm"',
      imageSrc: '/images/scholar-khwarizmi.jpg',
      imageAlt: 'Al-Khwarizmi',
      imagePosition: 'center 20%',
    },
  },
  // Step 2 — Ibn Sina (Isfahan)
  {
    empire: 'islamic',
    cities: ['Baghdad', 'Isfahan', 'Samarkand', 'Merv', 'Nishapur', 'Tus', 'Konya'],
    highlight: ['Isfahan'],
    center: [33.5, 50],
    zoom: 5.5,
    spotlight: {
      name: 'Isfahan',
      eyebrow: '980–1037 CE',
      label: 'Ibn Sina',
      detail: 'The Canon of Medicine — standard text for 600 years',
      imageSrc: '/images/scholar-ibn-sina.jpg',
      imageAlt: 'Ibn Sina (Avicenna) — 1271 manuscript miniature',
      imagePosition: 'center 15%',
    },
  },
  // Step 3 — Omar Khayyam (Nishapur)
  {
    empire: 'islamic',
    cities: ['Baghdad', 'Isfahan', 'Samarkand', 'Merv', 'Nishapur', 'Tus', 'Konya'],
    highlight: ['Nishapur'],
    center: [36.2, 58.8],
    zoom: 6,
    spotlight: {
      name: 'Nishapur',
      eyebrow: '1048–1131 CE',
      label: 'Omar Khayyam',
      detail: 'Cubic equations · Calendar reform · The Rubaiyat',
      imageSrc: '/images/scholar-khayyam.jpg',
      imageAlt: 'Omar Khayyam',
      imagePosition: 'center 20%',
    },
  },
  // Step 4 — Ferdowsi (Tus)
  {
    empire: 'islamic',
    cities: ['Baghdad', 'Isfahan', 'Samarkand', 'Merv', 'Nishapur', 'Tus', 'Konya'],
    highlight: ['Tus'],
    center: [36.6, 59.2],
    zoom: 6,
    spotlight: {
      name: 'Tus',
      eyebrow: '940–1020 CE',
      label: 'Ferdowsi',
      detail: '50,000 couplets preserving Persian identity',
      imageSrc: '/images/scholar-ferdowsi.jpg',
      imageAlt: 'Ferdowsi, poet of the Shahnameh',
      imagePosition: 'center 25%',
    },
  },
  // Step 5 — Rumi (Konya)
  {
    empire: 'islamic',
    cities: ['Baghdad', 'Isfahan', 'Samarkand', 'Merv', 'Nishapur', 'Tus', 'Konya'],
    highlight: ['Konya'],
    center: [37.9, 32.5],
    zoom: 5.5,
    spotlight: {
      name: 'Konya',
      eyebrow: '1207–1273 CE',
      label: 'Rumi',
      detail: 'Best-selling poet in America — 800 years later',
      imageSrc: '/images/scholar-rumi.jpg',
      imageAlt: 'Rumi — painting by Hossein Behzad',
      imagePosition: 'center 15%',
    },
  },
  // Step 6 — Knowledge Transmission
  {
    empire: 'islamic',
    cities: ['Baghdad', 'Samarkand', 'Merv', 'Constantinople', 'Cordoba', 'Toledo'],
    highlight: ['Baghdad', 'Toledo', 'Cordoba', 'Constantinople'],
    center: [36, 30],
    zoom: 3.5,
    routeCities: ['Samarkand', 'Merv', 'Baghdad', 'Constantinople', 'Cordoba'],
    annotatedCities: [
      { name: 'Toledo', label: '87 texts translated to Latin', direction: 'top', offset: [0, -18] },
    ],
  },
];

export const GoldenAgeSection = () => (
  <section id="golden-age" style={{ '--era-primary': ERA_COLORS.goldenAge } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => {
        // Step 0: Constellation of knowledge — cities as luminous nodes
        if (activeStep === 0) return <GoldenAgeIntroGraphic />;

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
              showTerritories={false}
              routeCities={stage.routeCities}
              annotatedCities={stage.annotatedCities}
              spotlightCity={stage.spotlight}
            />
          </div>
        );
      }}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(160,50%,40%,0.6)] mb-4">800–1200 CE</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            <span className="text-[hsl(160,50%,45%)]">The Islamic Golden Age</span>
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed font-body mb-4">
            While Europe slept in the Dark Ages, Persians lit the world.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body">
            They didn&apos;t just preserve Greek knowledge. They transformed it. Algebra, optics, medicine, poetry — Persian scholars working in Arabic became the most advanced civilization on Earth.
          </p>
        </div>,
        <div key={1}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(160,50%,40%,0.7)] mb-4">780–850 CE · Mathematics</p>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(160,50%,45%,0.85)]">Al-Khwarizmi</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            At the House of Wisdom in Baghdad, he wrote <em>al-Kitāb al-Mukhtaṣar</em> — the book that invented algebra. The title gave us the word.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body mb-4">
            His name, Latinized, gave us another word: <em>algorithm</em>.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body">
            Every line of code running in every computer on Earth descends from his work.
          </p>
        </div>,
        <div key={2}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(160,50%,40%,0.7)] mb-4">980–1037 CE · Medicine</p>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(160,50%,45%,0.85)]">Ibn Sina (Avicenna)</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            His <em>Canon of Medicine</em> organized all existing medical knowledge into a single, logical system. It was the standard textbook in European universities for 600 years.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body mb-4">
            He described meningitis, recognized that tuberculosis was contagious, and understood that diseases could spread through water — seven centuries before germ theory.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body">
            In Isfahan, they still call him the &quot;Prince of Physicians.&quot;
          </p>
        </div>,
        <div key={3}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(160,50%,40%,0.7)] mb-4">1048–1131 CE · Mathematics & Poetry</p>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(160,50%,45%,0.85)]">Omar Khayyam</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            At the observatory in Nishapur, he calculated the length of the year to within 6 decimal places — more accurate than the Gregorian calendar introduced 500 years later.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body mb-4">
            He solved cubic equations geometrically. He wrote the <em>Rubaiyat</em>, the most translated book of Persian poetry in history.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body">
            Mathematician, astronomer, philosopher, poet. He saw no contradiction.
          </p>
        </div>,
        <div key={4}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(160,50%,40%,0.7)] mb-4">940–1020 CE · Literature</p>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(160,50%,45%,0.85)]">Ferdowsi</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            For 30 years in Tus, he composed the <em>Shahnameh</em> — 50,000 couplets telling the mythic history of Persia from creation to the Arab conquest.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body mb-4">
            He deliberately avoided Arabic words, forging a pure Persian text. It became the anchor of Iranian identity — proof that conquest could not erase a language.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body">
            The Shahnameh is still recited today. Iranians know its verses the way Greeks know Homer.
          </p>
        </div>,
        <div key={5}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(160,50%,40%,0.7)] mb-4">1207–1273 CE · Poetry & Mysticism</p>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(160,50%,45%,0.85)]">Rumi</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            Born in Balkh, he fled the Mongol advance and settled in Konya. There, after meeting the wandering dervish Shams, he was transformed from a scholar into a poet.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body mb-4">
            His <em>Masnavi</em> — 26,000 couplets — is called the &quot;Quran in Persian.&quot; His followers founded the Whirling Dervishes.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body">
            800 years later, he is the best-selling poet in America. The words still land.
          </p>
        </div>,
        <div key={6}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(160,50%,40%,0.7)] mb-4">1100–1300 CE</p>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(160,50%,45%,0.85)]">The Knowledge Flows West</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            Arabic manuscripts traveled from Samarkand through Baghdad to Constantinople and Cordoba. In Toledo, Gerard of Cremona translated 87 texts to Latin — the largest translation effort of the Middle Ages.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body mb-4">
            European scholars discovered algebra, optics, astronomy, and medicine — all filtered through Persian and Arab minds. Without this transmission, there is no Renaissance.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body">
            The light that Europe called its &quot;rebirth&quot; had been burning in Persia for four centuries.
          </p>
        </div>,
      ]}
    />
    <EraWaypoint activeIndex={8} label="The Catastrophe" year="1219 CE" />
  </section>
);
