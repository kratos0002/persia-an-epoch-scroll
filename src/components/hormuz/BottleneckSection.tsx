import React, { useMemo } from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { HormuzGulfMap, type MapMarker, type MapRoute } from '@/components/visuals/HormuzGulfMap';
import { HistoricalImage } from '@/components/visuals/HistoricalImage';
import { INBOUND_LANE, OUTBOUND_LANE, GULF_CITIES, HZ } from '@/components/visuals/hormuzMapData';

export const BottleneckSection = () => {
  const markers: MapMarker[] = useMemo(() => [
    ...GULF_CITIES.map(c => ({ coords: c.coords, label: c.name, color: HZ.TEAL, size: 6 })),
  ], []);

  const routes: MapRoute[] = useMemo(() => [
    { path: INBOUND_LANE, color: HZ.AMBER, weight: 2.5, dash: '8, 6', opacity: 0.8 },
    { path: OUTBOUND_LANE, color: HZ.TEAL, weight: 2.5, dash: '8, 6', opacity: 0.8 },
  ], []);

  const steps = [
    <div key="tss">
      <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: HZ.TEAL }}>Today</p>
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>The Traffic Separation Scheme</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        Two shipping lanes, each two miles wide, separated by a two-mile buffer zone. Inbound traffic hugs the Omani coast. Outbound traffic passes closer to Iran. This is the Traffic Separation Scheme — the world's most consequential traffic regulation. Every supertanker carrying Gulf oil to the world's refineries follows these lanes through a passage narrower than the length of Manhattan.
      </p>
      <HistoricalImage
        src="/placeholder.svg"
        alt="Satellite view of the Strait of Hormuz showing shipping traffic"
        caption="Placeholder: Satellite view of the strait — every dot is a supertanker carrying the world's energy"
        className="mt-4"
        aspectRatio="16/9"
      />
    </div>,
    <div key="21m">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.AMBER }}>
        <span className="text-4xl font-black">21M</span>
        <span className="text-lg ml-2">barrels per day</span>
      </h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        Twenty-one million barrels of oil pass through Hormuz every day — roughly 21% of global petroleum consumption. That's the energy that powers Japan's bullet trains, Europe's heating systems, India's factories, and China's manufacturing sector. No pipeline, no alternative route, no renewable energy transition has reduced this dependence. The 21 miles remain non-negotiable.
      </p>
    </div>,
    <div key="military">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>The Permanent Standoff</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        The US Fifth Fleet is stationed permanently in Bahrain — 20 minutes by helicopter from the strait. Iran's Islamic Revolutionary Guard Corps operates fast attack boats, anti-ship missiles, and mines from islands and coastal bases along the northern shore. Both sides know the calculus: close Hormuz, even briefly, and global oil prices spike, stock markets crash, and supply chains seize. The threat alone is a weapon.
      </p>
      <HistoricalImage
        src="/placeholder.svg"
        alt="US Navy aircraft carrier in the Persian Gulf"
        caption="Placeholder: A US carrier strike group transiting the strait — the permanent guarantor of 21 miles"
        className="mt-4"
        aspectRatio="16/9"
      />
    </div>,
    <div key="no-bypass">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.AMBER }}>No Bypass</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        Saudi Arabia built the East-West Pipeline to bypass the strait. It can carry 5 million barrels per day — less than a quarter of Hormuz's throughput. The UAE built the Habshan-Fujairah pipeline to move Abu Dhabi's oil directly to the Indian Ocean coast. Capacity: 1.5 million barrels. Every attempt to build an alternative has proven the same point: geography wins. The economics always circle back to the same 21 miles.
      </p>
    </div>,
  ];

  return (
    <section id="bottleneck" style={{ background: HZ.NAVY }}>
      <StickyScroll
        graphic={(activeStep) => (
          <HormuzGulfMap
            center={[26.56, 56.25]}
            zoom={9}
            markers={markers}
            routes={routes}
            activeStep={activeStep}
          />
        )}
        steps={steps}
        className="min-h-[400vh]"
      />
    </section>
  );
};
