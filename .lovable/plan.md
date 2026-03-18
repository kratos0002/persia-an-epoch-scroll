

# Replace Circles with Proper Country Fill Colors

## Problem
The partition maps currently use `L.circle()` blobs to represent territories. These are imprecise and don't convey the scale or shape of colonial claims. Real country boundary polygons would make the partition viscerally clear — the continent literally filling with color.

## Approach

### 1. Load GeoJSON Country Boundaries
Use a lightweight public GeoJSON of African countries from a CDN (e.g., `https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson` filtered to Africa, or the more compact Natural Earth low-res). To keep bundle size small, we'll fetch it at runtime rather than embedding it.

Create a mapping file that links each `PARTITION_TIMELINE` event to one or more **ISO 3166-1 alpha-3** country codes (e.g., `Algeria → DZA`, `Congo Free State → COD`, `French West Africa → [SEN, MLI, GIN, CIV, BFA, NER, TCD, MRT]`).

### 2. Update `berlinMapData.ts`
- Add `countryCodes: string[]` field to `PartitionEvent` interface
- Map each of the 19 timeline events to the modern country ISO codes that correspond to that colonial territory
- Add `countryCodes` to `SplitEthnicGroup` entries too for the ethnic fracture map
- Add a `COUNTRY_GEOJSON_URL` constant pointing to a lightweight Africa-only GeoJSON CDN

### 3. Rewrite `PartitionTimelapse.tsx`
- Fetch GeoJSON on mount (cached in a ref)
- Filter features by ISO code for each visible event
- Render territories as `L.geoJSON()` polygons with the colonial power's fill color
- Latest territory: higher opacity (0.45) + thicker border
- Past territories: lower opacity (0.2), dimmed
- Keep the pulsing marker + popup for the active event
- Keep the label markers

### 4. Update `PreColonialCards.tsx`
- Use GeoJSON polygons for the pre-colonial polities where they roughly map to modern countries (Sokoto → northern Nigeria, Ashanti → Ghana, etc.)

### 5. Update `EthnicFractureMap.tsx`
- Show the countries each split group spans as filled polygons, highlighting the border between them

### Files to Change

| File | Change |
|------|--------|
| `berlinMapData.ts` | Add `countryCodes` to events, add GeoJSON URL |
| `PartitionTimelapse.tsx` | Fetch GeoJSON, render `L.geoJSON` polygons instead of circles |
| `PreColonialCards.tsx` | Use country polygons for polity territories |
| `EthnicFractureMap.tsx` | Use country polygons for split group visualization |

