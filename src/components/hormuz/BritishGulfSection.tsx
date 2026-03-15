import React, { useMemo } from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { HormuzGulfMap, type MapMarker, type MapRoute } from '@/components/visuals/HormuzGulfMap';
import { HistoricalImage } from '@/components/visuals/HistoricalImage';
import { TRUCIAL_STATES, OIL_DISCOVERIES, BRITISH_INDIA_HQ, TREATY_ROUTES, HZ } from '@/components/visuals/hormuzMapData';

/** Step-specific map configurations */
const STEP_CONFIGS: { center: [number, number]; zoom: number }[] = [
  { center: [23, 60], zoom: 5 },        // Truces — Bombay + Gulf, tighter frame
  { center: [25.5, 53], zoom: 6 },      // Trucial States — zoomed to coast
  { center: [26, 51.5], zoom: 6 },      // Oil — tight on Gulf oil belt
  { center: [26, 53], zoom: 6 },        // Petroleum — same Gulf view
  { center: [26.5, 55], zoom: 6 },      // Withdrawal — focus on strait area
];

export const BritishGulfSection = () => {
  const trucialMarkers: MapMarker[] = useMemo(() =>
    TRUCIAL_STATES.map(s => ({ coords: s.coords, label: s.name, color: HZ.BRIT_RED, size: 5, detail: s.detail })),
  []);

  /** Subset for the zoomed-out truces step — only key sheikhdoms to avoid overlap */
  const keyTrucialMarkers: MapMarker[] = useMemo(() =>
    TRUCIAL_STATES
      .filter(s => ['Abu Dhabi', 'Dubai', 'Ras al-Khaimah'].includes(s.name))
      .map(s => ({ coords: s.coords, label: s.name, color: HZ.BRIT_RED, size: 6, detail: s.detail })),
  []);

  const bombayMarker: MapMarker = useMemo(() => ({
    coords: BRITISH_INDIA_HQ.coords,
    label: BRITISH_INDIA_HQ.name,
    color: HZ.BRIT_RED,
    size: 10,
    pulse: true,
    detail: BRITISH_INDIA_HQ.detail,
  }), []);

  const treatyRoutes: MapRoute[] = useMemo(() =>
    TREATY_ROUTES.map(path => ({
      path,
      color: HZ.BRIT_RED,
      weight: 1,
      dash: '4, 8',
      opacity: 0.2,
    })),
  []);

  const oilMarkers: MapMarker[] = useMemo(() =>
    OIL_DISCOVERIES.map(d => ({ coords: d.coords, label: `${d.year} — ${d.place}`, color: HZ.AMBER, size: 8, detail: d.detail })),
  []);

  const steps = [
    <div key="truces">
      <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: HZ.BRIT_RED }}>1820</p>
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>Truces, Not Conquest</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        Britain didn't invade the Gulf. It signed treaties. Starting in <strong style={{ color: HZ.BRIT_RED }}>1820</strong>, the <strong style={{ color: HZ.BRIT_RED }}>Royal Navy</strong> imposed "truces" on the Arab sheikhdoms along the southern coast — agreements to stop piracy in exchange for British "protection." No flags were raised, no governors installed. But British gunboats patrolled these waters, and no local ruler could sign a treaty with any other foreign power. It was an <strong style={{ color: HZ.PARCHMENT }}>invisible empire</strong> — built on contracts, not colonies.
      </p>
      {/* Treaty escalation timeline */}
      <div className="mt-4 space-y-1.5" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
        {[
          { year: '1820', label: 'General Treaty of Peace', desc: 'Anti-piracy agreement' },
          { year: '1835', label: 'Maritime Truce', desc: 'Seasonal ceasefire on the sea' },
          { year: '1853', label: 'Perpetual Maritime Truce', desc: 'Permanent ceasefire — Britain as enforcer' },
          { year: '1892', label: 'Exclusive Agreements', desc: 'No foreign relations without British consent' },
        ].map((t, i) => (
          <div
            key={t.year}
            className="flex items-center gap-2"
            style={{ opacity: 0.55 + i * 0.15 }}
          >
            <span style={{ fontSize: 9, fontWeight: 700, color: HZ.BRIT_RED, minWidth: 28 }}>{t.year}</span>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: HZ.BRIT_RED, flexShrink: 0 }} />
            <div style={{ height: 1, width: 8, background: HZ.BRIT_RED, opacity: 0.4 }} />
            <div>
              <span style={{ fontSize: 10, fontWeight: 600, color: HZ.PARCHMENT }}>{t.label}</span>
              <span style={{ fontSize: 9, color: HZ.SMOKE, marginLeft: 6 }}>{t.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>,
    <div key="trucial-states">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>The Trucial States</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        Seven sheikhdoms lined the coast: <strong style={{ color: HZ.BRIT_RED }}>Abu Dhabi</strong>, <strong style={{ color: HZ.BRIT_RED }}>Dubai</strong>, <strong style={{ color: HZ.BRIT_RED }}>Sharjah</strong>, <strong style={{ color: HZ.BRIT_RED }}>Ajman</strong>, <strong style={{ color: HZ.BRIT_RED }}>Umm al-Quwain</strong>, <strong style={{ color: HZ.BRIT_RED }}>Ras al-Khaimah</strong>, and <strong style={{ color: HZ.BRIT_RED }}>Fujairah</strong>. They were called the <strong style={{ color: HZ.PARCHMENT }}>"Trucial States"</strong> — named not for their tribes or traditions, but for the truces they signed with Britain. For a century and a half, these were sleepy pearl-diving villages and fishing ports. Then everything changed.
      </p>
      <HistoricalImage
        src="/images/pearl-diving-gulf.jpg"
        alt="The Pearl Fishery in the Persian Gulf, engraving from The Graphic, 1881"
        caption="Pearl diving in the Persian Gulf — the industry that sustained the Trucial States before oil"
        credit="The Graphic, 1881 / Wikimedia Commons"
        className="mt-4"
        aspectRatio="16/10"
      />
    </div>,
    <div key="oil">
      <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: HZ.AMBER }}>1932–1969</p>
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>Black Gold</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        Oil was discovered in <strong style={{ color: HZ.AMBER }}>Bahrain</strong> in <strong style={{ color: HZ.AMBER }}>1932</strong>. Then <strong style={{ color: HZ.AMBER }}>Saudi Arabia</strong> in 1938. <strong style={{ color: HZ.AMBER }}>Kuwait</strong> the same year. <strong style={{ color: HZ.AMBER }}>Abu Dhabi</strong> in 1958. <strong style={{ color: HZ.AMBER }}>Dubai</strong> in 1969. One by one, the geological surveys returned the same answer: beneath these desert coasts lay the <strong style={{ color: HZ.PARCHMENT }}>largest petroleum reserves on earth</strong>. The Gulf transformed overnight from a quiet shipping lane into the world's most strategically important body of water.
      </p>
      <HistoricalImage
        src="/images/first-oil-well-bahrain.jpg"
        alt="First oil well in Bahrain, discovered 1932"
        caption="Bahrain's first oil well — the discovery that transformed the Gulf from a shipping lane into the world's energy reserve"
        credit="Wikimedia Commons"
        className="mt-4"
        aspectRatio="4/3"
      />
    </div>,
    <div key="petroleum">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.AMBER }}>Not Spices. Not Pearls. Petroleum.</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        For five thousand years, the strait's importance had been about trade — spices, copper, textiles, pearls. Now it was about one thing: <strong style={{ color: HZ.AMBER }}>oil</strong>. The world's industrial economies ran on petroleum, and the largest concentration of petroleum reserves sat behind a <strong style={{ color: HZ.PARCHMENT }}>21-mile-wide chokepoint</strong>. The strait didn't become more important because of oil. Oil became important because it had to pass through the strait.
      </p>
    </div>,
    <div key="withdrawal">
      <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: HZ.SMOKE }}>1971</p>
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>The British Leave</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        In 1968, <strong style={{ color: HZ.BRIT_RED }}>Harold Wilson's</strong> government announced Britain would withdraw from "east of Suez." By <strong style={{ color: HZ.PARCHMENT }}>1971</strong>, the Trucial States became the <strong style={{ color: HZ.AMBER }}>United Arab Emirates</strong>. <strong style={{ color: HZ.AMBER }}>Bahrain</strong> and <strong style={{ color: HZ.AMBER }}>Qatar</strong> became independent. And Iran, under the Shah, immediately seized three small islands near the strait — <strong style={{ color: HZ.BRIT_RED }}>Abu Musa</strong>, <strong style={{ color: HZ.BRIT_RED }}>Greater Tunb</strong>, and <strong style={{ color: HZ.BRIT_RED }}>Lesser Tunb</strong>. The strategic vacuum was filled within hours. A new era of contestation over the 21 miles had begun.
      </p>
    </div>,
  ];

  return (
    <section id="british-gulf" style={{ background: HZ.NAVY }}>
      <StickyScroll
        graphic={(activeStep) => {
          const cfg = STEP_CONFIGS[Math.min(activeStep, STEP_CONFIGS.length - 1)];
          const isTrucesStep = activeStep <= 0;
          const showOil = activeStep === 2 || activeStep === 3;
          const isWithdrawal = activeStep === 4;

          const stepMarkers = isTrucesStep
            ? [bombayMarker, ...keyTrucialMarkers]
            : showOil
              ? oilMarkers
              : trucialMarkers;

          const stepRoutes = isTrucesStep ? treatyRoutes : [];

          const OIL_DATA = [
            { country: 'Saudi Arabia', barrels: 267, year: 1938 },
            { country: 'Iran', barrels: 158, year: 1908 },
            { country: 'Iraq', barrels: 145, year: 1927 },
            { country: 'Kuwait', barrels: 102, year: 1938 },
            { country: 'UAE', barrels: 98, year: 1958 },
          ];
          const maxBarrels = 267;

          return (
            <>
              <HormuzGulfMap
                center={cfg.center}
                zoom={cfg.zoom}
                markers={stepMarkers}
                routes={stepRoutes}
                activeStep={activeStep}
              />
              {showOil && (
                <div
                  className="absolute z-[1000] pointer-events-none"
                  style={{
                    right: 24,
                    bottom: 32,
                    width: 260,
                    padding: '16px 20px',
                    background: 'hsla(215, 45%, 8%, 0.88)',
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${HZ.AMBER}22`,
                    borderRadius: 10,
                    animation: 'oilFadeIn 0.8s ease-out both',
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  <p style={{ fontSize: 9, color: HZ.SMOKE, opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 10 }}>
                    Proven Oil Reserves
                  </p>
                  <div className="space-y-2.5">
                    {OIL_DATA.map((r, i) => (
                      <div key={r.country}>
                        <div className="flex justify-between items-baseline mb-1">
                          <span style={{ fontSize: 11, fontWeight: 600, color: HZ.PARCHMENT }}>{r.country}</span>
                          <span style={{ fontSize: 10, color: HZ.AMBER, fontWeight: 700 }}>{r.barrels}B</span>
                        </div>
                        <div style={{ height: 4, background: `${HZ.AMBER}12`, borderRadius: 2, overflow: 'hidden' }}>
                          <div
                            style={{
                              width: `${(r.barrels / maxBarrels) * 100}%`,
                              height: '100%',
                              background: `linear-gradient(90deg, ${HZ.AMBER}, hsl(30, 90%, 55%))`,
                              borderRadius: 2,
                              animation: `oilBarGrow 1.2s ease-out ${0.3 + i * 0.15}s both`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: 8, color: HZ.SMOKE, opacity: 0.35, marginTop: 10, textAlign: 'center' }}>
                    billion barrels · all behind the strait
                  </p>
                </div>
              )}
              {isWithdrawal && (
                <div
                  className="absolute z-[1000] pointer-events-none"
                  style={{
                    right: 24,
                    bottom: 32,
                    width: 240,
                    padding: '16px 20px',
                    background: 'hsla(215, 45%, 8%, 0.88)',
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${HZ.AMBER}22`,
                    borderRadius: 10,
                    animation: 'oilFadeIn 0.8s ease-out both',
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  <p style={{ fontSize: 9, color: HZ.SMOKE, opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12 }}>
                    New Nations · 1971
                  </p>
                  <div className="space-y-3">
                    {[
                      { flag: '🇦🇪', name: 'United Arab Emirates', note: 'Seven sheikhdoms unite', delay: 0.3 },
                      { flag: '🇧🇭', name: 'Bahrain', note: 'Independent kingdom', delay: 0.6 },
                      { flag: '🇶🇦', name: 'Qatar', note: 'Independent emirate', delay: 0.9 },
                    ].map(n => (
                      <div
                        key={n.name}
                        className="flex items-center gap-3"
                        style={{ animation: `oilFadeIn 0.6s ease-out ${n.delay}s both` }}
                      >
                        <span style={{ fontSize: 24, lineHeight: 1 }}>{n.flag}</span>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: HZ.PARCHMENT }}>{n.name}</div>
                          <div style={{ fontSize: 9, color: HZ.SMOKE, opacity: 0.6 }}>{n.note}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className="mt-3 pt-3"
                    style={{
                      borderTop: `1px solid ${HZ.BRIT_RED}33`,
                      animation: 'oilFadeIn 0.6s ease-out 1.4s both',
                    }}
                  >
                    <p style={{ fontSize: 9, color: HZ.BRIT_RED, opacity: 0.7 }}>
                      🇮🇷 Iran seizes Abu Musa, Greater Tunb, Lesser Tunb
                    </p>
                  </div>
                </div>
              )}
            </>
          );
        }}
        steps={steps}
        className="min-h-[500vh]"
      />
    </section>
  );
};
