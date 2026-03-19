

# 3D Hopping Map for Ibn Battuta

## Concept

Replace the flat Leaflet map with a **MapLibre GL** 3D map that creates a cinematic "hopping" effect between cities. As the user scrolls, the camera lifts up from the current city, tilts and rotates toward the next destination, then swoops down — like watching a traveler's journey from a bird's eye view. MapLibre GL is already installed and proven in the Ramayana essay.

## The "Hopping" Effect — How It Works

Each stage transition uses MapLibre's `flyTo` with three properties Leaflet cannot do:

- **pitch** (camera tilt): 0° = flat top-down, 60° = dramatic perspective view looking toward the horizon
- **bearing** (compass rotation): Camera rotates to face the direction of travel (e.g., bearing 90° when heading east toward Baghdad, bearing 180° when heading south toward Kilwa)
- **zoom arc**: Camera zooms out during transit (showing the distance), then zooms back in on arrival

Each stage in the data gets new fields: `pitch`, `bearing`, and `speed` — tuned per stop so the camera behavior feels intentional (e.g., slow dramatic sweep across the Sahara, fast hop between nearby Levantine cities).

```text
Stage N (Cairo)          Stage N+1 (Damascus)
  zoom: 8                  zoom: 8
  pitch: 55°               pitch: 55°
  bearing: 45°             bearing: 30°
       \                    /
        \   zoom out to 5  /
         \   pitch: 40°   /
          \   bearing: 38°/
           \_____________/
              mid-flight
```

## Technical Changes

### 1. Update `battutaMapData.ts`
Add `pitch`, `bearing`, and `speed` to each stage definition:
- Overview: pitch 0, bearing 0 (flat overview)
- Phase 1 (westward travel): bearing shifts from ~90° (east) gradually
- Phase 2 (south to East Africa): bearing ~180° (south), pitch 55°
- Phase 3 (north to steppes): bearing ~0° (north)
- Phase 4 (east to India): bearing ~90°, higher pitch for drama
- Phase 5 (far east): bearing ~90°, max pitch 60°
- Phase 6 (return west): bearing ~270°
- Phase 7 (south to Mali): bearing ~180°

### 2. Rewrite `BattutaZoomDive.tsx`
- Replace Leaflet with `react-map-gl/maplibre` (same pattern as `RamayanaZoomDive.tsx`)
- Use a warm sepia-styled MapLibre style (create `battutaMapStyle.ts` like `ramayanaMapStyle.ts`)
- Camera transitions use `map.flyTo({ center, zoom, pitch, bearing, duration, essential: true })`
- Route drawn as GeoJSON `Source`/`Layer` (line) instead of `L.polyline`
- Markers as React `<Marker>` components instead of `L.circleMarker`
- Keep the split-panel layout, narrative panel, phase cards, progress bar — all identical structure

### 3. Create `battutaMapStyle.ts`
A MapLibre style spec with warm sepia tones matching the Rihla Folio aesthetic — similar to Ramayana's custom style but with the portolan chart feel (lighter land, subtle coastlines, no labels or minimal labels).

### 4. Create `battutaGeoData.ts`
Adapter layer (like `ramayanaGeoData.ts`) that:
- Converts `ALL_COORDS` to a GeoJSON LineString
- Precomputes cumulative distances for progressive route slicing via `@turf/line-slice-along`
- Exports `ROUTE_GEOJSON`, `ROUTE_CUMULATIVE_DISTANCES`, `TOTAL_ROUTE_LENGTH_KM`

## Files to Change

| File | Action |
|------|--------|
| `src/components/visuals/battutaMapData.ts` | Add `pitch`, `bearing`, `speed` to each stage |
| `src/components/battuta/battutaMapStyle.ts` | **Create** — MapLibre style spec with sepia/parchment tones |
| `src/components/battuta/battutaGeoData.ts` | **Create** — GeoJSON route + cumulative distances |
| `src/components/battuta/BattutaZoomDive.tsx` | **Rewrite** — Replace Leaflet with MapLibre GL + 3D camera |

## Visual Result

The map will feel like a cinematic flight following Ibn Battuta's path — the camera tilted at ~55°, rotating to face the direction of travel, swooping between cities with natural arcs. Past route segments trail behind as faded lines, the active segment glows in the phase color, and each city arrival is a dramatic zoom-in from above.

