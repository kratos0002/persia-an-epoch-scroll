import React, { useMemo } from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { HormuzGulfMap, type MapMarker, type MapRoute } from '@/components/visuals/HormuzGulfMap';
import { PORTUGUESE_CITIES, PORTUGUESE_ROUTE, HZ } from '@/components/visuals/hormuzMapData';

export const PortugalSection = () => {
  const markers: MapMarker[] = useMemo(() =>
    PORTUGUESE_CITIES.map(c => ({
      coords: c.coords,
      label: c.role === 'fortress' ? `⚔ ${c.name}` : c.name,
      color: c.color,
      size: c.role === 'fortress' ? 10 : 6,
    })),
  []);

  const routes: MapRoute[] = useMemo(() => [
    { path: PORTUGUESE_ROUTE, color: HZ.PORT_GREEN, weight: 2, dash: '10, 6', opacity: 0.5 },
  ], []);

  const steps = [
    <div key="albuquerque">
      <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: HZ.PORT_GREEN }}>1507</p>
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>Albuquerque's Three Locks</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        Afonso de Albuquerque arrived in the Indian Ocean with a strategy that would define European imperialism for four centuries: control the chokepoints. He identified three locks on the ocean — Aden at the Red Sea's mouth, Hormuz at the Persian Gulf's throat, and Malacca at the gateway to the Pacific. Seize all three, and you control every trade route between Europe and Asia. In 1507, he took Hormuz.
      </p>
    </div>,
    <div key="fortress">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>The Fortress on Hormuz Island</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        The Portuguese built a massive stone fortress on the island — the Fort of Our Lady of the Conception. Every ship entering or leaving the Gulf paid tribute. Portuguese customs officers sat at the mouth of the strait extracting wealth from trade they didn't produce, from goods they didn't manufacture, on water they didn't own. For 115 years, a European garrison thousands of miles from Lisbon held the throat of the world.
      </p>
    </div>,
    <div key="expulsion">
      <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: HZ.PERSIAN_GOLD }}>1622</p>
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>Shah Abbas Strikes Back</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        Shah Abbas I of Persia — the Safavid king who rebuilt Isfahan into one of the world's great cities — formed an unlikely alliance with the English East India Company. In 1622, a combined Persian-English force besieged the fortress. After weeks of bombardment, the Portuguese surrendered. Iran reclaimed its coast. The English got trading privileges. The city of Bandar Abbas — "the port of Abbas" — was named for the victory.
      </p>
    </div>,
    <div key="lesson">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.AMBER }}>The Permanent Lesson</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        The Portuguese were expelled. Their fortress crumbled into coral rubble. But the lesson they proved was permanent: <em className="italic" style={{ color: HZ.AMBER }}>you don't need to conquer the Gulf — just hold the strait.</em> A single fortified position at the narrowest point controls everything behind it. Every power that followed — the Dutch, the British, the Americans — would apply the same logic to the same 21 miles.
      </p>
    </div>,
  ];

  return (
    <section id="portugal-seizes" style={{ background: HZ.NAVY }}>
      <StickyScroll
        graphic={(activeStep) => (
          <HormuzGulfMap
            center={activeStep <= 1 ? [27.06, 56.25] : [27.06, 56.25]}
            zoom={activeStep === 0 ? 5 : 8}
            markers={markers}
            routes={activeStep === 0 ? routes : []}
            activeStep={activeStep}
          />
        )}
        steps={steps}
        className="min-h-[400vh]"
      />
    </section>
  );
};
