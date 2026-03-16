import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useScroll } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { STAGES, ROUTE_SEGMENTS, RM, TOTAL_DISTANCE_KM } from '@/components/visuals/ramayanaMapData';

/* ── helpers ── */
const glowPolylineOptions: L.PolylineOptions = {
  color: RM.SAFFRON,
  weight: 6,
  opacity: 0.25,
  lineCap: 'round',
  lineJoin: 'round',
};

const corePolylineOptions: L.PolylineOptions = {
  color: RM.SAFFRON,
  weight: 2.5,
  opacity: 0.9,
  dashArray: '8 6',
  lineCap: 'round',
  lineJoin: 'round',
};

function buildMarkerIcon(label: string, detail?: string): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `
      <div style="position:relative;width:200px;display:flex;flex-direction:column;align-items:center;">
        <div style="
          padding:10px 14px;
          border-radius:14px;
          background:linear-gradient(180deg, rgba(8,12,22,0.96), rgba(10,16,28,0.9));
          border:1px solid hsla(25,85%,52%,0.45);
          box-shadow:0 14px 40px rgba(0,0,0,0.45);
          backdrop-filter:blur(12px);
          text-align:center;
        ">
          <div style="
            font-family:'Playfair Display',Georgia,serif;
            font-size:16px;font-weight:700;line-height:1.2;
            color:${RM.SAFFRON};
          ">${label}</div>
          ${detail ? `<div style="
            margin-top:4px;font-family:'Source Sans 3',system-ui,sans-serif;
            font-size:10px;color:rgba(255,255,255,0.55);
          ">${detail}</div>` : ''}
        </div>
        <div style="width:1px;height:14px;background:linear-gradient(180deg,hsla(25,85%,52%,0.8),transparent);"></div>
        <div style="width:10px;height:10px;border-radius:50%;background:${RM.SAFFRON};border:3px solid rgba(255,255,255,0.9);box-shadow:0 0 12px hsla(25,85%,52%,0.5);"></div>
      </div>
    `,
    iconSize: [200, 90],
    iconAnchor: [100, 90],
  });
}

/* ── Card position classes ── */
const CARD_CLASSES: Record<string, string> = {
  'bottom-left': 'bottom-8 left-8',
  'bottom-right': 'bottom-8 right-8',
  'top-left': 'top-24 left-8',
  'top-right': 'top-24 right-8',
  'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
};

export const RamayanaZoomDive = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const routeGlowRef = useRef<L.Polyline[]>([]);
  const routeCoreRef = useRef<L.Polyline[]>([]);
  const [currentStage, setCurrentStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const stage = STAGES[currentStage];

  // Init map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: STAGES[0].center,
      zoom: STAGES[0].zoom,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: true,
      keyboard: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 16,
      minZoom: 3,
    }).addTo(map);

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  // Scroll → stage
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const idx = Math.min(
        STAGES.length - 1,
        Math.floor(v * STAGES.length)
      );
      if (idx !== currentStage) setCurrentStage(idx);
    });
    return unsubscribe;
  }, [scrollYProgress, currentStage]);

  // Stage change → map updates
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const s = STAGES[currentStage];
    map.flyTo(s.center, s.zoom, { duration: 2, easeLinearity: 0.25 });

    // Clear old markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Add markers
    s.markers.forEach(mk => {
      const marker = L.marker(mk.coords, {
        icon: buildMarkerIcon(mk.label, mk.detail),
      }).addTo(map);
      markersRef.current.push(marker);
    });

    // Draw route up to this stage
    routeGlowRef.current.forEach(p => p.remove());
    routeCoreRef.current.forEach(p => p.remove());
    routeGlowRef.current = [];
    routeCoreRef.current = [];

    if (s.routeUpTo >= 0) {
      for (let i = 0; i <= Math.min(s.routeUpTo, ROUTE_SEGMENTS.length - 1); i++) {
        const glow = L.polyline(ROUTE_SEGMENTS[i], glowPolylineOptions).addTo(map);
        const core = L.polyline(ROUTE_SEGMENTS[i], corePolylineOptions).addTo(map);
        routeGlowRef.current.push(glow);
        routeCoreRef.current.push(core);
      }
    }
  }, [currentStage]);

  // Progress fraction for bottom bar
  const progressFraction = currentStage / (STAGES.length - 1);
  const distanceSoFar = Math.round(progressFraction * TOTAL_DISTANCE_KM);

  return (
    <div ref={sectionRef} className="relative" style={{ height: `${STAGES.length * 100}vh`, background: RM.EARTH }}>
      {/* Sticky map */}
      <div className="sticky top-0 h-screen w-full">
        <div ref={mapContainerRef} className="w-full h-full" style={{ background: RM.EARTH }} />

        {/* Overlay narrative card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.id}
            className={`absolute z-[10] ${CARD_CLASSES[stage.cardPosition]} max-w-md pointer-events-auto`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="rounded-xl p-6 backdrop-blur-md"
              style={{
                background: 'rgba(10,15,25,0.88)',
                border: `1px solid hsla(25,85%,52%,0.25)`,
              }}
            >
              {stage.narrative.title && (
                <h3
                  className="font-display text-xl font-bold mb-2"
                  style={{ color: RM.SAFFRON }}
                >
                  {stage.narrative.title}
                </h3>
              )}
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.75)' }}
              >
                {stage.narrative.body}
              </p>
              {stage.narrative.accent && (
                <p
                  className="mt-3 font-body text-xs italic"
                  style={{ color: RM.SAFFRON, opacity: 0.7 }}
                >
                  {stage.narrative.accent}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom progress bar */}
        <div className="absolute bottom-0 left-0 right-0 z-[10] h-10 flex items-center px-6" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
          <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: RM.SAFFRON }}
              animate={{ width: `${progressFraction * 100}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <span className="ml-4 text-[10px] tracking-[0.15em] uppercase font-body font-semibold whitespace-nowrap" style={{ color: RM.SANDSTONE, opacity: 0.6 }}>
            {distanceSoFar} / {TOTAL_DISTANCE_KM} km
          </span>
        </div>

        {/* Stage label */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[10]">
          <div className="px-5 py-2 rounded-full backdrop-blur-md" style={{
            background: 'rgba(10,15,25,0.85)',
            border: '1px solid hsla(25,85%,52%,0.3)',
          }}>
            <p className="text-[10px] tracking-[0.2em] uppercase font-body font-semibold text-center" style={{ color: RM.SAFFRON }}>
              {stage.label}
            </p>
          </div>
        </div>
      </div>

      {/* Invisible scroll steps (for scroll-spy anchors) */}
      <div className="absolute inset-0 pointer-events-none">
        {STAGES.map((s, i) => (
          <div key={s.id} id={s.id} style={{ height: '100vh' }} />
        ))}
      </div>
    </div>
  );
};
