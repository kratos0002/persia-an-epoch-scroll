import React, { useMemo } from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { HormuzGulfMap, type MapMarker, type MapRoute } from '@/components/visuals/HormuzGulfMap';
import { TANKER_STRIKES, INBOUND_LANE, OUTBOUND_LANE, HZ } from '@/components/visuals/hormuzMapData';

export const TankerWarSection = () => {
  const strikeMarkers: MapMarker[] = useMemo(() =>
    TANKER_STRIKES.map(s => ({ coords: s.coords, label: s.label, color: HZ.RED, size: 10, pulse: true })),
  []);

  const laneRoutes: MapRoute[] = useMemo(() => [
    { path: INBOUND_LANE, color: HZ.AMBER, weight: 1, dash: '6, 8', opacity: 0.25 },
    { path: OUTBOUND_LANE, color: HZ.TEAL, weight: 1, dash: '6, 8', opacity: 0.25 },
  ], []);

  const steps = [
    <div key="spills">
      <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: HZ.RED }}>1980–1988</p>
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>Fire on the Water</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        The Iran-Iraq War spilled into the Gulf in 1984. Iraq began attacking Iranian oil tankers to cut off Tehran's revenue. Iran retaliated by targeting ships carrying oil from Iraq's Arab allies — Kuwait, Saudi Arabia, the UAE. For the first time in its 5,000-year history, the strait was a war zone. Tankers burned. Shipping lanes became minefields.
      </p>
    </div>,
    <div key="546">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>546 Ships</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        Between 1981 and 1988, 546 commercial ships were attacked in the Persian Gulf. Oil prices spiked globally. Insurance rates for Gulf shipping increased tenfold. Tanker crews — mostly from the Philippines, India, and South Korea — became casualties of a war between two countries they had nothing to do with. The strait demonstrated what strategists had always known: disrupt Hormuz, and the world feels it.
      </p>
    </div>,
    <div key="earnest-will">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>Operation Earnest Will</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        In 1987, the United States began Operation Earnest Will — the largest naval convoy operation since World War II. Kuwaiti tankers were reflagged with American flags and escorted through the strait by US warships. The message was explicit: the United States would use military force to keep Hormuz open. It was the moment America became the permanent guarantor of the world's most important shipping lane.
      </p>
    </div>,
    <div key="battles">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>Missiles and Mines</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        On May 17, 1987, an Iraqi jet fired two Exocet missiles at the USS Stark, killing 37 American sailors. On April 14, 1988, the USS Samuel B. Roberts struck an Iranian mine. The US responded with Operation Praying Mantis — the largest American naval engagement since World War II. In a single day, the US Navy sank or damaged half of Iran's operational fleet. The strait had become the most heavily militarized waterway on earth.
      </p>
    </div>,
    <div key="flight655">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.RED }}>The Strait's Darkest Day</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        On July 3, 1988, the USS Vincennes — an Aegis cruiser operating in the strait — shot down Iran Air Flight 655, a civilian Airbus A300 on a scheduled flight from Bandar Abbas to Dubai. All 290 passengers and crew were killed, including 66 children. The United States called it a tragic accident. Iran called it murder. The incident remains one of the deepest scars in US-Iran relations — and a reminder that the 21 miles of Hormuz are always one miscalculation from catastrophe.
      </p>
    </div>,
  ];

  return (
    <section id="tanker-war" style={{ background: HZ.NAVY }}>
      <StickyScroll
        graphic={(activeStep) => (
          <HormuzGulfMap
            center={[26.5, 55.5]}
            zoom={6}
            markers={strikeMarkers}
            routes={laneRoutes}
            activeStep={activeStep}
          />
        )}
        steps={steps}
        className="min-h-[500vh]"
      />
    </section>
  );
};
