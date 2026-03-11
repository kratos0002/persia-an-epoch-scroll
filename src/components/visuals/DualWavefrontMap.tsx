import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '@/lib/utils';
import {
  TELEGRAPH_STATIONS,
  TELEGRAPH_LINE,
  REBELLION_CITIES,
  SOCIAL_NETWORK_NODES,
  REINFORCEMENT_ROUTES,
  getWavefrontPolygons,
} from './rebellionMapData';

const WIRE = 'hsl(200, 60%, 55%)';
const AMBER = 'hsl(30, 85%, 50%)';
const SCARLET = 'hsl(0, 70%, 48%)';

const STYLE_ID = 'rebellion-map-styles';
function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes rebellionPulse {
      0%   { transform: scale(0.5); opacity: 0.5; }
      70%  { transform: scale(2.0); opacity: 0; }
      100% { transform: scale(2.0); opacity: 0; }
    }
    .rebellion-map .leaflet-container { background: hsl(220, 25%, 8%) !important; }
    .rebellion-map .leaflet-popup-content-wrapper {
      background: rgba(10, 15, 30, 0.95) !important;
      backdrop-filter: blur(12px) !important;
      border: 1px solid rgba(255,255,255,0.1) !important;
      border-radius: 10px !important;
      box-shadow: 0 12px 40px rgba(0,0,0,0.5) !important;
      color: #fff !important;
    }
    .rebellion-map .leaflet-popup-content { margin: 14px 16px !important; color: #fff !important; }
    .rebellion-map .leaflet-popup-tip { background: rgba(10, 15, 30, 0.95) !important; }
    .rebellion-map .leaflet-popup-close-button { color: rgba(255,255,255,0.4) !important; }
    .rebellion-city-tooltip {
      background: rgba(10, 15, 30, 0.9) !important;
      border: 1px solid rgba(255,255,255,0.15) !important;
      border-radius: 6px !important;
      color: rgba(255,255,255,0.85) !important;
      font-family: 'Source Sans 3', system-ui, sans-serif !important;
      font-size: 11px !important;
      font-weight: 600 !important;
      padding: 4px 10px !important;
      box-shadow: 0 4px 16px rgba(0,0,0,0.4) !important;
    }
    .rebellion-city-tooltip::before { border-top-color: rgba(10, 15, 30, 0.9) !important; }
  `;
  document.head.appendChild(style);
}

interface DualWavefrontMapProps {
  activePhase: number;
  progress?: number;
  showTelegraph?: boolean;
  showRebellion?: boolean;
  showSocialNetwork?: boolean;
  showReinforcements?: boolean;
  className?: string;
}

export const DualWavefrontMap = ({
  activePhase,
  showTelegraph = false,
  showRebellion = false,
  showSocialNetwork = false,
  showReinforcements = false,
  className,
}: DualWavefrontMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);

  // Init map once
  useEffect(() => {
    ensureStyles();
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [26.5, 80.0],
      zoom: 6,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: true,
      keyboard: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
      maxZoom: 10,
      minZoom: 4,
    }).addTo(map);

    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => { map.remove(); mapRef.current = null; layerRef.current = null; };
  }, []);

  // Update layers on phase/flags change
  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;
    layer.clearLayers();

    // Center based on phase
    const centers: Record<number, { center: [number, number]; zoom: number }> = {
      0: { center: [26.5, 80.0], zoom: 6 },
      1: { center: [25.5, 83.0], zoom: 6 },
      2: { center: [28.5, 78.0], zoom: 7 },
      3: { center: [28.6, 77.5], zoom: 7 },
      4: { center: [27.0, 79.5], zoom: 6 },
      5: { center: [27.5, 79.0], zoom: 6 },
      6: { center: [27.0, 79.5], zoom: 6 },
    };
    const { center, zoom } = centers[activePhase] || centers[0];
    map.flyTo(center, zoom, { duration: 1.5, easeLinearity: 0.25 });

    // ── Telegraph line (progressive draw)
    if (showTelegraph) {
      const stationsToShow = Math.min(
        TELEGRAPH_STATIONS.length,
        activePhase <= 1 ? 3 : activePhase <= 3 ? 5 : TELEGRAPH_STATIONS.length
      );
      const lineCoords = TELEGRAPH_LINE.slice(0, stationsToShow);

      // Glow
      L.polyline(lineCoords.map(c => L.latLng(c[0], c[1])), {
        color: WIRE,
        weight: 6,
        opacity: 0.15,
        smoothFactor: 2,
        lineCap: 'round',
      }).addTo(layer);

      // Main line
      L.polyline(lineCoords.map(c => L.latLng(c[0], c[1])), {
        color: WIRE,
        weight: 2,
        opacity: 0.8,
        smoothFactor: 2,
        dashArray: '8 4',
        lineCap: 'round',
      }).addTo(layer);

      // Station markers (squares)
      TELEGRAPH_STATIONS.slice(0, stationsToShow).forEach(station => {
        const icon = L.divIcon({
          className: '',
          html: `<div style="width:8px;height:8px;background:${WIRE};border:1.5px solid rgba(255,255,255,0.8);box-shadow:0 0 8px ${WIRE};cursor:pointer;"></div>`,
          iconSize: [8, 8],
          iconAnchor: [4, 4],
        });
        L.marker([station.lat, station.lng], { icon })
          .bindTooltip(station.name, {
            permanent: false,
            direction: 'top',
            offset: [0, -8],
            className: 'rebellion-city-tooltip',
          })
          .addTo(layer);
      });

      // Cut telegraph lines in phase 4+
      if (activePhase >= 4) {
        // Show cut marks on Kanpur–Agra segment
        const cutPoints: [number, number][] = [[26.9, 79.2], [27.8, 78.8]];
        cutPoints.forEach(([lat, lng]) => {
          const icon = L.divIcon({
            className: '',
            html: `<div style="color:${SCARLET};font-size:16px;font-weight:bold;text-shadow:0 0 8px ${SCARLET};">✕</div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          });
          L.marker([lat, lng], { icon }).addTo(layer);
        });
      }
    }

    // ── Social network nodes
    if (showSocialNetwork) {
      SOCIAL_NETWORK_NODES.forEach(node => {
        const colors: Record<string, string> = {
          bazaar: AMBER,
          regiment: SCARLET,
          village: 'hsl(43, 60%, 50%)',
          court: 'hsl(30, 85%, 50%)',
        };
        const color = colors[node.type] || AMBER;
        const icon = L.divIcon({
          className: '',
          html: `<div style="width:6px;height:6px;border-radius:50%;background:${color};opacity:0.6;box-shadow:0 0 6px ${color};"></div>`,
          iconSize: [6, 6],
          iconAnchor: [3, 3],
        });
        L.marker([node.lat, node.lng], { icon })
          .bindTooltip(node.name, {
            permanent: false,
            direction: 'top',
            offset: [0, -6],
            className: 'rebellion-city-tooltip',
          })
          .addTo(layer);
      });

      // Faint connecting lines
      for (let i = 0; i < SOCIAL_NETWORK_NODES.length; i++) {
        for (let j = i + 1; j < SOCIAL_NETWORK_NODES.length; j++) {
          const a = SOCIAL_NETWORK_NODES[i];
          const b = SOCIAL_NETWORK_NODES[j];
          const dist = Math.sqrt((a.lat - b.lat) ** 2 + (a.lng - b.lng) ** 2);
          if (dist < 3) {
            L.polyline([[a.lat, a.lng], [b.lat, b.lng]], {
              color: AMBER,
              weight: 0.5,
              opacity: 0.15,
            }).addTo(layer);
          }
        }
      }
    }

    // ── Rebellion wavefronts
    if (showRebellion) {
      const polygons = getWavefrontPolygons(activePhase);
      polygons.forEach(coords => {
        const latLngs = coords.map(([lat, lng]) => L.latLng(lat, lng));
        // Outer glow
        L.polygon(latLngs, {
          color: 'transparent',
          fillColor: AMBER,
          fillOpacity: 0.08,
          smoothFactor: 2.5,
        }).addTo(layer);
        // Main polygon
        L.polygon(latLngs, {
          color: AMBER,
          weight: 1.5,
          fillColor: AMBER,
          fillOpacity: 0.15,
          dashArray: '6 3',
          smoothFactor: 2,
          lineCap: 'round',
        }).addTo(layer);
      });

      // Rebellion city markers
      REBELLION_CITIES
        .filter(c => c.phase <= activePhase)
        .forEach(city => {
          const pulseSize = 24;
          const icon = L.divIcon({
            className: '',
            html: `
              <div style="position:relative;width:${pulseSize}px;height:${pulseSize}px;display:flex;align-items:center;justify-content:center;">
                <div style="position:absolute;width:${pulseSize}px;height:${pulseSize}px;border-radius:50%;background:${AMBER};animation:rebellionPulse 2.5s ease-out infinite;opacity:0.4;"></div>
                <div style="position:relative;width:10px;height:10px;border-radius:50%;background:${AMBER};border:2px solid rgba(255,255,255,0.8);box-shadow:0 0 10px ${AMBER};cursor:pointer;"></div>
              </div>
            `,
            iconSize: [pulseSize, pulseSize],
            iconAnchor: [pulseSize / 2, pulseSize / 2],
            popupAnchor: [0, -14],
          });

          L.marker([city.lat, city.lng], { icon })
            .bindTooltip(city.name, {
              permanent: false,
              direction: 'top',
              offset: [0, -14],
              className: 'rebellion-city-tooltip',
            })
            .bindPopup(`
              <div style="font-family:'Playfair Display',Georgia,serif;min-width:180px;max-width:240px;">
                <div style="font-size:14px;font-weight:700;color:${AMBER};margin-bottom:4px;">${city.name}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-bottom:6px;">${city.date}</div>
                <div style="font-family:'Source Sans 3',system-ui;font-size:12px;line-height:1.5;color:rgba(255,255,255,0.75);">${city.description}</div>
              </div>
            `, { closeButton: true, maxWidth: 260 })
            .addTo(layer);
        });
    }

    // ── Reinforcement routes
    if (showReinforcements && activePhase >= 5) {
      REINFORCEMENT_ROUTES.forEach(route => {
        const latLngs = route.coords.map(c => L.latLng(c[0], c[1]));
        // Glow
        L.polyline(latLngs, {
          color: SCARLET,
          weight: 5,
          opacity: 0.12,
          smoothFactor: 2,
        }).addTo(layer);
        // Line
        L.polyline(latLngs, {
          color: SCARLET,
          weight: 2,
          opacity: 0.7,
          dashArray: '4 6',
          smoothFactor: 2,
        }).addTo(layer);
      });
    }
  }, [activePhase, showTelegraph, showRebellion, showSocialNetwork, showReinforcements]);

  return (
    <div className={cn('rebellion-map w-full h-full', className)}>
      <div
        ref={containerRef}
        className="w-full h-full min-h-[300px] rounded-lg overflow-hidden"
        style={{ background: 'hsl(220, 25%, 8%)' }}
      />
    </div>
  );
};
