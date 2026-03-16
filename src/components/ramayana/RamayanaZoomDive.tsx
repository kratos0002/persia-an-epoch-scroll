import React, { useRef, useEffect, useState } from 'react';
import { useScroll } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { STAGES, ROUTE_SEGMENTS, RM, TOTAL_DISTANCE_KM } from '@/components/visuals/ramayanaMapData';
import { MiniatureBorder, toDevanagari } from '@/components/ramayana/MiniatureBorder';

/* ── Polyline styles — painted manuscript line ── */
const glowPolylineOptions: L.PolylineOptions = {
  color: RM.GOLD_LEAF,
  weight: 7,
  opacity: 0.2,
  lineCap: 'round',
  lineJoin: 'round',
};

const corePolylineOptions: L.PolylineOptions = {
  color: RM.VERMILLION,
  weight: 3,
  opacity: 0.85,
  lineCap: 'round',
  lineJoin: 'round',
};

/* ── Marker builders — miniature painting style ── */
function buildMarkerIcon(_label: string, active: boolean): L.DivIcon {
  const size = active ? 14 : 8;
  const bg = active ? RM.VERMILLION : RM.OCHRE;
  const border = active ? RM.GOLD_LEAF : RM.PARCHMENT_DK;
  const shadow = active ? `0 0 10px hsla(8,78%,48%,0.4)` : 'none';
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
      <div style="position:relative;width:200px;display:flex;flex-direction:column;align-items:center;">
        <div style="
          padding:10px 14px;border-radius:4px;
          background:hsl(38, 45%, 92%);
          border:2px solid ${RM.GOLD_LEAF};
          box-shadow:0 4px 20px rgba(0,0,0,0.15), inset 0 0 0 1px ${RM.VERMILLION}40;
          text-align:center;
        ">
          <div style="font-family:'Playfair Display',Georgia,serif;font-size:14px;font-weight:700;color:${RM.VERMILLION};line-height:1.2;">${label}</div>
          ${detail ? `<div style="margin-top:3px;font-family:'Cormorant Garamond',Georgia,serif;font-size:10px;color:${RM.INK};opacity:0.6;">${detail}</div>` : ''}
        </div>
        <div style="width:2px;height:10px;background:linear-gradient(180deg,${RM.GOLD_LEAF},transparent);"></div>
        <div style="width:12px;height:12px;border-radius:50%;background:${RM.VERMILLION};border:3px solid ${RM.GOLD_LEAF};box-shadow:0 0 8px hsla(8,78%,48%,0.4);"></div>
      </div>
    `,
    iconSize: [200, 76],
    iconAnchor: [100, 76],
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

  // Init map — watercolor tiles
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
    // Warm vintage CartoDB tiles with sepia CSS filter
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
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

    for (let i = 0; i <= currentStage; i++) {
      const st = STAGES[i];
      st.markers.forEach(mk => {
        const isActive = i === currentStage;
        if (isActive) {
          const label = L.marker(mk.coords, {
            icon: buildActiveLabel(mk.label, mk.detail),
          }).addTo(map);
          activeLabelRef.current = label;
        } else {
          const dot = L.marker(mk.coords, {
            icon: buildMarkerIcon(mk.label, false),
          }).addTo(map);
          markersRef.current.push(dot);
        }
      });
    }

    // Draw route
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
    <div ref={sectionRef} className="relative" style={{ height: `${STAGES.length * 100}vh`, background: RM.PARCHMENT }}>
      {/* Sticky split layout */}
      <div className="sticky top-0 h-screen w-full flex">
        {/* Left Panel — 40% — Manuscript Folio */}
        <div
          className="w-[40%] h-full flex flex-col relative overflow-hidden"
          style={{
            background: RM.PARCHMENT,
            borderRight: `2px solid ${RM.GOLD_LEAF}40`,
          }}
        >
          {/* Paper grain texture overlay */}
          <div className="absolute inset-0 pointer-events-none z-30 ramayana-paper-grain" />

          <MiniatureBorder className="absolute inset-0 pointer-events-none" />

          {/* Phase + Stop counter */}
          <div className="px-10 pt-10 pb-2 relative z-20">
            <p
              className="text-[9px] tracking-[0.3em] uppercase font-body font-semibold"
              style={{ color: RM.VERMILLION, opacity: 0.7 }}
            >
              {stage.phase}
            </p>
            {currentStage > 0 && (
              <p className="text-[10px] mt-1" style={{ fontFamily: "'Tiro Devanagari', serif", color: RM.OCHRE, opacity: 0.6 }}>
                फलक {toDevanagari(currentStage)} / {toDevanagari(STAGES.length - 1)}
              </p>
            )}
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-10 pb-10 scrollbar-hide relative z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Title band — vermillion rubric */}
                <div className="relative mt-2 mb-4 -mx-2">
                  <div
                    className="px-4 py-2 inline-block"
                    style={{
                      background: `linear-gradient(135deg, ${RM.VERMILLION}, hsl(8, 70%, 42%))`,
                      boxShadow: `0 2px 12px hsla(8,78%,48%,0.25)`,
                    }}
                  >
                    <h3 className="font-display text-xl font-bold" style={{ color: RM.PARCHMENT }}>
                      {stage.narrative.title}
                    </h3>
                  </div>
                </div>
                {stage.year && (
                  <p className="text-[11px] font-body font-semibold tracking-wide mb-5" style={{ color: RM.GOLD_DIM }}>
                    {stage.year}
                  </p>
                )}

                {/* Image with painted border frame */}
                {stage.image && (
                  <div
                    className="w-full aspect-[16/10] mb-5 relative overflow-hidden"
                    style={{
                      border: `3px solid ${RM.GOLD_LEAF}`,
                      boxShadow: `inset 0 0 0 1px ${RM.VERMILLION}50, 0 4px 16px rgba(0,0,0,0.12)`,
                    }}
                  >
                    <img
                      src={stage.image.src}
                      alt={stage.image.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <p
                      className="absolute bottom-0 left-0 right-0 px-3 py-2 text-[9px] font-body italic"
                      style={{
                        color: RM.INK,
                        background: 'linear-gradient(to top, hsla(38, 45%, 88%, 0.9), transparent)',
                      }}
                    >
                      {stage.image.caption}
                    </p>
                  </div>
                )}

                {/* Narrative body — dark ink on parchment */}
                <p className="font-body text-sm leading-[1.85] mb-4" style={{ color: RM.INK }}>
                  {stage.narrative.body}
                </p>

                {stage.narrative.accent && (
                  <p
                    className="font-body text-xs italic mb-6 pl-4"
                    style={{
                      color: RM.VERMILLION,
                      opacity: 0.8,
                      borderLeft: `2px solid ${RM.VERMILLION}50`,
                    }}
                  >
                    {stage.narrative.accent}
                  </p>
                )}

                {/* TODAY block — marginal gloss style */}
                {stage.today && (
                  <div
                    className="p-4 mb-4 relative"
                    style={{
                      background: 'hsla(38, 40%, 82%, 0.5)',
                      borderLeft: `3px solid ${RM.GOLD_LEAF}`,
                      borderRadius: '0 4px 4px 0',
                    }}
                  >
                    <p className="text-[9px] tracking-[0.25em] uppercase font-body font-semibold mb-2" style={{ color: RM.MALACHITE }}>
                      ☞ Today
                    </p>
                    <p className="font-display text-sm font-semibold mb-2" style={{ color: RM.INK }}>
                      {stage.today.name}
                    </p>
                    <p className="font-body text-xs leading-relaxed mb-3" style={{ color: `${RM.INK}cc` }}>
                      {stage.today.detail}
                    </p>
                    <p className="font-mono text-[10px]" style={{ color: RM.OCHRE, opacity: 0.7 }}>
                      {stage.today.coordinates}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom progress — gold leaf bar */}
          <div className="px-10 py-3 flex items-center gap-3 relative z-20" style={{ borderTop: `1px solid ${RM.GOLD_LEAF}30` }}>
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: `${RM.PARCHMENT_DK}` }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(to right, ${RM.VERMILLION}, ${RM.GOLD_LEAF})` }}
                animate={{ width: `${progressFraction * 100}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
            <span className="text-[10px] tracking-[0.12em] font-body font-semibold whitespace-nowrap" style={{ color: RM.BURNT_UMBER, opacity: 0.6 }}>
              {distanceSoFar} / {TOTAL_DISTANCE_KM} km
            </span>
          </div>
        </div>

        {/* Right Map — 60% */}
        <div className="w-[60%] h-full relative">
          {/* Map with warm vintage filter */}
          <div
            ref={mapContainerRef}
            className="w-full h-full ramayana-map-warm"
            style={{ background: RM.PARCHMENT }}
          />

          {/* Paper grain overlay on map */}
          <div className="absolute inset-0 pointer-events-none z-[5] ramayana-paper-grain" style={{ opacity: 0.4 }} />

          {/* Stage label — cartouche style */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[10]">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.id}
                className="px-5 py-2.5"
                style={{
                  background: 'hsla(38, 45%, 92%, 0.95)',
                  border: `2px solid ${RM.GOLD_LEAF}`,
                  boxShadow: `0 4px 20px rgba(0,0,0,0.1), inset 0 0 0 1px ${RM.VERMILLION}30`,
                  borderRadius: 4,
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-[10px] tracking-[0.18em] uppercase font-body font-semibold text-center" style={{ color: RM.VERMILLION }}>
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
