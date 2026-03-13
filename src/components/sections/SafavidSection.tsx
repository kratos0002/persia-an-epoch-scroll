import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { InteractiveMap } from '@/components/visuals/InteractiveMap';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { EraWaypoint } from '@/components/visuals/EraWaypoint';
import { ERA_COLORS } from '@/data/eras';
import type { EmpireId } from '@/components/visuals/InteractiveMap';

/* ─────────────────── Stage definitions ─────────────────── */

interface SafavidStage {
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
}

const stages: SafavidStage[] = [
  // Step 0 — The Founding (Tabriz, 1501)
  {
    empire: 'safavid',
    cities: ['Tabriz', 'Isfahan', 'Baghdad', 'Qazvin'],
    highlight: ['Tabriz'],
    center: [38, 46],
    zoom: 5.5,
    showTerritories: false,
    spotlight: {
      name: 'Tabriz',
      eyebrow: '1501 CE',
      label: 'A Kingdom from Nothing',
      detail: 'Ismail crowned at 14 · Conquers Tabriz with his Qizilbash warriors',
      imageSrc: '/images/shah-ismail-i.jpg',
      imageAlt: 'Shah Ismail I',
      imagePosition: 'center 20%',
    },
  },
  // Step 1 — The Conversion (graphic override — dramatic typography)
  {
    empire: 'safavid',
    cities: ['Tabriz', 'Isfahan', 'Baghdad', 'Qazvin'],
    highlight: ['Tabriz'],
    center: [35, 48],
    zoom: 5,
  },
  // Step 2 — The Conversion Spreads (map with radiating routes)
  {
    empire: 'safavid',
    cities: ['Tabriz', 'Isfahan', 'Baghdad', 'Qazvin', 'Nishapur', 'Merv'],
    highlight: ['Tabriz', 'Isfahan', 'Qazvin', 'Baghdad', 'Nishapur'],
    center: [35, 50],
    zoom: 4.8,
    showTerritories: false,
    routeCities: ['Tabriz', 'Qazvin', 'Isfahan'],
    annotatedCities: [
      { name: 'Isfahan', label: 'Converted', direction: 'right' },
      { name: 'Qazvin', label: 'Converted', direction: 'right' },
      { name: 'Baghdad', label: 'Shia shrines reclaimed', direction: 'bottom' },
      { name: 'Nishapur', label: 'Converted', direction: 'right' },
    ],
  },
  // Step 3 — Chaldiran (1514)
  {
    empire: 'safavid',
    cities: ['Tabriz', 'Isfahan', 'Qazvin', 'Baghdad'],
    highlight: ['Tabriz'],
    center: [39, 44],
    zoom: 5.5,
    routeCities: ['Baghdad', 'Tabriz'],
    spotlight: {
      name: 'Tabriz',
      eyebrow: '1514 CE',
      label: 'Chaldiran',
      detail: 'Ottoman guns vs. Safavid cavalry · The empire nearly dies at birth',
    },
  },
  // Step 4 — Qazvin: The Middle Capital (1555)
  {
    empire: 'safavid',
    cities: ['Tabriz', 'Isfahan', 'Qazvin', 'Baghdad'],
    highlight: ['Qazvin', 'Tabriz'],
    center: [36.5, 50],
    zoom: 5.5,
    showTerritories: false,
    routeCities: ['Tabriz', 'Qazvin'],
    annotatedCities: [
      { name: 'Tabriz', label: 'Ottoman raids', direction: 'top' },
    ],
    spotlight: {
      name: 'Qazvin',
      eyebrow: '1555 CE',
      label: 'Strategic Retreat',
      detail: 'Shah Tahmasp moves the capital inland · Away from Ottoman raids',
    },
  },
  // Step 5 — Shah Abbas the Great (Isfahan, 1598)
  {
    empire: 'safavid',
    cities: ['Tabriz', 'Isfahan', 'Qazvin', 'Baghdad', 'Samarkand', 'Merv'],
    highlight: ['Isfahan'],
    center: [32.65, 51.68],
    zoom: 5.5,
    showTerritories: true,
    routeCities: ['Tabriz', 'Qazvin', 'Isfahan'],
    spotlight: {
      name: 'Isfahan',
      eyebrow: '1598 CE',
      label: '"Half the World"',
      detail: 'Shah Abbas moves the capital · Builds the most beautiful city on Earth',
      imageSrc: '/images/safavid-shah-abbas.jpg',
      imageAlt: 'Shah Abbas I',
      imagePosition: 'center 20%',
    },
  },
  // Step 6 — Naqsh-e Jahan (full-screen image)
  {
    empire: 'safavid',
    cities: ['Tabriz', 'Isfahan', 'Qazvin', 'Baghdad', 'Samarkand', 'Merv'],
    highlight: ['Isfahan'],
    center: [32.65, 51.68],
    zoom: 5.5,
    routeCities: ['Tabriz', 'Qazvin', 'Isfahan'],
  },
  // Step 7 — Art & Empire (stats)
  {
    empire: 'safavid',
    cities: ['Tabriz', 'Isfahan', 'Qazvin', 'Baghdad', 'Samarkand', 'Merv'],
    highlight: ['Isfahan', 'Tabriz', 'Qazvin'],
    center: [33, 50],
    zoom: 4.5,
    routeCities: ['Tabriz', 'Qazvin', 'Isfahan'],
  },
  // Step 8 — The Fall & Endurance (1722)
  {
    empire: 'safavid',
    cities: ['Tabriz', 'Isfahan', 'Qazvin', 'Baghdad', 'Merv'],
    highlight: ['Isfahan', 'Tabriz', 'Qazvin'],
    center: [33, 50],
    zoom: 4,
    showTerritories: true,
  },
];

