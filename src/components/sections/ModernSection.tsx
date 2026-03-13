import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { InteractiveMap } from '@/components/visuals/InteractiveMap';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { EraWaypoint } from '@/components/visuals/EraWaypoint';
import { ERA_COLORS } from '@/data/eras';
import type { EmpireId } from '@/components/visuals/InteractiveMap';

/* ─────────────────── Stage definitions ─────────────────── */

interface ModernStage {
  empire: EmpireId;
  cities: string[];
  highlight: string[];
  center: [number, number];
  zoom: number;
  showTerritories?: boolean;
  spotlight?: {
    name: string;
    eyebrow?: string;
    label: string;
    detail?: string;
  };
}

const stages: ModernStage[] = [
  // Step 0 — The Modern Era
  {
    empire: 'modern',
    cities: ['Tabriz', 'Isfahan', 'Qazvin'],
    highlight: ['Tabriz'],
    center: [32, 53],
    zoom: 5.2,
    showTerritories: true,
    spotlight: {
      name: 'Tabriz',
      eyebrow: '1905 CE',
      label: 'Where It Begins',
      detail: 'The Constitutional Revolution starts in Tabriz',
    },
  },
  // Step 1 — Constitutional Revolution (graphic override)
  {
    empire: 'modern',
    cities: ['Tabriz', 'Isfahan'],
    highlight: ['Tabriz'],
    center: [32, 53],
    zoom: 5.2,
  },
  // Step 2 — Road to Revolution (graphic override)
  {
    empire: 'modern',
    cities: ['Tabriz', 'Isfahan'],
    highlight: [],
    center: [32, 53],
    zoom: 5.2,
  },
  // Step 3 — The Shah Leaves (graphic override)
  {
    empire: 'modern',
    cities: ['Tabriz', 'Isfahan'],
    highlight: [],
    center: [32, 53],
    zoom: 5.2,
  },
  // Step 4 — The Islamic Republic
  {
    empire: 'modern',
    cities: ['Tabriz', 'Isfahan', 'Qazvin'],
    highlight: ['Isfahan'],
    center: [32, 53],
    zoom: 5.2,
    showTerritories: true,
  },
  // Step 5 — Iran Today (graphic override)
  {
    empire: 'modern',
    cities: ['Tabriz', 'Isfahan', 'Qazvin'],
    highlight: [],
    center: [32, 53],
    zoom: 5.2,
  },
];

const CONSTITUTION_STEP = 1;
const TIMELINE_STEP = 2;
const SHAH_STEP = 3;
const REPUBLIC_STEP = 4;
const STATS_STEP = 5;

/* ─────────────────── Constitutional Revolution ─────────────────── */

const ConstitutionPanel = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[hsl(220,15%,6%)] via-[hsl(220,12%,10%)] to-[hsl(220,15%,6%)] relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, hsl(220,15%,50%) 0px, transparent 1px, transparent 40px)',
      }}
    />
    <div className="relative z-10 max-w-lg px-8 text-center">
      <p className="text-xs tracking-[0.4em] uppercase text-foreground/30 mb-6">
        1906
      </p>
      <p className="font-display text-5xl md:text-7xl font-bold text-foreground/90 mb-6">
        A Constitution
      </p>
      <div className="w-16 h-px bg-foreground/15 mx-auto mb-6" />
      <p className="text-foreground/50 font-body text-lg leading-relaxed">
        One of the first in Asia. A parliament wrested from the Qajar shahs.
        The seeds of democracy planted — then repeatedly uprooted.
      </p>
    </div>
  </div>
);

/* ─────────────────── Revolution timeline ─────────────────── */

const REVOLUTION_EVENTS = [
  { year: '1953', event: 'CIA-MI6 coup overthrows PM Mosaddegh', delay: 0.5 },
  { year: '1963', event: "Shah's White Revolution — rapid modernization", delay: 1.5 },
  { year: '1978', event: 'Mass protests erupt across Iran', delay: 2.5 },
  { year: '1979', event: 'Islamic Revolution — Shah flees', delay: 3.5 },
  { year: '1979', event: 'Ayatollah Khomeini returns from exile', delay: 4.3 },
];

const RevolutionTimeline = () => (
  <div className="w-full h-full flex items-center justify-center bg-[hsl(220,15%,6%)] relative overflow-hidden">
    {/* Vertical line */}
    <div
      className="absolute left-[30%] top-[10%] w-px bg-foreground/10 origin-top"
      style={{ height: 0, animation: 'timelineGrow 3s 0.2s ease-out forwards' }}
    />

    <div className="absolute left-[30%] top-[10%] w-[60%] pt-4">
      {REVOLUTION_EVENTS.map((evt) => (
        <div
          key={`${evt.year}-${evt.event.slice(0, 10)}`}
          className="flex items-baseline gap-5 py-4 opacity-0"
          style={{ animation: `timelineEventIn 0.6s ${evt.delay}s ease-out forwards` }}
        >
          <span className="font-display text-xl font-bold text-foreground/40 shrink-0 -ml-[30%] w-[30%] text-right pr-5">
            {evt.year}
          </span>
          <div className="relative">
            <div className="absolute -left-[13px] top-[10px] w-2 h-2 rounded-full bg-foreground/30" />
            <p className="text-foreground/60 font-body text-base">{evt.event}</p>
          </div>
        </div>
      ))}
    </div>

    <style>{`
      @keyframes timelineGrow {
        0% { height: 0; }
        100% { height: 80%; }
      }
      @keyframes timelineEventIn {
        0% { opacity: 0; transform: translateX(-10px); }
        100% { opacity: 1; transform: translateX(0); }
      }
    `}</style>
  </div>
);

