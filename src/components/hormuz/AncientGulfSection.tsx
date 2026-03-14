import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import L from 'leaflet';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';

const NAVY = 'hsl(215, 45%, 8%)';
const TEAL = 'hsl(195, 55%, 35%)';
const AMBER = 'hsl(35, 80%, 50%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';

const ANCIENT_TRADE_ROUTES: [number, number][][] = [
  // Dilmun (Bahrain) to Ur (Mesopotamia)
  [[26.03, 50.55], [28.5, 46.0], [30.96, 46.1]],
  // Dilmun to Magan (Oman) copper
  [[26.03, 50.55], [24.0, 53.0], [23.0, 57.0]],
  // Dilmun through Hormuz to Indus
  [[26.03, 50.55], [26.5, 56.3], [25.0, 62.0], [24.86, 67.0]],
];

const TRADE_CITIES = [
  { name: 'Dilmun (Bahrain)', coords: [26.03, 50.55] as [number, number], color: AMBER },
  { name: 'Ur', coords: [30.96, 46.1] as [number, number], color: PARCHMENT },
  { name: 'Magan (Oman)', coords: [23.0, 57.0] as [number, number], color: PARCHMENT },
  { name: 'Meluhha (Indus)', coords: [24.86, 67.0] as [number, number], color: PARCHMENT },
  { name: 'Strait of Hormuz', coords: [26.56, 56.25] as [number, number], color: TEAL },
];

export const AncientGulfSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Init map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    const map = L.map(mapContainerRef.current, {
      center: [26, 54],
      zoom: 5,
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

    // Trade routes
    ANCIENT_TRADE_ROUTES.forEach((route, i) => {
      L.polyline(route, {
        color: AMBER,
        weight: 1.5,
        dashArray: '6, 8',
        opacity: 0.5,
      }).addTo(map);
    });

    // Trade cities
    TRADE_CITIES.forEach(city => {
      L.marker(city.coords, {
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
    });

    // Highlight Hormuz strait with a subtle circle
    L.circle([26.56, 56.25], {
      radius: 60000,
      color: TEAL,
      weight: 1,
      opacity: 0.3,
      fillColor: TEAL,
      fillOpacity: 0.05,
    }).addTo(map);

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  return (
    <section id="ancient-gulf" ref={sectionRef} className="relative" style={{ height: '300vh' }}>
      {/* Sticky map background */}
      <div className="sticky top-0 h-screen">
        <div ref={mapContainerRef} className="w-full h-full" />
        {/* Darkening overlay for text readability */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, hsla(215, 45%, 8%, 0.7), hsla(215, 45%, 8%, 0.3))' }} />
      </div>

      {/* Floating narrative cards */}
      <div className="relative z-10" style={{ marginTop: '-300vh' }}>
        {/* Card 1 — Left aligned */}
        <div className="h-screen flex items-center px-8 md:px-16">
          <motion.div
            className="max-w-sm p-6 rounded-xl backdrop-blur-md"
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

        {/* Card 2 — Right aligned */}
        <div className="h-screen flex items-center justify-end px-8 md:px-16">
          <motion.div
            className="max-w-sm p-6 rounded-xl backdrop-blur-md"
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

        {/* Card 3 — Center, quote */}
        <div className="h-screen flex items-center justify-center px-8">
          <motion.div
            className="max-w-md p-8 rounded-xl backdrop-blur-md text-center"
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