const CONVERSION_STEP = 1;
const SPREAD_STEP = 2;
const CHALDIRAN_STEP = 3;
const SHAH_ABBAS_STEP = 5;
const IMAGE_STEP = 6;
const STATS_STEP = 7;
const FALL_STEP = 8;

/* ─────────────────── Conversion dramatic panel ─────────────────── */

const ShiaConversionPanel = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[hsl(215,40%,6%)] via-[hsl(215,35%,10%)] to-[hsl(215,40%,6%)] relative overflow-hidden">
    {/* Subtle geometric pattern — Islamic star motif via CSS */}
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          'radial-gradient(circle at 25% 25%, hsl(215,65%,50%) 1px, transparent 1px), radial-gradient(circle at 75% 75%, hsl(215,65%,50%) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    />
    <div className="relative z-10 max-w-lg px-8 text-center">
      <p className="text-xs tracking-[0.4em] uppercase text-[hsl(215,65%,50%,0.5)] mb-8">
        One Decree
      </p>
      <p className="font-display text-4xl md:text-5xl font-bold leading-tight text-foreground/90 mb-8">
        Every mosque<br />
        <span className="text-[hsl(215,65%,55%)]">rededicated.</span>
      </p>
      <div className="w-16 h-px bg-[hsl(215,65%,50%,0.3)] mx-auto mb-8" />
      <p className="text-foreground/50 font-body text-lg leading-relaxed mb-6">
        Sunni scholars exiled or executed. Prayer rituals rewritten.
        Shrines to the Twelve Imams erected across the empire.
      </p>
      <p className="text-foreground/30 font-body text-sm italic">
        Iran would remain Shia through every dynasty that followed —<br />
        to this day.
      </p>
    </div>
  </div>
);

/* ─────────────── Conversion spread animation ─────────────── */

const SPREAD_CITIES: { name: string; label: string; x: number; y: number; delay: number }[] = [
  { name: 'Tabriz',   label: 'Origin',                x: 38, y: 28, delay: 0 },
  { name: 'Qazvin',   label: 'Converted',             x: 52, y: 48, delay: 0.8 },
  { name: 'Baghdad',  label: 'Shia shrines reclaimed', x: 22, y: 58, delay: 1.4 },
  { name: 'Isfahan',  label: 'Converted',             x: 55, y: 68, delay: 2.0 },
  { name: 'Nishapur', label: 'Converted',             x: 78, y: 38, delay: 2.6 },
];