/* ─────────────────── Shah leaving — full-screen image ─────────────────── */

const ShahLeavingImage = () => (
  <div className="w-full h-full flex items-center justify-center bg-black/40">
    <div className="relative">
      <img
        src="/images/shah-leaving-1979.jpg"
        alt="Shah leaving Iran, January 16, 1979"
        className="max-h-[85vh] max-w-[72vw] object-contain rounded-lg shadow-2xl"
      />
      <p className="absolute -bottom-12 left-0 right-0 text-center text-sm text-foreground/40 font-body italic">
        January 16, 1979 — The Shah leaves Iran for the last time
      </p>
    </div>
  </div>
);

/* ─────────────────── Islamic Republic — Azadi Tower ─────────────────── */

const AzadiTowerImage = () => (
  <div className="w-full h-full flex items-center justify-center bg-black/40">
    <div className="relative">
      <img
        src="/images/islamic-revolution-1979.jpg"
        alt="1979 Islamic Revolution — crowds at Azadi Tower, Tehran"
        className="max-h-[85vh] max-w-[72vw] object-contain rounded-lg shadow-2xl"
      />
      <p className="absolute -bottom-12 left-0 right-0 text-center text-sm text-foreground/40 font-body italic">
        Tehran, 1979 — Azadi Tower and the revolution that remade Iran
      </p>
    </div>
  </div>
);

/* ─────────────────── The Thread — closing panel ─────────────────── */

const ERAS = [
  { name: 'Achaemenid', color: 'hsl(43,85%,55%)', delay: 0.3 },
  { name: 'Alexander', color: 'hsl(270,40%,50%)', delay: 0.7 },
  { name: 'Parthian', color: 'hsl(350,60%,45%)', delay: 1.1 },
  { name: 'Sassanid', color: 'hsl(350,55%,40%)', delay: 1.5 },
  { name: 'Islamic Golden Age', color: 'hsl(160,45%,38%)', delay: 1.9 },
  { name: 'Mongol', color: 'hsl(25,70%,50%)', delay: 2.3 },
  { name: 'Safavid', color: 'hsl(215,65%,45%)', delay: 2.7 },
  { name: 'Modern', color: 'hsl(220,15%,50%)', delay: 3.1 },
];

