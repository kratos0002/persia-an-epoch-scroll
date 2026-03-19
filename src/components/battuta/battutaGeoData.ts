/**
 * Adapter: converts [lat, lng] ALL_COORDS to GeoJSON [lng, lat]
 * and precomputes cumulative distances for progressive route slicing.
 */
import { STAGES, ALL_COORDS, IB } from '@/components/visuals/battutaMapData';
import type { BattutaStage, BattutaMarker } from '@/components/visuals/battutaMapData';
import * as turf from '@turf/helpers';
import turfLength from '@turf/length';

export { IB };
export type { BattutaStage, BattutaMarker };

/* ── Coordinate flip [lat,lng] → [lng,lat] ── */
function flip(c: [number, number]): [number, number] {
  return [c[1], c[0]];
}

/* ── STAGES with [lng, lat] coords for MapLibre ── */
export interface StageGL extends Omit<BattutaStage, 'center' | 'markers'> {
  center: [number, number]; // [lng, lat]
  markers: { coords: [number, number]; label: string; detail?: string }[];
}

export const STAGES_GL: StageGL[] = STAGES.map((s) => ({
  ...s,
  center: flip(s.center),
  markers: s.markers.map((m) => ({
    ...m,
    coords: flip(m.coords),
  })),
}));

/* ── Build full GeoJSON LineString ── */
const fullRouteCoords: [number, number][] = ALL_COORDS.map(flip);

export const ROUTE_GEOJSON = turf.lineString(fullRouteCoords);
export const TOTAL_ROUTE_LENGTH_KM = turfLength(ROUTE_GEOJSON, { units: 'kilometers' });

/* ── Cumulative distances per ALL_COORDS index ── */
function computeCumulativeDistances(): number[] {
  const distances: number[] = [];
  for (let i = 0; i < fullRouteCoords.length; i++) {
    if (i === 0) {
      distances.push(0);
    } else {
      const partial = turf.lineString(fullRouteCoords.slice(0, i + 1));
      distances.push(turfLength(partial, { units: 'kilometers' }));
    }
  }
  return distances;
}

export const ROUTE_CUMULATIVE_DISTANCES = computeCumulativeDistances();

/* ── Ghost route (full route as faint preview at overview stage) ── */
export const GHOST_ROUTE_GEOJSON = turf.lineString(fullRouteCoords);
