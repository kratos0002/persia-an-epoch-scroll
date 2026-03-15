import React, { useMemo } from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { HormuzGulfMap, type MapMarker, type MapRoute } from '@/components/visuals/HormuzGulfMap';
import { HistoricalImage } from '@/components/visuals/HistoricalImage';
import { TANKER_STRIKES, INBOUND_LANE, OUTBOUND_LANE, HZ } from '@/components/visuals/hormuzMapData';

/** Step-specific map + overlay configs */
const STEP_CONFIGS: { center: [number, number]; zoom: number }[] = [
  { center: [27, 52], zoom: 5 },       // Fire on the Water — wide Gulf, see both belligerents
  { center: [26.5, 55.5], zoom: 7 },   // 546 Ships — zoom to shipping lanes
  { center: [26.5, 55.5], zoom: 7 },   // Earnest Will — same, convoy routes visible
  { center: [26.8, 56], zoom: 8 },     // Missiles and Mines — tight on battle sites
  { center: [26.7, 56.2], zoom: 8 },   // Flight 655 — tight on the strait
];

/** Stats that escalate per step */
const STEP_STATS: { label: string; value: string; color: string }[][] = [
  [
    { label: 'Duration', value: '8 years', color: HZ.RED },
    { label: 'Belligerents', value: 'Iraq vs Iran', color: HZ.PARCHMENT },
    { label: 'Theater', value: 'Persian Gulf', color: HZ.SMOKE },
  ],
  [
    { label: 'Ships attacked', value: '546', color: HZ.RED },
    { label: 'Insurance rates', value: '×10', color: HZ.AMBER },
    { label: 'Oil price spike', value: '+30%', color: HZ.AMBER },
    { label: 'Crew nationalities', value: '30+', color: HZ.SMOKE },
  ],
  [
    { label: 'Operation', value: 'Earnest Will', color: HZ.PARCHMENT },
    { label: 'Tankers escorted', value: '259', color: HZ.AMBER },
    { label: 'US warships', value: '30+', color: HZ.PARCHMENT },
    { label: 'Largest convoy op since', value: 'WWII', color: HZ.RED },
  ],
  [
    { label: 'USS Stark', value: '37 killed', color: HZ.RED },
    { label: 'Op. Praying Mantis', value: 'Largest USN battle since WWII', color: HZ.PARCHMENT },
    { label: 'Iranian fleet', value: '50% destroyed', color: HZ.RED },
  ],
  [
    { label: 'Iran Air Flight 655', value: '290 killed', color: HZ.RED },
    { label: 'Children', value: '66', color: HZ.RED },
    { label: 'Route', value: 'Bandar Abbas → Dubai', color: HZ.SMOKE },
    { label: 'Aircraft', value: 'Airbus A300', color: HZ.SMOKE },
  ],
];

