import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import L from 'leaflet';
import {
  INBOUND_LANE, OUTBOUND_LANE, GULF_CITIES,
  TANKER_WAR_EVENTS, TRUCIAL_STATES, CHOKEPOINTS,
} from '@/components/visuals/hormuzMapData';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { ChokepointComparison } from '@/components/visuals/ChokepointComparison';

/* ── palette ── */
const NAVY = 'hsl(215, 45%, 8%)';
const TEAL = 'hsl(195, 55%, 35%)';
const AMBER = 'hsl(35, 80%, 50%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';
const RED = 'hsl(0, 65%, 50%)';
const BRIT_RED = 'hsl(0, 60%, 40%)';
const PORT_GREEN = 'hsl(140, 40%, 30%)';

/* ── map data ── */
const ANCIENT_TRADE_ROUTES: [number, number][][] = [
  [[26.03, 50.55], [28.5, 46.0], [30.96, 46.1]],
  [[26.03, 50.55], [24.0, 53.0], [23.0, 57.0]],
  [[26.03, 50.55], [26.5, 56.3], [25.0, 62.0], [24.86, 67.0]],
];

const TRADE_CITIES = [
  { name: 'Dilmun (Bahrain)', coords: [26.03, 50.55] as [number, number], color: AMBER },
  { name: 'Ur', coords: [30.96, 46.1] as [number, number], color: PARCHMENT },
  { name: 'Magan (Oman)', coords: [23.0, 57.0] as [number, number], color: PARCHMENT },
  { name: 'Meluhha (Indus)', coords: [24.86, 67.0] as [number, number], color: PARCHMENT },
  { name: 'Strait of Hormuz', coords: [26.56, 56.25] as [number, number], color: TEAL },
];

const OIL_DISCOVERIES = [
  { year: 1932, place: 'Bahrain', coords: [26.03, 50.55] as [number, number] },
  { year: 1938, place: 'Saudi Arabia', coords: [25.38, 49.98] as [number, number] },
  { year: 1938, place: 'Kuwait', coords: [29.31, 47.48] as [number, number] },
  { year: 1958, place: 'Abu Dhabi', coords: [24.45, 54.65] as [number, number] },
  { year: 1969, place: 'Dubai', coords: [25.2, 55.27] as [number, number] },
];

const TANKER_STRIKES: { coords: [number, number]; label: string }[] = [
  { coords: [26.8, 56.0], label: 'Tanker hit' },
  { coords: [26.3, 55.5], label: 'Mine field' },
  { coords: [27.2, 56.4], label: 'USS Stark' },
  { coords: [26.0, 56.8], label: 'Praying Mantis' },
  { coords: [26.6, 55.8], label: 'Flight 655' },
];

/* ── era definitions ── */
interface Era {
  id: string;
  center: [number, number];
  zoom: number;
}

const ERAS: Era[] = [
  { id: 'title',       center: [30, 50],       zoom: 3 },
  { id: 'ancient',     center: [26.5, 54],      zoom: 5 },
  { id: 'portugal',    center: [27.06, 56.25],  zoom: 8 },
  { id: 'britain',     center: [25.5, 53],      zoom: 6 },
  { id: 'tanker-war',  center: [26.5, 55],      zoom: 6 },
  { id: 'today',       center: [26.56, 56.25],  zoom: 9 },
  { id: 'chokepoints', center: [25, 40],        zoom: 2 },
  { id: 'epilogue',    center: [26.5, 55],      zoom: 5 },
];

const ERA_THRESHOLDS = [0, 0.08, 0.22, 0.35, 0.50, 0.65, 0.78, 0.90];

function getEra(progress: number): number {
  for (let i = ERA_THRESHOLDS.length - 1; i >= 0; i--) {
    if (progress >= ERA_THRESHOLDS[i]) return i;
  }
  return 0;
}

/* ── small helpers ── */
const divIcon = (html: string) => L.divIcon({ className: '', html, iconSize: [0, 0], iconAnchor: [-8, 3] });

const dot = (color: string, label: string, size = 6) =>
  `<div style="display:flex;align-items:center;gap:4px;white-space:nowrap;">
    <div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};box-shadow:0 0 8px ${color}44;"></div>
    <span style="font-family:'Source Sans 3',sans-serif;font-size:10px;color:${color};text-shadow:0 1px 4px rgba(0,0,0,0.9);">${label}</span>
  </div>`;

