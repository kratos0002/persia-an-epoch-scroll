import React, { useRef, useEffect, useState } from 'react';
import { useScroll } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { STAGES, ROUTE_SEGMENTS, RM, TOTAL_DISTANCE_KM } from '@/components/visuals/ramayanaMapData';

/* ── Polyline styles ── */
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

const dimmedMarkerOptions: L.PolylineOptions = {
  color: RM.DIMMED,
  weight: 1,
  opacity: 0.4,
};

function buildMarkerIcon(label: string, active: boolean): L.DivIcon {
  const size = active ? 12 : 7;
  const bg = active ? RM.SAFFRON : RM.DIMMED;
  const border = active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)';
  const shadow = active ? `0 0 12px hsla(25,85%,52%,0.5)` : 'none';
  return L.divIcon({
    className: '',
    html: `<div style="
      width:${size}px;height:${size}px;border-radius:50%;
      background:${bg};border:2px solid ${border};
      box-shadow:${shadow};
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function buildActiveLabel(label: string, detail?: string): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `
      <div style="position:relative;width:180px;display:flex;flex-direction:column;align-items:center;">
        <div style="
          padding:8px 12px;border-radius:12px;
          background:linear-gradient(180deg, rgba(8,12,22,0.94), rgba(10,16,28,0.88));
          border:1px solid hsla(25,85%,52%,0.4);
          box-shadow:0 10px 30px rgba(0,0,0,0.4);
          backdrop-filter:blur(10px);text-align:center;
        ">
          <div style="font-family:'Playfair Display',Georgia,serif;font-size:14px;font-weight:700;color:${RM.SAFFRON};line-height:1.2;">${label}</div>
          ${detail ? `<div style="margin-top:3px;font-family:'Source Sans 3',system-ui,sans-serif;font-size:9px;color:rgba(255,255,255,0.5);">${detail}</div>` : ''}
        </div>
        <div style="width:1px;height:10px;background:linear-gradient(180deg,hsla(25,85%,52%,0.7),transparent);"></div>
        <div style="width:10px;height:10px;border-radius:50%;background:${RM.SAFFRON};border:3px solid rgba(255,255,255,0.9);box-shadow:0 0 12px hsla(25,85%,52%,0.5);"></div>
      </div>
    `,
    iconSize: [180, 70],
    iconAnchor: [90, 70],
  });
}

export const RamayanaZoomDive = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const activeLabelRef = useRef<L.Marker | null>(null);
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
      const idx = Math.min(STAGES.length - 1, Math.floor(v * STAGES.length));
      if (idx !== currentStage) setCurrentStage(idx);
    });
    return unsubscribe;
  }, [scrollYProgress, currentStage]);

  // Stage change → map updates (accumulated markers)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const s = STAGES[currentStage];
    map.flyTo(s.center, s.zoom, { duration: 1.8, easeLinearity: 0.25 });

    // Clear all markers and re-add accumulated
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
    activeLabelRef.current?.remove();
    activeLabelRef.current = null;

    // Add markers for all stages up to current (accumulated, dimmed for past)
    for (let i = 0; i <= currentStage; i++) {
      const st = STAGES[i];
      st.markers.forEach(mk => {
        const isActive = i === currentStage;
        if (isActive) {
          // Active label marker
          const label = L.marker(mk.coords, {
            icon: buildActiveLabel(mk.label, mk.detail),
          }).addTo(map);
          activeLabelRef.current = label;
        } else {
          // Dimmed dot
          const dot = L.marker(mk.coords, {
            icon: buildMarkerIcon(mk.label, false),
          }).addTo(map);
          markersRef.current.push(dot);
        }
      });
    }

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

  const progressFraction = currentStage / (STAGES.length - 1);
  const distanceSoFar = Math.round(progressFraction * TOTAL_DISTANCE_KM);

  return (
    <div ref={sectionRef} className="relative" style={{ height: `${STAGES.length * 100}vh`, background: RM.EARTH }}>
      {/* Sticky split layout */}
      <div className="sticky top-0 h-screen w-full flex">
        {/* Left Panel — 40% */}
        <div className="w-[40%] h-full flex flex-col relative overflow-hidden" style={{ background: RM.EARTH, borderRight: `1px solid hsla(25, 30%, 20%, 0.6)` }}>
          {/* Phase + Stop counter */}
          <div className="px-8 pt-8 pb-2">
            <p className="text-[9px] tracking-[0.3em] uppercase font-body font-semibold" style={{ color: RM.SAFFRON, opacity: 0.5 }}>
              {stage.phase}
            </p>
            {currentStage > 0 && (
              <p className="text-[10px] font-body mt-1" style={{ color: RM.SANDSTONE, opacity: 0.4 }}>
                Stop {currentStage} of {STAGES.length - 1}
              </p>
            )}
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-8 pb-8 scrollbar-hide">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Title */}
                <h3 className="font-display text-2xl font-bold mt-2 mb-1" style={{ color: RM.SAFFRON }}>
                  {stage.narrative.title}
                </h3>
                {stage.year && (
                  <p className="text-[11px] font-body font-semibold tracking-wide mb-4" style={{ color: RM.GOLD, opacity: 0.7 }}>
                    {stage.year}
                  </p>
                )}

                {/* Image placeholder */}
                {stage.image && (
                  <div className="w-full aspect-[16/10] rounded-lg overflow-hidden mb-5 relative" style={{ background: 'hsl(25, 20%, 15%)' }}>
                    <img
                      src={stage.image.src}
                      alt={stage.image.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <p className="absolute bottom-0 left-0 right-0 px-3 py-2 text-[9px] font-body" style={{ color: 'rgba(255,255,255,0.5)', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
                      {stage.image.caption}
                    </p>
                  </div>
                )}

                {/* Narrative */}
                <p className="font-body text-sm leading-[1.8] mb-4" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {stage.narrative.body}
                </p>

                {stage.narrative.accent && (
                  <p className="font-body text-xs italic mb-6 pl-4" style={{ color: RM.SAFFRON, opacity: 0.7, borderLeft: `2px solid hsla(25, 85%, 52%, 0.3)` }}>
                    {stage.narrative.accent}
                  </p>
                )}

                {/* TODAY block */}
                {stage.today && (
                  <div className="rounded-lg p-4 mb-4" style={{ background: 'hsla(25, 20%, 14%, 1)', border: '1px solid hsla(25, 30%, 22%, 0.6)' }}>
                    <p className="text-[9px] tracking-[0.25em] uppercase font-body font-semibold mb-2" style={{ color: RM.GOLD, opacity: 0.6 }}>
                      Today
                    </p>
                    <p className="font-display text-sm font-semibold mb-2" style={{ color: RM.SANDSTONE }}>
                      {stage.today.name}
                    </p>
                    <p className="font-body text-xs leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      {stage.today.detail}
                    </p>
                    <p className="font-mono text-[10px]" style={{ color: RM.SAFFRON, opacity: 0.4 }}>
                      {stage.today.coordinates}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom progress */}
          <div className="px-8 py-3 flex items-center gap-3" style={{ borderTop: '1px solid hsla(25, 30%, 20%, 0.4)' }}>
            <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'hsla(25, 20%, 18%, 1)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(to right, ${RM.SAFFRON}, ${RM.GOLD})` }}
                animate={{ width: `${progressFraction * 100}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
            <span className="text-[10px] tracking-[0.12em] font-body font-semibold whitespace-nowrap" style={{ color: RM.SANDSTONE, opacity: 0.5 }}>
              {distanceSoFar} / {TOTAL_DISTANCE_KM} km
            </span>
          </div>
        </div>

        {/* Right Map — 60% */}
        <div className="w-[60%] h-full relative">
          <div ref={mapContainerRef} className="w-full h-full" style={{ background: RM.EARTH }} />

          {/* Stage label floating on map */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[10]">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.id}
                className="px-4 py-2 rounded-full backdrop-blur-md"
                style={{ background: 'rgba(10,15,25,0.85)', border: '1px solid hsla(25,85%,52%,0.25)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-[10px] tracking-[0.18em] uppercase font-body font-semibold text-center" style={{ color: RM.SAFFRON }}>
                  {stage.label}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Invisible scroll step anchors */}
      <div className="absolute inset-0 pointer-events-none">
        {STAGES.map((s) => (
          <div key={s.id} id={s.id} style={{ height: '100vh' }} />
        ))}
      </div>
    </div>
  );
};