const TheThreadPanel = () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[hsl(220,15%,5%)] via-[hsl(220,12%,8%)] to-[hsl(220,15%,5%)] relative overflow-hidden">
    {/* Vertical thread */}
    <div
      className="absolute left-1/2 top-[6%] w-px origin-top opacity-0"
      style={{
        backgroundColor: 'hsl(43,85%,55%,0.2)',
        height: 0,
        animation: 'threadGrow 3.5s 0s ease-out forwards',
      }}
    />

    {/* Era names cascade upward */}
    <div className="relative z-10 flex flex-col items-center gap-3 mb-10">
      {ERAS.map((era) => (
        <p
          key={era.name}
          className="font-display text-sm tracking-[0.15em] opacity-0"
          style={{
            color: era.color,
            animation: `eraNameIn 0.6s ${era.delay}s ease-out forwards`,
          }}
        >
          {era.name}
        </p>
      ))}
    </div>

    {/* Persian script — Iran */}
    <div
      className="relative z-10 opacity-0 mb-8"
      style={{ animation: 'eraNameIn 1s 3.8s ease-out forwards' }}
    >
      <p className="font-display text-5xl md:text-6xl text-foreground/90" style={{ direction: 'rtl' }}>
        ایران
      </p>
    </div>

    {/* Ferdowsi closing line */}
    <div
      className="relative z-10 opacity-0 max-w-md px-8 text-center"
      style={{ animation: 'eraNameIn 1.2s 4.8s ease-out forwards' }}
    >
      <div className="w-12 h-px bg-[hsl(43,85%,55%,0.3)] mx-auto mb-5" />
      <p className="text-foreground/50 font-body text-base leading-relaxed italic mb-2">
        &ldquo;I suffered much hardship for these thirty years.
        I revived the Persians with this Persian language.&rdquo;
      </p>
      <p className="text-foreground/30 font-body text-xs">
        — Ferdowsi, Shahnameh
      </p>
    </div>

    <style>{`
      @keyframes threadGrow {
        0% { height: 0; opacity: 0; }
        10% { opacity: 0.15; }
        100% { height: 88%; opacity: 0.1; }
      }
      @keyframes eraNameIn {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  </div>
);

/* ─────────────────── Component ─────────────────── */

export const ModernSection = () => (
  <section id="modern" style={{ '--era-primary': ERA_COLORS.modern } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => {
        const s = stages[activeStep] ?? stages[0];

        if (activeStep === CONSTITUTION_STEP) return <ConstitutionPanel />;
        if (activeStep === TIMELINE_STEP) return <RevolutionTimeline />;
        if (activeStep === SHAH_STEP) return <ShahLeavingImage />;
        if (activeStep === REPUBLIC_STEP) return <AzadiTowerImage />;
        if (activeStep === STATS_STEP) return <TheThreadPanel />;

        return (
          <InteractiveMap
            empire={s.empire}
            showCities
            visibleCities={s.cities}
            highlightCities={s.highlight}
            center={s.center}
            zoom={s.zoom}
            showTerritories={s.showTerritories}
            spotlightCity={s.spotlight}
          />
        );
      }}
      steps={[
        /* Step 0 — The Modern Era */
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(220,15%,60%,0.7)] mb-4">1905 CE</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            <span className="text-foreground/90">The Modern Era</span>
          </h2>
          <p className="text-foreground/70 text-lg leading-relaxed font-body mb-4">
            A century of revolutions, oil, and identity.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body">
            The Qajar dynasty stumbled into the twentieth century — bankrupt,
            humiliated by colonial concessions, and facing a population that had
            begun to imagine a different Iran.
          </p>
        </div>,

        /* Step 1 — Constitutional Revolution */
        <div key={1}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(220,15%,60%,0.7)] mb-4">1906 CE</p>
          <h3 className="font-display text-xl font-bold mb-4 text-foreground/80">
            The Constitutional Revolution
          </h3>
          <p className="text-foreground/70 leading-relaxed font-body mb-4">
            Merchants, clerics, and intellectuals united to demand a constitution.
            In 1906, Mozaffar ad-Din Shah signed — creating Iran&apos;s first parliament.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body">
            It was one of the first democratic movements in Asia. But democracy
            in Iran would prove easier to proclaim than to protect.
          </p>
        </div>,

        /* Step 2 — Road to Revolution */
        <div key={2}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(220,15%,60%,0.7)] mb-4">1953–1979</p>
          <h3 className="font-display text-xl font-bold mb-4 text-foreground/80">
            Road to Revolution
          </h3>
          <p className="text-foreground/70 leading-relaxed font-body mb-4">
            In 1953, the CIA and MI6 overthrew the elected Prime Minister Mosaddegh —
            restoring the Shah&apos;s absolute power and poisoning Iran&apos;s
            relationship with the West for generations.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body">
            The Shah modernized rapidly but brutally. Secret police silenced dissent.
            By 1978, the streets belonged to the people again.
          </p>
        </div>,

        /* Step 3 — The Shah Leaves */
        <div key={3}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(220,15%,60%,0.7)] mb-4">January 16, 1979</p>
          <h3 className="font-display text-xl font-bold mb-4 text-foreground/80">
            The Shah Leaves
          </h3>
          <p className="text-foreground/70 leading-relaxed font-body mb-4">
            The Pahlavi dynasty ended not with a battle, but a departure.
            Mohammad Reza Shah boarded a plane and never returned.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body">
            Two weeks later, Ayatollah Khomeini landed in Tehran to crowds
            of millions. The Islamic Republic was declared on April 1, 1979.
          </p>
        </div>,

        /* Step 4 — The Islamic Republic */
        <div key={4}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(220,15%,60%,0.7)] mb-4">1979 – Present</p>
          <h3 className="font-display text-xl font-bold mb-4 text-foreground/80">
            The Islamic Republic
          </h3>
          <p className="text-foreground/70 leading-relaxed font-body mb-4">
            Eight years of war with Iraq. Sanctions. Isolation. And through it all,
            a young, educated population pressing against the boundaries of the state.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body">
            Iran today is 88 million people — 60% under thirty — heirs to
            2,500 years of continuous civilization, still negotiating the terms
            of their modernity.
          </p>
        </div>,

        /* Step 5 — The Thread */
        <div key={5}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(220,15%,60%,0.7)] mb-4">2,500 Years</p>
          <h3 className="font-display text-xl font-bold mb-4 text-foreground/80">
            The Thread
          </h3>
          <p className="text-foreground/70 leading-relaxed font-body mb-4">
            From Cyrus to Khomeini. From Persepolis to Tehran.
            From Zoroaster to the Twelfth Imam. The names change.
            The thread does not.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body mb-6">
            88 million people. 97% literate. 60% under thirty.
            Heirs to the oldest continuous civilization on Earth —
            still writing the next chapter.
          </p>
          <p className="text-foreground/40 leading-relaxed font-body italic">
            No civilization has reinvented itself this many times
            and remained, recognizably, itself.
          </p>
        </div>,
      ]}
    />

    <EraWaypoint activeIndex={10} label="The Legacy" isEpilogue />
  </section>
);