const ConversionSpreadAnimation = () => (
  <div className="w-full h-full relative overflow-hidden bg-[hsl(215,40%,6%)]">
    {/* Pulsing rings from Tabriz */}
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="absolute rounded-full border border-[hsl(215,65%,50%)]"
        style={{
          left: '38%',
          top: '28%',
          width: 0,
          height: 0,
          transform: 'translate(-50%, -50%)',
          animation: `conversionRipple 4s ${i * 1.3}s ease-out infinite`,
        }}
      />
    ))}

    {/* Connection lines from Tabriz to each city */}
    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
      {SPREAD_CITIES.slice(1).map((city) => (
        <line
          key={city.name}
          x1="38%"
          y1="28%"
          x2={`${city.x}%`}
          y2={`${city.y}%`}
          stroke="hsl(215,65%,50%)"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0"
          style={{
            animation: `conversionLineIn 0.8s ${city.delay}s ease-out forwards`,
          }}
        />
      ))}
    </svg>

    {/* City markers */}
    {SPREAD_CITIES.map((city) => (
      <div
        key={city.name}
        className="absolute"
        style={{
          left: `${city.x}%`,
          top: `${city.y}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          opacity: 0,
          animation: `conversionCityIn 0.6s ${city.delay}s ease-out forwards`,
        }}
      >
        {/* Dot */}
        <div
          className="w-3 h-3 rounded-full mx-auto mb-2"
          style={{
            backgroundColor: city.delay === 0
              ? 'hsl(215,65%,55%)'
              : 'hsl(215,65%,50%)',
            boxShadow: '0 0 12px hsl(215,65%,50%,0.6)',
          }}
        />
        {/* Name */}
        <p className="text-foreground/90 text-sm font-display font-semibold text-center whitespace-nowrap">
          {city.name}
        </p>
        {/* Label */}
        <p
          className="text-xs text-center whitespace-nowrap mt-0.5"
          style={{
            color: city.delay === 0
              ? 'hsl(215,65%,55%)'
              : 'hsl(150,60%,45%)',
          }}
        >
          {city.label}
        </p>
      </div>
    ))}

    {/* Keyframes */}
    <style>{`
      @keyframes conversionRipple {
        0% {
          width: 0; height: 0;
          opacity: 0.6;
        }
        100% {
          width: 120vmax; height: 120vmax;
          opacity: 0;
        }
      }
      @keyframes conversionCityIn {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }
      @keyframes conversionLineIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 0.3;
        }
      }
    `}</style>
  </div>
);

/* ─────────────────── Chaldiran battle ─────────────────── */

const ChaldiranBattle = () => (
  <div className="w-full h-full relative overflow-hidden bg-[hsl(215,40%,6%)]">
    {/* Battlefield line */}
    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-foreground/10" />

    {/* Ottoman side — advances from left */}
    <div
      className="absolute top-1/2 opacity-0"
      style={{
        left: '8%',
        transform: 'translateY(-50%)',
        animation: 'chaldiranAdvanceLeft 2s 0.3s ease-out forwards',
      }}
    >
      <p className="text-xs tracking-[0.3em] uppercase text-red-400/60 mb-2">Ottoman Empire</p>
      <p className="font-display text-2xl md:text-3xl font-bold text-red-400/90 mb-3">Cannons</p>
      <p className="font-display text-lg text-red-400/60 mb-1">Muskets</p>
      <p className="font-display text-lg text-red-400/60 mb-1">Janissaries</p>
      <p className="text-foreground/30 text-sm font-body mt-4 max-w-[180px]">
        200,000 troops under Sultan Selim I
      </p>
    </div>

    {/* Safavid side — advances from right */}
    <div
      className="absolute top-1/2 text-right opacity-0"
      style={{
        right: '8%',
        transform: 'translateY(-50%)',
        animation: 'chaldiranAdvanceRight 2s 0.3s ease-out forwards',
      }}
    >
      <p className="text-xs tracking-[0.3em] uppercase text-[hsl(215,65%,55%,0.6)] mb-2">Safavid Empire</p>
      <p className="font-display text-2xl md:text-3xl font-bold text-[hsl(215,65%,55%,0.9)] mb-3">Cavalry</p>
      <p className="font-display text-lg text-[hsl(215,65%,55%,0.6)] mb-1">Qizilbash warriors</p>
      <p className="font-display text-lg text-[hsl(215,65%,55%,0.6)] mb-1">Faith</p>
      <p className="text-foreground/30 text-sm font-body mt-4 max-w-[180px] ml-auto">
        40,000 cavalry under Shah Ismail
      </p>
    </div>

    {/* Impact flash at center */}
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0"
      style={{ animation: 'chaldiranImpact 1.5s 2s ease-out forwards' }}
    >
      <div className="w-32 h-32 rounded-full bg-red-500/20 blur-2xl" />
      <p className="absolute inset-0 flex items-center justify-center font-display text-sm tracking-[0.2em] uppercase text-foreground/50">
        Chaldiran
      </p>
    </div>

    {/* Outcome — fades in last */}
    <div
      className="absolute bottom-12 left-0 right-0 text-center opacity-0"
      style={{ animation: 'chaldiranOutcome 1s 3.2s ease-out forwards' }}
    >
      <p className="text-foreground/40 font-body text-sm">
        Cavalry charged into cannon fire. <span className="text-red-400/70">The Safavids lost the battle.</span>
      </p>
      <p className="text-foreground/60 font-body text-sm mt-1">
        They kept the empire.
      </p>
    </div>

    <style>{`
      @keyframes chaldiranAdvanceLeft {
        0% { opacity: 0; transform: translateY(-50%) translateX(-40px); }
        100% { opacity: 1; transform: translateY(-50%) translateX(0); }
      }
      @keyframes chaldiranAdvanceRight {
        0% { opacity: 0; transform: translateY(-50%) translateX(40px); }
        100% { opacity: 1; transform: translateY(-50%) translateX(0); }
      }
      @keyframes chaldiranImpact {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3); }
        40% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
        100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
      }
      @keyframes chaldiranOutcome {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  </div>
);

/* ─────────────────── Shah Abbas — Capital Migration ─────────────────── */

const CAPITALS = [
  { name: 'Tabriz', year: '1501', desc: 'Frontier capital', size: 'small' as const },
  { name: 'Qazvin', year: '1555', desc: 'Strategic retreat', size: 'medium' as const },
  { name: 'Isfahan', year: '1598', desc: '"Half the World"', size: 'large' as const },
];

const ACHIEVEMENTS = [
  { label: 'Military reformed', detail: 'Ghulam slave-soldiers replace Qizilbash tribal levies', delay: 2.4 },
  { label: 'Armenian silk trade', detail: 'Julfa merchants rival Venice', delay: 2.8 },
  { label: 'European embassies', detail: 'Ambassadors to Spain, England, the Pope', delay: 3.2 },
];

const ShahAbbasPanel = () => (
  <div className="w-full h-full relative overflow-hidden bg-[hsl(215,40%,6%)]">
    {/* Capital migration — three waypoints */}
    <div className="absolute top-[38%] left-[8%] right-[8%] flex items-center">
      {CAPITALS.map((cap, i) => (
        <React.Fragment key={cap.name}>
          {/* Connecting line */}
          {i > 0 && (
            <div
              className="flex-1 h-px bg-[hsl(215,65%,50%)] origin-left opacity-0"
              style={{ animation: `abbasLineGrow 0.6s ${i * 0.8}s ease-out forwards` }}
            />
          )}
          {/* City node */}
          <div
            className="flex flex-col items-center opacity-0 shrink-0"
            style={{ animation: `abbasCityIn 0.5s ${i * 0.8}s ease-out forwards` }}
          >
            <div
              className="rounded-full border-2 mb-3 flex items-center justify-center"
              style={{
                width: cap.size === 'large' ? 56 : cap.size === 'medium' ? 36 : 24,
                height: cap.size === 'large' ? 56 : cap.size === 'medium' ? 36 : 24,
                borderColor: cap.size === 'large' ? 'hsl(215,65%,55%)' : 'hsl(215,65%,50%,0.5)',
                backgroundColor: cap.size === 'large' ? 'hsl(215,65%,50%,0.2)' : 'transparent',
                boxShadow: cap.size === 'large' ? '0 0 24px hsl(215,65%,50%,0.4)' : 'none',
              }}
            >
              {cap.size === 'large' && (
                <div className="w-3 h-3 rounded-full bg-[hsl(215,65%,55%)]" />
              )}
            </div>
            <p className={`font-display font-bold text-center ${
              cap.size === 'large'
                ? 'text-xl text-[hsl(215,65%,55%)]'
                : 'text-sm text-foreground/60'
            }`}>
              {cap.name}
            </p>
            <p className="text-xs text-foreground/30 mt-0.5">{cap.year}</p>
            <p className={`text-xs mt-1 ${
              cap.size === 'large' ? 'text-foreground/50' : 'text-foreground/30'
            }`}>
              {cap.desc}
            </p>
          </div>
        </React.Fragment>
      ))}
    </div>

    {/* Achievements — fan out below Isfahan */}
    <div className="absolute bottom-[12%] right-[8%] max-w-[280px] space-y-4">
      {ACHIEVEMENTS.map((a) => (
        <div
          key={a.label}
          className="opacity-0"
          style={{ animation: `abbasAchievementIn 0.5s ${a.delay}s ease-out forwards` }}
        >
          <p className="text-sm text-[hsl(215,65%,55%,0.8)] font-display font-semibold">{a.label}</p>
          <p className="text-xs text-foreground/35 font-body">{a.detail}</p>
        </div>
      ))}
    </div>

    {/* Era label */}
    <div
      className="absolute top-[15%] left-1/2 -translate-x-1/2 text-center opacity-0"
      style={{ animation: 'abbasCityIn 0.5s 0s ease-out forwards' }}
    >
      <p className="text-xs tracking-[0.4em] uppercase text-[hsl(215,65%,50%,0.4)]">The Capital Migration</p>
    </div>

    <style>{`
      @keyframes abbasCityIn {
        0% { opacity: 0; transform: translateY(12px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes abbasLineGrow {
        0% { opacity: 0; transform: scaleX(0); }
        100% { opacity: 0.5; transform: scaleX(1); }
      }
      @keyframes abbasAchievementIn {
        0% { opacity: 0; transform: translateX(12px); }
        100% { opacity: 1; transform: translateX(0); }
      }
    `}</style>
  </div>
);

/* ─────────────────── Full-screen image ─────────────────── */

const IsfahanSquareImage = () => (
  <div className="w-full h-full flex items-center justify-center bg-black/40">
    <div className="relative">
      <img
        src="/images/isfahan-square.jpg"
        alt="Naqsh-e Jahan Square, Isfahan — the Image of the World"
        className="max-h-[85vh] max-w-[72vw] object-contain rounded-lg shadow-2xl"
      />
      <p className="absolute -bottom-12 left-0 right-0 text-center text-sm text-foreground/40 font-body italic">
        Naqsh-e Jahan — &ldquo;Image of the World&rdquo;
      </p>
    </div>
  </div>
);

/* ─────────────────── Art panel ─────────────────── */

const SafavidArtPanel = () => (
  <div className="w-full h-full flex items-center justify-center bg-black/40">
    <div className="relative">
      <img
        src="/images/safavid-miniature.jpg"
        alt="Folio from Haft Awrang (Seven Thrones) by Jami, Safavid period"
        className="max-h-[85vh] max-w-[72vw] object-contain rounded-lg shadow-2xl"
      />
      <p className="absolute -bottom-12 left-0 right-0 text-center text-sm text-foreground/40 font-body italic">
        Haft Awrang of Jami — Safavid miniature, c. 1556–1565
      </p>
    </div>
  </div>
);

/* ─────────────── Fall & Endurance animation ─────────────── */

const SUCCESSOR_DYNASTIES = [
  { name: 'Afsharids', years: '1736–1796', delay: 1.5 },
  { name: 'Zands', years: '1751–1794', delay: 3 },
  { name: 'Qajars', years: '1789–1925', delay: 4.5 },
];

const BordersEndure = () => (
  <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-[hsl(215,40%,6%)] via-[hsl(215,35%,8%)] to-[hsl(215,40%,6%)]">
    {/* Safavid label — fades then strikes through */}
    <div
      className="absolute top-[20%] left-1/2 -translate-x-1/2 text-center opacity-0"
      style={{ animation: 'endureFadeIn 0.8s 0.3s ease-out forwards' }}
    >
      <p className="text-xs tracking-[0.4em] uppercase text-[hsl(215,65%,50%,0.4)] mb-4">
        1722 CE
      </p>
      <p
        className="font-display text-2xl text-[hsl(215,65%,50%,0.6)]"
        style={{ animation: 'endureStrike 0.6s 1s ease-out forwards' }}
      >
        Safavid Empire
      </p>
    </div>

    {/* Dynasty succession — vertical timeline */}
    <div className="absolute top-[42%] left-1/2 -translate-x-1/2 space-y-6">
      {SUCCESSOR_DYNASTIES.map((d) => (
        <div
          key={d.name}
          className="text-center opacity-0"
          style={{ animation: `endureDynastyPulse 2s ${d.delay}s ease-in-out forwards` }}
        >
          <p className="font-display text-lg text-foreground/40">{d.name}</p>
          <p className="text-xs text-foreground/20">{d.years}</p>
        </div>
      ))}
    </div>

    {/* Vertical thread — the Shia identity persisting */}
    <div
      className="absolute top-[38%] left-1/2 w-px bg-[hsl(215,65%,50%)] origin-top opacity-0"
      style={{
        height: 0,
        animation: 'endureThreadGrow 4s 1s ease-out forwards',
      }}
    />

    {/* Final beat — "Iran" */}
    <div
      className="absolute bottom-[14%] left-1/2 -translate-x-1/2 text-center opacity-0"
      style={{ animation: 'endureFadeIn 1.2s 6s ease-out forwards' }}
    >
      <p className="font-display text-4xl md:text-5xl font-bold text-foreground/90">
        Iran
      </p>
      <div className="w-12 h-px bg-foreground/20 mx-auto mt-4 mb-3" />
      <p className="text-sm text-foreground/30 font-body">
        The borders endure
      </p>
    </div>

    <style>{`
      @keyframes endureFadeIn {
        0% { opacity: 0; transform: translate(-50%, 0) translateY(8px); }
        100% { opacity: 1; transform: translate(-50%, 0) translateY(0); }
      }
      @keyframes endureStrike {
        0% { text-decoration: none; opacity: 0.6; }
        100% { text-decoration: line-through; opacity: 0.25; }
      }
      @keyframes endureDynastyPulse {
        0% { opacity: 0; transform: translateY(6px); }
        25% { opacity: 0.6; transform: translateY(0); }
        75% { opacity: 0.6; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-4px); }
      }
      @keyframes endureThreadGrow {
        0% { height: 0; opacity: 0; }
        10% { opacity: 0.2; }
        100% { height: 45vh; opacity: 0.15; }
      }
    `}</style>
  </div>
);

/* ─────────────────── Component ─────────────────── */

export const SafavidSection = () => (
  <section id="safavid" style={{ '--era-primary': ERA_COLORS.safavid } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => {
        const s = stages[activeStep] ?? stages[0];

        if (activeStep === CONVERSION_STEP) return <ShiaConversionPanel />;
        if (activeStep === SPREAD_STEP) return <ConversionSpreadAnimation />;
        if (activeStep === CHALDIRAN_STEP) return <ChaldiranBattle />;
        if (activeStep === SHAH_ABBAS_STEP) return <ShahAbbasPanel />;
        if (activeStep === IMAGE_STEP) return <IsfahanSquareImage />;
        if (activeStep === STATS_STEP) return <SafavidArtPanel />;
        if (activeStep === FALL_STEP) return <BordersEndure />;

        return (
          <InteractiveMap
            empire={s.empire}
            showCities
            visibleCities={s.cities}
            highlightCities={s.highlight}
            center={s.center}
            zoom={s.zoom}
            showTerritories={s.showTerritories}
            routeCities={s.routeCities}
            annotatedCities={s.annotatedCities}
            spotlightCity={s.spotlight}
          />
        );
      }}
      steps={[
        /* Step 0 — The Founding */
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(215,65%,45%,0.7)] mb-4">1501 CE</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            <span className="text-[hsl(215,65%,55%)]">The Safavid Empire</span>
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed font-body mb-4">
            A fourteen-year-old boy rode out of Azerbaijan with a band of Qizilbash warriors
            and forged a nation.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            Shah Ismail I conquered Tabriz, crowned himself Shah, and unified the Iranian
            plateau under one throne for the first time since the Mongol destruction.
          </p>
        </div>,

        /* Step 1 — The Conversion (dramatic panel) */
        <div key={1}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(215,65%,45%,0.7)] mb-4">1501 CE</p>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(215,65%,50%,0.85)]">
            The Forced Conversion
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            His first act as Shah: declare Twelver Shi&apos;ism the state religion. Not a
            gradual shift — an overnight transformation of an entire civilization.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body mb-4">
            Sunni ulama who refused were given a choice: convert, flee, or die. Mosques were
            rededicated. Friday prayers were rewritten. The call to prayer gained a new line.
            Cursing of the first three caliphs became state policy.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body italic">
            No single act in Persian history did more to create the Iran that exists today.
          </p>
        </div>,

        /* Step 2 — The Conversion Spreads (annotated map) */
        <div key={2}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(215,65%,45%,0.7)] mb-4">1501–1510 CE</p>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(215,65%,50%,0.85)]">
            A New Identity
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            City by city, the conversion spread. Ismail&apos;s armies carried the new faith
            as far as Baghdad, where they reclaimed the shrines of Ali and Husayn.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            Within a decade, what had been a patchwork of Sunni territories became the world&apos;s
            first Shia state. The religious border Ismail drew between Iran and its Sunni
            neighbors — Ottoman, Uzbek, Mughal — still defines the Middle East.
          </p>
        </div>,

        /* Step 3 — Chaldiran */
        <div key={3}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(215,65%,45%,0.7)] mb-4">1514 CE</p>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(215,65%,50%,0.85)]">
            The Battle of Chaldiran
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            Sultan Selim I marched east with Ottoman cannons and muskets.
            Ismail&apos;s cavalry charged into gunfire.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            The Safavids lost the battle and briefly lost Tabriz — but not the empire.
            Chaldiran set the Ottoman–Safavid frontier for two centuries and proved that
            Iran would survive as a Shia state, even against the most powerful army in the world.
          </p>
        </div>,

        /* Step 4 — Qazvin */
        <div key={4}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(215,65%,45%,0.7)] mb-4">1555 CE</p>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(215,65%,50%,0.85)]">
            Qazvin: The Middle Capital
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            Shah Tahmasp moved the court inland — away from Ottoman raids, deeper into
            the Iranian heartland.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            His 52-year reign was one of diplomatic survival: playing Ottomans against
            Uzbeks, hosting the exiled Mughal prince Humayun, and quietly patronizing the
            Persian miniature painters who would make Safavid art legendary.
          </p>
        </div>,

        /* Step 5 — Shah Abbas */
        <div key={5}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(215,65%,45%,0.7)] mb-4">1598 CE</p>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(215,65%,50%,0.85)]">
            Shah Abbas the Great
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            He moved the capital to Isfahan and built it into one of the most beautiful
            cities on Earth. &ldquo;Isfahan is half the world,&rdquo; the saying went.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            Abbas reformed the military, relocated Armenian merchants to fuel a silk trade
            that rivaled Venice, and sent ambassadors to the courts of Europe. The capital
            migration — Tabriz to Qazvin to Isfahan — traced the empire&apos;s shift from
            frontier war to confident civilization.
          </p>
        </div>,

        /* Step 6 — Naqsh-e Jahan */
        <div key={6}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(215,65%,45%,0.7)] mb-4">1602 CE</p>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(215,65%,50%,0.85)]">
            Naqsh-e Jahan
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            The &ldquo;Image of the World&rdquo; — 512 meters long, the second-largest
            square ever built.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            Mosque on one side, palace on another, bazaar on a third, bridge on the fourth.
            Every Friday, polo matches were played on the square while the shah watched from
            the Ali Qapu palace. It was a city within a city — worship, commerce, power, and
            beauty in a single space.
          </p>
        </div>,

        /* Step 7 — Art & Empire */
        <div key={7}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(215,65%,45%,0.7)] mb-4">The Safavid Legacy</p>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(215,65%,50%,0.85)]">
            Art & Empire
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            Persian miniature painting reached its zenith. Carpet weaving became a royal
            industry. Tile mosaic covered every dome and minaret.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body mb-6">
            Calligraphy, metalwork, ceramic art — every surface became a canvas. The Safavids
            didn&apos;t just rule Iran; they gave it the aesthetic vocabulary it still speaks.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <AnimatedCounter end={221} suffix=" yrs" label="Safavid dynasty" />
            <AnimatedCounter end={3} suffix="" label="Capitals" />
          </div>
        </div>,

        /* Step 8 — The Fall & Endurance */
        <div key={8}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(215,65%,45%,0.7)] mb-4">1722 CE</p>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(215,65%,50%,0.85)]">
            The Fall &amp; Endurance
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            Afghan invaders besieged Isfahan. The empire that had survived Chaldiran could
            not survive its own complacency.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body mb-4">
            But the Shia identity Shah Ismail created outlived the dynasty. Through the
            Afsharids, the Zands, the Qajars — through every successor — the thread held.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body italic">
            The borders Shah Ismail drew are still the borders of Iran.
          </p>
        </div>,
      ]}
    />

    <EraWaypoint activeIndex={10} label="The Modern Age" year="1905 CE" />
  </section>
);
