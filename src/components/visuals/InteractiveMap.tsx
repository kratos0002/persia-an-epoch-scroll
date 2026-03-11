import React, { useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '@/lib/utils';
import type { Feature, FeatureCollection, Polygon } from 'geojson';

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Small dot icon for cities
const cityIcon = (color: string, size = 8) =>
  L.divIcon({
    className: '',
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2px solid rgba(255,255,255,0.8);box-shadow:0 0 6px ${color}"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });

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

interface CityMarker {
  name: string;
  lat: number;
  lng: number;
}

interface InteractiveMapProps {
  empire: EmpireId;
  className?: string;
  showCities?: boolean;
  highlightCities?: string[];
  center?: [number, number];
  zoom?: number;
  animate?: boolean;
}

// Approximate GeoJSON polygons for empire territories
const EMPIRE_TERRITORIES: Record<EmpireId, Feature<Polygon>[]> = {
  none: [],
  achaemenid: [
    makeTerritory('Achaemenid Empire', [
      [26, 26], [30, 26], [32, 30], [35, 32], [38, 34], [41, 36],
      [42, 40], [40, 42], [37, 44], [33, 42], [30, 41],
      [27, 40], [25, 37], [23, 35], [22, 32], [24, 29],
      // Eastern extent
    ]),
    makeTerritory('Eastern Provinces', [
      [30, 42], [33, 42], [37, 44], [40, 50], [38, 55],
      [36, 60], [34, 66], [32, 70], [30, 70], [28, 66],
      [27, 60], [26, 55], [27, 50], [28, 46],
    ]),
    makeTerritory('Egypt', [
      [22, 32], [24, 29], [26, 26], [30, 26], [32, 30],
      [31, 32], [30, 33], [28, 34], [25, 34],
    ]),
  ],
  alexander: [
    makeTerritory('Alexander\'s Empire', [
      [22, 26], [30, 20], [35, 22], [38, 26], [41, 30],
      [42, 36], [40, 42], [38, 50], [36, 58], [34, 66],
      [32, 72], [30, 72], [28, 68], [26, 60], [25, 50],
      [24, 42], [23, 36], [22, 30],
    ]),
  ],
  parthian: [
    makeTerritory('Parthian Empire', [
      [27, 44], [30, 42], [33, 44], [36, 48], [38, 52],
      [37, 58], [35, 60], [32, 60], [29, 58], [27, 54],
      [26, 50], [26, 46],
    ]),
    makeTerritory('Western Parthia', [
      [30, 42], [33, 42], [35, 40], [37, 38], [38, 40],
      [37, 44], [33, 44],
    ]),
  ],
  sassanid: [
    makeTerritory('Sassanid Empire', [
      [25, 44], [28, 40], [32, 38], [36, 36], [38, 38],
      [40, 42], [39, 48], [38, 54], [36, 58], [33, 60],
      [30, 58], [27, 54], [25, 50],
    ]),
  ],
  islamic: [
    makeTerritory('Islamic Caliphate (Persian Regions)', [
      [22, 26], [30, 20], [35, 26], [38, 32], [42, 36],
      [40, 44], [38, 54], [36, 64], [32, 70], [28, 64],
      [25, 54], [24, 44], [22, 36],
    ]),
  ],
  mongol: [
    makeTerritory('Ilkhanate (Mongol Persia)', [
      [28, 38], [32, 36], [36, 36], [40, 40], [42, 46],
      [40, 54], [38, 60], [34, 62], [30, 58], [27, 52],
      [26, 46], [27, 42],
    ]),
  ],
  safavid: [
    makeTerritory('Safavid Empire', [
      [25, 44], [28, 42], [32, 40], [36, 38], [39, 40],
      [40, 44], [40, 50], [38, 56], [35, 60], [32, 60],
      [29, 58], [27, 54], [25, 50],
    ]),
  ],
  modern: [
    makeTerritory('Modern Iran', [
      [25, 53], [25.5, 57], [26, 59], [27, 60.5], [28, 60],
      [29, 61], [31, 61.5], [33, 59], [35, 59], [37, 56],
      [38, 54], [39.5, 48], [39.5, 45], [38, 44],
      [37, 44.5], [35, 46], [33, 48], [30, 48],
      [27, 50], [25.5, 51],
    ]),
  ],
};

const EMPIRE_STYLES: Record<EmpireId, { color: string; fillColor: string; fillOpacity: number }> = {
  none: { color: 'transparent', fillColor: 'transparent', fillOpacity: 0 },
  achaemenid: { color: '#D4A843', fillColor: '#D4A843', fillOpacity: 0.25 },
  alexander: { color: '#8B5CF6', fillColor: '#7C3AED', fillOpacity: 0.25 },
  parthian: { color: '#DC2626', fillColor: '#B91C1C', fillOpacity: 0.25 },
  sassanid: { color: '#C53030', fillColor: '#9B2C2C', fillOpacity: 0.25 },
  islamic: { color: '#059669', fillColor: '#047857', fillOpacity: 0.25 },
  mongol: { color: '#EA580C', fillColor: '#C2410C', fillOpacity: 0.25 },
  safavid: { color: '#2563EB', fillColor: '#1D4ED8', fillOpacity: 0.25 },
  modern: { color: '#6366F1', fillColor: '#4F46E5', fillOpacity: 0.2 },
};

const CITIES: CityMarker[] = [
  { name: 'Persepolis', lat: 29.93, lng: 52.89 },
  { name: 'Susa', lat: 32.19, lng: 48.26 },
  { name: 'Babylon', lat: 32.54, lng: 44.42 },
  { name: 'Ecbatana', lat: 34.80, lng: 48.52 },
  { name: 'Pasargadae', lat: 30.20, lng: 53.17 },
  { name: 'Athens', lat: 37.97, lng: 23.72 },
  { name: 'Samarkand', lat: 39.65, lng: 66.96 },
  { name: 'Isfahan', lat: 32.65, lng: 51.68 },
  { name: 'Tabriz', lat: 38.08, lng: 46.29 },
  { name: 'Baghdad', lat: 33.31, lng: 44.37 },
  { name: 'Merv', lat: 37.66, lng: 62.19 },
  { name: 'Ctesiphon', lat: 33.09, lng: 44.58 },
  { name: 'Sardis', lat: 38.48, lng: 28.04 },
  { name: 'Memphis', lat: 29.85, lng: 31.25 },
];

const EMPIRE_CENTERS: Record<EmpireId, { center: [number, number]; zoom: number }> = {
  none: { center: [32, 52], zoom: 5 },
  achaemenid: { center: [32, 48], zoom: 4 },
  alexander: { center: [33, 48], zoom: 3.5 },
  parthian: { center: [33, 50], zoom: 4.5 },
  sassanid: { center: [33, 50], zoom: 4.5 },
  islamic: { center: [32, 46], zoom: 4 },
  mongol: { center: [34, 50], zoom: 4 },
  safavid: { center: [33, 50], zoom: 4.5 },
  modern: { center: [32, 53], zoom: 5 },
};

function makeTerritory(name: string, coords: [number, number][]): Feature<Polygon> {
  // GeoJSON uses [lng, lat]
  const ring = coords.map(([lat, lng]) => [lng, lat] as [number, number]);
  ring.push(ring[0]); // close the ring
  return {
    type: 'Feature',
    properties: { name },
    geometry: { type: 'Polygon', coordinates: [ring] },
  };
}

// Component to animate map view changes
const MapAnimator = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
};

export const InteractiveMap = ({
  empire,
  className,
  showCities = true,
  highlightCities,
  center,
  zoom,
  animate = true,
}: InteractiveMapProps) => {
  const defaults = EMPIRE_CENTERS[empire] || EMPIRE_CENTERS.none;
  const mapCenter = center || defaults.center;
  const mapZoom = zoom || defaults.zoom;
  const style = EMPIRE_STYLES[empire];
  const territories = EMPIRE_TERRITORIES[empire];

  const geoData = useMemo<FeatureCollection>(() => ({
    type: 'FeatureCollection',
    features: territories,
  }), [territories]);

  const visibleCities = useMemo(() => {
    if (!showCities) return [];
    if (highlightCities) return CITIES.filter(c => highlightCities.includes(c.name));
    return CITIES;
  }, [showCities, highlightCities]);

  return (
    <div className={cn('w-full h-full min-h-[300px] rounded-lg overflow-hidden', className)}>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="w-full h-full"
        style={{ background: 'hsl(220, 18%, 10%)' }}
        zoomControl={false}
        attributionControl={false}
        scrollWheelZoom={false}
        dragging={true}
        doubleClickZoom={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {animate && <MapAnimator center={mapCenter} zoom={mapZoom} />}

        {empire !== 'none' && (
          <GeoJSON
            key={empire}
            data={geoData}
            style={() => ({
              color: style.color,
              weight: 2,
              fillColor: style.fillColor,
              fillOpacity: style.fillOpacity,
              dashArray: '6 3',
            })}
          />
        )}

        {visibleCities.map(city => (
          <Marker
            key={city.name}
            position={[city.lat, city.lng]}
            icon={cityIcon(style.color || '#D4A843')}
          >
            <Popup className="custom-popup">
              <span className="font-display text-sm font-bold">{city.name}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
