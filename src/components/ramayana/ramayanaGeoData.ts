/**
 * Adapter layer: converts Leaflet-convention [lat, lng] data
 * to GeoJSON-convention [lng, lat] for MapLibre GL JS.
 * Also builds a single LineString and precomputes cumulative distances.
 */
import { STAGES, ROUTE_SEGMENTS, TOTAL_DISTANCE_KM, RM } from '@/components/visuals/ramayanaMapData';
import type { RamayanaStage, RamayanaMarker } from '@/components/visuals/ramayanaMapData';
import * as turf from '@turf/helpers';
import turfLength from '@turf/length';

export { RM, TOTAL_DISTANCE_KM };
export type { RamayanaStage, RamayanaMarker };

/* ── Coordinate flip ── */
function flip(coord: [number, number]): [number, number] {
  return [coord[1], coord[0]];
}

/* ── STAGES with [lng, lat] coords ── */
export interface StageGL extends Omit<RamayanaStage, 'center' | 'markers'> {
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

/* ── Build single GeoJSON LineString from all route segments ── */
function buildFullRoute(): [number, number][] {
  const coords: [number, number][] = [];
  for (const segment of ROUTE_SEGMENTS) {
    for (let i = 0; i < segment.length; i++) {
      const flipped = flip(segment[i]);
      // Skip duplicate points where segments join
      if (coords.length > 0) {
        const last = coords[coords.length - 1];
        if (last[0] === flipped[0] && last[1] === flipped[1]) continue;
      }
      coords.push(flipped);
    }
  }
  return coords;
}

const fullRouteCoords = buildFullRoute();

export const ROUTE_GEOJSON = turf.lineString(fullRouteCoords);

export const TOTAL_ROUTE_LENGTH_KM = turfLength(ROUTE_GEOJSON, { units: 'kilometers' });

/* ── Cumulative distances per segment endpoint ── */
// ROUTE_CUMULATIVE_DISTANCES[i] = distance in km from the start to the
// end of ROUTE_SEGMENTS[i].
function computeCumulativeDistances(): number[] {
  const distances: number[] = [];
  const coords: [number, number][] = [];

  for (let segIdx = 0; segIdx < ROUTE_SEGMENTS.length; segIdx++) {
    const segment = ROUTE_SEGMENTS[segIdx];
    for (let i = 0; i < segment.length; i++) {
      const flipped = flip(segment[i]);
      if (coords.length > 0) {
        const last = coords[coords.length - 1];
        if (last[0] === flipped[0] && last[1] === flipped[1]) continue;
      }
      coords.push(flipped);
    }
    // Distance from start to current endpoint
    const partial = turf.lineString(coords);
    distances.push(turfLength(partial, { units: 'kilometers' }));
  }

  return distances;
}

export const ROUTE_CUMULATIVE_DISTANCES = computeCumulativeDistances();

/* ── Ghost route GeoJSON (everything except the aerial return) ── */
const ghostCoords = buildFullRoute();
// Remove the last segment (aerial return from Divurumpola to Ayodhya)
// by finding the second-to-last unique point from ROUTE_SEGMENTS[17]
const lastGroundSegment = ROUTE_SEGMENTS[ROUTE_SEGMENTS.length - 2]; // segment 17
const lastGroundPoint = flip(lastGroundSegment[lastGroundSegment.length - 1]);
const cutIdx = ghostCoords.findIndex(
  (c) => c[0] === lastGroundPoint[0] && c[1] === lastGroundPoint[1]
);
const ghostRouteCoords = cutIdx >= 0 ? ghostCoords.slice(0, cutIdx + 1) : ghostCoords;

export const GHOST_ROUTE_GEOJSON = turf.lineString(ghostRouteCoords);
