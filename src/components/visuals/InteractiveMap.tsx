import React, { useEffect, useRef, useMemo } from 'react';
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
  visibleCities?: string[];
  highlightCities?: string[];
  annotatedCities?: Array<{
    name: string;
    label: string;
    direction?: 'top' | 'right' | 'bottom' | 'left' | 'center';
    offset?: [number, number];
  }>;
  routeCities?: string[];
  center?: [number, number];
  zoom?: number;
  animate?: boolean;
  showTerritories?: boolean;
  spotlightCity?: {
    name: string;
    eyebrow?: string;
    label: string;
    detail?: string;
    imageSrc?: string;
    imageAlt?: string;
    imagePosition?: string;
  };
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

function buildMarkerIcon(
  color: string,
  glowColor: string,
  isHighlighted: boolean,
  spotlight?: {
    eyebrow?: string;
    label: string;
    detail?: string;
    imageSrc?: string;
    imageAlt?: string;
    imagePosition?: string;
  },
): L.DivIcon {
  if (spotlight) {
    const width = spotlight.imageSrc ? 196 : 220;
    const height = spotlight.imageSrc ? 228 : 120;
    const dotSize = 16;
    const haloSize = 44;

    return L.divIcon({
      className: '',
      html: `
        <div style="position:relative;width:${width}px;height:${height}px;display:flex;align-items:flex-end;justify-content:center;">
          <div style="position:absolute;left:50%;bottom:${dotSize + 12}px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;">
            <div style="
              padding:10px 14px 11px;
              border-radius:16px;
              background:linear-gradient(180deg, rgba(8,12,22,0.96), rgba(10,16,28,0.9));
              border:1px solid rgba(212,168,67,0.45);
              box-shadow:0 14px 40px rgba(0,0,0,0.45), 0 0 28px rgba(212,168,67,0.16);
              backdrop-filter:blur(12px);
              min-width:168px;
              white-space:normal;
              animation: mapCalloutFloat 3.6s ease-in-out infinite;
            ">
              ${spotlight.imageSrc ? `
                <div style="
                  position:relative;
                  width:100%;
                  height:132px;
                  overflow:hidden;
                  border-radius:12px;
                  margin-bottom:10px;
                  border:1px solid rgba(212,168,67,0.18);
                  box-shadow:0 10px 24px rgba(0,0,0,0.3);
                ">
                  <img
                    src="${spotlight.imageSrc}"
                    alt="${spotlight.imageAlt || spotlight.label}"
                    style="
                      display:block;
                      width:100%;
                      height:100%;
                      object-fit:cover;
                      object-position:${spotlight.imagePosition || 'center 22%'};
                      filter:saturate(0.88) contrast(1.04);
                    "
                  />
                  <div style="
                    position:absolute;
                    inset:0;
                    background:linear-gradient(180deg, rgba(6,10,18,0.08), rgba(6,10,18,0.5));
                  "></div>
                </div>
              ` : ''}
              <div style="
                font-family:'Source Sans 3', 'Source Sans Pro', system-ui, sans-serif;
                font-size:10px;
                text-transform:uppercase;
                letter-spacing:0.22em;
                color:rgba(212,168,67,0.72);
                margin-bottom:5px;
              ">${spotlight.eyebrow || 'Origin'}</div>
              <div style="
                font-family:'Playfair Display', Georgia, serif;
                font-size:21px;
                font-weight:700;
                line-height:1.05;
                color:${color};
                text-shadow:0 0 18px rgba(212,168,67,0.12);
              ">${spotlight.label}</div>
              ${spotlight.detail ? `
                <div style="
                  margin-top:5px;
                  font-family:'Source Sans 3', 'Source Sans Pro', system-ui, sans-serif;
                  font-size:11px;
                  line-height:1.35;
                  letter-spacing:0.04em;
                  color:rgba(255,255,255,0.6);
                ">${spotlight.detail}</div>
              ` : ''}
            </div>
            <div style="
              width:1px;
              height:18px;
              background:linear-gradient(180deg, rgba(212,168,67,0.8), rgba(212,168,67,0));
              box-shadow:0 0 10px rgba(212,168,67,0.35);
            "></div>
          </div>
          <div style="
            position:absolute;
            left:50%;
            bottom:${(dotSize - haloSize) / 2}px;
            width:${haloSize}px;
            height:${haloSize}px;
            transform:translateX(-50%);
            border-radius:50%;
            background:${glowColor};
            opacity:0.3;
            animation: mapBeaconPulse 2.8s ease-out infinite;
          "></div>
          <div style="
            position:absolute;
            left:50%;
            bottom:${(dotSize - haloSize) / 2}px;
            width:${haloSize}px;
            height:${haloSize}px;
            transform:translateX(-50%);
            border-radius:50%;
            border:1px solid rgba(212,168,67,0.45);
            animation: mapBeaconRing 2.8s ease-out infinite;
          "></div>
          <div style="
            position:relative;
            width:${dotSize}px;
            height:${dotSize}px;
            margin-bottom:0;
            border-radius:50%;
            background:${color};
            border:3px solid rgba(255,255,255,0.94);
            box-shadow:0 0 12px ${glowColor}, 0 0 28px ${glowColor};
          "></div>
        </div>
      `,
      iconSize: [width, height],
      iconAnchor: [width / 2, height - dotSize / 2],
      popupAnchor: [0, -(height - 12)],
    });
  }

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
    @keyframes mapBeaconPulse {
      0%   { transform: translateX(-50%) scale(0.45); opacity: 0.42; }
      70%  { transform: translateX(-50%) scale(1.65); opacity: 0; }
      100% { transform: translateX(-50%) scale(1.65); opacity: 0; }
    }
    @keyframes mapBeaconRing {
      0%   { transform: translateX(-50%) scale(0.7); opacity: 0.55; }
      100% { transform: translateX(-50%) scale(1.4); opacity: 0; }
    }
    @keyframes mapCalloutFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
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
    .leaflet-campaign-tooltip {
      background: rgba(10, 15, 24, 0.94) !important;
      backdrop-filter: blur(10px) !important;
      border: 1px solid rgba(212,168,67,0.35) !important;
      border-radius: 999px !important;
      color: rgba(250, 236, 206, 0.96) !important;
      font-family: 'Source Sans 3', 'Source Sans Pro', system-ui, sans-serif !important;
      font-size: 11px !important;
      font-weight: 700 !important;
      padding: 6px 10px !important;
      letter-spacing: 0.08em !important;
      text-transform: uppercase !important;
      box-shadow: 0 10px 24px rgba(0,0,0,0.4) !important;
    }
    .leaflet-campaign-tooltip::before {
      display: none !important;
    }
    .campaign-route {
      filter: drop-shadow(0 0 6px rgba(212,168,67,0.25));
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
  visibleCities: visibleCityNames,
  highlightCities,
  annotatedCities,
  routeCities,
  center,
  zoom,
  animate = true,
  showTerritories = true,
  spotlightCity,
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
  const annotationsByCity = useMemo(() => {
    return new Map((annotatedCities || []).map(annotation => [annotation.name, annotation]));
  }, [annotatedCities]);

  const visibleCities = useMemo(() => {
    if (!showCities) return [];
    if (visibleCityNames?.length) return CITIES.filter(c => visibleCityNames.includes(c.name));
    if (highlightCities) return CITIES.filter(c => highlightCities.includes(c.name));
    return CITIES;
  }, [showCities, visibleCityNames, highlightCities]);

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
    if (showTerritories && empire !== 'none' && territories.length > 0) {
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

    if (routeCities && routeCities.length > 1) {
      const routeLatLngs = routeCities
        .map(cityName => CITIES.find(city => city.name === cityName))
        .filter((city): city is CityMarker => Boolean(city))
        .map(city => L.latLng(city.lat, city.lng));

      if (routeLatLngs.length > 1) {
        L.polyline(routeLatLngs, {
          color: style.glowColor || 'rgba(212,168,67,0.28)',
          weight: 8,
          opacity: 0.18,
          smoothFactor: 1.5,
          lineCap: 'round',
          lineJoin: 'round',
        }).addTo(layer);

        L.polyline(routeLatLngs, {
          color: style.color || '#D4A843',
          weight: 2.4,
          opacity: 0.95,
          dashArray: '10 8',
          smoothFactor: 1.2,
          lineCap: 'round',
          lineJoin: 'round',
          className: 'campaign-route',
        }).addTo(layer);
      }
    }

    // Draw city markers with interactivity
    visibleCities.forEach(city => {
      const spotlight = spotlightCity?.name === city.name
        ? {
            eyebrow: spotlightCity.eyebrow,
            label: spotlightCity.label,
            detail: spotlightCity.detail,
            imageSrc: spotlightCity.imageSrc,
            imageAlt: spotlightCity.imageAlt,
            imagePosition: spotlightCity.imagePosition,
          }
        : undefined;
      const annotation = annotationsByCity.get(city.name);
      const isHighlighted = spotlight ? true : highlightCities?.includes(city.name) ?? false;
      const icon = buildMarkerIcon(
        style.color || '#D4A843',
        style.glowColor || 'rgba(212,168,67,0.5)',
        isHighlighted,
        spotlight,
      );

      const marker = L.marker([city.lat, city.lng], { icon })
        .bindPopup(buildPopupHtml(city, empire, style.color || '#D4A843'), {
          closeButton: true,
          maxWidth: 280,
          minWidth: 200,
          className: '',
        })
        .addTo(layer);

      if (spotlight) {
        // Spotlight cards already carry their own label and context.
      } else if (annotation) {
        marker.bindTooltip(annotation.label, {
          permanent: true,
          direction: annotation.direction || 'top',
          offset: annotation.offset || [0, -18],
          className: 'leaflet-campaign-tooltip',
        });
      } else if (!spotlight) {
        marker.bindTooltip(city.name, {
          permanent: false,
          direction: 'top',
          offset: [0, -12],
          className: 'leaflet-city-tooltip',
        });

        // Show tooltip on hover, popup on click
        marker.on('mouseover', function () { this.openTooltip(); });
        marker.on('mouseout', function () { this.closeTooltip(); });
      }
    });

    prevEmpireRef.current = empire;
  }, [empire, mapCenter, mapZoom, animate, territories, style, visibleCities, highlightCities, spotlightCity, annotationsByCity, routeCities, showTerritories]);

  return (
    <div
      ref={containerRef}
      className={cn('w-full h-full min-h-[300px] rounded-lg overflow-hidden', className)}
      style={{ background: 'hsl(220, 18%, 10%)' }}
    />
  );
};
