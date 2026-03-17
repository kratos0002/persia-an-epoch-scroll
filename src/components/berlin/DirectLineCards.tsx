import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { BL, DISPLACEMENT_DATA, type DisplacementData } from '@/components/visuals/berlinMapData';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';

const STYLE_ID = 'berlin-directline-map-styles';
function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    .directline-map .leaflet-container {
      background: hsl(42, 20%, 82%) !important;
      filter: sepia(0.15) saturate(0.85);
    }
    .directline-label {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      font-family: 'Playfair Display', serif !important;
      font-size: 11px !important;
      font-weight: 700 !important;
      color: hsl(0, 65%, 42%) !important;
      text-shadow: 0 0 5px hsl(42, 30%, 92%, 0.9) !important;
      white-space: nowrap !important;
    }
  `;
  document.head.appendChild(s);
}

const DirectLineCard = ({ data, index }: { data: DisplacementData; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="rounded-xl overflow-hidden"
      style={{ border: `1px solid ${BL.BRASS}33` }}
    >
      {/* Header */}
      <div className="p-5" style={{ background: BL.PRUSSIAN }}>
        <h3 className="font-display text-xl font-bold" style={{ color: BL.VELLUM }}>
          {data.country}
        </h3>
        <div className="flex gap-6 mt-3">
          <div>
            <span className="text-[9px] tracking-[0.1em] uppercase font-body" style={{ color: BL.GRID_BLUE }}>IDPs</span>
            {inView && (
              <AnimatedCounter
                end={data.idpNum}
                duration={2000}
                suffix="M"
                className="!text-left"
              />
            )}
          </div>
          <div>
            <span className="text-[9px] tracking-[0.1em] uppercase font-body" style={{ color: BL.GRID_BLUE }}>Refugees</span>
            {inView && (
              <AnimatedCounter
                end={data.refugeeNum}
                duration={2000}
                suffix="M"
                className="!text-left"
              />
            )}
          </div>
        </div>
        <span className="text-[9px] font-mono mt-2 block" style={{ color: BL.MUTED }}>{data.date}</span>
      </div>

      {/* Colonial mechanism → Consequence */}
      <div className="p-5" style={{ background: BL.VELLUM }}>
        <div className="mb-3">
          <span className="text-[9px] tracking-[0.1em] uppercase font-body font-semibold" style={{ color: BL.RED_WAX }}>
            Colonial Mechanism
          </span>
          <p className="font-body text-sm leading-relaxed mt-1" style={{ color: BL.INK }}>
            {data.colonialMechanism}
          </p>
        </div>

        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px" style={{ background: BL.BRASS }} />
          <span className="font-body text-xs" style={{ color: BL.BRASS }}>→</span>
          <div className="flex-1 h-px" style={{ background: BL.BRASS }} />
        </div>

        <div>
          <span className="text-[9px] tracking-[0.1em] uppercase font-body font-semibold" style={{ color: BL.BRASS }}>
            Consequence
          </span>
          <p className="font-body text-sm leading-relaxed mt-1" style={{ color: BL.MUTED }}>
            {data.consequence}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const DirectLineCards = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Init map
  useEffect(() => {
    ensureStyles();
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [8, 30],
      zoom: 4,
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

    const layer = L.layerGroup().addTo(map);

    // Add displacement hotspots
    DISPLACEMENT_DATA.forEach(data => {
      const intensity = data.idpNum / 12; // normalize to 0-1 scale
      L.circle([data.lat, data.lng], {
        radius: 200000 + data.idpNum * 40000,
        color: BL.RED_WAX,
        weight: 2,
        fillColor: BL.RED_WAX,
        fillOpacity: 0.15 + intensity * 0.2,
      }).addTo(layer);

      // Pulsing center dot
      const pulseIcon = L.divIcon({
        className: '',
        html: `<div style="width:12px;height:12px;border-radius:50%;background:${BL.RED_WAX};box-shadow:0 0 12px ${BL.RED_WAX};"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });
      L.marker([data.lat, data.lng], { icon: pulseIcon }).addTo(layer);

      L.marker([data.lat, data.lng], {
        icon: L.divIcon({
          className: 'directline-label',
          html: `<span>${data.country}</span>`,
          iconSize: [80, 16],
          iconAnchor: [40, -4],
        }),
      }).addTo(layer);
    });

    mapRef.current = map;

    return () => { map.remove(); mapRef.current = null; };
  }, []);

  return (
    <section id="direct-line" ref={ref} className="relative" style={{ background: BL.PAPER_DARK }}>
      <div className="lg:flex lg:min-h-screen">
        {/* Left panel */}
        <div className="w-full lg:w-[40%] px-6 lg:px-10 py-16 overflow-y-auto">
          <div className="absolute inset-0 pointer-events-none lg:hidden" style={{
            backgroundImage: `linear-gradient(to right, ${BL.GRID_BLUE}05 1px, transparent 1px), linear-gradient(to bottom, ${BL.GRID_BLUE}05 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-8"
          >
            <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-3" style={{ color: BL.RED_WAX }}>
              Berlin → Today
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: BL.INK }}>
              The Direct Line
            </h2>
            <p className="font-body text-sm leading-relaxed" style={{ color: BL.MUTED }}>
              The current crises in these regions are not the result of "ancient hatreds" but predictable
              results of specific policy choices made in European chancelleries over a century ago.
            </p>
          </motion.div>

          <div className="space-y-4">
            {DISPLACEMENT_DATA.map((data, i) => (
              <DirectLineCard key={data.country} data={data} index={i} />
            ))}
          </div>
        </div>

        {/* Right: map */}
        <div className="hidden lg:block lg:w-[60%] lg:sticky lg:top-0 lg:h-screen directline-map">
          <div ref={mapContainerRef} className="absolute inset-0" />
        </div>
      </div>
    </section>
  );
};
