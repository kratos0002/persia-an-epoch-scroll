import React, { useMemo } from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { HormuzGulfMap, type MapMarker, type MapRoute } from '@/components/visuals/HormuzGulfMap';
import { HistoricalImage } from '@/components/visuals/HistoricalImage';
import { ANCIENT_CITIES, ANCIENT_TRADE_ROUTES, HZ } from '@/components/visuals/hormuzMapData';

export const DilmunSection = () => {
  const markers: MapMarker[] = useMemo(() =>
    ANCIENT_CITIES.map(c => ({ coords: c.coords, label: c.name, color: c.color, detail: c.detail })),
  []);

  const routes: MapRoute[] = useMemo(() =>
    ANCIENT_TRADE_ROUTES.map(path => ({ path, color: HZ.AMBER, weight: 1.5, dash: '6, 8', opacity: 0.5 })),
  []);

  const steps = [
    <div key="entrepot">
      <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: HZ.AMBER }}>~3000 BCE</p>
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>The First Entrepôt</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        Long before Rome, before Athens, before the first stone of the Parthenon was cut — ships were crossing this water. The island of <strong style={{ color: HZ.AMBER }}>Dilmun</strong>, modern <strong style={{ color: HZ.AMBER }}>Bahrain</strong>, was the world's first international trading hub. <strong style={{ color: HZ.PARCHMENT }}>Sumerian tablets</strong> record it as a paradise of fresh water and abundant dates — but more importantly, as the place where all trade routes converged.
      </p>
      <HistoricalImage
        src="/images/dilmun-burial-mounds.jpg"
        alt="Ancient Dilmun burial mounds in A'ali, Bahrain"
        caption="Dilmun burial mounds in A'ali, Bahrain — evidence of the Gulf's first great trading civilization"
        credit="Wikimedia Commons"
        className="mt-4"
        aspectRatio="16/10"
      />
    </div>,
    <div key="goods">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>Copper, Lapis, and Pearls</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        <strong style={{ color: HZ.AMBER }}>Copper</strong> from <strong style={{ color: HZ.AMBER }}>Magan</strong> (modern Oman). <strong style={{ color: HZ.AMBER }}>Lapis lazuli</strong> carried overland from Afghanistan. <strong style={{ color: HZ.AMBER }}>Pearls</strong> harvested from the Gulf seabed. Textiles and grain from <strong style={{ color: HZ.AMBER }}>Mesopotamia</strong>. Carnelian and ivory from the <strong style={{ color: HZ.AMBER }}>Indus Valley</strong>. Every commodity moved on dhows that hugged these same coasts, funneling through the same narrow waters between Arabia and Iran.
      </p>
      <p className="font-body text-xs mt-3 italic" style={{ color: HZ.TEAL, opacity: 0.7 }}>
        Click any city on the map to learn more about it.
      </p>
    </div>,
    <div key="funnel">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.TEAL }}>The Funnel</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        Look at the map. The Persian Gulf narrows like a funnel — wide at the mouth of the Tigris and Euphrates, then tightening to a slit where the Arabian plate nearly touches Iran. Every ship entering or leaving the Gulf had to pass through this throat. It was true in 3000 BCE. It is true today.
      </p>
    </div>,
    <div key="paradise">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.AMBER }}>Paradise at the Mouth of a Funnel</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        The Sumerians called <strong style={{ color: HZ.AMBER }}>Dilmun</strong> a paradise — the land where the sun rises, where death does not exist. But paradise sat at the mouth of a <strong style={{ color: HZ.PARCHMENT }}>geographic chokepoint</strong>. Whoever controlled this water controlled the oldest long-distance trade network in human history. The pattern was set <strong style={{ color: HZ.AMBER }}>five thousand years ago</strong>. It has never changed.
      </p>
    </div>,
  ];

  return (
    <section id="ancient-gulf" style={{ background: HZ.NAVY }}>
      <StickyScroll
        graphic={(activeStep) => (
          <HormuzGulfMap
            center={[26.5, 54]}
            zoom={5}
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
