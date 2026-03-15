import React, { useMemo } from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { HormuzGulfMap, type MapMarker, type MapRoute } from '@/components/visuals/HormuzGulfMap';
import { HistoricalImage } from '@/components/visuals/HistoricalImage';
import { PERSIAN_ERA_CITIES, MONSOON_ROUTES, MONSOON_ENDPOINTS, HZ } from '@/components/visuals/hormuzMapData';

const STEP_CONFIGS: { markers: string[]; routes: boolean; center: [number, number]; zoom: number }[] = [
  { markers: ['Persepolis', 'Susa'], routes: false, center: [29, 52], zoom: 5 },
  { markers: ['Persepolis', 'Susa', 'Ctesiphon'], routes: false, center: [28, 52], zoom: 5 },
  { markers: ['Basra', 'Muscat', 'Siraf'], routes: true, center: [15, 72], zoom: 3 },
  { markers: ['Siraf', 'Old Hormuz', 'Basra'], routes: false, center: [27, 53], zoom: 6 },
  { markers: ['New Hormuz (Island)'], routes: false, center: [27.06, 56.25], zoom: 7 },
];

export const PersianGulfSection = () => {
  const allMarkers: MapMarker[] = useMemo(() =>
    PERSIAN_ERA_CITIES.map(c => ({ coords: c.coords, label: c.name, color: c.color, detail: c.detail })),
  []);

  const monsoonRoutes: MapRoute[] = useMemo(() =>
    MONSOON_ROUTES.map(path => ({ path, color: HZ.TEAL, weight: 1, dash: '8, 10', opacity: 0.35 })),
  []);

  const endpointMarkers: MapMarker[] = useMemo(() =>
    MONSOON_ENDPOINTS.map(e => ({ coords: e.coords, label: e.name, color: e.color, size: 8, pulse: true, detail: e.detail })),
  []);

  const steps = [
    <div key="darius">
      <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: HZ.PERSIAN_GOLD }}>550 BCE</p>
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>Darius and the First Fleet</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        When <strong style={{ color: HZ.PERSIAN_GOLD }}>Darius I</strong> built the <strong style={{ color: HZ.PERSIAN_GOLD }}>Achaemenid Empire</strong> — the largest the world had ever seen — he didn't just conquer land. He commissioned <strong style={{ color: HZ.PERSIAN_GOLD }}>Scylax of Caryanda</strong> to sail from the <strong style={{ color: HZ.PARCHMENT }}>Indus River</strong> to the <strong style={{ color: HZ.PARCHMENT }}>Red Sea</strong>, mapping every port. The Persian navy patrolled both coasts of the Gulf. For the first time, a single empire controlled the entire waterway from Mesopotamia to the Indian Ocean.
      </p>
      <HistoricalImage
        src="/images/darius-portrait.webp"
        alt="Portrait of Darius I, King of Kings of the Achaemenid Empire"
        caption="Darius I — the king who turned the Persian Gulf into a controlled imperial waterway"
        credit="Wikimedia Commons"
        className="mt-4"
        aspectRatio="4/3"
      />
    </div>,
    <div key="sassanid">
      <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: HZ.PERSIAN_GOLD }}>224–651 CE</p>
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>The Persian Lake</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        Under the <strong style={{ color: HZ.PERSIAN_GOLD }}>Sassanid dynasty</strong>, the Gulf became — in the words of historians — a <em style={{ color: HZ.PERSIAN_GOLD }}>"Persian lake."</em> Both the Arabian and Iranian coasts were under a single authority. Sassanid ships sailed to <strong style={{ color: HZ.PARCHMENT }}>India</strong> and <strong style={{ color: HZ.PARCHMENT }}>Sri Lanka</strong>. The empire's capital, <strong style={{ color: HZ.PERSIAN_GOLD }}>Ctesiphon</strong>, sat on the Tigris just upstream from where the Gulf begins. Control of the strait was not a strategic choice. It was a geographic inheritance.
      </p>
    </div>,
    <div key="monsoon">
      <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: HZ.TEAL }}>7th–15th Century</p>
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>The Monsoon Network</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        After the <strong style={{ color: HZ.TEAL }}>Islamic conquest</strong>, Arab and Persian sailors built a trading system that stretched from <strong style={{ color: HZ.TEAL }}>Basra</strong> to <strong style={{ color: HZ.TEAL }}>Canton</strong>. The <strong style={{ color: HZ.TEAL }}>monsoon winds</strong> dictated the rhythm: southwest in summer carried ships to India and China, northeast in winter brought them home. Every return voyage funneled through the strait. The Gulf became one terminal of the greatest maritime trade network the pre-modern world had ever seen.
      </p>
      <HistoricalImage
        src="/images/dhow-persian-gulf.jpg"
        alt="Traditional jalibut dhow sailing in the Persian Gulf"
        caption="A jalibut dhow in the Persian Gulf — the vessel that connected the Gulf to India, China, and East Africa for centuries"
        credit="Wikimedia Commons"
        className="mt-4"
        aspectRatio="16/10"
      />
    </div>,
    <div key="siraf">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.PARCHMENT }}>Siraf and Old Hormuz</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        The port of <strong style={{ color: HZ.TEAL }}>Siraf</strong>, on Iran's southern coast, became one of the wealthiest cities on earth. Archaeologists found <strong style={{ color: HZ.PARCHMENT }}>Chinese porcelain</strong>, <strong style={{ color: HZ.PARCHMENT }}>African ivory</strong>, and <strong style={{ color: HZ.PARCHMENT }}>Indian teak</strong> in its ruins. When an earthquake destroyed Siraf in <strong style={{ color: HZ.TEAL }}>977 CE</strong>, trade shifted to a new settlement called <strong style={{ color: HZ.TEAL }}>Hormuz</strong> — on the mainland coast near the strait's mouth. The geography demanded a port at the chokepoint.
      </p>
    </div>,
    <div key="kingdom">
      <h3 className="font-display text-xl font-bold mb-3" style={{ color: HZ.AMBER }}>The Kingdom of Hormuz</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: HZ.SMOKE }}>
        Around <strong style={{ color: HZ.AMBER }}>1300</strong>, the rulers of Hormuz made a fateful decision: they moved their kingdom from the mainland to a barren, waterless island at the very mouth of the strait. It was militarily defensible and commercially perfect. <strong style={{ color: HZ.AMBER }}>Marco Polo</strong> visited in 1293 and called it <em className="italic" style={{ color: HZ.AMBER }}>"the greatest market in the world."</em> Merchants from India, China, Africa, and Europe crowded its docks. The island had no fresh water, no agriculture — only its position. And that was enough.
      </p>
      <HistoricalImage
        src="/images/hormuz-island-beach.jpg"
        alt="Hormuz Island beach with distinctive colored landscape"
        caption="Hormuz Island — barren, waterless, and the richest port in the medieval world"
        credit="Wikimedia Commons"
        className="mt-4"
        aspectRatio="16/9"
      />
    </div>,
  ];

  return (
    <section id="persian-gulf" style={{ background: HZ.NAVY }}>
      <StickyScroll
        graphic={(activeStep) => {
          const cfg = STEP_CONFIGS[Math.min(activeStep, STEP_CONFIGS.length - 1)];
          const baseMarkers = allMarkers.filter(m => cfg.markers.some(n => m.label.includes(n)));
          const stepMarkers = cfg.routes ? [...baseMarkers, ...endpointMarkers] : baseMarkers;
          const stepRoutes = cfg.routes ? monsoonRoutes : [];
          return (
            <HormuzGulfMap
              center={cfg.center}
              zoom={cfg.zoom}
              markers={stepMarkers}
              routes={stepRoutes}
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
