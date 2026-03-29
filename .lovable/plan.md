

# Fix Battuta Map + Add Historical Imagery

## Issue 1: Map tiles not rendering

The map shows only dots (markers) because the map style crashes on load. The error from console:

```text
layers[0].paint.raster-brightness-max: 1.05 is greater than the maximum value 1
```

**Fix**: In `src/components/battuta/battutaMapStyle.ts`, change `raster-brightness-max` from `1.05` to `1.0`.

Also apply the same fix to `src/components/ramayana/ramayanaMapStyle.ts` which has the same value (`1` is fine there but worth auditing).

## Issue 2: No historical imagery in the narrative panel

The left panel of the ZoomDive shows text, quotes, and accents — but no images. Key moments in the journey should have Wikimedia Commons imagery to ground the narrative visually.

### Approach

1. **Add an optional `image` field** to the `BattutaStage` narrative type:
   ```ts
   image?: { src: string; alt: string; caption: string }
   ```

2. **Add images to ~10 key stages** using Wikimedia Commons URLs (public domain / CC):
   - **Tangier** — Marinid-era gate or medina view
   - **Cairo** — Sultan Hassan Mosque / Mamluk Cairo
   - **Mecca** — Historical Hajj illustration
   - **Baghdad** — Mustansiriya Madrasa
   - **Kilwa** — Great Mosque ruins
   - **Constantinople** — Hagia Sophia medieval depiction
   - **Delhi** — Qutub Minar / Tughlaq architecture
   - **Quanzhou** — Maritime museum or mosque
   - **Damascus** — Umayyad Mosque (plague context)
   - **Timbuktu** — Djinguereber Mosque

3. **Render the image** in the narrative panel between the title block and body text, styled as a framed miniature with a sepia overlay and caption in marginalia style.

### Files changed

| File | Change |
|---|---|
| `battutaMapStyle.ts` | Fix `raster-brightness-max` to `1.0` |
| `battutaMapData.ts` | Add `image` field to narrative type + populate ~10 stages |
| `BattutaZoomDive.tsx` | Render image in left panel when present |

