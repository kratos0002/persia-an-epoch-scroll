import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { HormuzGulfMap, type MapMarker, type MapRoute } from '@/components/visuals/HormuzGulfMap';
import { HistoricalImage } from '@/components/visuals/HistoricalImage';
import {
  INBOUND_LANE, OUTBOUND_LANE, GULF_CITIES, HZ,
  EAST_WEST_PIPELINE, HABSHAN_FUJAIRAH_PIPELINE, BYPASS_LABELS,
} from '@/components/visuals/hormuzMapData';

/* ── Per-step map configurations ── */
const defaultMarkers: MapMarker[] = GULF_CITIES.map(c => ({
  coords: c.coords, label: c.name, color: HZ.TEAL, size: 6, detail: c.detail,
}));

const shippingRoutes: MapRoute[] = [
  { path: INBOUND_LANE, color: HZ.AMBER, weight: 2.5, dash: '8, 6', opacity: 0.8 },
  { path: OUTBOUND_LANE, color: HZ.TEAL, weight: 2.5, dash: '8, 6', opacity: 0.8 },
];

const bypassRoutes: MapRoute[] = [
  // Dim the shipping lanes
  { path: INBOUND_LANE, color: HZ.AMBER, weight: 2, dash: '8, 6', opacity: 0.25 },
  { path: OUTBOUND_LANE, color: HZ.TEAL, weight: 2, dash: '8, 6', opacity: 0.25 },
  // Pipeline routes — solid lines, thinner than shipping lanes
  { path: EAST_WEST_PIPELINE, color: HZ.AMBER, weight: 2.5, opacity: 0.9 },
  { path: HABSHAN_FUJAIRAH_PIPELINE, color: HZ.AMBER, weight: 2.5, opacity: 0.9 },
];

const bypassMarkers: MapMarker[] = BYPASS_LABELS.map(b => ({
  coords: b.coords, label: b.name, color: b.color, size: 5,
}));

const STEP_VIEWS: { center: [number, number]; zoom: number }[] = [
  { center: [26.56, 56.25], zoom: 9 },  // TSS
  { center: [26.56, 56.25], zoom: 9 },  // 21M
  { center: [26.56, 56.25], zoom: 9 },  // Military
  { center: [25.5, 48.0], zoom: 6 },    // No Bypass — zoom out to show full pipelines
];

export const BottleneckSection = () => {

  const steps = [
    <div key="tss">
      <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: HZ.TEAL }}>Today</p>
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>The Traffic Separation Scheme</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        Two shipping lanes, each <strong style={{ color: HZ.TEAL }}>two miles wide</strong>, separated by a two-mile buffer zone. Inbound traffic hugs the <strong style={{ color: HZ.TEAL }}>Omani coast</strong>. Outbound traffic passes closer to <strong style={{ color: HZ.TEAL }}>Iran</strong>. This is the <strong style={{ color: HZ.PARCHMENT }}>Traffic Separation Scheme</strong> — the world's most consequential traffic regulation. Every supertanker carrying Gulf oil to the world's refineries follows these lanes through a passage narrower than the length of Manhattan.
      </p>
      <HistoricalImage
        src="/images/strait-hormuz-satellite.jpg"
        alt="NASA MODIS satellite image of the Strait of Hormuz and Musandam Peninsula"
        caption="The Strait of Hormuz from space — 21 miles between Arabia and Iran"
        credit="NASA Terra / MODIS, 2018 / Wikimedia Commons"
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
        <strong style={{ color: HZ.AMBER }}>Twenty-one million barrels</strong> of oil pass through Hormuz every day — roughly <strong style={{ color: HZ.AMBER }}>21% of global petroleum</strong> consumption. That's the energy that powers <strong style={{ color: HZ.PARCHMENT }}>Japan's</strong> bullet trains, <strong style={{ color: HZ.PARCHMENT }}>Europe's</strong> heating systems, <strong style={{ color: HZ.PARCHMENT }}>India's</strong> factories, and <strong style={{ color: HZ.PARCHMENT }}>China's</strong> manufacturing sector. No pipeline, no alternative route, no renewable energy transition has reduced this dependence. The 21 miles remain non-negotiable.
      </p>
    </div>,
    <div key="military">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>The Permanent Standoff</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        The <strong style={{ color: HZ.TEAL }}>US Fifth Fleet</strong> is stationed permanently in <strong style={{ color: HZ.TEAL }}>Bahrain</strong> — 20 minutes by helicopter from the strait. Iran's <strong style={{ color: HZ.TEAL }}>Islamic Revolutionary Guard Corps</strong> operates fast attack boats, anti-ship missiles, and mines from islands and coastal bases along the northern shore. Both sides know the calculus: close Hormuz, even briefly, and <strong style={{ color: HZ.AMBER }}>global oil prices spike</strong>, stock markets crash, and supply chains seize. The threat alone is a weapon.
      </p>
      <HistoricalImage
        src="/images/carrier-strait-hormuz.jpg"
        alt="USS Dwight D. Eisenhower (CVN-69) transits the Strait of Hormuz"
        caption="A US carrier strike group transiting the strait — the permanent guarantor of 21 miles"
        credit="U.S. Navy / Wikimedia Commons"
        className="mt-4"
        aspectRatio="16/9"
      />
    </div>,
    <div key="no-bypass">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.AMBER }}>No Bypass</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        Saudi Arabia built the <strong style={{ color: HZ.AMBER }}>East-West Pipeline</strong> to bypass the strait. It can carry <strong style={{ color: HZ.PARCHMENT }}>5 million barrels per day</strong> — less than a quarter of Hormuz's throughput. The UAE built the <strong style={{ color: HZ.AMBER }}>Habshan-Fujairah pipeline</strong> to move Abu Dhabi's oil directly to the Indian Ocean coast. Capacity: <strong style={{ color: HZ.PARCHMENT }}>1.5 million barrels</strong>. Every attempt to build an alternative has proven the same point: <strong style={{ color: HZ.AMBER }}>geography wins</strong>. The economics always circle back to the same 21 miles.
      </p>
    </div>,
  ];

  return (
    <section id="bottleneck" style={{ background: HZ.NAVY }}>
      <StickyScroll
        graphic={(activeStep) => {
          const isBypass = activeStep === 3;
          const view = STEP_VIEWS[activeStep] ?? STEP_VIEWS[0];
          return (
            <HormuzGulfMap
              center={view.center}
              zoom={view.zoom}
              markers={isBypass ? bypassMarkers : defaultMarkers}
              routes={isBypass ? bypassRoutes : shippingRoutes}
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