const pulseDot = (color: string, label: string) =>
  `<div style="display:flex;align-items:center;gap:4px;white-space:nowrap;">
    <div style="width:10px;height:10px;border-radius:50%;background:${color};box-shadow:0 0 14px ${color};animation:pulse 1.5s infinite;"></div>
    <span style="font-family:'Source Sans 3',sans-serif;font-size:9px;color:${color};text-shadow:0 1px 3px rgba(0,0,0,0.9);font-weight:600;">${label}</span>
  </div>`;

/* ── card component ── */
type Align = 'left' | 'right' | 'center';
interface CardProps { children: React.ReactNode; align?: Align; borderColor?: string; className?: string }

const Card = ({ children, align = 'left', borderColor = TEAL, className }: CardProps) => {
  const justify = align === 'right' ? 'justify-end' : align === 'center' ? 'justify-center' : '';
  const initX = align === 'right' ? 30 : align === 'left' ? -30 : 0;
  const initY = align === 'center' ? 30 : 0;
  return (
    <div className={`min-h-screen flex items-center ${justify} px-8 md:px-16 ${className ?? ''}`}>
      <motion.div
        className="max-w-sm p-6 rounded-xl backdrop-blur-md pointer-events-auto"
        style={{ background: 'hsla(215, 45%, 8%, 0.8)', border: `1px solid ${borderColor}22` }}
        initial={{ opacity: 0, x: initX, y: initY }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const TransitionBeat = ({ quote, color = TEAL }: { quote: string; color?: string }) => (
  <div className="min-h-[70vh] flex items-center justify-center px-8">
    <motion.p
      className="font-display text-xl md:text-2xl lg:text-3xl italic leading-relaxed text-center max-w-xl pointer-events-auto"
      style={{ color }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20%' }}
      transition={{ duration: 1.2 }}
    >
      {quote}
    </motion.p>
  </div>
);

/* ── oil gauge (inline overlay) ── */
const OilGaugeOverlay = () => (
  <motion.div
    className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[600] w-[min(500px,90vw)] pointer-events-none"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
  >
    <div className="rounded-xl p-5" style={{ background: 'hsla(215, 40%, 6%, 0.9)', border: '1px solid hsla(35, 80%, 50%, 0.1)', backdropFilter: 'blur(12px)' }}>
      <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-3 text-center" style={{ color: SMOKE }}>
        Daily oil flow through the Strait of Hormuz
      </p>
      <div className="text-center mb-3">
        <span className="font-display text-4xl md:text-5xl font-black" style={{ color: AMBER }}>
          <AnimatedCounter end={21} duration={1500} />M
        </span>
        <span className="font-body text-sm ml-2" style={{ color: SMOKE }}>barrels / day</span>
      </div>
      <p className="text-[10px] font-body text-center" style={{ color: SMOKE }}>≈ 21% of global petroleum consumption</p>
    </div>
  </motion.div>
);

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export const HormuzMapStory = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<(L.Layer)[]>([]);
  const [currentEra, setCurrentEra] = useState(0);
  const lastEraRef = useRef(-1);
  const [showOilGauge, setShowOilGauge] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  /* Title fade */
  const titleOpacity = useTransform(scrollYProgress, [0, 0.04, 0.07], [1, 1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.03, 0.06], [1, 1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.06], [0.7, 0]);

  /* Track scroll → era */
  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      setCurrentEra(getEra(v));
      setShowOilGauge(v >= 0.68 && v < 0.77);
    });
    return unsub;
  }, [scrollYProgress]);

  /* Init map */
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    const map = L.map(mapContainerRef.current, {
      center: ERAS[0].center,
      zoom: ERAS[0].zoom,
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
    });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 18 }).addTo(map);

    // inject pulse keyframes
    const style = document.createElement('style');
    style.textContent = `@keyframes pulse{0%,100%{opacity:0.7;transform:scale(1)}50%{opacity:1;transform:scale(1.3)}}`;
    document.head.appendChild(style);

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; style.remove(); };
  }, []);

  /* Clear layers helper */
  const clearLayers = useCallback(() => {
    layersRef.current.forEach(l => {
      if (mapRef.current) mapRef.current.removeLayer(l);
    });
    layersRef.current = [];
  }, []);

  /* Add layer helper */
  const add = useCallback((layer: L.Layer) => {
    if (mapRef.current) layer.addTo(mapRef.current);
    layersRef.current.push(layer);
  }, []);

  /* Era transition */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || currentEra === lastEraRef.current) return;
    lastEraRef.current = currentEra;

    const era = ERAS[currentEra];
    map.flyTo(era.center, era.zoom, { duration: 1.8, easeLinearity: 0.25 });
    clearLayers();

    // Always show Hormuz highlight (except title & chokepoints)
    if (currentEra >= 1 && currentEra !== 6) {
      add(L.circle([26.56, 56.25], { radius: currentEra >= 5 ? 20000 : 60000, color: TEAL, weight: 1, opacity: 0.3, fillColor: TEAL, fillOpacity: 0.05 }));
    }

    switch (currentEra) {
      case 1: // Ancient
        ANCIENT_TRADE_ROUTES.forEach(route => add(L.polyline(route, { color: AMBER, weight: 1.5, dashArray: '6, 8', opacity: 0.5 })));
        TRADE_CITIES.forEach(c => add(L.marker(c.coords, { icon: divIcon(dot(c.color, c.name)) })));
        break;

      case 2: // Portugal
        add(L.marker([27.06, 56.46], { icon: divIcon(
          `<div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
            <div style="width:14px;height:14px;border-radius:3px;background:${PORT_GREEN};border:1.5px solid ${PARCHMENT};display:flex;align-items:center;justify-content:center;">
              <div style="width:4px;height:8px;background:${RED};"></div>
            </div>
            <span style="font-family:'Source Sans 3',sans-serif;font-size:10px;color:${PORT_GREEN};font-weight:700;text-shadow:0 1px 4px rgba(0,0,0,0.9);">Hormuz Island</span>
            <span style="font-family:'Source Sans 3',sans-serif;font-size:8px;color:${SMOKE};text-shadow:0 1px 3px rgba(0,0,0,0.9);">Portuguese Fort (1507)</span>
          </div>`,
        ) }));
        add(L.marker([27.18, 56.27], { icon: divIcon(dot(PARCHMENT, 'Bandar Abbas')) }));
        break;

      case 3: // Britain
        TRUCIAL_STATES.forEach(s => add(L.marker(s.coords, { icon: divIcon(
          `<div style="display:flex;align-items:center;gap:4px;white-space:nowrap;">
            <div style="width:5px;height:5px;border-radius:50%;border:1px solid ${BRIT_RED};"></div>
            <span style="font-family:'Source Sans 3',sans-serif;font-size:9px;color:${BRIT_RED};text-shadow:0 1px 3px rgba(0,0,0,0.8);">${s.name}</span>
          </div>`,
        ) })));
        OIL_DISCOVERIES.forEach(d => add(L.marker(d.coords, { icon: divIcon(dot(AMBER, `${d.year} — ${d.place}`, 8)) })));
        break;

      case 4: // Tanker War
        TANKER_STRIKES.forEach(s => add(L.marker(s.coords, { icon: divIcon(pulseDot(RED, s.label)) })));
        // show shipping lanes faintly
        add(L.polyline(INBOUND_LANE, { color: AMBER, weight: 1, dashArray: '6, 8', opacity: 0.3 }));
        add(L.polyline(OUTBOUND_LANE, { color: TEAL, weight: 1, dashArray: '6, 8', opacity: 0.3 }));
        break;

      case 5: // Today
        add(L.polyline(INBOUND_LANE, { color: AMBER, weight: 2.5, dashArray: '8, 6', opacity: 0.8 }));
        add(L.polyline(OUTBOUND_LANE, { color: TEAL, weight: 2.5, dashArray: '8, 6', opacity: 0.8 }));
        GULF_CITIES.forEach(c => add(L.marker(c.coords, { icon: divIcon(dot(TEAL, c.name)) })));
        // lane labels
        [
          { text: 'Inbound (2 mi)', pos: [26.3, 56.45] as [number, number], color: AMBER },
          { text: 'Buffer (2 mi)', pos: [26.45, 56.3] as [number, number], color: SMOKE },
          { text: 'Outbound (2 mi)', pos: [26.55, 56.15] as [number, number], color: TEAL },
        ].forEach(lbl => add(L.marker(lbl.pos, { icon: divIcon(
          `<span style="font-family:'Source Sans 3',sans-serif;font-size:9px;color:${lbl.color};letter-spacing:0.08em;text-transform:uppercase;text-shadow:0 1px 4px rgba(0,0,0,0.9);white-space:nowrap;">${lbl.text}</span>`,
        ) })));
        break;

      case 6: // Chokepoints
        CHOKEPOINTS.forEach(cp => add(L.marker(cp.coords as [number, number], { icon: divIcon(
          `<div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
            <div style="width:8px;height:8px;border-radius:50%;background:${cp.color};box-shadow:0 0 12px ${cp.color}66;"></div>
            <span style="font-family:'Source Sans 3',sans-serif;font-size:10px;color:${cp.color};font-weight:700;text-shadow:0 1px 4px rgba(0,0,0,0.9);white-space:nowrap;">${cp.name}</span>
            <span style="font-family:'Source Sans 3',sans-serif;font-size:8px;color:${SMOKE};text-shadow:0 1px 3px rgba(0,0,0,0.9);white-space:nowrap;">${cp.barrels}</span>
          </div>`,
        ) })));
        break;

      case 7: // Epilogue — clean, just strait highlight (added above)
        break;
    }
  }, [currentEra, clearLayers, add]);

  /* ── TOTAL scroll height ── */
  const TOTAL_VH = 3500;

  return (
    <section ref={sectionRef} className="relative" style={{ height: `${TOTAL_VH}vh`, background: NAVY }}>
      {/* ── Sticky map ── */}
      <div className="sticky top-0 h-screen z-0">
        <div ref={mapContainerRef} className="absolute inset-0" />
        {/* Dark overlay for title */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ background: NAVY, opacity: overlayOpacity }} />

        {/* Era label */}
        <div className="absolute top-6 left-6 z-[500]">
          <p className="text-[9px] tracking-[0.3em] uppercase font-body font-semibold px-3 py-1.5 rounded-md"
            style={{ color: TEAL, background: 'hsla(215, 45%, 8%, 0.8)', backdropFilter: 'blur(8px)' }}>
            {ERAS[currentEra].id === 'title' ? 'The Strait of Hormuz' : ERAS[currentEra].id.replace('-', ' ')}
          </p>
        </div>

        {/* Shipping legend (eras 4-5) */}
        {(currentEra === 4 || currentEra === 5) && (
          <div className="absolute bottom-6 left-6 z-[500] flex flex-col gap-1 px-3 py-2 rounded-md"
            style={{ background: 'hsla(215, 45%, 8%, 0.8)', backdropFilter: 'blur(8px)' }}>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5" style={{ background: AMBER }} />
              <span className="text-[9px] font-body" style={{ color: AMBER }}>Inbound tankers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5" style={{ background: TEAL }} />
              <span className="text-[9px] font-body" style={{ color: TEAL }}>Outbound tankers</span>
            </div>
          </div>
        )}

        {/* Oil gauge overlay */}
        {showOilGauge && <OilGaugeOverlay />}
      </div>

      {/* ── Title overlay ── */}
      <div className="sticky top-0 h-screen z-20 pointer-events-none" style={{ marginTop: '-100vh' }}>
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center" style={{ opacity: titleOpacity }}>
          <motion.p className="text-[10px] tracking-[0.5em] uppercase font-body font-semibold mb-6"
            style={{ color: SMOKE }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}>
            Essay XII
          </motion.p>
          <motion.h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6 text-center px-6"
            style={{ color: PARCHMENT }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}>
            The Throat of<br /><em className="italic" style={{ color: TEAL }}>the World</em>
          </motion.h1>
          <motion.p className="font-body text-lg md:text-xl max-w-lg mx-auto leading-relaxed text-center px-6"
            style={{ color: SMOKE, opacity: subtitleOpacity as any }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}>
            Every empire that ever ruled the East held this strait. Every one that lost it fell.
          </motion.p>
          <motion.div className="absolute bottom-24 flex items-center gap-3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 2.2 }}>
            <div className="w-16 h-px" style={{ background: AMBER }} />
            <span className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold" style={{ color: AMBER }}>21 miles</span>
            <div className="w-16 h-px" style={{ background: AMBER }} />
          </motion.div>
          <motion.div className="absolute bottom-10 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 1, delay: 2.5 }}>
            <span className="text-[10px] tracking-[0.3em] uppercase font-body" style={{ color: SMOKE }}>Scroll</span>
            <motion.div className="w-px h-8 origin-top" style={{ background: SMOKE }}
              animate={{ scaleY: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Floating narrative cards ── */}
      <div className="relative z-10 pointer-events-none" style={{ marginTop: `${-(TOTAL_VH - 100)}vh` }}>

        {/* ═══ ERA 1: Ancient Gulf ═══ */}
        <div id="ancient-gulf" />
        <Card align="left" borderColor={TEAL}>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4" style={{ color: TEAL }}>
            ~3000 BCE — The Prize
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-black leading-[0.95] mb-4" style={{ color: PARCHMENT }}>
            The Gulf was always <span style={{ color: AMBER }}>the prize.</span>
          </h2>
          <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
            Five thousand years ago, <strong style={{ color: AMBER }}>Dilmun</strong> — modern Bahrain —
            sat at the centre of the known world's richest trade network. Copper from Oman.
            Lapis lazuli from Afghanistan. Pearls from the Gulf's own oyster beds.
          </p>
        </Card>

        <Card align="right" borderColor={TEAL}>
          <p className="font-body text-sm leading-relaxed mb-4" style={{ color: SMOKE }}>
            The Sumerians called Dilmun <em style={{ color: PARCHMENT }}>"the place where the sun rises"</em> —
            a paradise of fresh water in a salt sea. But paradise sat at the mouth of a funnel.
          </p>
          <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
            Every ship entering or leaving the Gulf had to pass through the same narrow throat
            between the Arabian and Iranian coasts. Control the strait and you controlled the trade.
          </p>
        </Card>

        <TransitionBeat quote=""Geography does not change. What changes is who controls it."" />

        {/* ═══ ERA 2: Portugal ═══ */}
        <div id="portugal-seizes" />
        <Card align="left" borderColor={PORT_GREEN}>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4" style={{ color: PORT_GREEN }}>
            1507 — Portugal Seizes the Throat
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-black leading-[0.95] mb-4" style={{ color: PARCHMENT }}>
            Afonso de Albuquerque sailed <span style={{ color: PORT_GREEN }}>east.</span>
          </h2>
          <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
            Portugal wanted to control the spice trade at its source.
            Albuquerque seized Hormuz Island, built a fortress, and taxed every ship that passed.
          </p>
        </Card>

        <Card align="right" borderColor={PORT_GREEN}>
          <p className="font-body text-sm leading-relaxed mb-4" style={{ color: SMOKE }}>
            For nearly <strong style={{ color: PARCHMENT }}>a century</strong>, the Portuguese controlled the entrance to the Gulf.
            Their cannons faced outward — toward Persia, toward Arabia, toward anyone who dared trade without paying.
          </p>
          <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
            It was the first time a European power had seized a chokepoint east of Suez.
            It would not be the last.
          </p>
        </Card>

        <Card align="center" borderColor={PORT_GREEN}>
          <p className="font-body text-sm leading-relaxed text-center" style={{ color: SMOKE }}>
            In 1622, Shah Abbas of Persia allied with the English East India Company to eject the Portuguese.
            The fort was destroyed. But the lesson was learned: <strong style={{ color: TEAL }}>hold the strait, hold the Gulf</strong>.
          </p>
        </Card>

        <TransitionBeat quote="For three centuries, Portugal held the throat. Then came oil." />

        {/* ═══ ERA 3: Britain ═══ */}
        <div id="british-gulf" />
        <Card align="left" borderColor={BRIT_RED}>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4" style={{ color: BRIT_RED }}>
            1820–1971 — Britain's Invisible Empire
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-black leading-[0.95] mb-4" style={{ color: PARCHMENT }}>
            They called it <span style={{ color: BRIT_RED }}>"piracy suppression."</span>
          </h2>
          <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
            Britain signed a series of "truces" with the Gulf sheikhdoms — agreements to stop piracy
            in exchange for naval protection. London called them
            <strong style={{ color: PARCHMENT }}> the Trucial States</strong>.
          </p>
        </Card>

        <Card align="right" borderColor={AMBER}>
          <p className="font-body text-sm leading-relaxed mb-4" style={{ color: SMOKE }}>
            For a century, the arrangement was about trade routes and telegraph cables.
            Then, in 1932, <strong style={{ color: AMBER }}>oil was discovered in Bahrain</strong>.
          </p>
          <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
            Then Saudi Arabia. Then Kuwait. Then Abu Dhabi. The Gulf transformed from a shipping lane
            into the world's <strong style={{ color: AMBER }}>energy reserve</strong>.
          </p>
        </Card>

        <Card align="center" borderColor={BRIT_RED}>
          <p className="font-body text-sm leading-relaxed mb-4 text-center" style={{ color: SMOKE }}>
            In 1971, Britain withdrew from east of Suez. The Trucial States became the
            <strong style={{ color: PARCHMENT }}> United Arab Emirates</strong>.
          </p>
          <p className="font-display text-xl md:text-2xl italic leading-relaxed text-center" style={{ color: BRIT_RED }}>
            "Britain didn't just guard the Gulf — it built the states that sit on either side."
          </p>
        </Card>

        <TransitionBeat quote="The Gulf had always been about trade. Now it was about survival." />

        {/* ═══ ERA 4: Tanker War ═══ */}
        <div id="tanker-war" />
        <Card align="left" borderColor={RED}>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4" style={{ color: RED }}>
            1984–1988 — The Tanker War
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-black leading-[0.95] mb-4" style={{ color: PARCHMENT }}>
            The strait <span style={{ color: RED }}>caught fire.</span>
          </h2>
          <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
            During the Iran-Iraq War, both sides attacked oil tankers.
            Over <strong style={{ color: RED }}>546 ships</strong> were hit between 1981 and 1988.
          </p>
        </Card>

        {TANKER_WAR_EVENTS.slice(0, 3).map((event, i) => (
          <Card key={i} align={i % 2 === 0 ? 'right' : 'left'} borderColor={RED}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 rounded-full" style={{ background: RED, boxShadow: `0 0 10px ${RED}44` }} />
              <span className="font-display text-lg font-bold" style={{ color: RED }}>{event.year}</span>
              <span className="font-body text-sm font-semibold" style={{ color: PARCHMENT }}>{event.label}</span>
            </div>
            <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>{event.detail}</p>
          </Card>
        ))}

        <Card align="center" borderColor={RED}>
          {TANKER_WAR_EVENTS.slice(3).map((event, i) => (
            <div key={i} className="mb-4 last:mb-6">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ background: RED }} />
                <span className="font-display text-sm font-bold" style={{ color: RED }}>{event.year}</span>
                <span className="font-body text-xs font-semibold" style={{ color: PARCHMENT }}>{event.label}</span>
              </div>
              <p className="font-body text-xs leading-relaxed pl-4" style={{ color: SMOKE }}>{event.detail}</p>
            </div>
          ))}
          <div className="pt-4" style={{ borderTop: `1px solid hsla(195, 55%, 35%, 0.15)` }}>
            <p className="font-display text-lg italic text-center" style={{ color: TEAL }}>
              "The strait doesn't just carry oil. It carries the world economy."
            </p>
          </div>
        </Card>

        {/* ═══ ERA 5: Today ═══ */}
        <div id="bottleneck" />
        <Card align="left" borderColor={AMBER}>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4" style={{ color: AMBER }}>
            Today — The 21-Mile Bottleneck
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-black leading-[0.95] mb-4" style={{ color: PARCHMENT }}>
            One fifth of the world's <span style={{ color: AMBER }}>oil.</span>
          </h2>
          <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
            Two shipping lanes, each two miles wide, separated by a two-mile buffer zone.
            Twenty-one million barrels of oil pass through every day.
          </p>
        </Card>

        <Card align="right" borderColor={TEAL}>
          <p className="font-body text-sm leading-relaxed mb-4" style={{ color: SMOKE }}>
            The US Fifth Fleet is permanently stationed in Bahrain.
            Iran's Revolutionary Guard operates fast attack boats in the strait.
          </p>
          <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
            Both sides know: close Hormuz, even briefly,
            and the global economy <strong style={{ color: TEAL }}>shudders</strong>.
          </p>
        </Card>

        {/* ═══ ERA 6: Chokepoints ═══ */}
        <div id="chokepoints" />
        <Card align="center" borderColor={TEAL} className="!max-w-none">
          <div className="max-w-3xl mx-auto">
            <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4 text-center" style={{ color: TEAL }}>
              The World's Chokepoints
            </p>
            <h2 className="font-display text-2xl md:text-4xl font-black leading-[0.95] mb-3 text-center" style={{ color: PARCHMENT }}>
              Five narrow passages. <span style={{ color: TEAL }}>One global economy.</span>
            </h2>
            <div className="mt-6">
              <ChokepointComparison />
            </div>
          </div>
        </Card>

        <Card align="center" borderColor={TEAL}>
          <p className="font-body text-sm leading-relaxed text-center" style={{ color: SMOKE }}>
            Together, these five passages handle over <strong style={{ color: PARCHMENT }}>60% of global maritime trade</strong>.
            They were shaped by tectonic plates millions of years ago.
            Today they shape the fate of nations.
          </p>
        </Card>

        {/* Final padding before epilogue */}
        <div className="h-[30vh]" />
      </div>
    </section>
  );
};
