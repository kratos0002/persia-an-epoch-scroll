import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { BL, PARTITION_TIMELINE, POWER_COLORS, type PartitionEvent } from '@/components/visuals/berlinMapData';

/* ── Inject map styles once ────────────────────────────────────────── */
const STYLE_ID = 'berlin-partition-map-styles';
function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes berlinPulse {
      0%   { transform: scale(0.8); opacity: 0.7; }
      70%  { transform: scale(2.2); opacity: 0; }
      100% { transform: scale(2.2); opacity: 0; }
    }
    .berlin-map .leaflet-container {
      background: hsl(42, 25%, 88%) !important;
      filter: sepia(0.15) saturate(0.85);
    }
    .berlin-map .leaflet-popup-content-wrapper {
      background: hsl(220, 20%, 12%) !important;
      border: 1px solid hsl(38, 55%, 48%, 0.3) !important;
      border-radius: 8px !important;
      box-shadow: 0 8px 30px rgba(0,0,0,0.4) !important;
      color: hsl(42, 30%, 92%) !important;
    }
    .berlin-map .leaflet-popup-content { margin: 12px 14px !important; color: hsl(42, 30%, 92%) !important; }
    .berlin-map .leaflet-popup-tip { background: hsl(220, 20%, 12%) !important; }
    .berlin-map .leaflet-popup-close-button { color: hsl(42, 30%, 92%, 0.5) !important; }
    .berlin-territory-label {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      font-family: 'Playfair Display', serif !important;
      font-size: 10px !important;
      font-weight: 700 !important;
      color: hsl(220, 20%, 12%) !important;
      text-shadow: 0 0 4px hsl(42, 30%, 92%, 0.8) !important;
      white-space: nowrap !important;
    }
  `;
  document.head.appendChild(s);
}

/* ── Year display with rounding ────────────────────────────────────── */
function useRoundedYear(motionValue: ReturnType<typeof useTransform>) {
  const [year, setYear] = useState(1830);
  useEffect(() => {
    const unsub = motionValue.on('change', (v: number) => setYear(Math.round(v)));
    return unsub;
  }, [motionValue]);
  return year;
}

/* ── Main Component ────────────────────────────────────────────────── */
export const PartitionTimelapse = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const activeIndexRef = useRef(-1);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const currentYearMotion = useTransform(scrollYProgress, [0, 1], [1825, 1914]);
  const currentYear = useRoundedYear(currentYearMotion);

  // Init Leaflet map
  useEffect(() => {
    ensureStyles();
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [5, 20],
      zoom: 3,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: true,
      keyboard: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
      maxZoom: 8,
      minZoom: 3,
    }).addTo(map);

    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => { map.remove(); mapRef.current = null; layerRef.current = null; };
  }, []);

  // Update map layers based on current year
  useEffect(() => {
    const layer = layerRef.current;
    const map = mapRef.current;
    if (!layer || !map) return;

    // Find which events are visible
    const visibleEvents = PARTITION_TIMELINE.filter(e => e.year <= currentYear);
    const latestIndex = visibleEvents.length - 1;

    // Only re-render if the count changed
    if (latestIndex === activeIndexRef.current) return;
    activeIndexRef.current = latestIndex;

    layer.clearLayers();

    visibleEvents.forEach((event, i) => {
      const color = POWER_COLORS[event.power] || BL.MUTED;
      const isLatest = i === latestIndex;
      const opacity = isLatest ? 0.45 : 0.25;

      // Territory circle
      const circle = L.circle([event.lat, event.lng], {
        radius: event.radius * 1000,
        color: color,
        weight: isLatest ? 2 : 1,
        fillColor: color,
        fillOpacity: opacity,
        dashArray: event.territory.includes('failed') ? '6,4' : undefined,
      }).addTo(layer);

      // Label
      L.marker([event.lat, event.lng], {
        icon: L.divIcon({
          className: 'berlin-territory-label',
          html: `<span style="color:${color}">${event.territory}</span>`,
          iconSize: [100, 16],
          iconAnchor: [50, 8],
        }),
      }).addTo(layer);

      // Popup for latest
      if (isLatest) {
        circle.bindPopup(`
          <div style="font-family:'Cormorant Garamond',serif;">
            <strong style="font-family:'Playfair Display',serif;font-size:14px;">${event.territory}</strong>
            <br/><span style="font-size:11px;opacity:0.7;">${event.year} · ${event.power.charAt(0).toUpperCase() + event.power.slice(1)}</span>
            <br/><span style="font-size:12px;margin-top:6px;display:block;">${event.description}</span>
          </div>
        `, { closeButton: false, maxWidth: 250 }).openPopup();

        // Pulse ring for current event
        const pulseIcon = L.divIcon({
          className: '',
          html: `<div style="width:20px;height:20px;border-radius:50%;background:${color};opacity:0.6;animation:berlinPulse 2s infinite;"></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });
        L.marker([event.lat, event.lng], { icon: pulseIcon }).addTo(layer);
      }
    });

    // Fly to latest event
    if (visibleEvents.length > 0) {
      const latest = visibleEvents[latestIndex];
      map.flyTo([latest.lat, latest.lng], 4, { duration: 0.8, easeLinearity: 0.5 });
    }
  }, [currentYear]);

  // Determine active event for text highlight
  const activeEvent = PARTITION_TIMELINE.filter(e => e.year <= currentYear).pop();

  return (
    <section id="partition-timelapse" ref={sectionRef} className="relative" style={{ background: BL.VELLUM, height: `${PARTITION_TIMELINE.length * 60 + 100}vh` }}>
      <div className="sticky top-0 h-screen flex overflow-hidden berlin-map">
        {/* Left panel — 40% */}
        <div className="w-full lg:w-[40%] h-full flex flex-col justify-center px-6 lg:px-10 py-8 overflow-y-auto" style={{ background: BL.VELLUM }}>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-3" style={{ color: BL.BRASS }}>
            1830 – 1914
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: BL.INK }}>
            The Partition
          </h2>
          <p className="font-body text-sm leading-relaxed mb-6" style={{ color: BL.MUTED }}>
            In thirty years, European control of Africa grew from roughly 10% to 90% of the continent.
            Scroll to watch the partition unfold on the map.
          </p>

          {/* Year display */}
          <div className="font-display text-7xl md:text-8xl font-black mb-4" style={{ color: BL.RED_WAX }}>
            {currentYear}
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full overflow-hidden mb-2" style={{ background: BL.PAPER_DARK }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(to right, ${BL.BRASS}, ${BL.RED_WAX})`,
                width: useTransform(scrollYProgress, [0, 1], ['10%', '90%']),
              }}
            />
          </div>
          <div className="flex justify-between mb-6">
            <span className="font-mono text-xs" style={{ color: BL.MUTED }}>10%</span>
            <span className="font-mono text-xs" style={{ color: BL.MUTED }}>90% colonized</span>
          </div>

          {/* Active event card */}
          {activeEvent && (
            <motion.div
              key={activeEvent.territory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg"
              style={{ background: BL.PAPER_DARK, border: `1px solid ${BL.BRASS}33` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full" style={{ background: POWER_COLORS[activeEvent.power] || BL.MUTED }} />
                <span className="font-mono text-xs font-bold" style={{ color: BL.INK }}>{activeEvent.year}</span>
                <span className="text-[9px] tracking-[0.1em] uppercase font-body font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${POWER_COLORS[activeEvent.power] || BL.MUTED}22`, color: POWER_COLORS[activeEvent.power] || BL.MUTED }}>
                  {activeEvent.power}
                </span>
              </div>
              <h4 className="font-display text-lg font-bold" style={{ color: BL.INK }}>{activeEvent.territory}</h4>
              <p className="font-body text-sm mt-1 leading-relaxed" style={{ color: BL.MUTED }}>{activeEvent.description}</p>
            </motion.div>
          )}

          {/* Power legend */}
          <div className="mt-6 flex flex-wrap gap-3">
            {Object.entries(POWER_COLORS).map(([power, color]) => (
              <div key={power} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                <span className="text-[10px] font-body capitalize" style={{ color: BL.MUTED }}>{power}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel — 60% map */}
        <div className="hidden lg:block lg:w-[60%] h-full relative">
          <div ref={mapContainerRef} className="absolute inset-0" />
        </div>
      </div>
    </section>
  );
};
