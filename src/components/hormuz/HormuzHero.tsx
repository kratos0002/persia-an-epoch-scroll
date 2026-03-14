import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import L from 'leaflet';

const NAVY = 'hsl(215, 45%, 8%)';
const TEAL = 'hsl(195, 55%, 35%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';
const AMBER = 'hsl(35, 80%, 50%)';

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

// Scroll-driven stages: world → gulf → trade routes → quote
const STAGES = [
  { center: [30, 50] as [number, number], zoom: 3 },  // Wide: Middle East in context
  { center: [26.5, 54] as [number, number], zoom: 5 }, // Persian Gulf
  { center: [26.5, 54] as [number, number], zoom: 5 }, // Same zoom, routes appear
  { center: [26.5, 54] as [number, number], zoom: 5 }, // Hold for quote
];

export const HormuzHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const routeLayersRef = useRef<L.Polyline[]>([]);
  const markerLayersRef = useRef<L.Marker[]>([]);
  const circleRef = useRef<L.Circle | null>(null);
  const [currentStage, setCurrentStage] = useState(0);
  const lastStageRef = useRef(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Title fades out in first 30% of scroll
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  // Overlay dims more as we zoom in
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.25], [0.7, 0.35]);

  // Init map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    const map = L.map(mapContainerRef.current, {
      center: STAGES[0].center,
      zoom: STAGES[0].zoom,
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
    }).addTo(map);

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  // Track scroll progress → stages
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      let stage = 0;
      if (v > 0.7) stage = 3;
      else if (v > 0.45) stage = 2;
      else if (v > 0.2) stage = 1;
      setCurrentStage(stage);
    });
    return unsub;
  }, [scrollYProgress]);

  // Fly map to current stage
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (currentStage === lastStageRef.current) return;
    lastStageRef.current = currentStage;

    const { center, zoom } = STAGES[currentStage];
    map.flyTo(center, zoom, { duration: 1.8, easeLinearity: 0.25 });

    // Stage 2+: show trade routes & markers
    if (currentStage >= 2) {
      if (routeLayersRef.current.length === 0) {
        ANCIENT_TRADE_ROUTES.forEach((route) => {
          const line = L.polyline(route, {
            color: AMBER,
            weight: 1.5,
            dashArray: '6, 8',
            opacity: 0.5,
          }).addTo(map);
          routeLayersRef.current.push(line);
        });

        TRADE_CITIES.forEach(city => {
          const marker = L.marker(city.coords, {
            icon: L.divIcon({
              className: '',
              html: `<div style="display:flex;align-items:center;gap:4px;white-space:nowrap;">
                <div style="width:6px;height:6px;border-radius:50%;background:${city.color};box-shadow:0 0 8px ${city.color}44;"></div>
                <span style="font-family:'Source Sans 3',sans-serif;font-size:10px;color:${city.color};text-shadow:0 1px 4px rgba(0,0,0,0.9);">${city.name}</span>
              </div>`,
              iconSize: [0, 0],
              iconAnchor: [-8, 3],
            }),
          }).addTo(map);
          markerLayersRef.current.push(marker);
        });

        const circle = L.circle([26.56, 56.25], {
          radius: 60000,
          color: TEAL,
          weight: 1,
          opacity: 0.3,
          fillColor: TEAL,
          fillOpacity: 0.05,
        }).addTo(map);
        circleRef.current = circle;
      }
    } else {
      // Remove trade routes if scrolling back up
      routeLayersRef.current.forEach(l => l.remove());
      routeLayersRef.current = [];
      markerLayersRef.current.forEach(m => m.remove());
      markerLayersRef.current = [];
      if (circleRef.current) { circleRef.current.remove(); circleRef.current = null; }
    }
  }, [currentStage]);

  return (
    <section id="hormuz-hero" ref={ref} className="relative" style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Leaflet map fills entire screen */}
        <div ref={mapContainerRef} className="absolute inset-0 z-0" />

        {/* Dark overlay — stronger at start, fades as map reveals */}
        <motion.div className="absolute inset-0 z-10 pointer-events-none" style={{ background: NAVY, opacity: overlayOpacity }} />

        {/* Phase 1: Title overlay — fades out as user scrolls */}
        <motion.div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none" style={{ opacity: titleOpacity }}>
          <motion.p
            className="text-[10px] tracking-[0.5em] uppercase font-body font-semibold mb-6"
            style={{ color: SMOKE }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Essay XII
          </motion.p>

          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6 text-center px-6"
            style={{ color: PARCHMENT }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            The Throat of<br />
            <em className="italic" style={{ color: TEAL }}>the World</em>
          </motion.h1>

          <motion.p
            className="font-body text-lg md:text-xl max-w-lg mx-auto leading-relaxed text-center px-6"
            style={{ color: SMOKE, opacity: subtitleOpacity as any }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            Every empire that ever ruled the East held this strait.
            Every one that lost it fell.
          </motion.p>

          {/* Strait width indicator */}
          <motion.div
            className="absolute bottom-24 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 2.2 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-16 h-px" style={{ background: AMBER }} />
              <span className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold" style={{ color: AMBER }}>
                21 miles
              </span>
              <div className="w-16 h-px" style={{ background: AMBER }} />
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase font-body" style={{ color: SMOKE }}>Scroll</span>
            <motion.div
              className="w-px h-8 origin-top"
              style={{ background: SMOKE }}
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Phase 2: Floating narrative cards — scroll over the sticky map */}
      <div className="relative z-30 pointer-events-none" style={{ marginTop: '-300vh' }}>
        {/* Card 1 — Left */}
        <div className="h-screen flex items-center px-8 md:px-16">
          <motion.div
            className="max-w-sm p-6 rounded-xl backdrop-blur-md pointer-events-auto"
            style={{ background: 'hsla(215, 45%, 8%, 0.75)', border: '1px solid hsla(195, 55%, 35%, 0.15)' }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8 }}
          >
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
          </motion.div>
        </div>

        {/* Card 2 — Right */}
        <div className="h-screen flex items-center justify-end px-8 md:px-16">
          <motion.div
            className="max-w-sm p-6 rounded-xl backdrop-blur-md pointer-events-auto"
            style={{ background: 'hsla(215, 45%, 8%, 0.75)', border: '1px solid hsla(195, 55%, 35%, 0.15)' }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-sm leading-relaxed mb-4" style={{ color: SMOKE }}>
              The Sumerians called Dilmun <em style={{ color: PARCHMENT }}>"the place where the sun rises"</em> —
              a paradise of fresh water in a salt sea. But paradise sat at the mouth of a funnel.
            </p>
            <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
              Every ship entering or leaving the Gulf had to pass through the same narrow throat
              between the Arabian and Iranian coasts.
              Control the strait and you controlled the trade.
            </p>
          </motion.div>
        </div>

        {/* Card 3 — Center quote */}
        <div className="h-screen flex items-center justify-center px-8">
          <motion.div
            className="max-w-md p-8 rounded-xl backdrop-blur-md text-center pointer-events-auto"
            style={{ background: 'hsla(215, 45%, 8%, 0.8)', border: '1px solid hsla(195, 55%, 35%, 0.1)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-display text-2xl md:text-3xl italic leading-relaxed" style={{ color: TEAL }}>
              "Geography does not change. What changes is who controls it."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
