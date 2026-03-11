import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '@/lib/utils';
import {
  CITIES,
  EMPIRE_TERRITORIES,
  EMPIRE_STYLES,
  EMPIRE_CENTERS,
  type CityMarker,
} from './mapData';

export type EmpireId =
  | 'none'
  | 'achaemenid'
  | 'alexander'
  | 'parthian'
  | 'sassanid'
  | 'islamic'
  | 'mongol'
  | 'safavid'
  | 'modern';

interface InteractiveMapProps {
  empire: EmpireId;
  className?: string;
  showCities?: boolean;
  highlightCities?: string[];
  center?: [number, number];
  zoom?: number;
  animate?: boolean;
}

/* ── Popup HTML builder ────────────────────────────────────── */

function buildPopupHtml(city: CityMarker, empire: EmpireId, color: string): string {
  const desc = city.description[empire] || city.description.default || '';
  return `
    <div style="
      font-family: 'Playfair Display', Georgia, serif;
      min-width: 200px;
      max-width: 260px;
    ">
      <div style="
        font-size: 15px;
        font-weight: 700;
        color: ${color};
        margin-bottom: 6px;
        letter-spacing: 0.02em;
      ">${city.name}</div>
      <div style="
        font-family: 'Source Sans 3', 'Source Sans Pro', system-ui, sans-serif;
        font-size: 12.5px;
        line-height: 1.55;
        color: rgba(255,255,255,0.75);
      ">${desc}</div>
      <div style="
        margin-top: 8px;
        font-size: 10px;
        color: rgba(255,255,255,0.35);
        font-family: system-ui, sans-serif;
        letter-spacing: 0.06em;
      ">${city.lat.toFixed(2)}°N, ${city.lng.toFixed(2)}°E</div>
    </div>
  `;
}

/* ── Marker icon builder with pulse ───────────────────────── */

function buildMarkerIcon(color: string, glowColor: string, isHighlighted: boolean): L.DivIcon {
  const size = isHighlighted ? 12 : 8;
  const pulseSize = size + 16;
  return L.divIcon({
    className: '',
    html: `
      <div style="position:relative;width:${pulseSize}px;height:${pulseSize}px;display:flex;align-items:center;justify-content:center;">
        ${isHighlighted ? `
          <div style="
            position:absolute;
            width:${pulseSize}px;height:${pulseSize}px;
            border-radius:50%;
            background:${glowColor};
            animation: mapPulse 2.5s ease-out infinite;
            opacity:0.4;
          "></div>
        ` : ''}
        <div style="
          position:relative;
          width:${size}px;height:${size}px;
          border-radius:50%;
          background:${color};
          border:2px solid rgba(255,255,255,0.85);
          box-shadow: 0 0 8px ${glowColor}, 0 0 16px ${glowColor};
          cursor:pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        " onmouseenter="this.style.transform='scale(1.5)';this.style.boxShadow='0 0 14px ${glowColor}, 0 0 28px ${glowColor}'"
           onmouseleave="this.style.transform='scale(1)';this.style.boxShadow='0 0 8px ${glowColor}, 0 0 16px ${glowColor}'"
        ></div>
      </div>
    `,
    iconSize: [pulseSize, pulseSize],
    iconAnchor: [pulseSize / 2, pulseSize / 2],
    popupAnchor: [0, -(pulseSize / 2 + 4)],
  });
}

/* ── Inject pulse keyframes + tooltip styles ─────────────── */