export const TankerWarSection = () => {
  const strikeMarkers: MapMarker[] = useMemo(() =>
    TANKER_STRIKES.map(s => ({ coords: s.coords, label: s.label, color: HZ.RED, size: 10, pulse: true, detail: s.detail })),
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
        The <strong style={{ color: HZ.RED }}>Iran-Iraq War</strong> spilled into the Gulf in <strong style={{ color: HZ.RED }}>1984</strong>. Iraq began attacking Iranian oil tankers to cut off Tehran's revenue. Iran retaliated by targeting ships carrying oil from Iraq's Arab allies — <strong style={{ color: HZ.PARCHMENT }}>Kuwait</strong>, <strong style={{ color: HZ.PARCHMENT }}>Saudi Arabia</strong>, the <strong style={{ color: HZ.PARCHMENT }}>UAE</strong>. For the first time in its 5,000-year history, the strait was a war zone. Tankers burned. Shipping lanes became minefields.
      </p>
      <HistoricalImage
        src="/images/tanker-war-uss-stark.jpg"
        alt="USS Stark showing damage from Iraqi Exocet missile strike, Persian Gulf, 1987"
        caption="USS Stark after being struck by two Iraqi Exocet missiles, May 1987 — 37 American sailors killed"
        credit="U.S. Navy / Wikimedia Commons"
        className="mt-4"
        aspectRatio="16/9"
      />
    </div>,
    <div key="546">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>546 Ships</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        Between 1981 and 1988, <strong style={{ color: HZ.RED }}>546 commercial ships</strong> were attacked in the Persian Gulf. Oil prices spiked globally. Insurance rates for Gulf shipping increased <strong style={{ color: HZ.PARCHMENT }}>tenfold</strong>. Tanker crews — mostly from the Philippines, India, and South Korea — became casualties of a war between two countries they had nothing to do with. The strait demonstrated what strategists had always known: <strong style={{ color: HZ.RED }}>disrupt Hormuz, and the world feels it</strong>.
      </p>
    </div>,
    <div key="earnest-will">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>Operation Earnest Will</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        In 1987, the United States began <strong style={{ color: HZ.RED }}>Operation Earnest Will</strong> — the largest naval convoy operation since World War II. Kuwaiti tankers were reflagged with American flags and escorted through the strait by US warships. The message was explicit: the United States would use military force to keep Hormuz open. It was the moment America became the <strong style={{ color: HZ.PARCHMENT }}>permanent guarantor</strong> of the world's most important shipping lane.
      </p>
      <HistoricalImage
        src="/images/earnest-will-escort.jpg"
        alt="USS Nicholas escorting tankers during Operation Earnest Will, 1987"
        caption="Operation Earnest Will — the largest naval convoy operation since World War II"
        credit="U.S. Navy / Wikimedia Commons"
        className="mt-4"
        aspectRatio="16/10"
      />
    </div>,
    <div key="battles">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>Missiles and Mines</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        On May 17, 1987, an Iraqi jet fired two <strong style={{ color: HZ.RED }}>Exocet missiles</strong> at the <strong style={{ color: HZ.RED }}>USS Stark</strong>, killing <strong style={{ color: HZ.PARCHMENT }}>37 American sailors</strong>. On April 14, 1988, the <strong style={{ color: HZ.RED }}>USS Samuel B. Roberts</strong> struck an Iranian mine. The US responded with <strong style={{ color: HZ.RED }}>Operation Praying Mantis</strong> — the largest American naval engagement since World War II. In a single day, the US Navy sank or damaged <strong style={{ color: HZ.PARCHMENT }}>half of Iran's operational fleet</strong>. The strait had become the most heavily militarized waterway on earth.
      </p>
    </div>,
    <div key="flight655">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.RED }}>The Strait's Darkest Day</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        On July 3, 1988, the <strong style={{ color: HZ.RED }}>USS Vincennes</strong> — an Aegis cruiser operating in the strait — shot down <strong style={{ color: HZ.RED }}>Iran Air Flight 655</strong>, a civilian Airbus A300 on a scheduled flight from Bandar Abbas to Dubai. All <strong style={{ color: HZ.PARCHMENT }}>290 passengers and crew</strong> were killed, including <strong style={{ color: HZ.PARCHMENT }}>66 children</strong>. The United States called it a tragic accident. Iran called it murder. The incident remains one of the deepest scars in US-Iran relations — and a reminder that the 21 miles of Hormuz are always <strong style={{ color: HZ.RED }}>one miscalculation from catastrophe</strong>.
      </p>
    </div>,
  ];

  return (
    <section id="tanker-war" style={{ background: HZ.NAVY }}>
      <StickyScroll
        graphic={(activeStep) => {
          const cfg = STEP_CONFIGS[Math.min(activeStep, STEP_CONFIGS.length - 1)];
          const stats = STEP_STATS[Math.min(activeStep, STEP_STATS.length - 1)];
          const isFlight655 = activeStep === 4;

          return (
            <>
              <HormuzGulfMap
                center={cfg.center}
                zoom={cfg.zoom}
                markers={strikeMarkers}
                routes={laneRoutes}
                activeStep={activeStep}
              />
              {/* War stats overlay */}
              <div
                key={activeStep}
                className="absolute z-[1000] pointer-events-none"
                style={{
                  right: 24,
                  top: 24,
                  width: 220,
                  padding: '14px 18px',
                  background: isFlight655
                    ? 'hsla(0, 30%, 8%, 0.92)'
                    : 'hsla(215, 45%, 8%, 0.88)',
                  backdropFilter: 'blur(12px)',
                  border: `1px solid ${isFlight655 ? HZ.RED : HZ.RED}33`,
                  borderRadius: 10,
                  animation: 'oilFadeIn 0.6s ease-out both',
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                <div className="space-y-2.5">
                  {stats.map((s, i) => (
                    <div
                      key={s.label}
                      style={{ animation: `oilFadeIn 0.5s ease-out ${0.15 + i * 0.12}s both` }}
                    >
                      <div style={{ fontSize: 8, color: HZ.SMOKE, opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {s.label}
                      </div>
                      <div style={{
                        fontSize: s.value.length > 15 ? 11 : 16,
                        fontWeight: 700,
                        color: s.color,
                        lineHeight: 1.2,
                      }}>
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          );
        }}
        steps={steps}
        className="min-h-[500vh]"
      />
    </section>
  );
};
