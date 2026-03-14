import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import L from 'leaflet';
import { STRAIT_STAGES, INBOUND_LANE, OUTBOUND_LANE, GULF_CITIES } from './hormuzMapData';

const TEAL = 'hsl(195, 55%, 35%)';
const AMBER = 'hsl(35, 80%, 50%)';

export const StraitZoomMap = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [currentStage, setCurrentStage] = useState(0);
  const linesRef = useRef<L.Polyline[]>([]);
  const markersRef = useRef<L.Marker[]>([]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Map stage from scroll
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      const stageIdx = Math.min(Math.floor(v * STRAIT_STAGES.length), STRAIT_STAGES.length - 1);
      setCurrentStage(stageIdx);
    });
    return unsub;
  }, [scrollYProgress]);

  // Init map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    const map = L.map(mapContainerRef.current, {
      center: STRAIT_STAGES[0].center,
      zoom: STRAIT_STAGES[0].zoom,
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

  // Fly on stage change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const stage = STRAIT_STAGES[currentStage];
    map.flyTo(stage.center, stage.zoom, { duration: 1.5 });

    // Clean previous overlays
    linesRef.current.forEach(l => l.remove());
    markersRef.current.forEach(m => m.remove());
    linesRef.current = [];
    markersRef.current = [];

    // Show shipping lanes at stage 2+
    if (currentStage >= 2) {
      const inbound = L.polyline(INBOUND_LANE, {
        color: AMBER,
        weight: 2,
        dashArray: '8, 6',
        opacity: 0.7,
      }).addTo(map);

      const outbound = L.polyline(OUTBOUND_LANE, {
        color: TEAL,
        weight: 2,
        dashArray: '8, 6',
        opacity: 0.7,
      }).addTo(map);

      linesRef.current = [inbound, outbound];
    }

    // Show city markers at stage 1+
    if (currentStage >= 1) {
      GULF_CITIES.forEach(city => {
        const marker = L.marker(city.coords, {
          icon: L.divIcon({
            className: '',
            html: `<div style="display:flex;align-items:center;gap:4px;white-space:nowrap;">
              <div style="width:6px;height:6px;border-radius:50%;background:${TEAL};box-shadow:0 0 6px ${TEAL};"></div>
              <span style="font-family:'Source Sans 3',sans-serif;font-size:10px;color:hsl(40,35%,88%);text-shadow:0 1px 3px rgba(0,0,0,0.8);">${city.name}</span>
            </div>`,
            iconSize: [0, 0],
            iconAnchor: [-8, 3],
          }),
        }).addTo(map);
        markersRef.current.push(marker);
      });
    }

    // Show lane labels at stage 3
    if (currentStage >= 3) {
      const labels = [
        { text: 'Inbound lane (2 mi)', pos: [26.3, 56.45] as [number, number], color: AMBER },
        { text: 'Buffer zone (2 mi)', pos: [26.45, 56.3] as [number, number], color: 'hsl(210, 15%, 50%)' },
        { text: 'Outbound lane (2 mi)', pos: [26.55, 56.15] as [number, number], color: TEAL },
      ];
      labels.forEach(lbl => {
        const m = L.marker(lbl.pos, {
          icon: L.divIcon({
            className: '',
            html: `<span style="font-family:'Source Sans 3',sans-serif;font-size:9px;color:${lbl.color};letter-spacing:0.08em;text-transform:uppercase;text-shadow:0 1px 4px rgba(0,0,0,0.9);white-space:nowrap;">${lbl.text}</span>`,
            iconSize: [0, 0],
          }),
        }).addTo(map);
        markersRef.current.push(m);
      });
    }
  }, [currentStage]);

  return (
    <div ref={sectionRef} className="relative" style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen">
        <div ref={mapContainerRef} className="w-full h-full" />
        {/* Stage label */}
        <div className="absolute top-6 left-6 z-[500]">
          <p className="text-[9px] tracking-[0.3em] uppercase font-body font-semibold px-3 py-1.5 rounded-md"
            style={{ color: TEAL, background: 'hsla(215, 45%, 8%, 0.8)', backdropFilter: 'blur(8px)' }}>
            {STRAIT_STAGES[currentStage].label}
          </p>
        </div>
        {/* Legend at stage 2+ */}
        {currentStage >= 2 && (
          <div className="absolute bottom-6 left-6 z-[500] flex flex-col gap-1 px-3 py-2 rounded-md"
            style={{ background: 'hsla(215, 45%, 8%, 0.8)', backdropFilter: 'blur(8px)' }}>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5" style={{ background: AMBER, borderStyle: 'dashed' }} />
              <span className="text-[9px] font-body" style={{ color: AMBER }}>Inbound tankers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5" style={{ background: TEAL, borderStyle: 'dashed' }} />
              <span className="text-[9px] font-body" style={{ color: TEAL }}>Outbound tankers</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
