import React, { useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { HZ } from './hormuzMapData';

/* ── Types ── */
export interface MapMarker {
  coords: [number, number];
  label: string;
  color: string;
  size?: number;
  pulse?: boolean;
  detail?: string;
}

export interface MapRoute {
  path: [number, number][];
  color: string;
  weight?: number;
  dash?: string;
  opacity?: number;
}

export interface HormuzGulfMapProps {
  center: [number, number];
  zoom: number;
  markers?: MapMarker[];
  routes?: MapRoute[];
  activeStep: number;
  /** Which markers/routes to reveal progressively (by step index). If not provided, all show at once. */
  revealUpTo?: number;
  className?: string;
}

/* ── Helpers ── */
const STYLE_ID = 'hormuz-map-styles';
function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes hzPulse {
      0%, 100% { opacity: 0.7; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.4); }
    }
    .hormuz-map .leaflet-container { background: ${HZ.NAVY} !important; }
  `;
  document.head.appendChild(style);
}

function makeDivIcon(html: string): L.DivIcon {
  return L.divIcon({ className: '', html, iconSize: [0, 0], iconAnchor: [-8, 3] });
}

function dotHtml(color: string, label: string, size = 6, pulse = false, clickable = false): string {
  const anim = pulse ? 'animation:hzPulse 1.5s infinite;' : '';
  const cursor = clickable ? 'cursor:pointer;' : '';
  const ring = clickable ? `<div style="position:absolute;inset:-3px;border-radius:50%;border:1px solid ${color};opacity:0.3;animation:hzPulse 2s infinite;"></div>` : '';
  return `<div style="display:flex;align-items:center;gap:5px;white-space:nowrap;${cursor}">
    <div style="position:relative;width:${size}px;height:${size}px;">
      <div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};box-shadow:0 0 10px ${color}55;${anim}"></div>
      ${ring}
    </div>
    <span style="font-family:'Source Sans 3',sans-serif;font-size:10px;color:${color};text-shadow:0 1px 4px rgba(0,0,0,0.9);font-weight:600;">${label}${clickable ? '<span style="opacity:0.4;font-size:8px;margin-left:3px;">ⓘ</span>' : ''}</span>
  </div>`;
}

function popupHtml(label: string, detail: string, color: string): string {
  return `<div style="background:hsla(215,45%,10%,0.95);border:1px solid ${color}33;border-radius:8px;padding:12px 14px;max-width:240px;">
    <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:14px;font-weight:700;color:${color};margin-bottom:6px;">${label}</div>
    <div style="font-family:'Source Sans 3',sans-serif;font-size:12px;line-height:1.5;color:hsl(210,15%,60%);">${detail}</div>
  </div>`;
}

/* ── Component ── */
export const HormuzGulfMap = ({ center, zoom, markers = [], routes = [], activeStep, className }: HormuzGulfMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<L.Layer[]>([]);
  const prevStepRef = useRef(-1);

  const clearLayers = useCallback(() => {
    layersRef.current.forEach(l => mapRef.current?.removeLayer(l));
    layersRef.current = [];
  }, []);

  const addLayer = useCallback((layer: L.Layer) => {
    mapRef.current?.addLayer(layer);
    layersRef.current.push(layer);
  }, []);

  // Init
  useEffect(() => {
    ensureStyles();
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center, zoom,
      zoomControl: false, attributionControl: false,
      dragging: false, scrollWheelZoom: false,
      doubleClickZoom: false, touchZoom: false,
    });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 18 }).addTo(map);
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  // Update view + layers on step change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (activeStep === prevStepRef.current) return;
    prevStepRef.current = activeStep;

    map.flyTo(center, zoom, { duration: 1.4, easeLinearity: 0.25 });
    clearLayers();

    // Always show Hormuz highlight circle
    addLayer(L.circle([26.56, 56.25], {
      radius: zoom >= 8 ? 15000 : 50000,
      color: HZ.TEAL, weight: 1, opacity: 0.25,
      fillColor: HZ.TEAL, fillOpacity: 0.04,
    }));

    // Draw routes
    routes.forEach(r => {
      addLayer(L.polyline(r.path, {
        color: r.color,
        weight: r.weight ?? 1.5,
        dashArray: r.dash ?? '6, 8',
        opacity: r.opacity ?? 0.5,
      }));
    });

    // Draw markers
    markers.forEach(m => {
      const hasDetail = !!m.detail;
      const marker = L.marker(m.coords, {
        icon: makeDivIcon(dotHtml(m.color, m.label, m.size ?? 6, m.pulse ?? false, hasDetail)),
        interactive: hasDetail,
      });
      if (hasDetail) {
        marker.bindPopup(popupHtml(m.label.replace(/^⚔\s*/, ''), m.detail!, m.color), {
          className: 'hormuz-popup',
          closeButton: true,
          maxWidth: 260,
          offset: [0, -4],
        });
      }
      addLayer(marker);
    });
  }, [activeStep, center, zoom, markers, routes, clearLayers, addLayer]);

  return (
    <div className={`absolute inset-0 hormuz-map ${className ?? ''}`}>
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};
