import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { BL, PRE_COLONIAL_POLITIES, type PreColonialPolity } from '@/components/visuals/berlinMapData';

const STYLE_ID = 'berlin-precolonial-map-styles';
function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    .precolonial-map .leaflet-container {
      background: hsl(30, 30%, 88%) !important;
      filter: sepia(0.2) saturate(0.9);
    }
    .precolonial-map .leaflet-popup-content-wrapper {
      background: hsl(25, 35%, 92%) !important;
      border: 1px solid hsl(30, 30%, 72%) !important;
      border-radius: 10px !important;
      box-shadow: 0 8px 30px rgba(0,0,0,0.15) !important;
      color: hsl(25, 40%, 18%) !important;
    }
    .precolonial-map .leaflet-popup-content { margin: 12px 14px !important; color: hsl(25, 40%, 18%) !important; }
    .precolonial-map .leaflet-popup-tip { background: hsl(25, 35%, 92%) !important; }
    .precolonial-map .leaflet-popup-close-button { color: hsl(25, 40%, 18%, 0.5) !important; }
    .precolonial-label {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      font-family: 'Playfair Display', serif !important;
      font-size: 11px !important;
      font-weight: 700 !important;
      color: hsl(25, 60%, 30%) !important;
      text-shadow: 0 0 6px hsl(30, 30%, 90%, 0.9) !important;
      white-space: nowrap !important;
    }
  `;
  document.head.appendChild(s);
}

const PolityCard = ({ polity, index, isActive, onClick }: { polity: PreColonialPolity; index: number; isActive: boolean; onClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className="p-5 rounded-xl cursor-pointer transition-all"
      style={{
        background: isActive ? 'hsl(25, 40%, 18%)' : 'hsl(25, 35%, 92%)',
        border: isActive ? `2px solid hsl(25, 60%, 45%)` : '1px solid hsl(30, 30%, 82%)',
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-display text-base font-bold" style={{ color: isActive ? 'hsl(42, 30%, 92%)' : 'hsl(25, 40%, 18%)' }}>
          {polity.name}
        </h3>
        <span className="text-[9px] tracking-[0.12em] uppercase font-body font-semibold px-2 py-0.5 rounded-full"
          style={{ background: isActive ? 'hsl(25, 60%, 30%)' : 'hsl(30, 40%, 82%)', color: isActive ? 'hsl(25, 60%, 45%)' : 'hsl(25, 30%, 35%)' }}>
          {polity.region}
        </span>
      </div>
      <p className="font-body text-xs mb-1" style={{ color: isActive ? 'hsl(42, 30%, 80%)' : 'hsl(25, 30%, 35%)' }}>
        <strong>Pop:</strong> {polity.population}
      </p>
      <p className="font-body text-xs mb-1" style={{ color: isActive ? 'hsl(42, 30%, 80%)' : 'hsl(25, 30%, 35%)' }}>
        <strong>Gov:</strong> {polity.governance}
      </p>
      <p className="font-body text-xs" style={{ color: isActive ? 'hsl(42, 30%, 65%)' : 'hsl(25, 30%, 45%)' }}>
        <strong>Trade:</strong> {polity.trade}
      </p>
    </motion.div>
  );
};

export const PreColonialCards = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const [activePolity, setActivePolity] = useState<string | null>(null);

  // Init map
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

    // Add all polities
    PRE_COLONIAL_POLITIES.forEach(polity => {
      const warmColor = 'hsl(25, 60%, 45%)';

      L.circle([polity.lat, polity.lng], {
        radius: 250000,
        color: warmColor,
        weight: 2,
        fillColor: warmColor,
        fillOpacity: 0.2,
        dashArray: '6,4',
      }).addTo(layerRef.current!);

      L.marker([polity.lat, polity.lng], {
        icon: L.divIcon({
          className: 'precolonial-label',
          html: `<span>${polity.name}</span>`,
          iconSize: [120, 16],
          iconAnchor: [60, 8],
        }),
      }).addTo(layerRef.current!);
    });

    return () => { map.remove(); mapRef.current = null; layerRef.current = null; };
  }, []);

  // Fly to selected polity
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !activePolity) return;
    const polity = PRE_COLONIAL_POLITIES.find(p => p.name === activePolity);
    if (!polity) return;
    map.flyTo([polity.lat, polity.lng], 5, { duration: 1 });
  }, [activePolity]);

  return (
    <section id="pre-colonial" ref={ref} className="relative py-16 lg:py-0" style={{ background: 'hsl(30, 30%, 90%)' }}>
      <div className="lg:flex lg:min-h-screen">
        {/* Left: cards */}
        <div className="w-full lg:w-[40%] px-6 lg:px-10 py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-8"
          >
            <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-3" style={{ color: 'hsl(25, 60%, 45%)' }}>
              The continent they ignored
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: 'hsl(25, 40%, 18%)' }}>
              Pre-Colonial Africa
            </h2>
            <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(25, 20%, 40%)' }}>
              19th-century Africa was home to a diverse array of political systems with complex
              administrative structures. Click a polity to see its location.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {PRE_COLONIAL_POLITIES.map((polity, i) => (
              <PolityCard
                key={polity.name}
                polity={polity}
                index={i}
                isActive={activePolity === polity.name}
                onClick={() => setActivePolity(activePolity === polity.name ? null : polity.name)}
              />
            ))}
          </div>
        </div>

        {/* Right: map */}
        <div className="hidden lg:block lg:w-[60%] lg:sticky lg:top-0 lg:h-screen precolonial-map">
          <div ref={mapContainerRef} className="absolute inset-0" />
        </div>
      </div>
    </section>
  );
};
