import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { BL, SPLIT_ETHNIC_GROUPS, BORDER_STATS, GEOMETRIC_BORDERS, type SplitEthnicGroup } from '@/components/visuals/berlinMapData';
import { loadFeatures, getCountryFeatures } from '@/hooks/useAfricaGeoJSON';

const STYLE_ID = 'berlin-ethnic-map-styles';
function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    .ethnic-map .leaflet-container {
      background: hsl(42, 25%, 88%) !important;
      filter: sepia(0.12) saturate(0.85);
    }
    .ethnic-map .leaflet-popup-content-wrapper {
      background: hsl(220, 20%, 12%) !important;
      border: 1px solid hsl(38, 55%, 48%, 0.3) !important;
      border-radius: 8px !important;
      color: hsl(42, 30%, 92%) !important;
    }
    .ethnic-map .leaflet-popup-content { margin: 12px 14px !important; color: hsl(42, 30%, 92%) !important; }
    .ethnic-map .leaflet-popup-tip { background: hsl(220, 20%, 12%) !important; }
    .ethnic-label {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      font-family: 'Cormorant Garamond', serif !important;
      font-size: 11px !important;
      font-weight: 700 !important;
      text-shadow: 0 0 5px hsl(42, 30%, 92%, 0.8) !important;
      white-space: nowrap !important;
    }
  `;
  document.head.appendChild(s);
}

export const EthnicFractureMap = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const baseLayerRef = useRef<L.LayerGroup | null>(null);
  const highlightLayerRef = useRef<L.LayerGroup | null>(null);
  const geoRef = useRef<GeoJSON.Feature[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<SplitEthnicGroup | null>(null);

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

    baseLayerRef.current = L.layerGroup().addTo(map);
    highlightLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    // Draw geometric border lines
    GEOMETRIC_BORDERS.forEach(([lat1, lng1, lat2, lng2]) => {
      L.polyline([[lat1, lng1], [lat2, lng2]], {
        color: BL.RED_WAX,
        weight: 1.5,
        opacity: 0.35,
        dashArray: '8,6',
      }).addTo(baseLayerRef.current!);
    });

    // Load GeoJSON and add ethnic group labels
    loadFeatures().then(features => {
      geoRef.current = features;

      // Show all ethnic groups as light-filled countries
      SPLIT_ETHNIC_GROUPS.forEach(group => {
        const color = group.stateCount >= 3 ? BL.RED_WAX : BL.BRASS;
        const countryFeatures = getCountryFeatures(features, group.countryCodes);
        if (countryFeatures.length > 0) {
          L.geoJSON(countryFeatures as any, {
            style: {
              color: color,
              weight: 1,
              fillColor: color,
              fillOpacity: 0.1,
            },
          }).addTo(baseLayerRef.current!);
        }

        L.marker([group.lat, group.lng], {
          icon: L.divIcon({
            className: 'ethnic-label',
            html: `<span style="color:${color}">${group.name}</span>`,
            iconSize: [80, 16],
            iconAnchor: [40, 8],
          }),
        }).addTo(baseLayerRef.current!);
      });
    });

    return () => { map.remove(); mapRef.current = null; baseLayerRef.current = null; highlightLayerRef.current = null; };
  }, []);

  // Highlight selected group countries
  useEffect(() => {
    const map = mapRef.current;
    const hLayer = highlightLayerRef.current;
    if (!map || !hLayer) return;
    hLayer.clearLayers();

    if (!selectedGroup) return;

    const color = selectedGroup.stateCount >= 3 ? BL.RED_WAX : BL.BRASS;
    const countryFeatures = getCountryFeatures(geoRef.current, selectedGroup.countryCodes);
    if (countryFeatures.length > 0) {
      L.geoJSON(countryFeatures as any, {
        style: {
          color: color,
          weight: 3,
          fillColor: color,
          fillOpacity: 0.35,
        },
      }).addTo(hLayer);
    }

    map.flyTo([selectedGroup.lat, selectedGroup.lng], 5, { duration: 1 });
  }, [selectedGroup]);

  return (
    <section id="ethnic-fracture" ref={ref} className="relative" style={{ background: BL.VELLUM }}>
      <div className="lg:flex lg:min-h-screen">
        {/* Left panel */}
        <div className="w-full lg:w-[40%] px-6 lg:px-10 py-16 overflow-y-auto">
          <div className="absolute inset-0 pointer-events-none lg:hidden" style={{
            backgroundImage: `linear-gradient(to right, ${BL.GRID_BLUE}06 1px, transparent 1px), linear-gradient(to bottom, ${BL.GRID_BLUE}06 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-8"
          >
            <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-3" style={{ color: BL.RED_WAX }}>
              Michalopoulos & Papaioannou (2016)
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: BL.INK }}>
              The Ethnic Fracture
            </h2>
            <p className="font-body text-sm leading-relaxed" style={{ color: BL.MUTED }}>
              Colonial borders partitioned <strong style={{ color: BL.RED_WAX }}>177 ethnic groups</strong> across
              multiple states. Click a group to see the countries they were split across.
            </p>
          </motion.div>

          {/* Border topology stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-3 gap-3 mb-8"
          >
            {[
              { label: 'Geometric', value: BORDER_STATS.geometric, desc: 'Straight lines / arcs' },
              { label: 'Natural', value: BORDER_STATS.natural, desc: 'Rivers, mountains' },
              { label: 'Cultural', value: BORDER_STATS.cultural, desc: 'Colonial inventions' },
            ].map(stat => (
              <div key={stat.label} className="text-center p-3 rounded-lg" style={{ background: BL.PAPER_DARK }}>
                <div className="font-display text-2xl font-black" style={{ color: BL.RED_WAX }}>{stat.value}%</div>
                <div className="font-body text-[10px] font-semibold mt-1" style={{ color: BL.INK }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Split ethnic groups */}
          <div className="grid grid-cols-2 gap-2">
            {SPLIT_ETHNIC_GROUPS.map((group, i) => (
              <motion.button
                key={group.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
                onClick={() => setSelectedGroup(selectedGroup?.name === group.name ? null : group)}
                className="p-3 rounded-lg text-left transition-all"
                style={{
                  background: selectedGroup?.name === group.name ? BL.INK : BL.PAPER_DARK,
                  border: `1px solid ${group.stateCount >= 3 ? BL.RED_WAX : BL.BRASS}33`,
                }}
              >
                <div className="font-display text-sm font-bold" style={{ color: selectedGroup?.name === group.name ? BL.VELLUM : BL.INK }}>
                  {group.name}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: group.stateCount }).map((_, j) => (
                    <span key={j} className="w-2 h-2 rounded-full" style={{ background: group.stateCount >= 3 ? BL.RED_WAX : BL.BRASS }} />
                  ))}
                  <span className="text-[10px] font-mono ml-1" style={{ color: selectedGroup?.name === group.name ? BL.GRID_BLUE : BL.MUTED }}>
                    {group.stateCount} states
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          {selectedGroup && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-5 rounded-xl"
              style={{ background: BL.INK }}
            >
              <h3 className="font-display text-lg font-bold" style={{ color: BL.VELLUM }}>
                The {selectedGroup.name}
              </h3>
              <p className="font-body text-sm mt-2" style={{ color: BL.GRID_BLUE }}>
                Split across {selectedGroup.stateCount} modern states: {selectedGroup.states.join(', ')}.
              </p>
              <p className="font-body text-xs mt-2" style={{ color: BL.MUTED }}>
                Conflict likelihood is 8% higher and intensity 40% higher in partitioned homelands.
              </p>
            </motion.div>
          )}
        </div>

        {/* Right: map */}
        <div className="hidden lg:block lg:w-[60%] lg:sticky lg:top-0 lg:h-screen ethnic-map">
          <div ref={mapContainerRef} className="absolute inset-0" />
        </div>
      </div>
    </section>
  );
};
