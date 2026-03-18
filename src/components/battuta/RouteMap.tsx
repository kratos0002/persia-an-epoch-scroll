import React, { useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { IB, PHASES, getCumulativeRoute, getPhaseRoute } from '@/components/visuals/battutaMapData';

interface RouteMapProps {
  activePhase: number; // 0-6 for phases, -1 for hero, 7+ for post-phases
}

const TILE_URL = 'https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png';

export const RouteMap = ({ activePhase }: RouteMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<L.LayerGroup>(L.layerGroup());
  const prevPhaseRef = useRef(-2);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [20, 45],
      zoom: 3,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: true,
      doubleClickZoom: false,
      worldCopyJump: true,
    });

    L.tileLayer(TILE_URL, {
      maxZoom: 10,
      className: 'battuta-map-tiles',
    }).addTo(map);

    layersRef.current.addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update layers on phase change
  const updateMap = useCallback((phase: number) => {
    const map = mapRef.current;
    if (!map) return;
    if (phase === prevPhaseRef.current) return;
    prevPhaseRef.current = phase;

    const layers = layersRef.current;
    layers.clearLayers();

    if (phase < 0) {
      // Hero state — show Tangier marker only
      map.flyTo([20, 30], 3, { duration: 1.2 });
      const marker = L.circleMarker([35.759, -5.833], {
        radius: 6,
        fillColor: IB.SAFFRON,
        fillOpacity: 0.8,
        color: IB.SAFFRON,
        weight: 2,
      });
      marker.bindTooltip('Tangier, 1325', {
        permanent: true,
        direction: 'right',
        className: 'battuta-tooltip',
        offset: [8, 0],
      });
      layers.addLayer(marker);
      return;
    }

    const clampedPhase = Math.min(phase, PHASES.length - 1);

    // Draw all past phase routes (dimmed)
    for (let i = 0; i <= clampedPhase; i++) {
      const route = getPhaseRoute(i);
      if (route.length < 2) continue;
      const latLngs = route.map(c => L.latLng(c[0], c[1]));
      const isActive = i === clampedPhase;

      const polyline = L.polyline(latLngs, {
        color: isActive ? PHASES[i].color : IB.INK_LIGHT,
        weight: isActive ? 3 : 1.5,
        opacity: isActive ? 0.8 : 0.3,
        dashArray: isActive ? undefined : '4 6',
        smoothFactor: 1.5,
      });
      layers.addLayer(polyline);

      // Add markers for stops
      const phaseData = PHASES[i];
      phaseData.stops.forEach((stop, j) => {
        const isLast = isActive && j === phaseData.stops.length - 1;
        const marker = L.circleMarker([stop.coords[0], stop.coords[1]], {
          radius: isLast ? 6 : isActive ? 4 : 2.5,
          fillColor: isActive ? phaseData.color : IB.INK_LIGHT,
          fillOpacity: isActive ? 0.9 : 0.3,
          color: isLast ? IB.SAFFRON : 'transparent',
          weight: isLast ? 2 : 0,
        });

        if (isActive) {
          marker.bindTooltip(
            `<strong>${stop.label}</strong><br/><span style="font-size:10px;opacity:0.7">${stop.date}</span>`,
            { direction: 'top', offset: [0, -8], className: 'battuta-tooltip' }
          );
        }
        layers.addLayer(marker);
      });
    }

    // Fly to current phase bounds
    const currentRoute = getPhaseRoute(clampedPhase);
    if (currentRoute.length > 0) {
      const bounds = L.latLngBounds(currentRoute.map(c => L.latLng(c[0], c[1])));
      map.flyToBounds(bounds.pad(0.4), { duration: 1.2, maxZoom: 6 });
    }
  }, []);

  useEffect(() => {
    updateMap(activePhase);
  }, [activePhase, updateMap]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      {/* Sepia overlay for portolan chart feel */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-multiply"
        style={{ background: 'hsla(38, 35%, 88%, 0.12)' }}
      />
      <style>{`
        .battuta-map-tiles {
          filter: sepia(0.25) saturate(0.8) brightness(1.05);
        }
        .battuta-tooltip {
          background: ${IB.PARCHMENT} !important;
          border: 1px solid ${IB.SAFFRON}80 !important;
          color: ${IB.INK} !important;
          font-family: 'Cormorant Garamond', Georgia, serif !important;
          font-size: 12px !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
          padding: 6px 10px !important;
        }
        .battuta-tooltip::before {
          border-top-color: ${IB.SAFFRON}80 !important;
        }
      `}</style>
    </div>
  );
};
