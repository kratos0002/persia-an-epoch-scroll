import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import L from 'leaflet';
import { TRUCIAL_STATES } from '@/components/visuals/hormuzMapData';

const NAVY = 'hsl(215, 45%, 8%)';
const TEAL = 'hsl(195, 55%, 35%)';
const AMBER = 'hsl(35, 80%, 50%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';
const BRIT_RED = 'hsl(0, 60%, 40%)';
const OIL_BLACK = 'hsl(0, 0%, 12%)';

const OIL_DISCOVERIES = [
  { year: 1932, place: 'Bahrain', coords: [26.03, 50.55] as [number, number] },
  { year: 1938, place: 'Saudi Arabia', coords: [25.38, 49.98] as [number, number] },
  { year: 1938, place: 'Kuwait', coords: [29.31, 47.48] as [number, number] },
  { year: 1958, place: 'Abu Dhabi', coords: [24.45, 54.65] as [number, number] },
  { year: 1969, place: 'Dubai', coords: [25.2, 55.27] as [number, number] },
];

export const BritishGulfSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [oilRevealed, setOilRevealed] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      // Reveal oil discoveries progressively in last half of scroll
      const oilProgress = Math.max(0, (v - 0.5) * 2);
      setOilRevealed(Math.floor(oilProgress * OIL_DISCOVERIES.length));
    });
    return unsub;
  }, [scrollYProgress]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    const map = L.map(mapContainerRef.current, {
      center: [25.5, 53],
      zoom: 6,
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

    // Trucial States markers
    TRUCIAL_STATES.forEach(state => {
      L.marker(state.coords, {
        icon: L.divIcon({
          className: '',
          html: `<div style="display:flex;align-items:center;gap:4px;white-space:nowrap;">
            <div style="width:5px;height:5px;border-radius:50%;border:1px solid ${BRIT_RED};background:transparent;"></div>
            <span style="font-family:'Source Sans 3',sans-serif;font-size:9px;color:${BRIT_RED};text-shadow:0 1px 3px rgba(0,0,0,0.8);">${state.name}</span>
          </div>`,
          iconSize: [0, 0],
          iconAnchor: [-6, 3],
        }),
      }).addTo(map);
    });

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  // Add oil markers as they're revealed
  const oilMarkersRef = useRef<L.Marker[]>([]);
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove existing
    oilMarkersRef.current.forEach(m => m.remove());
    oilMarkersRef.current = [];

    // Add revealed
    for (let i = 0; i < oilRevealed && i < OIL_DISCOVERIES.length; i++) {
      const d = OIL_DISCOVERIES[i];
      const m = L.marker(d.coords, {
        icon: L.divIcon({
          className: '',
          html: `<div style="display:flex;align-items:center;gap:4px;white-space:nowrap;">
            <div style="width:8px;height:8px;border-radius:50%;background:${AMBER};box-shadow:0 0 10px ${AMBER}66;"></div>
            <span style="font-family:'Source Sans 3',sans-serif;font-size:10px;color:${AMBER};font-weight:600;text-shadow:0 1px 3px rgba(0,0,0,0.9);">${d.year} — ${d.place}</span>
          </div>`,
          iconSize: [0, 0],
          iconAnchor: [-6, 4],
        }),
      }).addTo(map);
      oilMarkersRef.current.push(m);
    }
  }, [oilRevealed]);

  return (
    <section id="british-gulf" ref={sectionRef} className="relative" style={{ height: '400vh' }}>
      {/* Sticky map */}
      <div className="sticky top-0 h-screen">
        <div ref={mapContainerRef} className="w-full h-full" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, hsla(215, 45%, 8%, 0.65), hsla(215, 45%, 8%, 0.2))' }} />
      </div>

      {/* Floating cards */}
      <div className="relative z-10" style={{ marginTop: '-400vh' }}>
        {/* Card 1 — Left */}
        <div className="h-screen flex items-center px-8 md:px-16">
          <motion.div
            className="max-w-sm p-6 rounded-xl backdrop-blur-md"
            style={{ background: 'hsla(215, 45%, 8%, 0.8)', border: `1px solid hsla(0, 60%, 40%, 0.15)` }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8 }}
          >
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
          </motion.div>
        </div>

        {/* Card 2 — Right */}
        <div className="h-screen flex items-center justify-end px-8 md:px-16">
          <motion.div
            className="max-w-sm p-6 rounded-xl backdrop-blur-md"
            style={{ background: 'hsla(215, 45%, 8%, 0.8)', border: `1px solid hsla(35, 80%, 50%, 0.15)` }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-sm leading-relaxed mb-4" style={{ color: SMOKE }}>
              For a century, the arrangement was about trade routes and telegraph cables.
              Then, in 1932, <strong style={{ color: AMBER }}>oil was discovered in Bahrain</strong>.
            </p>
            <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
              Then Saudi Arabia. Then Kuwait. Then Abu Dhabi. The Gulf transformed from a shipping lane
              into the world's <strong style={{ color: AMBER }}>energy reserve</strong>.
            </p>
          </motion.div>
        </div>

        {/* Card 3 — Left (oil counter) */}
        <div className="h-screen flex items-center px-8 md:px-16">
          <motion.div
            className="max-w-sm p-6 rounded-xl backdrop-blur-md"
            style={{ background: 'hsla(215, 45%, 8%, 0.8)', border: `1px solid hsla(35, 80%, 50%, 0.1)` }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-3" style={{ color: SMOKE }}>
              Oil discoveries appearing on the map
            </p>
            <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
              Each golden marker represents a discovery that transformed a sleepy pearling port
              into a petro-state. Watch them light up as you scroll.
            </p>
          </motion.div>
        </div>

        {/* Card 4 — Center */}
        <div className="h-screen flex items-center justify-center px-8">
          <motion.div
            className="max-w-md p-8 rounded-xl backdrop-blur-md text-center"
            style={{ background: 'hsla(215, 45%, 8%, 0.8)', border: `1px solid hsla(0, 60%, 40%, 0.1)` }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-sm leading-relaxed mb-4" style={{ color: SMOKE }}>
              In 1971, Britain withdrew from east of Suez. The Trucial States became the
              <strong style={{ color: PARCHMENT }}> United Arab Emirates</strong>.
            </p>
            <p className="font-display text-xl md:text-2xl italic leading-relaxed" style={{ color: BRIT_RED }}>
              "Britain didn't just guard the Gulf — it built the states that sit on either side."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
