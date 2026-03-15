import React, { useMemo } from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { HormuzGulfMap, type MapMarker, type MapRoute } from '@/components/visuals/HormuzGulfMap';
import { HistoricalImage } from '@/components/visuals/HistoricalImage';
import { PORTUGUESE_CITIES, THREE_LOCKS_ROUTE, HZ } from '@/components/visuals/hormuzMapData';

/** Step-specific map configurations */
const STEP_CONFIGS: { center: [number, number]; zoom: number }[] = [
  { center: [18, 68], zoom: 3 },       // Three Locks — wide Indian Ocean view
  { center: [27.06, 56.25], zoom: 8 },  // Fortress — zoomed into Hormuz
  { center: [27.06, 56.25], zoom: 8 },  // Shah Abbas — same Hormuz view
  { center: [27.06, 56.25], zoom: 8 },  // Lesson — same
];

export const PortugalSection = () => {
  /** Three locks only (Aden, Hormuz, Malacca) — big, pulsing */
  const lockMarkers: MapMarker[] = useMemo(() =>
    PORTUGUESE_CITIES
      .filter(c => c.role === 'lock' || c.role === 'fortress')
      .map(c => ({
        coords: c.coords,
        label: c.role === 'fortress' ? '🔒 Hormuz' : `🔒 ${c.name}`,
        color: HZ.PORT_GREEN,
        size: 12,
        pulse: true,
        detail: c.detail,
      })),
  []);

  /** Chain routes connecting the three locks */
  const lockRoutes: MapRoute[] = useMemo(() =>
    THREE_LOCKS_ROUTE.map(path => ({
      path,
      color: HZ.PORT_GREEN,
      weight: 1.5,
      dash: '8, 10',
      opacity: 0.35,
    })),
  []);

  /** All markers for zoomed-in Hormuz steps */
  const hormuzMarkers: MapMarker[] = useMemo(() =>
    PORTUGUESE_CITIES
      .filter(c => c.name === 'Hormuz Island' || c.name === 'Bandar Abbas')
      .map(c => ({
        coords: c.coords,
        label: c.role === 'fortress' ? `⚔ ${c.name}` : c.name,
        color: c.color,
        size: c.role === 'fortress' ? 10 : 6,
        detail: c.detail,
      })),
  []);

  const steps = [
    <div key="albuquerque">
      <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: HZ.PORT_GREEN }}>1507</p>
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>Albuquerque's Three Locks</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        <strong style={{ color: HZ.PORT_GREEN }}>Afonso de Albuquerque</strong> arrived in the Indian Ocean with a strategy that would define European imperialism for four centuries: <strong style={{ color: HZ.PARCHMENT }}>control the chokepoints</strong>. He identified three locks on the ocean — <strong style={{ color: HZ.PORT_GREEN }}>Aden</strong> at the Red Sea's mouth, <strong style={{ color: HZ.PORT_GREEN }}>Hormuz</strong> at the Persian Gulf's throat, and <strong style={{ color: HZ.PORT_GREEN }}>Malacca</strong> at the gateway to the Pacific. Seize all three, and you control every trade route between Europe and Asia. In 1507, he took Hormuz.
      </p>
    </div>,
    <div key="fortress">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>The Fortress on Hormuz Island</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        The Portuguese built a massive stone fortress on the island — the <strong style={{ color: HZ.PORT_GREEN }}>Fort of Our Lady of the Conception</strong>. Every ship entering or leaving the Gulf paid tribute. Portuguese customs officers sat at the mouth of the strait extracting wealth from trade they didn't produce, from goods they didn't manufacture, on water they didn't own. For <strong style={{ color: HZ.PORT_GREEN }}>115 years</strong>, a European garrison thousands of miles from <strong style={{ color: HZ.PORT_GREEN }}>Lisbon</strong> held the throat of the world.
      </p>
      <HistoricalImage
        src="/images/portuguese-fortress-hormuz.jpg"
        alt="Ruins of the Portuguese Castle on Hormuz Island, Iran"
        caption="The Fort of Our Lady of the Conception — 115 years of Portuguese control over the strait"
        credit="Wikimedia Commons"
        className="mt-4"
        aspectRatio="16/10"
      />
    </div>,
    <div key="expulsion">
      <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: HZ.PERSIAN_GOLD }}>1622</p>
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>Shah Abbas Strikes Back</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        <strong style={{ color: HZ.PERSIAN_GOLD }}>Shah Abbas I</strong> of Persia — the <strong style={{ color: HZ.PERSIAN_GOLD }}>Safavid</strong> king who rebuilt <strong style={{ color: HZ.PERSIAN_GOLD }}>Isfahan</strong> into one of the world's great cities — formed an unlikely alliance with the <strong style={{ color: HZ.PARCHMENT }}>English East India Company</strong>. In <strong style={{ color: HZ.PERSIAN_GOLD }}>1622</strong>, a combined Persian-English force besieged the fortress. After weeks of bombardment, the Portuguese surrendered. Iran reclaimed its coast. The English got trading privileges. The city of <strong style={{ color: HZ.PERSIAN_GOLD }}>Bandar Abbas</strong> — "the port of Abbas" — was named for the victory.
      </p>
      <HistoricalImage
        src="/images/shah-abbas-portrait.jpg"
        alt="Safavid portrait of Shah Abbas I as a young man, Iran, c. 1590"
        caption="Shah Abbas I — the Safavid king who expelled the Portuguese from Hormuz in 1622"
        credit="Safavid miniature, c. 1590 / Wikimedia Commons"
        className="mt-4"
        aspectRatio="3/4"
      />
    </div>,
    <div key="lesson">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.AMBER }}>The Permanent Lesson</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        The Portuguese were expelled. Their fortress crumbled into coral rubble. But the lesson they proved was permanent: <em className="italic" style={{ color: HZ.AMBER }}>you don't need to conquer the Gulf — just hold the strait.</em> A single fortified position at the narrowest point controls everything behind it. Every power that followed — the Dutch, the British, the Americans — would apply the same logic to the same 21 miles.
      </p>
      {/* Flag succession timeline */}
      <div className="mt-5 flex items-center gap-1" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
        {[
          { flag: '🇵🇹', label: 'Portugal', years: '1507–1622', color: HZ.PORT_GREEN, anim: 'flagFadeOut 6s ease-out forwards' },
          { flag: '🇳🇱', label: 'Dutch', years: '1622–1766', color: 'hsl(20, 75%, 50%)', anim: 'flagFadeIn1 6s ease-out forwards' },
          { flag: '🇬🇧', label: 'Britain', years: '1820–1971', color: HZ.BRIT_RED, anim: 'flagFadeIn2 6s ease-out forwards' },
          { flag: '🇺🇸', label: 'America', years: '1971–', color: 'hsl(215, 50%, 50%)', anim: 'flagFadeIn3 6s ease-out forwards' },
        ].map((p, i) => (
          <React.Fragment key={p.label}>
            {i > 0 && <span style={{ color: HZ.SMOKE, opacity: 0.3, fontSize: 10 }}>→</span>}
            <div
              className="flex flex-col items-center px-2 py-2 rounded"
              style={{
                background: `${p.color}11`,
                border: `1px solid ${p.color}33`,
                animation: p.anim,
                minWidth: 64,
              }}
            >
              <span style={{ fontSize: 20, lineHeight: 1 }}>{p.flag}</span>
              <span style={{ fontSize: 9, fontWeight: 700, color: p.color, marginTop: 3 }}>{p.label}</span>
              <span style={{ fontSize: 8, color: HZ.SMOKE, opacity: 0.6, marginTop: 1 }}>{p.years}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>,
  ];

  return (
    <section id="portugal-seizes" style={{ background: HZ.NAVY }}>
      <StickyScroll
        graphic={(activeStep) => {
          const cfg = STEP_CONFIGS[Math.min(activeStep, STEP_CONFIGS.length - 1)];
          const isThreeLocksStep = activeStep === 0;
          return (
            <HormuzGulfMap
              center={cfg.center}
              zoom={cfg.zoom}
              markers={isThreeLocksStep ? lockMarkers : hormuzMarkers}
              routes={isThreeLocksStep ? lockRoutes : []}
              activeStep={activeStep}
            />
          );
        }}
        steps={steps}
        className="min-h-[400vh]"
      />
    </section>
  );
};
