import React, { useMemo } from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { HormuzGulfMap, type MapMarker, type MapRoute } from '@/components/visuals/HormuzGulfMap';
import { TRUCIAL_STATES, OIL_DISCOVERIES, HZ } from '@/components/visuals/hormuzMapData';

export const BritishGulfSection = () => {
  const trucialMarkers: MapMarker[] = useMemo(() =>
    TRUCIAL_STATES.map(s => ({ coords: s.coords, label: s.name, color: HZ.BRIT_RED, size: 5 })),
  []);

  const oilMarkers: MapMarker[] = useMemo(() =>
    OIL_DISCOVERIES.map(d => ({ coords: d.coords, label: `${d.year} — ${d.place}`, color: HZ.AMBER, size: 8 })),
  []);

  const steps = [
    <div key="truces">
      <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: HZ.BRIT_RED }}>1820</p>
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>Truces, Not Conquest</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        Britain didn't invade the Gulf. It signed treaties. Starting in 1820, the Royal Navy imposed "truces" on the Arab sheikhdoms along the southern coast — agreements to stop piracy in exchange for British "protection." No flags were raised, no governors installed. But British gunboats patrolled these waters, and no local ruler could sign a treaty with any other foreign power. It was an invisible empire — built on contracts, not colonies.
      </p>
    </div>,
    <div key="trucial-states">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>The Trucial States</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        Seven sheikhdoms lined the coast: Abu Dhabi, Dubai, Sharjah, Ajman, Umm al-Quwain, Ras al-Khaimah, and Fujairah. They were called the "Trucial States" — named not for their tribes or traditions, but for the truces they signed with Britain. For a century and a half, these were sleepy pearl-diving villages and fishing ports. Then everything changed.
      </p>
    </div>,
    <div key="oil">
      <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: HZ.AMBER }}>1932–1969</p>
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>Black Gold</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        Oil was discovered in Bahrain in 1932. Then Saudi Arabia in 1938. Kuwait the same year. Abu Dhabi in 1958. Dubai in 1969. One by one, the geological surveys returned the same answer: beneath these desert coasts lay the largest petroleum reserves on earth. The Gulf transformed overnight from a quiet shipping lane into the world's most strategically important body of water.
      </p>
    </div>,
    <div key="petroleum">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.AMBER }}>Not Spices. Not Pearls. Petroleum.</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        For five thousand years, the strait's importance had been about trade — spices, copper, textiles, pearls. Now it was about one thing: oil. The world's industrial economies ran on petroleum, and the largest concentration of petroleum reserves sat behind a 21-mile-wide chokepoint. The strait didn't become more important because of oil. Oil became important because it had to pass through the strait.
      </p>
    </div>,
    <div key="withdrawal">
      <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: HZ.SMOKE }}>1971</p>
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>The British Leave</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        In 1968, Harold Wilson's government announced Britain would withdraw from "east of Suez." By 1971, the Trucial States became the United Arab Emirates. Bahrain and Qatar became independent. And Iran, under the Shah, immediately seized three small islands near the strait — Abu Musa, Greater Tunb, and Lesser Tunb. The strategic vacuum was filled within hours. A new era of contestation over the 21 miles had begun.
      </p>
    </div>,
  ];

  return (
    <section id="british-gulf" style={{ background: HZ.NAVY }}>
      <StickyScroll
        graphic={(activeStep) => {
          const showOil = activeStep >= 2;
          const combinedMarkers = showOil ? [...trucialMarkers, ...oilMarkers] : trucialMarkers;
          return (
            <HormuzGulfMap
              center={[25.5, 53]}
              zoom={6}
              markers={combinedMarkers}
              routes={[]}
              activeStep={activeStep}
            />
          );
        }}
        steps={steps}
        className="min-h-[500vh]"
      />
    </section>
  );
};