const STYLE_ID = 'leaflet-custom-styles';
function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes mapPulse {
      0%   { transform: scale(0.5); opacity: 0.5; }
      70%  { transform: scale(1.8); opacity: 0; }
      100% { transform: scale(1.8); opacity: 0; }
    }
    .leaflet-popup-content-wrapper {
      background: rgba(15, 18, 25, 0.95) !important;
      backdrop-filter: blur(12px) !important;
      border: 1px solid rgba(255,255,255,0.1) !important;
      border-radius: 10px !important;
      box-shadow: 0 12px 40px rgba(0,0,0,0.5) !important;
      color: #fff !important;
      padding: 0 !important;
    }
    .leaflet-popup-content {
      margin: 14px 16px !important;
      color: #fff !important;
    }
    .leaflet-popup-tip {
      background: rgba(15, 18, 25, 0.95) !important;
      border: 1px solid rgba(255,255,255,0.1) !important;
      box-shadow: none !important;
    }
    .leaflet-popup-close-button {
      color: rgba(255,255,255,0.4) !important;
      font-size: 18px !important;
      top: 6px !important;
      right: 8px !important;
    }
    .leaflet-popup-close-button:hover {
      color: rgba(255,255,255,0.8) !important;
    }
    .leaflet-city-tooltip {
      background: rgba(15, 18, 25, 0.9) !important;
      backdrop-filter: blur(8px) !important;
      border: 1px solid rgba(255,255,255,0.15) !important;
      border-radius: 6px !important;
      color: rgba(255,255,255,0.85) !important;
      font-family: 'Source Sans 3', 'Source Sans Pro', system-ui, sans-serif !important;
      font-size: 11.5px !important;
      font-weight: 600 !important;
      padding: 4px 10px !important;
      box-shadow: 0 4px 16px rgba(0,0,0,0.4) !important;
      letter-spacing: 0.03em !important;
    }
    .leaflet-city-tooltip::before {
      border-top-color: rgba(15, 18, 25, 0.9) !important;
    }
    .leaflet-container {
      background: hsl(220, 18%, 10%) !important;
    }
    .leaflet-tile-pane {
      transition: opacity 0.6s ease !important;
    }
  `;
  document.head.appendChild(style);
}

/* ── Component ──────────────────────────────────────────────── */

export const InteractiveMap = ({
  empire,
  className,
  showCities = true,
  highlightCities,
  center,
  zoom,
  animate = true,
}: InteractiveMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const prevEmpireRef = useRef<EmpireId>('none');

  const defaults = EMPIRE_CENTERS[empire] || EMPIRE_CENTERS.none;
  const mapCenter = center || defaults.center;
  const mapZoom = zoom || defaults.zoom;
  const style = EMPIRE_STYLES[empire];
  const territories = EMPIRE_TERRITORIES[empire];

  const visibleCities = useMemo(() => {
    if (!showCities) return [];
    if (highlightCities) return CITIES.filter(c => highlightCities.includes(c.name));
    return CITIES;
  }, [showCities, highlightCities]);

  // Initialize map once
  useEffect(() => {
    ensureStyles();
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: mapCenter,
      zoom: mapZoom,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: true,
      keyboard: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 10,
      minZoom: 3,
    }).addTo(map);

    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, []);

  // Update layers when empire/cities change
  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    // Smooth pan/zoom
    if (animate) {
      map.flyTo(mapCenter, mapZoom, { duration: 1.8, easeLinearity: 0.25 });
    } else {
      map.setView(mapCenter, mapZoom);
    }

    // Draw territories with smooth curves
    if (empire !== 'none' && territories.length > 0) {
      territories.forEach(coords => {
        const latLngs = coords.map(([lat, lng]) => L.latLng(lat, lng));

        // Outer glow polygon
        L.polygon(latLngs, {
          color: 'transparent',
          weight: 0,
          fillColor: style.fillColor,
          fillOpacity: style.fillOpacity * 0.4,
          smoothFactor: 2.5,
          className: 'territory-glow',
        }).addTo(layer);

        // Main territory polygon
        L.polygon(latLngs, {
          color: style.color,
          weight: 1.5,
          fillColor: style.fillColor,
          fillOpacity: style.fillOpacity,
          dashArray: '8 4',
          smoothFactor: 2.0,
          lineCap: 'round',
          lineJoin: 'round',
          className: 'territory-main',
        }).addTo(layer);

        // Bright border highlight
        L.polygon(latLngs, {
          color: style.color,
          weight: 0.5,
          fill: false,
          opacity: 0.6,
          smoothFactor: 2.0,
          lineCap: 'round',
          lineJoin: 'round',
        }).addTo(layer);
      });
    }

    // Draw city markers with interactivity
    visibleCities.forEach(city => {
      const isHighlighted = highlightCities?.includes(city.name) ?? false;
      const icon = buildMarkerIcon(
        style.color || '#D4A843',
        style.glowColor || 'rgba(212,168,67,0.5)',
        isHighlighted,
      );

      const marker = L.marker([city.lat, city.lng], { icon })
        .bindTooltip(city.name, {
          permanent: false,
          direction: 'top',
          offset: [0, -12],
          className: 'leaflet-city-tooltip',
        })
        .bindPopup(buildPopupHtml(city, empire, style.color || '#D4A843'), {
          closeButton: true,
          maxWidth: 280,
          minWidth: 200,
          className: '',
        })
        .addTo(layer);

      // Show tooltip on hover, popup on click
      marker.on('mouseover', function () { this.openTooltip(); });
      marker.on('mouseout', function () { this.closeTooltip(); });
    });

    prevEmpireRef.current = empire;
  }, [empire, mapCenter, mapZoom, animate, territories, style, visibleCities, highlightCities]);

  return (
    <div
      ref={containerRef}
      className={cn('w-full h-full min-h-[300px] rounded-lg overflow-hidden', className)}
      style={{ background: 'hsl(220, 18%, 10%)' }}
    />
  );
};
